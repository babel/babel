var c1 = { a1: "a1", x: 1 };
var c2 = { a2: "a2", y: 2, z: 3 };
var c3 = { a3: "a3", w: 4 };
var a1, a2, b2, a3, b3;
var logs = [];
var console = { log: (...args) => logs.push(args) };

({ a1 } = c1);
({ a2, ...b2 } = c2);

console.log({ a3, ...b3 } = c3);

expect(a1).toBe("a1");
expect(a2).toBe("a2");
expect(b2).toEqual({ y: 2, z: 3 });
expect(a3).toBe("a3");
expect(b3).toEqual({ w: 4 });
expect(logs).toHaveLength(1);
expect(logs[0]).toHaveLength(1);
expect(logs[0][0]).toBe(c3);
