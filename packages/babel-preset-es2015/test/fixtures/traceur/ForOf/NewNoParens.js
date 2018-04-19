function C() {}
C.prototype[Symbol.iterator] = function() {
  var n = 0;
  return {
    next() {
      return {value: n++, done: n > 3};
    }
  };
};

var s = '';
for (var x of new C()) {
  s += x;
}
expect(s).toBe('012');

s = '';
for (var x of new C) {
  s += x;
}
expect(s).toBe('012');
