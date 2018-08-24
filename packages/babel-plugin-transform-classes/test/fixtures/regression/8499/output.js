// Pretend that `Reflect.construct` isn't supported.
this.Reflect = undefined;

this.HTMLElement = function () {
  // Here, `this.HTMLElement` is this function, not the original HTMLElement
  // constructor. `this.constructor` should be this function too, but isn't.
  constructor = this.constructor;
};

var constructor;

var CustomElement =
/*#__PURE__*/
function (_HTMLElement) {
  "use strict";

  babelHelpers.inherits(CustomElement, _HTMLElement);

  function CustomElement() {
    babelHelpers.classCallCheck(this, CustomElement);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(CustomElement).apply(this, arguments));
  }

  return CustomElement;
}(babelHelpers.wrapNativeSuper(HTMLElement));

;
new CustomElement();
expect(constructor).toBe(CustomElement);
