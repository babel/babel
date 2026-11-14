var log = [];
var k = {
  toString() {
    log.push("k");
    return "kk";
  },
};
function key() {
  log.push("key");
  return "dd";
}
var obj = { a: 1, kk: 2, 1: 3, dd: 4, x: 5, y: 6 };

function f() {
  const { a, [k]: b, [1]: c, [key()]: d, ...rest } = obj;
  return rest;
}

var rest = f();
expect(rest).toEqual({ x: 5, y: 6 });
expect(Object.keys(rest)).toEqual(["x", "y"]);
expect(rest).not.toBe(obj);
expect(log).toEqual(["k", "key"]);

expect(f()).not.toBe(rest);
expect(log).toEqual(["k", "key", "k", "key"]);
