var pn;
class A {
  @(({ key }) => { pn = key; })
  #x;
}

expect(() => pn.toString()).toThrow();
expect(() => String(pn)).toThrow();
expect(() => "" + pn).toThrow();
