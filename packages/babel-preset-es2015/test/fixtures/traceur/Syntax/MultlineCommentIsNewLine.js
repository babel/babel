function f() {
  return /*
      */ 1;
}
expect(f()).toBeUndefined();

function g() {
  return /* */ 1;
}
expect(g()).toBe(1);

function h() {
  return /* */ /*
      */ 1;
}
expect(h()).toBeUndefined();

function i() {
  return /* */ //
      1;
}
expect(i()).toBeUndefined();

function j() {
  return //
      1;
}
expect(j()).toBeUndefined();
