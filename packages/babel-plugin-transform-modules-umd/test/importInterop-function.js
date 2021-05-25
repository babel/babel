import * as babel from "@babel/core";
import transformUmd from "../lib";
import externalHelpers from "@babel/plugin-external-helpers";

it("'importInterop' accepts a function", function () {
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

  const output = babel.transformSync(code, {
    configFile: false,
    ast: false,
    plugins: [
      [externalHelpers, { helperVersion: "7.100.0" }],
      [transformUmd, { importInterop }],
    ],
  }).code;

  expect(output).toMatchInlineSnapshot(`
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
