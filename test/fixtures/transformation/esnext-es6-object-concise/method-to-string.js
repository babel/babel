var a = {
  b() {
    return b;
  }
};

assert.ok(
  /return b/.test(a.b.toString()),
  'toString contains body'
);