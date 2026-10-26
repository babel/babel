import _Promise from "core-js-pure/stable/promise/index.js";
import _URL from "core-js-pure/stable/url/index.js";
import _sliceInstanceProperty from "core-js-pure/stable/instance/slice.js";
const [j1, j2] = await _Promise.all([_processResponse(fetch(import.meta.resolve?.("./x1") ?? new _URL("./x1", import.meta.url)), "arrayBuffer", _immutableUint8Array), _processResponse(fetch(import.meta.resolve?.("./x2") ?? new _URL("./x2", import.meta.url)), "arrayBuffer", _immutableUint8Array)]);
function _immutableUint8Array(e) { var _context; return "buffer" in e && (e = _sliceInstanceProperty(_context = e.buffer).call(_context, e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e); }
function _processResponse(t, e, r) { return t.then(function (t) { if (t.ok) return t = t[e](), r ? t.then(r) : t; throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
