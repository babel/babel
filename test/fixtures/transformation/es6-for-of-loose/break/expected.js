"use strict";

// labels

foo: for (var _iterator = foo(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  var _ref;

  if (_isArray) {
    if (_i >= _iterator.length) break;
    _ref = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    _ref = _i.value;
  }

  var x = _ref;

  while (true) {
    if (!_isArray) _iterator["return"]();

    break foo;
  }
}

foo: for (var _iterator2 = foo(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  var _ref2;

  if (_isArray2) {
    if (_i2 >= _iterator2.length) break;
    _ref2 = _iterator2[_i2++];
  } else {
    _i2 = _iterator2.next();
    if (_i2.done) break;
    _ref2 = _i2.value;
  }

  var x = _ref2;

  while (true) {
    break;
  }
}

foo: for (var _iterator3 = foo(), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
  var _ref3;

  if (_isArray3) {
    if (_i3 >= _iterator3.length) break;
    _ref3 = _iterator3[_i3++];
  } else {
    _i3 = _iterator3.next();
    if (_i3.done) break;
    _ref3 = _i3.value;
  }

  var x = _ref3;
  if (!_isArray3) _iterator3["return"]();

  break foo;
}

// basic

for (var _iterator4 = foo(), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
  var _ref4;

  if (_isArray4) {
    if (_i4 >= _iterator4.length) break;
    _ref4 = _iterator4[_i4++];
  } else {
    _i4 = _iterator4.next();
    if (_i4.done) break;
    _ref4 = _i4.value;
  }

  var x = _ref4;
  if (!_isArray4) _iterator4["return"]();

  break;
}

for (var _iterator5 = foo(), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
  var _ref5;

  if (_isArray5) {
    if (_i5 >= _iterator5.length) break;
    _ref5 = _iterator5[_i5++];
  } else {
    _i5 = _iterator5.next();
    if (_i5.done) break;
    _ref5 = _i5.value;
  }

  var x = _ref5;

  while (true) {
    break;
  }
}
