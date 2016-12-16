import nameFunction from "babel-helper-function-name";

export default function () {
  return {
    visitor: {
      FunctionExpression: {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            let replacement = nameFunction(path);
            if (replacement) path.replaceWith(replacement);
          }
        }
      },

      ObjectProperty(path) {
        let value = path.get("value");
        if (value.isFunction()) {
          let newNode = nameFunction(value);
          if (newNode) value.replaceWith(newNode);
        }
      }
    }
  };
}
