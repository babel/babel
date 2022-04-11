async function* asyncGenerator(x) {
  const y = do {
    let z;
    yield await x;
  };

  return y;
}