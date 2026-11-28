function f() {
  var outerX;
  { function x() {} outerX = x; }
  { { function x() {} } let x; }
  { let x; { function x() {} } }
  return x === outerX;
}
