'use strict';

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'get');
  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError(
      'attempted to ' + action + ' private field on non-instance'
    );
  }
  return privateMap.get(receiver);
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

function _checkPrivateFieldInitSpec(obj, privateMap) {
  if (privateMap.has(obj)) {
    throw new TypeError();
  }
}

class Base {
  constructor(obj) {
    return obj;
  }

}

let counter = 0;

var _foo = /*#__PURE__*/new WeakMap();

class Derived extends Base {
  constructor(...args) {
    super(...args);

    _checkPrivateFieldInitSpec(this, _foo);
    _foo.set(this, {
      writable: true,
      value: ++counter
    });
  }

  static get(obj) {
    return babelHelpers._classPrivateFieldGet(obj, _foo);
  }
}