
{
	// simple / body in head and body in tail
	let result;
	result = [ (x+y+z) for (x of ['a', 'b', 'c']) for (y of [1, 2, 3]) for (z of [9, 8, 7]) ];
	console.log(result.join(",") === "a19,a18,a17,a29,a28,a27,a39,a38,a37,b19,b18,b17,b29,b28,b27,b39,b38,b37,c19,c18,c17,c29,c28,c27,c39,c38,c37");

	result = [ for (x of ['a', 'b', 'c']) for (y of [1, 2, 3]) for (z of [9, 8, 7]) (x+y+z)];
	console.log(result.join(",") === "a19,a18,a17,a29,a28,a27,a39,a38,a37,b19,b18,b17,b29,b28,b27,b39,b38,b37,c19,c18,c17,c29,c28,c27,c39,c38,c37");
}

{
	// for-of with variables / body in head and body in tail
	let arr = [1, 2, 3];
	let arr2 = [5, 6, 7];

	let result;
	result = [ for(x of arr) for(y of arr2) if(x % 2) (x * 2 * y) ];
	console.log(result.join("|") === [10, 12, 14, 30, 36, 42].join("|"));
	
	result = [ (x * 2 * y) for(x of arr) for(y of arr2) if(x % 2) ];
	console.log(result.join("|") === [10, 12, 14, 30, 36, 42].join("|"));
}

{
	// for-of and destrucuring
	let arr = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {b: 999}];

	let result;
	result = [ ("_" + a) for({a, b} of arr) if(b !== 999) ];
	console.log(result.join("|") === ["_1", "_2", "_3", "_4", "_5"].join("|"));
}

{
	// for-of and destrucuring / inner changes
	let arr = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {b: 999}];

	let result;
	result = [ ((
		function (a) {
			let obj = {
				a
				, res() "_" + this.a
			}
			return obj.res()
		}
		)(a)) for({a, b} of arr) if(((b)=>b !== 999)(b)) ];
	console.log(result.join("|") === ["_1", "_2", "_3", "_4", "_5"].join("|"));
}

{
	// for-of and destrucuring with default values
	let arr = [ {a: 'a1', b: 'b1'}, {b: 'b2', c: 'c3'}, {c: 'c3', a: 'a3'}, {a: 'a4', b: 'b4'}, {b: 'b5', c: 'c5'}, {c: 'c6', a: 'a6'}];

	let result;
	result = [ (A + B + C) for({a: A = 'A', b: B = 'B', c: C = 'C'} of arr) ];
	console.log(result.join("|") === ["a1b1C","Ab2c3","a3Bc3","a4b4C","Ab5c5","a6Bc6"].join("|"));
}

{
	// simple / this using
	let obj = {
		arr: [ 1, 2, 3, 4, 5 ]
		, arr2: ["a", "b", "c"]
		, getResult() {
			return [ (x + y) for(x of this.arr) for(y of this.arr2) ]
		}
	}

	let result;
	result = obj.getResult();
	console.log(result.join("|") === ["1a","1b","1c","2a","2b","2c","3a","3b","3c","4a","4b","4c","5a","5b","5c"].join("|"));
}
