var env = {
  Array: null,
};

// Wee need to use "with" to avoid leaking the modified Array to other tests.
with (env) {
  class List extends Array {}
  expect(List.prototype.__proto__).toBeUndefined();
}
