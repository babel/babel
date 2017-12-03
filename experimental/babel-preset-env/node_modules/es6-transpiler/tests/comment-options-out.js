"use strict";
/*es6-transpiler let-const: false*/
function test_let1() {
	let a = 1, b = 2;

	{/*es6-transpiler let-const:true*/
		var a$0 = 10, b$0 = 20;
		console.log(a$0 === 10, b$0 === 20);
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
	var a = 1, b = 2;

	/*es6-transpiler rest:true*/
	{
		var a$1 = 10, b$1 = 20;
	}

	{/*es6-transpiler rest:false, let-const: false*/
		let a = 100, b = 200;
		{
			let a = 100, b = 200;

			/*es6-transpiler rest:true, let-const: true*/

			{
				var a$2 = 100, b$2 = 200;
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
			var a$3 = 100, b$3 = 200;
		}
	}
	/*es6-transpiler ololo:true*/
	{
		var a$4 = 100, b$4 = 200;
	}
}
test_let2();

function test_let3() {
	var a = 1, b = 2;

	/*es6-transpiler let-const:true*/
	{
		var a$5 = 10, b$5 = 20;
		console.log(a$5 === 10, b$5 === 20);
	}

	{
		var a$6 = 100, b$6 = 200;
		console.log(a$6 === 100, b$6 === 200);
		{/*es6-transpiler let-const:false*/
			let a = 100, b = 200;
			console.log(a === 100, b === 200);
		}
	}

	console.log(a === 1, b === 2);
}
test_let3();