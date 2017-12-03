class class1 {
	constructor(msg) {
		this.property1 = msg;
	}
	static sayStatic() { return "[static:class1]" }

	say() { return "class1:" + this.property1 }
}

var super$0;

class class2 extends class1 {
	static sayStatic(){ return super.sayStatic() + "[static:class2]" }

	//static A = 123;

	constructor({message}) {
		super$0 = "test_super";//super variable test
		super(message);
		this.property2 = message;
	}

	say(a = 1, [b] = [2]) {
		return super.say() + "|class2" + ":" + this.property2 + "|" + a + "|" + b + ":" + class2.sayStatic();
	}
}

class class3 extends class1{
	say(){return "class3"}
}

//console.log(class2.A === 123);
console.log((new class2({message: "test"})).say() === "class1:test|class2:test|1|2:[static:class1][static:class2]")
console.log((new class3()).say() === "class3")
console.log(super$0 === "test_super")
