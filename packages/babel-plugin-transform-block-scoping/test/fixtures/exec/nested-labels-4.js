(function () {
  var stack = [];

  loop1:
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      stack.push(() => [i, j]);
      break loop1;
    }
  }

  expect(stack).toHaveLength(1);
  expect(stack[0]()).toEqual([0, 0]);
})();
