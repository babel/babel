// `break` added to the body: the original loop never terminates.
for (let [[x] = [1]] = [];  ;  ) {
  expect(x).toBe(1);
  break;
}

for (let [[x] = [1]] = [[2]]; ; ) {
  expect(x).toBe(2);
  break;
}
