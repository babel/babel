import { createRequire as _createRequire } from "module";
import { readFileSync as _readFileSync } from "fs";
const s = new WebAssembly.Module(_readFileSync(_createRequire(import.meta.url).resolve("./x.wasm")));
