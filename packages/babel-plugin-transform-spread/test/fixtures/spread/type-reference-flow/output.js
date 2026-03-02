function foo() {
  const x = 1 ? a() : b();
  const y = a() || b();
  return [].concat(x, y);
}
function a() {
  return [];
}
function b() {
  return [];
}
