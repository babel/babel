"use strict";var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};

function test1(a) {var b = arguments[1];if(b === void 0)b = {c: 1};var c = (arguments[2] !== void 0 ? arguments[2] : b).c;
	console.log(a === 1, typeof b === "object" && b.c === 1, c === 1);
}
test1(1);

function test2(a) {var c = (arguments[1] !== void 0 ? arguments[1] : {b: {c: 321}}).b.c;
	console.log(a === 1, c === 321);
}
test2(1);

function test3() {var c = (d = (arguments[0] !== void 0 ? arguments[0] : {a: [ {b: [ {c: 999, d: 888} ]} ]}).a[0].b[0]).c, d = d.d;
	console.log(c === 999, d === 888);

	{
		var c$0 = [{test: "test1"}, {test: "test2"}];
		c$0.forEach(function inner(test, index, thisArray) {var test = test.test;
			console.log(test === "test" + (index + 1), Array.isArray(c$0) && c$0 === thisArray, d === 888);
		})
	}
}
test3();

function test4() {var SLICE$0 = Array.prototype.slice;var a = arguments[0];if(a === void 0)a = 1;var b = arguments[1];if(b === void 0)b = {c: 333};var d = (arguments[2] !== void 0 ? arguments[2] : b).c;var rest = SLICE$0.call(arguments, 3);
	console.log(a === 1, typeof b === "object" && b.c === 333, d === b.c, rest.join("|") === "9|8|7|6|5|4");
}
test4(void 0, void 0, void 0, 9, 8, 7, 6, 5, 4);

function test5() {var a = arguments[0];if(a === void 0)a = 1;var b = arguments[1];if(b === void 0)b = {c: 333};var test = (arguments[2] !== void 0 ? arguments[2] : (  function(A)     {var A = A.A;return (A = [ ].concat(ITER$0(A), ITER$0(A)) , {test: A} )})({A: [1, 2, 3]})).test;
	console.log(a === 1, typeof b === "object" && b.c === 333, test.join("|") === [1,2,3,1,2,3].join("|"));
}
test5(void 0, void 0, void 0, 9, 8, 7, 6, 5, 4);

{
	var a = [1, 2];
	var test6 = function() {var arr = arguments[0];if(arr === void 0)arr = [ ].concat(ITER$0(a, true), ITER$0((function(b){var a = b[0], b = ((b = b[1]) === void 0 ? 4 : b);var c = arguments[1];if(c === void 0)c = 3;return [a, b, c]})([a[1]+1])), ITER$0(a.reverse())); return arr }
	console.log(test6().join("|") === [1, 2, 3, 4, 3, 2, 1].join("|"))
}
