const x = async do { 21 + 21 };

expect(x).toBeInstanceOf(Promise);
x.then((v) => expect(v).toBe(42)).catch(err => { throw err });
