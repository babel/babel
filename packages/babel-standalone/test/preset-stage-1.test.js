import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe("stage-1 preset", () => {
  let Babel;
  beforeAll(() => {
    Babel = require("../babel.js");
  });

  it("should support hack pipeline", () => {
    const output = Babel.transform("x |> %", {
      presets: [
        [
          "stage-1",
          {
            pipelineProposal: "hack",
            decoratorsLegacy: true,
          },
        ],
      ],
    }).code;
    expect(output).toMatchInlineSnapshot(`"x;"`);
  });

  it("should support decorators versioned 2023-11", () => {
    const output = Babel.transform("@dec class C {}", {
      plugins: [["external-helpers", { helperVersion: "7.100.0" }]],
      presets: [["stage-3", { decoratorsVersion: "2023-11" }]],
    }).code;
    expect(output).toMatch("babelHelpers.applyDecs");
  });
  it("should support private destructuring", () => {
    const output = Babel.transform("class C { #x; m({ #x: x}) {} }", {
      plugins: [["external-helpers", { helperVersion: "7.100.0" }]],
      presets: [
        [
          "stage-1",
          {
            decoratorsVersion: "2021-12",
          },
        ],
      ],
    }).code;
    expect(output).not.toContain("#x:");
  });

  it("should support optional chaining assignment", () => {
    const output = Babel.transform("expr1?.prop = val", {
      presets: [["stage-1", { decoratorsVersion: "2021-12" }]],
    }).code;
    expect(output).toMatchInlineSnapshot(`
      "var _expr;
      (_expr = expr1) === null || _expr === void 0 ? void 0 : _expr.prop = val;"
    `);
  });
});
