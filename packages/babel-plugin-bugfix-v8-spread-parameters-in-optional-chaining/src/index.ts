import { declare } from "@babel/helper-plugin-utils";
import { transform } from "@babel/plugin-proposal-optional-chaining";
import { shouldTransform } from "./util";

export default declare(api => {
  api.assertVersion(7);

  const noDocumentAll = api.assumption("noDocumentAll");
  const pureGetters = api.assumption("pureGetters");

  return {
    name: "bugfix-v8-spread-parameters-in-optional-chaining",

    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(path) {
        if (shouldTransform(path)) {
          transform(path, { noDocumentAll, pureGetters });
        }
      },
    },
  };
});
