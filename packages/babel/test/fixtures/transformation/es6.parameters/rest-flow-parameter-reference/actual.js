function foo(
  x: Object,
  ...types
): { types: Array<number>, x: Object } {
  return {
    types: types,
    x: x,
  };
}
