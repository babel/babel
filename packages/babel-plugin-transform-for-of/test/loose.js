import { transformSync } from "@babel/core";
import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

const code = "for (var a of b) break;";

testLooseAssumptions(plugin, ["skipForOfIteratorClosing"], code);

it("loose ignores the iterableIsArray assumption", () => {
  const transform = (options, assumptions) => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    try {
      return transformSync(code, {
        configFile: false,
        babelrc: false,
        assumptions,
        plugins: [[plugin, options]],
      }).code;
    } finally {
      warn.mockRestore();
    }
  };

  expect(transform({ loose: true }, { iterableIsArray: true })).toBe(
    transform({}, { skipForOfIteratorClosing: true }),
  );
  expect(transform({}, { iterableIsArray: true })).not.toBe(
    transform({}, { skipForOfIteratorClosing: true }),
  );
});
