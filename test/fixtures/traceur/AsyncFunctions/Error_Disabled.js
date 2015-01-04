// Disabled by default.
// Error: :13:21: Semi-colon expected

function asyncComplete() {
  return new Promise((resolve) => {
    resolve('complete');
  });
}

// ----------------------------------------------------------------------------

(async function() {
  var value = async asyncComplete();
  assert.equal('complete', value);
})();
