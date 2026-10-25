import _sliceInstanceProperty from "core-js-pure/features/instance/slice.js";
function _immutableUint8Array(e) {
  var _context;
  return "buffer" in e && (e = _sliceInstanceProperty(_context = e.buffer).call(_context, e.byteOffset, e.byteOffset + e.byteLength)), new Uint8Array(e.transferToImmutable ? e.transferToImmutable() : e);
}
export { _immutableUint8Array as default };