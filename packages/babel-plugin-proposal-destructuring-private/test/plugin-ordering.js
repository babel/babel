import { transformSync } from "@babel/core";
import proposalDestructuringPrivate from "../lib/index.js";

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
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-class-static-block",
            proposalDestructuringPrivate,
          ],
        }).code,
    ).not.toThrow();
  });
});
