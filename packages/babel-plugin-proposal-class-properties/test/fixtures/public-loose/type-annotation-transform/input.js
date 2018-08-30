function test(x) {

  class B {
    name: string = x
    fn() {
      return x
    }
    dispatchTransaction() {
      return x
    }
  }

  class Foo extends B {

    // static fields -------------
    static FOO: string
    static BAR: string = 'BAR'

    // instance fields -------------

    name: string
    noInitial: boolean

    log: { error: boolean } = {
      error: x
    };

    fn: Function
    dispatchTransaction: Function = this.dispatchTransaction.bind(this);

    get silent(): boolean {
      return x;
    }

    // to be assigned later
    f1: Function

    constructor() {
      super();
      this.f1 = this.f1.bind(this);

      this.end = 1
    }

    f1 = () => x
  }
}
