var fns = [];
var log = [];
var R = n => ({
  n,
  [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
    log.push("dispose " + n);
  },
});

for (let k = 0; k < 2; k++) {
  for (using x = R(k); fns.length < 2 * (k + 1); fns.push(() => x.n)) {
    fns.push(() => x.n);
  }
}

expect(fns.map(f => f())).toEqual([0, 0, 1, 1]);
expect(log).toEqual(["dispose 0", "dispose 1"]);
