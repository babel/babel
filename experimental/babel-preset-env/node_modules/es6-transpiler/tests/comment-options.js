"use strict";
/*es6-transpiler let-const: false*/
function test_let1() {
	let a = 1, b = 2;

	{/*es6-transpiler let-const:true*/
		let a = 10, b = 20;
		console.log(a === 10, b === 20);
	}

	{
		let a = 100, b = 200;
		console.log(a === 100, b === 200);
	}

	console.log(a === 1, b === 2);
}
test_let1();
/*es6-transpiler rest:false, let-const: true*/
function test_let2() {
	let a = 1, b = 2;

	/*es6-transpiler rest:true*/
	{
		let a = 10, b = 20;
	}

	{/*es6-transpiler rest:false, let-const: false*/
		let a = 100, b = 200;
		{
			let a = 100, b = 200;

			/*es6-transpiler rest:true, let-const: true*/

			{
				let a = 100, b = 200;
			}

			/*es6-transpiler rest:false, let-const: false*/
			{
				let a = 100, b = 200;
			}
		}
		/*es6-transpiler rest:false, let-const: false*/
		{
			let a = 100, b = 200;
		}
		/*es6-transpiler rest:true, let-const: true*/
		{
			let a = 100, b = 200;
		}
	}
	/*es6-transpiler ololo:true*/
	{
		let a = 100, b = 200;
	}
}
test_let2();

function test_let3() {
	let a = 1, b = 2;

	/*es6-transpiler let-const:true*/
	{
		let a = 10, b = 20;
		console.log(a === 10, b === 20);
	}

	{
		let a = 100, b = 200;
		console.log(a === 100, b === 200);
		{/*es6-transpiler let-const:false*/
			let a = 100, b = 200;
			console.log(a === 100, b === 200);
		}
	}

	console.log(a === 1, b === 2);
}
test_let3();