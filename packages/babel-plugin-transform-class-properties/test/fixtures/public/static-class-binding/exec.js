class A {
  static self = A;
  static getA = () => A;
}

const oldA = A;
A = null;

expect(oldA.self).toBe(oldA);
expect(oldA.getA()).toBe(oldA);
