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
            if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
              // polyfill when being run by an older Babel version
              path.ensureFunctionName ??=
                // eslint-disable-next-line no-restricted-globals
                require("@babel/traverse").NodePath.prototype.ensureFunctionName;
            }
            path.ensureFunctionName(supportUnicodeId);
          }
        },
      },

      ObjectProperty(path) {
        const value = path.get("value");
        if (value.isFunction()) {
          if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
            // polyfill when being run by an older Babel version
            value.ensureFunctionName ??=
              // eslint-disable-next-line no-restricted-globals
              require("@babel/traverse").NodePath.prototype.ensureFunctionName;
          }
          // @ts-expect-error Fixme: should check ArrowFunctionExpression
          value.ensureFunctionName(supportUnicodeId);
        }
      },
    },
  };
});
