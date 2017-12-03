
var testCall1 = false, testCall2 = false;
class Foo {
	static doIt(test, n) {
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
	}

	doIt() {
		Foo.doIt.apply(this, arguments);
	}

	static constructor() {

	}
}

class Base extends Foo {
	constructor() {
		super();
		super.constructor();//useless call
		super.doIt(true, 1);
		super.doIt.call(this, void 0, 1);

		return true;
	}

	static constructor() {
		super();
		super.constructor();//useless call
		super.doIt(true);
		super.doIt.call(this);

		return true;
	}

	getParentClass() {
		return super;
	}

	static getParentClass() {
		return super;
	}
}

console.log( ((new Base).test1 === 999 && testCall1) === true );
console.log( (new Base).getParentClass() == Foo );
console.log( Base.constructor(), (Base.test2 === 999 && testCall2) === true, Base.getParentClass() == Foo );

// --------------------======================== SPREAD ========================--------------------

class A {
	a(...rest) {
		return rest.reverse();
	}

	static a(...rest) {
		return ['static', ...rest].reverse();
	}

	c(...rest) {
		return rest.reverse();
	}

	static c(...rest) {
		return ['static', ...rest].reverse();
	}

	d(...rest) {
		return rest.reverse();
	}

	static d(...rest) {
		return ['static', ...rest].reverse();
	}

	get prop1() {
		return this.a(...this._prop1);
	}

	static get prop1() {
		return this.a(...this._prop1);
	}

	set prop1(...rest) {
		this._prop1 = rest;
	}

	static set prop1(...rest) {
		this._prop1 = ['static', ...rest];
	}
}

class B extends A {
	a(...rest) {
		return super(...rest);
	}

	static a(...rest) {
		return super(...rest);
	}

	c(...rest) {
		return super(1, 2, 3, ...rest);
	}

	static c(...rest) {
		return super(1, 2, 3, ...rest);
	}

	d(...rest) {
		return super(...[...rest, '|', ...rest.reverse()]);
	}

	static d(...rest) {
		return super(...[...rest, '|', ...rest.reverse()]);
	}

	a1(...rest) {
		return super.a(1, ...rest);
	}

	static a1(...rest) {
		return super.a(1, ...rest);
	}

	a2(...rest) {
		return super.a(1, 2, ...rest);
	}

	static a2(...rest) {
		return super.a(1, 2, ...rest);
	}

	get prop1() {
		return super();
	}

	static get prop1() {
		return super();
	}

	set prop1(...rest) {
		super(...rest);
	}

	static set prop1(...rest) {
		super(...rest);
	}
}

console.log(A.a(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'), A.c(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'), A.d(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'));

console.log(B.a(1, 2, 3).join('|') === [3, 2, 1, 'static'].join('|'));
console.log(B.c(1, 2, 3).join('|') === [3, 2, 1, 3, 2, 1, 'static'].join('|'));
console.log(B.d(1, 2, 3).join('|') === [1, 2, 3, '|', 3, 2, 1, 'static'].join('|'));

console.log(B.a1(2, 3).join('|') === [3, 2, 1, 'static'].join('|'));
console.log(B.a2(3).join('|') === [3, 2, 1, 'static'].join('|'));

let a = new A;
let b = new B;

console.log(a.a(1, 2, 3).join('|') === [3, 2, 1].join('|'), a.c(1, 2, 3).join('|') === [3, 2, 1].join('|'), a.d(1, 2, 3).join('|') === [3, 2, 1].join('|'));

console.log(b.a(1, 2, 3).join('|') === [3, 2, 1].join('|'));
console.log(b.c(1, 2, 3).join('|') === [3, 2, 1, 3, 2, 1].join('|'));
console.log(b.d(1, 2, 3).join('|') === [1, 2, 3, '|', 3, 2, 1].join('|'));

console.log(b.a1(2, 3).join('|') === [3, 2, 1].join('|'));
console.log(b.a2(3).join('|') === [3, 2, 1].join('|'));
