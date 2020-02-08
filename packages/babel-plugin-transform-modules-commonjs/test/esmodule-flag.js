import * as babel from "@babel/core";
import vm from "vm";
import { fileURLToPath } from "url";
import path from "path";

import transformCommonJS from "../lib/index.js";

test("Re-export doesn't overwrite __esModule flag", function () {
  let code = 'export * from "./dep";';
  const depStub = {
    __esModule: false,
  };

  const context = {
    module: {
      exports: {},
    },
    require: function (id) {
      if (id === "./dep") return depStub;
      throw new Error("Unexpected dependency: " + id);
    },
  };
  context.exports = context.module.exports;

  code = babel.transformSync(code, {
    cwd: path.dirname(fileURLToPath(import.meta.url)),
    plugins: [[transformCommonJS, { loose: true }]],
    ast: false,
  }).code;

  vm.runInNewContext(code, context);

  // exports.__esModule shouldn't be overwritten.
  expect(context.exports.__esModule).toBe(true);
});
