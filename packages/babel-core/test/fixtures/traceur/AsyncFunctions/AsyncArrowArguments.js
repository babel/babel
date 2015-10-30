// Options: --async-functions
// Async.

function g() {
  var f = async (x = arguments) => [x, arguments];

  f().then((result) => {
    assert.equal(result[0][0], 1);
    assert.equal(result[1][0], 1);
    assert.equal(result[0][1], 2);
    assert.equal(result[1][1], 2);
    done();
  }).catch(done);
}

g(1, 2);
