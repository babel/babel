import { readFileSync as _readFileSync2 } from "fs";
import { readFileSync as _readFileSync } from "fs";
const j = JSON.parse(_readFileSync(new URL(import.meta.resolve("./x.json")))),
  j2 = JSON.parse(_readFileSync2(new URL(import.meta.resolve("./x2.json"))));
someBody;
