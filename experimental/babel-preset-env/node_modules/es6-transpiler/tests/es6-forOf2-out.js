var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;var $D$3;var $D$4;var $D$5;
var output = [];
var i = 0;
{
	var arr = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {b: 999}];
	var output$0 = [];

	var f=void 0;$D$0 = GET_ITER$0(arr);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? arr.length : void 0);for(  ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];)
{f = ((f = ($D$2 ? arr[$D$0++] : $D$1["value"]).a) === void 0 ? 9 : f);1,output$0.push(f),2

	};$D$0 = $D$1 = $D$2 = void 0;f=void 0;console.log(output$0.join("|") === [1, 2, 3, 4, 9].join("|"))
}

{
	var arr$0 = void 0,f$0 = void 0;
}

{
	output = [];
	var arr$1 = [1, 2, 3];
	$D$0 = GET_ITER$0(arr$1);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? arr$1.length : void 0);for(var f$1 ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){f$1 = ($D$2 ? arr$1[$D$0++] : $D$1["value"]);
		output.push(f$1);
	};$D$0 = $D$1 = $D$2 = void 0;;
	console.log(output.join("|") === "1|2|3")
}


{
	i = 0;
	output = [];
	var arr$2 = [1, 2, 3];
	$D$3 = (arr$2.push(i++), arr$2.push(i++), arr$2.push(i++), arr$2);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for(var f$2 ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){f$2 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]);
		output.push(f$2);
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;;
	console.log(output.join("|") === [1, 2, 3, 0, 1, 2].join("|"), arr$2.join("|") === [1, 2, 3, 0, 1, 2].join("|"))
}


{
	output = [];
	var arr$3 = [{a: 1}, {a: 2}, {a: 3}];
	var b=void 0;$D$0 = GET_ITER$0(arr$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? arr$3.length : void 0);for( ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){b = ($D$2 ? arr$3[$D$0++] : $D$1["value"]).a;var a$0=void 0;$D$3 = GET_ITER$0(arr$3);$D$5 = $D$3 === 0;$D$4 = ($D$5 ? arr$3.length : void 0);for( ;$D$5 ? ($D$3 < $D$4) : !($D$4 = $D$3["next"]())["done"];){a$0 = ($D$5 ? arr$3[$D$3++] : $D$4["value"]).a;
		output.push(a$0 + "|" + b);
	}};$D$0 = $D$1 = $D$2 = void 0;b=void 0;;$D$3 = $D$4 = $D$5 = void 0;a$0=void 0;;
	var result = [].concat.apply([], arr$3.map(function(b) {b = b.a;
		return arr$3.map(function(a) {a = a.a;
			return a + "|" + b;
		});
	}));
	console.log(output.join("|") === result.join("|"))
}

{
	output = [];
	var arr1 = [{a: 1}, {a: 2}, {a: 3}];
	var arr2 = [{y: 1, b: 'a'}, {y: 2, b: 'b'}, {y: 3, b: 'c'}];
	var a;$D$0 = GET_ITER$0(arr1);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? arr1.length : void 0);for(  ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){a = ($D$2 ? arr1[$D$0++] : $D$1["value"]).a;var y=void 0, a1=void 0;$D$3 = GET_ITER$0(arr2);$D$5 = $D$3 === 0;$D$4 = ($D$5 ? arr2.length : void 0);for (  ;$D$5 ? ($D$3 < $D$4) : !($D$4 = $D$3["next"]())["done"];){y = (a1 = ($D$5 ? arr2[$D$3++] : $D$4["value"])).y, a1 = a1.b;
		output.push(a + a1 + y);
	}};$D$0 = $D$1 = $D$2 = void 0;;$D$3 = $D$4 = $D$5 = void 0;y=void 0;a1=void 0;
	var result$0 = [].concat.apply([], arr1.map(function(a) {a = a.a;
		return arr2.map(function(b) {var y = b.y, a1 = b.b;
			return a + a1 + y;
		});
	}));
	console.log(output.join("|") === result$0.join("|"))
}

{
	var arr$4 = void 0,f$3 = void 0;
}
