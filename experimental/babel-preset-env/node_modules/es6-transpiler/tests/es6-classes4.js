class class1{constructor(opts){this.class1=1;this.op1=opts.op1}}
class class2 extends class1{say(){return "class2"}}

let a = new class2({op1: 99});

console.log(a.class1 === 1, a.op1 === 99, a.say() === "class2");
