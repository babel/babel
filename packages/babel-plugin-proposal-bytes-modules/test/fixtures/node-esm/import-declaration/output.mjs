import { readFileSync as _readFileSync } from "fs";
const j = _immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x"))));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
