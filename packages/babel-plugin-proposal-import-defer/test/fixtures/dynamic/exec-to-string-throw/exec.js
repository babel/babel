let promise;
expect(() => {
  promise = import.defer({ toString: () => { throw "toString failed"; } });
}).not.toThrow();

return expect(promise).rejects.toBe("toString failed");
