// About: simple objectLiteral's transpiling

{// properties
	var A = 1, B = 2, C = 3;

	var a = {A: A, B: B, C: C};
	console.log(Object.keys(a).join("|") === "A|B|C", a.A === A, a.B === B, a.C === C)
	{
		var a$0 = {A: A, b: B, C: C};
		console.log(Object.keys(a$0).join("|") === "A|b|C", a$0.A === A, a$0.b === B, a$0.C === C)
		{
			var a$1 = {A: A, B: B, c: C};
			console.log(Object.keys(a$1).join("|") === "A|B|c", a$1.A === A, a$1.B === B, a$1.c === C)
		}
	}
}

{// property + method (function)
	var A$0 = 11, B$0 = 22, C$0 = 33;

	var a$2 = {A: function(){ return A$0 }, B: B$0, C: C$0};
	console.log(Object.keys(a$2).join("|") === "A|B|C", a$2.A() === A$0, a$2.B === B$0, a$2.C === C$0)
}

{// property + method (function) in default value
	var A$1 = 11, B$1 = 22, C$1 = 33;

	function test3() {var value = arguments[0];if(value === void 0)value = {A: function(){ return A$1 }, B: B$1, C: C$1};
		return value
	}

	var a$3 = test3();
	console.log(Object.keys(a$3).join("|") === "A|B|C", a$3.A() === A$1, a$3.B === B$1, a$3.C === C$1)
}

{// property in default value of function parameter
	var A$2 = 111;
	function test4(){var a = arguments[0];if(a === void 0)a = {A: A$2}; return A$2 }
	console.log(test4() === 111);
}

{// property in default value of destructuring in function parameter
	var A$3 = 222;
	function test5(){var a = ((a = (arguments[0] !== void 0 ? arguments[0] : {}).a) === void 0 ? {A: A$3} : a); return a.A + A$3 }
	console.log(test5() === A$3 + 222);
}

{// issue #47 not a computed property
	var foo = {
		'[': true
	};
	console.log(foo['['] === true);
}

{// issue #47 not a computed property
	var foo$0 = {
		']': true
	};
	console.log(foo$0[']'] === true);
}

// TODO:: more
