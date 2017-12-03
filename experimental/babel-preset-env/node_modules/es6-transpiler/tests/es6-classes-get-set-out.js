var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var DPS$0 = Object.defineProperties;var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;
var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"get": $a_get$0, "set": $a_set$0, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	function $a_get$0() {
		return this._a;
	}

	function $a_set$0(val) {
		this._a = val + 3;
	}
;return A;})();;

var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}, b: {"get": $b_get$0, "set": $b_set$0, "configurable":true,"enumerable":true}, 'c': {"get": $c_get$0, "set": $c_set$0, "configurable":true,"enumerable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
	function $b_get$0() {
		return this._b;
	}

	proto$0.m = function(){ return "m" };

	function $b_set$0(val) {
		this._b = val + 2;
	}

	function $c_get$0(){ return this._c }
	function $c_set$0(val){ this._c = val + 1 }

	function $static_d_get$0(){ return this._d };DPS$0(B,{d: {"get": $static_d_get$0, "set": $static_d_set$0, "configurable":true,"enumerable":true}});
	function $static_d_set$0(val){ this._d = val + 999 }
MIXIN$0(B.prototype,proto$0);proto$0=void 0;return B;})(A);;

var C = (function(super$0){"use strict";function C() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(C, super$0);if(super$0!==null)SP$0(C,super$0);C.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":C,"configurable":true,"writable":true}, 'e': {"get": $e_get$0, "set": $e_set$0, "configurable":true,"enumerable":true}, f: {"get": $f_get$0, "configurable":true,"enumerable":true}, g: {"set": $g_set$0, "configurable":true,"enumerable":true}});DP$0(C,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
	function $e_set$0(val){ this._e = val * 3 }
	function $e_get$0(){ return this._e }

	function $f_get$0(){ return 'f' }

	function $g_set$0(){var val = arguments[0];if(val === void 0)val = 'g'; return this._g = val }

	static$0.m = function(){ return "m" };
MIXIN$0(C,static$0);static$0=void 0;return C;})(B);;

// TODO::
//let prop = 'h' + Math.random();
//class E extens C {
//	get [prop](){ return this["_" + prop] }
//	set [prop](val){ this["_" + prop] = val * 2 }
//}

var test = new C;
test.a = 996;
test.b = 97;
test['c'] = 8;
test['e'] = 1;
test.g = void 0;
//test[prop] = 2;
C.d = 0;
console.log(test.a == 999, test.b == 99, test.m() == "m", test['c'] == 9, test['e'] == 3, test.g == void 0, test._g == 'g', test.f == 'f'/*, test[prop] == 4*/, C.d === 999, C.m() == "m");
