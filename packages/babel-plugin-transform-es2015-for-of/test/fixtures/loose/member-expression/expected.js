for (var _iterator = arr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  if (_isArray) {
    if (_i >= _iterator.length) break;
    obj.prop = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    obj.prop = _i.value;
  }
}
