function t([,,a] = [1,2,3]) { return a }

expect(t()).toBe(3);
expect(t([4,5,6])).toBe(6);
