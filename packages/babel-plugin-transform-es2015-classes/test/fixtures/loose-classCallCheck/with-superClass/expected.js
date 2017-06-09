function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

let B = function B() {};

let A = function (_B) {
  _inherits(A, _B);

  function A(track) {
    if (track !== undefined) {
      var _this = _B.call(this, track) || this;
    } else {
      var _this = _B.call(this) || this;
    }
    return _this;
  }

  return A;
}(B);