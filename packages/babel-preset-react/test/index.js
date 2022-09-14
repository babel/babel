import _reactPreset from "../lib/index.js";
const reactPreset = _reactPreset.default || _reactPreset;

describe("react preset", () => {
  it("does throw clear error when no options passed for Babel 6", () => {
    expect(() => {
      reactPreset({ version: "6.5.0" });
    }).toThrow(Error, /Requires Babel "\^7.0.0-0"/);
  });
  (process.env.BABEL_8_BREAKING ? it : it.skip)(
    "throws when unknown option is passed",
    () => {
      expect(() => {
        reactPreset({ assertVersion() {} }, { runtine: true });
      }).toThrowErrorMatchingInlineSnapshot(`
        "@babel/preset-react: 'runtine' is not a valid top-level option.
        - Did you mean 'runtime'?"
      `);
    },
  );
  (process.env.BABEL_8_BREAKING ? it : it.skip)(
    "throws when option is of incorrect type",
    () => {
      expect(() => {
        reactPreset({ assertVersion() {} }, { runtime: true });
      }).toThrowErrorMatchingInlineSnapshot(
        `"@babel/preset-react: 'runtime' option must be a string."`,
      );
    },
  );
});
