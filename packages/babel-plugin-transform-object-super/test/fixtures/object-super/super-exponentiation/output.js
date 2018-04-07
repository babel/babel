var _obj;

function _set(object, property, value, receiver) { var base = _superPropBase(object, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return value; } else if (desc.get || !desc.writable) { return base[property] = value; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (desc.set) { if (_isStrict()) { throw new Error("cannot redefine property"); } return value; } else { return receiver[property] = value; } } _defineProperty(receiver, property, value); return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _isStrict() { var strict = false; try { var obj = { get test() {} }; obj.test = 1; } catch (e) { strict = true; } _isStrict = function () { return strict; }; return strict; }

function _get(object, property, receiver) { var base = _superPropBase(object, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } else if ("value" in desc) { return desc.value; } }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

foo = _obj = {
  bar: function () {
    var _ref;

    return _ref = _get(_getPrototypeOf(_obj), "baz", this), _set(_getPrototypeOf(_obj), "baz", _ref ** 12, this);
  }
};
