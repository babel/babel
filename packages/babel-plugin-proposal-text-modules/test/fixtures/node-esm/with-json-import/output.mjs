import { readFileSync as _readFileSync, readFileSync as _readFileSync2 } from "fs";
const text = String(_readFileSync(new URL(import.meta.resolve("./x")))).replace(/^\xEF\xBB\xBF/, ""),
  json = JSON.parse(_readFileSync2(new URL(import.meta.resolve("./x"))));
