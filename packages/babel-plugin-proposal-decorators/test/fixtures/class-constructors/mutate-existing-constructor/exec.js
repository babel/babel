function dec(cls){
  cls.staticProp = "prop";
}

@dec
class Parent {
  parent() {};
}

expect(Parent.staticProp).toBe("prop");
