"use strict";
var arr, res, loop, call = function(callback){ return callback()};

/*es6-transpiler generators:false*/
// yield support
arr = [];
function *gen() {
	for (var x = 0; x < 9; x++) {
		let y = x, z = arguments[x];
		arr.push(function() { return y; });

		yield z + 1;
	}
}
res = [ ...gen(9, 8, 7, 6, 5, 4, 3, 2, 1) ];
console.log(arr.map(call).join("|") == [0, 1, 2, 3, 4, 5, 6, 7, 8].join("|"), res.join("|") == [10, 9, 8, 7, 6, 5, 4, 3, 2].join("|"));

arr = [];
function *gen_primitive() {
	for (var x = 0; x < 9; x++) {
		let y = x, z = arguments[x];
		arr.push(function() { return y; });

		yield 1;
	}
}
res = [ ...gen_primitive(9, 8, 7, 6, 5, 4, 3, 2, 1) ];
console.log(arr.map(call).join("|") == [0, 1, 2, 3, 4, 5, 6, 7, 8].join("|"), res.join("|") == [1, 1, 1, 1, 1, 1, 1, 1, 1].join("|"));
