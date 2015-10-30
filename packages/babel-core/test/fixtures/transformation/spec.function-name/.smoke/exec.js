var foo = function () {};
assert.equal(foo.name, "foo");

var obj = { foo: function () {} };
assert.equal(obj.foo.name, "foo");

var obj = { "foo": function () {} };
assert.equal(obj.foo.name, "foo");

var obj = { foo() {} };
assert.equal(obj.foo.name, "foo");

var obj = { "foo"() {} };
assert.equal(obj.foo.name, "foo");

function noop() {}

var obj = { @noop foo() {} };
assert.equal(obj.foo.name, "foo");


var obj = { @noop foo: function () { return "foo"; } };
assert.equal(obj.foo.name, "foo");
