var SLICE$0 = Array.prototype.slice;var obj = {
	arrowTest: function(a, b, c)  {var rest = SLICE$0.call(arguments, 3);
		return (a + "" + b + "" + c + rest.join(""))
	}
};

console.log( obj.arrowTest(1, 2, 3, 4, 5, 6, 7) === "1234567" )

function test() {
	function test4(ssssss) {var fffffffff = arguments[1];if(fffffffff === void 0)fffffffff = [];var ooooooo = arguments[2];if(ooooooo === void 0)ooooooo = [];
		return ssssss + fffffffff + ooooooo;
	}
	{var test$0;}

	var test;
	for (var i = void 0 ; test = false ; ) {
		var test$1 = (this.testtesttest((test$1||{}).a, (test$1||{}).b)).test;
	}

	var obj = (function() { return {
		arrowTest: function()  {var rest = SLICE$0.call(arguments, 0);
			return rest.join("")
		}
	} })();


	return test4(1) + test + obj.arrowTest(1);
}
console.log(test() === "1false1");

var y1 = function()    {var a = arguments[0];if(a === void 0)a = 1;return (a + 1  , a  )}
var y2 = function(a)  {var a = a.a;return a} 
var y3 = function(a)  {var a = a.a;return [a]}
var y31 = function()  {var a = (arguments[0] !== void 0 ? arguments[0] : {}).a;return [a]}
var y4 = function(a)  {var a = a[0];return a}
var y5 = function(a)  {var a = a[0];a}
var y6 = function(a)  {var a = a[0];return a} 
var y61 = function()  {var a = (arguments[0] !== void 0 ? arguments[0] : [])[0];return a} 
var y7 = function(a)  {var a = ((a = a[0]) === void 0 ? 1 : a);return a} 
var y8 = function(a)  {var a = ((a = a.a) === void 0 ? 1 : a);return [a]}
