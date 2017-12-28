const a = {
  b() {}
}

assert.equal(a.b.prototype, undefined);
