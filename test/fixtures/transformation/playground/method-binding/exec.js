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

assert.deepEqual(["foo", "bar"].map(:toUpperCase), ["FOO", "BAR"]);
assert.deepEqual([1.1234, 23.53245, 3].map(:toFixed(2)), ["1.12", "23.53", "3.00"]);

var get = function () {
  return 2;
}
assert.deepEqual([1.1234, 23.53245, 3].map(:toFixed(get())), ["1.12", "23.53", "3.00"]);
