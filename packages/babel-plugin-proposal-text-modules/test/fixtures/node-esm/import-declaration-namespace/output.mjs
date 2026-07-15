import { readFileSync as _readFileSync } from "fs";
const ns = {
  default: String(_readFileSync(new URL(import.meta.resolve("./x"))))
};
