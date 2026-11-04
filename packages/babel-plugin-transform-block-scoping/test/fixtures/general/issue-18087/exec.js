let count = 0;

for (let outer = 0; outer < 2; outer++) {
  for (let done; !done; done = true) {
    count++;
  }
}

expect(count).toBe(2);
