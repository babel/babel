function f(read = () => [this, arguments]) {
  return [read, () => [this, arguments]];
}
