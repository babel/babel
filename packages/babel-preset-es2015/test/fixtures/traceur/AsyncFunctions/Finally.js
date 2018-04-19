// Options: --async-functions
// Async.

var finallyVisited = false;

var resolve;
var p = new Promise((r) => {
  resolve = r;
});
var v;

async function test() {
  try {
    v = await p;
  } finally {
    finallyVisited = true;
  }
  expect(42).toBe(v);
  expect(finallyVisited).toBe(true);
  done();
}

test();
expect(finallyVisited).toBe(false);
resolve(42);
