/*
 Test note:
 ! completed test: do not edit it except to add comments !
 */

var x = (a, b, c = 998) =>
	a + b + c;console.log(x(1, 1) === 1000)

console.log(((function(){return (a)=>a*22.032})())("321") === "321"*22.032)

var obj = {
	a: 1,
	some: (...rest)=>rest.map((a)=>a + 1),
	b: 6
}
console.log((obj.a + obj.some(1, 2, 3, 4).join("") + obj.b) === "123456")

var y = (a = 1) =>
	(  a + 1  , a  )
console.log(y() === 1)

{
	let test = 987;
	var result = (function() {
		var this$0 = this;

		var obj = {
			test: 123
			, arr: () => () => this.test + test
		};

		function innerTest() {
			console.log(this$0.test === "testString");
		}
		innerTest();

		return obj.arr()();
	}).call({test: "testString"});

	console.log(result === "testString987")
}

{
	let test = 321;
	result = (function(){var obj = {
			test: 123
			, arr: () => () => (a) => this.test + a + test
		}

		return obj.arr()()("|");
	}).call({test: "testString"});

	console.log(result === "testString|321")
}

{
	let test = 7;
	result = (function() {
		var obj = {
			test:"test",arr:function(a='String',...rest){return ()=>this.test+a+test+rest.join("")},test2:1
		};

		return obj.arr(void 0, 7, 7)();
	}).call({test: 123});

	console.log(result === "testString777");

}

{
	function test() {
		var z = () => {
			this.test();
		}
	}
}
