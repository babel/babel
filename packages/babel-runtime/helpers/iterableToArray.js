function _iterableToArray(iter) {
  if (typeof iter === 'string' || Object.prototype.toString.call(iter) === "[object Arguments]" || typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;