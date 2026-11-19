import { readFileSync as _readFileSync } from "fs";
const value = String(_readFileSync(new URL(import.meta.resolve("./x.txt")))).replace(/^\uFEFF/, "");
const ns = {
  default: value
};
use(value, ns);
