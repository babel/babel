class Foo extends Bar {
  constructor() {
    super(() => {
      this.test;
    });
  }
}
