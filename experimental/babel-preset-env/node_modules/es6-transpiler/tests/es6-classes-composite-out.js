var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;
var moduleGreeter = {
	Greeter: ((function(){"use strict";var static$0={},proto$0={};
		static$0.test = function(){ return "test" };

		function constructor$0(message) {
			this.greeting = message;
		}DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});

		proto$0.greet = function() {
			return "Hello 1, " + this.greeting;
		};
	MIXIN$0(constructor$0,static$0);MIXIN$0(constructor$0.prototype,proto$0);static$0=proto$0=void 0;return constructor$0;})())
};

var moduleGreeter1 = {
	Greeter1: ((function(super$0){"use strict";super$0=moduleGreeter.Greeter;if(!PRS$0)MIXIN$0(constructor$0, super$0);var proto$0={};
		function constructor$0(message) {
			super$0.call(this, message);
			this.greeting = message;
		}if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});
		proto$0.greet = function() {
			return super$0.prototype.greet.call(this) + "Hello 2, " + this.greeting;
		};
	MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})())
};

console.log(moduleGreeter1.Greeter1.test() === "test");
console.log((new moduleGreeter1.Greeter1("test | 3")).greet() === "Hello 1, test | 3Hello 2, test | 3");
