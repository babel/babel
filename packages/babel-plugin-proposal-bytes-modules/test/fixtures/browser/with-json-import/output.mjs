const [bytes, json] = await Promise.all([fetch(import.meta.resolve("./x")).then(r => r.bytes()).then(_immutableUint8Array), fetch(import.meta.resolve("./x")).then(r => r.json())]);
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
