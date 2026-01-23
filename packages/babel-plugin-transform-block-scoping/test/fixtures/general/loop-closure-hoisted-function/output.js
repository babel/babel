var _loop = function (i) {
    if (i === 0) {
      test = function () {
        return i;
      };
    }
    expect(test()).toBe(0);
  },
  test;
for (var i = 0; i < 3; i++) {
  _loop(i);
}
