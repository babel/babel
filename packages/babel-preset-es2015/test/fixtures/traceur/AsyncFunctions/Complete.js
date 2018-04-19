// Options: --async-functions
// Async.

function asyncComplete() {
  return new Promise((resolve) => {
    resolve('complete');
  });
}

// ----------------------------------------------------------------------------

(async function() {
  var value = await asyncComplete();
  expect('complete').toBe(value);
  done();
})();
