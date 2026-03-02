class A {
  static self = this;
  static getA = () => this;
}

const { self, getA } = A;

expect(self).toBe(A);
expect(getA()).toBe(A);
