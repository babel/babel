var proxied = {};
var fakeProto = {};
var proxy = new Proxy(proxied, {
  getPrototypeOf: function (t) {
    return t === proxied && fakeProto;
  }
});
assert.equal(Object.getPrototypeOf(proxy), fakeProto);
