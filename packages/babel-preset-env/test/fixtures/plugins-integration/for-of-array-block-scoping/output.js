function x(e) {
  var r = [];
  for (var _i2 = 0, _arr2 = e; _i2 < _arr2.length; _i2++) {
    var s = _arr2[_i2];
    var _e = s;
    r.push(_e);
  }
  return r;
}
expect(x([1, 2, 3])).toEqual([1, 2, 3]);
