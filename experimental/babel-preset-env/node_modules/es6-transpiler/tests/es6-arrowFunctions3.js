"use strict";

let a = 1;
{
	let a = 2;//
}

{
	let test = {
		test: ()=>1
	}
	console.log(test.test() === 1)

	{
		let test = {
			test: ({a}, ...rest)=>a+rest[0]
		}
		console.log(test.test({a: 1}, 2, 999) === 3)
	}

	(function() {

		let test = {
			test: ()=>1+this.test
		}
		console.log(test.test() === 101)

		{
			let test = {
				test: ({a}, ...rest)=>a+rest[0]+this.test
			}
			console.log(test.test({a: 1}, 2, 999) === 103)
		}

	}).call({test: 100})
}

{
	let test = {
		test: ()=>(2)
	}
	console.log(test.test() === 2)

	{
		let test = {
			test: ({a}, ...rest)=>(a+rest[0])
		}
		console.log(test.test({a: 2}, 2, 999) === 4)
	}

	(function() {

		let test = {
			test: ()=>(2+this.test)
		}
		console.log(test.test() === 102)

		{
			let test = {
				test: ({a}, ...rest)=>(a+rest[0]+this.test)
			}
			console.log(test.test({a: 2}, 2, 999) === 104)
		}

	}).call({test: 100})
}

{
	let test = {
		test: ()=>(1, 3)
	}
	console.log(test.test() === 3)

	{
		let test = {
			test: ({a}, ...rest)=>(1, a+rest[0])
		}
		console.log(test.test({a: 3}, 2, 999) === 5)
	}

	(function() {

		let test = {
			test: ()=>(1, 3+this.test)
		}
		console.log(test.test() === 103)

		{
			let test = {
				test: ({a}, ...rest)=>(1, a+rest[0]+this.test)
			}
			console.log(test.test({a: 3}, 2, 999) === 105)
		}

	}).call({test: 100})
}

{
	let test = {
		test: ()=>([3, 4])
	}
	console.log(test.test().join("|") === [3, 4].join("|"))

	{
		let test = {
			test: ({a}, ...rest)=>([a, rest[0]])
		}
		console.log(test.test({a: 4}, 2, 999).join("|") === [4, 2].join("|"))
	}

	(function() {

		let test = {
			test: ()=>([3, 4, this.test])
		}
		console.log(test.test().join("|") === [3, 4, 100].join("|"))

		{
			let test = {
				test: ({a}, ...rest)=>([a, rest[0], this.test])
			}
			console.log(test.test({a: 4}, 2, 999).join("|") === [4, 2, 100].join("|"))
		}

	}).call({test: 100})
}

{
	let test = {
		test: ()=>(
			5
		)
	}
	console.log(test.test() === 5)

	{
		let test = {
			test: ({a}, ...rest)=>(
				a+rest[0]
			)
		}
		console.log(test.test({a: 5}, 2, 999) === 7)
	}

	(function() {

		let test = {
			test: ()=>(
				5 + this.test
			)
		}
		console.log(test.test() === 105)

		{
			let test = {
				test: ({a}, ...rest)=>(
					a+rest[0]+this.test
				)
			}
			console.log(test.test({a: 5}, 2, 999) === 107)
		}

	}).call({test: 100})
}

{
	let test = {
		test: ()=>(
			[5, 6]
		)
	}
	console.log(test.test().join("|") === [5, 6].join("|"))

	{
		let test = {
			test: ({a}, ...rest)=>(
				[a, rest[0]]
			)
		}
		console.log(test.test({a: 6}, 2, 999).join("|") === [6, 2].join("|"))
	}

	(function() {

		let test = {
			test: ()=>(
				[5, 6, this.test]
			)
		}
		console.log(test.test().join("|") === [5, 6, 100].join("|"))

		{
			let test = {
				test: ({a}, ...rest)=>(
					[a, rest[0], this.test]
				)
			}
			console.log(test.test({a: 6}, 2, 999).join("|") === [6, 2, 100].join("|"))
		}

	}).call({test: 100})
}

{
	let test = {
		test: /*com1*/(/*com2*/)/*com3-1*/=>/*com3-2*/(//com4
			/*com5*/7//com6
		/*com7*/)//com8
	}
	console.log(test.test() === 7)

	{
		let test = {
			test: /*com1*/(/*com2*/{a}/*com3-1*/,/*com3-2*/...rest/*com3-3*/)/*com3-4*/=>/*com3-5*/(//com4
				/*com5*/a+rest[0]//com6
			/*com7*/)//com8
		}
		console.log(test.test({a: 7}, 2, 999) === 9)
	}

	(function() {

		let test = {
			test: /*com1*/(/*com2*/)/*com3-1*/=>/*com3-2*/(//com4
				/*com5*/7+this.test//com6
			/*com7*/)//com8
		}
		console.log(test.test() === 107)

		{
			let test = {
				test: /*com1*/(/*com2*/{a}/*com3-1*/,/*com3-2*/...rest/*com3-3*/)/*com3-4*/=>/*com3-5*/(//com4
					/*com5*/a+rest[0]+this.test//com6
				/*com7*/)//com8
			}
			console.log(test.test({a: 7}, 2, 999) === 109)
		}

	}).call({test: 100})
}

{
	let test = {
		test: /*com1*/(/*com2*/)/*com3-1*/=>/*com3-2*/(//com4
			/*com5*/[7, 8]//com6
		/*com7*/)//com8
	}
	console.log(test.test().join("|") === [7, 8].join("|"))

	{
		let test = {
			test: /*com1*/(/*com2*/{a}/*com3-1*/,/*com3-2*/...rest/*com3-3*/)/*com3-4*/=>/*com3-5*/(//com4
				/*com5*/[a, rest[0]]//com6
			/*com7*/)//com8
		}
		console.log(test.test({a: 8}, 2, 999).join("|") === [8, 2].join("|"))
	}

	(function() {

		let test = {
			test: /*com1*/(/*com2*/)/*com3-1*/=>/*com3-2*/(//com4
				/*com5*/[7, 8, this.test]//com6
			/*com7*/)//com8
		}
		console.log(test.test().join("|") === [7, 8, 100].join("|"))

		{
			let test = {
				test: /*com1*/(/*com2*/{a}/*com3-1*/,/*com3-2*/...rest/*com3-3*/)/*com3-4*/=>/*com3-5*/(//com4
					/*com5*/[a, rest[0], this.test]//com6
				/*com7*/)//com8
			}
			console.log(test.test({a: 8}, 2, 999).join("|") === [8, 2, 100].join("|"))
		}

	}).call({test: 100})
}

{
	let test = {
		test: /*com1*/(/*com2*/)/*com3-1*/=>/*com3-2*/(1,//com4
			/*com5*/9//com6
		/*com7*/)//com8
	}
	console.log(test.test() === 9)

	{
		let test = {
			test: /*com1*/(/*com2*/{a}/*com3-1*/,/*com3-2*/...rest/*com3-3*/)/*com3-4*/=>/*com3-5*/(1,//com4
				/*com5*/a+rest[0]//com6
			/*com7*/)//com8
		}
		console.log(test.test({a: 9}, 2, 999) === 11)
	}

	(function() {

		let test = {
			test: /*com1*/(/*com2*/)/*com3-1*/=>/*com3-2*/(1,//com4
				/*com5*/9+this.test//com6
			/*com7*/)//com8
		}
		console.log(test.test() === 109)

		{
			let test = {
				test: /*com1*/(/*com2*/{a}/*com3-1*/,/*com3-2*/...rest/*com3-3*/)/*com3-4*/=>/*com3-5*/(1,//com4
					/*com5*/a+rest[0]+this.test//com6
				/*com7*/)//com8
			}
			console.log(test.test({a: 9}, 2, 999) === 111)
		}

	}).call({test: 100})
}
