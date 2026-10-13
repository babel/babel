function sameReceiver(read = () => this) {
  return read() === this;
}
sameReceiver.call({});
