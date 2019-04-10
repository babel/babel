export default function _iterableToArray(iter) {
  if (typeof iter === 'string' || Object.prototype.toString.call(iter) === "[object Arguments]" || Symbol.iterator in Object(iter)) return Array.from(iter);
}