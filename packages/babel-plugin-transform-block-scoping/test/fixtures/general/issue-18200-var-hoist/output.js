function testLeaked() {
  var fn;
  for (var i = 0; i < 2; i++) {
    var _loop = function () {
        for (var x = (fn = function () {
          return x;
        }, i); i === 0;) {
          leaked = 5;
          break;
        }
      },
      leaked;
    _loop();
  }
  return {
    leaked: leaked,
    fn: fn()
  };
}
expect(testLeaked()).toEqual({
  leaked: 5,
  fn: 1
});
