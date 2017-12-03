var DP$0 = Object.defineProperty;
var x = 0, y = 0, z = 0;

{// object destructuring simple - one property
	var a = 'a' + ++x;

	var a1 = (DP$0({},a,{"value": x,"configurable":true,"enumerable":true,"writable":true}))[a];
	console.log(a1 === x);
}

{// object destructuring simple - two properties
	var a$0 = 'a' + ++x, b = 'b' + ++y;

	var a1$0 = (b1 = DP$0(DP$0({},a$0,{"value": x,"configurable":true,"enumerable":true,"writable":true}), b,{"value": y,"configurable":true,"enumerable":true,"writable":true}))[a$0], b1 = b1[b];
	console.log(a1$0 === x, b1 === y);
}

{// object destructuring simple - three properties
	var a$1 = 'a' + ++x, b$0 = 'b' + ++y, c = 'c' + ++z;

	var a1$1 = (c1 = DP$0(DP$0(DP$0({},a$1,{"value": x,"configurable":true,"enumerable":true,"writable":true}), b$0,{"value": y,"configurable":true,"enumerable":true,"writable":true}), c,{"value": z,"configurable":true,"enumerable":true,"writable":true}))[a$1], b1$0 = c1[b$0], c1 = c1[c];
	console.log(a1$1 === x, b1$0 === y, c1 === z);
}

{// array destructuring simple - one property
	var i0 = ++x;

	var a1$2 = (DP$0({},0,{"value": i0,"configurable":true,"enumerable":true,"writable":true}))[0];
	console.log(a1$2 === x);
}

{// array destructuring simple - two properties
	var i0$0 = ++x, i1 = ++y;

	var a1$3 = (b1$1 = DP$0(DP$0({},0,{"value": i0$0,"configurable":true,"enumerable":true,"writable":true}), 1,{"value": i1,"configurable":true,"enumerable":true,"writable":true}))[0], b1$1 = b1$1[1];
	console.log(a1$3 === x, b1$1 === y);
}

{// array destructuring simple - three properties
	var i0$1 = ++x, i1$0 = ++y, i2 = ++z;

	var a1$4 = (c1$0 = DP$0(DP$0(DP$0({},0,{"value": i0$1,"configurable":true,"enumerable":true,"writable":true}), 1,{"value": i1$0,"configurable":true,"enumerable":true,"writable":true}), 2,{"value": i2,"configurable":true,"enumerable":true,"writable":true}))[0], b1$2 = c1$0[1], c1$0 = c1$0[2];
	console.log(a1$4 === x, b1$2 === y, c1$0 === z);
}

// --------------------------------------------

{// function object destructuring - default value
	var a$2 = 'a' + ++x, b$1 = 'b' + ++y, c$0 = 'c' + ++z;

	var test = function () {var a1 = (c1 = (arguments[0] !== void 0 ? arguments[0] : DP$0(DP$0(DP$0({},a$2,{"value": x,"configurable":true,"enumerable":true,"writable":true}), b$1,{"value": y,"configurable":true,"enumerable":true,"writable":true}), c$0,{"value": z,"configurable":true,"enumerable":true,"writable":true})))[a$2], b1 = c1[b$1], c1 = c1[c$0];
		return [a1, b1, c1];
	}
	console.log(test().join('|') === [x, y, z].join('|'));
}

{// function array destructuring - default value
	var i0$2 = ++x, i1$1 = ++y, i2$0 = ++z, i3 = 4;

	var test$0 = function () {var a = (d = (arguments[0] !== void 0 ? arguments[0] : DP$0(DP$0(DP$0({},0,{"value": i0$2,"configurable":true,"enumerable":true,"writable":true}), 1,{"value": i1$1,"configurable":true,"enumerable":true,"writable":true}), 2,{"value": i2$0,"configurable":true,"enumerable":true,"writable":true})))[0], b = d[1], c = d[2], d = ((d = d[3]) === void 0 ? i3 : d);
		return [a, b, c, d];
	}
	console.log(test$0().join('|') === [x, y, z, i3].join('|'))
}

// --------------------------------------------

{// destructuring object - declaration default value
	var a$3 = 'a' + ++x, b$2 = 'b' + ++y, c$1 = 'c' + ++z;
	var i0$3 = x, i1$2 = y, i2$1 = z;

	var obj = ((obj = ({}).prop) === void 0 ? DP$0(DP$0(DP$0(DP$0(DP$0(DP$0({},i0$3,{"value": x,"configurable":true,"enumerable":true,"writable":true}), i1$2,{"value": y,"configurable":true,"enumerable":true,"writable":true}), i2$1,{"value": z,"configurable":true,"enumerable":true,"writable":true}), a$3,{"value": x,"configurable":true,"enumerable":true,"writable":true}), b$2,{"value": y,"configurable":true,"enumerable":true,"writable":true}), c$1,{"value": z,"configurable":true,"enumerable":true,"writable":true}) : obj);
	console.log(obj[i0$3] === x, obj[i1$2] === y, obj[i2$1] === z, obj[a$3] === x, obj[b$2] === y, obj[c$1] === z);
}

{// destructuring array - declaration default value
	var a$4 = 'a' + ++x, b$3 = 'b' + ++y, c$2 = 'c' + ++z;
	var i0$4 = x, i1$3 = y, i2$2 = z;

	var obj$0 = ((obj$0 = ([])[0]) === void 0 ? DP$0(DP$0(DP$0(DP$0(DP$0(DP$0({},i0$4,{"value": x,"configurable":true,"enumerable":true,"writable":true}), i1$3,{"value": y,"configurable":true,"enumerable":true,"writable":true}), i2$2,{"value": z,"configurable":true,"enumerable":true,"writable":true}), a$4,{"value": x,"configurable":true,"enumerable":true,"writable":true}), b$3,{"value": y,"configurable":true,"enumerable":true,"writable":true}), c$2,{"value": z,"configurable":true,"enumerable":true,"writable":true}) : obj$0);
	console.log(obj$0[i0$4] === x, obj$0[i1$3] === y, obj$0[i2$2] === z, obj$0[a$4] === x, obj$0[b$3] === y, obj$0[c$2] === z);
}
