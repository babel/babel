function sameReceiver({ read = () => this } = {}) {
  return read() === this;
}
