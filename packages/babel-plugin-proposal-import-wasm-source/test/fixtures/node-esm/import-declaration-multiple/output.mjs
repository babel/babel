import { readFileSync as _readFileSync, readFileSync as _readFileSync2 } from "fs";
const s = new WebAssembly.Module(_readFileSync(new URL(import.meta.resolve("./x.wasm")))),
  s2 = new WebAssembly.Module(_readFileSync2(new URL(import.meta.resolve("./x2.wasm"))));
someBody;
