function _iterableToArray(iter) {
  if (Array.isArray(iter) || typeof iter === 'string' || typeof Symbol === 'function' && Symbol.iterator in Object(iter) || iter && 'length' in iter || Object.prototype.toString.call(iter) === "[object Map]" || Object.prototype.toString.call(iter) === "[object Set]" || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;