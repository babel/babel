var DP$0 = Object.defineProperty;var DPS$0 = Object.defineProperties;var GOPDS_P$0 = function(o){var d=Object.create(null);for(var p in o)if(o.hasOwnProperty(p)){d[p]={"value":o[p],"enumerable":true,"configurable":true,"writable":true};}return d;};var GOPDS_A$0 = function(o){var d=Object.create(null);for(var p in o)if(o.hasOwnProperty(p)){d[p]=o[p];}return d;};
var a = DP$0({},   'x',{"value": function   () { return 123 },"configurable":true,"enumerable":true,"writable":true} );
console.log(a['x']() === 123);

var b = DP$0({
	prop1: 'prop1'},
	  'x',{"value": function   () { return this.prop1 + 123 },"configurable":true,"enumerable":true,"writable":true}
);
console.log(b['x']() === b.prop1 + 123);

var c = DP$0({
	prop1: 'prop1',
	'prop2': 'prop2'},
	  'x',{"value": function   () { return this.prop1 + this['prop2'] + 123 },"configurable":true,"enumerable":true,"writable":true}
);
console.log(c['x']() === c.prop1 + c.prop2 + 123);

var d = DPS$0(DP$0({
	prop1: 'prop1',
	'prop2': 'prop2'},
	  'x',{"value": function   () { return this.prop1 + this['prop2'] + 123 + this.prop3 + this['prop4'] },"configurable":true,"enumerable":true,"writable":true})
	, GOPDS_P$0({prop3: 'prop3'
	, 'prop4': 'prop4'
}));
console.log(d['x']() === d.prop1 + d['prop2'] + 123 + d.prop3 + d['prop4']);

var f = DPS$0(DP$0(DP$0({},
	  'x',{"value": function   () { return 123 + this['prop3'] + this.prop4 },"configurable":true,"enumerable":true,"writable":true})
	, 'prop3',{"value": 'prop3',"configurable":true,"enumerable":true,"writable":true})
	, GOPDS_P$0({prop4: 'prop4'
}));
console.log(f['x']() === 123 + f['prop3'] + f.prop4);

var x = 1;
var y = Math.random();

// ---

var obj1 = DPS$0(DPS$0(DPS$0(DP$0(DPS$0(DP$0(DP$0({
	prop1: 'prop1'
	, prop2: 'prop2'
	, method1: function() { return this.prop1 }}
	,  'a' + x++,{"value" : x++,"configurable":true,"enumerable":true,"writable":true})
	,  'b' +  x++,{"value" : x++,"configurable":true,"enumerable":true,"writable":true})
	, GOPDS_P$0({method2: function() { return this.prop2 }
	, prop3: 'prop3'}))
	, 'method3_' + y,{"value": function() { return this.prop3 },"configurable":true,"enumerable":true,"writable":true})
	, GOPDS_A$0({a:{"get":function(){ return this.prop4 },"configurable":true,"enumerable":true}}))
	, GOPDS_P$0({prop4: 44}))
	, GOPDS_A$0({a:{"set":function(v){ this.prop4 = v },"configurable":true,"enumerable":true}
}));
console.log(obj1.method1() === obj1.prop1, obj1[ 'a1' ] === 2, obj1[ 'b3' ] === 4, obj1.method2() === obj1.prop2, obj1['method3_' + y]() === obj1.prop3);
console.log(obj1.prop4 === 44, obj1.a === 44, obj1.a == obj1.prop4, (obj1.a = 321) == obj1.prop4, obj1.prop4 === 321);

{
	var obj1$0 = DPS$0(DP$0(DPS$0(DP$0(DPS$0(DP$0(DP$0({
		prop1: 'prop1'
		, 'prop2': 'prop2'
		, method1: function() { return this.prop1 }}
		,  'a' + x++,{"value" : x++,"configurable":true,"enumerable":true,"writable":true})
		,  'b' +  x++,{"value" : x++,"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_P$0({method2: function() { return this['prop2'] }
		, prop3: 'prop3'}))
		, 'method3_' + y,{"value": function() { return this.prop3 },"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_A$0({a:{"get":function(){ return this['prop4'] },"configurable":true,"enumerable":true}}))
		, 'prop4',{"value": 44,"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_A$0({a:{"set":function(v){ this['prop4'] = v },"configurable":true,"enumerable":true}
	}));
	console.log(obj1$0.method1() === obj1$0.prop1, obj1$0[ 'a5' ] === 6, obj1$0[ 'b7' ] === 8, obj1$0.method2() === obj1$0['prop2'], obj1$0['method3_' + y]() === obj1$0.prop3);
	console.log(obj1$0['prop4'] === 44, obj1$0.a === 44, obj1$0.a == obj1$0['prop4'], (obj1$0.a = 321) == obj1$0['prop4'], obj1$0['prop4'] === 321);
}


{
	var propertyObj = {
		i: 0
		, toString: function(){ return ++this.i }
	};
	var obj = DP$0(DP$0(DP$0(DP$0({},
		propertyObj,{"value": propertyObj + "","configurable":true,"enumerable":true,"writable":true}),
		propertyObj + "",{"value": propertyObj + "","configurable":true,"enumerable":true,"writable":true}),
		propertyObj,{"value": propertyObj + "","configurable":true,"enumerable":true,"writable":true}),
		propertyObj,{"value": propertyObj + "","configurable":true,"enumerable":true,"writable":true}
	);
	console.log(obj["2"] == "1", obj["3"] == "4", obj["6"] == "5", obj["8"] == "7");
}

{
	var propertyObj$0 = {
		i: 0
		, toString: function(){ return ++this.i }
	};
	var obj$0 = DPS$0(DP$0(DP$0({},
		propertyObj$0,{"value": propertyObj$0 + "","configurable":true,"enumerable":true,"writable":true}),
		propertyObj$0,{"value": propertyObj$0 + "","configurable":true,"enumerable":true,"writable":true}),
		GOPDS_P$0({test1: propertyObj$0 + "",
		test2: propertyObj$0 + ""
	}));
	console.log(obj$0["2"] == "1", obj$0["4"] == "3", obj$0.test1 == "5", obj$0.test2 == "6");
}


// ----------------------

var obj2 = DPS$0(DP$0({},
	'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
	, GOPDS_A$0({a:{"get":function(){ return this['x'] }
	, "set":function(f){ this['x'] = f },"configurable":true,"enumerable":true}
}))
console.log(obj2['x'] === 1, obj2.a === 1, obj2.a == obj2['x'], (obj2.a = 321) == obj2['x'], obj2['x'] === 321);

{
	var obj2$0 = DPS$0(DP$0({},
		'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_A$0({a:{"set":function(f){ this['x'] = f }
		, "get":function(){ return this['x'] },"configurable":true,"enumerable":true}
	}))
	console.log(obj2$0['x'] === 1, obj2$0.a === 1, obj2$0.a == obj2$0['x'], (obj2$0.a = 321) == obj2$0['x'], obj2$0['x'] === 321);
}

{
	var obj2$1 = DPS$0(DP$0({},
		'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_A$0({'a':{"set":function(f){ this['x'] = f }
		, "get":function(){ return this['x'] },"configurable":true,"enumerable":true}
	}))
	console.log(obj2$1['x'] === 1, obj2$1.a === 1, obj2$1.a == obj2$1['x'], (obj2$1.a = 321) == obj2$1['x'], obj2$1['x'] === 321);
}

{
	var obj2$2 = DPS$0(DP$0({},
		'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_A$0({'a':{"set":function(f){ this['x'] = f }
		, "get":function(){ return this['x'] },"configurable":true,"enumerable":true}
	}))
	console.log(obj2$2['x'] === 1, obj2$2.a === 1, obj2$2.a == obj2$2['x'], (obj2$2.a = 321) == obj2$2['x'], obj2$2['x'] === 321);
}

{
	var obj2$3 = DPS$0(DP$0({},
		'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
		, GOPDS_A$0({a:{"set":function(f){ this['x'] = f }
		, "get":function(){ return this['x'] },"configurable":true,"enumerable":true}
	}))
	console.log(obj2$3['x'] === 1, obj2$3.a === 1, obj2$3.a == obj2$3['x'], (obj2$3.a = 321) == obj2$3['x'], obj2$3['x'] === 321);
}
