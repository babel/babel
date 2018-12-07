import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;

  function getSpreadLiteral(spread, scope) {
    if (loose && !t.isIdentifier(spread.argument, { name: "arguments" })) {
      return spread.argument;
    } else {
      return scope.toArray(spread.argument, true);
    }
  }

  function hasHole(spread) {
    const elements = spread.elements;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] === null) {
        return true;
      }
    }
    return false;
  }

  function hasSpread(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (t.isSpreadElement(nodes[i])) {
        return true;
      }
    }
    return false;
  }

  function push(_props, nodes) {
    if (!_props.length) return _props;
    nodes.push(t.arrayExpression(_props));
    return [];
  }

  function build(props: Array, scope) {
    const nodes = [];
    let _props = [];

    for (const prop of props) {
      if (t.isSpreadElement(prop)) {
        _props = push(_props, nodes);
        let spreadLiteral = getSpreadLiteral(prop, scope);
        if (t.isArrayExpression(spreadLiteral) && hasHole(spreadLiteral)) {
          spreadLiteral = t.callExpression(
            this.addHelper("toConsumableArray"),
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
      ArrayExpression(path) {
        const { node, scope } = path;
        const elements = node.elements;
        if (!hasSpread(elements)) return;

        const nodes = build.call(this, elements, scope);
        const first = nodes.shift();

        if (nodes.length === 0 && first !== elements[0].argument) {
          path.replaceWith(first);
          return;
        }

        path.replaceWith(
          t.callExpression(
            t.memberExpression(first, t.identifier("concat")),
            nodes,
          ),
        );
      },

      CallExpression(path) {
        const { node, scope } = path;

        const args = node.arguments;
        if (!hasSpread(args)) return;

        const calleePath = path.get("callee");
        if (calleePath.isSuper()) return;

        let contextLiteral = scope.buildUndefinedNode();

        node.arguments = [];

        let nodes;
        if (args.length === 1 && args[0].argument.name === "arguments") {
          nodes = [args[0].argument];
        } else {
          nodes = build(args, scope);
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

        const callee = node.callee;

        if (calleePath.isMemberExpression()) {
          const temp = scope.maybeGenerateMemoised(callee.object);
          if (temp) {
            callee.object = t.assignmentExpression("=", temp, callee.object);
            contextLiteral = temp;
          } else {
            contextLiteral = t.cloneNode(callee.object);
          }
          t.appendToMemberExpression(callee, t.identifier("apply"));
        } else {
          node.callee = t.memberExpression(node.callee, t.identifier("apply"));
        }

        if (t.isSuper(contextLiteral)) {
          contextLiteral = t.thisExpression();
        }

        node.arguments.unshift(t.cloneNode(contextLiteral));
      },

      NewExpression(path) {
        const { node, scope } = path;
        let args = node.arguments;
        if (!hasSpread(args)) return;

        const nodes = build(args, scope);

        const first = nodes.shift();

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
            node.callee,
            args,
          ]),
        );
      },
    },
  };
});
