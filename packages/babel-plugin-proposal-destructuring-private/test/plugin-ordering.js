import { transformSync } from "@babel/core";
import proposalDestructuringPrivate from "../lib/index.js";
import transformClassProperties from "@babel/plugin-transform-class-properties";
import transformClassStaticBlock from "@babel/plugin-transform-class-static-block";

describe("plugin ordering", () => {
  it("should work when @babel/plugin-proposal-destructuring-private is after class features plugin", () => {
    const source = `class Foo {
      static #x = 1;
      static {
        const {#x: x } = Foo;
      };
    }
    `;
    expect(
      () =>
        transformSync(source, {
          filename: "example.js",
          highlightCode: false,
          configFile: false,
          babelrc: false,
          plugins: [
            transformClassProperties,
            transformClassStaticBlock,
            proposalDestructuringPrivate,
          ],
        }).code,
    ).not.toThrow();
  });
});
