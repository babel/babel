var a = [1, 2];
var b = [].concat(babelHelpers.toConsumableArray(a), [a.push(3)]);
var c = [1, 2];
foo.apply(void 0, babelHelpers.toConsumableArray(c).concat([c.pop()]));
