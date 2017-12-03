var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};function testSequenceExpression1(a, b, c, d) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c[0] === void 0, c.length === 1, d === void 0)
}
testSequenceExpression1.apply(null, [(1, [, ]), /*4*/,/*5*/ ([, ])])

function testSequenceExpression2(a, b, c) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c[0] === void 0, c.length === 0)
}
testSequenceExpression2.apply(null, [([, ]), , ([ ])])

function testSequenceExpression3(a, b, c) {
	console.log(a[0] === void 0, a.length === 1, b === void 0, c === void 0)
}
testSequenceExpression3.apply(null, [(1, [, ]), /*1*/,/*2*/])

{// line breaks
	var arr = [1];
	var T =
			[

				 ].concat(ITER$0(arr, true)

, ITER$0((1
						,arr), true)
, ITER$0((
					2,
						arr.slice()
					))/*<*/
			)/*>*/
		;
	console.log(T.join("|") == [1, 1, 1].join("|"))
}

{//#43: spread and arrow
	var arr$0 = [1, 2, 3];

	var func = function(a, b, c) {
		return [a, b, c];
	}

	var result = func.apply(null, [function()  {return true}].concat(ITER$0(arr$0) ));
}
