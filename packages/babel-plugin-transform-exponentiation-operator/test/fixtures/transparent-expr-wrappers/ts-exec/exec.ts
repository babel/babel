var key = 0;
var obj: any = { 1: 3, 2: 5 };
obj[++key]! **= 2;
expect(key).toBe(1);
expect(obj).toEqual({ 1: 9, 2: 5 });

key = 0;
obj = { 1: 3, 2: 5 };
(obj[++key] as number) **= 2;
expect(key).toBe(1);
expect(obj).toEqual({ 1: 9, 2: 5 });

var calls = 0;
obj = { x: 3 };
function getObject() {
  calls++;
  return obj;
}
getObject().x! **= 2;
expect(calls).toBe(1);
expect(obj).toEqual({ x: 9 });
