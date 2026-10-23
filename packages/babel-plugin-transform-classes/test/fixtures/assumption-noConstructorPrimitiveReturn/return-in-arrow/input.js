class A extends B {
  constructor() {
    super();
    const fn = () => {
      return 1;
    };
    return fn();
  }
}
