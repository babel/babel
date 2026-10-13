function f({ read = () => this } = {}) {
  return read();
}
