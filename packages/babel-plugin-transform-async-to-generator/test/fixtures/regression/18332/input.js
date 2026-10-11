function sameReceiver(read = async () => this) {
  return read();
}
