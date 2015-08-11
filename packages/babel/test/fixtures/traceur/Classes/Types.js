// Options: --types

class Typed<T> {
  constructor(x : number) {
    this.x_ = x;
  }

  addTo(y : number) : number {
    this.x += y;
    return this.x;
  }

  get x() : number {
    return this.x_;
  }

  set x(x : number) {
    this.x_ = x;
  }
}

// Generics, ClassExpression
var C = class ClassExpression<T> {};

assert.equal(1, new Typed(1).x);
assert.equal(2, new Typed(1).addTo(1));
