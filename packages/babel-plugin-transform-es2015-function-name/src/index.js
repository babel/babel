import * as t from "babel-types";
import nameFunction from "babel-helper-function-name";

export default function () {
  return {
    visitor: {
      "ArrowFunctionExpression|FunctionExpression": {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            let replacement = nameFunction(path);
            if (replacement) path.replaceWith(replacement);
          }
        }
      },

      ObjectExpression(path) {
        let props: Array<Object> = path.get("properties");

        for (let prop of props) {
          if (prop.isObjectMethod({ kind: "method", computed: false })) {
            let node = prop.node;
            prop.replaceWith(t.objectProperty(
              node.key,
              t.functionExpression(null, node.params, node.body, node.generator, node.async)
            ));
          }

          if (prop.isObjectProperty()) {
            let value = prop.get("value");
            if (value.isFunction()) {
              let newNode = nameFunction(value);
              if (newNode) value.replaceWith(newNode);
            }
          }
        }
      }
    }
  };
}
