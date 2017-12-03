"use strict";
/*
function test1(a = 1, b) {
	console.log(a, b);
}
test1(1, 2);//line 3: function parameter 'b' defined without default value after parameters with default value
*/
function test2(a) {
	function inner(a = a) {
		console.log(a);
	}
	inner();
}
test2(1);
/*
function test3(...rest = 1) {
	console.log(rest);
}
test3();//line 16: rest parameter 'rest' may not have a default
/*
function test3(a,  = 2) {
	console.log(a);
}
test3(1);//line 21: Unexpected token =
*/
