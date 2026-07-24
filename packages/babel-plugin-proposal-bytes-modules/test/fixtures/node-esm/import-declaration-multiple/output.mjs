import { readFileSync as _readFileSync, readFileSync as _readFileSync2 } from "fs";
const j = _immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x")))),
  j2 = _immutableUint8Array(_readFileSync2(new URL(import.meta.resolve("./x3"))));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
someBody;
