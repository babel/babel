var fns = [];

for (let i = 0; i < 10; i++) {
  fns.push(function () { return i; });
  i += 1;
}

assert.equal(fns[0](), 1);
assert.equal(fns[1](), 3);
assert.equal(fns[2](), 5);
assert.equal(fns[3](), 7);
assert.equal(fns[4](), 9);
