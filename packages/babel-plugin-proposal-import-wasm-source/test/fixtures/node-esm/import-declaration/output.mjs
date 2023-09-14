import { readFileSync as _readFileSync } from "fs";
const s = new WebAssembly.Module(_readFileSync(new URL(import.meta.resolve("./x.wasm"))));
