import { declare } from "@babel/helper-plugin-utils";
import regeneratorTransform from "regenerator-transform";

export default declare(({ types: t, assertVersion }) => {
  assertVersion(7);

  return {
    name: "transform-regenerator",

    inherits: regeneratorTransform.default,

    visitor: {
      // We visit MemberExpression so that we always transform
      // regeneratorRuntime before babel-plugin-polyfill-regenerator.
      MemberExpression(path) {
        const obj = path.get("object");
        if (obj.isIdentifier({ name: "regeneratorRuntime" })) {
          try {
            obj.replaceWith(
              t.callExpression(this.addHelper("regeneratorRuntime"), []),
            );
          } catch {
            // When using an older @babel/helpers version, fallback
            // to the old behavior
          }
        }
      },
    },
  };
});
