var a = 'a1', b = 'b1', c = 'c1';
var i0 = 0, i1 = 1, i2 = 2;

{// object destructuring simple - one property
	let {a1} = {[a]: 1};
	console.log(a1 === 1);
}

{// object destructuring simple - two properties
	let {a1, b1} = {[a]: 1, [b]: 2};
	console.log(a1 === 1, b1 === 2);
}

{// object destructuring simple - three properties
	let {a1, b1, c1} = {[a]: 1, [b]: 2, [c]: 3};
	console.log(a1 === 1, b1 === 2, c1 === 3);
}

{// array destructuring simple - one property
	let [a1] = {[i0]: 1};
	console.log(a1 === 1);
}

{// array destructuring simple - two properties
	let [a1, b1] = {[i0]: 1, [i1]: 2};
	console.log(a1 === 1, b1 === 2);
}

{// array destructuring simple - three properties
	let [a1, b1, c1] = {[i0]: 1, [i1]: 2, [i2]: 3};
	console.log(a1 === 1, b1 === 2, c1 === 3);
}

// --------------------------------------------

{// function object destructuring - default value
	let test = function ({a1, b1, c1} = {[a]: 1, [b]: 2, [c]: 3}) {
		return [a1, b1, c1];
	}
	console.log(test().join('|') === [1, 2, 3].join('|'));
}

{// function array destructuring - default value
	let test = function ([a, b, c, d = 4] = {[i0]: 1, [i1]: 2, [i2]: 3}) {
		return [a, b, c, d];
	}
	console.log(test().join('|') === [1, 2, 3, 4].join('|'))
}

// --------------------------------------------

{// destructuring object - declaration default value
	let {prop: obj = {[i0]: 1, [i1]: 2, [i2]: 3, [a]: 1, [b]: 2, [c]: 3}} = {};
	console.log(obj[i0] === 1, obj[i1] === 2, obj[i2] === 3, obj[a] === 1, obj[b] === 2, obj[c] === 3);
}

{// destructuring array - declaration default value
	let [obj = {[i0]: 1, [i1]: 2, [i2]: 3, [a]: 1, [b]: 2, [c]: 3}] = [];
	console.log(obj[i0] === 1, obj[i1] === 2, obj[i2] === 3, obj[a] === 1, obj[b] === 2, obj[c] === 3);
}