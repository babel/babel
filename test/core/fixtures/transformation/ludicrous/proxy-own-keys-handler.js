var proxied = {};
var passed = false;
Object.keys(
  new Proxy(proxied, {
    ownKeys: function (t) {
      passed = t === proxied; return [];
    }
  })
);
assert.ok(passed);

