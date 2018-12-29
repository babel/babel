function getPrivateName() {
  let pn;
  class C { @(({ key }) => { pn = key }) #x; }
  return pn;
}

const pn = getPrivateName();

expect(() => {
  class A {
    [pn]() {}
    [pn]() {}
  }
}).toThrow();
