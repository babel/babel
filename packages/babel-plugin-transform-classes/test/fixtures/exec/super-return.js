class Foo {
  constructor() {
    return { i: 1 };
  }
}

class Bar extends Foo {
  constructor() {
    expect(super().i).toBe(1);
    expect(this.i).toBe(1);
  }
}

new Bar;
