const obj = { x: 1 };
const arr = [2];
let x, y;

expect((0, { x } = obj)).toBe(obj);
expect(x).toBe(1);

expect((0, [y] = arr)).toBe(arr);
expect(y).toBe(2);

expect((0, (1, { x } = obj))).toBe(obj);

const f = () => (0, { x } = obj);
expect(f()).toBe(obj);

expect(({ x } = { x: 3 }, [y] = arr)).toBe(arr);
expect(x).toBe(3);
