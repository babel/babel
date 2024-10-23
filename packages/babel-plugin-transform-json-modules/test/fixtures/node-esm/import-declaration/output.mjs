import { readFileSync as _readFileSync } from "fs";
const j = JSON.parse(_readFileSync(new URL(import.meta.resolve("./x.json"))));
