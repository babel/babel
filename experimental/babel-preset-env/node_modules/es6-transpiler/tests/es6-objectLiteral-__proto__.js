
let obj1 = {__proto__: {a: 123}};
console.log(Object.keys(obj1).length === 0, obj1.a === 123);
{
	let obj1 = {b: 1, __proto__: {a: 123}};
	console.log(Object.keys(obj1).length === 1, obj1.a === 123, obj1.b === 1);
}
{
	let obj1 = {__proto__: {a: 123}, b: 1};
	console.log(Object.keys(obj1).length === 1, obj1.a === 123, obj1.b === 1);
}
{
	let obj1 = {b: 1, __proto__: {a: 123}, c: 2};
	console.log(Object.keys(obj1).length === 2, obj1.a === 123, obj1.b === 1, obj1.c === 2);
}

let obj2 = {'__proto__': {'a': 123}};
console.log(Object.keys(obj2).length === 0, obj2.a === 123);
{
	let obj2 = {'b': 1, '__proto__': {'a': 123}};
	console.log(Object.keys(obj2).length === 1, obj2['a'] === 123, obj2['b'] === 1);
}
{
	let obj2 = {'__proto__': {'a': 123}, 'b': 1};
	console.log(Object.keys(obj2).length === 1, obj2['a'] === 123, obj2['b'] === 1);
}
{
	let obj2 = {'b': 1, __proto__: {'a': 123}, 'c': 2};
	console.log(Object.keys(obj2).length === 2, obj2['a'] === 123, obj2['b'] === 1, obj2['c'] === 2);
}

let obj3 = {"__proto__": {['a']: 123}};
console.log(Object.keys(obj3).length === 0, obj3.a === 123);
{
	let obj3 = {'b': 1, "__proto__": {'a': 123}};
	console.log(Object.keys(obj3).length === 1, obj3['a'] === 123, obj3['b'] === 1);
	{
		let obj3 = {['b']: 1, "__proto__": {['a']: 123}};
		console.log(Object.keys(obj3).length === 1, obj3['a'] === 123, obj3['b'] === 1);
	}
}
{
	let obj3 = {"__proto__": {'a': 123}, 'b': 1};
	console.log(Object.keys(obj3).length === 1, obj3['a'] === 123, obj3['b'] === 1);
	{
		let obj3 = {"__proto__": {['a']: 123}, ['b']: 1};
		console.log(Object.keys(obj3).length === 1, obj3['a'] === 123, obj3['b'] === 1);
	}
}
{
	let obj3 = {'b': 1, "__proto__": {'a': 123}, 'c': 2};
	console.log(Object.keys(obj3).length === 2, obj3['a'] === 123, obj3['b'] === 1, obj3['c'] === 2);
	{
		let obj3 = {['b']: 1, "__proto__": {'a': 123}, 'c': 2};
		console.log(Object.keys(obj3).length === 2, obj3['a'] === 123, obj3['b'] === 1, obj3['c'] === 2);
	}
	{
		let obj3 = {['b']: 1, "__proto__": {['a']: 123}, ['c']: 2};
		console.log(Object.keys(obj3).length === 2, obj3['a'] === 123, obj3['b'] === 1, obj3['c'] === 2);
	}
	{
		let obj3 = {'b': 1, "__proto__": {'a': 123}, ['c']: 2};
		console.log(Object.keys(obj3).length === 2, obj3['a'] === 123, obj3['b'] === 1, obj3['c'] === 2);
	}
}

let obj4 = {__proto__: {['a']: 123}};
console.log(Object.keys(obj4).length === 0, obj4.a === 123);
{
	let obj4 = {'b': 1, __proto__: {'a': 123}};
	console.log(Object.keys(obj4).length === 1, obj4['a'] === 123, obj4['b'] === 1);
	{
		let obj4 = {['b']: 1, __proto__: {['a']: 123}};
		console.log(Object.keys(obj4).length === 1, obj4['a'] === 123, obj4['b'] === 1);
	}
}
{
	let obj4 = {__proto__: {'a': 123}, 'b': 1};
	console.log(Object.keys(obj4).length === 1, obj4['a'] === 123, obj4['b'] === 1);
	{
		let obj4 = {__proto__: {['a']: 123}, ['b']: 1};
		console.log(Object.keys(obj4).length === 1, obj4['a'] === 123, obj4['b'] === 1);
	}
}
{
	let obj4 = {'b': 1, __proto__: {'a': 123}, 'c': 2};
	console.log(Object.keys(obj4).length === 2, obj4['a'] === 123, obj4['b'] === 1, obj4['c'] === 2);
	{
		let obj4 = {['b']: 1, __proto__: {'a': 123}, 'c': 2};
		console.log(Object.keys(obj4).length === 2, obj4['a'] === 123, obj4['b'] === 1, obj4['c'] === 2);
	}
	{
		let obj4 = {['b']: 1, __proto__: {['a']: 123}, ['c']: 2};
		console.log(Object.keys(obj4).length === 2, obj4['a'] === 123, obj4['b'] === 1, obj4['c'] === 2);
	}
	{
		let obj4 = {'b': 1, __proto__: {'a': 123}, ['c']: 2};
		console.log(Object.keys(obj4).length === 2, obj4['a'] === 123, obj4['b'] === 1, obj4['c'] === 2);
	}
}

let obj5 = {['__proto__']: {'a': 123}};
console.log(Object.keys(obj5).length === 1, obj5.a === void 0);
