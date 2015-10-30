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
  assert.equal('complete', value);
  done();
})();
