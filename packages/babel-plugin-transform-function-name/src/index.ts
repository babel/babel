import { isRequired } from "@babel/helper-compilation-targets";
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));
  const supportUnicodeId = !isRequired(
    "transform-unicode-escapes",
    api.targets(),
  );

  return {
    name: "transform-function-name",

    visitor: {
      FunctionExpression: {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            path.ensureFunctionName(supportUnicodeId);
          }
        },
      },

      ObjectProperty(path) {
        const value = path.get("value");
        if (value.isFunction()) {
          // @ts-expect-error Fixme: should check ArrowFunctionExpression
          value.ensureFunctionName(supportUnicodeId);
        }
      },
    },
  };
});
