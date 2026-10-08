const last = ((...args) => args.at(-1))~(?255);
expect(last.length).toBe(256);
expect(last(...Array.from({ length: 256 }, (_, i) => i))).toBe(255);
