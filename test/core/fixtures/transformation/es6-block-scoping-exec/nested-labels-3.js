(function () {
  var stack = [];

  loop1:
  for (let j = 0; j < 10; j++) {
    loop2:
    for (let i = 0; i < 10; i++) {
      for (let x = 0; x < 10; x++) {
        stack.push(() => [j, i, x]);
        continue loop2;
      }
    }
  }

  assert.deepEqual(stack[0](), [0, 0, 0]);
  assert.deepEqual(stack[1](), [0, 1, 0]);
  assert.deepEqual(stack[2](), [0, 2, 0]);
  assert.deepEqual(stack[3](), [0, 3, 0]);
  assert.deepEqual(stack[4](), [0, 4, 0]);
  assert.deepEqual(stack[5](), [0, 5, 0]);
  assert.deepEqual(stack[6](), [0, 6, 0]);
  assert.deepEqual(stack[7](), [0, 7, 0]);
  assert.deepEqual(stack[8](), [0, 8, 0]);
  assert.deepEqual(stack[9](), [0, 9, 0]);
})();
