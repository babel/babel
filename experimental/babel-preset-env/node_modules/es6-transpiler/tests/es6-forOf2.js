
var output = [];
let i = 0;
{
	let arr = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {b: 999}];
	let output = [];

	for( let {a:f = 9} of arr )
		1,output.push(f),2

	console.log(output.join("|") === [1, 2, 3, 4, 9].join("|"))
}

{
	let arr,f;
}

{
	output = [];
	let arr = [1, 2, 3];
	for(let f of arr ) {
		output.push(f);
	};
	console.log(output.join("|") === "1|2|3")
}


{
	i = 0;
	output = [];
	let arr = [1, 2, 3];
	for(let f of  ( arr.push(i++), arr.push(i++), arr.push(i++), arr ) ) {
		output.push(f);
	};
	console.log(output.join("|") === [1, 2, 3, 0, 1, 2].join("|"), arr.join("|") === [1, 2, 3, 0, 1, 2].join("|"))
}


{
	output = [];
	let arr = [{a: 1}, {a: 2}, {a: 3}];
	for(let {a: b} of arr ) for(let {a} of arr ) {
		output.push(a + "|" + b);
	};
	let result = [].concat.apply([], arr.map(function(b) {b = b.a;
		return arr.map(function(a) {a = a.a;
			return a + "|" + b;
		});
	}));
	console.log(output.join("|") === result.join("|"))
}

{
	output = [];
	let arr1 = [{a: 1}, {a: 2}, {a: 3}];
	let arr2 = [{y: 1, b: 'a'}, {y: 2, b: 'b'}, {y: 3, b: 'c'}];
	for( var {a} of arr1 ) for ( let {y, b: a1} of arr2){
		output.push(a + a1 + y);
	}
	let result = [].concat.apply([], arr1.map(function(a) {a = a.a;
		return arr2.map(function(b) {var y = b.y, a1 = b.b;
			return a + a1 + y;
		});
	}));
	console.log(output.join("|") === result.join("|"))
}

{
	let arr,f;
}
