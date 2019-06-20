class B extends A {
  constructor(public p: string) {
    console.log('anything before super');
    if (p) super();
    else {
      super();
    }
  }
}