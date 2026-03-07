import { declare } from "@babel/helper-plugin-utils";
import { shouldTransform } from "./util.ts";

export default declare(api => {
  const { types: t, assertVersion } = api;
  assertVersion(REQUIRED_VERSION(7));

  return {
    name: "plugin-bugfix-safari-rest-destructuring-rhs-array",

    visitor: {
      ArrayPattern(path) {
        const rhs = shouldTransform(path);
        if (rhs) {
          // The most minimal approach is to add a trailing comma to the rhs array,
          // but that would be easily reverted by minifiers, so instead we wrap both sides
          // in an array
          path.replaceWith(t.arrayPattern([path.node]));
          rhs.replaceWith(t.arrayExpression([rhs.node]));
        }
      },
    },
  };
});
