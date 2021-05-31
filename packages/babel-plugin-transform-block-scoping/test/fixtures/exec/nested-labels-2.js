(function () {
  var stack = [];

  loop1:
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      stack.push(() => [i, j]);
      break;
    }
  }

  expect(stack[0]()).toEqual([0, 0]);
  expect(stack[1]()).toEqual([0, 1]);
  expect(stack[2]()).toEqual([0, 2]);
  expect(stack[3]()).toEqual([0, 3]);
  expect(stack[4]()).toEqual([0, 4]);
  expect(stack[5]()).toEqual([0, 5]);
  expect(stack[6]()).toEqual([0, 6]);
  expect(stack[7]()).toEqual([0, 7]);
  expect(stack[8]()).toEqual([0, 8]);
  expect(stack[9]()).toEqual([0, 9]);
})();
