class Derived extends Base {
  method() {
    return super.tag`a`;
  }
  static method() {
    return super[key]`b`;
  }
}
