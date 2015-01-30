(function () {
  var stack = [];

  loop1:
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      stack.push(() => [i, j]);
      continue loop1;
    }
  }

  assert.deepEqual(stack[0](), [0, 0]);
  assert.deepEqual(stack[1](), [0, 1]);
  assert.deepEqual(stack[2](), [0, 2]);
  assert.deepEqual(stack[3](), [0, 3]);
  assert.deepEqual(stack[4](), [0, 4]);
  assert.deepEqual(stack[5](), [0, 5]);
  assert.deepEqual(stack[6](), [0, 6]);
  assert.deepEqual(stack[7](), [0, 7]);
  assert.deepEqual(stack[8](), [0, 8]);
  assert.deepEqual(stack[9](), [0, 9]);
})();
