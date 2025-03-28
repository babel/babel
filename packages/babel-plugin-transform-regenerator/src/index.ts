import { declare } from "@babel/helper-plugin-utils";
import { getVisitor } from "./regenerator/visit.ts";

export default declare(({ types: t, assertVersion }) => {
  assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-regenerator",

    visitor: getVisitor(t, file => () => {
      if (!process.env.BABEL_8_BREAKING) {
        if (!file.availableHelper?.("regeneratorRuntime")) {
          // When using an older @babel/helpers version, fallback
          // to the old behavior.
          return t.identifier("regeneratorRuntime");
        }
      }
      return t.callExpression(file.addHelper("regeneratorRuntime"), []);
    }),
  };
});
