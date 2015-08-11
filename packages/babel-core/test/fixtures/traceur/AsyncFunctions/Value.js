// Options: --async-functions
// Async.

async function asyncValue(value) {
  if (true)
    return value;
  await asyncYield();
}

function asyncYield() {
  return asyncTimeout(0);
}

function asyncTimeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async function() {
  var value = await asyncValue(42);
  assert.equal(42, value);
  done();
})();
