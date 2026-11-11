var a = Promise.resolve().then(() => require("a"));
var b = Promise.resolve().then(() => babelHelpers.interopRequireWildcard(require("b")));
var c = (specifier => new Promise(r => r(specifier)).then(s => babelHelpers.interopRequireWildcard(require(s))))(`a`);
var d = (specifier => new Promise(r => r(`${specifier}`)).then(s => babelHelpers.interopRequireWildcard(require(s))))(dynamic);
