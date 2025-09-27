import runner from "@babel/helper-plugin-test-runner";
import * as babel from "@babel/core";
import transformReactJsxSource from "../lib/index.js";

runner(import.meta.url);

describe("react-source", () => {
  it("basic sample", () => {
    const actual = babel.transformSync("var x = <sometag />", {
      configFile: false,
      babelrc: false,
      filename: "/fake/path/mock.js",
      plugins: ["@babel/plugin-syntax-jsx", transformReactJsxSource],
    });

    const lines = actual.code.split("\n");
    lines[0] = "#path#";
    expect(lines.join("\n")).toMatchInlineSnapshot(`
      "#path#
      var x = <sometag __source={{
        fileName: _jsxFileName,
        lineNumber: 1,
        columnNumber: 9
      }} />;"
    `);
  });

  it("with source", () => {
    const actual = babel.transformSync(
      'var x = <sometag __source="custom" />;',
      {
        configFile: false,
        babelrc: false,
        filename: "/fake/path/mock.js",
        plugins: ["@babel/plugin-syntax-jsx", transformReactJsxSource],
      },
    );

    expect(actual.code).toMatchInlineSnapshot(
      `"var x = <sometag __source=\\"custom\\" />;"`,
    );
  });
});
