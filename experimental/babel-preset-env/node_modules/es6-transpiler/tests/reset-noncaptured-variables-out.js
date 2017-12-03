var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$4;var $D$5;
/*es6-transpiler resetUnCaptured:true*/
function test0(){}

{
	var a = 1;
;a = void 0;}

{
	var a$0 = 2;

	var $D$1 = 123, $D$2 = 345, $D$3 = 567;

	$D$3++;
;a$0 = void 0;}

{
	var a$1 = 3;
	function test1() {
		$D$2++;

		console.log(a$1 === 3, $D$2 === 346);// variable 'a' has been captured
	}
test1()}

{
	var a$2 = 4;

	$D$3++;
;a$2 = void 0;}

var someArray = [{b:0}, {b:1}, {b:2}];
var str1 = "";
$D$0 = GET_ITER$0(someArray);$D$5 = $D$0 === 0;$D$4 = ($D$5 ? someArray.length : void 0);for( var a$3 ;$D$5 ? ($D$0 < $D$4) : !($D$4 = $D$0["next"]())["done"];){a$3 = ($D$5 ? someArray[$D$0++] : $D$4["value"]);(function(){
	var b = a$3.b, c = a$3.c;

	function test2() {
		str1 += b;// variable 'b' has been captured
	}

	test2();
})();};$D$0 = $D$4 = $D$5 = void 0;
console.log(str1 === "012");

var str2 = "";
for( var x = 0 ; x < 3 ; x++ ) {
	str2 += x;
}
console.log(str2 === "012");

test3();
function test3(){
	var a = {};

	return;
;a = void 0;};test0 = void 0;;$D$1 = void 0;;$D$3 = void 0;;test1 = void 0;;someArray = void 0;;test2 = void 0;;str2 = void 0;;test3 = void 0;// [Warning!] Ending of function 'test3' must be the last line in this file
