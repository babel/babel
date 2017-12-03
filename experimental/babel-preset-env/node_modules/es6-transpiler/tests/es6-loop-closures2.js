"use strict"
var arr, res, loop, call = function(callback){ return callback()};

// can be transformed (common WAT)

// mixin test
arr = [];
res = (function() {
	label: for (var x = 0; x < 3; x++) {
		let y = x;
		arr.push(function() { return y; });
		return this.aa;
		if(x>99)return 99;
		if(x>98)return 98;
		if(x>97)return;
		if(x>96)break;
		if(x>96)break;
		if(x>95)continue;
		if(x>94)break label;
		if(x>93)return;
		if(x>95)continue;
		if(x>98)return {a: 1};
	}
}).call({aa: 999});
console.log(arr.map(call).join("|") == "0", res == 999 ? true : 'Error: should return right value');

// return only primitive value
arr = [];
function returnPrimitive() {
	for ( let val of [1, 2, 3, 4, 5] ) {
		let innerVal = val;

		arr.push(function() { return innerVal; });

		if ( val === 5 ) {
			return 55;
		}
	}
}
console.log(returnPrimitive() === 55, arr.map(call).join("|") === [1, 2, 3, 4, 5].join("|"));

// arguments is not allowed inside the loop body because the IIFE would break it
arr = [];
res = (function() {
	for (var x = 0; x < 3; x++) {
		let y = x;
		let z = arguments[0];
		arr.push(function() { return x + y + z; });

		if(x==2)return z++,z

		+1;
	}
})(9);
console.log(arr.map(call).join("|") == [11, 12, 14].join("|"), res == 11 ? true : 'Error: should return right value');

// break is not allowed inside the loop body because the IIFE would break it
arr = [];
for (var x = 0; x < 3; x++) {
	let y = x;
	arr.push(function() { return y; });
	break;
}
console.log(arr.map(call).join("|") == [0].join("|"));

// continue is not allowed inside the loop body because the IIFE would break it
arr = [];
for (var x1 = 0; x1 < 3; x1++) {
	let y = x1;
	if(!y)continue;
	arr.push(function() { return y; });
}
console.log(arr.map(call).join("|") == [1, 2].join("|"));

// var's inside scoped block should work as a regular var's regardless of whether or not block wrapper by IIFE
{
	arr = [];
	let a = [1, 2, 3, 4, 5];
	for( let x of a ) {
		var {j, k, c, d: {d, e}} = {j: 1, k: 2, c: 3, d: {d: 4, e: 5}}, GG = x;

		if(x==1)continue;
		if(x==2&&false)break;

		arr.push(function(){ return x })
	}

	console.log(arr.map(call).join("|") == [2, 3, 4, 5].join("|"), GG == 5, j == 1, k == 2, c == 3, d == 4, e == 5);
}

// simple var support
arr = [];
function var_test() {
	for (var x = 0; x < 3; x++) {
		let y = x;
		arr.push(function() { return y; });

		{
			var variable;
			if ( variable === void 0 ) {
				variable = 0;
			}
			variable++;
		}
	}
	return variable;
}
res = var_test();
console.log(arr.map(call).join("|") == [0, 1, 2].join("|"), res === 3);

// this test
arr = (function() {'use strict';let arr = [];let temp;

// Block-less For-In
for (let x in (temp = [0,1,2])) if(temp.hasOwnProperty(x)) (this.aa+=1),arr.push(() => { return x + (this.a || 0); });/*with semicolon*/
for (let x in (temp = [0,1,2])) if(temp.hasOwnProperty(x)) (this.aa+=arguments[0]),arr.push(function() { return x; })/*no semicolon*/

null; // previous semicolon-less for statement's range ends just before 'n' in 'null'

return arr.map(call).concat(this.aa);

}).call({aa: 999}, 888);
console.log(arr.join("|") == ["00", "10", "20", "0", "1", "2", 999+1+1+1+888+888+888].join("|"));


// return is not allowed inside the loop body because the IIFE would break it
arr = [];
res = (function(){
	let a = [1, 2, 3, 4, 5];
	for( let x of a ) {
		arr.push(function(){ return x });
		if(x==1)continue;
		if(x==2&&false)break;
		if(x==3)return arguments[2];
	}
})(9, 8, 7);
console.log(arr.map(call).join("|") == [1, 2, 3].join("|"), res == 7);

// continue is not allowed inside the loop body because the IIFE would break it
arr = [];
for( var x22 of [1, 2, 3, 4, 5] ) {
	let y = x22, z = 55;
	arr.push(function(){ return y });
	continue;
}
console.log(arr.map(call).join("|") == [1, 2, 3, 4, 5].join("|"));

// continue + forOf + destructuring
arr = [];var random__ = Math.random();
for( var x11 of [{a: {x: 1, y: 2, z: 3}}] ) {
	let {a: {x, y, z}} = x11, h = 55;

	{

	}
	let uu = ++random__;
	arr.push(function(){ return y + x + z + uu })
	continue;
}
console.log(arr.map(call).join("|") == [1+2+3+random__].join("|"));

{// break + forOf + destructuring
	arr = [];
	for( let {x, y, z} of [{x:1,y:0}, {x:1,y:1}, {x:1,y:2}] ) {
		arr.push(function(){ return x + y });
		break;
	}

	for( let {x, y, z} of [{x:1,y:0}, {x:1,y:1}, {x:1,y:2}] ) {
		arr.push(function(){ return x + y + (z | 0) });
		if(y == 2)break;
	}

	console.log(arr.map(call).join("|") == [1, 1, 2, 3].join("|"));
}
