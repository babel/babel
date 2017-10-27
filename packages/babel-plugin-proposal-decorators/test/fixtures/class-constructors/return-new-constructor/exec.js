function dec(cls){
  return class Child extends cls {
    child(){}
  };
}

@dec
class Parent {
  parent(){}
}

assert.equal(typeof Parent.prototype.parent, "function")
assert.equal(typeof Parent.prototype.child, "function")
