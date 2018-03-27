// Options: --async-functions
// Async.

function g() {
  var f = async (x = this) => [x, this];
  var p = {};
  f.call(p).then((result) => {
    expect(result[0]).toBe(o);
    expect(result[1]).toBe(o);
    done();
  }).catch(done);
}

var o = {};
g.call(o);
