function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let C = function C() {
  _classCallCheck(this, C);
};

var _ref = (function () {
  throw new Error("Class cannot be referenced in computed property keys.");
}(), C) + 3;

Object.defineProperty(C, _ref, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 3
});
