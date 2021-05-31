function * generator() {
  yield 1;
  const y = do {
    let z;
    yield 2;
  };

  return y;
}

const gen = generator();
expect(gen.next().value).toBe(1);
expect(gen.next().value).toBe(2);
expect(gen.next(3).value).toBe(3);