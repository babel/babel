function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classNameTDZError(name) { throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys."); }

let C = function C() {
  _classCallCheck(this, C);
};

var _ref = (_classNameTDZError("C"), C) + 3;

Object.defineProperty(C, _ref, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 3
});
