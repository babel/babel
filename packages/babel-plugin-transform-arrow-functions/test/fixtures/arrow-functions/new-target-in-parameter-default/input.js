function Target(read = () => new.target) {
  this.target = read();
}
