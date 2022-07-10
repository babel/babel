async function* asyncGenerator(x) {
  const y = do {
    let z;
    yield 3;
    yield await x;
  };

  return y;
}

const promise = Promise.resolve(5);
const gen = asyncGenerator(promise);
expect(gen.next()).resolves.toMatchObject({ value: 3, done: false });
expect(gen.next()).resolves.toMatchObject({ value: 5, done: false });
expect(gen.next(10)).resolves.toMatchObject({ value: 10, done: true });
