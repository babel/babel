import { readFileSync as _readFileSync } from "fs";
const j = _immutableUint8Array(_readFileSync(new URL(import.meta.resolve("./x"))));
function _immutableUint8Array(e) { return "buffer" in e && (e = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e); }
