// https://github.com/babel/babel/issues/15397

var i;
var _loop = function (_i2) {
  _i2++;
  () => _i2;
  _i = _i2;
};
for (var _i = 0; _i < 1;) {
  _loop(_i);
}
