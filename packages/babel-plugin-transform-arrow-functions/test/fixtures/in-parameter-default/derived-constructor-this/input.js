class B {}
class C extends B {
  constructor(read = () => this) {
    super();
  }
}
