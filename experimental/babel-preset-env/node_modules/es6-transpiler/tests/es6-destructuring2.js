let [a, b, ...c] = [1, 2, 3, 4, 5, 6]
console.log(a === 1, b === 2, c.join("|") === "3|4|5|6")

{
	let [a, b] = [1, [[[4], 3], 2]], c, d, e;
	[b, [[[a], d],c]] = [a, b];
	console.log(b === 1, c === 2, d === 3, a === 4);
}

{
	let {a, b = "B"} = {a: "A", b: void 0}, c = 22;
	({B: b, a}) = {a: b, B: a};
	console.log(a === "B", b === "A", c === 22);
}

{// return value of destructuring assignment 1
	{ let obj = 1;}
	let {a, b = "B"} = {a: "A", b: void 0}, c = 22;
	let obj = {a: b, B: a};
	obj = (({B: b, a}) = obj);
	console.log(a === "B", b === "A", c === 22, obj.a === "B", obj.B === "A");
}

{// return value of destructuring assignment 2
	let {a, b = "B"} = {a: "A", b: void 0}, c = 22;
	let obj = {a: b, B: a};
	obj = ({B: b, a}) = obj;
	console.log(a === "B", b === "A", c === 22, obj.a === "B", obj.B === "A");
}

{
	let {a, b = "B"} = {a: "A", b: void 0}, c = 22;
	let obj = { inner: {a: b, B: a} };
	let inner = (( {B: b, a} ) = obj.inner);
	console.log(a === "B", b === "A", c === 22, inner.a === "B", inner.B === "A", inner === obj.inner);
}

{
	let [a, b, ...c] = [1, 2, 3, 4, 5]
	console.log(a === 1, b === 2, c.join("|") === "3|4|5");
}

{
	let [a = 1, , c, ...rest] = [void 0, 2, 3, 4, 5], b = 22
	console.log(a === 1, c === 3, b === 22, rest.join("|") === "4|5");
}

{
	let a, b, c, rest;
	[a, b, c, ...rest] = [1, 2, 3, 4, 5];
	console.log(a === 1, b === 2, c === 3, rest.join("|") === "4|5");
}

{// destructuring and line breaks - array
	let [
		a
		, b
		, c
		, ...rest
	] = [1, 2, 3, 4, 5];
	console.log(a === 1, b === 2, c === 3, rest.join("|") === "4|5");

	[
		b
		,
		a
	] = [
		a
		,
		b
	];
	console.log(a === 2, b === 1);
}

{// destructuring and line breaks - objecr
	let {
		a = "a"
		, b = (function(){ return "b" })()
		, c
	} = {a: 1, b: void 0, c: 3};
	console.log(a === 1, b === "b", c === 3);

	({
		b: a
		,
		a: b
	}) = {
		a
		,
		b
	};
	console.log(a === "b", b === 1);
}
