function f() {
  var outerX;
  { function x() { return 1; } outerX = x; }
  { { function x() { return 2; } } let x; }
  { let x; { function x() { return 3; } } }
  return x === outerX;
}
expect(f()).toBe(true);
