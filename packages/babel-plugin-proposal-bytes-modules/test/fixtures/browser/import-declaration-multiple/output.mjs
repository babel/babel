const [j, j2] = await Promise.all([fetch(import.meta.resolve("./x")).then(r => r.bytes()).then(_immutableUint8Array), fetch(import.meta.resolve("./x2")).then(r => r.bytes()).then(_immutableUint8Array)]);
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
someBody;
