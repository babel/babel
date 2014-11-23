function *gen() {
  yield 0;
}

var g = gen();

assert.deepEqual(g.return("argument"), {
  value: "argument",
  done: true
});

genHelpers.assertAlreadyFinished(g);
