export default function ({ types: t }) {
  return {
    inherits: require("babel-plugin-syntax-pipeline-operator"),

    visitor: {

      BinaryExpression(path) {
        if (path.node.operator === "|>") {
          let right = path.node.right;

          if (
            right.type === "ArrowFunctionExpression" &&
            right.params.length === 1 &&
            t.isIdentifier(right.params[0]) &&
            t.isExpression(right.body)
          ) {
            //
            // Optimize away arrow function!
            //
            // This step converts:
            //    let result = arg |> x => x + x;
            // To:
            //    let _x = arg;
            //    let result = arg |> x => x + x;
            //
            let paramName = right.params[0].name;
            let placeholder = path.scope.generateUidIdentifier(paramName);
            path.parentPath.insertBefore(t.variableDeclarator(placeholder, path.node.left));

            //
            // This step converts:
            //    let _x = arg;
            //    let result = arg |> x => x + x;
            // To:
            //    let _x = arg;
            //    let result = arg |> _x => _x + _x;
            //
            path.get("right").scope.rename(paramName, placeholder.name);

            //
            // This step converts:
            //    let _x = arg;
            //    let result = arg |> _x => _x + _x;
            // To:
            //    let _x = arg;
            //    let result = _x + _x;
            //
            path.replaceWith(right.body);
          } else {
            //
            // Simple invocation.
            //
            // Converts:
            //    x |> obj.f;
            // To:
            //    obj.f(x);
            //
            path.replaceWith(t.callExpression(path.node.right, [ path.node.left ]));
          }
        }
      }

    }
  };
}
