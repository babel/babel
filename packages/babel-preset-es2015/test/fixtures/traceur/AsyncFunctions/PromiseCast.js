// Options: --async-functions
// Async.

async function f() {
  var x = await 1;
  expect(x).toBe(1);
  x = await undefined;
  expect(x).toBeUndefined();
  done();
}

f();
