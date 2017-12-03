// https://github.com/olov/defs/issues/12
// this test for different 'function f' detection
(function () {
	'use strict';

	var helpers = {
		f1: function f(scope) {
			if( scope ) {
				var f$0 = 1;

				{
					return f$0 + scope.test;
				}
			}
			else {
				console.log(f({test: 2}) === 3);

				{
					var f$1 = 2;
					return f$1;
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
