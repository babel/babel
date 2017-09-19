var _obj;

function _set(object, property, value, receiver) { const desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { const parent = Object.getPrototypeOf(object); if (parent !== null) { _set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { const setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; }

function _get(object, property, receiver) { if (object === null) object = Function.prototype; const desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { const parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return _get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { const getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

foo = _obj = {
  bar() {
    var _ref;

    return _ref = _get(_obj.__proto__ || Object.getPrototypeOf(_obj), "baz", this), _set(_obj.__proto__ || Object.getPrototypeOf(_obj), "baz", Math.pow(_ref, 12), this);
  }

};
