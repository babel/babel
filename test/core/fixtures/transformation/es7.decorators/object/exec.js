function override(target, key, descriptor) {
  descriptor.initializer = function () {
    return "lol";
  };
}

var obj = {
  @override
  foo: "bar",

  bar: "heh"
};

assert.equal(obj.foo, "lol");
assert.equal(obj.bar, "heh");
