"use strict";

for (var _iterator = arr, _isArray = _iterator && _iterator.constructor === Array, _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  if (_isArray) {
    if (_i >= _iterator.length) break;
    obj.prop = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    obj.prop = _i.value;
  }
}
