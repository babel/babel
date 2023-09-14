"use strict";

const s = new WebAssembly.Module(require("fs").readFileSync(require.resolve("./x.wasm")));
