function g() {
  var _this = this;
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  let [a] = _ref;
  return function* (a) {
    var a = 1;
    yield [a, _this];
  }(a);
}
function f() {
  try {
    var _arguments = arguments;
    for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _ref2[_key2] = arguments[_key2];
    }
    let [b] = _ref2;
    return async function (b) {
      var b = 2;
      return [b, _arguments.length];
    }(b);
  } catch (e) {
    return Promise.reject(e);
  }
}
function h() {
  for (var _len3 = arguments.length, _ref3 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    _ref3[_key3] = arguments[_key3];
  }
  let [c] = _ref3;
  return async function* (c) {
    var c = 3;
    yield c;
  }(c);
}
function k() {
  try {
    for (var _len4 = arguments.length, _ref4 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      _ref4[_key4] = arguments[_key4];
    }
    let [{
      d
    }] = _ref4;
    return async function (d) {
      var d = 4;
      return d;
    }(d);
  } catch (e) {
    return Promise.reject(e);
  }
}
