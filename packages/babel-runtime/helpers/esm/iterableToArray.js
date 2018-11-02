export default function _iterableToArray(iter) {
  if (Array.isArray(iter) || typeof iter === 'string' || typeof Symbol === 'function' && Symbol.iterator in Object(iter) || iter && 'length' in iter || typeof Map !== 'undefined' && iter instanceof Map || typeof Set !== 'undefined' && iter instanceof Set || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}