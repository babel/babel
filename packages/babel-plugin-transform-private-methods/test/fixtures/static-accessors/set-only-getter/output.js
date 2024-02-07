var _Cl;
class Cl {
  constructor() {
    1, babelHelpers.readOnlyError("#privateFieldValue");
    [(Cl, babelHelpers.readOnlyError("#privateFieldValue"))._] = [1];
  }
}
_Cl = Cl;
function _get_privateFieldValue() {
  return babelHelpers.assertClassBrand(this, _Cl, _privateField)._;
}
var _privateField = {
  _: 0
};
var cl = new Cl();
