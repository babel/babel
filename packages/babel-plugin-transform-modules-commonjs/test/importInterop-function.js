import * as babel from "@babel/core";
import transformCommonjs from "../lib/index.js";
import externalHelpers from "@babel/plugin-external-helpers";
import path from "path";

it("'importInterop' accepts a function", function () {
  const code = `
    import a from "a";
    import b from "b";
    import c from "c";

    a();
    b();
    c();
  `;

  const importInterop = jest.fn(source => {
    if (source === "a") return "babel";
    else if (source === "b") return "node";
    else if (source === "c") return "none";
  });

  const filename = "path/to/fake-filename.js";

  const output = babel.transformSync(code, {
    configFile: false,
    filename,
    ast: false,
    plugins: [
      [externalHelpers, { helperVersion: "7.100.0" }],
      [transformCommonjs, { importInterop }],
    ],
  }).code;

  expect(output).toMatchInlineSnapshot(`
    "\\"use strict\\";

    var _a = babelHelpers.interopRequireDefault(require(\\"a\\"));

    var _b = require(\\"b\\");

    var _c = require(\\"c\\");

    (0, _a.default)();

    _b();

    (0, _c.default)();"
  `);

  const resolvedFilename = path.resolve(filename);
  expect(importInterop).toHaveBeenCalledWith("a", resolvedFilename);
  expect(importInterop).toHaveBeenCalledWith("b", resolvedFilename);
  expect(importInterop).toHaveBeenCalledWith("c", resolvedFilename);
});
