import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare((api, options) => {
  api.assertVersion(7);

  const { helperVersion = "7.0.0-beta.0" } = options;

  return {
    pre(file) {
      file.set("helperGenerator", name => {
        // If the helper didn't exist yet at the version given, we bail
        // out and let Babel either insert it directly, or throw an error
        // so that plugins can handle that case properly.
        if (
          file.availableHelper &&
          !file.availableHelper(name, helperVersion)
        ) {
          return;
        }

        return t.memberExpression(
          t.identifier("babelHelpers"),
          t.identifier(name),
        );
      });
    },
  };
});
