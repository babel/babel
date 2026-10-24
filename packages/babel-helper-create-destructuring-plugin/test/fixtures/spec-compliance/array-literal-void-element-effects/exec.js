let x = 0;
const [void, a] = [x++, 2];
expect(x).toBe(1);
expect(a).toBe(2);

let created = 0;
class Foo {
  constructor() {
    created++;
  }
}
const [void, b] = [new Foo(), 3];
expect(created).toBe(1);
expect(b).toBe(3);

const log = [];
const key = { valueOf() { log.push("key"); return 1; } };
const [void] = [+key];
expect(log).toEqual(["key"]);

expect(() => {
  const [void] = [late];
  const late = 1;
}).toThrow(ReferenceError);

expect(() => {
  const [void, void] = [late];
  const late = 1;
}).toThrow(ReferenceError);
