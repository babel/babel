var proxied = { };
var proxy = Object.create(new Proxy(proxied, {
  get: function (t, k, r) {
    return t === proxied && k === "foo" && r === proxy && 5;
  }
}));
assert.equal(proxy.foo, 5);
