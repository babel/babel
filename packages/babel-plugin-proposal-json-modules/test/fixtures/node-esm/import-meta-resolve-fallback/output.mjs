import { createRequire as _createRequire } from "module";
import { readFileSync as _readFileSync } from "fs";
const j = JSON.parse(_readFileSync(_createRequire(import.meta.url).resolve("./x.json")));
