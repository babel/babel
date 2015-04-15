var proxied = function(){};
var passed = false;
new new Proxy(proxied, {
  construct: function (t, args) {
    passed = t === proxied && args + "" === "foo,bar";
    return {};
  }
})("foo","bar");
assert.ok(passed);
