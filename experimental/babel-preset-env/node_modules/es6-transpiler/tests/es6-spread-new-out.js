function test() {var $D$0;var $D$1;var OC$0 = Object.create;

	function test(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	{
		var T = (($D$1=(($D$0=OC$0(($D$1= test).prototype)),$D$1).apply($D$0, [11, 22, 33]))&&typeof $D$1==='object'?$D$1:$D$0);
		console.log( T.a === 11, T.b === 22, T.c === 33 )
	;$D$0 = void 0;$D$1 = void 0}

	function test1(_arr) {var SLICE$0 = Array.prototype.slice;var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};var $D$2;var $D$3;var $D$4;var $D$5;var $D$6;var $D$7;var rest = SLICE$0.call(arguments, 1);

		var arr = [6].concat(ITER$0(_arr), ITER$0(rest));

		console.log(arr.join("|") === "6|3|34|35|36|37")

		{
			var T = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, ITER$0(arr)))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T.a === 6, T.b === 3 )
		}

		{
			var arr$0 = void 0;
			var T$0 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, ITER$0((arr$0 || [1, 2]))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$0.a === 1, T$0.b === 2 )
		}

		{
			var arr$1 = void 0;
			var T$1 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [1].concat(ITER$0(( arr$1 || [2, 3 ] )) )))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$1.a === 1, T$1.b === 2 )
		}

		{
			var T$2 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [1].concat(ITER$0((0 ? '' : [2, 3] )) )))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$2.a === 1, T$2.b === 2 )
		}

		{
			var T$3 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [9].concat(ITER$0(arr))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$3.a === 9, T$3.b === 6, T$3.c === 3 )
		}

		{
			var T$4 = (($D$3=((($D$2=OC$0(($D$3= /*1*/(/*2*/function(a, b, c){ this.a = a;this.b = b;this.c = c; }/*3*/)/*4*/).prototype)),$D$3).apply($D$2, [9].concat(ITER$0(arr)/*6*/))))&&typeof $D$3==='object'?$D$3:$D$2)/*7*/;
			console.log( T$4.a === 9, T$4.b === 6, T$4.c === 3 )
		}

		{
			var obj = {
				test: test
			};
			var T$5 = (($D$3=(($D$2=OC$0(($D$3= obj.test).prototype)),$D$3).apply($D$2, [18].concat(ITER$0(arr))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$5.a === 18, T$5.b === 6, T$5.c === 3 )
		}

		{
			var obj$0 = {
				test: test
			};
			var T$6 = (($D$3=(($D$2=OC$0(($D$3= obj$0.test).prototype)),$D$3).apply($D$2, ITER$0(arr)))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$6.a === 6, T$6.b === 3 )
		}

		{
			var obj$1 = {
				obj: {
					test: test
				}
			};
			var T$7 = (($D$3=(($D$2=OC$0(($D$3= obj$1.obj.test).prototype)),$D$3).apply($D$2, [27].concat(ITER$0(arr))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$7.a === 27, T$7.b === 6, T$7.c === 3 )
		}

		{
			var T$8 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [ ].concat(ITER$0((function(){ var a = 0; {var b = 1; a+=b;} {var b$0 = 2; a+=b$0;} return [a] })()), ITER$0(arr))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$8.a === 3, T$8.b === 6, T$8.c === 3 )
		}

		{
			var arr$2 = [1, 2, 3];
			var T$9 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, ITER$0(arr$2)))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$9.a === 1, T$9.b === 2, T$9.c === 3 )
		}

		{
			var arr$3 = [1, 2, 3];
			var T$10 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, ITER$0((arr$3))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$10.a === 1, T$10.b === 2, T$10.c === 3 )
		}

		{
			var arr$4 = [1, 2];
			var T$11 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [ ].concat(ITER$0(arr$4), ITER$0(arr$4))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$11.a === 1, T$11.b === 2, T$11.c === 1 )
		}

		{
			var arr$5 = [1, 2];
			var T$12 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [ ].concat(ITER$0((arr$5)), ITER$0((arr$5)))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$12.a === 1, T$12.b === 2, T$12.c === 1 )
		}

		{// return another object
			var anotherConstructor = function(a, b, c) {
				return {a: a, b: b, c: c};
			};
			var T$13 = (($D$3=(($D$2=OC$0(($D$3= anotherConstructor).prototype)),$D$3).apply($D$2, ITER$0(arr)))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$13.a === 6, T$13.b === 3, !(T$13 instanceof anotherConstructor) );
		}

		{// cascad
			var anotherConstructor$0 = function(a, b, c) {
				return {a: a, b: b, c: c};
			};
			var T$14 = (($D$3=(($D$2=OC$0(($D$3= test).prototype)),$D$3).apply($D$2, [(($D$5=(($D$4=OC$0(($D$5= anotherConstructor$0).prototype)),$D$5).apply($D$4, [(($D$7=(($D$6=OC$0(($D$7= test).prototype)),$D$7).apply($D$6, [1].concat(ITER$0(arr))))&&typeof $D$7==='object'?$D$7:$D$6)].concat(ITER$0(arr))))&&typeof $D$5==='object'?$D$5:$D$4)].concat(ITER$0(arr))))&&typeof $D$3==='object'?$D$3:$D$2);
			console.log( T$14 instanceof test, T$14.a && T$14.a.a && T$14.a.a.a === 1, T$14.a && T$14.a.a && T$14.a.a.b === 6, T$14.a && T$14.a.a && T$14.a.a.c === 3, T$14.a && T$14.a.b === 6, T$14.a && T$14.a.c === 3, T$14.b === 6, T$14.c === 3);
		;$D$2 = void 0;$D$3 = void 0;$D$4 = void 0;$D$5 = void 0;$D$6 = void 0;$D$7 = void 0}

	}
	test1([3], 34, 35, 36, 37);

}
test()
