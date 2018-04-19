// https://github.com/google/traceur-compiler/issues/836

var count = 0;
for ({a = 0} of [{}]) {
  count++;
  expect(a).toBe(0);
}

expect(count).toBe(1);
