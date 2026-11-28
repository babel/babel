function f(first, read = () => arguments.length) {
  return read();
}
