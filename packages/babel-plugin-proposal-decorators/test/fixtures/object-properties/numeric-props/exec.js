function dec(target, name, descriptor){
  assert(target);
  assert.equal(name, 4);
  assert.equal(typeof descriptor, "object");
}

const inst = {
  @dec
  4: 1
};
