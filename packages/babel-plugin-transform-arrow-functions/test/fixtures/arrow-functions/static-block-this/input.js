class A {
  static {
    const getName = () => this.name;
    const nested = () => () => this.name;
  }
}
