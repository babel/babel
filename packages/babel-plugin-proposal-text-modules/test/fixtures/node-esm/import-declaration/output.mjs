import { readFileSync as _readFileSync } from "fs";
const j = String(_readFileSync(new URL(import.meta.resolve("./x"))));
