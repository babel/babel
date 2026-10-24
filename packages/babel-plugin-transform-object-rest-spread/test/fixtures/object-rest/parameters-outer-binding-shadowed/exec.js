// The default value refers to the outer `z`, not to the one declared in
// the body.
const z = 1;
function f({ y = z, ...rest }) {
  var z = 2;
  return [y, z, rest];
}
expect(f({ a: 0 })).toEqual([1, 2, { a: 0 }]);
