"use strict";

const babel = require("@babel/core");
const assert = require("assert");
const sinon = require("sinon");

describe("use-built-ins-plugin", () => {
  describe("usage option", () => {
    it("should remove all babel-polyfill imports", () => {
      const codeWithImports = `
        import "@babel/polyfill";
        import "@babel/polyfill";
        require("@babel/polyfill");
        require("@babel/polyfill");
      `;
      const presetOptions = {
        presets: [
          [
            require("../lib"),
            {
              useBuiltIns: "usage",
              modules: false,
            },
          ],
        ],
      };

      const cStub = sinon.stub(console, "warn");
      const result = babel.transform(codeWithImports, presetOptions).code;
      cStub.restore();
      assert.equal(result, "");
    });
  });
});
