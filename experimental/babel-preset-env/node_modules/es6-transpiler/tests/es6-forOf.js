
let output;

{
	let a1 = [1], b2 = [];
	for( let x of a1 ) {
		b2.push(function(){ return x })
	}
	console.log(b2.map(function(a){ return a() }).join("|") === a1.join("|"))
}

{
	output = [];
	let arr = [1, 2, 3]
	for(let f of arr) {
		output.push(f)
	}
	console.log(output.join("|") === arr.join("|"))
}

{output = [];
	for(let f of [1, 2, 3]) {
		output.push(f)
	}
console.log(output.join("|") === [1, 2, 3].join("|"))}

{
	output = [];for(var test of ( function(x) {return [x + 1, x + 2, x + 3]})(1) ) {
		output.push(test)
	};console.log(output.join("|") === [2, 3, 4].join("|"))
}

{
	let output = [];
	let arr = [], i = 100;
	for(let f of ( arr.push(i++), arr.push(i++), arr.push(i++), arr ) ) {
		output.push(function() {
			return f;
		})
	};
	console.log(output.map((v)=>v()).join("|") === arr.join("|"))
}

{
	output = [];
	let arr = [], i = 100;
	for(let f of ( arr.push(i++), arr.push(i++), arr.push(i++), arr ) ) {
		output.push(function() {
			return f;
		})
	};
	console.log(output.map((v)=>v()).join("|") === arr.join("|"))
}

{
	output = [];
	for(let a of ["a", "b", "c"] ) {
		for(let b of [1, 2, 3] ) {
			for(let c of ["-", "=", "/"] ) {
				output.push(a + b + c);
			};
		};
	};
	console.log(output.join("|") === "a1-|a1=|a1/|a2-|a2=|a2/|a3-|a3=|a3/|b1-|b1=|b1/|b2-|b2=|b2/|b3-|b3=|b3/|c1-|c1=|c1/|c2-|c2=|c2/|c3-|c3=|c3/")
}
