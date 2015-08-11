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
  assert.isTrue(finallyVisited);
  done();
}

test();
assert.isFalse(finallyVisited);
resolve();
