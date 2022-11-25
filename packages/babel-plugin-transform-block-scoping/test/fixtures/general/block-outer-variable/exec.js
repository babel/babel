let a = 1;

function f() {
  let res;
  { res = a; }
  { let a = 2; }
  return res;
}

expect(f()).toBe(1);
