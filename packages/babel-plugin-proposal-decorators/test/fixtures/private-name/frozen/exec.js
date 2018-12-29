var pn;
class A {
  @(({ key }) => { pn = key; })
  #x;
}

expect(Object.isFrozen(pn)).toBeTruthy();
expect(Object.isFrozen(pn.__proto__)).toBeTruthy();
expect(Object.isFrozen(pn.constructor)).toBeTruthy();
expect(Object.isFrozen(pn.description)).toBeTruthy();
expect(Object.isFrozen(pn.get)).toBeTruthy();
expect(Object.isFrozen(pn.set)).toBeTruthy();
expect(Object.isFrozen(pn.toString)).toBeTruthy();
