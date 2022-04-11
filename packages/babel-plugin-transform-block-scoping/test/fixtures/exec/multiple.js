for (let i = 0, x = 2; i < 5; i++);

expect(typeof i).toBe("undefined");
expect(typeof x).toBe("undefined");
