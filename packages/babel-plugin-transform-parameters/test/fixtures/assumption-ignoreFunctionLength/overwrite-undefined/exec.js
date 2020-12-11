function t(undefined = 17, a = 3) {
  return a;
}

expect(t()).toBe(3);
