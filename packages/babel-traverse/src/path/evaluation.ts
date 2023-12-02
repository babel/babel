import type NodePath from "./index.ts";
import type * as t from "@babel/types";

// This file contains Babels metainterpreter that can evaluate static code.

const VALID_OBJECT_CALLEES = ["Number", "String", "Math"] as const;
const VALID_IDENTIFIER_CALLEES = [
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  process.env.BABEL_8_BREAKING ? "btoa" : null,
  process.env.BABEL_8_BREAKING ? "atob" : null,
] as const;

const INVALID_METHODS = ["random"] as const;

function isValidObjectCallee(
  val: string,
): val is (typeof VALID_OBJECT_CALLEES)[number] {
  return VALID_OBJECT_CALLEES.includes(
    // @ts-expect-error val is a string
    val,
  );
}

function isValidIdentifierCallee(
  val: string,
): val is (typeof VALID_IDENTIFIER_CALLEES)[number] {
  return VALID_IDENTIFIER_CALLEES.includes(
    // @ts-expect-error val is a string
    val,
  );
}

function isInvalidMethod(val: string): val is (typeof INVALID_METHODS)[number] {
  return INVALID_METHODS.includes(
    // @ts-expect-error val is a string
    val,
  );
}

/**
 * Walk the input `node` and statically evaluate if it's truthy.
 *
 * Returning `true` when we're sure that the expression will evaluate to a
 * truthy value, `false` if we're sure that it will evaluate to a falsy
 * value and `undefined` if we aren't sure. Because of this please do not
 * rely on coercion when using this method and check with === if it's false.
 *
 * For example do:
 *
 *   if (t.evaluateTruthy(node) === false) falsyLogic();
 *
 * **AND NOT**
 *
 *   if (!t.evaluateTruthy(node)) falsyLogic();
 *
 */

export function evaluateTruthy(this: NodePath): boolean {
  const res = this.evaluate();
  if (res.confident) return !!res.value;
}

type State = {
  confident: boolean;
  deoptPath: NodePath | null;
  seen: Map<t.Node, Result>;
};

type Result = {
  resolved: boolean;
  value?: any;
};
/**
 * Deopts the evaluation
 */
function deopt(path: NodePath, state: State) {
  if (!state.confident) return;
  state.deoptPath = path;
  state.confident = false;
}

const Globals = new Map([
  ["undefined", undefined],
  ["Infinity", Infinity],
  ["NaN", NaN],
]);

/**
 * We wrap the _evaluate method so we can track `seen` nodes, we push an item
 * to the map before we actually evaluate it so we can deopt on self recursive
 * nodes such as:
 *
 *   var g = a ? 1 : 2,
 *       a = g * this.foo
 */
function evaluateCached(path: NodePath, state: State): any {
  const { node } = path;
  const { seen } = state;

  if (seen.has(node)) {
    const existing = seen.get(node);
    if (existing.resolved) {
      return existing.value;
    } else {
      deopt(path, state);
      return;
    }
  } else {
    const item: Result = { resolved: false };
    seen.set(node, item);

    const val = _evaluate(path, state);
    if (state.confident) {
      item.resolved = true;
      item.value = val;
    }
    return val;
  }
}

function _evaluate(path: NodePath, state: State): any {
  if (!state.confident) return;

  if (path.isSequenceExpression()) {
    const exprs = path.get("expressions");
    return evaluateCached(exprs[exprs.length - 1], state);
  }

  if (
    path.isStringLiteral() ||
    path.isNumericLiteral() ||
    path.isBooleanLiteral()
  ) {
    return path.node.value;
  }

  if (path.isNullLiteral()) {
    return null;
  }

  if (path.isTemplateLiteral()) {
    return evaluateQuasis(path, path.node.quasis, state);
  }

  if (
    path.isTaggedTemplateExpression() &&
    path.get("tag").isMemberExpression()
  ) {
    const object = path.get("tag.object") as NodePath;
    const {
      // @ts-expect-error todo(flow->ts): possible bug, object is can be any expression and so name might be undefined
      node: { name },
    } = object;
    const property = path.get("tag.property") as NodePath;

    if (
      object.isIdentifier() &&
      name === "String" &&
      // todo(flow->ts): was changed from getBinding(name, true)
      //  should this be hasBinding(name, true) as the binding is never used later?
      !path.scope.getBinding(name) &&
      property.isIdentifier() &&
      property.node.name === "raw"
    ) {
      return evaluateQuasis(path, path.node.quasi.quasis, state, true);
    }
  }

  if (path.isConditionalExpression()) {
    const testResult = evaluateCached(path.get("test"), state);
    if (!state.confident) return;
    if (testResult) {
      return evaluateCached(path.get("consequent"), state);
    } else {
      return evaluateCached(path.get("alternate"), state);
    }
  }

  if (path.isExpressionWrapper()) {
    // TypeCastExpression, ExpressionStatement etc
    return evaluateCached(path.get("expression"), state);
  }

  // "foo".length, "foo"[0]
  if (
    path.isMemberExpression() &&
    !path.parentPath.isCallExpression({ callee: path.node })
  ) {
    const property = path.get("property");
    const object = path.get("object");

    if (object.isLiteral()) {
      // @ts-expect-error todo(flow->ts): instead of typeof - would it be better to check type of ast node?
      const value = object.node.value;
      const type = typeof value;

      let key = null;
      if (path.node.computed) {
        key = evaluateCached(property, state);
        if (!state.confident) return;
      } else if (property.isIdentifier()) {
        key = property.node.name;
      }
      if (
        (type === "number" || type === "string") &&
        key != null &&
        (typeof key === "number" || typeof key === "string")
      ) {
        return value[key];
      }
    }
  }

  if (path.isReferencedIdentifier()) {
    const binding = path.scope.getBinding(path.node.name);

    if (binding) {
      if (
        binding.constantViolations.length > 0 ||
        path.node.start < binding.path.node.end
      ) {
        deopt(binding.path, state);
        return;
      }
      if (binding.hasValue) {
        return binding.value;
      }
    }

    const name = path.node.name;
    if (Globals.has(name)) {
      if (!binding) {
        return Globals.get(name);
      }
      deopt(binding.path, state);
      return;
    }

    const resolved = path.resolve();
    if (resolved === path) {
      deopt(path, state);
      return;
    } else {
      return evaluateCached(resolved, state);
    }
  }

  if (path.isUnaryExpression({ prefix: true })) {
    if (path.node.operator === "void") {
      // we don't need to evaluate the argument to know what this will return
      return undefined;
    }

    const argument = path.get("argument");
    if (
      path.node.operator === "typeof" &&
      (argument.isFunction() || argument.isClass())
    ) {
      return "function";
    }

    const arg = evaluateCached(argument, state);
    if (!state.confident) return;
    switch (path.node.operator) {
      case "!":
        return !arg;
      case "+":
        return +arg;
      case "-":
        return -arg;
      case "~":
        return ~arg;
      case "typeof":
        return typeof arg;
    }
  }

  if (path.isArrayExpression()) {
    const arr = [];
    const elems: Array<NodePath> = path.get("elements");
    for (const elem of elems) {
      const elemValue = elem.evaluate();

      if (elemValue.confident) {
        arr.push(elemValue.value);
      } else {
        deopt(elemValue.deopt, state);
        return;
      }
    }
    return arr;
  }

  if (path.isObjectExpression()) {
    const obj = {};
    const props = path.get("properties");
    for (const prop of props) {
      if (prop.isObjectMethod() || prop.isSpreadElement()) {
        deopt(prop, state);
        return;
      }
      const keyPath = (prop as NodePath<t.ObjectProperty>).get("key");
      let key;
      // @ts-expect-error todo(flow->ts): type refinement issues ObjectMethod and SpreadElement somehow not excluded
      if (prop.node.computed) {
        key = keyPath.evaluate();
        if (!key.confident) {
          deopt(key.deopt, state);
          return;
        }
        key = key.value;
      } else if (keyPath.isIdentifier()) {
        key = keyPath.node.name;
      } else {
        key = (
          keyPath.node as t.StringLiteral | t.NumericLiteral | t.BigIntLiteral
        ).value;
      }
      const valuePath = (prop as NodePath<t.ObjectProperty>).get("value");
      let value = valuePath.evaluate();
      if (!value.confident) {
        deopt(value.deopt, state);
        return;
      }
      value = value.value;
      // @ts-expect-error key is any type
      obj[key] = value;
    }
    return obj;
  }

  if (path.isLogicalExpression()) {
    // If we are confident that the left side of an && is false, or the left
    // side of an || is true, we can be confident about the entire expression
    const wasConfident = state.confident;
    const left = evaluateCached(path.get("left"), state);
    const leftConfident = state.confident;
    state.confident = wasConfident;
    const right = evaluateCached(path.get("right"), state);
    const rightConfident = state.confident;

    switch (path.node.operator) {
      case "||":
        // TODO consider having a "truthy type" that doesn't bail on
        // left uncertainty but can still evaluate to truthy.
        state.confident = leftConfident && (!!left || rightConfident);
        if (!state.confident) return;

        return left || right;
      case "&&":
        state.confident = leftConfident && (!left || rightConfident);
        if (!state.confident) return;

        return left && right;
      case "??":
        state.confident = leftConfident && (left != null || rightConfident);
        if (!state.confident) return;

        return left ?? right;
    }
  }

  if (path.isBinaryExpression()) {
    const left = evaluateCached(path.get("left"), state);
    if (!state.confident) return;
    const right = evaluateCached(path.get("right"), state);
    if (!state.confident) return;

    switch (path.node.operator) {
      case "-":
        return left - right;
      case "+":
        return left + right;
      case "/":
        return left / right;
      case "*":
        return left * right;
      case "%":
        return left % right;
      case "**":
        return left ** right;
      case "<":
        return left < right;
      case ">":
        return left > right;
      case "<=":
        return left <= right;
      case ">=":
        return left >= right;
      case "==":
        return left == right; // eslint-disable-line eqeqeq
      case "!=":
        return left != right;
      case "===":
        return left === right;
      case "!==":
        return left !== right;
      case "|":
        return left | right;
      case "&":
        return left & right;
      case "^":
        return left ^ right;
      case "<<":
        return left << right;
      case ">>":
        return left >> right;
      case ">>>":
        return left >>> right;
    }
  }

  if (path.isCallExpression()) {
    const callee = path.get("callee");
    let context;
    let func;

    // Number(1);
    if (
      callee.isIdentifier() &&
      !path.scope.getBinding(callee.node.name) &&
      (isValidObjectCallee(callee.node.name) ||
        isValidIdentifierCallee(callee.node.name))
    ) {
      func = global[callee.node.name];
    }

    if (callee.isMemberExpression()) {
      const object = callee.get("object");
      const property = callee.get("property");

      // Math.min(1, 2)
      if (
        object.isIdentifier() &&
        property.isIdentifier() &&
        isValidObjectCallee(object.node.name) &&
        !isInvalidMethod(property.node.name)
      ) {
        context = global[object.node.name];
        const key = property.node.name;
        // TODO(Babel 8): Use Object.hasOwn
        if (Object.hasOwnProperty.call(context, key)) {
          func = context[key as keyof typeof context];
        }
      }

      // "abc".charCodeAt(4)
      if (object.isLiteral() && property.isIdentifier()) {
        // @ts-expect-error todo(flow->ts): consider checking ast node type instead of value type (StringLiteral and NumberLiteral)
        const type = typeof object.node.value;
        if (type === "string" || type === "number") {
          // @ts-expect-error todo(flow->ts): consider checking ast node type instead of value type
          context = object.node.value;
          func = context[property.node.name];
        }
      }
    }

    if (func) {
      const args = path.get("arguments").map(arg => evaluateCached(arg, state));
      if (!state.confident) return;

      return func.apply(context, args);
    }
  }

  deopt(path, state);
}

function evaluateQuasis(
  path: NodePath<t.TaggedTemplateExpression | t.TemplateLiteral>,
  quasis: Array<any>,
  state: State,
  raw = false,
) {
  let str = "";

  let i = 0;
  const exprs: Array<NodePath<t.Node>> = path.isTemplateLiteral()
    ? path.get("expressions")
    : path.get("quasi.expressions");

  for (const elem of quasis) {
    // not confident, evaluated an expression we don't like
    if (!state.confident) break;

    // add on element
    str += raw ? elem.value.raw : elem.value.cooked;

    // add on interpolated expression if it's present
    const expr = exprs[i++];
    if (expr) str += String(evaluateCached(expr, state));
  }

  if (!state.confident) return;
  return str;
}

/**
 * Walk the input `node` and statically evaluate it.
 *
 * Returns an object in the form `{ confident, value, deopt }`. `confident`
 * indicates whether or not we had to drop out of evaluating the expression
 * because of hitting an unknown node that we couldn't confidently find the
 * value of, in which case `deopt` is the path of said node.
 *
 * Example:
 *
 *   t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
 *   t.evaluate(parse("!true")) // { confident: true, value: false }
 *   t.evaluate(parse("foo + foo")) // { confident: false, value: undefined, deopt: NodePath }
 *
 */

export function evaluate(this: NodePath): {
  confident: boolean;
  value: any;
  deopt?: NodePath;
} {
  const state: State = {
    confident: true,
    deoptPath: null,
    seen: new Map(),
  };
  let value = evaluateCached(this, state);
  if (!state.confident) value = undefined;

  return {
    confident: state.confident,
    deopt: state.deoptPath,
    value: value,
  };
}
