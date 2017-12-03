"use strict";

function test1({a: a, b}) {
	var a = 1;
	console.log(a, b);
}
test1({a: 1, opt2: 2});

function test2() {
	var a = 1, {c: a} = {c: 1};
	console.log(a);
}
test2();

function test3() {
	var [a, b] = [1, 2];
	var a = 3;
	console.log(a, b);
}
test3();

function test4() {
	var {obj: [{c: a}]} = {obj: [{c: 1}]};
	var a = 3;
	console.log(a);
}
test4();

{
	let {c};
}

let a, c;
let [a, b, ...c];
