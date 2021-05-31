async function p(x) {
  const y = do {
    let z;
    await x;
  };

  return y;
}

const promise = Promise.resolve(5);
expect(p(promise)).resolves.toBe(5);