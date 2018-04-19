var s = Symbol();
var s2 = Symbol();
var object = {};
object[s] = 1;
object[s2] = 2;

expect(object[s]).toBe(1);
expect(object[s2]).toBe(2);
