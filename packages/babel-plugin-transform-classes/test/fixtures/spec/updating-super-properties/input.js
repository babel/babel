class Test extends Foo {
  constructor() {
    super();
    super.test++;
    super.hey.whatever--;
  }

  get x() {
    return super['value']++;
  }
}
