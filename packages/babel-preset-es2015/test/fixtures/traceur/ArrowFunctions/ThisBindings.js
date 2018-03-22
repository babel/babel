// Options: --block-binding

// These tests are from:
// http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax

const obj = {
  method: function () {
    return () => this;
  }
};
expect(obj.method()()).toBe(obj);

let fake = {steal: obj.method()};
expect(fake.steal()).toBe(obj);

let real = {borrow: obj.method};
expect(real.borrow()()).toBe(real);

