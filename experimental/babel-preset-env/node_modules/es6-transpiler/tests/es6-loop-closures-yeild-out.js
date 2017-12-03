"use strict";var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};
var arr, res, loop, call = function(callback){ return callback()};

/*es6-transpiler generators:false*/
// yield support
arr = [];
function *gen() {;var $args$0=arguments;
	for (var x = 0; x < 9; x++) {;var $yieldVal$0;var $value$0 = (function(){
		var y = x, z = $args$0[x];
		arr.push(function() { return y; });

		{$yieldVal$0 = true;return z + 1};
	})();if($yieldVal$0===true){try{throw $value$0 }catch($rp$0){$value$0=$yieldVal$0=void 0;yield $rp$0}}}
}
res = ITER$0(gen(9, 8, 7, 6, 5, 4, 3, 2, 1) );
console.log(arr.map(call).join("|") == [0, 1, 2, 3, 4, 5, 6, 7, 8].join("|"), res.join("|") == [10, 9, 8, 7, 6, 5, 4, 3, 2].join("|"));

arr = [];
function *gen_primitive() {;var $args$0=arguments;
	for (var x = 0; x < 9; x++) {;var $yieldPrim$0;var $value$0 = (function(){
		var y = x, z = $args$0[x];
		arr.push(function() { return y; });

		{$yieldPrim$0 = true;return 1};
	})();if($yieldPrim$0===true){$yieldPrim$0=void 0;yield $value$0}}
}
res = ITER$0(gen_primitive(9, 8, 7, 6, 5, 4, 3, 2, 1) );
console.log(arr.map(call).join("|") == [0, 1, 2, 3, 4, 5, 6, 7, 8].join("|"), res.join("|") == [1, 1, 1, 1, 1, 1, 1, 1, 1].join("|"));
