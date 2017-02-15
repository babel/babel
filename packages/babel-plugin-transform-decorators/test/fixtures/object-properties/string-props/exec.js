function dec(target, name, descriptor){
  assert(target);
  assert.equal(name, "str");
  assert.equal(typeof descriptor, "object");
}

const inst = {
  @dec
  "str": 1
};
