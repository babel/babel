class class1{constructor(msg){this.property1 = msg;};static sayStatic() { return "[static:class1]" };say() { return "class1:" + this.property1 }}

var super$0;

class class2 extends class1{static sayStatic(){ return super.sayStatic() + "[static:class2]" };constructor({message}) {super$0="test_super";super(message);this.property2 = message;};say(a = [1], b = [2], arr = [...a, ...b]) {return super.say() + "|arr:" + arr.join();}}

class class3 extends class1{
	say(){return "class3"}
}


//console.log(class2.A === 123);
console.log((new class2({message: "test"})).say() === "class1:test|arr:1,2")
console.log((new class3()).say() === "class3")
console.log(super$0 === "test_super")
