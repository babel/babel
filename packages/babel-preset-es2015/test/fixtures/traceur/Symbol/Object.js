var s = Symbol();
var object = {};
object[s] = 42;
expect(object[s]).toBe(42);
// Native Symbol throws for ToString.
// expect(object[s + '']).toBeUndefined();
expect(Object.getOwnPropertyNames(object)).toEqual([]);
expect(object.hasOwnProperty(s)).toBe(true);

expect(object[s] -= 10).toBe(32);
expect(object[s] /= 2).toBe(16);
expect(object[s]).toBe(16);

var n = Symbol();
expect(object[n] = 1).toBe(1);
expect(object[n] += 2).toBe(3);

expect(Object.getOwnPropertyDescriptor(object, n).enumerable).toBe(true);

expect(n in object).toBe(true);
expect(delete object[n]).toBe(true);
expect(n in object).toBe(false);

var keys = [];
for (var k in object) {
  keys.push(k);
}
expect(keys).toHaveLength(0);
expect(Object.keys(object)).toBe(0);
