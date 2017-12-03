
{
	let i = 0;
	let a = [];
	let c = ["c"];
	let b = [-2, -1, "|", ... (  a.push(i++),a  /*<*/)/*>*/, ,  , "idx", 9, i, "-", ...(a.push(i++),a), "idx", i, "-", ...(a.push(i++),a), "idx", i, "-", ...c, , , , ];

	console.log( b.join("|") === [-2, -1, "|", 0, , , "idx", 9, 1, "-", 0, 1, "idx", 2, "-", 0, 1, 2, "idx", 3, "-", "c", , , , ].join("|") )
}

{
	let a = [1, 2, 3];
	let b =
		[0, ...a, 4, ...a.reverse()];

	console.log( b.join("|") === [0, 1, 2, 3, 4, 3, 2, 1].join("|") )
}


{
	let a = [0, 1, ...[5, 6], 7, ...[8, 9]];

	console.log( a.join("|") === [0, 1, 5, 6, 7, 8, 9].join("|") )
}

function testSequenceExpression(a, b, c, d) {
	console.log(a[0] === 1, a[1] === 2, a.length === 2, b === 3, c === 4, d[0] === 5, d.length === 1)
}
testSequenceExpression( ([...[1, 2]]), ...(1, 2, 3, [...[3, 4], [5]]))

function testVoidSequenceExpression(a, b, c) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c[0] === void 0, c.length === 0)
}
testVoidSequenceExpression( ('ololo', [...([, ])]), ...([...([,]), ([ ])]))

function testVoid(a, b, c) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c[0] === void 0, c.length === 0)
}
testVoid( [...[, ]], ...[...[,], [ ]])

function test(a, b, c) {
	console.log(a === 1, b === 2, c.join() === "3")
}
test(1, ...[2,...[[3]]])
test(1, ...[...[2], [3]])
test(...([9,8,7],[1,2,[3]]))

{
	let a = [...[5, 6], 7];

	let b = (  (a, b, c)  =>  [
		a, b, c
	])(...a)

	console.log(b.join("|") === [5, 6, 7].join("|"))
}

{
	let a = [...[9, void 0], void 0, 6, 5, 4];

	let b = (  (a = 9, b = 8, c = 7, ...rest)  =>  [
		a, b, c, ...rest
	])(...a)

	console.log(b.join("|") === [9, 8, 7, 6, 5, 4].join("|"))
}

{
	let b = [2];
	let a = [1, ...[...b]];

	console.log(a.join("|") === [1, 2].join("|"))
}
