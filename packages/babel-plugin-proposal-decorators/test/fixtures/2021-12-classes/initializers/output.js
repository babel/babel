let _initClass, _initClass2;
const dec = () => {};
let _Foo;
new class extends babelHelpers.identity {
  static [class Foo {
    static {
      [_Foo, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
    }
  }];
  field = 123;
  constructor() {
    super(_Foo), _initClass();
  }
}();
let _Bar;
new class extends babelHelpers.identity {
  static [class Bar extends _Foo {
    static {
      [_Bar, _initClass2] = babelHelpers.applyDecs(this, [], [dec]);
    }
  }];
  field = ((() => {
    this.otherField = 456;
  })(), 123);
  constructor() {
    super(_Bar), _initClass2();
  }
}();
