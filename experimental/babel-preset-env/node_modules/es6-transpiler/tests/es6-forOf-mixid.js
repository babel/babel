
{
	let test;
}

{// destructuring & arrow function
	let output = [];
	for(let {test} of (   (x)  =>   [{test: x + 1}, {test: x + 2}, {test: x + 3}])(2)) {
		output.push(test)
	}
	console.log(output.join("|") === [3, 4, 5].join("|"))
}

{
	let a, b, c;
}

{// arrow function & shorthand property & destructuring & spread
	let retArr = (a, b, c)=>[
		{test: a + 1, a}	//{test: 3, a: 2}
		, {test: b + 2, b}	//{test: 3, b: 1}
		, {test: c + 3, c}	//{test: 3, c: 0}
	]
	let output = [];
	let arr = [...[2], ...[1, 0]]
	for(let {test, a = 1, b = 2, c: c = 3} of retArr(...arr)) {
		output.push(test + (a + b + c))
	}
	console.log(output.join("|") === [10, 8, 6].join("|"))

	{
		let output = [];
		let arr = [...[2], ...[1, 0]];
		for(let {test, a = 1, b = 2, c: c = 3} of (  (a, b, c) =>  [
			{test: a + 1, a}	//{test: 3, a: 2}
			, {test: b + 2, b}	//{test: 3, b: 1}
			, {test: c + 3, c}	//{test: 3, c: 0}
		])(...arr)) {
			output.push(test + (a + b + c))
		}
		console.log(output.join("|") === [10, 8, 6].join("|"))
	}
}

{
	let a, b, c;
}

{// destructuring & arrow function
	let output = [];let arr = [8, 9];
	for(let [value, index] of ( arr.push(10), arr.map((value, index)=>[value, index]) ) ) {
		output.push(value)
	}
	console.log(output.join("|") === [8, 9, 10].join("|"))
}

{// destructuring & arrow function & rest
	let output = [];let arr = [8, 9];
	for(let [value, index] of ( arr.push(10), arr.map((...r)=>r) ) ) {
		output.push(value)
	}
	console.log(output.join("|") === [8, 9, 10].join("|"))
}
