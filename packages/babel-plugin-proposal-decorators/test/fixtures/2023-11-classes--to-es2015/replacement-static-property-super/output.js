var _Class, _Derived3;
let _initClass, _Derived2;
function customElement(tag) {
  return (cls, ctx) => {
    ctx.addInitializer(() => {});
  };
}
class Base {}
babelHelpers.defineProperty(Base, "styles", ["base"]);
let _Derived;
new (_Derived2 = (_Derived3 = class Derived extends Base {}, [_Derived, _initClass] = babelHelpers.applyDecs2311(_Derived3, [customElement("derived")], [], 0, void 0, Base).c, _Derived3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Derived), babelHelpers.defineProperty(this, "styles", [...babelHelpers.superPropGet(_Derived, "styles", this), "derived"]), _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Derived2, void 0), _Class)();
