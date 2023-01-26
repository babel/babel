class Foo {
  async bar() {
    super.a();
    super.a;
    super['a'];
    super[a];
    this.a;
    new.target;
    arguments[0];
  }
}
