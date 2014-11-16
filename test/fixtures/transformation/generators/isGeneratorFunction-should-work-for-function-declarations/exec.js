// Do the assertions up here to make sure the generator function is
// marked at the beginning of the block the function is declared in.
assert.strictEqual(
  regeneratorRuntime.isGeneratorFunction(genFun),
  true
);

assert.strictEqual(
  regeneratorRuntime.isGeneratorFunction(normalFun),
  false
);

function normalFun() {
  return 0;
}

function *genFun() {
  yield 0;
}
