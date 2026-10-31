const b = 1, k = "x";
let result;
try {
  throw { x: 2, y: 3 };
} catch ({ a = b, [k]: c, ...rest }) {
  let b = 4;
  const k = "y";
  result = [a, c, rest, b, k];
}
expect(result).toEqual([1, 2, { y: 3 }, 4, "y"]);

const B = 1;
try {
  throw [{}];
} catch ([{ d = () => B }]) {
  class B {}
  result = d();
}
expect(result).toBe(1);

// A `var` in the body is declared in the enclosing function
function f() {
  try {
    throw {};
  } catch ({ e = v }) {
    var v = 5;
    return [e, v];
  }
}
expect(f()).toEqual([undefined, 5]);
