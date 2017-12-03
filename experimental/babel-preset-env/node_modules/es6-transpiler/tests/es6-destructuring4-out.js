var SLICE$0 = Array.prototype.slice;
function test1() {

	function test1() {

		function test11() {
			var a = (c = [1, "2", '3'])[0], b = c[1], c = c[2];

			console.log(a === 1, b === "2", c === '3');
		}
		test11();

		function test12() {
			var a = (c = [1, "2", '3', 4])[0], b = c[1], c = SLICE$0.call(c, 2);

			console.log(a === 1, b === "2", c.join("|") === '3|4');
		}
		test12();

		function test13(arr) {
			var a = (arr[0]).a, b = (arr[1])[0], c = SLICE$0.call(arr, 2);

			console.log(a === 9, b === 8, c.join("") === '7654321');
		}
		test13([{a: 9}, [8], 7, 6, 5, 4, 3, 2, 1]);

	}
	test1();

}
test1();

function test2() {

	function test1() {

		function test11() {var $D$0;
			var a = (c = [])[0], b = c[1], c = c[2];
			a = ($D$0 = [1, "2", '3'])[0], b = $D$0[1], c = $D$0[2], $D$0;

			console.log(a === 1, b === "2", c === '3');
		;$D$0 = void 0}
		test11();

		function test12() {var $D$1;
			var a = (c = [])[0], b = c[1], c = SLICE$0.call(c, 2);
			a = ($D$1 = [1, "2", '3', 4])[0], b = $D$1[1], c = SLICE$0.call($D$1, 2), $D$1;

			console.log(a === 1, b === "2", c.join("|") === '3|4');
		;$D$1 = void 0}
		test12();

		function test13(arr) {
			var a = (c = [{},[]])[0].a, b = (c[1])[0], c = SLICE$0.call(c, 2);
			a = (arr[0]).a, b = (arr[1])[0], c = SLICE$0.call(arr, 2), arr;

			console.log(a === 9, b === 8, c.join("") === '7654321');
		}
		test13([{a: 9}, [8], 7, 6, 5, 4, 3, 2, 1]);

	}
	test1();

}
test2();
