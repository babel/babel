// https://tc39.es/proposal-discard-binding/
let read = 0;
const source = { get a() { read++; return 1; }, b: 2, c: 3 };

// `void` does not read the property, but the key is excluded from the rest
const { a: void, ...rest } = source;
expect(read).toBe(0);
expect(rest).toEqual({ b: 2, c: 3 });

const { b: void, c } = source;
expect(c).toBe(3);

// RequireObjectCoercible still applies
expect(() => { const { a: void } = null; }).toThrow(TypeError);

// array elements are still consumed
const [void, second, ...others] = [1, 2, 3, 4];
expect(second).toBe(2);
expect(others).toEqual([3, 4]);

let x;
[void, x] = [1, 2];
expect(x).toBe(2);
