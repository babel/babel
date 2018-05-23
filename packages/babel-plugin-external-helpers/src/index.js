import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    pre(file) {
      file.set("helpersNamespace", t.identifier("babelHelpers"));
    },
  };
});
