var b = { y: 2, x: 3, z: { n: 4 } };

let a = { x: 1, ...b };

expect(a).not.toBe(b);
expect(Object.keys(a)).toEqual(["x", "y", "z"]);
expect(a.x).toBe(3);
expect(a.y).toBe(2);
expect(a.z).toBe(b.z);
expect(b).toEqual({ y: 2, x: 3, z: { n: 4 } });
