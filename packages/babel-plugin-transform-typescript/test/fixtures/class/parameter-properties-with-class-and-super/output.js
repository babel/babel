let Employee = /*#__PURE__*/function (_Person) {
  "use strict";

  babelHelpers.inherits(Employee, _Person);
  var _super = babelHelpers.createSuper(Employee);
  function Employee(name) {
    var _this;
    babelHelpers.classCallCheck(this, Employee);
    _this = _super.call(this);
    _this.name = name;
    return _this;
  }
  return babelHelpers.createClass(Employee);
}(Person);
