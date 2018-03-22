function f(...p) {
  return p;
}

function g(a, ...p) {
  return p;
}

expect(f()).toEqual([]);;
expect(f(0)).toEqual([0]);;
expect(f(0, 1)).toEqual([0, 1]);;

expect(g()).toEqual([]);;
expect(g(0)).toEqual([]);;
expect(g(0, 1)).toEqual([1]);;
expect(g(0, 1, 2)).toEqual([1, 2]);;
