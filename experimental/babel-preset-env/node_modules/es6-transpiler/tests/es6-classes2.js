
// parent class and child class: without constructor
(function() {
	class A {}
	class B extends A {}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B);
})();

// parent class and child class: with constructor
(function() {
	class A {
		constructor(a) {
			this.a = a;
		}
	}
	class B extends A {
		constructor(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: parent with constructor, child without constructor
(function() {
	class A {
		constructor(a) {
			this.a = a;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: with method
(function() {
	class A {
		a(a) {
			return 'test'
		}
	}
	class B extends A {
		a(a) {
			return super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b.a() === 'test');
})();

// parent class and child class: parent with method, child without method
(function() {
	class A {
		a(a) {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a() === 'test');
})();

// parent class and child class: with static method
(function() {
	class A {
		static a(a) {
			return 'test'
		}
	}
	class B extends A {
		static a(a) {
			return super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A.a() === 'test', B.a() === 'test');
})();

// parent class and child class: parent with static method, child without static method
(function() {
	class A {
		static a(a) {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A.a() === 'test', B.a() === 'test');
})();

// parent class and child class: with getter
(function() {
	class A {
		get a() {
			return 'test'
		}
	}
	class B extends A {
		get a() {
			return super();
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: parent with getter, child without getter
(function() {
	class A {
		get a() {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test');
})();

// parent class and child class: with setter
(function() {
	class A {
		set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		set a(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: parent with setter, child without setter
(function() {
	class A {
		set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: with static getter
(function() {
	class A {
		static get a() {
			return 'test'
		}
	}
	class B extends A {
		static get a() {
			return super();
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A.a === 'test', B.a === 'test');
})();

// parent class and child class: parent with static getter, child without static getter
(function() {
	class A {
		static get a() {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A.a === 'test', B.a === 'test');
})();

// parent class and child class: with static setter
(function() {
	class A {
		static set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		static set a(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: parent with static setter, child without static setter
(function() {
	class A {
		static set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: with getter and setter
(function() {
	class A {
		get a() {
			return this._a;
		}

		set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		get a() {
			return super();
		}

		set a(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test_9', b._a === 'test_9');
})();

// parent class and child class: parent with getter and setter, child without getter and setter
(function() {
	class A {
		get a() {
			return this._a;
		}

		set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b.a === 'test_9', b._a === 'test_9');
})();

// parent class and child class: with static getter and setter
(function() {
	class A {
		static get a() {
			return this._a;
		}

		static set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		static get a() {
			return super();
		}

		static set a(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A.a === void 0, B._a === 'test_9', B.a === 'test_9');
})();

// parent class and child class: with static getter and setter, child without static getter and setter
(function() {
	class A {
		static get a() {
			return this._a;
		}

		static set a(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B.a = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A.a === void 0, B._a === 'test_9', B.a === 'test_9');
})();

// --------------------======================== LITERAL ========================--------------------

// parent class and child class: with literal constructor
(function() {
	class A {
		'constructor'(a) {
			this.a = a;
		}
	}
	class B extends A {
		'constructor'(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B);
})();

// parent class and child class: parent with literal constructor, child without literal constructor
(function() {
	class A {
		'constructor'(a) {
			this.a = a;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B('test');

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B);
})();

// parent class and child class: with literal method
(function() {
	class A {
		'a'(a) {
			return 'test'
		}
	}
	class B extends A {
		'a'(a) {
			return super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a']() === 'test');
})();

// parent class and child class: parent with literal method, child without literal method
(function() {
	class A {
		'a'(a) {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a']() === 'test');
})();

// parent class and child class: with literal static method
(function() {
	class A {
		static 'a'(a) {
			return 'test'
		}
	}
	class B extends A {
		static 'a'(a) {
			return super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a']() === 'test', B['a']() === 'test');
})();

// parent class and child class: parent with literal static method, child without literal static method
(function() {
	class A {
		static 'a'(a) {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a']() === 'test', B['a']() === 'test');
})();

// parent class and child class: with literal getter
(function() {
	class A {
		get 'a'() {
			return 'test'
		}
	}
	class B extends A {
		get 'a'() {
			return super();
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test');
})();

// parent class and child class: parent with literal getter, child without literal getter
(function() {
	class A {
		get 'a'() {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test');
})();


// parent class and child class: with literal setter
(function() {
	class A {
		set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		set 'a'(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: parent with literal setter, child without literal setter
(function() {
	class A {
		set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: with literal static getter
(function() {
	class A {
		static get 'a'() {
			return 'test'
		}
	}
	class B extends A {
		static get 'a'() {
			return super();
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a'] === 'test', B['a'] === 'test');
})();

// parent class and child class: parent with literal static getter, child without literal static getter
(function() {
	class A {
		static get 'a'() {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a'] === 'test', B['a'] === 'test');
})();

// parent class and child class: with literal static setter
(function() {
	class A {
		static set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		static set 'a'(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: parent with literal static setter, child without literal static setter
(function() {
	class A {
		static set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, B._a === 'test_9');
})();

// parent class and child class: with literal getter and setter
(function() {
	class A {
		get 'a'() {
			return this._a;
		}

		set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		get 'a'() {
			return super();
		}

		set 'a'(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: parent with literal getter and setter, child without literal getter and setter
(function() {
	class A {
		get 'a'() {
			return this._a;
		}

		set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	b['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a'] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: with literal static getter and setter
(function() {
	class A {
		static get 'a'() {
			return this._a;
		}

		static set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A {
		static get 'a'() {
			return super();
		}

		static set 'a'(a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B['a'] === 'test_9', B._a === 'test_9', B['a'] === 'test_9');
})();

// parent class and child class: with literal static getter and setter, child without literal static getter and setter
(function() {
	class A {
		static get 'a'() {
			return this._a;
		}

		static set 'a'(a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;
	B['a'] = 'test';

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a'] === void 0, B._a === 'test_9', B['a'] === 'test_9');
})();

// --------------------======================== COMPUTED ========================--------------------

let postfix = {
	counter: 0
	, stringTag: 'd' + Math.random()
	, toString(){ return ++this.counter + this.stringTag }
	, reset(){ this.counter = 0 }
};

// parent class and child class: with computed method
(function() {
	postfix.reset();

	class A {
		['a' + postfix](a) {
			return 'test'
		}
	}

	postfix.reset();

	class B extends A {
		['a' + postfix](a) {
			return super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix]() === 'test');
})();

// parent class and child class: parent with computed method, child without computed method
(function() {
	postfix.reset();

	class A {
		['a' + postfix](a) {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix]() === 'test');
})();

// parent class and child class: with computed static method
(function() {
	postfix.reset();

	class A {
		static ['a' + postfix](a) {
			return 'test'
		}
	}

	postfix.reset();

	class B extends A {
		static ['a' + postfix](a) {
			return super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a' + postfix]() === 'test', B['a' + (postfix.reset(), postfix)]() === 'test');
})();

// parent class and child class: parent with computed static method, child without computed static method
(function() {
	postfix.reset();

	class A {
		static ['a' + postfix](a) {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a' + postfix]() === 'test', B['a' + (postfix.reset(), postfix)]() === 'test');
})();

// parent class and child class: with computed getter
(function() {
	postfix.reset();

	class A {
		get ['a' + postfix]() {
			return 'test'
		}
	}

	postfix.reset();

	class B extends A {
		get ['a' + postfix]() {
			return super();
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test');
})();

// parent class and child class: parent with computed getter, child without computed getter
(function() {
	postfix.reset();

	class A {
		get ['a' + postfix]() {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test');
})();


// parent class and child class: with computed setter
(function() {
	postfix.reset();

	class A {
		set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}

	postfix.reset();

	class B extends A {
		set ['a' + postfix](a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: parent with computed setter, child without computed setter
(function() {
	postfix.reset();

	class A {
		set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b._a === 'test_9');
})();

// parent class and child class: with computed static getter
(function() {
	postfix.reset();

	class A {
		static get ['a' + postfix]() {
			return 'test'
		}
	}

	postfix.reset();

	class B extends A {
		static get ['a' + postfix]() {
			return super();
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A['a' + postfix] === 'test', B['a' + (postfix.reset(), postfix)] === 'test');
})();

// parent class and child class: parent with computed static getter, child without computed static getter
(function() {
	postfix.reset();

	class A {
		static get ['a' + postfix]() {
			return 'test'
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a' + postfix] === 'test', B['a' + (postfix.reset(), postfix)] === 'test');
})();

// parent class and child class: with computed static setter
(function() {
	postfix.reset();

	class A {
		static set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}

	postfix.reset();

	class B extends A {
		static set ['a' + postfix](a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, A._a === void 0, B._a === 'test_9');
})();

// parent class and child class: parent with computed static setter, child without computed static setter
(function() {
	postfix.reset();

	class A {
		static set ['a' + postfix](a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A._a === void 0, B._a === 'test_9');
})();

// parent class and child class: with computed getter and setter
(function() {
	postfix.reset();

	class A {
		get ['a' + postfix]() {
			return this._a;
		}

		set ['a' + (postfix.reset(), postfix)](a) {
			this._a = a + '_' + 9;
		}
	}

	postfix.reset();

	class B extends A {
		get ['a' + postfix]() {
			return super();
		}

		set ['a' + (postfix.reset(), postfix)](a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 1, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: parent with computed getter and setter, child without computed getter and setter
(function() {
	postfix.reset();

	class A {
		get ['a' + postfix]() {
			return this._a;
		}

		set ['a' + (postfix.reset(), postfix)](a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	b['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 1, pk2.length === 0, sk1.length === 0, sk2.length === 0, b instanceof B, b['a' + postfix] === 'test_9', b._a === 'test_9');
})();

// parent class and child class: with computed static getter and setter
(function() {
	postfix.reset();

	class A {
		static get ['a' + postfix]() {
			return this._a;
		}

		static set ['a' + (postfix.reset(), postfix)](a) {
			this._a = a + '_' + 9;
		}
	}

	postfix.reset()

	class B extends A {
		static get ['a' + postfix]() {
			return super();
		}

		static set ['a' + (postfix.reset(), postfix)](a) {
			super(a);
		}
	}

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 1, b instanceof B, B['a' + postfix] === 'test_9', B._a === 'test_9', B['a' + (postfix.reset(), postfix)] === 'test_9');
})();

// parent class and child class: with computed static getter and setter, child without computed static getter and setter
(function() {
	postfix.reset();

	class A {
		static get ['a' + postfix]() {
			return this._a;
		}

		static set ['a' + (postfix.reset(), postfix)](a) {
			this._a = a + '_' + 9;
		}
	}
	class B extends A { }

	let pk1 = Object.keys(A.prototype);let sk1 = Object.keys(A);
	let pk2 = Object.keys(B.prototype);let sk2 = Object.keys(B);
	let b = new B;

	postfix.reset();

	B['a' + postfix] = 'test';

	postfix.reset();

	console.log(b.constructor == B, b instanceof A, pk1.length === 0, pk2.length === 0, sk1.length === 1, sk2.length === 0, b instanceof B, A['a' + postfix] === void 0, B._a === 'test_9', B['a' + (postfix.reset(), postfix)] === 'test_9');
})();
