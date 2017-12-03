function test() {var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};var $D$0;


	function test() {var a = arguments[0];if(a === void 0)a = 0;var b = arguments[1];if(b === void 0)b = 0;var c = arguments[2];if(c === void 0)c = 0;var d = arguments[3];if(d === void 0)d = "";
		return (this && this.TEST ? "THIS|" : "") + a + "|" + b + "|" + c + d;
	}

	var arr = [6, 3];

	{
		var T = test.apply(null, [8, 6, 4, ]);
		console.log( T === "8|6|4" )
	}

	{
		var arr$0 = [66, 33];
		var T$0 = test.apply(null, ITER$0(arr$0));
		console.log( T$0 === "66|33|0" )
	}

	{
		var T$1 = test.apply(null, [9].concat(ITER$0(arr)));
		console.log( T$1 === "9|6|3" )
	}

	{
		var obj = {
			test: test
			, TEST: true
		};
		var T$2 = obj.test.apply(obj, [18].concat(ITER$0(arr)));
		console.log( T$2 === "THIS|18|6|3" )
		console.log( obj.test.apply(obj, [19].concat(ITER$0(arr))) === "THIS|19|6|3" )
	}

	{
		var obj$0 = {
			obj: {
				test: test
				, TEST: true
			}
		};
		var T$3 = ($D$0 = obj$0.obj).test.apply($D$0, [27].concat(ITER$0(arr)));
		console.log( T$3 === "THIS|27|6|3" )
		console.log( ($D$0 = obj$0.obj).test.apply($D$0, [28].concat(ITER$0(arr))) === "THIS|28|6|3" )
	;$D$0 = void 0}

	{
		var T$4 = test.apply(null, [ ].concat(ITER$0((function(){ var a = 0; {var b = 1; a+=b;} {var b$0 = 2; a+=b$0;} return [a + 1] })()), ITER$0((1,arr), true), ITER$0((2,arr.slice()))/*<*//*>*/));
		console.log( T$4 === "4|6|36" )
	}

	{
		var arr$1 = [1, 2, 3];
		var T$5 = test.apply(null, ITER$0(arr$1));
		console.log( T$5 == "1|2|3" )
	}

	{
		var arr$2 = [1, 2, 3];
		var T$6 = test.apply(null, ITER$0((arr$2)));
		console.log( T$6 == "1|2|3" )
	}

	{
		var arr$3 = [1, 2];
		var T$7 = test.apply(null, [ ].concat(ITER$0(arr$3), ITER$0(arr$3)));
		console.log( T$7 == "1|2|12" )
	}

	{
		var arr$4 = [1, 2];
		var T$8 = test.apply(null, [ ].concat(ITER$0((arr$4)), ITER$0((arr$4))));
		console.log( T$8 == "1|2|12" )
	}

	{
		var T$9 = ((function(r){
			return r;
		})).apply(null, [[9, 8, 7], 2, 3]);
		console.log(T$9.join("|") == "9|8|7" )
	}
}

test();
