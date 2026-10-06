sideEffect(), Promise.resolve().then(() => babelHelpers.interopRequireWildcard(require("a")));
(specifier => new Promise(r => r(`${specifier}`)).then(s => babelHelpers.interopRequireWildcard(require(s))))(getSpecifier(), sideEffect());
