function dec(cls){
  cls.staticProp = "prop";
}

@dec
class Parent {
  parent() {};
}

assert.equal(Parent.staticProp, "prop");
