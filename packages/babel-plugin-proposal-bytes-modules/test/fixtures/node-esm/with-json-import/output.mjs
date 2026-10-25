import { readFileSync as _readFileSync, readFileSync as _readFileSync2 } from "fs";
const bytes = _immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x")))),
  json = JSON.parse(_readFileSync2(new URL(import.meta.resolve("./x"))));
function _immutableUint8Array(e) { return "buffer" in e && (e = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e); }
