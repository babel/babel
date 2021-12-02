import { declare } from "@babel/helper-plugin-utils";
import { skipTransparentExprWrappers } from "@babel/helper-skip-transparent-expression-wrappers";
import { types as t, File } from "@babel/core";
import type { NodePath, Scope } from "@babel/traverse";

type ListElement = t.SpreadElement | t.Expression;
type ArrayExpressionElement = ListElement | null;

class LazyTemporary {
  scope: Scope;
  name: string | undefined;
  uid: t.Identifier | undefined;

  constructor(scope: Scope, name?: string) {
    this.scope = scope;
    this.name = name;
  }

  assign(value: t.Expression): t.AssignmentExpression {
    return t.assignmentExpression("=", this.clone(), value);
  }

  clone(): t.Identifier {
    if (this.uid) {
      return t.cloneNode(this.uid);
    }
    return (this.uid = this.scope.generateDeclaredUidIdentifier(this.name));
  }

  get declared(): boolean {
    return !!this.uid;
  }
}

export default declare((api, options) => {
  api.assertVersion(7);

  const iterableIsArray = api.assumption("iterableIsArray") ?? options.loose;
  const arrayLikeIsIterable =
    options.allowArrayLike ?? api.assumption("arrayLikeIsIterable");

  function isArrayBinding(node: t.Node, scope: Scope): boolean {
    if (t.isIdentifier(node)) {
      const binding = scope.getBinding(node.name);
      if (binding?.constant && binding.path.isGenericType("Array")) {
        return true;
      }
    }
    return false;
  }

  function hasSpread(nodes: Array<t.Node>): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (t.isSpreadElement(nodes[i])) {
        return true;
      }
    }
    return false;
  }

  function member(target: t.Expression, ...props: string[]): t.Expression {
    let result = target;
    for (const prop of props) {
      result = t.memberExpression(result, t.identifier(prop));
    }
    return result;
  }

  function voidZero() {
    return t.unaryExpression("void", t.numericLiteral(0), true);
  }

  function flattenSpreadElements(
    elements: readonly ArrayExpressionElement[],
    fillHoles: boolean,
    dest: ArrayExpressionElement[] = [],
  ): ArrayExpressionElement[] {
    for (const item of elements) {
      if (t.isSpreadElement(item) && t.isArrayExpression(item.argument)) {
        // unwrap nested spread, always filling holes
        flattenSpreadElements(item.argument.elements, true, dest);
      } else {
        dest.push(item === null && fillHoles ? voidZero() : item);
      }
    }
    return dest;
  }

  function collectSpreadChunks(
    elements: readonly ArrayExpressionElement[],
  ): t.Expression[] {
    const result: t.Expression[] = [];
    const nonSpreadValues: (t.Expression | null)[] = [];
    for (const item of elements) {
      if (t.isSpreadElement(item)) {
        if (nonSpreadValues.length > 0) {
          result.push(t.arrayExpression(nonSpreadValues.splice(0)));
        }
        result.push(item.argument);
      } else {
        nonSpreadValues.push(item);
      }
    }
    if (nonSpreadValues.length > 0) {
      result.push(t.arrayExpression(nonSpreadValues));
    }
    return result;
  }

  function popArrayExpression(nodes: t.Expression[]): t.ArrayExpression {
    const n = nodes.length;
    return n > 0 && t.isArrayExpression(nodes[n - 1])
      ? (nodes.pop() as t.ArrayExpression)
      : t.arrayExpression([]);
  }

  function buildAccumulate(
    file: File,
    accum: t.Expression,
    chunk: t.Expression,
  ): t.CallExpression {
    const helper = file.addHelper(
      arrayLikeIsIterable
        ? "spreadIterableOrArrayLike"
        : "spreadIterableOrArray",
    );
    return t.callExpression(helper, [accum, chunk]);
  }

  function buildCoerce(file: File, chunk: t.Expression): t.CallExpression {
    const helper = file.addHelper(
      arrayLikeIsIterable ? "spreadCoerceToArrayLike" : "spreadCoerceToArray",
    );
    return t.callExpression(helper, [chunk]);
  }

  function buildArraySpread(
    props: readonly ArrayExpressionElement[],
    scope: Scope,
    file: File,
  ): t.Expression {
    const flatProps = flattenSpreadElements(props, false);
    const flatChunks = collectSpreadChunks(flatProps);
    const resultHasHoles = props.includes(null);
    const nodes: t.Expression[] = [];
    const tmp = new LazyTemporary(scope, "sprd");

    for (let spreadChunk of flatChunks) {
      if (t.isArrayExpression(spreadChunk)) {
        // no transform necessary
      } else if (t.isIdentifier(spreadChunk, { name: "arguments" })) {
        // convert `arguments` to array using `tmp.push.apply` because it
        // is faster than passing them to any other function, for example
        // `Array.prototype.slice.call`
        const acc = popArrayExpression(nodes);
        const callPushApply = t.callExpression(
          member(tmp.assign(acc), "push", "apply"),
          [tmp.clone(), spreadChunk],
        );
        spreadChunk = t.sequenceExpression([callPushApply, tmp.clone()]);
      } else if (iterableIsArray || isArrayBinding(spreadChunk, scope)) {
        if (resultHasHoles || flatChunks.length === 1) {
          spreadChunk = t.callExpression(file.addHelper("concatArrayLike"), [
            spreadChunk,
          ]);
        }
      } else if (resultHasHoles || flatChunks.length === 1) {
        const acc = popArrayExpression(nodes);
        spreadChunk = buildAccumulate(file, acc, spreadChunk);
      } else {
        spreadChunk = buildCoerce(file, spreadChunk);
      }
      nodes.push(spreadChunk);
    }

    if (nodes.length === 0) {
      return t.arrayExpression([]);
    }
    if (nodes.length === 1) {
      return nodes[0];
    }
    const callee = resultHasHoles
      ? member(nodes.shift(), "concat")
      : file.addHelper("concatArrayLike");
    return t.callExpression(callee, nodes);
  }

  function buildCallSpread(
    props: readonly ListElement[],
    forceUnpackArguments: boolean,
    scope: Scope,
    file: File,
  ): t.Expression {
    const flatProps = flattenSpreadElements(props, true);
    const flatChunks = collectSpreadChunks(flatProps);
    const needAccumulator = flatChunks.length > 1;
    const nodes: t.Expression[] = [];
    const tmp = new LazyTemporary(scope, "sprd");

    const hasArguments = flatChunks.some(chunk =>
      t.isIdentifier(chunk, { name: "arguments" }),
    );

    const everyChunkIsArray = hasArguments
      ? false
      : iterableIsArray ||
        flatChunks.every(
          chunk => t.isArrayExpression(chunk) || isArrayBinding(chunk, scope),
        );

    function popAccumulator(...props: string[]): t.Expression {
      let acc = nodes.length ? nodes.pop() : t.arrayExpression([]);
      for (const prop of props) {
        acc = t.memberExpression(
          tmp.declared ? acc : tmp.assign(acc),
          t.identifier(prop),
        );
      }
      return acc;
    }

    for (let spreadChunk of flatChunks) {
      if (everyChunkIsArray) {
        // based on `api.assumption` or type inference, all the spread chunks
        // are arrays, so instead of incrementally building a temporary with
        // `.push` or `appendArrayLike` helper, simply collect the nodes and
        // `.concat` them at the end
        if (
          nodes.length === 0 &&
          needAccumulator &&
          !t.isArrayExpression(spreadChunk)
        ) {
          // ensure we call `.concat` on a built-in array,
          // not on whatever the first spread element is
          nodes.push(t.arrayExpression([]));
        }
      } else if (t.isArrayExpression(spreadChunk)) {
        if (nodes.length > 0) {
          const callPush = t.callExpression(
            popAccumulator("push"),
            spreadChunk.elements,
          );
          nodes.push(callPush);
          spreadChunk = tmp.clone();
        }
      } else if (t.isIdentifier(spreadChunk, { name: "arguments" })) {
        if (needAccumulator || forceUnpackArguments) {
          // convert `arguments` to array using `tmp.push.apply` because it
          // is faster than passing them to any other function, for example
          // `Array.prototype.slice.call`
          const callPushApply = t.callExpression(
            popAccumulator("push", "apply"),
            [tmp.clone(), spreadChunk],
          );
          nodes.push(callPushApply);
          spreadChunk = tmp.clone();
        }
      } else if (iterableIsArray || isArrayBinding(spreadChunk, scope)) {
        if (needAccumulator) {
          spreadChunk = t.callExpression(file.addHelper("appendArrayLike"), [
            popAccumulator(),
            spreadChunk,
          ]);
        }
      } else if (needAccumulator) {
        spreadChunk = buildAccumulate(file, popAccumulator(), spreadChunk);
      } else {
        spreadChunk = buildCoerce(file, spreadChunk);
      }
      nodes.push(spreadChunk);
    }

    if (nodes.length === 0) {
      return t.arrayExpression([]);
    }
    if (nodes.length === 1) {
      return nodes[0];
    }
    if (everyChunkIsArray) {
      const callee = member(nodes.shift(), "concat");
      return t.callExpression(callee, nodes);
    }
    return t.sequenceExpression(nodes);
  }

  return {
    name: "transform-spread",

    visitor: {
      ArrayExpression(path: NodePath<t.ArrayExpression>): void {
        const { node, scope } = path;
        const { elements } = node;
        if (!hasSpread(elements)) return;

        path.replaceWith(buildArraySpread(elements, scope, this));
      },

      CallExpression(path: NodePath<t.CallExpression>): void {
        const { node, scope } = path;

        const args = node.arguments as Array<ListElement>;
        if (!hasSpread(args)) return;
        const calleePath = skipTransparentExprWrappers(
          path.get("callee") as NodePath<t.Expression>,
        );
        if (calleePath.isSuper()) {
          // NOTE: spread and classes have almost the same compat data, so this is very unlikely to happen in practice.
          throw path.buildCodeFrameError(
            "It's not possible to compile spread arguments in `super()` without compiling classes.\n" +
              "Please add '@babel/plugin-transform-classes' to your Babel configuration.",
          );
        }

        const accumulated = buildCallSpread(args, false, scope, this);
        if (t.isArrayExpression(accumulated)) {
          node.arguments = accumulated.elements;
          return;
        }

        let contextLiteral: t.Expression = voidZero();

        const callee = calleePath.node as t.MemberExpression;

        if (t.isMemberExpression(callee)) {
          const temp = scope.maybeGenerateMemoised(callee.object);
          if (temp) {
            callee.object = t.assignmentExpression("=", temp, callee.object);
            contextLiteral = t.cloneNode(temp);
          } else if (t.isSuper(callee.object)) {
            contextLiteral = t.thisExpression();
          } else {
            contextLiteral = t.cloneNode(callee.object);
          }
        }

        // We use the original callee here, to preserve any types/parentheses
        node.callee = t.memberExpression(
          node.callee as t.Expression,
          t.identifier("apply"),
        );

        node.arguments = [contextLiteral, accumulated];
      },

      NewExpression(path: NodePath<t.NewExpression>): void {
        const { node, scope } = path;
        if (!hasSpread(node.arguments)) return;

        const args = node.arguments as readonly ListElement[];
        const accumulated = buildCallSpread(args, true, scope, this);

        path.replaceWith(
          t.callExpression(path.hub.addHelper("construct"), [
            node.callee as t.Expression,
            accumulated,
          ]),
        );
      },
    },
  };
});
