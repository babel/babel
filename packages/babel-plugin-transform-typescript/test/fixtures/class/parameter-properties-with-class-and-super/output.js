let Employee = /*#__PURE__*/function (_Person) {
  "use strict";

  babelHelpers.inherits(Employee, _Person);
  function Employee(name) {
    var _this;
    babelHelpers.classCallCheck(this, Employee);
    _this = babelHelpers.callSuper(this, Employee);
    _this.name = name;
    return _this;
  }
  return babelHelpers.createClass(Employee);
}(Person);
