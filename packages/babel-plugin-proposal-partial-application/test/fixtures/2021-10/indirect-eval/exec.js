globalThis.partialApplicationEvalTest = "global";
function test() {
  var partialApplicationEvalTest = "local";
  return eval~(?)("partialApplicationEvalTest");
}
expect(test()).toBe("global");
delete globalThis.partialApplicationEvalTest;
