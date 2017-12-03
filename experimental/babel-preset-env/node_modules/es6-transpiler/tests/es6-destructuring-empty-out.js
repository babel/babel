var $D$8;
function test1() {var $D$0;$D$0;var a = arguments[1];if(a === void 0)a = 1;
	return a;
}
console.log(test1() === 1);

function test2() {var $D$1;$D$1;
	return 2;
}
console.log(test2() === 2);

var $D$8;
var $D$8, b = 2 ;
var a = void 0, c = ((a = ($D$8 = {a: 3}).a, $D$8)).a;
console.log(b === 2, a === c, a === 3);

function test3($D$2) {var $D$2;$D$2;
	var a;
	return ((a = ($D$2 = {a: 3}).a, $D$2)), a;
}
console.log(test3() === 3);

function test4($D$3) {var $D$3;$D$3;
	var a, b = ((a = ($D$3 = {a: 4}).a, $D$3)).a;$D$3 = void 0;;
	return b;
}
console.log(test4() === 4);

function test5(){var $D$9;var a,b = (a = ($D$9 = {a:5}).a, $D$9);$D$9 = void 0;;function test6(){var $D$10;var a,b = (a = ($D$10 = {a:6}).a, $D$10);$D$10 = void 0;;return b.a}return b.a+test6()}
console.log(test5() === 11);

function test6($D$4) {var $D$4;$D$4;
	return 6;
}
console.log(test6() === 6);

function test7(a3) {var a3 = a3[2];
	return a3;
}
console.log(test7([3, 6, 9]) === 9);

function test8($D$5, a) {var $D$5;$D$5;
	return a;
}
console.log(test8(null, 8) === 8);

function test9($D$6, a) {var $D$6;$D$6;
	return a;
}
console.log(test9(null, 9) === 9);

function test10($D$7, a) {var $D$7;$D$7;
	return a;
}
console.log(test10(null, 10) === 10);

function empty() {

};$D$8 = void 0;
