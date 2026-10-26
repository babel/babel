import { transformSync } from "@babel/core";
import { createDestructuringPlugin, FEATURES } from "../lib/index.js";

function transform(code, probe) {
  return transformSync(code, {
    configFile: false,
    babelrc: false,
    sourceType: "script",
    plugins: [
      api =>
        createDestructuringPlugin({
          name: "test-destructuring",
          feature: FEATURES.objectSpread,
          api,
        }),
      probe,
    ],
  });
}

it("keeps the parent of the paths reused when lowering object spread", () => {
  let checked = 0;
  transform(`var o = { ...a, b: 1, get c() { return d; } };`, () => ({
    visitor: {
      CallExpression(path) {
        for (const arg of path.get("arguments")) {
          expect(arg.parent).toBe(path.node);
          expect(arg.parentPath).toBe(path);
          checked++;
        }
      },
      ObjectExpression(path) {
        for (const prop of path.get("properties")) {
          expect(prop.parent).toBe(path.node);
          expect(prop.parentPath).toBe(path);
          checked++;
        }
      },
    },
  }));
  expect(checked).toBeGreaterThan(3);
});
