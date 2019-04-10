function _iterableToArray(iter) {
  if (typeof iter === 'string') {
    return Array.from(iter);
  }

  if (Object.prototype.toString.call(iter) === "[object Arguments]") {
    return Array.from(iter);
  }

  if (Symbol.iterator in Object(iter)) {
    return Array.from(iter);
  }
}

module.exports = _iterableToArray;