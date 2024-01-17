var _Cl;
class Cl {
  constructor() {
    babelHelpers.classStaticPrivateFieldSpecSet(Cl, Cl, _privateFieldValue, 1);
    [babelHelpers.classStaticPrivateFieldDestructureSet(Cl, Cl, _privateFieldValue).value] = [1];
  }
}
_Cl = Cl;
function _get_privateFieldValue() {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _Cl, _privateField);
}
var _privateFieldValue = {
  get: _get_privateFieldValue,
  set: void 0
};
var _privateField = {
  writable: true,
  value: 0
};
var cl = new Cl();
