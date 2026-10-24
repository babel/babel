const _source = source;
babelHelpers.objectDestructuringEmpty(_source);
const rest = babelHelpers.objectWithoutProperties(_source, ["a"]);
const c = source.c;
babelHelpers.objectDestructuringEmpty(source);
const _arr = babelHelpers.toArray(arr),
  second = _arr[1],
  others = babelHelpers.arrayLikeToArray(_arr).slice(2);
var _arr2 = arr;
x = babelHelpers.slicedToArray(_arr2, 2)[1];
_arr2;
