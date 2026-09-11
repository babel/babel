function testLabeled() {
  var log = [];
  var fns = [];
  outer: for (var i = 0; i < 3; i++) {
    for (let x = (fns[i] = () => x, i); x === i; ) {
      if (i === 1) continue outer;
      if (i === 2) break outer;
      log.push("body-" + i);
      break;
    }
    log.push("after-" + i);
  }
  log.push("fns:" + fns.map(function (f) { return f(); }).join(","));
  return log.join("|");
}

expect(testLabeled()).toBe("body-0|after-0|fns:0,1,2");
