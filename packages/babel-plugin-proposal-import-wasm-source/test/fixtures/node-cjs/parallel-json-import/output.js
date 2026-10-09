"use strict";

const s1 = new WebAssembly.Module(require("fs").readFileSync(require.resolve("./x1.wasm"))),
  s2 = new WebAssembly.Module(require("fs").readFileSync(require.resolve("./x2.wasm"))),
  j1 = JSON.parse(require("fs").readFileSync(require.resolve("./x1.wasm"))),
  j2 = JSON.parse(require("fs").readFileSync(require.resolve("./x2.wasm")));
