var count = 0;

function *gen() {
  yield* inner();
  try {
    yield* inner();
  } catch (err) {
    // pass
  }
  return yield* inner();
}

function *inner() {
  return yield count++;
}

var g = gen();

assert.deepEqual(g.next(), {
  value: 0,
  done: false
});

assert.deepEqual(g.next(), {
  value: 1,
  done: false
});

assert.deepEqual(g.throw(new Error("lol")), {
  value: 2,
  done: false,
});

assert.deepEqual(g.next("sent"), {
  value: "sent",
  done: true
});
