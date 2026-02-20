import { createRequire as _createRequire } from "module";
import { readFileSync as _readFileSync } from "fs";
const j = _immutableUint8Array(_readFileSync(_createRequire(import.meta.url).resolve("./x")));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
