function _setObjectProto(t, e) { return null !== e && Object(e) !== e || babelHelpers.setPrototypeOf(t, e), t; }
var obj = _setObjectProto(babelHelpers.objectSpread2({}, spread), proto);
var mixed = babelHelpers.objectSpread2(_setObjectProto(babelHelpers.objectSpread2(babelHelpers.objectSpread2({}, spread), {}, {
  a: 1
}), proto), {}, {
  b: 2
});
var nullProto = _setObjectProto(babelHelpers.objectSpread2({}, spread), null);
var protoFirst = babelHelpers.objectSpread2({
  __proto__: proto
}, spread);
