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
  assert.equal(1, ++x);
  await asyncTimeout(1);
  assert.equal(2, ++x);
  await asyncTimeout(1);
  assert.equal(3, ++x);
  await asyncTimeout(1);
  assert.equal(4, ++x);
  done();
})();
