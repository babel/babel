let Employee = /*#__PURE__*/function (_Person) {
  "use strict";

  function Employee(name) {
    var _this;
    babelHelpers.classCallCheck(this, Employee);
    _this = babelHelpers.callSuper(this, Employee);
    _this.name = name;
    return _this;
  }
  babelHelpers.inherits(Employee, _Person);
  return babelHelpers.createClass(Employee);
}(Person);
