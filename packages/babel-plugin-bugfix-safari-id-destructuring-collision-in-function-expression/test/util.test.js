import { parseSync, traverse } from "@babel/core";
import { shouldTransform } from "../src/util.ts";

function getPath(input, parserOpts = {}) {
  let targetPath;
  traverse(
    parseSync(input, {
      parserOpts,
      filename: "example.js",
      configFile: false,
    }),
    {
      FunctionExpression(path) {
        targetPath = path;
        path.stop();
      },
    },
  );
  return targetPath;
}

describe("shouldTransform", () => {
  const positiveCases = [
    "(function a([a]) {})",
    "({ b: function a([a]) {} })",
    "(function a({a}) {})",
    "(function a(...a) {})",
    "(function a([a = 1]) {})",
  ];

  const negativeCases = [
    "(function () {})",
    "(function a() {})",
    "(function a(a) {})",
    "(function a() { var a })",
    "(function a(x = a) {})",
    "(function a() { var { a } = {}; })",
  ];

  describe("default parser options", () => {
    test.each(positiveCases)("shouldTransform(%p) should return 'a'", input => {
      expect(shouldTransform(getPath(input))).toBe("a");
    });
    test.each(negativeCases)(
      "shouldTransform(in %p) should return false",
      input => {
        expect(shouldTransform(getPath(input))).toBe(false);
      },
    );
  });
});
