function *gen(a, b) {
  yield {
    a: a - (yield a),
    b: yield b
  };
}

genHelpers.check(gen(1, 2), [1, 2, { a: 0, b: 2 }]);
genHelpers.check(gen(4, 2), [4, 2, { a: 3, b: 2 }]);
