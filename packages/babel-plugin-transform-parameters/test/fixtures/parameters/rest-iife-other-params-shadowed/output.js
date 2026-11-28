function f(q, w) {
  for (var _len = arguments.length, r = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    r[_key - 2] = arguments[_key];
  }
  return function (r, w) {
    function r() {}
    var w = 4;
    return [q, w, typeof r];
  }(r, w);
}
