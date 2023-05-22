import * as babel from "@babel/core";
import proposalClassStaticBlock from "../lib/index.js";
import proposalClassProperties from "@babel/plugin-transform-class-properties";

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
        plugins: [proposalClassProperties, proposalClassStaticBlock],
      }).code,
    ).toMatchInlineSnapshot(`
      "function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
      function _toPropertyKey(arg) { var key = _toPrimitive(arg, \\"string\\"); return typeof key === \\"symbol\\" ? key : String(key); }
      function _toPrimitive(input, hint) { if (typeof input !== \\"object\\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \\"default\\"); if (typeof res !== \\"object\\") return res; throw new TypeError(\\"@@toPrimitive must return a primitive value.\\"); } return (hint === \\"string\\" ? String : Number)(input); }
      class Foo {}
      Foo.foo = Foo.bar;
      _defineProperty(Foo, \\"bar\\", 42);"
    `);
  });
});
