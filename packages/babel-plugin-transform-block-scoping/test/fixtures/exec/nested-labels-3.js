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

  expect(stack[0]()).toEqual([0, 0, 0]);
  expect(stack[1]()).toEqual([0, 1, 0]);
  expect(stack[2]()).toEqual([0, 2, 0]);
  expect(stack[3]()).toEqual([0, 3, 0]);
  expect(stack[4]()).toEqual([0, 4, 0]);
  expect(stack[5]()).toEqual([0, 5, 0]);
  expect(stack[6]()).toEqual([0, 6, 0]);
  expect(stack[7]()).toEqual([0, 7, 0]);
  expect(stack[8]()).toEqual([0, 8, 0]);
  expect(stack[9]()).toEqual([0, 9, 0]);
})();
