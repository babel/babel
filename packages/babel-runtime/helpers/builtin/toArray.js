function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

module.exports = _toArray;