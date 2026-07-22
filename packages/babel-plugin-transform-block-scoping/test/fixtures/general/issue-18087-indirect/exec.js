let count = 0;

for (let outer = 0; outer < 2; outer++) {
  do {
    for (let done; !done; done = true) {
      count++;
    }
  } while (false);
}

expect(count).toBe(2);
