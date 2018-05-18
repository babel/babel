function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

let B = function B() {
  "use strict";
};

let A =
/*#__PURE__*/
function (_B) {
  "use strict";

  _inheritsLoose(A, _B);

  function A(track) {
    var _this;

    if (track !== undefined) _this = _B.call(this, track) || this;else _this = _B.call(this) || this;
    return _assertThisInitialized(_this);
  }

  return A;
}(B);
