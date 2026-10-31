function fn(arg) {
  [x, y] = arg;
  const f = () => ({ z } = arg);
  return g(([w] = arg));
}
