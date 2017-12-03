function test() {


	function test(a = 0, b = 0, c = 0, d = "") {
		return (this && this.TEST ? "THIS|" : "") + a + "|" + b + "|" + c + d;
	}

	let arr = [6, ...[3]];

	{
		let T = test(8, 6, 4, ...[]);
		console.log( T === "8|6|4" )
	}

	{
		let arr = [66, ...[33]];
		let T = test(...arr);
		console.log( T === "66|33|0" )
	}

	{
		let T = test(9, ...arr);
		console.log( T === "9|6|3" )
	}

	{
		let obj = {
			test: test
			, TEST: true
		};
		let T = obj.test(18, ...arr);
		console.log( T === "THIS|18|6|3" )
		console.log( obj.test(19, ...arr) === "THIS|19|6|3" )
	}

	{
		let obj = {
			obj: {
				test: test
				, TEST: true
			}
		};
		let T = obj.obj.test(27, ...arr);
		console.log( T === "THIS|27|6|3" )
		console.log( obj.obj.test(28, ...arr) === "THIS|28|6|3" )
	}

	{
		let T = test(...[...(function(){ let a = 0; {let b = 1; a+=b;} {let b = 2; a+=b;} return [a + 1] })(), ...(1,arr), ...(2,arr.slice())/*<*/]/*>*/);
		console.log( T === "4|6|36" )
	}

	{
		let arr = [1, 2, 3];
		let T = test(...[...arr]);
		console.log( T == "1|2|3" )
	}

	{
		let arr = [1, 2, 3];
		let T = test(...[...(arr)]);
		console.log( T == "1|2|3" )
	}

	{
		let arr = [1, 2];
		let T = test(...[...arr, ...arr]);
		console.log( T == "1|2|12" )
	}

	{
		let arr = [1, 2];
		let T = test(...[...(arr), ...(arr)]);
		console.log( T == "1|2|12" )
	}

	{
		let T = (function(r){
			return r;
		})(...[[9, 8, 7], 2, 3]);
		console.log(T.join("|") == "9|8|7" )
	}
}

test();
