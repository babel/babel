class A extends B {
  constructor() {
    class C {
      [super()]() {}
      [super()] = 0;
      async [super()]() {}
      static [super()];
    }
  }
}
