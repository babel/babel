let obj = {
	arrowTest: (a, b, c, ...rest) => {
		return (a + "" + b + "" + c + rest.join(""))
	}
};

console.log( obj.arrowTest(1, 2, 3, 4, 5, 6, 7) === "1234567" )

function test() {
	function test4(ssssss, fffffffff = [], ooooooo = []) {
		return ssssss + fffffffff + ooooooo;
	}
	{let test;}

	let test;
	for (let i ; test = false ; ) {
		let {test} = this.testtesttest((test||{}).a, (test||{}).b);
	}

	let obj = (function() { return {
		arrowTest: (...rest) => {
			return rest.join("")
		}
	} })();


	return test4(1) + test + obj.arrowTest(1);
}
console.log(test() === "1false1");

var y1 = (a = 1) => (  a + 1  , a  )
var y2 = ({a}) => (a)
var y3 = ({a}) => [a]
var y31 = ({a} = {}) => [a]
var y4 = ([a]) => a
var y5 = ([a]) => {a}
var y6 = ([a]) => (a)
var y61 = ([a] = []) => (a)
var y7 = ([a = 1]) => (a)
var y8 = ({a = 1}) => [a]
