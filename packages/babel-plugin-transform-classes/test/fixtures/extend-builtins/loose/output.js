function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() {} Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, _setPrototypeOf(function Super() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); }, Class)); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (typeof Reflect === "object" && Reflect.construct) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var Constructor, a = [null]; a.push.apply(a, args); Constructor = Parent.bind.apply(Parent, a); return _setPrototypeOf(new Constructor(), Class.prototype); }; } return _construct(Parent, args, Class); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var List =
/*#__PURE__*/
function (_Array) {
  _inheritsLoose(List, _Array);

  function List() {
    return _Array.apply(this, arguments) || this;
  }

  return List;
}(_wrapNativeSuper(Array));
