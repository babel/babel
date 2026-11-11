import * as babel from "@babel/core";
import transformCommonjs from "../lib/index.js";
import externalHelpers from "@babel/plugin-external-helpers";
import transformDynamicImport from "@babel/plugin-transform-dynamic-import";
import path from "node:path";

describe("'importInterop'", () => {
  function transform(code, importInterop, filename) {
    return babel.transformSync(code, {
      configFile: false,
      filename,
      ast: false,
      plugins: [
        [externalHelpers, { helperVersion: "7.100.0" }],
        transformDynamicImport,
        [transformCommonjs, { importInterop }],
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
      "\\"use strict\\";

      var _a = babelHelpers.interopRequireDefault(require(\\"a\\"));
      var _b = require(\\"b\\");
      var _c = require(\\"c\\");
      (0, _a.default)();
      _b();
      (0, _c.default)();"
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

  describe("dynamic import", () => {
    it("'importInterop' accepts a function", () => {
      const code = `
        import("a");
        import("b");
        import("c");
      `;

      const importInterop = source => {
        if (source === "a") return "babel";
        else if (source === "b") return "node";
        else if (source === "c") return "none";
      };

      expect(transform(code, importInterop)).toMatchInlineSnapshot(`
        ""use strict";

        Promise.resolve().then(() => babelHelpers.interopRequireWildcard(require("a")));
        Promise.resolve().then(() => babelHelpers.interopRequireWildcard(require("b")));
        Promise.resolve().then(() => require("c"));"
      `);
    });

    it("gets called with the filename if present", () => {
      const code = `
        import("a");
        import("b");
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
        import("a");
        import("b");
      `;

      const importInterop = jest.fn(() => "babel");

      transform(code, importInterop);

      expect(importInterop).toHaveBeenCalledTimes(2);
      expect(importInterop).toHaveBeenCalledWith("a", undefined);
      expect(importInterop).toHaveBeenCalledWith("b", undefined);
    });

    it("is not called for dynamic specifiers, which keep the interop helper", () => {
      const code = `
        import(foo);
      `;

      const importInterop = jest.fn(() => "none");

      expect(transform(code, importInterop)).toMatchInlineSnapshot(`
        ""use strict";

        (specifier => new Promise(r => r(\`\${specifier}\`)).then(s => babelHelpers.interopRequireWildcard(require(s))))(foo);"
      `);
      expect(importInterop).not.toHaveBeenCalled();
    });
  });
});
