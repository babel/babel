import * as babel from "@babel/core";
import transformAmd from "../lib/index.js";
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
        [transformAmd, { importInterop }],
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
      "define([\\"a\\", \\"b\\", \\"c\\"], function (_a, _b, _c) {
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
        "define([\\"require\\"], function (_require) {
          \\"use strict\\";

          new Promise((_resolve, _reject) => _require([\\"a\\"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
          new Promise((_resolve, _reject) => _require([\\"b\\"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
          new Promise((_resolve, _reject) => _require([\\"c\\"], imported => _resolve(imported), _reject));
        });"
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
        "define([\\"require\\"], function (_require) {
          \\"use strict\\";

          (specifier => new Promise((_resolve, _reject) => _require([\`\${specifier}\`], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject)))(foo);
        });"
      `);
      expect(importInterop).not.toHaveBeenCalled();
    });
  });
});
