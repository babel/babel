assert.strictEqual(
  regeneratorRuntime.isGeneratorFunction(function *genFun() {
    yield 0;
  }),
  true
);

assert.strictEqual(
  regeneratorRuntime.isGeneratorFunction(function normalFun() {
    return 0;
  }),
  false
);
