const pair = (a, b) => [a, b];

// `a` is reassigned through `arguments` after the partial application
function sloppy(a) {
  const g = pair~(a, ?);
  arguments[0] = 2;
  return g;
}
expect(sloppy(1)(0)).toEqual([1, 0]);
