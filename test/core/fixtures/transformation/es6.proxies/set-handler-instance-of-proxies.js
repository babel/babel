var proxied = {};
var passed = false;
var proxy = Object.create(new Proxy(proxied, {
  set: function (t, k, v, r) {
    passed = t === proxied && k + v === "foobar" && r === proxy;
  }
}));
proxy.foo = "bar";
assert.ok(passed);

