const x = async do { throw new Error("sync") };

expect(x).toBeInstanceOf(Promise);
x.then(() => { throw new Error("expected an error: sync is thrown.") })
.catch(err => { expect(err.message).toEqual("sync") });
