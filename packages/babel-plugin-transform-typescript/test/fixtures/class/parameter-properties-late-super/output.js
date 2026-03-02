class B extends A {
  constructor(p) {
    console.log('anything before super');
    if (p) {
      super();
      this.p = p;
    } else {
      super();
      this.p = p;
    }
  }
}
