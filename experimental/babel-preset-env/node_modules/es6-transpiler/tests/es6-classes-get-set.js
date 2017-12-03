
class A {
	get a() {
		return this._a;
	}

	set a(val) {
		this._a = val + 3;
	}
};

class B extends A {
	get b() {
		return this._b;
	}

	m(){ return "m" }

	set b(val) {
		this._b = val + 2;
	}

	get c(){ return this._c }
	set 'c'(val){ this._c = val + 1 }

	static get d(){ return this._d }
	static set d(val){ this._d = val + 999 }
};

class C extends B {
	set 'e'(val){ this._e = val * 3 }
	get e(){ return this._e }

	get f(){ return 'f' }

	set g(val = 'g'){ return this._g = val }

	static m(){ return "m" }
};

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
