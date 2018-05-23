// Options: --async-functions
// Async.

var finallyVisited = false;
var resolve;

async function test() {
  try {
    await new Promise((r) => {
      resolve = r;
    });
  } finally {
    finallyVisited = true;
  }
  expect(finallyVisited).toBe(true);
  done();
}

test();
expect(finallyVisited).toBe(false);
resolve();
