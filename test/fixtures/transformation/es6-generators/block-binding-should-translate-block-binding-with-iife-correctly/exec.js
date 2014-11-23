function *gen() {
  let arr = [];

  for (let x = 0; x < 3; x++) {
    let y = x;
    arr.push(function() { return y; });
  }

  {
    let x;
    while( x = arr.pop() ) {
      yield x;
    }
  }
}

var g = gen();

assert.equal(g.next().value(), 2);
assert.equal(g.next().value(), 1);
assert.equal(g.next().value(), 0);
assert.deepEqual(g.next(), { value: void 0, done: true });
