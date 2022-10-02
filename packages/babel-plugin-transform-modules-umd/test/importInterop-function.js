import * as babel from "@babel/core";
import transformUmd from "../lib/index.js";
import externalHelpers from "@babel/plugin-external-helpers";
import path from "path";

describe("'importInterop'", () => {
  function transform(code, importInterop, filename) {
    return babel.transformSync(code, {
      configFile: false,
      filename,
      ast: false,
      plugins: [
        [externalHelpers, { helperVersion: "7.100.0" }],
        [transformUmd, { importInterop }],
      ],
    }).code;
  }

  it("'importInterop' accepts a function", () => {
    const code = `
      import a from "a";
      import b from "b";
      import c from "c";

      a();
      b();
      c();
    `;

    const importInterop = source => {
      if (source === "a") return "babel";
      else if (source === "b") return "node";
      else if (source === "c") return "none";
    };

    expect(transform(code, importInterop)).toMatchInlineSnapshot(`
      "(function (global, factory) {
        if (typeof define === \\"function\\" && define.amd) {
          define([\\"a\\", \\"b\\", \\"c\\"], factory);
        } else if (typeof exports !== \\"undefined\\") {
          factory(require(\\"a\\"), require(\\"b\\"), require(\\"c\\"));
        } else {
          var mod = {
            exports: {}
          };
          factory(global.a, global.b, global.c);
          global.unknown = mod.exports;
        }
      })(typeof globalThis !== \\"undefined\\" ? globalThis : typeof self !== \\"undefined\\" ? self : this, function (_a, _b, _c) {
        \\"use strict\\";

        _a = babelHelpers.interopRequireDefault(_a);
        (0, _a.default)();
        _b();
        (0, _c.default)();
      });"
    `);
  });

  it("gets called with the filename if present", () => {
    const code = `
      import a from "a";
      import b from "b";
    `;

    const importInterop = jest.fn(() => "babel");

    const filename = "path/to/fake-filename.js";

    transform(code, importInterop, filename);

    expect(importInterop).toHaveBeenCalledTimes(2);
    expect(importInterop).toHaveBeenCalledWith("a", path.resolve(filename));
    expect(importInterop).toHaveBeenCalledWith("b", path.resolve(filename));
  });

  it("gets called with undefined if the filename is not present", () => {
    const code = `
      import a from "a";
      import b from "b";
    `;

    const importInterop = jest.fn(() => "babel");

    transform(code, importInterop);

    expect(importInterop).toHaveBeenCalledTimes(2);
    expect(importInterop).toHaveBeenCalledWith("a", undefined);
    expect(importInterop).toHaveBeenCalledWith("b", undefined);
  });
});
