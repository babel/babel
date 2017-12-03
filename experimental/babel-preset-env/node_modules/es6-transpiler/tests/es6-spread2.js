function testSequenceExpression1(a, b, c, d) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c[0] === void 0, c.length === 1, d === void 0)
}
testSequenceExpression1( (1, [...([, ])]), ...([...([/*1*/,/*2*/]/*3*/)/*4*/,/*5*/ ([, ])]))

function testSequenceExpression2(a, b, c) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c[0] === void 0, c.length === 0)
}
testSequenceExpression2( ([...([, ])]), ...([...([,]), ([ ])]))

function testSequenceExpression3(a, b, c) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c === void 0)
}
testSequenceExpression3( (1, [...([, ])]), ...([...([/*1*/,/*2*/]/*3*/)]))

{// line breaks
	var arr = [1];
	let T =
			[

				...arr,
				...
					(1
						,arr),
				...(
					2,
						arr.slice()
					)/*<*/
			]/*>*/
		;
	console.log(T.join("|") == [1, 1, 1].join("|"))
}

{//#43: spread and arrow
	let arr = [1, 2, 3];

	let func = function(a, b, c) {
		return [a, b, c];
	}

	let result = func( () => true, ...arr );
}
