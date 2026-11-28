class A {
  static f = async () => this.name;
  static {
    this.g = async () => this.name;
  }
}
