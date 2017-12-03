
var result = (function() {
	var a, b;
	return ({a = 1, b = 2} = {a: 99}), a + b;
})();

console.log(result === 101);
