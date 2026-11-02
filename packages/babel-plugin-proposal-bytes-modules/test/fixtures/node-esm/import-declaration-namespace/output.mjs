import { readFileSync as _readFileSync } from "fs";
const ns = {
  default: babelHelpers.immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x"))))
};
