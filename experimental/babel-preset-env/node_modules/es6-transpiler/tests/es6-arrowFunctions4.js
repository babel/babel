
{
	{
		let arr = [ {a: 4}, {a: 0}, {a: 1}, {a: 3}, {a: 2} ];
		arr = arr
			.sort( ({a}, {a: b}) => (a - b) )
			.map(({a})=>a);
		console.log(arr.join("|") === [0, 1, 2, 3, 4].join("|"));
	}

	{
		let arr = [ {a: 4}, {a: 0}, {a: 1}, {a: 3}, {a: 2} ];
		arr = arr
			.sort( ({a} = {}, {a: b} = {}) => (a - b) )
			.map(({a} = {})=>a)
		console.log(arr.join("|") === [0, 1, 2, 3, 4].join("|"));
	}
}

{
	let test1 = ({a}) => ([a])
	console.log(test1({a: 1}).join("|") === [1].join("|"))

	let test2 = (a) => (a)
	console.log(test2(2) === 2)

	let test3 = ({a}) =>a
	console.log(test3({a: 3}) === 3)

	let test4 = (a) => [a]
	console.log(test4(4).join("|") === [4].join("|"))

	let test5 = (a) =>
		a
	console.log(test5(5) === 5)

	let test6 = a => [
		a
	]
	console.log(test6(6).join("|") === [6].join("|"))

	let test7 = ({a}) => (//some comments 1
		a
	/*some comments 2*/)
	console.log(test7({a: 7}) === 7)

	let test8 = (99,(a) => {return a + 1})(7)
	console.log(test8 === 8)

	let test9 = (98,a => {return a + 1})(8)
	console.log(test9 === 9)

	let test10 = (97,(a) => a + 1)(9)
	console.log(test10 === 10)

	let test11 = (96,a => a + 1)(10)
	console.log(test11 === 11)

	let test12 = ((a) => ++a)(11)
	console.log(test12 === 12)

	let test13 = (a => ++a)(12)
	console.log(test13 === 13)

	let test14 = (a) => {return ++a}
	console.log(test14(13) === 14)

	let test15 = a => {return ++a}
	console.log(test15(14) === 15)
}
