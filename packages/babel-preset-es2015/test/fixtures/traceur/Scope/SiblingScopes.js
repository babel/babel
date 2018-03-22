// Options: --free-variable-checker=false

expect(() => {
  {
    let testVariable = 1;
    expect(testVariable).toBe(1);
  }

  {
    let testVariable = 2;
    expect(testVariable).toBe(2);
  }

  testVariable;
}).toThrow(ReferenceError);
