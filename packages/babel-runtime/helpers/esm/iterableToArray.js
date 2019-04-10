export default function _iterableToArray(iter) {
  var prototypeWhiteList = [String.prototype, Array.prototype];
  var iterObject = Object(iter);

  if (prototypeWhiteList.some(function (prototype) {
    return prototype.isPrototypeOf(iterObject);
  })) {
    return Array.from(iter);
  }

  if (iterObject.toString() === "[object Arguments]") {
    return Array.from(iter);
  }

  if (Symbol.iterator in iterObject) {
    return Array.from(iter);
  }
}