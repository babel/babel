function* foobar() {
  try {
    yield 1;
  } catch {
    return false;
  }
}

const gen = foobar();
expect(gen.next().value).toBe(1);
expect(gen.next().value).toBe(undefined);
