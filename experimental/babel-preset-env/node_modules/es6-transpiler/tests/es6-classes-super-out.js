var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;var DPS$0 = Object.defineProperties;var SLICE$0 = Array.prototype.slice;var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};
var testCall1 = false, testCall2 = false;
var Foo = (function(){"use strict";function Foo() {}DP$0(Foo,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
	static$0.doIt = function(test, n) {
		if ( test ) {
			if ( n == 1 ) {
				testCall1 = true;
			}
			else {
				testCall2 = true;
			}
		}
		else {
			if ( n == 1 ) {
				this.test1 = 999;
			}
			else {
				this.test2 = 999;
			}

		}
	};

	proto$0.doIt = function() {
		Foo.doIt.apply(this, arguments);
	};

	static$0.constructor = function() {

	};
MIXIN$0(Foo,static$0);MIXIN$0(Foo.prototype,proto$0);static$0=proto$0=void 0;return Foo;})();

var Base = (function(super$0){"use strict";if(!PRS$0)MIXIN$0(Base, super$0);var static$0={},proto$0={};
	function Base() {
		super$0.call(this);
		super$0.prototype.constructor.call(this);//useless call
		super$0.prototype.doIt.call(this, true, 1);
		super$0.prototype.doIt.call(this, void 0, 1);

		return true;
	}if(super$0!==null)SP$0(Base,super$0);Base.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":Base,"configurable":true,"writable":true}});DP$0(Base,"prototype",{"configurable":false,"enumerable":false,"writable":false});

	static$0.constructor = function() {
		super$0.constructor.call(this);
		super$0.constructor.call(this);//useless call
		super$0.doIt.call(this, true);
		super$0.doIt.call(this);

		return true;
	};

	proto$0.getParentClass = function() {
		return super$0;
	};

	static$0.getParentClass = function() {
		return super$0;
	};
MIXIN$0(Base,static$0);MIXIN$0(Base.prototype,proto$0);static$0=proto$0=void 0;return Base;})(Foo);

console.log( ((new Base).test1 === 999 && testCall1) === true );
console.log( (new Base).getParentClass() == Foo );
console.log( Base.constructor(), (Base.test2 === 999 && testCall2) === true, Base.getParentClass() == Foo );

// --------------------======================== SPREAD ========================--------------------

var A = (function(){"use strict";function A() {}DPS$0(A.prototype,{prop1: {"get": $prop1_get$0, "set": $prop1_set$0, "configurable":true,"enumerable":true}});DP$0(A,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
	proto$0.a = function() {var rest = SLICE$0.call(arguments, 0);
		return rest.reverse();
	};

	static$0.a = function() {var rest = SLICE$0.call(arguments, 0);
		return ['static'].concat(ITER$0(rest)).reverse();
	};

	proto$0.c = function() {var rest = SLICE$0.call(arguments, 0);
		return rest.reverse();
	};

	static$0.c = function() {var rest = SLICE$0.call(arguments, 0);
		return ['static'].concat(ITER$0(rest)).reverse();
	};

	proto$0.d = function() {var rest = SLICE$0.call(arguments, 0);
		return rest.reverse();
	};

	static$0.d = function() {var rest = SLICE$0.call(arguments, 0);
		return ['static'].concat(ITER$0(rest)).reverse();
	};

	function $prop1_get$0() {
		return this.a.apply(this, ITER$0(this._prop1));
	}

	function $static_prop1_get$0() {
		return this.a.apply(this, ITER$0(this._prop1));
	};DPS$0(A,{prop1: {"get": $static_prop1_get$0, "set": $static_prop1_set$0, "configurable":true,"enumerable":true}});

	function $prop1_set$0() {var rest = SLICE$0.call(arguments, 0);
		this._prop1 = rest;
	}

	function $static_prop1_set$0() {var rest = SLICE$0.call(arguments, 0);
		this._prop1 = ['static'].concat(ITER$0(rest));
	}
MIXIN$0(A,static$0);MIXIN$0(A.prototype,proto$0);static$0=proto$0=void 0;return A;})();

var B = (function(super$0){"use strict";var $D$0;var $D$1;var CNAMES$0 = [];var GET_CNAMES$0 = function f(o){var r,u;for(var p in o)if((r=o[p])&&typeof r ==='object'&&(u=r["__unq"])){CNAMES$0[u]=p;delete r["__unq"];}return o;};;function B() {if(super$0!==null)super$0.apply(this, arguments)}if(!PRS$0)MIXIN$0(B, super$0);if(super$0!==null)SP$0(B,super$0);B.prototype = OC$0(super$0!==null?super$0.prototype:null,GET_CNAMES$0({"constructor":{"value":B,"configurable":true,"writable":true}, prop1: {"get": $prop1_get$1, "set": $prop1_set$1, "configurable":true,"enumerable":true, "__unq": 1}}));$D$0=CNAMES$0[1];delete CNAMES$0[1];;DP$0(B,"prototype",{"configurable":false,"enumerable":false,"writable":false});var static$0={},proto$0={};
	proto$0.a = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.prototype.a.apply(this, ITER$0(rest));
	};

	static$0.a = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.a.apply(this, ITER$0(rest));
	};

	proto$0.c = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.prototype.c.apply(this, [1, 2, 3].concat(ITER$0(rest)));
	};

	static$0.c = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.c.apply(this, [1, 2, 3].concat(ITER$0(rest)));
	};

	proto$0.d = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.prototype.d.apply(this, [ ].concat(ITER$0(rest, true), ['|'], ITER$0(rest.reverse())));
	};

	static$0.d = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.d.apply(this, [ ].concat(ITER$0(rest, true), ['|'], ITER$0(rest.reverse())));
	};

	proto$0.a1 = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.prototype.a.apply(this, [1].concat(ITER$0(rest)));
	};

	static$0.a1 = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.a.apply(this, [1].concat(ITER$0(rest)));
	};

	proto$0.a2 = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.prototype.a.apply(this, [1, 2].concat(ITER$0(rest)));
	};

	static$0.a2 = function() {var rest = SLICE$0.call(arguments, 0);
		return super$0.a.apply(this, [1, 2].concat(ITER$0(rest)));
	};

	function $prop1_get$1() {
		return GOPD$0(super$0.prototype,$D$0)["get"].call(this);
	}

	function $static_prop1_get$1() {
		return GOPD$0(super$0,$D$1)["get"].call(this);
	};DPS$0(B,GET_CNAMES$0({prop1: {"get": $static_prop1_get$1, "set": $static_prop1_set$1, "configurable":true,"enumerable":true, "__unq": 2}}));$D$1=CNAMES$0[2];delete CNAMES$0[2];;

	function $prop1_set$1() {var rest = SLICE$0.call(arguments, 0);
		GOPD$0(super$0.prototype,$D$0)["set"].apply(this, ITER$0(rest));
	}

	function $static_prop1_set$1() {var rest = SLICE$0.call(arguments, 0);
		GOPD$0(super$0,$D$1)["set"].apply(this, ITER$0(rest));
	}
MIXIN$0(B,static$0);MIXIN$0(B.prototype,proto$0);static$0=proto$0=void 0;return B;})(A);

console.log(A.a(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'), A.c(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'), A.d(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'));

console.log(B.a(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'));
console.log(B.c(1, 2, 3).join('|') === [3, 2, 1, 3, 2, 1, 'static'].join('|'));
console.log(B.d(1, 2, 3).join('|') === [1, 2, 3, '|', 3, 2, 1, 'static'].join('|'));

console.log(B.a1(2, 3).join('|') === [3, 2, 1, 'static'].join('|'));
console.log(B.a2(3).join('|') === [3, 2, 1, 'static'].join('|'));

var a = new A;
var b = new B;

console.log(a.a(1, 2, 3).join('|') === [3, 2, 1].join('|'), a.c(1, 2, 3).join('|') === [3, 2, 1].join('|'), a.d(1, 2, 3).join('|') === [3, 2, 1].join('|'));

console.log(b.a(1, 2, 3).join('|') === [3, 2, 1].join('|'));
console.log(b.c(1, 2, 3).join('|') === [3, 2, 1, 3, 2, 1].join('|'));
console.log(b.d(1, 2, 3).join('|') === [1, 2, 3, '|', 3, 2, 1].join('|'));

console.log(b.a1(2, 3).join('|') === [3, 2, 1].join('|'));
console.log(b.a2(3).join('|') === [3, 2, 1].join('|'));
