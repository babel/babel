var PRLS$0 = (function(o){return o["a"]===o["__proto__"]["a"]})({"__proto__":{"a":{}}});var DP$0 = Object.defineProperty;var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var FIX_PROTO$0 = function(o,f){if((f||!PRLS$0)&&o.hasOwnProperty("__proto__")){var p=o["__proto__"];delete o["__proto__"];SP$0(o,p);}return o};
var obj1 = FIX_PROTO$0({'__proto__': {a: 123}});
console.log(Object.keys(obj1).length === 0, obj1.a === 123);
{
	var obj1$0 = FIX_PROTO$0({b: 1, '__proto__': {a: 123}});
	console.log(Object.keys(obj1$0).length === 1, obj1$0.a === 123, obj1$0.b === 1);
}
{
	var obj1$1 = FIX_PROTO$0({'__proto__': {a: 123}, b: 1});
	console.log(Object.keys(obj1$1).length === 1, obj1$1.a === 123, obj1$1.b === 1);
}
{
	var obj1$2 = FIX_PROTO$0({b: 1, '__proto__': {a: 123}, c: 2});
	console.log(Object.keys(obj1$2).length === 2, obj1$2.a === 123, obj1$2.b === 1, obj1$2.c === 2);
}

var obj2 = FIX_PROTO$0({'__proto__': {'a': 123}});
console.log(Object.keys(obj2).length === 0, obj2.a === 123);
{
	var obj2$0 = FIX_PROTO$0({'b': 1, '__proto__': {'a': 123}});
	console.log(Object.keys(obj2$0).length === 1, obj2$0['a'] === 123, obj2$0['b'] === 1);
}
{
	var obj2$1 = FIX_PROTO$0({'__proto__': {'a': 123}, 'b': 1});
	console.log(Object.keys(obj2$1).length === 1, obj2$1['a'] === 123, obj2$1['b'] === 1);
}
{
	var obj2$2 = FIX_PROTO$0({'b': 1, '__proto__': {'a': 123}, 'c': 2});
	console.log(Object.keys(obj2$2).length === 2, obj2$2['a'] === 123, obj2$2['b'] === 1, obj2$2['c'] === 2);
}

var obj3 = FIX_PROTO$0({"__proto__": DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true})});
console.log(Object.keys(obj3).length === 0, obj3.a === 123);
{
	var obj3$0 = FIX_PROTO$0({'b': 1, "__proto__": {'a': 123}});
	console.log(Object.keys(obj3$0).length === 1, obj3$0['a'] === 123, obj3$0['b'] === 1);
	{
		var obj3$1 = FIX_PROTO$0(DP$0(DP$0({},'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), "__proto__",{"value": DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true}),"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj3$1).length === 1, obj3$1['a'] === 123, obj3$1['b'] === 1);
	}
}
{
	var obj3$2 = FIX_PROTO$0({"__proto__": {'a': 123}, 'b': 1});
	console.log(Object.keys(obj3$2).length === 1, obj3$2['a'] === 123, obj3$2['b'] === 1);
	{
		var obj3$3 = FIX_PROTO$0(DP$0({"__proto__": DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true})}, 'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj3$3).length === 1, obj3$3['a'] === 123, obj3$3['b'] === 1);
	}
}
{
	var obj3$4 = FIX_PROTO$0({'b': 1, "__proto__": {'a': 123}, 'c': 2});
	console.log(Object.keys(obj3$4).length === 2, obj3$4['a'] === 123, obj3$4['b'] === 1, obj3$4['c'] === 2);
	{
		var obj3$5 = FIX_PROTO$0(DP$0(DP$0(DP$0({},'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), "__proto__",{"value": {'a': 123},"configurable":true,"enumerable":true,"writable":true}), 'c',{"value": 2,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj3$5).length === 2, obj3$5['a'] === 123, obj3$5['b'] === 1, obj3$5['c'] === 2);
	}
	{
		var obj3$6 = FIX_PROTO$0(DP$0(DP$0(DP$0({},'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), "__proto__",{"value": DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true}),"configurable":true,"enumerable":true,"writable":true}), 'c',{"value": 2,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj3$6).length === 2, obj3$6['a'] === 123, obj3$6['b'] === 1, obj3$6['c'] === 2);
	}
	{
		var obj3$7 = FIX_PROTO$0(DP$0({'b': 1, "__proto__": {'a': 123}}, 'c',{"value": 2,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj3$7).length === 2, obj3$7['a'] === 123, obj3$7['b'] === 1, obj3$7['c'] === 2);
	}
}

var obj4 = FIX_PROTO$0({'__proto__': DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true})});
console.log(Object.keys(obj4).length === 0, obj4.a === 123);
{
	var obj4$0 = FIX_PROTO$0({'b': 1, '__proto__': {'a': 123}});
	console.log(Object.keys(obj4$0).length === 1, obj4$0['a'] === 123, obj4$0['b'] === 1);
	{
		var obj4$1 = FIX_PROTO$0(DP$0(DP$0({},'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), '__proto__',{"value": DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true}),"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj4$1).length === 1, obj4$1['a'] === 123, obj4$1['b'] === 1);
	}
}
{
	var obj4$2 = FIX_PROTO$0({'__proto__': {'a': 123}, 'b': 1});
	console.log(Object.keys(obj4$2).length === 1, obj4$2['a'] === 123, obj4$2['b'] === 1);
	{
		var obj4$3 = FIX_PROTO$0(DP$0({'__proto__': DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true})}, 'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj4$3).length === 1, obj4$3['a'] === 123, obj4$3['b'] === 1);
	}
}
{
	var obj4$4 = FIX_PROTO$0({'b': 1, '__proto__': {'a': 123}, 'c': 2});
	console.log(Object.keys(obj4$4).length === 2, obj4$4['a'] === 123, obj4$4['b'] === 1, obj4$4['c'] === 2);
	{
		var obj4$5 = FIX_PROTO$0(DP$0(DP$0(DP$0({},'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), '__proto__',{"value": {'a': 123},"configurable":true,"enumerable":true,"writable":true}), 'c',{"value": 2,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj4$5).length === 2, obj4$5['a'] === 123, obj4$5['b'] === 1, obj4$5['c'] === 2);
	}
	{
		var obj4$6 = FIX_PROTO$0(DP$0(DP$0(DP$0({},'b',{"value": 1,"configurable":true,"enumerable":true,"writable":true}), '__proto__',{"value": DP$0({},'a',{"value": 123,"configurable":true,"enumerable":true,"writable":true}),"configurable":true,"enumerable":true,"writable":true}), 'c',{"value": 2,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj4$6).length === 2, obj4$6['a'] === 123, obj4$6['b'] === 1, obj4$6['c'] === 2);
	}
	{
		var obj4$7 = FIX_PROTO$0(DP$0({'b': 1, '__proto__': {'a': 123}}, 'c',{"value": 2,"configurable":true,"enumerable":true,"writable":true}), true);
		console.log(Object.keys(obj4$7).length === 2, obj4$7['a'] === 123, obj4$7['b'] === 1, obj4$7['c'] === 2);
	}
}

var obj5 = DP$0({},'__proto__',{"value": {'a': 123},"configurable":true,"enumerable":true,"writable":true});
console.log(Object.keys(obj5).length === 1, obj5.a === void 0);
