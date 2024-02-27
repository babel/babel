var _Cl;
class Cl {
  constructor() {
    1, babelHelpers.readOnlyError("#privateFieldValue");
    [(Cl, babelHelpers.readOnlyError("#privateFieldValue"))._] = [1];
  }
}
_Cl = Cl;
function _get_privateFieldValue(_this) {
  return babelHelpers.assertClassBrand(_Cl, _this, _privateField)._;
}
var _privateField = {
  _: 0
};
var cl = new Cl();
