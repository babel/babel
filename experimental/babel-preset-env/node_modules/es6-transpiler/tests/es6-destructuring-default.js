function test1(obj) {
	const {someValue: a = "defaultValue", b} = obj;
	if( obj.someValue === void 0 ) {
		console.log(a === "defaultValue", b === obj.b);
	}
	else {
		console.log(a === obj.someValue, b === obj.b);
	}
}

test1({b: "bValue"});
test1({someValue: 999, b: "bValue"});

(function({"a": a = 123, b = 321}) {
	console.log(a === 123, b === 321);
})({});

function test2(auto, {a:{ test: c = "test", q = "default" }} = {a: {test: 1, q: 2}}, [a = 1, , b = 2, ...rest] = ["9", null, void 0, "6", "5", "4"], def="def") {
	if( auto ) {
		console.log(c === 1, q === 2, a === "9", b === 2, rest.join("|") === "6|5|4", def === "def")
	}
	else {
		console.log(c === "cValue", q === "default", a === 1, b === 3, rest.join("|") === "4|5|6", def === "def")
	}
}
test2(false, {a:{test: "cValue", q: void 0}}, [void 0, 2, 3, 4, 5, 6]);
test2(true);
