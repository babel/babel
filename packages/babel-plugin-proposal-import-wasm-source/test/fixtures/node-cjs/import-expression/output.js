"use strict";

let promise = Promise.resolve().then(() => require("fs").promises.readFile(require.resolve("./x.wasm")).then(WebAssembly.compile));
