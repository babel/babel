function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var oldReflect = this.Reflect;
var oldHTMLElement = this.HTMLElement;

try {
  // Pretend that `Reflect.construct` isn't supported.
  this.Reflect = undefined;

  this.HTMLElement = function () {
    // Here, `this.HTMLElement` is this function, not the original HTMLElement
    // constructor. `this.constructor` should be this function too, but isn't.
    constructor = this.constructor;
  };

  var constructor;

  var CustomElement = /*#__PURE__*/function (_HTMLElement) {
    "use strict";

    babelHelpers.inherits(CustomElement, _HTMLElement);

    var _super = _createSuper(CustomElement);

    function CustomElement() {
      babelHelpers.classCallCheck(this, CustomElement);
      return _super.apply(this, arguments);
    }

    return CustomElement;
  }( /*#__PURE__*/babelHelpers.wrapNativeSuper(HTMLElement));

  ;
  new CustomElement();
  expect(constructor).toBe(CustomElement);
} finally {
  // Restore original env
  this.Reflect = oldReflect;
  this.HTMLElement = oldHTMLElement;
}
