// The elements staying in the parameter list can't read the bindings of the
// patterns moved into the body: the whole parameter is moved.
function f([{ ...r }, b = r]) {
  return [r, b];
}
expect(f([{ a: 1 }])).toEqual([{ a: 1 }, { a: 1 }]);

function g([{ ...r }, b = () => r]) {
  return [r, b()];
}
expect(g([{ a: 1 }])).toEqual([{ a: 1 }, { a: 1 }]);

function h([{ ...r }, { ...s }, b = s]) {
  return [r, s, b];
}
expect(h([{ a: 1 }, { c: 2 }])).toEqual([{ a: 1 }, { c: 2 }, { c: 2 }]);
