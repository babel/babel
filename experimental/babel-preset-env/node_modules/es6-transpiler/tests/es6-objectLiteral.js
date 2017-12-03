// About: simple objectLiteral's transpiling

{// properties
	let A = 1, B = 2, C = 3;

	let a = {A, B, C};
	console.log(Object.keys(a).join("|") === "A|B|C", a.A === A, a.B === B, a.C === C)
	{
		let a = {A: A, b: B, C};
		console.log(Object.keys(a).join("|") === "A|b|C", a.A === A, a.b === B, a.C === C)
		{
			let a = {A: A, B, c: C};
			console.log(Object.keys(a).join("|") === "A|B|c", a.A === A, a.B === B, a.c === C)
		}
	}
}

{// property + method (function)
	let A = 11, B = 22, C = 33;

	let a = {A(){ return A }, B: B, C};
	console.log(Object.keys(a).join("|") === "A|B|C", a.A() === A, a.B === B, a.C === C)
}

{// property + method (function) in default value
	let A = 11, B = 22, C = 33;

	function test3(value = {A(){ return A }, B: B, C}) {
		return value
	}

	let a = test3();
	console.log(Object.keys(a).join("|") === "A|B|C", a.A() === A, a.B === B, a.C === C)
}

{// property in default value of function parameter
	let A = 111;
	function test4(a = {A}){ return A }
	console.log(test4() === 111);
}

{// property in default value of destructuring in function parameter
	let A = 222;
	function test5({a = {A}} = {}){ return a.A + A }
	console.log(test5() === A + 222);
}

{// issue #47 not a computed property
	let foo = {
		'[': true
	};
	console.log(foo['['] === true);
}

{// issue #47 not a computed property
	let foo = {
		']': true
	};
	console.log(foo[']'] === true);
}

// TODO:: more
