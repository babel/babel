var test = {
    a: [1,2,3],
    b: {
      bb: "ok"
    },
    c: [[1,2], [3,4]],
}

assert.equal(match(test) {
  {c:[[1,2], [d, 4]]} => d,
  bbb => "foo"
}, 3);

assert.equal(match(test) {
  {a: [1, it, ...]} => it + 100,
  bbb => "foo"
}, 102);
