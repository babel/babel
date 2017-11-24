function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _classNameTDZError(name) { throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys."); }

let A = function A() {
  _classCallCheck(this, A);
};

var _x$x = {
  x: (_classNameTDZError("A"), A) || 0
}.x;
Object.defineProperty(A, _x$x, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0
});
