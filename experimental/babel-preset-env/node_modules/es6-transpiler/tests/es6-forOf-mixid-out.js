var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;var $D$3;
{
	var test = void 0;
}

{// destructuring & arrow function
	var output = [];
	var test$0=void 0;$D$3 = ((   function(x)     {return [{test: x + 1}, {test: x + 2}, {test: x + 3}]})(2));$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){test$0 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]).test;
		output.push(test$0)
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;test$0=void 0;
	console.log(output.join("|") === [3, 4, 5].join("|"))
}

{
	var a = void 0, b = void 0, c = void 0;
}

{// arrow function & shorthand property & destructuring & spread
	var retArr = function(a, b, c){return [
		{test: a + 1, a: a}	//{test: 3, a: 2}
		, {test: b + 2, b: b}	//{test: 3, b: 1}
		, {test: c + 3, c: c}	//{test: 3, c: 0}
	]}
	var output$0 = [];
	var arr = [2, 1, 0]
	var test$1=void 0, a$0=void 0, b$0=void 0, c$0=void 0;$D$3 = (retArr.apply(null, ITER$0(arr)));$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){test$1 = (c$0 = ($D$2 ? $D$3[$D$0++] : $D$1["value"])).test, a$0 = ((a$0 = c$0.a) === void 0 ? 1 : a$0), b$0 = ((b$0 = c$0.b) === void 0 ? 2 : b$0), c$0 = ((c$0 = c$0.c) === void 0 ? 3 : c$0);
		output$0.push(test$1 + (a$0 + b$0 + c$0))
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;test$1=void 0;a$0=void 0;b$0=void 0;c$0=void 0;
	console.log(output$0.join("|") === [10, 8, 6].join("|"))

	{
		var output$1 = [];
		var arr$0 = [2, 1, 0];
		var test$2=void 0, a$1=void 0, b$1=void 0, c$1=void 0;$D$3 = ((  function(a, b, c)   {return [
			{test: a + 1, a: a}	//{test: 3, a: 2}
			, {test: b + 2, b: b}	//{test: 3, b: 1}
			, {test: c + 3, c: c}	//{test: 3, c: 0}
		]}).apply(null, ITER$0(arr$0)));$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){test$2 = (c$1 = ($D$2 ? $D$3[$D$0++] : $D$1["value"])).test, a$1 = ((a$1 = c$1.a) === void 0 ? 1 : a$1), b$1 = ((b$1 = c$1.b) === void 0 ? 2 : b$1), c$1 = ((c$1 = c$1.c) === void 0 ? 3 : c$1);
			output$1.push(test$2 + (a$1 + b$1 + c$1))
		};$D$0 = $D$1 = $D$2 = $D$3 = void 0;test$2=void 0;a$1=void 0;b$1=void 0;c$1=void 0;
		console.log(output$1.join("|") === [10, 8, 6].join("|"))
	}
}

{
	var a$2 = void 0, b$2 = void 0, c$2 = void 0;
}

{// destructuring & arrow function
	var output$2 = [];var arr$1 = [8, 9];
	var value=void 0, index=void 0;$D$3 = (arr$1.push(10), arr$1.map(function(value, index){return [value, index]}));$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){value = (index = ($D$2 ? $D$3[$D$0++] : $D$1["value"]))[0], index = index[1];
		output$2.push(value)
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;value=void 0;index=void 0;
	console.log(output$2.join("|") === [8, 9, 10].join("|"))
}

{// destructuring & arrow function & rest
	var output$3 = [];var arr$2 = [8, 9];
	var value$0=void 0, index$0=void 0;$D$3 = (arr$2.push(10), arr$2.map(function(){var SLICE$0 = Array.prototype.slice;var r = SLICE$0.call(arguments, 0);return r}));$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){value$0 = (index$0 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]))[0], index$0 = index$0[1];
		output$3.push(value$0)
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;value$0=void 0;index$0=void 0;
	console.log(output$3.join("|") === [8, 9, 10].join("|"))
}
