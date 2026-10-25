const [j, j2] = await Promise.all([_processResponse(fetch(import.meta.resolve("./x")), "bytes", _immutableUint8Array), _processResponse(fetch(import.meta.resolve("./x2")), "bytes", _immutableUint8Array)]);
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
function _processResponse(t, e, r) { return t.then(t => { if (t.ok) { const s = t[e](); return r ? s.then(r) : s; } throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
someBody;
