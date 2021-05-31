var foo, bar;

expect(
  () => [foo, bar] = undefined
).toThrow(/destructure non-iterable/);

expect(
  () => [foo, bar] = {}
).toThrow(/destructure non-iterable/);

global.Symbol = void 0;

expect(
  () => [foo, bar] = {}
).toThrow(/destructure non-iterable/);
