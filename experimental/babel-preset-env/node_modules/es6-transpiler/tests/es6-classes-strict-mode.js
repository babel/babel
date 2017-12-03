
function inStrictMode() {
	"use strict";

	class A {//class body should be in strict mode, but in this case in already in strict mode

		test(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		}
	}

	class B extends A {//class body should be in strict mode, but in this case in already in strict mode

		test(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		}
	}

	function simpleFunc(a) {// this function is in strict mode
		arguments[0] = a + 1;
		return [a, arguments[0]];
	}

	let a = new A
		, resA = a.test(9)
	;
	let b = new B
		, resB = b.test(8)
	;
	let funcRes = simpleFunc(7);

	console.log(resA[0] != resA[1], resB[0] != resB[1], funcRes[0] != funcRes[1]);
}
inStrictMode();

function notInStrictMode() {

	class A {//class body should be in strict mode

		test(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		}
	}

	class B extends A {//class body should be in strict mode

		test(a) {
			arguments[0] = a + 1;
			return [a, arguments[0]];
		}
	}

	function simpleFunc(a) {// this function not! in strict mode
		arguments[0] = a + 1;
		return [a, arguments[0]];
	}

	let a = new A
		, resA = a.test(9)
	;
	let b = new B
		, resB = b.test(8)
	;
	let funcRes = simpleFunc(7);

	console.log(resA[0] != resA[1], resB[0] != resB[1], funcRes[0] === funcRes[1]);
}
notInStrictMode();