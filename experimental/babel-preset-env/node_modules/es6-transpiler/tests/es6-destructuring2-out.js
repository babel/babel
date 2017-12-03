var SLICE$0 = Array.prototype.slice;var $D$0;var a = (c = [1, 2, 3, 4, 5, 6])[0], b = c[1], c = SLICE$0.call(c, 2)
console.log(a === 1, b === 2, c.join("|") === "3|4|5|6")

{
	var a$0 = (b$0 = [1, [[[4], 3], 2]])[0], b$0 = b$0[1], c$0 = void 0, d = void 0, e = void 0;
	b$0 = ($D$0 = [a$0, b$0])[0], a$0 = (d = (c$0 = $D$0[1])[0])[0][0], d = d[1], c$0 = c$0[1], $D$0;
	console.log(b$0 === 1, c$0 === 2, d === 3, a$0 === 4);
}

{
	var a$1 = (b$1 = {a: "A", b: void 0}).a, b$1 = ((b$1 = b$1.b) === void 0 ? "B" : b$1), c$1 = 22;
	b$1 = ($D$0 = {a: b$1, B: a$1}).B, a$1 = $D$0.a, $D$0;
	console.log(a$1 === "B", b$1 === "A", c$1 === 22);
}

{// return value of destructuring assignment 1
	{ var obj = 1;}
	var a$2 = (b$2 = {a: "A", b: void 0}).a, b$2 = ((b$2 = b$2.b) === void 0 ? "B" : b$2), c$2 = 22;
	var obj$0 = {a: b$2, B: a$2};
	obj$0 = (b$2 = obj$0.B, a$2 = obj$0.a, obj$0);
	console.log(a$2 === "B", b$2 === "A", c$2 === 22, obj$0.a === "B", obj$0.B === "A");
}

{// return value of destructuring assignment 2
	var a$3 = (b$3 = {a: "A", b: void 0}).a, b$3 = ((b$3 = b$3.b) === void 0 ? "B" : b$3), c$3 = 22;
	var obj$1 = {a: b$3, B: a$3};
	obj$1 = (b$3 = obj$1.B, a$3 = obj$1.a, obj$1);
	console.log(a$3 === "B", b$3 === "A", c$3 === 22, obj$1.a === "B", obj$1.B === "A");
}

{
	var a$4 = (b$4 = {a: "A", b: void 0}).a, b$4 = ((b$4 = b$4.b) === void 0 ? "B" : b$4), c$4 = 22;
	var obj$2 = { inner: {a: b$4, B: a$4} };
	var inner = (b$4 = ($D$0 = obj$2.inner).B, a$4 = $D$0.a, $D$0);
	console.log(a$4 === "B", b$4 === "A", c$4 === 22, inner.a === "B", inner.B === "A", inner === obj$2.inner);
}

{
	var a$5 = (c$5 = [1, 2, 3, 4, 5])[0], b$5 = c$5[1], c$5 = SLICE$0.call(c$5, 2)
	console.log(a$5 === 1, b$5 === 2, c$5.join("|") === "3|4|5");
}

{
	var a$6 = ((a$6 = (rest = [void 0, 2, 3, 4, 5])[0]) === void 0 ? 1 : a$6), c$6 = rest[2], rest = SLICE$0.call(rest, 3), b$6 = 22
	console.log(a$6 === 1, c$6 === 3, b$6 === 22, rest.join("|") === "4|5");
}

{
	var a$7 = void 0, b$7 = void 0, c$7 = void 0, rest$0 = void 0;
	a$7 = ($D$0 = [1, 2, 3, 4, 5])[0], b$7 = $D$0[1], c$7 = $D$0[2], rest$0 = SLICE$0.call($D$0, 3), $D$0;
	console.log(a$7 === 1, b$7 === 2, c$7 === 3, rest$0.join("|") === "4|5");
}

{// destructuring and line breaks - array
	var a$8 = (rest$1 = [1, 2, 3, 4, 5])[0]
, b$8 = rest$1[1]
, c$8 = rest$1[2]
, rest$1 = SLICE$0.call(rest$1, 3)

;
	console.log(a$8 === 1, b$8 === 2, c$8 === 3, rest$1.join("|") === "4|5");

	b$8 = ($D$0 = [
		a$8
		,
		b$8
	])[0]
, a$8 = $D$0[1]

, $D$0
;
	console.log(a$8 === 2, b$8 === 1);
}

{// destructuring and line breaks - objecr
	var a$9 = ((a$9 = (c$9 = {a: 1, b: void 0, c: 3}).a) === void 0 ? "a" : a$9)
, b$9 = ((b$9 = c$9.b) === void 0 ? (function(){ return "b" })() : b$9)
, c$9 = c$9.c

;
	console.log(a$9 === 1, b$9 === "b", c$9 === 3);

	a$9 = ($D$0 = {
		a: a$9
		,
		b: b$9
	}).b
, b$9 = $D$0.a

, $D$0
;
	console.log(a$9 === "b", b$9 === 1);
;$D$0 = void 0}
