var keys = 0;
function k() {
  return "key" + keys++;
}
var src = { key0: 1, key1: 2, z: 3 };
var a, b, res;
for (var i = 0; i < 2; i++) ({ [k()]: a, ...b } = src);
expect(a).toBe(2);
expect(b).toEqual({ key0: 1, z: 3 });

var list = [1];
var calls = 0;
function f() {
  calls++;
  return { key2: 4, y: 5 };
}
for (var x of list) res = ({ [k()]: a, ...b } = f());
expect(a).toBe(4);
expect(b).toEqual({ y: 5 });
expect(res).toEqual({ key2: 4, y: 5 });
expect(calls).toBe(1);
