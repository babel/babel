import _Promise from "core-js-pure/stable/promise/index.js";
import _URL from "core-js-pure/stable/url/index.js";
const [j1, j2] = await _Promise.all([fetch(import.meta.resolve?.("./x1") ?? new _URL("./x1", import.meta.url)).then(r => r.bytes()).then(_immutableUint8Array), fetch(import.meta.resolve?.("./x2") ?? new _URL("./x2", import.meta.url)).then(r => r.bytes()).then(_immutableUint8Array)]);
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
