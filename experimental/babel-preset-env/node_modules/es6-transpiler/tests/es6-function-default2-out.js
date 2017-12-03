/**
 * test function 1
 * @param a
 * @param b
 * @param c
 */
function /*comment 1*/  test1 /*comment2*/  (/** @type {number} */) { //some comment
	"use strict";var a = arguments[0];if(a === void 0)a = 1;var b = arguments[1];if(b === void 0)b = 2;var c = arguments[2];if(c === void 0)c = {};

	console.log(a === 32, b === 2,  typeof c === "object");
}
test1(32);


function test2 (  ) {var a = arguments[0];if(a === void 0)a = 1;var b = arguments[1];if(b === void 0)b = 2;  void function() {var a = arguments[0];if(a === void 0)a = 9;var b = arguments[1];if(b === void 0)b = 8;var c = arguments[2];if(c === void 0)c = 0; console.log(a === 1, b === 8, c === 2) } ( a, void 0 , b )  }
test2()

function test3 ( // function lvl comment
// function declaration comment




)// function declaration comment
{// function body comment
	"use strict";var a = arguments[0];if(a === void 0)a = 123;var b = arguments[1];if(b === void 0)b = 234;var c = arguments[2];if(c === void 0)c = 345;var d = arguments[3];if(d === void 0)d = 456;

	console.log(a === 123, b === 234, c === 345, d === 456);
}// outer comment
test3();
