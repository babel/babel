function _immutableUint8Array(r) {
  var t = r.buffer;
  return new Uint8Array(t.transferToImmutable ? t.transferToImmutable() : t);
}
export { _immutableUint8Array as default };