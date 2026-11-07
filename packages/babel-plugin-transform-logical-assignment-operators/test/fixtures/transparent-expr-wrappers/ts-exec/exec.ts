var key = 0;
var obj: any = {};
obj[++key]! ||= 1;
expect(key).toBe(1);
expect(obj).toEqual({ 1: 1 });

key = 0;
obj = { 1: 1, 2: 2 };
(obj[++key] as number) &&= 3;
expect(key).toBe(1);
expect(obj).toEqual({ 1: 3, 2: 2 });

key = 0;
obj = {};
(<any>obj[++key])! ??= 4;
expect(key).toBe(1);
expect(obj).toEqual({ 1: 4 });

var calls = 0;
obj = {};
function getObject() {
  calls++;
  return obj;
}
getObject().x! ||= 5;
expect(calls).toBe(1);
expect(obj).toEqual({ x: 5 });
