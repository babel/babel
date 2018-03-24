var s1 = Symbol();
var s2 = Symbol();
var object = {a: 'a'};
object[s1] = 's1';
object.b = 'b';
object[s2] = 's2';
expect(Object.getOwnPropertySymbols(object)).toEqual([s1, s2]);
