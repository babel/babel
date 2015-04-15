var proxied = {};
var newProto = {};
var passed = false;
Object.setPrototypeOf(
  new Proxy(proxied, {
    setPrototypeOf: function (t, p) {
      passed = t === proxied && p === newProto;
      return true;
    }
  }),
  newProto
);
assert.ok(passed);
