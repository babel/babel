"use strict";
/*es6-transpiler has-iterators:false, has-generators: false*/
function test_forOf(someArrayLike) {
	let result = [];
	for( let item of someArrayLike ) {
		result.push(item);
	}
	return result;
}
{
	let arr = [1, 2, 3, 4, 5, 6];
	console.log(test_forOf(arr).join("|") === arr.join("|"));
}

function test_ArrayComprehensions(someArrayLike) {
	return [ x for(x of someArrayLike) ]
}
{
	let arr = [6, 5, 4, 3, 2, 1];
	console.log(test_ArrayComprehensions(arr).join("|") === arr.join("|"));
}