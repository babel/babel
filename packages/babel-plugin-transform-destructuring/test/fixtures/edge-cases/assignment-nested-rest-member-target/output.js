var _source = source;
var _source$a = _source.a;
var _source$a2 = babelHelpers.toArray(_source$a);
obj[key()] = babelHelpers.arrayLikeToArray(_source$a2).slice(0);
var _source2 = source;
var _source2$a = _source2.a;
obj[key()] = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_source2$a), _source2$a)), []);
_source2;
