
var a = { [  'x'  ] () { return 123 } };
console.log(a['x']() === 123);

var b = {
	prop1: 'prop1',
	[  'x'  ] () { return this.prop1 + 123 }
};
console.log(b['x']() === b.prop1 + 123);

var c = {
	prop1: 'prop1',
	'prop2': 'prop2',
	[  'x'  ] () { return this.prop1 + this['prop2'] + 123 }
};
console.log(c['x']() === c.prop1 + c.prop2 + 123);

var d = {
	prop1: 'prop1',
	'prop2': 'prop2',
	[  'x'  ] () { return this.prop1 + this['prop2'] + 123 + this.prop3 + this['prop4'] }
	, prop3: 'prop3'
	, 'prop4': 'prop4'
};
console.log(d['x']() === d.prop1 + d['prop2'] + 123 + d.prop3 + d['prop4']);

var f = {
	[  'x'  ] () { return 123 + this['prop3'] + this.prop4 }
	, 'prop3': 'prop3'
	, prop4: 'prop4'
};
console.log(f['x']() === 123 + f['prop3'] + f.prop4);

var x = 1;
var y = Math.random();

// ---

let obj1 = {
	prop1: 'prop1'
	, prop2: 'prop2'
	, method1() { return this.prop1 }
	, [ 'a' + x++ ]: x++
	, [ 'b' +  x++ ]: x++
	, method2() { return this.prop2 }
	, prop3: 'prop3'
	, ['method3_' + y]() { return this.prop3 }
	, get a(){ return this.prop4 }
	, prop4: 44
	, set a(v){ this.prop4 = v }
};
console.log(obj1.method1() === obj1.prop1, obj1[ 'a1' ] === 2, obj1[ 'b3' ] === 4, obj1.method2() === obj1.prop2, obj1['method3_' + y]() === obj1.prop3);
console.log(obj1.prop4 === 44, obj1.a === 44, obj1.a == obj1.prop4, (obj1.a = 321) == obj1.prop4, obj1.prop4 === 321);

{
	let obj1 = {
		prop1: 'prop1'
		, 'prop2': 'prop2'
		, method1() { return this.prop1 }
		, [ 'a' + x++ ]: x++
		, [ 'b' +  x++ ]: x++
		, method2() { return this['prop2'] }
		, prop3: 'prop3'
		, ['method3_' + y]() { return this.prop3 }
		, get a(){ return this['prop4'] }
		, 'prop4': 44
		, set a(v){ this['prop4'] = v }
	};
	console.log(obj1.method1() === obj1.prop1, obj1[ 'a5' ] === 6, obj1[ 'b7' ] === 8, obj1.method2() === obj1['prop2'], obj1['method3_' + y]() === obj1.prop3);
	console.log(obj1['prop4'] === 44, obj1.a === 44, obj1.a == obj1['prop4'], (obj1.a = 321) == obj1['prop4'], obj1['prop4'] === 321);
}


{
	let propertyObj = {
		i: 0
		, toString(){ return ++this.i }
	};
	let obj = {
		[propertyObj]: propertyObj + "",
		[propertyObj + ""]: propertyObj + "",
		[propertyObj]: propertyObj + "",
		[propertyObj]: propertyObj + ""
	};
	console.log(obj["2"] == "1", obj["3"] == "4", obj["6"] == "5", obj["8"] == "7");
}

{
	let propertyObj = {
		i: 0
		, toString(){ return ++this.i }
	};
	let obj = {
		[propertyObj]: propertyObj + "",
		[propertyObj]: propertyObj + "",
		test1: propertyObj + "",
		test2: propertyObj + ""
	};
	console.log(obj["2"] == "1", obj["4"] == "3", obj.test1 == "5", obj.test2 == "6");
}


// ----------------------

let obj2 = {
	['x']: 1
	, get a(){ return this['x'] }
	, set a(f){ this['x'] = f }
}
console.log(obj2['x'] === 1, obj2.a === 1, obj2.a == obj2['x'], (obj2.a = 321) == obj2['x'], obj2['x'] === 321);

{
	let obj2 = {
		['x']: 1
		, set a(f){ this['x'] = f }
		, get a(){ return this['x'] }
	}
	console.log(obj2['x'] === 1, obj2.a === 1, obj2.a == obj2['x'], (obj2.a = 321) == obj2['x'], obj2['x'] === 321);
}

{
	let obj2 = {
		['x']: 1
		, set 'a'(f){ this['x'] = f }
		, get 'a'(){ return this['x'] }
	}
	console.log(obj2['x'] === 1, obj2.a === 1, obj2.a == obj2['x'], (obj2.a = 321) == obj2['x'], obj2['x'] === 321);
}

{
	let obj2 = {
		['x']: 1
		, set 'a'(f){ this['x'] = f }
		, get a(){ return this['x'] }
	}
	console.log(obj2['x'] === 1, obj2.a === 1, obj2.a == obj2['x'], (obj2.a = 321) == obj2['x'], obj2['x'] === 321);
}

{
	let obj2 = {
		['x']: 1
		, set a(f){ this['x'] = f }
		, get 'a'(){ return this['x'] }
	}
	console.log(obj2['x'] === 1, obj2.a === 1, obj2.a == obj2['x'], (obj2.a = 321) == obj2['x'], obj2['x'] === 321);
}
