
// simple class
(function() {
	class A {}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A();

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 0);
})();

// simple class with constructor
(function() {
	class A {
		constructor(a) {
			this.a = a;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A('test');

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 0);
})();

// simple class with method
(function() {
	class A {
		a(a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a.a() === 'test');
})();

// simple class with static method
(function() {
	class A {
		static a(a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A.a() === 'test');
})();

// simple class with getter
(function() {
	class A {
		get a() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a.a === 'test');
})();

// simple class with setter
(function() {
	class A {
		set a(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a.a = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a._a === 'test_9');
})();

// simple class with static getter
(function() {
	class A {
		static get a() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A.a === 'test');
})();

// simple class with static setter
(function() {
	class A {
		static set a(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A.a = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A._a === 'test_9');
})();

// simple class with getter and setter
(function() {
	class A {
		get a() {
			return this._a;
		}

		set a(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a.a = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a.a === 'test_9', a._a === 'test_9');
})();

// simple class with static getter and setter
(function() {
	class A {
		static get a() {
			return this._a;
		}

		static set a(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A.a = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A.a === 'test_9', A._a === 'test_9');
})();

// --------------------======================== LITERAL ========================--------------------

// simple class with literal constructor
(function() {
	class A {
		'constructor'(a) {
			this.a = a;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A('test');

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 0, a.a === 'test');
})();

// simple class with literal method
(function() {
	class A {
		'a'(a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a']() === 'test');
})();

// simple class with literal static method
(function() {
	class A {
		static 'a'(a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a']() === 'test');
})();

// simple class with literal getter
(function() {
	class A {
		get 'a'() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a'] === 'test');
})();

// simple class with literal setter
(function() {
	class A {
		set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a._a === 'test_9');
})();

// simple class with literal static getter
(function() {
	class A {
		static get 'a'() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a'] === 'test');
})();

// simple class with literal static setter
(function() {
	class A {
		static set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A._a === 'test_9');
})();

// simple class with literal getter and setter
(function() {
	class A {
		get 'a'() {
			return this._a;
		}

		set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a'] === 'test_9', a._a === 'test_9');
})();

// simple class with literal static getter and setter
(function() {
	class A {
		static get 'a'() {
			return this._a;
		}

		static set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a'] === 'test_9', A._a === 'test_9');
})();

// --------------------======================== SIMPLE COMPUTED ========================--------------------

// TODO::
//// simple class with simple computed constructor
//(function() {
//	class A {
//		['constructor'](a) {
//			this.a = a;
//		}
//	}
//
//	let a = new A('test');
//
//	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 0, a.a === 'test');
//})();

// simple class with simple computed method
(function() {
	class A {
		['a'](a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a']() === 'test');
})();

// simple class with simple computed static method
(function() {
	class A {
		static ['a'](a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a']() === 'test');
})();

// simple class with simple computed getter
(function() {
	class A {
		get ['a']() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a'] === 'test');
})();

// simple class with simple computed setter
(function() {
	class A {
		set ['a'](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a._a === 'test_9');
})();

// simple class with simple computed static getter
(function() {
	class A {
		static get ['a']() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a'] === 'test');
})();

// simple class with simple computed static setter
(function() {
	class A {
		static set ['a'](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A._a === 'test_9');
})();

// simple class with simple computed getter and setter
(function() {
	class A {
		get ['a']() {
			return this._a;
		}

		set ['a'](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a'] === 'test_9', a._a === 'test_9');
})();

// simple class with simple computed static getter and setter
(function() {
	class A {
		static get ['a']() {
			return this._a;
		}

		static set ['a'](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A['a'] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a'] === 'test_9', A._a === 'test_9');
})();

// --------------------======================== COMPUTED ========================--------------------

let postfix = 'd' + Math.random(), constructorPostfix = 'ctor';

// TODO::
//// simple class with computed constructor
//(function() {
//	class A {
//		['constru' + constructorPostfix](a) {
//			this.a = a;
//		}
//	}
//
//	let a = new A('test');
//
//	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 0, a.a === 'test');
//})();

// simple class with computed method
(function() {
	class A {
		['a' + postfix](a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a' + postfix]() === 'test');
})();

// simple class with computed static method
(function() {
	class A {
		static ['a' + postfix](a) {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a' + postfix]() === 'test');
})();

// simple class with computed getter
(function() {
	class A {
		get ['a' + postfix]() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a' + postfix] === 'test');
})();

// simple class with computed setter
(function() {
	class A {
		set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a['a' + postfix] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a._a === 'test_9');
})();

// simple class with computed static getter
(function() {
	class A {
		static get ['a' + postfix]() {
			return 'test'
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a' + postfix] === 'test');
})();

// simple class with computed static setter
(function() {
	class A {
		static set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A['a' + postfix] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A._a === 'test_9');
})();

// simple class with computed getter and setter
(function() {
	class A {
		get ['a' + postfix]() {
			return this._a;
		}

		set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	a['a' + postfix] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 1, sk.length === 0, a['a' + postfix] === 'test_9', a._a === 'test_9');
})();

// simple class with computed static getter and setter
(function() {
	class A {
		static get ['a' + postfix]() {
			return this._a;
		}

		static set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}

	let pk = Object.keys(A.prototype);let sk = Object.keys(A);
	let a = new A;
	A['a' + postfix] = 'test';

	console.log(a.constructor == A, a instanceof A, pk.length === 0, sk.length === 1, A['a' + postfix] === 'test_9', A._a === 'test_9');
})();

(function() {// issue #47 computed property: methods
	class A {
		['[']() {
			return '[' + 1;
		}

		[']']() {
			return ']' + 1;
		}

		static ['[']() {
			return '[' + 1;
		}

		static [']']() {
			return ']' + 1;
		}
	}

	let a = new A;

	console.log(a['[']() === '[' + 1, a[']']() === ']' + 1, A['[']() === '[' + 1, A[']']() === ']' + 1);
})();

(function() {// issue #47 not a computed property: methods
	class A {
		'['() {
			return '[' + 1;
		}

		']'() {
			return ']' + 1;
		}

		static '['() {
			return '[' + 1;
		}

		static ']'() {
			return ']' + 1;
		}
	}

	let a = new A;

	console.log(a['[']() === '[' + 1, a[']']() === ']' + 1, A['[']() === '[' + 1, A[']']() === ']' + 1);
})();

(function() {// issue #47 computed property: accessors
	class A {
		get ['[']() {
			return this['_' + '['];
		}

		set ['['](a) {
			this['_' + '['] = a;
		}

		get [']']() {
			return this['_' + ']'];
		}

		set [']'](a) {
			this['_' + ']'] = a;
		}

		static get ['[']() {
			return this['_' + '['];
		}

		static set ['['](a) {
			this['_' + '['] = a;
		}

		static get [']']() {
			return this['_' + ']'];
		}

		static set [']'](a) {
			this['_' + ']'] = a;
		}
	}

	let a = new A;

	a['['] = '[' + 1;
	a[']'] = ']' + 2;
	A['['] = '[' + 3;
	A[']'] = ']' + 4;

	console.log(a['['] === '[' + 1, a[']'] === ']' + 2, A['['] === '[' + 3, A[']'] === ']' + 4);
})();

(function() {// issue #47 not a computed property: accessors
	class A {
		get '['() {
			return this['_' + '['];
		}

		set '['(a) {
			this['_' + '['] = a;
		}

		get ']'() {
			return this['_' + ']'];
		}

		set ']'(a) {
			this['_' + ']'] = a;
		}

		static get '['() {
			return this['_' + '['];
		}

		static set '['(a) {
			this['_' + '['] = a;
		}

		static get ']'() {
			return this['_' + ']'];
		}

		static set ']'(a) {
			this['_' + ']'] = a;
		}
	}

	let a = new A;

	a['['] = '[' + 1;
	a[']'] = ']' + 2;
	A['['] = '[' + 3;
	A[']'] = ']' + 4;

	console.log(a['['] === '[' + 1, a[']'] === ']' + 2, A['['] === '[' + 3, A[']'] === ']' + 4);
})();
