function* gen() {
  try {
    throw 1;
  } catch {
    yield 2;
  }
}

expect([...gen()]).toEqual([2]);
