let obj = null;
expect(obj?.x += 3).toBe(undefined);

obj = { x: 1 };
expect(obj?.x += 3).toBe(4);
expect(obj.x).toBe(4);
