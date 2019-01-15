function _objectSpreadStep(target, object) { var source = object != null ? object : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); }

function _objectSpread(target) { _objectSpreadStep(target, arguments[1]); for (var i = 2; i < arguments.length; i++) { var argument = arguments[i]; if (argument.isSpread) { _objectSpreadStep(target, argument.object); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(argument.object)); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_objectSpread({
  x
}, y, {
  isSpread: false,
  object: {
    a
  }
}, {
  isSpread: true,
  object: b
}, {
  isSpread: false,
  object: {
    c
  }
});

_objectSpread({}, Object.prototype);

_objectSpread({}, {
  foo: 'bar'
});

_objectSpread({}, {
  get foo() {
    return 'foo';
  }

});
