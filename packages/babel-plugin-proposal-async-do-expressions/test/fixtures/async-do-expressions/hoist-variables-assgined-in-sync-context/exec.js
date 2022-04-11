const x = async do { var y = 21; y + y }

expect(y).toBe(21);
x.then((resolved) => {
  expect(resolved).toBe(42);
}).catch(err => { throw err });
