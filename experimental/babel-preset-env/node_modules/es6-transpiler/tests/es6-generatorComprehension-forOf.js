
let isGenerator = function(a) {
	return a + '' === '[object Generator]' && typeof a.next === 'function' && typeof a.throw === 'function';
};

{// result object
	let arr1 = []
	let gen = ( a for (a of arr1) )

	let firstValue = gen.next();

	console.log(typeof firstValue === 'object' && firstValue && 'value' in firstValue && typeof firstValue.done === 'boolean');
}

{// simple
	let arr1 = [1, 2, 3]
	let gen = ( a for (a of arr1) )

	let out = [];
	for( let a of gen ) out.push(a)

	let result = arr1;

	console.log(isGenerator(gen), out.length === result.length, out.join("|") === result.join("|"))
}

{// simple with filter
	let arr1 = [1, 2, 3]
	let gen = ( a for (a of arr1) if (a != 2) )

	let out = [];
	for( let a of gen ) out.push(a)

	let result = arr1.filter(function(a) {
		return a != 2;
	});

	console.log(isGenerator(gen), out.length === result.length, out.join("|") === result.join("|"))
}

{// complex
	let arr1 = [1, 2, 3], arr2 = ['a', 'b', 'c']
	let gen = ( a + b for (a of arr1) for (b of arr2) )

	let out = [];
	for( let a of gen ) out.push(a)
	
	let result = [].concat.apply([], arr1.map(function(a) {
		return arr2.map(function(b) {
			return a + b
		});
	}));

	console.log(isGenerator(gen), out.length === result.length, out.join("|") === result.join("|"))
}

{// complex with filter
	let arr1 = [1, 2, 3], arr2 = ['a', 'b', 'c']
	let gen = ( a + b for (a of arr1) for (b of arr2) if (a != 2 && b != 'b') )

	let out = [];
	for( let a of gen ) out.push(a)

	let result = [].concat.apply([], arr1.map(function(a) {
		return arr2.map(function(b) {
			if (a != 2 && b != 'b') {
				return a + b
			}
			return void 0;
		});
	})).filter(function(r){ return r !== void 0 });

	console.log(isGenerator(gen), out.length === result.length, out.join("|") === result.join("|"))
}
