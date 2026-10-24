function foo() {
  return "called";
}
foo[Symbol.iterator] = function* () {
  yield "spread";
};
var bar = "bar";
var clazz = {
  foo() {
    return this === clazz;
  },
};

var [a, b] = [1, 2];
expect([a, b]).toEqual([1, 2]);
var [[a, b]] = [[1, 2]];
expect([a, b]).toEqual([1, 2]);
var [a, b, ...c] = [1, 2, 3, 4];
expect([a, b, c]).toEqual([1, 2, [3, 4]]);
var [[a, b, ...c]] = [[1, 2, 3, 4]];
expect([a, b, c]).toEqual([1, 2, [3, 4]]);

var [a, b] = [1, 2, 3];
expect([a, b]).toEqual([1, 2]);
var [[a, b]] = [[1, 2, 3]];
expect([a, b]).toEqual([1, 2]);
var [a, b] = [a, b];
expect([a, b]).toEqual([1, 2]);
a = ["first", "second"];
[a[0], a[1]] = [a[1], a[0]];
expect(a).toEqual(["second", "first"]);
var [a, b] = [...foo, bar];
expect([a, b]).toEqual(["spread", "bar"]);
var [a, b] = [foo(), bar];
expect([a, b]).toEqual(["called", "bar"]);
var [a, b] = [clazz.foo(), bar];
expect([a, b]).toEqual([true, "bar"]);
var [a, b] = [clazz.foo, bar];
expect(a).toBe(clazz.foo);
expect(b).toBe("bar");
var [a, b] = [, 2];
expect([a, b]).toEqual([undefined, 2]);
[a, b] = [1, 2];
expect([a, b]).toEqual([1, 2]);
[a, b] = [, 2];
expect([a, b]).toEqual([undefined, 2]);
; // Avoid completion record special case
