
{
	let test11 = ({a}, ...rest) =>([a, rest[0]])
	console.log(test11({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test12 = ({a}, ...rest) => ([a, rest[0]])
	console.log(test12({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test13 = ({a}, ...rest) =>[a, rest[0]]
	console.log(test13({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test14 = ({a}, ...rest) => [a, rest[0]]
	console.log(test14({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test15 = ({a}, ...rest) =>
		[a, rest[0]]
	console.log(test15({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test16 = ({a}, ...rest) => [
		a, rest[0]
	]
	console.log(test16({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test17 = ({a}, ...rest) => (//some comments 1
		[a, rest[0]]
	/*some comments 2*/)
	console.log(test17({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))
}

{
	let test21 = ({a}, ...rest) =>(1, [a, rest[0]])
	console.log(test21({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test22 = ({a}, ...rest) => (2, [a, rest[0]])
	console.log(test22({a: 1}, 2, 3, 4).join("|") === [1, 2].join("|"))

	let test23 = ({a}, ...rest) =>3+a+rest[0]+rest[1],[a3, b3] = [3, 4]
	console.log(test23({a: 1}, 2, 3, 4) === 9, a3 === 3, b3 === 4)

	let test24 = ({a}, ...rest) => 4,[a4, b4] = [3, 4]
	console.log(test24({a: 1}, 2, 3, 4) === 4, a4 === 3, b4 === 4)

	let test25 = ({a}, ...rest) => 4,[a5, b5] = [3, 4]
	console.log(test25({a: 1}, 2, 3, 4) === 4, a5 === 3, b5 === 4)

	let test26 = ({a}, ...rest) =>
		4,[a6, b6] = [3, 4]
	console.log(test26({a: 1}, 2, 3, 4) === 4, a6 === 3, b6 === 4)

	let test27 = ({a}, ...rest) => (//some comments 1
		4
	/*some comments 2*/),[a7, b7] = [3, 4]
	console.log(test27({a: 1}, 2, 3, 4) === 4, a7 === 3, b7 === 4)
}

{
	let test31 = () =>([1, 2])
	console.log(test31().join("|") === [1, 2].join("|"))

	let test32 = () => ([1, 2])
	console.log(test32().join("|") === [1, 2].join("|"))

	let test33 = () =>[1, 2]
	console.log(test33().join("|") === [1, 2].join("|"))

	let test34 = () => [1, 2]
	console.log(test34().join("|") === [1, 2].join("|"))

	let test35 = () =>
		[1, 2]
	console.log(test35().join("|") === [1, 2].join("|"))

	let test36 = () => (//some comments 1
		[1, 2]
	/*some comments 2*/)
	console.log(test36().join("|") === [1, 2].join("|"))

	let test37 = () => (//some comments 1
		[1, 2]
	/*some comments 2*/),[a7, b7] = [3, 4]
	console.log(test37().join("|") === [1, 2].join("|"), a7 === 3, b7 === 4)

	let test38 = /*com1*/(/*com2*/)/*com3*/=>/*com4*/(//some comments 5
		/*com6*/[1, 2]//com7
	/*some comments 8*/),[a8, b8] = [3, 4]
	console.log(test38().join("|") === [1, 2].join("|"), a8 === 3, b8 === 4)
}

{
	let obj = {
		test: function({a}, ...rest) {
			let test = ([a, b, c, d]) => a + b +
				c + d
			return a + test([...rest, 5]);//1 + 14
		}
	}
	console.log(obj.test({a: 1}, ...[2, 3, 4]) === 15)
}

{
	let obj = {
		test: ({a}, ...rest) => {
			return (
				[a, ...(([a, b, c, d]) => [a, b,
					c]
				)([...rest, 5])]
			)
		}
	}
	console.log(obj.test({a: 1}, 2, 3, 4).join("|") === [1, 2, 3, 4].join("|"))
}

{
	let obj = {
		test: ({a}, ...rest) => {
			return [a, ...(([a, b, c, d]) => [a, b,
					c]
				)([...rest, 5])]
		}
	}
	console.log(obj.test({a: 1}, 2, 3, 4).join("|") === [1, 2, 3, 4].join("|"))
}
