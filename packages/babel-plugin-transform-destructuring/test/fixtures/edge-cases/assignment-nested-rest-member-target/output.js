var _source, _source$a, _source$a2, _source2, _source2$a;
_source = source, _source$a = _source.a, _source$a2 = babelHelpers.toArray(_source$a), obj[key()] = babelHelpers.arrayLikeToArray(_source$a2).slice(0);
_source2 = source, _source2$a = _source2.a, obj[key()] = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_source2$a), _source2$a)), []), _source2;
