import _helper from "../lib/index.js";
import { transformSync } from "@babel/core";
import * as t from "@babel/types";

const helper = _helper.default || _helper;

describe("@babel/helper-builder-react-jsx", () => {
  // The builder-react-jsx usage in transform-react-jsx 7.9.0
  // https://github.com/babel/babel/blob/v7.9.0/packages/babel-plugin-transform-react-jsx/src/transform-classic.js#L43
  it("should pass post with plugin pass", () => {
    const fn = jest.fn().mockReturnValue(t.identifier("foo"));
    const visitor = helper({
      post(state, pass) {
        state.callee = pass.get("jsxIdentifier")();
      },
    });
    visitor.Program = function enter(_, state) {
      state.set("jsxIdentifier", fn);
    };
    const plugin = () => ({ visitor });
    const input = `<element></element>`;
    transformSync(input, {
      filename: "builder-react-jsx-test.jsx",
      configFile: false,
      plugins: [plugin],
      parserOpts: { plugins: ["jsx"] },
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should pass pre with plugin pass", () => {
    const fn = jest.fn().mockReturnValue(t.identifier("foo"));
    const visitor = helper({
      pre(state, pass) {
        state.callee = pass.get("jsxIdentifier")();
      },
    });
    visitor.Program = function enter(_, state) {
      state.set("jsxIdentifier", fn);
    };
    const plugin = () => ({ visitor });
    const input = `<element></element>`;
    transformSync(input, {
      filename: "builder-react-jsx-test.jsx",
      configFile: false,
      plugins: [plugin],
      parserOpts: { plugins: ["jsx"] },
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should pass filter with plugin pass", () => {
    const fn = jest.fn().mockReturnValue(false);
    const visitor = helper({
      filter(_, pass) {
        return pass.get("filterAll")();
      },
    });
    visitor.Program = function enter(_, state) {
      state.set("filterAll", fn);
    };
    const plugin = () => ({ visitor });
    const input = `<element></element>`;
    transformSync(input, {
      filename: "builder-react-jsx-test.jsx",
      configFile: false,
      plugins: [plugin],
      parserOpts: { plugins: ["jsx"] },
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
