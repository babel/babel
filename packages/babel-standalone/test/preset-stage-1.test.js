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
  it("stage-3 should support text modules", () => {
    const output = Babel.transform(
      `import text from "./x.txt" with { type: "text" };`,
      {
        sourceType: "module",
        presets: [["stage-3", { decoratorsVersion: "2023-11" }]],
      },
    ).code;
    expect(output).not.toContain("import text");
    expect(output).toContain(`"text"`);
  });

  it("stage-2 should support bytes modules", () => {
    const output = Babel.transform(
      `import bytes from "./x.bin" with { type: "bytes" };`,
      {
        sourceType: "module",
        presets: [["stage-2", { decoratorsVersion: "2023-11" }]],
      },
    ).code;
    expect(output).not.toContain("import bytes");
    expect(output).toContain(`"arrayBuffer"`);
  });

  it.each([
    ["stage-3", "amd"],
    ["stage-3", "systemjs"],
    ["stage-2", "amd"],
    ["stage-2", "systemjs"],
  ])(
    "%s should compile modules without text or bytes imports to %s",
    (preset, modules) => {
      expect(() =>
        Babel.transform(`export const x = 1;`, {
          sourceType: "module",
          presets: [[preset, { decoratorsVersion: "2023-11" }]],
          plugins: [`transform-modules-${modules}`],
        }),
      ).not.toThrow();
    },
  );

  it("should support private destructuring", () => {
    const output = Babel.transform("class C { #x; m({ #x: x}) {} }", {
      plugins: [["external-helpers", { helperVersion: "7.100.0" }]],
      presets: [
        [
          "stage-1",
          {
            decoratorsVersion: "2023-11",
          },
        ],
      ],
    }).code;
    expect(output).not.toContain("#x:");
  });

  it("should support optional chaining assignment", () => {
    const output = Babel.transform("expr1?.prop = val", {
      presets: [["stage-1", { decoratorsVersion: "2023-11" }]],
    }).code;
    expect(output).toMatchInlineSnapshot(`
      "var _expr;
      (_expr = expr1) === null || _expr === void 0 ? void 0 : _expr.prop = val;"
    `);
  });
});
