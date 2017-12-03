var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;var DPS$0 = Object.defineProperties;var CNAMES$0 = [];var GET_CNAMES$0 = function f(o){var r,u;for(var p in o)if((r=o[p])&&typeof r ==='object'&&(u=r["__unq"])){CNAMES$0[u]=p;delete r["__unq"];}return o;};;
// parent class and child class: without constructor
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B);
})();

// parent class and child class: with constructor
(function() {
	var A = (function(){"use strict";
		function A(a) {
			this.a = a;
		}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	;return A;})();
	var B = (function(super$0){"use strict";if(!PRS$0)MIXIN$0(B, super$0);
		function B(a) {
			super$0.call(this, a);
		}if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: parent with constructor, child without constructor
(function() {
	var A = (function(){"use strict";
		function A(a) {
			this.a = a;
		}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: with method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0.a = function(a) {
			return 'test'
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0.a = function(a) {
			return super$0.prototype.a.call(this, a);
		};
	MIXIN$0(B.prototype,proto$0);proto$0=void 0;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b.a() === 'test');
})();

// parent class and child class: parent with method, child without method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0.a = function(a) {
			return 'test'
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a() === 'test');
})();

// parent class and child class: with static method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0.a = function(a) {
			return 'test'
		};
	MIXIN$0(A,static$0);static$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0.a = function(a) {
			return super$0.a.call(this, a);
		};
	MIXIN$0(B,static$0);static$0=void 0;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A.a() === 'test', B.a() === 'test');
})();

// parent class and child class: parent with static method, child without static method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0.a = function(a) {
			return 'test'
		};
	MIXIN$0(A,static$0);static$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A.a() === 'test', B.a() === 'test');
})();

// parent class and child class: with getter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"get": $a_get$0, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$0() {
			return 'test'
		}
	;return A;})();
	var B = (function(super$0){"use strict";var $D$0;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,GET_CNAMES$0({"constructor":{"value":B,"configurable":true,"writable":true}, a: {"get": $a_get$1, "configurable":true,"enumerable":true, "__unq": 1}}));$D$0=CNAMES$0[1];delete CNAMES$0[1];;DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$1() {
			return GOPD$0(super$0.prototype,$D$0)["get"].call(this);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: parent with getter, child without getter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"get": $a_get$2, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$2() {
			return 'test'
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: with setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"set": $a_set$0, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_set$0(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";var $D$1;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,GET_CNAMES$0({"constructor":{"value":B,"configurable":true,"writable":true}, a: {"set": $a_set$1, "configurable":true,"enumerable":true, "__unq": 1}}));$D$1=CNAMES$0[1];delete CNAMES$0[1];;DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_set$1(a) {
			GOPD$0(super$0.prototype,$D$1)["set"].call(this, a);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: parent with setter, child without setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"set": $a_set$2, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_set$2(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: with static getter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$0() {
			return 'test'
		};DPS$0(A,{a: {"get": $static_a_get$0, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";var $D$2;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$1() {
			return GOPD$0(super$0,$D$2)["get"].call(this);
		};DPS$0(B,GET_CNAMES$0({a: {"get": $static_a_get$1, "configurable":true,"enumerable":true, "__unq": 1}}));$D$2=CNAMES$0[1];delete CNAMES$0[1];;
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A.a === 'test', B.a === 'test');
})();

// parent class and child class: parent with static getter, child without static getter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$2() {
			return 'test'
		};DPS$0(A,{a: {"get": $static_a_get$2, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A.a === 'test', B.a === 'test');
})();

// parent class and child class: with static setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_set$0(a) {
			this._a = a + '_' + 9;
		};DPS$0(A,{a: {"set": $static_a_set$0, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";var $D$3;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_set$1(a) {
			GOPD$0(super$0,$D$3)["set"].call(this, a);
		};DPS$0(B,GET_CNAMES$0({a: {"set": $static_a_set$1, "configurable":true,"enumerable":true, "__unq": 1}}));$D$3=CNAMES$0[1];delete CNAMES$0[1];;
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: parent with static setter, child without static setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_set$2(a) {
			this._a = a + '_' + 9;
		};DPS$0(A,{a: {"set": $static_a_set$2, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: with getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"get": $a_get$3, "set": $a_set$3, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$3() {
			return this._a;
		}

		function $a_set$3(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";var $D$4;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,GET_CNAMES$0({"constructor":{"value":B,"configurable":true,"writable":true}, a: {"get": $a_get$4, "set": $a_set$4, "configurable":true,"enumerable":true, "__unq": 1}}));$D$4=CNAMES$0[1];delete CNAMES$0[1];;DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$4() {
			return GOPD$0(super$0.prototype,$D$4)["get"].call(this);
		}

		function $a_set$4(a) {
			GOPD$0(super$0.prototype,$D$4)["set"].call(this, a);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test_9', b._a === 'test_9');
})();

// parent class and child class: parent with getter and setter, child without getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{a: {"get": $a_get$5, "set": $a_set$5, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$5() {
			return this._a;
		}

		function $a_set$5(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test_9', b._a === 'test_9');
})();

// parent class and child class: with static getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$3() {
			return this._a;
		};DPS$0(A,{a: {"get": $static_a_get$3, "set": $static_a_set$3, "configurable":true,"enumerable":true}});

		function $static_a_set$3(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";var $D$5;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$4() {
			return GOPD$0(super$0,$D$5)["get"].call(this);
		};DPS$0(B,GET_CNAMES$0({a: {"get": $static_a_get$4, "set": $static_a_set$4, "configurable":true,"enumerable":true, "__unq": 1}}));$D$5=CNAMES$0[1];delete CNAMES$0[1];;

		function $static_a_set$4(a) {
			GOPD$0(super$0,$D$5)["set"].call(this, a);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A.a === void 0, B._a === 'test_9', B.a === 'test_9');
})();

// parent class and child class: with static getter and setter, child without static getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$5() {
			return this._a;
		};DPS$0(A,{a: {"get": $static_a_get$5, "set": $static_a_set$5, "configurable":true,"enumerable":true}});

		function $static_a_set$5(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A.a === void 0, B._a === 'test_9', B.a === 'test_9');
})();

// --------------------======================== LITERAL ========================--------------------

// parent class and child class: with literal constructor
(function() {
	var A = (function(){"use strict";
		function A(a) {
			this.a = a;
		}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	;return A;})();
	var B = (function(super$0){"use strict";if(!PRS$0)MIXIN$0(B, super$0);
		function B(a) {
			super$0.call(this, a);
		}if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B);
})();

// parent class and child class: parent with literal constructor, child without literal constructor
(function() {
	var A = (function(){"use strict";
		function A(a) {
			this.a = a;
		}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B);
})();

// parent class and child class: with literal method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0['a'] = function(a) {
			return 'test'
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0['a'] = function(a) {
			return super$0.prototype['a'].call(this, a);
		};
	MIXIN$0(B.prototype,proto$0);proto$0=void 0;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a']() === 'test');
})();

// parent class and child class: parent with literal method, child without literal method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0['a'] = function(a) {
			return 'test'
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a']() === 'test');
})();

// parent class and child class: with literal static method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0['a'] = function(a) {
			return 'test'
		};
	MIXIN$0(A,static$0);static$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0['a'] = function(a) {
			return super$0['a'].call(this, a);
		};
	MIXIN$0(B,static$0);static$0=void 0;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a']() === 'test', B['a']() === 'test');
})();

// parent class and child class: parent with literal static method, child without literal static method
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0['a'] = function(a) {
			return 'test'
		};
	MIXIN$0(A,static$0);static$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a']() === 'test', B['a']() === 'test');
})();

// parent class and child class: with literal getter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{'a': {"get": $a_get$6, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$6() {
			return 'test'
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}, 'a': {"get": $a_get$7, "configurable":true,"enumerable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$7() {
			return GOPD$0(super$0.prototype,'a')["get"].call(this);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test');
})();

// parent class and child class: parent with literal getter, child without literal getter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{'a': {"get": $a_get$8, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$8() {
			return 'test'
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test');
})();


// parent class and child class: with literal setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{'a': {"set": $a_set$6, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_set$6(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}, 'a': {"set": $a_set$7, "configurable":true,"enumerable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_set$7(a) {
			GOPD$0(super$0.prototype,'a')["set"].call(this, a);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: parent with literal setter, child without literal setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{'a': {"set": $a_set$8, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_set$8(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: with literal static getter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$6() {
			return 'test'
		};DPS$0(A,{'a': {"get": $static_a_get$6, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$7() {
			return GOPD$0(super$0,'a')["get"].call(this);
		};DPS$0(B,{'a': {"get": $static_a_get$7, "configurable":true,"enumerable":true}});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a'] === 'test', B['a'] === 'test');
})();

// parent class and child class: parent with literal static getter, child without literal static getter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$8() {
			return 'test'
		};DPS$0(A,{'a': {"get": $static_a_get$8, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a'] === 'test', B['a'] === 'test');
})();

// parent class and child class: with literal static setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_set$6(a) {
			this._a = a + '_' + 9;
		};DPS$0(A,{'a': {"set": $static_a_set$6, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_set$7(a) {
			GOPD$0(super$0,'a')["set"].call(this, a);
		};DPS$0(B,{'a': {"set": $static_a_set$7, "configurable":true,"enumerable":true}});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: parent with literal static setter, child without literal static setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_set$8(a) {
			this._a = a + '_' + 9;
		};DPS$0(A,{'a': {"set": $static_a_set$8, "configurable":true,"enumerable":true}});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: with literal getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{'a': {"get": $a_get$9, "set": $a_set$9, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$9() {
			return this._a;
		}

		function $a_set$9(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}, 'a': {"get": $a_get$10, "set": $a_set$10, "configurable":true,"enumerable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$10() {
			return GOPD$0(super$0.prototype,'a')["get"].call(this);
		}

		function $a_set$10(a) {
			GOPD$0(super$0.prototype,'a')["set"].call(this, a);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: parent with literal getter and setter, child without literal getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{'a': {"get": $a_get$11, "set": $a_set$11, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $a_get$11() {
			return this._a;
		}

		function $a_set$11(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: with literal static getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$9() {
			return this._a;
		};DPS$0(A,{'a': {"get": $static_a_get$9, "set": $static_a_set$9, "configurable":true,"enumerable":true}});

		function $static_a_set$9(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$10() {
			return GOPD$0(super$0,'a')["get"].call(this);
		};DPS$0(B,{'a': {"get": $static_a_get$10, "set": $static_a_set$10, "configurable":true,"enumerable":true}});

		function $static_a_set$10(a) {
			GOPD$0(super$0,'a')["set"].call(this, a);
		}
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B['a'] === 'test_9', B._a === 'test_9', B['a'] === 'test_9');
})();

// parent class and child class: with literal static getter and setter, child without literal static getter and setter
(function() {
	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		function $static_a_get$11() {
			return this._a;
		};DPS$0(A,{'a': {"get": $static_a_get$11, "set": $static_a_set$11, "configurable":true,"enumerable":true}});

		function $static_a_set$11(a) {
			this._a = a + '_' + 9;
		}
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a'] === void 0, B._a === 'test_9', B['a'] === 'test_9');
})();

// --------------------======================== COMPUTED ========================--------------------

var postfix = {
	counter: 0
	, stringTag: 'd' + Math.random()
	, toString: function(){ return ++this.counter + this.stringTag }
	, reset: function(){ this.counter = 0 }
};

// parent class and child class: with computed method
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0['a' + postfix] = function(a) {
			return 'test'
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$6;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		$D$6=('a' + postfix)+'';proto$0[$D$6] = function(a) {
			return super$0.prototype[$D$6].call(this, a);
		};
	MIXIN$0(B.prototype,proto$0);proto$0=void 0;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix]() === 'test');
})();

// parent class and child class: parent with computed method, child without computed method
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0['a' + postfix] = function(a) {
			return 'test'
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix]() === 'test');
})();

// parent class and child class: with computed static method
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0['a' + postfix] = function(a) {
			return 'test'
		};
	MIXIN$0(A,static$0);static$0=void 0;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$7;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		$D$7=('a' + postfix)+'';static$0[$D$7] = function(a) {
			return super$0[$D$7].call(this, a);
		};
	MIXIN$0(B,static$0);static$0=void 0;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a' + postfix]() === 'test', B['a' + (postfix.reset(), postfix)]() === 'test');
})();

// parent class and child class: parent with computed static method, child without computed static method
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0['a' + postfix] = function(a) {
			return 'test'
		};
	MIXIN$0(A,static$0);static$0=void 0;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a' + postfix]() === 'test', B['a' + (postfix.reset(), postfix)]() === 'test');
})();

// parent class and child class: with computed getter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A.prototype,'a' + postfix,{"get":function() {
			return 'test'
		},"configurable":true,"enumerable":true});
	;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$8;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		$D$8=('a' + postfix)+'';DP$0(B.prototype,$D$8,{"get":function() {
			return GOPD$0(super$0.prototype,$D$8)["get"].call(this);
		},"configurable":true,"enumerable":true});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test');
})();

// parent class and child class: parent with computed getter, child without computed getter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A.prototype,'a' + postfix,{"get":function() {
			return 'test'
		},"configurable":true,"enumerable":true});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test');
})();


// parent class and child class: with computed setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A.prototype,'a' + postfix,{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$9;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		$D$9=('a' + postfix)+'';DP$0(B.prototype,$D$9,{"set":function(a) {
			GOPD$0(super$0.prototype,$D$9)["set"].call(this, a);
		},"configurable":true,"enumerable":true});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: parent with computed setter, child without computed setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A.prototype,'a' + postfix,{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: with computed static getter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A,'a' + postfix,{"get":function() {
			return 'test'
		},"configurable":true,"enumerable":true});
	;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$10;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		$D$10=('a' + postfix)+'';DP$0(B,$D$10,{"get":function() {
			return GOPD$0(super$0,$D$10)["get"].call(this);
		},"configurable":true,"enumerable":true});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a' + postfix] === 'test', B['a' + (postfix.reset(), postfix)] === 'test');
})();

// parent class and child class: parent with computed static getter, child without computed static getter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A,'a' + postfix,{"get":function() {
			return 'test'
		},"configurable":true,"enumerable":true});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a' + postfix] === 'test', B['a' + (postfix.reset(), postfix)] === 'test');
})();

// parent class and child class: with computed static setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A,'a' + postfix,{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$11;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		$D$11=('a' + postfix)+'';DP$0(B,$D$11,{"set":function(a) {
			GOPD$0(super$0,$D$11)["set"].call(this, a);
		},"configurable":true,"enumerable":true});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A._a === void 0, B._a === 'test_9');
})();

// parent class and child class: parent with computed static setter, child without computed static setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A,'a' + postfix,{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A._a === void 0, B._a === 'test_9');
})();

// parent class and child class: with computed getter and setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A.prototype,'a' + postfix,{"get":function() {
			return this._a;
		},"configurable":true,"enumerable":true});

		DP$0(A.prototype,'a' + (postfix.reset(), postfix),{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();

	postfix.reset();

	var B = (function(super$0){"use strict";var $D$12;var $D$13;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		$D$12=('a' + postfix)+'';DP$0(B.prototype,$D$12,{"get":function() {
			return GOPD$0(super$0.prototype,$D$12)["get"].call(this);
		},"configurable":true,"enumerable":true});

		$D$13=('a' + (postfix.reset(), postfix))+'';DP$0(B.prototype,$D$13,{"set":function(a) {
			GOPD$0(super$0.prototype,$D$13)["set"].call(this, a);
		},"configurable":true,"enumerable":true});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: parent with computed getter and setter, child without computed getter and setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A.prototype,'a' + postfix,{"get":function() {
			return this._a;
		},"configurable":true,"enumerable":true});

		DP$0(A.prototype,'a' + (postfix.reset(), postfix),{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: with computed static getter and setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A,'a' + postfix,{"get":function() {
			return this._a;
		},"configurable":true,"enumerable":true});

		DP$0(A,'a' + (postfix.reset(), postfix),{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();

	postfix.reset()

	var B = (function(super$0){"use strict";var $D$14;var $D$15;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		$D$14=('a' + postfix)+'';DP$0(B,$D$14,{"get":function() {
			return GOPD$0(super$0,$D$14)["get"].call(this);
		},"configurable":true,"enumerable":true});

		$D$15=('a' + (postfix.reset(), postfix))+'';DP$0(B,$D$15,{"set":function(a) {
			GOPD$0(super$0,$D$15)["set"].call(this, a);
		},"configurable":true,"enumerable":true});
	;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B['a' + postfix] === 'test_9', B._a === 'test_9', B['a' + (postfix.reset(), postfix)] === 'test_9');
})();

// parent class and child class: with computed static getter and setter, child without computed static getter and setter
(function() {
	postfix.reset();

	var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		DP$0(A,'a' + postfix,{"get":function() {
			return this._a;
		},"configurable":true,"enumerable":true});

		DP$0(A,'a' + (postfix.reset(), postfix),{"set":function(a) {
			this._a = a + '_' + 9;
		},"configurable":true,"enumerable":true});
	;return A;})();
	var B = (function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false}); ;return B;})(A);

	var pk1 = Object.keys(A.prototype);var sk1 = Object.keys(A);
	var pk2 = Object.keys(B.prototype);var sk2 = Object.keys(B);
	var b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a' + postfix] === void 0, B._a === 'test_9', B['a' + (postfix.reset(), postfix)] === 'test_9');
})();
