import { readFileSync as _readFileSync, readFileSync as _readFileSync2, readFileSync as _readFileSync3, readFileSync as _readFileSync4 } from "fs";
const s1 = new WebAssembly.Module(_readFileSync(new URL(import.meta.resolve("./x1.wasm")))),
  s2 = new WebAssembly.Module(_readFileSync2(new URL(import.meta.resolve("./x2.wasm")))),
  j1 = JSON.parse(_readFileSync3(new URL(import.meta.resolve("./x1.wasm")))),
  j2 = JSON.parse(_readFileSync4(new URL(import.meta.resolve("./x2.wasm"))));
