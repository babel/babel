
function test1() {

	function test1() {

		function test11() {
			let [a, b, c] = [1, "2", '3'];

			console.log(a === 1, b === "2", c === '3');
		}
		test11();

		function test12() {
			let [a, b, ...c] = [1, "2", '3', 4];

			console.log(a === 1, b === "2", c.join("|") === '3|4');
		}
		test12();

		function test13(arr) {
			let [{a}, [b], ...c] = arr;

			console.log(a === 9, b === 8, c.join("") === '7654321');
		}
		test13([{a: 9}, [8], 7, 6, 5, 4, 3, 2, 1]);

	}
	test1();

}
test1();

function test2() {

	function test1() {

		function test11() {
			let [a, b, c] = [];
			[a, b, c] = [1, "2", '3'];

			console.log(a === 1, b === "2", c === '3');
		}
		test11();

		function test12() {
			let [a, b, ...c] = [];
			[a, b, ...c] = [1, "2", '3', 4];

			console.log(a === 1, b === "2", c.join("|") === '3|4');
		}
		test12();

		function test13(arr) {
			let [{a}, [b], ...c] = [{},[]];
			[{a}, [b], ...c] = arr;

			console.log(a === 9, b === 8, c.join("") === '7654321');
		}
		test13([{a: 9}, [8], 7, 6, 5, 4, 3, 2, 1]);

	}
	test1();

}
test2();
