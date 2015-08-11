// https://github.com/google/traceur-compiler/issues/836

var count = 0;
for ({a = 0} of [{}]) {
  count++;
  assert.equal(a, 0);
}

assert.equal(count, 1);
