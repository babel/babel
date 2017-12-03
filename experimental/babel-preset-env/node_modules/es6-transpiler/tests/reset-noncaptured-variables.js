
/*es6-transpiler resetUnCaptured:true*/
function test0(){}

{
	let a = 1;
}

{
	let a = 2;

	var $D$1 = 123, $D$2 = 345, $D$3 = 567;

	$D$3++;
}

{
	let a = 3;
	function test1() {
		$D$2++;

		console.log(a === 3, $D$2 === 346);// variable 'a' has been captured
	}
test1()}

{
	let a = 4;

	$D$3++;
}

let someArray = [{b:0}, {b:1}, {b:2}];
let str1 = "";
for( let a of someArray ) {
	let { b, c } = a;

	function test2() {
		str1 += b;// variable 'b' has been captured
	}

	test2();
}
console.log(str1 === "012");

let str2 = "";
for( let x = 0 ; x < 3 ; x++ ) {
	str2 += x;
}
console.log(str2 === "012");

test3();
function test3(){
	let a = {};

	return;
}// [Warning!] Ending of function 'test3' must be the last line in this file
