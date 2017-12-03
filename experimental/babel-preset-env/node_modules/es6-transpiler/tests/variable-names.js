// https://github.com/olov/defs/issues/12
// this test for different 'function f' detection
(function () {
	'use strict';

	const helpers = {
		f1: function f(scope) {
			if( scope ) {
				let f = 1;

				{
					return f + scope.test;
				}
			}
			else {
				console.log(f({test: 2}) === 3);

				{
					let f = 2;
					return f;
				}
			}
		},
		f2: function f(scope) {
			return scope.f;
		}
	};

	console.log(helpers.f1())
	console.log(helpers.f2({f: 123}) === 123)
})();
