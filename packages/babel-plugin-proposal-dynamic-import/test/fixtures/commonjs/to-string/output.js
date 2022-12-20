(source => new Promise(r => r("" + source)).then(s => babelHelpers.interopRequireWildcard(require(s))))(2);
