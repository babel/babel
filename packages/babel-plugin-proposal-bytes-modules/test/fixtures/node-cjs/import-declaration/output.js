"use strict";

const j = _immutableUint8Array(require("fs").readFileSync(require.resolve("./x")));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
