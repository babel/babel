function *gen() {
  return "ALL DONE";
}

var g = gen();

assert.deepEqual(g.next(), {
  value: "ALL DONE", done: true
});

genHelpers.assertAlreadyFinished(g);
