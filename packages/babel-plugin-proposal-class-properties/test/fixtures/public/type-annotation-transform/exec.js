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

      expect(this.name).toBe(x);
      expect(this).not.toHaveProperty('noInitial');
      expect(this.fn()).toBe(x)
      expect(this.f1()).toBe(x)

      this.end = 1
    }

    f1 = () => x

    test() {
      expect(this.name).toBe(x);
      expect(this).not.toHaveProperty('noInitial');
      expect(this.fn()).toBe(x);
      expect(this.f1()).toBe(x)

      expect(this).toHaveProperty('log.error', x);
      expect(this.dispatchTransaction()).toBe(x);
      expect(this.silent).toBe(x);
    }

    static test() {
      expect(Foo.BAR).toBe('BAR')
      expect(Foo).not.toHaveProperty('FOO')
    }
  }

  // run tests
  Foo.test();
  (new Foo(x)).test();

}

test('foo');
