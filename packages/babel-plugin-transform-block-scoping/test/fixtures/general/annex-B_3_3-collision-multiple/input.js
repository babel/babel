let a = 1;
const b = 2;

if (true) {
  function a() {}
  function b() {}
  function c() {}
  {
    function d() {}
  }
}

let c = 3;
const d = 4;

function test() {
  let e = 5;
  {
    function e() {}
    function f() {}
  }
  const f = 6;
  return [a, b, c, d, e, f];
}
