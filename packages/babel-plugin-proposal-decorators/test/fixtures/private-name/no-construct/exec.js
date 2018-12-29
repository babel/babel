var pn;
class A {
  @(({ key }) => { pn = key; })
  #x;
}

var PrivateName = pn.constructor;

expect(() => new PrivateName()).toThrow();
