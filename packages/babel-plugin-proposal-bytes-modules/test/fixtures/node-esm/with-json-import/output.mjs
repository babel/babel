import { readFileSync as _readFileSync, readFileSync as _readFileSync2 } from "fs";
const json = JSON.parse(_readFileSync2(new URL(import.meta.resolve("./x"))));
const bytes = _immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x"))));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
