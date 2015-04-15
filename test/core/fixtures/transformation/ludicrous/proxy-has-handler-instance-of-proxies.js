var proxied = {};
var passed = false;
"foo" in Object.create(new Proxy(proxied, {
  has: function (t, k) {
    passed = t === proxied && k === "foo";
  }
}));
assert.ok(passed);
