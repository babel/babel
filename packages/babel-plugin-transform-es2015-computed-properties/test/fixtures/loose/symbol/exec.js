var k = Symbol();
var foo = {
  [Symbol.iterator]: "foobar",
  get [k]() {
    return k;
  }
};

assert(foo[Symbol.iterator], "foobar")
assert(foo[k], k)
