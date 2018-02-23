class Test {
  constructor() {
    class Other extends Test {
      a = () => super.test;
      static a = () => super.test;
    }
  }
}
