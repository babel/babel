// Options: --async-functions
// Async.

function asyncTimeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

class C {
  async test() {
    var x = 0;
    await asyncTimeout(1);
    assert.equal(1, ++x);
    await asyncTimeout(1);
    assert.equal(2, ++x);
    C.test();
  }

  static async test() {
    var x = 0;
    await asyncTimeout(1);
    assert.equal(1, ++x);
    await asyncTimeout(1);
    assert.equal(2, ++x);

    done();
  }
}

new C().test();
