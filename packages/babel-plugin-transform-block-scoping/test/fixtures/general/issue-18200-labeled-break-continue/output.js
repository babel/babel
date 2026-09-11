function testLabeled() {
  var log = [];
  var fns = [];
  outer: for (var i = 0; i < 3; i++) {
    var _loop = function () {
        for (var x = (fns[i] = function () {
          return x;
        }, i); x === i;) {
          if (i === 1) return 0; // continue outer
          if (i === 2) return 1; // break outer
          log.push("body-" + i);
          break;
        }
      },
      _ret;
    _ret = _loop();
    if (_ret === 0) continue outer;
    if (_ret === 1) break outer;
    log.push("after-" + i);
  }
  log.push("fns:" + fns.map(function (f) {
    return f();
  }).join(","));
  return log.join("|");
}
expect(testLabeled()).toBe("body-0|after-0|fns:0,1,2");
