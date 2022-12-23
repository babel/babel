let i = 0;
const promise = expect(import({ toString: () => `./${++i}.js` }))
  .resolves.toHaveProperty("default", 1);
expect(i).toBe(1);
++i;
expect(i).toBe(2);
return promise;
