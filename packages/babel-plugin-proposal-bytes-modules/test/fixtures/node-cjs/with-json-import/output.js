"use strict";

const bytes = _immutableUint8Array(require("fs").readFileSync(require.resolve("./x"))),
  json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
function _immutableUint8Array(e) { return "buffer" in e && (e = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e); }
