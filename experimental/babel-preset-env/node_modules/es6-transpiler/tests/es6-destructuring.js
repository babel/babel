"use strict";

function test0(y = 1, [{x}, {z}] = [{x: 2}, {z: 3}]) {
	const {someValue: a = "defaultValue", b, c = 2} = {}, h = {}, t = 1;

	console.log(y === 1, x === 2, z === 3, a === "defaultValue", b === void 0, c === 2, typeof h === "object", t === 1);
}
test0();

function test1({opt1: opt1, opt2}) {
	{
		let {a: opt1, b: opt2} = {a: 9, b: 8};
		console.log(opt1 === 9, opt2 === 8);
		{
			let {"opt1": opt1, opt2} = {"opt1": 7, opt2: 6};
			console.log(opt1 === 7, opt2 === 6);
		}
	}
	console.log(opt1 === 1, opt2 === 2);
}
test1({opt1: 1, opt2: 2});

function test2(obj) {
	let {a, b: bVar} = obj;
	console.log(a === 1, bVar === 2);
}
test2({a: 1, b: 2});

function test3(array) {
	let a = 1, b = 2, b$0;
	{
		let [a, , b, c] = array;
		console.log(a === 9, b === 7, c === 6, ([a, , b, c] = (array.unshift(777), array))[3] === 7);
		console.log(a === 777, b === null, c === 7);
	}
	console.log(a === 1, b === 2, b$0 === void 0);
}
test3([9,null,7,6]);

function test4(array) {
	var [a, , b, , c] = array;
	console.log(a === 1, b === 2, c === 3);
}
test4([1, null, 2, null ,3]);

function test5() {
	var obj = { obj: {a: 1, b: 2, cObj: {test: 3}}, test: "test" };
	var {obj: {a, b, cObj: c}, test: testStr} = obj;

	console.log(a === 1, b === 2, c.test === 3, testStr === "test");
}
test5();

function test6({a, b}, {c}) {
	console.log(a === 1, b === 2, c === 3)
}
test6({a: 1, b: 2}, {c: 3});
