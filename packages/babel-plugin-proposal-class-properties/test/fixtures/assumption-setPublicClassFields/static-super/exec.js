class A {
  static prop = 1;
}

class B extends A {
  static prop = 2;
  static propA = super.prop;
  static getPropA = () => super.prop;
}

const { prop, propA, getPropA } = B;

expect(prop).toBe(2);
expect(propA).toBe(1);
expect(getPropA()).toBe(1);
