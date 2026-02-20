"use strict";

const json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
const bytes = _immutableUint8Array(require("fs").readFileSync(require.resolve("./x")));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
