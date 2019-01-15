function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var argument = arguments[i]; if (argument.isSpread) { var source = argument.object != null ? argument.object : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(argument.object)); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_objectSpread({
  x
}, {
  isSpread: true,
  object: y
}, {
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

_objectSpread({}, {
  isSpread: true,
  object: Object.prototype
});

_objectSpread({}, {
  isSpread: true,
  object: {
    foo: 'bar'
  }
});

_objectSpread({}, {
  isSpread: true,
  object: {
    get foo() {
      return 'foo';
    }

  }
});
