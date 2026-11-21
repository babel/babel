var range = [1, 10];

// `break` added to the body: the original loop never terminates.
for (let [ i, n ] = range; ; ) {
  expect(i).toBe(1);
  expect(n).toBe(10);
  break;
}

var sum = 0;
for (let [i, n] = range; i <= n; i++) {
  sum += i;
}
expect(sum).toBe(55);
