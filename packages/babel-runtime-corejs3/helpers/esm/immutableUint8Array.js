import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
function _immutableUint8Array(e) {
  if ("buffer" in e) {
    var _context;
    var t = e.byteOffset;
    e = _sliceInstanceProperty(_context = e.buffer).call(_context, t, t + e.byteLength);
  }
  return new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e);
}
export { _immutableUint8Array as default };