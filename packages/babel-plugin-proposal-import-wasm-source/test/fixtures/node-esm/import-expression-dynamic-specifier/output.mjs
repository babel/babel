import { promises as _promises } from "fs";
let promise = Promise.resolve(`${getSpecifier()}`).then(s => _promises.readFile(new URL(import.meta.resolve(s))).then(WebAssembly.compile));
