function _iterableToArray(iter) {
  var prototypeWhiteList = ['[object Arguments]'];
  var hasSymbol = false;

  try {
    if (Symbol.iterator in Object(iter)) {
      hasSymbol = true;
    }
  } catch (e) {}

  if (hasSymbol) {
    return Array.from(iter);
  }

  if (prototypeWhiteList.indexOf(Object.prototype.toString.call(iter)) !== -1) {
    return Array.from(iter);
  }

  return null;
}

module.exports = _iterableToArray;