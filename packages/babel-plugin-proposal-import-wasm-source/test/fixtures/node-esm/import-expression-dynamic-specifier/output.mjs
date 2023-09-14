import { promises as _promises } from "fs";
let promise = Promise.resolve().then(() => _promises.readFile(new URL(import.meta.resolve(getSpecifier()))).then(WebAssembly.compile));
