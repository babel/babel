// Options: --async-functions
// Async.

function asyncTimeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async function() {
  var x = 0;
  await asyncTimeout(1);
  expect(1).toBe(++x);
  await asyncTimeout(1);
  expect(2).toBe(++x);
  await asyncTimeout(1);
  expect(3).toBe(++x);
  await asyncTimeout(1);
  expect(4).toBe(++x);
  done();
})();
