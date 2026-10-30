"use strict";

const j = _immutableUint8Array(require("fs").readFileSync(require.resolve("./x"))),
  j2 = _immutableUint8Array(require("fs").readFileSync(require.resolve("./x2")));
function _immutableUint8Array(e) { return "buffer" in e && (e = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e); }
someBody;
