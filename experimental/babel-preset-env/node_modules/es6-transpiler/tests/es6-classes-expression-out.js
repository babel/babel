var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;
var secret = Object.create(null);

var A = (function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
	proto$0.m1 = function() {
		return secret;
	};
MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})();

{// anon class
	var v = new ((function(super$0){"use strict";function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0.sMethod = function() {
			// can't call this method
		};
	MIXIN$0(constructor$0,static$0);static$0=void 0;return constructor$0;})(A));

	console.log(v.m1() === secret);
}

{// anon class2
	var secret2 = Object.create(null);

	var Class = (((function(super$0){"use strict";function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0.sMethod = function() {
			return secret2;
		};
	MIXIN$0(constructor$0,static$0);static$0=void 0;return constructor$0;})(A)));
	var v$0 = new Class;

	console.log(v$0.m1() === secret, Class.sMethod() === secret2);
}

{// anon class extends anon class
	var secret2$0 = Object.create(null);

	var Class$0 = (((function(super$0){"use strict";super$0=((function(){"use strict";function A() {}DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0.m1 = function() {
			return secret;
		};
	MIXIN$0(A.prototype,proto$0);proto$0=void 0;return A;})());function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={};
		static$0.sMethod = function() {
			return secret2$0;
		};
	MIXIN$0(constructor$0,static$0);static$0=void 0;return constructor$0;})()));
	var v$1 = new Class$0;

	console.log(v$1.m1() === secret, Class$0.sMethod() === secret2$0);
}

{// anon class extends null
	var secret2$1 = Object.create(null);

	var Class$1 = (((function(super$0){"use strict";function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$1;
		};
		proto$0.test = function() {
			return Class$1.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})(null)));
	var v$2 = new Class$1;

	console.log(Class$1.sMethod() === secret2$1, v$2.test() === secret2$1);
}

{// anon class extends arrow function (group)
	var secret2$2 = Object.create(null);

	var Class$2 = (((function(super$0){"use strict";super$0=(function(){return 1} );function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$2;
		};
		proto$0.test = function() {
			return Class$2.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})()));
	var v$3 = new Class$2;

	console.log(Class$2.sMethod() === secret2$2, v$3.test() === secret2$2);
}

{// anon class extends function
	var secret2$3 = Object.create(null);

	var Class$3 = (((function(super$0){"use strict";super$0=function(){};function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$3;
		};
		proto$0.test = function() {
			return Class$3.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})()));
	var v$4 = new Class$3;

	console.log(Class$3.sMethod() === secret2$3, v$4.test() === secret2$3);
}

{// anon class extends function (call expression - result class)
	var secret2$4 = Object.create(null);

	var Class$4 = (((function(super$0){"use strict";super$0=(function(){ return ((function(){"use strict";function constructor$0() {}DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0.m1 = function() {
			return secret;
		};
	MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})())})();function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$4;
		};
		proto$0.test = function() {
			return Class$4.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})()));
	var v$5 = new Class$4;

	console.log(Class$4.sMethod() === secret2$4, v$5.test() === secret2$4);
}

{// anon class extends function (call expression - result arrow function)
	var secret2$5 = Object.create(null);

	var Class$5 = (((function(super$0){"use strict";super$0=(function(){ return (function(){return 1} ) })();function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$5;
		};
		proto$0.test = function() {
			return Class$5.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})()));
	var v$6 = new Class$5;

	console.log(Class$5.sMethod() === secret2$5, v$6.test() === secret2$5);
}

{// anon class extends function (expression - result class)
	var secret2$6 = Object.create(null);

	var A$0 = void 0;
	var Class$6 = (((function(super$0){"use strict";super$0=( A$0 = ((function(){"use strict";function constructor$0() {}DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
		proto$0.m1 = function() {
			return secret;
		};
	MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})()));function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$6;
		};
		proto$0.test = function() {
			return Class$6.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})()));
	var v$7 = new Class$6;

	console.log(Class$6.sMethod() === secret2$6, v$7.test() === secret2$6, (new A$0).m1() === secret);
}

{// anon class extends function (expression - result arrow function)
	var secret2$7 = Object.create(null);

	var A$1 = void 0;
	var Class$7 = (((function(super$0){"use strict";super$0=( A$1 = (function(){return secret}) );function constructor$0() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(constructor$0, super$0);if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$7;
		};
		proto$0.test = function() {
			return Class$7.sMethod();
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})()));
	var v$8 = new Class$7;

	console.log(Class$7.sMethod() === secret2$7, v$8.test() === secret2$7, A$1() === secret);
}

{// named class
	var secret2$8 = Object.create(null);

	var v$9 = new ((function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$8;
		};
		proto$0.test = function() {
			return B.sMethod();
		};
	MIXIN$0(B,static$0);MIXIN$0(B.prototype,proto$0);static$0=proto$0=void 0;return B;})(A));

	console.log(v$9.m1() === secret, v$9.test() === secret2$8);
}


{// named class 2
	var secret2$9 = Object.create(null);

	var Class$8 = (((function(super$0){"use strict";function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":B,"configurable":true,"writable":true}});DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
		static$0.sMethod = function() {
			return secret2$9;
		};
		proto$0.test = function() {
			return B.sMethod();
		};
	MIXIN$0(B,static$0);MIXIN$0(B.prototype,proto$0);static$0=proto$0=void 0;return B;})(A)));
	var v$10 = new Class$8;

	console.log(v$10.m1() === secret, Class$8.sMethod() === secret2$9, v$10.test() === secret2$9);
}
