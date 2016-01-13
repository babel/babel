export default function ({ types: t }) {
  function getSpreadLiteral(spread, scope, state) {
    if (state.opts.loose && !t.isIdentifier(spread.argument, { name: "arguments" })) {
      return spread.argument;
    } else {
      return scope.toArray(spread.argument, true);
    }
  }

  function hasSpread(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      if (t.isSpreadElement(nodes[i])) {
        return true;
      }
    }
    return false;
  }

  function build(props: Array, scope, state) {
    let nodes = [];

    let _props = [];

    function push() {
      if (!_props.length) return;
      nodes.push(t.arrayExpression(_props));
      _props = [];
    }

    for (let prop of props) {
      if (t.isSpreadElement(prop)) {
        push();
        nodes.push(getSpreadLiteral(prop, scope, state));
      } else {
        _props.push(prop);
      }
    }

    push();

    return nodes;
  }

  return {
    visitor: {
      ArrayExpression(path, state) {
        let { node, scope } = path;
        let elements = node.elements;
        if (!hasSpread(elements)) return;

        let nodes = build(elements, scope, state);
        let first = nodes.shift();

        if (!t.isArrayExpression(first)) {
          nodes.unshift(first);
          first = t.arrayExpression([]);
        }

        path.replaceWith(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
      },

      CallExpression(path, state) {
        let { node, scope } = path;

        let args = node.arguments;
        if (!hasSpread(args)) return;

        let calleePath = path.get("callee");
        if (calleePath.isSuper()) return;

        let contextLiteral = t.identifier("undefined");

        node.arguments = [];

        let nodes;
        if (args.length === 1 && args[0].argument.name === "arguments") {
          nodes = [args[0].argument];
        } else {
          nodes = build(args, scope, state);
        }

        let first = nodes.shift();
        if (nodes.length) {
          node.arguments.push(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
        } else {
          node.arguments.push(first);
        }

        let callee = node.callee;

        if (calleePath.isMemberExpression()) {
          let temp = scope.maybeGenerateMemoised(callee.object);
          if (temp) {
            callee.object = t.assignmentExpression("=", temp, callee.object);
            contextLiteral = temp;
          } else {
            contextLiteral = callee.object;
          }
          t.appendToMemberExpression(callee, t.identifier("apply"));
        } else {
          node.callee = t.memberExpression(node.callee, t.identifier("apply"));
        }

        node.arguments.unshift(contextLiteral);
      },

      NewExpression(path, state) {
        let { node, scope } = path;
        let args = node.arguments;
        if (!hasSpread(args)) return;

        let nodes = build(args, scope, state);

        let context = t.arrayExpression([t.nullLiteral()]);


        args = t.callExpression(t.memberExpression(context, t.identifier("concat")), nodes);

        path.replaceWith(t.newExpression(
          t.callExpression(
            t.memberExpression(
              t.memberExpression(
                t.memberExpression(
                  t.identifier("Function"),
                  t.identifier("prototype"),
                ),
                t.identifier("bind")
              ),
              t.identifier("apply")
            ),
            [node.callee, args]
          ),
          []
        ));
      }
    }
  };
};
