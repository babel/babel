
var a = 'method1', b = 'method2', x = 'asd';

class A {
	static test1(){ return 'test1' }
	test2(){ return 'test2' }

	set [a](x){ throw new Error('you can\'t set ' + a) }
}

class B extends A {

	[a]() {
		return a;
	}

	[b]() {
		return b;
	}

	a(){ return 123 }

	get [x + 1](){ return this.__x }
	set [x + 1](a){ this.__x = a + 9 }

	get c(){ return this.__c }
	set c(a){ this.__c = a + 9 }

	static [a]() {
		return a;
	}

	static [b]() {
		return b;
	}

	static a(){ return 123 }

	static get [x + 1](){ return this.__x }
	static set [x + 1](a){ this.__x = a + 9 }

	static get c(){ return this.__c }
	static set c(a){ this.__c = a + 9 }
}

var objA = new A();
try { objA[a] = isNaN;console.log(false); }
catch(e){ console.log(true); }

B[x + 1] = 11;
B.c = 321;
console.log(B[a]() == a, B[b]() == b, B.a() == 123, B[x + 1] == 11 + 9, B.c == 321 + 9)

var obj = new B();
obj[x + 1] = 11;
obj.c = 321;
console.log(obj[a]() == a, obj[b]() == b, obj.a() == 123, obj[x + 1] == 11 + 9, obj.c == 321 + 9);
