import { readFileSync as _readFileSync } from "fs";
const value = JSON.parse(_readFileSync(new URL(import.meta.resolve("./x.json"))));
const ns = {
  default: value
};
use(value, ns);
