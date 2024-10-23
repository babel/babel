import * as babel from "@babel/core";

import _reactPreset from "../lib/index.js";
const reactPreset = _reactPreset.default || _reactPreset;

import { itBabel8 } from "$repo-utils";

describe("react preset", () => {
  it("does throw clear error when no options passed for Babel 6", () => {
    expect(() => {
      reactPreset({ version: "6.5.0" });
    }).toThrow(Error, /Requires Babel "\^7.0.0-0"/);
  });
  itBabel8("throws when unknown option is passed", () => {
    expect(() => {
      reactPreset({ assertVersion() {} }, { runtine: true });
    }).toThrowErrorMatchingInlineSnapshot(`
        "@babel/preset-react: 'runtine' is not a valid top-level option.
        - Did you mean 'runtime'?"
      `);
  });
  itBabel8("throws when option is of incorrect type", () => {
    expect(() => {
      reactPreset({ assertVersion() {} }, { runtime: true });
    }).toThrowErrorMatchingInlineSnapshot(
      `"@babel/preset-react: 'runtime' option must be a string."`,
    );
  });

  itBabel8("respects envName", () => {
    expect(
      babel.transformSync("<a />", {
        configFile: false,
        presets: [reactPreset],
        envName: "development",
      }).code,
    ).toMatchInlineSnapshot(`
      "var _jsxFileName = \\"\\";
      import { jsxDEV as _jsxDEV } from \\"react/jsx-dev-runtime\\";
      /*#__PURE__*/_jsxDEV(\\"a\\", {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 1,
        columnNumber: 1
      }, this);"
    `);

    expect(
      babel.transformSync("<a />", {
        configFile: false,
        presets: [reactPreset],
        envName: "production",
      }).code,
    ).toMatchInlineSnapshot(`
      "import { jsx as _jsx } from \\"react/jsx-runtime\\";
      /*#__PURE__*/_jsx(\\"a\\", {});"
    `);
  });
});
