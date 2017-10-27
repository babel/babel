function dec(target, name, descriptor) {
  assert(target);
  assert.equal(name, "str");
  assert.equal(typeof descriptor, "object");
}

class Example {
   @dec
   static "str"() {};
}
