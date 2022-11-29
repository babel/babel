var _computedKey, _computedKey2, _computedKey3, _Object$definePropert2;
let foo = 0;
var obj = ((_computedKey = foo++, _computedKey2 = foo++, _computedKey3 = foo++), Object.defineProperties(babelHelpers.defineProperty({}, _computedKey, 1), (_Object$definePropert2 = {}, babelHelpers.defineProperty(_Object$definePropert2, _computedKey2, {
  get: function () {
    return 5 + 5;
  },
  configurable: true,
  enumerable: true
}), babelHelpers.defineProperty(_Object$definePropert2, _computedKey3, {
  set: function (value) {
    this._foo = value;
  },
  configurable: true,
  enumerable: true
}), _Object$definePropert2)));
