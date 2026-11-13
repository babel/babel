function _setObjectProto(t, e) { return null !== e && Object(e) !== e || babelHelpers.setPrototypeOf(t, e), t; }
var obj = _setObjectProto(babelHelpers.defineProperty({}, key, 1), proto);
var stringKey = _setObjectProto(babelHelpers.defineProperty({}, key, 1), proto);
var nullProto = babelHelpers.defineProperty(_setObjectProto(babelHelpers.defineProperty({}, key, 1), null), "other", 2);
var primitiveProto = _setObjectProto(babelHelpers.defineProperty({}, key, 1), 5);
