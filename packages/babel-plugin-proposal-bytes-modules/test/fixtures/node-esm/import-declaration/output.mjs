import { readFileSync as _readFileSync } from "fs";
const j = babelHelpers.immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x"))));
