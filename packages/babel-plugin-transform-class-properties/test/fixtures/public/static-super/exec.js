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

const oldB = B;
B = null;

expect(oldB.prop).toBe(2);
expect(oldB.propA).toBe(1);
expect(oldB.getPropA()).toBe(1);
