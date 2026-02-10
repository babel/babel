import { shouldTransform, isPathSimpleArrayWithLength } from "../lib/util.js";
import { parseSync, traverse } from "@babel/core";

function getPath(input, parserOpts = {}, nodeType, index = 1) {
  let targetPath;
  traverse(
    parseSync(input, {
      parserOpts,
      filename: "example.js",
      configFile: false,
    }),
    {
      [nodeType](path, state) {
        state.counter++;
        if (state.counter === index) {
          targetPath = path;
          path.stop();
        }
      },
    },
    undefined,
    { counter: 0 },
  );
  return targetPath;
}

describe("shouldTransform", () => {
  const positiveCases = [
    "const [a, ...rest] = [1, 2]",
    "const [...rest] = [1]",
    "[a, ...rest] = [1, 2]",
    "[...rest] = [1]",
    "var [,...rest] = [1, 2]",
    "[,...rest] = [1, 2]",
    "var [[x, y], ...rest] = [[1, 2], [3, 4]]",
    "const [a, ...rest] = ([1, 2])",
  ];

  const positiveDiscardBindingCases = [
    "const [void, ...rest] = [1, 2]",
    "[void, ...rest] = [1, 2]",
  ];

  const positiveTSCases = [
    "const [a, ...rest] = [1, 2] satisfies number[]",
    "const [...rest] = [1] as T[]",
    "[a, ...rest] = ([1, 2] satisfies number[])",
    "[...rest] = (([1]) as T[])",
  ];

  const negativeCases = [
    "const [a, ...rest] = [1];",
    "const [a, ...rest] = [1,2,];",
    "[a, ...rest] = [1,];",
    "const [...rest] = [1, 2];",
    "[...rest] = [...[1]];",
    "[...rest] = [...[1], 2];",
    "const [a, ...rest] = [...[1, 2]]",
    "var { x: [a, ...rest] } = { x: [1, 2] }",
    "var [a, b, ...rest] = [1, 2]",
    "var a = [0, 42]; var [_, ...rest] = a",
    "var [_, ...rest] = [0].concat(42)",
    "function foo([a, ...rest] = [1, 2]) { return rest }",
  ];

  const negativeNestedCases = [
    "const [[a, ...rest]] = [[1]]",
    "[[a, ...rest]] = [1, 2]",
    "const [[...rest]] = [[1]]",
    "[[...rest]] = [[2]]",
    "var { x: [[a, ...rest]] } = { x: [[1, 2]] }",
  ];

  describe("the following cases should be transformed", () => {
    test.each(positiveCases)("%p", input => {
      expect(
        shouldTransform(getPath(input, {}, "ArrayPattern")),
      ).toHaveProperty("type");
    });
  });
  describe("the following cases with discard binding should be transformed", () => {
    test.each(positiveDiscardBindingCases)("%p", input => {
      expect(
        shouldTransform(
          getPath(
            input,
            {
              plugins: [["discardBinding", { syntaxType: "void" }]],
            },
            "ArrayPattern",
          ),
        ),
      ).toHaveProperty("type");
    });
  });
  describe("the following cases with TypeScript syntax should be transformed", () => {
    test.each(positiveTSCases)("%p", input => {
      expect(
        shouldTransform(
          getPath(
            input,
            { plugins: ["typescript"], createParenthesizedExpressions: true },
            "ArrayPattern",
          ),
        ),
      ).toHaveProperty("type");
    });
  });
  describe("the following cases should not be transformed", () => {
    test.each(negativeCases)("%p", input => {
      expect(shouldTransform(getPath(input, {}, "ArrayPattern"))).toBe(false);
    });
  });
  describe("the following nested cases should not be transformed", () => {
    test.each(negativeNestedCases)("%p", input => {
      expect(shouldTransform(getPath(input, {}, "ArrayPattern", 2))).toBe(
        false,
      );
    });
  });
});

describe("isPathSimpleArrayWithLength", () => {
  const trueCases = [
    ["[1, 2]", 2],
    ["[1, []]", 2],
    ["[1, [[2]]]", 2],
    ["[[]]", 1],
    ["[[...spread], []]", 2],
  ];
  const falseCases = [
    ["[1, 2]", 1],
    ["[1, []]", 3],
    ["[1, [...spread]]", 0],

    ["[1, ...spread]", 2],
    ["[...spread]", 0],
    ["[,...spread]", 1],

    ["[1, 2,]", 2],
    ["[1, 2,]", 3],

    ["[1,,2]", 3],
  ];
  describe("the following cases should return true", () => {
    test.each(trueCases)(
      "isPathSimpleArrayWithLength(%p, %p)",
      (input, count) => {
        const path = getPath(input, {}, "ArrayExpression");
        expect(isPathSimpleArrayWithLength(path, count)).toBe(true);
      },
    );
  });

  describe("the following cases should return false", () => {
    test.each(falseCases)(
      "isPathSimpleArrayWithLength(%p, %p)",
      (input, count) => {
        const path = getPath(input, {}, "ArrayExpression");
        expect(isPathSimpleArrayWithLength(path, count)).toBe(false);
      },
    );
  });
});
