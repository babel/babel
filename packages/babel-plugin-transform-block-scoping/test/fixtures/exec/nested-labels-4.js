(function () {
  var stack = [];

  loop1:
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      stack.push(() => [i, j]);
      break loop1;
    }
  }

  assert.deepEqual(stack.length, 1);
  assert.deepEqual(stack[0](), [0, 0]);
})();
