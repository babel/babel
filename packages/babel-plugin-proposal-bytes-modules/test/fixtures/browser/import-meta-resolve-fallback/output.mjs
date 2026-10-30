const j = await _processResponse(fetch(import.meta.resolve?.("./x") ?? new URL("./x", import.meta.url)), "arrayBuffer", _immutableUint8Array);
function _immutableUint8Array(e) { return "buffer" in e && (e = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e); }
function _processResponse(t, e, r) { return t.then(function (t) { if (t.ok) return t = t[e](), r ? t.then(r) : t; throw TypeError("Fetch failed: " + t.status + " " + t.statusText); }); }
