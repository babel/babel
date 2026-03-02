"use strict";

const s = new WebAssembly.Module(require("fs").readFileSync(require.resolve("./x.wasm"))),
  s2 = new WebAssembly.Module(require("fs").readFileSync(require.resolve("./x2.wasm")));
someBody;
