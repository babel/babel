const value = {};
const [first, ...rest] = [value, value];
expect(first).toBe(value);
expect(rest).toEqual([value]);
expect(rest[0]).toBe(value);
const [hole, ...tail] = [, value, value];
expect(hole).toBeUndefined();
expect(tail[0]).toBe(value);
expect(tail[1]).toBe(value);
