var proxied = {};
var passed = false;
Object.isExtensible(
  new Proxy(proxied, {
    isExtensible: function (t) {
      passed = t === proxied; return true;
    }
  })
);
assert.ok(passed);
