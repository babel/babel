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
    expect(1).toBe(++x);
    await asyncTimeout(1);
    expect(2).toBe(++x);
    C.test();
  }

  static async test() {
    var x = 0;
    await asyncTimeout(1);
    expect(1).toBe(++x);
    await asyncTimeout(1);
    expect(2).toBe(++x);

    done();
  }
}

new C().test();
