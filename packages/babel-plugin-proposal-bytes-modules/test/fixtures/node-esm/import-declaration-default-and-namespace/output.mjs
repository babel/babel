import { readFileSync as _readFileSync } from "fs";
const value = babelHelpers.immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x.bin"))));
const ns = {
  default: value
};
use(value, ns);
