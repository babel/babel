import type NodePath from "./index";
import * as t from "../../types";

const BOOLEAN_BINARY_OPERATORS = ["==", "===", "!=", "!==", ">", "<", ">=", "<=", "in", "instanceof"];
const NUMBER_BINARY_OPERATORS  = ["-", "/", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];

const BOOLEAN_UNARY_OPERATORS = ["delete"];
const NUMBER_UNARY_OPERATORS  = ["+", "-", "++", "--", "~"];
const STRING_UNARY_OPERATORS  = ["typeof"];

/**
 * Description
 */

export function getTypeAnnotation() {
  return this.getTypeAnnotationInfo().annotation;
}

/**
 * Description
 */

export function getTypeAnnotationInfo(): {
  inferred: boolean;
  annotation: ?Object;
} {
  if (this.typeInfo) {
    return this.typeInfo;
  }

  var info = this.typeInfo = {
    inferred: false,
    annotation: null
  };

  var type = this.node && this.node.typeAnnotation;

  if (!type) {
    info.inferred = true;
    type = this.inferTypeAnnotation();
  }

  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
  info.annotation = type;

  return info;
}

/**
 * Resolves `NodePath` pointers until it resolves to an absolute path. ie. a data type instead of a
 * call etc. If a data type can't be resolved then the last path we were at is returned.
 */

export function resolve(resolved) {
  return this._resolve(resolved) || this;
}

export function _resolve(resolved?): ?NodePath {
  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
  if (resolved && resolved.indexOf(this) >= 0) return;

  // we store all the paths we've "resolved" in this array to prevent infinite recursion
  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(resolved);
    } else {
      // otherwise it's a request for a pattern and that's a bit more tricky
    }
  } else if (this.isReferencedIdentifier()) {
    var binding = this.scope.getBinding(this.node.name);
    if (!binding) return;

    // reassigned so we can't really resolve it
    if (!binding.constant) return;

    // todo - lookup module in dependency graph
    if (binding.kind === "module") return;

    if (binding.path !== this) {
      return binding.path.resolve(resolved);
    }
  } else if (this.isMemberExpression()) {
    // this is dangerous, as non-direct target assignments will mutate it's state
    // making this resolution inaccurate

    var targetKey = this.toComputedKey();
    if (!t.isLiteral(targetKey)) return;

    var targetName = targetKey.value;

    var target = this.get("object").resolve(resolved);

    if (target.isObjectExpression()) {
      var props = target.get("properties");
      for (var prop of (props: Array)) {
        if (!prop.isProperty()) continue;

        var key = prop.get("key");

        // { foo: obj }
        var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

        // { "foo": "obj" } or { ["foo"]: "obj" }
        match = match || key.isLiteral({ value: targetName });

        if (match) return prop.get("value").resolve(resolved);
      }
    } else if (target.isArrayExpression() && !isNaN(+targetName)) {
      var elems = target.get("elements");
      var elem = elems[targetName];
      if (elem) return elem.resolve(resolved);
    }
  }
}

/**
 * Infer the type of the current `NodePath`.
 *
 * NOTE: This is not cached. Use `getTypeAnnotation()` which is cached.
 */

export function inferTypeAnnotation(force) {
  return this._inferTypeAnnotation(force) || t.anyTypeAnnotation();
}

export function _inferTypeAnnotation(force?: boolean): ?Object {
  var path = this.resolve();

  var node = path.node;
  if (!node) return;

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  if (path.isRestElement() || path.parentPath.isRestElement() || path.isArrayExpression()) {
    return t.genericTypeAnnotation(t.identifier("Array"));
  }

  if (path.parentPath.isTypeCastExpression()) {
    return path.parentPath.inferTypeAnnotation();
  }

  if (path.isTypeCastExpression()) {
    return node.typeAnnotation;
  }

  if (path.parentPath.isReturnStatement() && !force) {
    return path.parentPath.inferTypeAnnotation();
  }

  if (path.isReturnStatement()) {
    var funcPath = this.findParent((node, path) => path.isFunction());
    if (!funcPath) return;

    var returnType = funcPath.node.returnType;
    if (returnType) {
      return returnType;
    } else {
      return this.get("argument").inferTypeAnnotation(true);
    }
  }

  if (path.isNewExpression() && path.get("callee").isIdentifier()) {
    // only resolve identifier callee
    return t.genericTypeAnnotation(node.callee);
  }

  if (path.isReferencedIdentifier()) {
    if (node.name === "undefined") {
      return t.voidTypeAnnotation();
    } else if (node.name === "NaN") {
      return t.numberTypeAnnotation();
    }
  }

  if (path.isObjectExpression()) {
    return t.genericTypeAnnotation(t.identifier("Object"));
  }

  if (path.isFunction() && path.parentPath.isProperty({ kind: "get" })) {
    return node.returnType;
  }

  if (path.isFunction() || path.isClass()) {
    return t.genericTypeAnnotation(t.identifier("Function"));
  }

  if (path.isUnaryExpression()) {
    let operator = node.operator;

    if (operator === "void") {
      return t.voidTypeAnnotation();
    } else if (NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else if (STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
      return t.stringTypeAnnotation();
    } else if (BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
      return t.booleanTypeAnnotation();
    }
  }

  if (path.isBinaryExpression()) {
    let operator = node.operator;

    if (NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.numberTypeAnnotation();
    } else if (BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
      return t.booleanTypeAnnotation();
    } else if (operator === "+") {
      var right = path.get("right").resolve();
      var left  = path.get("left").resolve();

      if (left || right) {
        if (left.isTypeAnnotationGeneric("Number") && right.isTypeAnnotationGeneric("Number")) {
          // both numbers so this will be a number
          return t.numberTypeAnnotation();
        } else if (left.isTypeAnnotationGeneric("String") || right.isTypeAnnotationGeneric("String")) {
          // one is a string so the result will be a string
          return t.stringTypeAnnotation();
        }
      }

      // unsure if left and right are strings or numbers so stay on the safe side
      return t.unionTypeAnnotation([
        t.stringTypeAnnotation(),
        t.numberTypeAnnotation()
      ]);
    }
  }

  if (path.isLogicalExpression()) {
    // todo: create UnionType of left and right annotations
  }

  if (path.isConditionalExpression()) {
    // todo: create UnionType of consequent and alternate annotations
  }

  if (path.isSequenceExpression()) {
    return this.get("expressions").pop().inferTypeAnnotation(force);
  }

  if (path.isAssignmentExpression()) {
    return this.get("right").inferTypeAnnotation(force);
  }

  if (path.isUpdateExpression()) {
    let operator = node.operator;
    if (operator === "++" || operator === "--") {
      return t.numberTypeAnnotation();
    }
  }

  if (path.isUnaryExpression() && node.prefix) {
    let operator = node.operator;
    if (operator === "!") {
      return t.booleanTypeAnnotation();
    } else if (operator === "+" || operator === "-") {
      return t.numberTypeAnnotation();
    }
  }

  if (path.isLiteral()) {
    var value = node.value;
    if (typeof value === "string") return t.stringTypeAnnotation();
    if (typeof value === "number") return t.numberTypeAnnotation();
    if (typeof value === "boolean") return t.booleanTypeAnnotation();
    if (node.regex) return t.genericTypeAnnotation(t.identifier("RegExp"));
  }

  if (path.isCallExpression()) {
    var callee = path.get("callee").resolve();
    // todo: read typescript/flow interfaces
    if (callee.isNodeType("Function")) return callee.node.returnType;
  }
}

/**
 * Description
 */

export function isTypeAnnotationGeneric(genericName: string, opts = {}): boolean {
  var typeInfo = this.getTypeAnnotationInfo();
  var type     = typeInfo.annotation;
  if (!type) return false;

  if (typeInfo.inferred && opts.inference === false) {
    return false;
  }

  if (t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName })) {
    if (opts.requireTypeParameters && !type.typeParameters) {
      return false;
    } else {
      return true;
    }
  }

  if (genericName === "String") {
    return t.isStringTypeAnnotation(type);
  } else if (genericName === "Number") {
    return t.isNumberTypeAnnotation(type);
  } else if (genericName === "Boolean") {
    return t.isBooleanTypeAnnotation(type);
  }

  return false;
}
