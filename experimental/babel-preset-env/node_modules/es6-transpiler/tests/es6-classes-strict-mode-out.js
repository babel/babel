var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;
function inStrictMode() {
	"use strict";

	var A = (function(){function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};//class body should be in strict mode, but in this case in already in strict mode

		proto$0.test = function(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();

	var B = (function(super$0){function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};//class body should be in strict mode, but in this case in already in strict mode

		proto$0.test = function(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		};
	MIXIN$0(B.prototype,proto$0);proto$0=void 0;return B;})(A);

	function simpleFunc(a) {// this function is in strict mode
		arguments[0] = a + 1;
		return [a, arguments[0]];
	}

	var a = new A
		, resA = a.test(9)
	;
	var b = new B
		, resB = b.test(8)
	;
	var funcRes = simpleFunc(7);

	console.log(resA[0] != resA[1], resB[0] != resB[1], funcRes[0] != funcRes[1]);
}
inStrictMode();

function notInStrictMode() {

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};//class body should be in strict mode

		proto$0.test = function(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();

	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};//class body should be in strict mode

		proto$0.test = function(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		};
	MIXIN$0(B.prototype,proto$0);proto$0=void 0;return B;})(A);

	function simpleFunc(a) {// this function not! in strict mode
		arguments[0] = a + 1;
		return [a, arguments[0]];
	}

	var a = new A
		, resA = a.test(9)
	;
	var b = new B
		, resB = b.test(8)
	;
	var funcRes = simpleFunc(7);

	console.log(resA[0] != resA[1], resB[0] != resB[1], funcRes[0] === funcRes[1]);
}
notInStrictMode();
