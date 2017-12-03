var $D$0;var test1 = void 0, test2 = void 0;

{
	var a = 1, b = 2, c = 3;

	var obj = {
		test2: ( (a = ($D$0 = {a: a, b: b, c: c}).a, b = $D$0.b, c = $D$0.c, $D$0) ).a
		, test1: b
		, test3: c
	}

	test1 = function() {
		console.log(this.test2 === 1, this.test1 === 2, this.test3 === 3, a === 1, b === 2, c === 3)
	}.bind(obj);
}

{
	var a$0 = void 0, b$0 = void 0, c$0 = void 0, test1$0 = void 0;

	var obj$0 = {
		test2: ( (a$0 = ((a$0 = ($D$0 = {a: a$0, b: b$0, c: c$0}).a) === void 0 ? 9 : a$0), b$0 = ((b$0 = $D$0.b) === void 0 ? 8 : b$0), c$0 = ((c$0 = $D$0.c) === void 0 ? 7 : c$0), $D$0) ).a
		, test1: ( (test1$0 = ((test1$0 = ($D$0 = {test1: test1$0}).test1) === void 0 ? 777 : test1$0), $D$0) ).test1
		, test3: c$0
	}
	test2 = function() {
		console.log(this.test2 === void 0, this.test1 === void 0, this.test3 === 7, a$0 === 9, b$0 === 8, c$0 === 7, test1$0 === 777)
	}.bind(obj$0);
;$D$0 = void 0}

test1();
test2();

(function() {var $D$1;
	var a = (test = {c: {test: 22}}).a, b = test.b, test = ((test = (test.c).test) === void 0 ? 12 : test), c;
	console.log(a === void 0, b === void 0, c === void 0, test === 22);

	var obj = {};
	obj["test"] = ((b = ($D$1 = {test: {test:b, a: [1, 2, [99], 4]}, b: test}).b, test = (c = $D$1.test).test, a = (c = c.a)[2][0], c = ((c = c[4]) === void 0 ? 5 : c), $D$1), test);

	console.log(a === 99, test === void 0, b === 22, obj["test"] === test);
;$D$1 = void 0})()


{// object literals in destructuring pattern
	function test3(b) {var a = (b = (b).test).a, b = b.b;
		return a + "|" + b;
	}
	console.log(test3({test:{a: 12, b: 21}}) === "12|21");

	function test4(b2) {var a = (b = (b1 = (b2 = (b2).test).a).a).a, b = b.b, b1 = b1.b1, b2 = b2.b2;
		return a + "|" + b;
	}
	console.log(test4({test:{a:{a:{a:1,b:2}, b1:{}}, b2:{}}}) == "1|2");

	function test5(d) {var a = (b = (c = d)[0]).a, b = b.b, c = (d = c[1]).c, d = d.d;
		return a + "|" + b + "|" + c + "|" + d;
	}
	console.log(test5([{a: 1, b: 2}, {c: 3, d: 4}]) == "1|2|3|4");

	function test6(b) {var a = (b = (b).test).a, b = b.b;
		return a + "|" + b;
	}
	console.log(test6({test:{a: 12, b: 21}}) === "12|21")
}
