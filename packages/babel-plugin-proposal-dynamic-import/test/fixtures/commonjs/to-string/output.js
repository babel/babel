(specifier => new Promise(r => r(`${specifier}`)).then(s => babelHelpers.interopRequireWildcard(require(s))))(2);
