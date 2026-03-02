"use strict";

let promise = Promise.resolve(`${getSpecifier()}`).then(s => require("fs").promises.readFile(require.resolve(s)).then(WebAssembly.compile));
