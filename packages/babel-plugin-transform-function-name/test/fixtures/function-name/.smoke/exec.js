var foo = function () {};
expect(foo.name).toBe("foo");

var obj = { foo: function () {} };
expect(obj.foo.name).toBe("foo");

var obj = { "foo": function () {} };
expect(obj.foo.name).toBe("foo");

var obj = { foo() {} };
expect(obj.foo.name).toBe("foo");

var obj = { "foo"() {} };
expect(obj.foo.name).toBe("foo");

function noop() {}

var obj = { @noop foo() {} };
expect(obj.foo.name).toBe("foo");


var obj = { @noop foo: function () { return "foo"; } };
expect(obj.foo.name).toBe("foo");
