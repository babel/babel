
expect((new class {
  get x() {
    return 'x';
  }
  getX() {
    return this.x;
  }
}).getX()).toBe('x');

expect(new class {
  get y() {
    return 'y';
  }
  getY() {
    return this.y;
  }
}().getY()).toBe('y');
