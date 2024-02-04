function x(e) {
  var r = [];
  for (var _i2 = 0, _e2 = e; _i2 < _e2.length; _i2++) {
    var s = _e2[_i2];
    e = null;
    r.push(s);
  }
  return r;
}
expect(x([1, 2, 3])).toEqual([1, 2, 3]);
