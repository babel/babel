import { readFileSync as _readFileSync, readFileSync as _readFileSync2 } from "fs";
const bytes = babelHelpers.immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x")))),
  json = JSON.parse(_readFileSync2(new URL(import.meta.resolve("./x"))));
