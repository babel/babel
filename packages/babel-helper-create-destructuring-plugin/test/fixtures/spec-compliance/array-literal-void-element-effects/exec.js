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
