"use strict";

let promise = Promise.resolve().then(() => require("fs").promises.readFile(require.resolve(getSpecifier())).then(WebAssembly.compile));
