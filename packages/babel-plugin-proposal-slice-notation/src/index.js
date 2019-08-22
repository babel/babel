import { declare } from "@babel/helper-plugin-utils";
import syntaxSliceNotation from "@babel/plugin-syntax-slice-notation";
import * as t from "@babel/types";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "proposal-pipeline-operator",
    inherits: syntaxSliceNotation,
    visitor: {
      SliceExpression(path, file) {
        const { node, scope } = path;
        path.replaceWith(
          t.callExpression(file.addHelper("slice"), [
            node.object,
            node.lower ?? scope.buildUndefinedNode(),
            node.upper ?? scope.buildUndefinedNode(),
            node.step ?? scope.buildUndefinedNode(),
          ]),
        );
      },
    },
  };
});
