function dec(cls){
  return class Child extends cls {
    child(){}
  };
}

@dec
class Parent {
  parent(){}
}

expect(typeof Parent.prototype.parent).toBe("function");
expect(typeof Parent.prototype.child).toBe("function");
