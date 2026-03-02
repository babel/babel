const x = async do { let x = 21; x + x };

expect(x).toBeInstanceOf(Promise);
x.then((v) => expect(v).toBe(42)).catch(err => { throw err });
