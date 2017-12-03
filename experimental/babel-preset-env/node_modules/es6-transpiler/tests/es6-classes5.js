
class A {
	static test(){ return "test" }

	//static A = 123;

	constructor(message) {
		this.greeting = message;
	}

	greet() {
		return "Hello 1, " + this.greeting;
	}
}

class B extends A {
	constructor(message) {
		super(message);
		this.greeting = message;
	}
	greet() {
		return super.greet() + "Hello 2, " + this.greeting;
	}
}

class C {

}

//console.log(Greeter.A === 123);
//console.log(Greeter1.A === 123);
console.log(B.test() === "test");
console.log((new B("test | 3")).greet() === "Hello 1, test | 3Hello 2, test | 3");
console.log(new B instanceof A);
