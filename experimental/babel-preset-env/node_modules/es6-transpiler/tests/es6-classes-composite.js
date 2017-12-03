
var moduleGreeter = {
	Greeter: class {
		static test(){ return "test" }

		constructor(message) {
			this.greeting = message;
		}

		greet() {
			return "Hello 1, " + this.greeting;
		}
	}
};

var moduleGreeter1 = {
	Greeter1: class extends moduleGreeter.Greeter {
		constructor(message) {
			super(message);
			this.greeting = message;
		}
		greet() {
			return super.greet() + "Hello 2, " + this.greeting;
		}
	}
};

console.log(moduleGreeter1.Greeter1.test() === "test");
console.log((new moduleGreeter1.Greeter1("test | 3")).greet() === "Hello 1, test | 3Hello 2, test | 3");
