function f(_b, _ref) {
  var b = _b;
  var a = _ref.a;
  b = 9;
  return arguments[0];
}
function g(_b2) {
  var b = _b2;
  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  arguments[0] = 9;
  return b;
}
function h(_b3) {
  var b = _b3;
  for (var _len = arguments.length, r = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    r[_key - 1] = arguments[_key];
  }
  b = 9;
  return [arguments[0], r];
}
function k(_b4) {
  var b = _b4;
  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : arguments[0] = 9;
  return b;
}
function m(b) {
  return b;
}
function n(b) {
  var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return b;
}
