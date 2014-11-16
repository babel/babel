function *gen(x) {
  while (x) {
    // empty while loop
  }

  do {
    // empty do-while loop
  } while (x);

  return gen.toString();
}

var info = gen(false).next();
assert.strictEqual(info.done, true);
assert.ok(/do \{/.test(info.value));
assert.ok(/while \(/.test(info.value));
