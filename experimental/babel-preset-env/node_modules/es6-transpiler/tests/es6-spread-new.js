function test() {

	function test(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	{
		let T = new test(...[11, 22, 33]);
		console.log( T.a === 11, T.b === 22, T.c === 33 )
	}

	function test1(_arr, ...rest) {

		let arr = [6, ...[..._arr], ...rest];

		console.log(arr.join("|") === "6|3|34|35|36|37")

		{
			let T = new test(...arr);
			console.log( T.a === 6, T.b === 3 )
		}

		{
			let arr = void 0;
			let T = new test(... (arr || [1, 2]));
			console.log( T.a === 1, T.b === 2 )
		}

		{
			let arr = void 0;
			let T = new test(1, ... ( arr || [2, 3 ] ) );
			console.log( T.a === 1, T.b === 2 )
		}

		{
			let T = new test(1, ...(0 ? '' : [2, 3] ) );
			console.log( T.a === 1, T.b === 2 )
		}

		{
			let T = new test(9, ...arr);
			console.log( T.a === 9, T.b === 6, T.c === 3 )
		}

		{
			let T = new /*1*/(/*2*/function(a, b, c){ this.a = a;this.b = b;this.c = c; }/*3*/)/*4*/(/*5*/9, ...arr/*6*/)/*7*/;
			console.log( T.a === 9, T.b === 6, T.c === 3 )
		}

		{
			let obj = {
				test: test
			};
			let T = new obj.test(18, ...arr);
			console.log( T.a === 18, T.b === 6, T.c === 3 )
		}

		{
			let obj = {
				test: test
			};
			let T = new obj.test(...arr);
			console.log( T.a === 6, T.b === 3 )
		}

		{
			let obj = {
				obj: {
					test: test
				}
			};
			let T = new obj.obj.test(27, ...arr);
			console.log( T.a === 27, T.b === 6, T.c === 3 )
		}

		{
			let T = new test(...[...(function(){ let a = 0; {let b = 1; a+=b;} {let b = 2; a+=b;} return [a] })(), ...arr]);
			console.log( T.a === 3, T.b === 6, T.c === 3 )
		}

		{
			let arr = [1, 2, 3];
			let T = new test(...[...arr]);
			console.log( T.a === 1, T.b === 2, T.c === 3 )
		}

		{
			let arr = [1, 2, 3];
			let T = new test(...[...(arr)]);
			console.log( T.a === 1, T.b === 2, T.c === 3 )
		}

		{
			let arr = [1, 2];
			let T = new test(...[...arr, ...arr]);
			console.log( T.a === 1, T.b === 2, T.c === 1 )
		}

		{
			let arr = [1, 2];
			let T = new test(...[...(arr), ...(arr)]);
			console.log( T.a === 1, T.b === 2, T.c === 1 )
		}

		{// return another object
			let anotherConstructor = function(a, b, c) {
				return {a, b, c};
			};
			let T = new anotherConstructor(...arr);
			console.log( T.a === 6, T.b === 3, !(T instanceof anotherConstructor) );
		}

		{// cascad
			let anotherConstructor = function(a, b, c) {
				return {a, b, c};
			};
			let T = new test(new anotherConstructor(new test(1, ...arr), ...arr), ...arr);
			console.log( T instanceof test, T.a && T.a.a && T.a.a.a === 1, T.a && T.a.a && T.a.a.b === 6, T.a && T.a.a && T.a.a.c === 3, T.a && T.a.b === 6, T.a && T.a.c === 3, T.b === 6, T.c === 3);
		}

	}
	test1([3], 34, 35, 36, 37);

}
test()
