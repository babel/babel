const x = 1;
(specifier => new Promise(r => r(specifier)).then(s => babelHelpers.interopRequireWildcard(require(s))))(`./${x}.js`);
