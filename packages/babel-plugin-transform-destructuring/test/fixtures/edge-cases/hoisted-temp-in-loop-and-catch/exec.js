// The temporaries of a lowering whose scope is a loop or a catch clause are
// declared in their body, and hoisted to the function scope.
var obj = {};
var o = { a: 10, b: undefined, c: 30 };
for (({ a: obj.x = 1 } = o); ; ) break;
while (({ b: obj.y = 2 } = o)) break;
try {
  throw o;
} catch (e) {
  ({ c: obj.z = 3 } = e);
}
expect(obj).toEqual({ x: 10, y: 2, z: 30 });
