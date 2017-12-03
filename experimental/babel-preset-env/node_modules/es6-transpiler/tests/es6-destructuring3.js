let test1, test2;

{
	let a = 1, b = 2, c = 3;

	let obj = {
		test2: ( ({a, b, c}) = {a: a, b: b, c: c} ).a
		, test1: b
		, test3: c
	}

	test1 = function() {
		console.log(this.test2 === 1, this.test1 === 2, this.test3 === 3, a === 1, b === 2, c === 3)
	}.bind(obj);
}

{
	let a = void 0, b = void 0, c = void 0, test1;

	let obj = {
		test2: ( ({a = 9, b = 8, c = 7}) = {a: a, b: b, c: c} ).a
		, test1: ( ({test1 = 777}) = {test1: test1} ).test1
		, test3: c
	}
	test2 = function() {
		console.log(this.test2 === void 0, this.test1 === void 0, this.test3 === 7, a === 9, b === 8, c === 7, test1 === 777)
	}.bind(obj);
}

test1();
test2();

(function() {
	var {a, b, c: {test = 12}} = {c: {test: 22}}, c;
	console.log(a === void 0, b === void 0, c === void 0, test === 22);

	var obj = {};
	obj["test"] = (({b, test:{test, a:[, , [a], , c = 5]}}) = {test: {test:b, a: [1, 2, [99], 4]}, b: test}, test);

	console.log(a === 99, test === void 0, b === 22, obj["test"] === test);
})()


{// object literals in destructuring pattern
	function test3({test: {a, b}}) {
		return a + "|" + b;
	}
	console.log(test3({test:{a: 12, b: 21}}) === "12|21");

	function test4({test: {a:{a:{a, b}, b1}, b2}}) {
		return a + "|" + b;
	}
	console.log(test4({test:{a:{a:{a:1,b:2}, b1:{}}, b2:{}}}) == "1|2");

	function test5([{a, b}, {c, d}]) {
		return a + "|" + b + "|" + c + "|" + d;
	}
	console.log(test5([{a: 1, b: 2}, {c: 3, d: 4}]) == "1|2|3|4");

	function test6({test: {a, b}}) {
		return a + "|" + b;
	}
	console.log(test6({test:{a: 12, b: 21}}) === "12|21")
}
