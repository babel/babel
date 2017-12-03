var DP$0 = Object.defineProperty;var a = 'a1', b = 'b1', c = 'c1';
var i0 = 0, i1 = 1, i2 = 2;

{// object destructuring simple - one property
	var a1 = (DP$0({},a,{"value": 1,"configurable":true,"enumerable":true,"writable":true})).a1;
	console.log(a1 === 1);
}

{// object destructuring simple - two properties
	var a1$0 = (b1 = DP$0(DP$0({},a,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), b,{"value": 2,"configurable":true,"enumerable":true,"writable":true})).a1, b1 = b1.b1;
	console.log(a1$0 === 1, b1 === 2);
}

{// object destructuring simple - three properties
	var a1$1 = (c1 = DP$0(DP$0(DP$0({},a,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), b,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), c,{"value": 3,"configurable":true,"enumerable":true,"writable":true})).a1, b1$0 = c1.b1, c1 = c1.c1;
	console.log(a1$1 === 1, b1$0 === 2, c1 === 3);
}

{// array destructuring simple - one property
	var a1$2 = (DP$0({},i0,{"value": 1,"configurable":true,"enumerable":true,"writable":true}))[0];
	console.log(a1$2 === 1);
}

{// array destructuring simple - two properties
	var a1$3 = (b1$1 = DP$0(DP$0({},i0,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), i1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}))[0], b1$1 = b1$1[1];
	console.log(a1$3 === 1, b1$1 === 2);
}

{// array destructuring simple - three properties
	var a1$4 = (c1$0 = DP$0(DP$0(DP$0({},i0,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), i1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), i2,{"value": 3,"configurable":true,"enumerable":true,"writable":true}))[0], b1$2 = c1$0[1], c1$0 = c1$0[2];
	console.log(a1$4 === 1, b1$2 === 2, c1$0 === 3);
}

// --------------------------------------------

{// function object destructuring - default value
	var test = function () {var a1 = (c1 = (arguments[0] !== void 0 ? arguments[0] : DP$0(DP$0(DP$0({},a,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), b,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), c,{"value": 3,"configurable":true,"enumerable":true,"writable":true}))).a1, b1 = c1.b1, c1 = c1.c1;
		return [a1, b1, c1];
	}
	console.log(test().join('|') === [1, 2, 3].join('|'));
}

{// function array destructuring - default value
	var test$0 = function () {var a = (d = (arguments[0] !== void 0 ? arguments[0] : DP$0(DP$0(DP$0({},i0,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), i1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), i2,{"value": 3,"configurable":true,"enumerable":true,"writable":true})))[0], b = d[1], c = d[2], d = ((d = d[3]) === void 0 ? 4 : d);
		return [a, b, c, d];
	}
	console.log(test$0().join('|') === [1, 2, 3, 4].join('|'))
}

// --------------------------------------------

{// destructuring object - declaration default value
	var obj = ((obj = ({}).prop) === void 0 ? DP$0(DP$0(DP$0(DP$0(DP$0(DP$0({},i0,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), i1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), i2,{"value": 3,"configurable":true,"enumerable":true,"writable":true}), a,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), b,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), c,{"value": 3,"configurable":true,"enumerable":true,"writable":true}) : obj);
	console.log(obj[i0] === 1, obj[i1] === 2, obj[i2] === 3, obj[a] === 1, obj[b] === 2, obj[c] === 3);
}

{// destructuring array - declaration default value
	var obj$0 = ((obj$0 = ([])[0]) === void 0 ? DP$0(DP$0(DP$0(DP$0(DP$0(DP$0({},i0,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), i1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), i2,{"value": 3,"configurable":true,"enumerable":true,"writable":true}), a,{"value": 1,"configurable":true,"enumerable":true,"writable":true}), b,{"value": 2,"configurable":true,"enumerable":true,"writable":true}), c,{"value": 3,"configurable":true,"enumerable":true,"writable":true}) : obj$0);
	console.log(obj$0[i0] === 1, obj$0[i1] === 2, obj$0[i2] === 3, obj$0[a] === 1, obj$0[b] === 2, obj$0[c] === 3);
}