/* @minVersion 8.0.0-rc.2 */

declare global {
  interface ArrayBuffer {
    transferToImmutable?(): ArrayBuffer;
  }
}

export default function _immutableUint8Array(
  arrayBufferOrNodeBuffer: Buffer<ArrayBuffer> | ArrayBuffer,
) {
  if ("buffer" in arrayBufferOrNodeBuffer) {
    arrayBufferOrNodeBuffer = arrayBufferOrNodeBuffer.buffer.slice(
      arrayBufferOrNodeBuffer.byteOffset,
      arrayBufferOrNodeBuffer.byteOffset + arrayBufferOrNodeBuffer.byteLength,
    );
  }
  return new Uint8Array(
    arrayBufferOrNodeBuffer.transferToImmutable
      ? arrayBufferOrNodeBuffer.transferToImmutable()
      : arrayBufferOrNodeBuffer,
  );
}
