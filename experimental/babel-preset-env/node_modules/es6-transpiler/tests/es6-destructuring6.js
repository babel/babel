
function test1_1({a = 1}) {
	{
		let a = 2;
	}
	return 1 === a
}
console.log(test1_1({}))

function test1_2({a = 2, b = a + 1}) {
	{
		let a = 3, b = 99;
	}
	return 2 === a && 3 === b;
}
console.log(test1_2({}))

function test1_3({a = 3, b = a + 1, c = b + a + 1}) {
	{
		let a = 4, b = 99, c = 999;
	}
	return 3 === a && 4 === b && 8 === c;
}
console.log(test1_3({}))

function test2_1([a = 1]) {
	{
		let a = 2;
	}
	return 1 === a;
}
console.log(test2_1([]))

function test2_2([a = 2, b = a + 1]) {
	{
		let a = 3, b = 99;
	}
	return 2 === a && 3 === b;
}
console.log(test2_2([]))

function test2_3([a = 3, b = a + 1, c = b + a + 1]) {
	{
		let a = 4, b = 99, c = 999;
	}
	return 3 === a && 4 === b && 8 === c;
}
console.log(test2_3([]))

function test3_1({a = 1} = {}) {
	{
		let a = 2;
	}
	return 1 === a
}
console.log(test3_1())

function test3_2({a = 2, b = a + 1} = {}) {
	{
		let a = 3, b = 99;
	}
	return 2 === a && 3 === b;
}
console.log(test3_2())

function test3_3({a = 3, b = a + 1, c = b + a + 1} = {}) {
	{
		let a = 4, b = 99, c = 999;
	}
	return 3 === a && 4 === b && 8 === c;
}
console.log(test3_3())

// with 'arguments'
function test4_1({a = 2, b = a + 1}) {
	{
		let a = 3, b = 99;
	}
	return 22 === a && 23 === b && 22 === arguments[0].a;
}
console.log(test4_1({a: 22}))

function test4_2([a = 2, b = a + 1]) {
	{
		let a = 4, b = 99;
	}
	return 22 === a && 23 === b && 22 === arguments[0][0];
}
console.log(test4_2([22]))
