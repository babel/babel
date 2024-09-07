import { declare } from "@babel/helper-plugin-utils";
import { skipTransparentExprWrappers } from "@babel/helper-skip-transparent-expression-wrappers";
import { types as t, template } from "@babel/core";
import type { File, NodePath, Scope } from "@babel/core";

type ListElement = t.SpreadElement | t.Expression;

export interface Options {
  allowArrayLike?: boolean;
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const iterableIsArray = api.assumption("iterableIsArray") ?? options.loose;
  const arrayLikeIsIterable =
    options.allowArrayLike ?? api.assumption("arrayLikeIsIterable");

  function getSpreadLiteral(
    spread: t.SpreadElement,
    scope: Scope,
  ): t.Expression {
    if (
      iterableIsArray &&
      !t.isIdentifier(spread.argument, { name: "arguments" })
    ) {
      return spread.argument;
    } else {
      const node = spread.argument;

      if (t.isIdentifier(node)) {
        const binding = scope.getBinding(node.name);
        if (binding?.constant && binding.path.isGenericType("Array")) {
          return node;
        }
      }

      if (t.isArrayExpression(node)) {
        return node;
      }

      if (t.isIdentifier(node, { name: "arguments" })) {
        return template.expression.ast`
          Array.prototype.slice.call(${node})
        `;
      }

      const args = [node];
      let helperName = "toConsumableArray";

      if (arrayLikeIsIterable) {
        args.unshift(scope.path.hub.addHelper(helperName));
        helperName = "maybeArrayLike";
      }

      return t.callExpression(scope.path.hub.addHelper(helperName), args);
    }
  }

  function hasHole(spread: t.ArrayExpression): boolean {
    return spread.elements.some(el => el === null);
  }

  function hasSpread(nodes: Array<t.Node>): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (t.isSpreadElement(nodes[i])) {
        return true;
      }
    }
    return false;
  }

  function push(_props: Array<ListElement>, nodes: Array<t.Expression>) {
    if (!_props.length) return _props;
    nodes.push(t.arrayExpression(_props));
    return [];
  }

  function build(
    props: Array<ListElement>,
    scope: Scope,
    file: File,
  ): t.Expression[] {
    const nodes: Array<t.Expression> = [];
    let _props: Array<ListElement> = [];

    for (const prop of props) {
      if (t.isSpreadElement(prop)) {
        _props = push(_props, nodes);
        let spreadLiteral = getSpreadLiteral(prop, scope);

        if (t.isArrayExpression(spreadLiteral) && hasHole(spreadLiteral)) {
          spreadLiteral = t.callExpression(
            file.addHelper(
              process.env.BABEL_8_BREAKING
                ? "arrayLikeToArray"
                : "arrayWithoutHoles",
            ),
            [spreadLiteral],
          );
        }

        nodes.push(spreadLiteral);
      } else {
        _props.push(prop);
      }
    }

    push(_props, nodes);

    return nodes;
  }

  return {
    name: "transform-spread",

    visitor: {
      ArrayExpression(path): void {
        const { node, scope } = path;
        const elements = node.elements;
        if (!hasSpread(elements)) return;

        const nodes = build(elements, scope, this.file);
        let first = nodes[0];

        // If there is only one element in the ArrayExpression and
        // the element was transformed (Array.prototype.slice.call or toConsumableArray)
        // we know that the transformed code already takes care of cloning the array.
        // So we can simply return that element.
        if (
          nodes.length === 1 &&
          first !== (elements[0] as t.SpreadElement).argument
        ) {
          path.replaceWith(first);
          return;
        }

        // If the first element is a ArrayExpression we can directly call
        // concat on it.
        // `[..].concat(..)`
        // If not then we have to use `[].concat(arr)` and not `arr.concat`
        // because `arr` could be extended/modified (e.g. Immutable) and we do not know exactly
        // what concat would produce.
        if (!t.isArrayExpression(first)) {
          first = t.arrayExpression([]);
        } else {
          nodes.shift();
        }

        path.replaceWith(
          t.callExpression(
            t.memberExpression(first, t.identifier("concat")),
            nodes,
          ),
        );
      },
      CallExpression(path): void {
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
        let contextLiteral: t.Expression | t.Super = scope.buildUndefinedNode();
        node.arguments = [];

        let nodes: t.Expression[];
        if (
          args.length === 1 &&
          t.isIdentifier((args[0] as t.SpreadElement).argument, {
            name: "arguments",
          })
        ) {
          nodes = [(args[0] as t.SpreadElement).argument];
        } else {
          nodes = build(args, scope, this.file);
        }

        const first = nodes.shift();
        if (nodes.length) {
          node.arguments.push(
            t.callExpression(
              t.memberExpression(first, t.identifier("concat")),
              nodes,
            ),
          );
        } else {
          node.arguments.push(first);
        }

        const callee = calleePath.node as t.MemberExpression;

        if (t.isMemberExpression(callee)) {
          const temp = scope.maybeGenerateMemoised(callee.object);
          if (temp) {
            callee.object = t.assignmentExpression(
              "=",
              temp,
              // object must not be Super when `temp` is an identifier
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              callee.object as t.Expression,
            );
            contextLiteral = temp;
          } else {
            contextLiteral = t.cloneNode(callee.object);
          }
        }

        // We use the original callee here, to preserve any types/parentheses
        node.callee = t.memberExpression(
          node.callee as t.Expression,
          t.identifier("apply"),
        );
        if (t.isSuper(contextLiteral)) {
          contextLiteral = t.thisExpression();
        }

        node.arguments.unshift(t.cloneNode(contextLiteral));
      },

      NewExpression(path): void {
        const { node, scope } = path;
        if (!hasSpread(node.arguments)) return;

        const nodes = build(
          node.arguments as Array<ListElement>,
          scope,
          this.file,
        );

        const first = nodes.shift();

        let args: t.Expression;
        if (nodes.length) {
          args = t.callExpression(
            t.memberExpression(first, t.identifier("concat")),
            nodes,
          );
        } else {
          args = first;
        }

        path.replaceWith(
          t.callExpression(path.hub.addHelper("construct"), [
            node.callee as t.Expression,
            args,
          ]),
        );
      },
    },
  };
});
