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
      "var _Foo;
      function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
      function _toPropertyKey(t) { var i = _toPrimitive(t, \\"string\\"); return \\"symbol\\" == typeof i ? i : String(i); }
      function _toPrimitive(t, r) { if (\\"object\\" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \\"default\\"); if (\\"object\\" != typeof i) return i; throw new TypeError(\\"@@toPrimitive must return a primitive value.\\"); } return (\\"string\\" === r ? String : Number)(t); }
      class Foo {}
      _Foo = Foo;
      _Foo.foo = _Foo.bar;
      _defineProperty(Foo, \\"bar\\", 42);"
    `);
  });
});
