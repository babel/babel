
assert.equal((new class {
  get x() {
    return 'x';
  }
  getX() {
    return this.x;
  }
}).getX(), 'x');

assert.equal(new class {
  get y() {
    return 'y';
  }
  getY() {
    return this.y;
  }
}().getY(), 'y');
