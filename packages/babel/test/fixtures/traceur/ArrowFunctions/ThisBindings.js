// Options: --block-binding

// These tests are from:
// http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax

const obj = {
  method: function () {
    return () => this;
  }
};
assert.equal(obj.method()(), obj);

let fake = {steal: obj.method()};
assert.equal(fake.steal(), obj);

let real = {borrow: obj.method};
assert.equal(real.borrow()(), real);

