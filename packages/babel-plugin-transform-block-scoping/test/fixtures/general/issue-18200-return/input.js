function testReturn() {
  var fns = [];
  for (var i = 0; i < 2; i++) {
    for (let x = (fns[i] = () => x, i); x === i; x++) {
      if (i === 1) {
        return {
          kind: "early-return",
          x: x,
          f0: fns[0](),
          f1: fns[1](),
        };
      }
      break;
    }
  }
  return {
    kind: "fell-through",
    f0: fns[0] && fns[0](),
    f1: fns[1] && fns[1](),
  };
}

expect(testReturn()).toEqual({
  kind: "early-return",
  x: 1,
  f0: 0,
  f1: 1,
});
