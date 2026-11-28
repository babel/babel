function f(read = () => new.target) {
  return read();
}
