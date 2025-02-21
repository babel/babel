import runner from "@babel/helper-transform-fixture-test-runner";
import { fileURLToPath } from "url";
import path from "path";
import cloneDeep from "../lib/transformation/util/clone-deep.js";
import { itBabel8 } from "$repo-utils";

(runner.default || runner)(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "/fixtures/transformation",
  ),
  "transformation",
);

describe("util", () => {
  itBabel8("deep clone", () => {
    const circle = {};
    circle.circle = circle;
    const object = {};

    const ast = {
      type: "Program",
      extra: {
        circle,
        circle2: circle,
      },
      object,
      object2: object,
    };
    const cloned = (cloneDeep.default || cloneDeep)(ast);

    expect(cloned.object === ast.object).toBe(false);
    expect(cloned.object === cloned.object2).toBe(false);

    expect(cloned.extra.circle === ast.extra.circle).toBe(false);
    expect(cloned.extra.circle === cloned.extra.circle2).toBe(true);
    expect(cloned.extra.circle === cloned.extra.circle.circle).toBe(true);
  });
});
