// Options: --free-variable-checker=false

assert.throws(() => {
  {
    let testVariable = 1;
    assert.equal(testVariable, 1);
  }

  {
    let testVariable = 2;
    assert.equal(testVariable, 2);
  }

  testVariable;
}, ReferenceError);
