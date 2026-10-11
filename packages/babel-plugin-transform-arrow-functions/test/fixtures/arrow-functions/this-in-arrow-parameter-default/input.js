function sameReceiver() {
  return ((read = () => this) => read() === this)();
}
