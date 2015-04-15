var proxied = {};
var passed = false;
Object.defineProperty(
  new Proxy(proxied, {
    defineProperty: function (t, k, d) {
      passed = t === proxied && k === "foo" && d.value === 5;
      return true;
    }
  }),
  "foo",
  { value: 5, configurable: true }
);
assert.ok(passed);
