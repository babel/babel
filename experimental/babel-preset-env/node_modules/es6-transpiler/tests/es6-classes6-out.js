var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;var class1 = (function(){"use strict";var static$0={},proto$0={};
	function class1(msg) {
		this.property1 = msg;
	}DP$0(class1,"prototype",{"configurable":false,"enumerable":false,"writable":false});
	static$0.sayStatic = function() { return "[static:class1]" };

	proto$0.say = function() { return "class1:" + this.property1 };
MIXIN$0(class1,static$0);MIXIN$0(class1.prototype,proto$0);static$0=proto$0=void 0;return class1;})();

var super$0;

var class2 = (function(super$1){"use strict";if(!PRS$0)MIXIN$0(class2, super$1);var static$0={},proto$0={};
	static$0.sayStatic = function(){ return super$1.sayStatic.call(this) + "[static:class2]" };

	//static A = 123;

	function class2(message) {var message = message.message;
		super$0 = "test_super";//super variable test
		super$1.call(this, message);
		this.property2 = message;
	}if(super$1!==null)SP$0(class2,super$1);class2.prototype = OC$0(super$1!==null?super$1.prototype:null,{"constructor":{"value":class2,"configurable":true,"writable":true}});DP$0(class2,"prototype",{"configurable":false,"enumerable":false,"writable":false});

	proto$0.say = function() {var a = arguments[0];if(a === void 0)a = 1;var b = (arguments[1] !== void 0 ? arguments[1] : [2])[0];
		return super$1.prototype.say.call(this) + "|class2" + ":" + this.property2 + "|" + a + "|" + b + ":" + class2.sayStatic();
	};
MIXIN$0(class2,static$0);MIXIN$0(class2.prototype,proto$0);static$0=proto$0=void 0;return class2;})(class1);

var class3 = (function(super$1){"use strict";function class3() {if(super$1!==null)super$1.apply(this, arguments)}if(!PRS$0)MIXIN$0(class3, super$1);if(super$1!==null)SP$0(class3,super$1);class3.prototype = OC$0(super$1!==null?super$1.prototype:null,{"constructor":{"value":class3,"configurable":true,"writable":true}});DP$0(class3,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
	proto$0.say = function(){return "class3"};
MIXIN$0(class3.prototype,proto$0);proto$0=void 0;return class3;})(class1);

//console.log(class2.A === 123);
console.log((new class2({message: "test"})).say() === "class1:test|class2:test|1|2:[static:class1][static:class2]")
console.log((new class3()).say() === "class3")
console.log(super$0 === "test_super")
