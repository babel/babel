import _Promise from "core-js-pure/stable/promise/index.js";
import _URL from "core-js-pure/stable/url/index.js";
const [j1, j2] = await _Promise.all([_processResponse(fetch(import.meta.resolve?.("./x1") ?? new _URL("./x1", import.meta.url)), "bytes", _immutableUint8Array), _processResponse(fetch(import.meta.resolve?.("./x2") ?? new _URL("./x2", import.meta.url)), "bytes", _immutableUint8Array)]);
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
function _processResponse(t, e, r) { return t.then(t => { if (t.ok) { const s = t[e](); return r ? s.then(r) : s; } throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
