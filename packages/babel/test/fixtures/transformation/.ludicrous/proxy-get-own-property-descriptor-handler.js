var proxied = {};
var fakeDesc = { value: "foo", configurable: true };
var returnedDesc = Object.getOwnPropertyDescriptor(
  new Proxy(proxied, {
    getOwnPropertyDescriptor: function (t, k) {
      return t === proxied && k === "foo" && fakeDesc;
    }
  }),
  "foo"
);
assert.equal(returnedDesc.value, fakeDesc.value);
assert.equal(returnedDesc.configurable, fakeDesc.configurable);
assert.equal(returnedDesc.writable, false);
assert.equal(returnedDesc.enumerable, false);
