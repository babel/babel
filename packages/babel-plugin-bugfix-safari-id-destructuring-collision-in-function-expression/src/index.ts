import { declare } from "@babel/helper-plugin-utils";
import { shouldTransform } from "./util.ts";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.16.0"));

  return {
    name: "plugin-bugfix-safari-id-destructuring-collision-in-function-expression",

    visitor: {
      FunctionExpression(path) {
        const name = shouldTransform(path);
        if (name) {
          // Now we have (function a([a]) {})
          const { scope } = path;
          // invariant: path.node.id is always an Identifier here
          const newParamName = scope.generateUid(name);
          scope.rename(name, newParamName);
        }
      },
    },
  };
});
