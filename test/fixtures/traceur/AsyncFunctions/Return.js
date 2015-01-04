// Options: --async-functions
// Async.

async function ret(x) {
  if (x > 1)
    return x - 2;
  return x + 3;
}

(async function() {
  var v = await ret(4);
  assert.equal(v, 2);
  v = await ret(0);
  assert.equal(v, 3);
  done();
})();
