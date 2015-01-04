// Options: --async-functions
// Async.

function g() {
  var f = async (x = this) => [x, this];
  var p = {};
  f.call(p).then((result) => {
    assert.equal(result[0], o);
    assert.equal(result[1], o);
    done();
  }).catch(done);
}

var o = {};
g.call(o);
