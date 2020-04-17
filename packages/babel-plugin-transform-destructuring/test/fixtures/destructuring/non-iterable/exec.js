var foo, bar;

expect(
  () => [foo, bar] = undefined
).toThrow(/destructure non-iterable/);

expect(
  () => [foo, bar] = {}
).toThrow(/destructure non-iterable/);

// Simulate old browser
let _Symbol = Symbol;
Symbol = void 0;
try {

  expect(
    () => [foo, bar] = {}
  ).toThrow(/destructure non-iterable/);

} finally {
  Symbol = _Symbol;
}
