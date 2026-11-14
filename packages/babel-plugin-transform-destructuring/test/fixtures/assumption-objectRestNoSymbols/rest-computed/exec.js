var a = "key";
var obj = { key: 1, other: 2, last: 3 };

let { [a]: b, ...c } = obj;

expect(b).toBe(1);
expect(c).toEqual({ other: 2, last: 3 });
expect(c).not.toBe(obj);
