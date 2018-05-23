var called = false;

var env = {
  Array: function Array() {
    called = true;
  }
};

// Wee need to use "with" to avoid leaking the modified Array to other tests.
with (env) {
  class List extends Array {};
  new List();

  expect(called).toBe(true);
}
