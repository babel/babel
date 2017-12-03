
var x = 0, y = 0, z = 0;

{// object destructuring simple - one property
	let a = 'a' + ++x;

	let {[a]: a1} = {[a]: x};
	console.log(a1 === x);
}

{// object destructuring simple - two properties
	let a = 'a' + ++x, b = 'b' + ++y;

	let {[a]: a1, [b]: b1} = {[a]: x, [b]: y};
	console.log(a1 === x, b1 === y);
}

{// object destructuring simple - three properties
	let a = 'a' + ++x, b = 'b' + ++y, c = 'c' + ++z;

	let {[a]: a1, [b]: b1, [c]: c1} = {[a]: x, [b]: y, [c]: z};
	console.log(a1 === x, b1 === y, c1 === z);
}

{// array destructuring simple - one property
	let i0 = ++x;

	let [a1] = {[0]: i0};
	console.log(a1 === x);
}

{// array destructuring simple - two properties
	let i0 = ++x, i1 = ++y;

	let [a1, b1] = {[0]: i0, [1]: i1};
	console.log(a1 === x, b1 === y);
}

{// array destructuring simple - three properties
	let i0 = ++x, i1 = ++y, i2 = ++z;

	let [a1, b1, c1] = {[0]: i0, [1]: i1, [2]: i2};
	console.log(a1 === x, b1 === y, c1 === z);
}

// --------------------------------------------

{// function object destructuring - default value
	let a = 'a' + ++x, b = 'b' + ++y, c = 'c' + ++z;

	let test = function ({[a]: a1, [b]: b1, [c]: c1} = {[a]: x, [b]: y, [c]: z}) {
		return [a1, b1, c1];
	}
	console.log(test().join('|') === [x, y, z].join('|'));
}

{// function array destructuring - default value
	let i0 = ++x, i1 = ++y, i2 = ++z, i3 = 4;

	let test = function ([a, b, c, d = i3] = {[0]: i0, [1]: i1, [2]: i2}) {
		return [a, b, c, d];
	}
	console.log(test().join('|') === [x, y, z, i3].join('|'))
}

// --------------------------------------------

{// destructuring object - declaration default value
	let a = 'a' + ++x, b = 'b' + ++y, c = 'c' + ++z;
	let i0 = x, i1 = y, i2 = z;

	let {prop: obj = {[i0]: x, [i1]: y, [i2]: z, [a]: x, [b]: y, [c]: z}} = {};
	console.log(obj[i0] === x, obj[i1] === y, obj[i2] === z, obj[a] === x, obj[b] === y, obj[c] === z);
}

{// destructuring array - declaration default value
	let a = 'a' + ++x, b = 'b' + ++y, c = 'c' + ++z;
	let i0 = x, i1 = y, i2 = z;

	let [obj = {[i0]: x, [i1]: y, [i2]: z, [a]: x, [b]: y, [c]: z}] = [];
	console.log(obj[i0] === x, obj[i1] === y, obj[i2] === z, obj[a] === x, obj[b] === y, obj[c] === z);
}
