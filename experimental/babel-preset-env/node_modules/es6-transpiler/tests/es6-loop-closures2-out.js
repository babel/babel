"use strict";var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$4;var $D$5;var $D$6;var $D$10;
var arr, res, loop, call = function(callback){ return callback()};

// can be transformed (common WAT)

// mixin test
arr = [];
res = (function() {;var $that$0=this;
	label: for (var x = 0; x < 3; x++) {;var $retVal$0;var $retPrim$0;var $retVoid$0;var $break$0;var $breaklabel$0;var $value$0 = (function(){
		var y = x;
		arr.push(function() { return y; });
		{$retVal$0 = true;return $that$0.aa;}
		if(x>99){$retPrim$0 = true;return 99;}
		if(x>98){$retPrim$0 = true;return 98;}
		if(x>97){$retVoid$0 = true;return}
		if(x>96){$break$0 = true;return}
		if(x>96){$break$0 = true;return}
		if(x>95)return;
		if(x>94){$breaklabel$0 = true;return}
		if(x>93){$retVoid$0 = true;return}
		if(x>95)return;
		if(x>98){$retVal$0 = true;return {a: 1};}
	})();if($retVal$0===true){try{throw $value$0 }catch($rp$0){$value$0=$retVal$0=void 0;return $rp$0}}if($retPrim$0===true){$retPrim$0=void 0;return $value$0}if($retVoid$0===true){$retVoid$0=void 0;return}if($break$0===true){$break$0=void 0;break }if($breaklabel$0===true){$breaklabel$0=void 0;break label}}
}).call({aa: 999});
console.log(arr.map(call).join("|") == "0", res == 999 ? true : 'Error: should return right value');

// return only primitive value
arr = [];
function returnPrimitive() {var $D$0;var $D$1;var $D$2;var $D$3;
	$D$3 = ([1, 2, 3, 4, 5]);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for ( var val ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){val = ($D$2 ? $D$3[$D$0++] : $D$1["value"]);;var $retPrim$0;var $value$0 = (function(){
		var innerVal = val;

		arr.push(function() { return innerVal; });

		if ( val === 5 ) {
			{$retPrim$0 = true;return 55;}
		}
	})();if($retPrim$0===true){$retPrim$0=void 0;return $value$0}};$D$0 = $D$1 = $D$2 = $D$3 = void 0;
}
console.log(returnPrimitive() === 55, arr.map(call).join("|") === [1, 2, 3, 4, 5].join("|"));

// arguments is not allowed inside the loop body because the IIFE would break it
arr = [];
res = (function() {;var $args$0=arguments;
	for (var x = 0; x < 3; x++) {;var $retVal$0;var $value$0 = (function(){
		var y = x;
		var z = $args$0[0];
		arr.push(function() { return x + y + z; });

		if(x==2){$retVal$0 = true;return z++,z

		+1;}
	})();if($retVal$0===true){try{throw $value$0 }catch($rp$0){$value$0=$retVal$0=void 0;return $rp$0}}}
})(9);
console.log(arr.map(call).join("|") == [11, 12, 14].join("|"), res == 11 ? true : 'Error: should return right value');

// break is not allowed inside the loop body because the IIFE would break it
arr = [];
for (var x = 0; x < 3; x++) {;var $break$0;(function(){
	var y = x;
	arr.push(function() { return y; });
	{$break$0 = true;return}
})();if($break$0===true){$break$0=void 0;break }}
console.log(arr.map(call).join("|") == [0].join("|"));

// continue is not allowed inside the loop body because the IIFE would break it
arr = [];
for (var x1 = 0; x1 < 3; x1++) {(function(){
	var y = x1;
	if(!y)return;
	arr.push(function() { return y; });
})();}
console.log(arr.map(call).join("|") == [1, 2].join("|"));

// var's inside scoped block should work as a regular var's regardless of whether or not block wrapper by IIFE
{
	arr = [];
	var a = [1, 2, 3, 4, 5];
	$D$4 = GET_ITER$0(a);$D$6 = $D$4 === 0;$D$5 = ($D$6 ? a.length : void 0);for( var x$0 ;$D$6 ? ($D$4 < $D$5) : !($D$5 = $D$4["next"]())["done"];){x$0 = ($D$6 ? a[$D$4++] : $D$5["value"]);;var j, k, c, d, e, GG;var $break$0;(function(x){
		;j = (e = {j: 1, k: 2, c: 3, d: {d: 4, e: 5}}).j, k = e.k, c = e.c, d = (e = e.d).d, e = e.e, GG = x;

		if(x==1)return;
		if(x==2&&false){$break$0 = true;return}

		arr.push(function(){ return x })
	})(x$0);if($break$0===true){$break$0=void 0;break }};$D$4 = $D$5 = $D$6 = void 0;

	console.log(arr.map(call).join("|") == [2, 3, 4, 5].join("|"), GG == 5, j == 1, k == 2, c == 3, d == 4, e == 5);
}

// simple var support
arr = [];
function var_test() {
	for (var x = 0; x < 3; x++) {;var variable;(function(){
		var y = x;
		arr.push(function() { return y; });

		{
			;variable;
			if ( variable === void 0 ) {
				variable = 0;
			}
			variable++;
		}
	})();}
	return variable;
}
res = var_test();
console.log(arr.map(call).join("|") == [0, 1, 2].join("|"), res === 3);

// this test
arr = (function() {'use strict';;var $that$0=this;;var $args$0=arguments;var this$0 = this;var arr = [];var temp;

// Block-less For-In
for (var x in (temp = [0,1,2])) (function(x){if(temp.hasOwnProperty(x)) ($that$0.aa+=1),arr.push(function()  { return x + (this$0.a || 0); });})(x);/*with semicolon*/
for (var x$1 in (temp = [0,1,2])) (function(x){if(temp.hasOwnProperty(x)) ($that$0.aa+=$args$0[0]),arr.push(function() { return x; })/*no semicolon*/

})(x$1);null; // previous semicolon-less for statement's range ends just before 'n' in 'null'

return arr.map(call).concat(this.aa);

}).call({aa: 999}, 888);
console.log(arr.join("|") == ["00", "10", "20", "0", "1", "2", 999+1+1+1+888+888+888].join("|"));


// return is not allowed inside the loop body because the IIFE would break it
arr = [];
res = (function(){var $D$7;var $D$8;var $D$9;;var $args$0=arguments;
	var a = [1, 2, 3, 4, 5];
	$D$7 = GET_ITER$0(a);$D$9 = $D$7 === 0;$D$8 = ($D$9 ? a.length : void 0);for( var x ;$D$9 ? ($D$7 < $D$8) : !($D$8 = $D$7["next"]())["done"];){x = ($D$9 ? a[$D$7++] : $D$8["value"]);;var $break$0;var $retVal$0;var $value$0 = (function(x){
		arr.push(function(){ return x });
		if(x==1)return;
		if(x==2&&false){$break$0 = true;return}
		if(x==3){{$retVal$0 = true;return $args$0[2];}}
	})(x);if($break$0===true){$break$0=void 0;break }if($retVal$0===true){try{throw $value$0 }catch($rp$0){$value$0=$retVal$0=void 0;return $rp$0}}};$D$7 = $D$8 = $D$9 = void 0;
})(9, 8, 7);
console.log(arr.map(call).join("|") == [1, 2, 3].join("|"), res == 7);

// continue is not allowed inside the loop body because the IIFE would break it
arr = [];
$D$10 = ([1, 2, 3, 4, 5]);$D$4 = GET_ITER$0($D$10);$D$6 = $D$4 === 0;$D$5 = ($D$6 ? $D$10.length : void 0);for( var x22 ;$D$6 ? ($D$4 < $D$5) : !($D$5 = $D$4["next"]())["done"];){x22 = ($D$6 ? $D$10[$D$4++] : $D$5["value"]);(function(){
	var y = x22, z = 55;
	arr.push(function(){ return y });
	return;
})();};$D$4 = $D$5 = $D$6 = $D$10 = void 0;
console.log(arr.map(call).join("|") == [1, 2, 3, 4, 5].join("|"));

// continue + forOf + destructuring
arr = [];var random__ = Math.random();
$D$10 = ([{a: {x: 1, y: 2, z: 3}}]);$D$4 = GET_ITER$0($D$10);$D$6 = $D$4 === 0;$D$5 = ($D$6 ? $D$10.length : void 0);for( var x11 ;$D$6 ? ($D$4 < $D$5) : !($D$5 = $D$4["next"]())["done"];){x11 = ($D$6 ? $D$10[$D$4++] : $D$5["value"]);(function(){
	var x = (z = x11.a).x, y = z.y, z = z.z, h = 55;

	{

	}
	var uu = ++random__;
	arr.push(function(){ return y + x + z + uu })
	return;
})();};$D$4 = $D$5 = $D$6 = $D$10 = void 0;
console.log(arr.map(call).join("|") == [1+2+3+random__].join("|"));

{// break + forOf + destructuring
	arr = [];
	var x$2=void 0, y=void 0, z=void 0;$D$10 = ([{x:1,y:0}, {x:1,y:1}, {x:1,y:2}]);$D$4 = GET_ITER$0($D$10);$D$6 = $D$4 === 0;$D$5 = ($D$6 ? $D$10.length : void 0);for(  ;$D$6 ? ($D$4 < $D$5) : !($D$5 = $D$4["next"]())["done"];){x$2 = (z = ($D$6 ? $D$10[$D$4++] : $D$5["value"])).x, y = z.y, z = z.z;;var $break$0;(function(x, y, z){
		arr.push(function(){ return x + y });
		{$break$0 = true;return}
	})(x$2, y, z);if($break$0===true){$break$0=void 0;break }};$D$4 = $D$5 = $D$6 = $D$10 = void 0;x$2=void 0;y=void 0;z=void 0;

	var x$3=void 0, y$0=void 0, z$0=void 0;$D$10 = ([{x:1,y:0}, {x:1,y:1}, {x:1,y:2}]);$D$4 = GET_ITER$0($D$10);$D$6 = $D$4 === 0;$D$5 = ($D$6 ? $D$10.length : void 0);for(  ;$D$6 ? ($D$4 < $D$5) : !($D$5 = $D$4["next"]())["done"];){x$3 = (z$0 = ($D$6 ? $D$10[$D$4++] : $D$5["value"])).x, y$0 = z$0.y, z$0 = z$0.z;;var $break$0;(function(x, y, z){
		arr.push(function(){ return x + y + (z | 0) });
		if(y == 2){$break$0 = true;return}
	})(x$3, y$0, z$0);if($break$0===true){$break$0=void 0;break }};$D$4 = $D$5 = $D$6 = $D$10 = void 0;x$3=void 0;y$0=void 0;z$0=void 0;

	console.log(arr.map(call).join("|") == [1, 1, 2, 3].join("|"));
}
