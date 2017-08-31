function dec(target, name, descriptor) {

}

class Example {
  @dec static prop;
}

assert(Example.hasOwnProperty("prop"));
assert.equal(Example.prop, undefined);
