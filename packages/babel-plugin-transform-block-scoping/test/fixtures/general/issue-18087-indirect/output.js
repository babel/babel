var count = 0;
for (var outer = 0; outer < 2; outer++) {
  do {
    for (var done = void 0; !done; done = true) {
      count++;
    }
  } while (false);
}
expect(count).toBe(2);
