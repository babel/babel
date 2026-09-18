/* @minVersion 8.0.0-rc.2 */

declare global {
  interface ArrayBuffer {
    transferToImmutable?(): ArrayBuffer;
  }
}

export default function _immutableUint8Array(
  u8orNodeBuffer: Uint8Array<ArrayBuffer>,
) {
  var buf = u8orNodeBuffer.buffer;
  return new Uint8Array(
    buf.transferToImmutable ? buf.transferToImmutable() : buf,
  );
}
