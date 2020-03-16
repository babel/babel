function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

let Array = function Array() {
  "use strict";

  babelHelpers.classCallCheck(this, Array);
};

let List = /*#__PURE__*/function (_Array) {
  "use strict";

  babelHelpers.inherits(List, _Array);

  var _super = _createSuper(List);

  function List() {
    babelHelpers.classCallCheck(this, List);
    return _super.apply(this, arguments);
  }

  return List;
}(Array);
