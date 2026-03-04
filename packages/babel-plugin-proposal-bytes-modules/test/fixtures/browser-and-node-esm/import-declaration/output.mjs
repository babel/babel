const j = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x")))).then(_immutableUint8Array) : fetch(import.meta.resolve("./x")).then(r => r.bytes()).then(_immutableUint8Array));
function _immutableUint8Array(r) { var t = r.buffer; return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t); }
