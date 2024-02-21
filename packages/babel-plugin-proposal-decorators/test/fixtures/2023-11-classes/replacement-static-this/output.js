var _initClass;
const dec = () => {};
let _Foo;
new class extends babelHelpers.identity {
  static {
    class Foo {
      static {
        [_Foo, _initClass] = babelHelpers.applyDecs2311(this, [dec], []).c;
      }
    }
  }
  field = ((() => {
    this;
  })(), this);
  constructor() {
    super(_Foo), (() => {
      this;
    })(), _initClass();
  }
}();
