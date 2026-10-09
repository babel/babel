import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  return {
    name: "transform-strict-mode",

    visitor: {
      Program(path) {
        const { node } = path;

        for (const directive of node.directives) {
          if (directive.value.value === "use strict") return;
        }

        path.unshiftContainer(
          "directives",
          t.directive(t.directiveLiteral("use strict")),
        );
      },
    },
  };
});
