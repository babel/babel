import { readFileSync as _readFileSync } from "fs";
const ns = {
  default: JSON.parse(_readFileSync(new URL(import.meta.resolve("./x.json"))))
};
