var proxied = {};
var passed = false;
Object.preventExtensions(
  new Proxy(proxied, {
    preventExtensions: function (t) {
      passed = t === proxied;
      return Object.preventExtensions(proxied);
    }
  })
);
assert.ok(passed);

