let _initClass;
function customElement(tag) {
  return (cls, ctx) => {
    ctx.addInitializer(() => {});
  };
}
class Base {
  static styles = ["base"];
}
let _Derived;
new class extends babelHelpers.identity {
  static [class Derived extends Base {
    static {
      [_Derived, _initClass] = babelHelpers.applyDecs2311(this, [customElement("derived")], [], 0, void 0, Base).c;
    }
  }];
  styles = [...babelHelpers.superPropGet(_Derived, "styles", this), "derived"];
  constructor() {
    super(_Derived), _initClass();
  }
}();
