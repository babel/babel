class Foo extends class {} {
  async method() {
    super.method();

    var arrow = () => super.method();
  }
}
