import { shouldTransform } from "../lib/util.js";
import { parseSync, traverse } from "@babel/core";

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
    "(function a({ ...a }) {})",
    "(function a([a = 1]) {})",
    "(function a(b, { a: [,...a] }) {})",
  ];

  const negativeCases = [
    "(function () {})",
    "(function a() {})",
    "(function a(a) {})",
    "(function a() { var a })",
    "(function b([a]) { var a })",
    "(function b([a]) { function a() {} })",
    "(function a(x = a) {})",
    "(function a() { var { a } = {}; })",
    "(function b([a]) { var { a } = {}; })",
    "(function a({ [a]: b }) {})",
  ];

  describe("the following cases should be transformed", () => {
    test.each(positiveCases)("%p", input => {
      expect(shouldTransform(getPath(input))).toBe("a");
    });
  });
  describe("the following cases should not be transformed", () => {
    test.each(negativeCases)("%p", input => {
      expect(shouldTransform(getPath(input))).toBe(false);
    });
  });
});
