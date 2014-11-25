var obj = {
  foo: "foo",
  bar: "bar",
  getFoo: function () {
    return this.foo;
  },
  getBar: function (arg) {
    return arg + " " +  this.bar;
  },
  getZoo: function (a, b) {
    return this.foo + " " + this.bar + " " + a + " " + b;
  }
};

var foo = obj:getFoo;
assert.equal(foo(), "foo");

var bar = obj:getBar("foo");
assert.equal(bar(), "foo bar");

var zoo = obj:getZoo("foo");
assert.equal(zoo("bar"), "foo bar foo bar");
