let Foo;
let Bar;
Foo = class Foo extends (Bar = class Bar {
  static _init2() {
    this.bar = 21;
    delete this._init2;
    return this;
  }

}._init2()) {
  static _init() {
    this.foo = 2 * this.bar;
    delete this._init;
    return this;
  }

}._init();
expect(Foo.foo).toBe(42);
