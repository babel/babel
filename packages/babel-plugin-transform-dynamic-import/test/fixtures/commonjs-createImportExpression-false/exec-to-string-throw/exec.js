return expect(import({ toString: () => { throw "toString failed"; } }))
  .rejects.toBe("toString failed");
