// Options: --async-functions
// Async.

function g() {
  var f = async (x = arguments) => [x, arguments];

  f().then((result) => {
    expect(result[0][0]).toBe(1);
    expect(result[1][0]).toBe(1);
    expect(result[0][1]).toBe(2);
    expect(result[1][1]).toBe(2);
    done();
  }).catch(done);
}

g(1, 2);
