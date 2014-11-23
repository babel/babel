function pumpNumber(gen) {
  var n = 0;

  while (true) {
    var res = n > 0 ? gen.next(n) : gen.next();
    n = res.value;
    if (res.done) {
      return n;
    }
  }
}

function* foo() {
  return (yield* bar()) + (yield* bar());
}

function* bar() {
  return (yield 2) + (yield 3);
}

assert.strictEqual(pumpNumber(bar()), 5);
assert.strictEqual(pumpNumber(foo()), 10);
