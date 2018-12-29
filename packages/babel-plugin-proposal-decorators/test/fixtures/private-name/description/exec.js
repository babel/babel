var pn;
class A {
  @(({ key }) => { pn = key; })
  #x;
}

expect(pn.description()).toBe("x");

class B {
  @(({ key }) => { pn = key; })
  #y;
}

expect(pn.description()).toBe("y");
