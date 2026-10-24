// The parameters following a default value moved into the body must not be
// dropped.
function f({ ...a } = {}, b, ...rest) {
  var a;
  return [a, b, rest];
}
expect(f(undefined, 1, 2, 3)).toEqual([{}, 1, [2, 3]]);
expect(f({ x: 1 })).toEqual([{ x: 1 }, undefined, []]);
expect(f.length).toBe(0);
