class Foo {
  constructor() {
    return { i: 1 };
  }
}

class Bar extends Foo {
  constructor() {
    assert.equal(super().i, 1);
    assert.equal(this.i, 1);
  }
}

new Bar;
