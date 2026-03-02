import * as babel from "@babel/core";
import transformClassStaticBlock from "../lib/index.js";
import transformClassProperties from "@babel/plugin-transform-class-properties";
import externalHelpers from "@babel/plugin-external-helpers";

describe("plugin ordering", () => {
  it("should work when @babel/plugin-transform-class-static-block is after class features plugin", () => {
    const source = `class Foo {
      static {
        this.foo = Foo.bar;
      }
      static bar = 42;
    }
    `;
    expect(
      babel.transformSync(source, {
        filename: "example.js",
        highlightCode: false,
        configFile: false,
        babelrc: false,
        plugins: [
          transformClassProperties,
          transformClassStaticBlock,
          externalHelpers,
        ],
      }).code,
    ).toMatchInlineSnapshot(`
      "var _Foo;
      class Foo {}
      _Foo = Foo;
      _Foo.foo = _Foo.bar;
      babelHelpers.defineProperty(Foo, \\"bar\\", 42);"
    `);
  });
});
