const x = async do { await Promise.resolve(); var y = 21; y + y }

expect(y).toBe(undefined);
x.then((resolved) => {
  expect(y).toBe(21);
  expect(resolved).toBe(42);
}).catch(err => { throw err });
