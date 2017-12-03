
{// one property
	{// simple
		let obj = {
			['x']: 1
		};
		console.log(obj['x'] === 1);
	}

	{// simple exspression
		let obj = {
			['x' + 1]: 2
		};
		console.log(obj['x' + 1] === 2);
	}

	{// exspression
		let obj = {
			['x' + (function(){ return 123 })()]: 3
		};
		console.log(obj['x' + 123] === 3);
	}

	{// method simple
		let obj = {
			['x'](){ return 1 }
		};
		console.log(obj['x']() === 1);
	}

	{// method simple exspression
		let obj = {
			['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1]() === 2);
	}

	{// method exspression
		let obj = {
			['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123]() === 3);
	}

	{// function simple
		let obj = {
			['x']:function(){ return 1 }
		};
		console.log(obj['x']() === 1);
	}

	{// function simple exspression
		let obj = {
			['x' + 1]:function(){ return 2 }
		};
		console.log(obj['x' + 1]() === 2);
	}

	{// function exspression
		let obj = {
			['x' + (function(){ return 123 })()]:function(){ return 3 }
		};
		console.log(obj['x' + 123]() === 3);
	}

	{// getter simple
		let obj = {
			get ['x'](){ return 1 }
		};
		console.log(obj['x'] === 1);
	}

	{// getter simple exspression
		let obj = {
			get ['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1] === 2);
	}

	{// getter exspression
		let obj = {
			get ['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123] === 3);
	}

	{// setter simple
		let _x;
		let obj = {
			set ['x'](a){ _x = a }
		};
		obj['x'] = 1;
		console.log(_x === 1);
	}

	{// setter simple exspression
		let _x;
		let obj = {
			set ['x' + 1](a){ _x = a }
		};
		obj['x' + 1] = 2;
		console.log(_x === 2);
	}

	{// setter exspression
		let _x;
		let obj = {
			set ['x' + (function(){ return 123 })()](a){ _x = a }
		};
		obj['x' + 123] = 3;
		console.log(_x === 3);
	}
}

{// two properties
	let x = 0;

	{// simple - right
		let obj = {
			['x']: 1
			, prop1: 'prop' + ++x
		};
		console.log(obj['x'] === 1, obj.prop1 === 'prop' + x);
	}

	{// simple - left
		let obj = {
			prop1: 'prop' + ++x,
			['x']: 1
		};
		console.log(obj['x'] === 1, obj.prop1 === 'prop' + x);
	}

	{// simple exspression - right
		let obj = {
			['x' + 1]: 2
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 1] === 2, obj.prop1 === 'prop' + x);
	}

	{// simple exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			['x' + 1]: 2
		};
		console.log(obj['x' + 1] === 2, obj.prop1 === 'prop' + x);
	}

	{// exspression - right
		let obj = {
			['x' + (function(){ return 123 })()]: 3
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 123] === 3, obj.prop1 === 'prop' + x);
	}

	{// exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			['x' + (function(){ return 123 })()]: 3
		};
		console.log(obj['x' + 123] === 3, obj.prop1 === 'prop' + x);
	}

	{// method simple - right
		let obj = {
			['x'](){ return 1 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x']() === 1, obj.prop1 === 'prop' + x);
	}

	{// method simple - left
		let obj = {
			prop1: 'prop' + ++x,
			['x'](){ return 1 }
		};
		console.log(obj['x']() === 1, obj.prop1 === 'prop' + x);
	}

	{// method simple exspression - right
		let obj = {
			['x' + 1](){ return 2 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 1]() === 2, obj.prop1 === 'prop' + x);
	}

	{// method simple exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1]() === 2, obj.prop1 === 'prop' + x);
	}

	{// method exspression - right
		let obj = {
			['x' + (function(){ return 123 })()](){ return 3 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 123]() === 3, obj.prop1 === 'prop' + x);
	}

	{// method exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123]() === 3, obj.prop1 === 'prop' + x);
	}

	{// function simple - right
		let obj = {
			['x']:function(){ return 1 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x']() === 1, obj.prop1 === 'prop' + x);
	}

	{// function simple - left
		let obj = {
			prop1: 'prop' + ++x,
			['x']:function(){ return 1 }
		};
		console.log(obj['x']() === 1, obj.prop1 === 'prop' + x);
	}

	{// function simple exspression - right
		let obj = {
			['x' + 1]:function(){ return 2 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 1]() === 2, obj.prop1 === 'prop' + x);
	}

	{// function simple exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			['x' + 1]:function(){ return 2 }
		};
		console.log(obj['x' + 1]() === 2, obj.prop1 === 'prop' + x);
	}

	{// function exspression - right
		let obj = {
			['x' + (function(){ return 123 })()]:function(){ return 3 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 123]() === 3, obj.prop1 === 'prop' + x);
	}

	{// function exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			['x' + (function(){ return 123 })()]:function(){ return 3 }
		};
		console.log(obj['x' + 123]() === 3, obj.prop1 === 'prop' + x);
	}

	{// getter simple - right
		let obj = {
			get ['x'](){ return 1 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x'] === 1, obj.prop1 === 'prop' + x);
	}

	{// getter simple - left
		let obj = {
			prop1: 'prop' + ++x,
			get ['x'](){ return 1 }
		};
		console.log(obj['x'] === 1, obj.prop1 === 'prop' + x);
	}

	{// getter simple exspression - right
		let obj = {
			get ['x' + 1](){ return 2 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 1] === 2, obj.prop1 === 'prop' + x);
	}

	{// getter simple exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			get ['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1] === 2, obj.prop1 === 'prop' + x);
	}

	{// getter exspression - right
		let obj = {
			get ['x' + (function(){ return 123 })()](){ return 3 }
			, prop1: 'prop' + ++x
		};
		console.log(obj['x' + 123] === 3, obj.prop1 === 'prop' + x);
	}

	{// getter exspression - left
		let obj = {
			prop1: 'prop' + ++x,
			get ['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123] === 3, obj.prop1 === 'prop' + x);
	}

	{// setter simple - right
		let _x;
		let obj = {
			set ['x'](a){ _x = a }
			, prop1: 'prop' + ++x
		};
		obj['x'] = 1;
		console.log(_x === 1, obj.prop1 === 'prop' + x);
	}

	{// setter simple - left
		let _x;
		let obj = {
			prop1: 'prop' + ++x,
			set ['x'](a){ _x = a }
		};
		obj['x'] = 1;
		console.log(_x === 1, obj.prop1 === 'prop' + x);
	}

	{// setter simple exspression - right
		let _x;
		let obj = {
			set ['x' + 1](a){ _x = a }
			, prop1: 'prop' + ++x
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj.prop1 === 'prop' + x);
	}

	{// setter simple exspression - left
		let _x;
		let obj = {
			prop1: 'prop' + ++x,
			set ['x' + 1](a){ _x = a }
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj.prop1 === 'prop' + x);
	}

	{// setter exspression - right
		let _x;
		let obj = {
			set ['x' + (function(){ return 123 })()](a){ _x = a }
			, prop1: 'prop' + ++x
		};
		obj['x' + 123] = 3;
		console.log(_x === 3, obj.prop1 === 'prop' + x);
	}

	{// setter exspression - left
		let _x;
		let obj = {
			prop1: 'prop' + ++x,
			set ['x' + (function(){ return 123 })()](a){ _x = a }
		};
		obj['x' + 123] = 3;
		console.log(_x === 3, obj.prop1 === 'prop' + x);
	}
}

{// two properties - computed and string literal
	let x = 0;

	{// simple - right
		let obj = {
			['x']: 1
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// simple - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x']: 1
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// simple exspression - right
		let obj = {
			['x' + 1]: 2
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// simple exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x' + 1]: 2
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// exspression - right
		let obj = {
			['x' + (function(){ return 123 })()]: 3
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x' + (function(){ return 123 })()]: 3
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// method simple - right
		let obj = {
			['x'](){ return 1 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// method simple - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x'](){ return 1 }
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// method simple exspression - right
		let obj = {
			['x' + 1](){ return 2 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// method simple exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// method exspression - right
		let obj = {
			['x' + (function(){ return 123 })()](){ return 3 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// method exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// function simple - right
		let obj = {
			['x']:function(){ return 1 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// function simple - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x']:function(){ return 1 }
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// function simple exspression - right
		let obj = {
			['x' + 1]:function(){ return 2 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// function simple exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x' + 1]:function(){ return 2 }
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// function exspression - right
		let obj = {
			['x' + (function(){ return 123 })()]:function(){ return 3 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// function exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			['x' + (function(){ return 123 })()]:function(){ return 3 }
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// getter simple - right
		let obj = {
			get ['x'](){ return 1 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// getter simple - left
		let obj = {
			'prop1': 'prop' + ++x,
			get ['x'](){ return 1 }
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// getter simple exspression - right
		let obj = {
			get ['x' + 1](){ return 2 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// getter simple exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			get ['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// getter exspression - right
		let obj = {
			get ['x' + (function(){ return 123 })()](){ return 3 }
			, 'prop1': 'prop' + ++x
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// getter exspression - left
		let obj = {
			'prop1': 'prop' + ++x,
			get ['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// setter simple - right
		let _x;
		let obj = {
			set ['x'](a){ _x = a }
			, 'prop1': 'prop' + ++x
		};
		obj['x'] = 1;
		console.log(_x === 1, obj['prop1'] === 'prop' + x);
	}

	{// setter simple - left
		let _x;
		let obj = {
			'prop1': 'prop' + ++x,
			set ['x'](a){ _x = a }
		};
		obj['x'] = 1;
		console.log(_x === 1, obj['prop1'] === 'prop' + x);
	}

	{// setter simple exspression - right
		let _x;
		let obj = {
			set ['x' + 1](a){ _x = a }
			, 'prop1': 'prop' + ++x
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj['prop1'] === 'prop' + x);
	}

	{// setter simple exspression - left
		let _x;
		let obj = {
			'prop1': 'prop' + ++x,
			set ['x' + 1](a){ _x = a }
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj['prop1'] === 'prop' + x);
	}

	{// setter exspression - right
		let _x;
		let obj = {
			set ['x' + (function(){ return 123 })()](a){ _x = a }
			, 'prop1': 'prop' + ++x
		};
		obj['x' + 123] = 3;
		console.log(_x === 3, obj['prop1'] === 'prop' + x);
	}

	{// setter exspression - left
		let _x;
		let obj = {
			'prop1': 'prop' + ++x,
			set ['x' + (function(){ return 123 })()](a){ _x = a }
		};
		obj['x' + 123] = 3;
		console.log(_x === 3, obj['prop1'] === 'prop' + x);
	}
}

{//two properties - accessors
	let x = 0;

	{// getter + setter simple - right
		let _x;
		let obj = {
			get ['x'](){ return _x }
			, set x(a){ _x = a }
		};
		obj['x'] = ++x;
		console.log(_x === x, obj['x'] === x);
	}

	{// getter + setter simple - left
		let _x;
		let obj = {
			set x(a){ _x = a },
			get ['x'](){ return _x }
		};
		obj['x'] = ++x;
		console.log(_x === x, obj['x'] === x);
	}

	{// getter + setter simple exspression - right
		let _x;
		let obj = {
			get ['x' + 1](){ return _x }
			, set x1(a){ _x = a }
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj['x' + 1] === x);
	}

	{// getter + setter simple exspression - left
		let _x;
		let obj = {
			set x1(a){ _x = a },
			get ['x' + 1](){ return _x }
		};
		obj['x' + 1] = ++x;
		console.log(_x === x, obj['x' + 1] === x);
	}

	{// getter + setter exspression - right
		let _x;
		let obj = {
			get ['x' + (function(){ return 123 })()](){ return _x }
			, set x123(a){ _x = a }
		};
		obj['x' + 123] = ++x;
		console.log(_x === x, obj['x' + 123] === x);
	}

	{// getter + setter exspression - left
		let _x;
		let obj = {
			set x123(a){ _x = a },
			get ['x' + (function(){ return 123 })()](){ return _x }
		};
		obj['x' + 123] = ++x;
		console.log(_x === x, obj['x' + 123] === x);
	}
}

{//two computed properties
	let x = 0;

	{// simple - right
		let obj = {
			['x']: 1
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// simple - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x']: 1
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// simple exspression - right
		let obj = {
			['x' + 1]: 2
			, ['prop' + 1]: 'prop' + ++x
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// simple exspression - left
		let obj = {
			['prop' + 1]: 'prop' + ++x,
			['x' + 1]: 2
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// exspression - right
		let obj = {
			['x' + (function(){ return 123 })()]: 3
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// exspression - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x' + (function(){ return 123 })()]: 3
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// method simple - right
		let obj = {
			['x'](){ return 1 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// method simple - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x'](){ return 1 }
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// method simple exspression - right
		let obj = {
			['x' + 1](){ return 2 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// method simple exspression - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// method exspression - right
		let obj = {
			['x' + (function(){ return 123 })()](){ return 3 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// method exspression - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// function simple - right
		let obj = {
			['x']:function(){ return 1 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// function simple - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x']:function(){ return 1 }
		};
		console.log(obj['x']() === 1, obj['prop1'] === 'prop' + x);
	}

	{// function simple exspression - right
		let obj = {
			['x' + 1]:function(){ return 2 }
			, ['prop' + 1]: 'prop' + ++x
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// function simple exspression - left
		let obj = {
			['prop' + 1]: 'prop' + ++x,
			['x' + 1]:function(){ return 2 }
		};
		console.log(obj['x' + 1]() === 2, obj['prop1'] === 'prop' + x);
	}

	{// function exspression - right
		let obj = {
			['x' + (function(){ return 123 })()]:function(){ return 3 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// function exspression - left
		let obj = {
			['prop1']: 'prop' + ++x,
			['x' + (function(){ return 123 })()]:function(){ return 3 }
		};
		console.log(obj['x' + 123]() === 3, obj['prop1'] === 'prop' + x);
	}

	{// getter simple - right
		let obj = {
			get ['x'](){ return 1 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// getter simple - left
		let obj = {
			['prop1']: 'prop' + ++x,
			get ['x'](){ return 1 }
		};
		console.log(obj['x'] === 1, obj['prop1'] === 'prop' + x);
	}

	{// getter simple exspression - right
		let obj = {
			get ['x' + 1](){ return 2 }
			, ['prop' + 1]: 'prop' + ++x
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// getter simple exspression - left
		let obj = {
			['prop' + 1]: 'prop' + ++x,
			get ['x' + 1](){ return 2 }
		};
		console.log(obj['x' + 1] === 2, obj['prop1'] === 'prop' + x);
	}

	{// getter exspression - right
		let obj = {
			get ['x' + (function(){ return 123 })()](){ return 3 }
			, ['prop1']: 'prop' + ++x
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// getter exspression - left
		let obj = {
			['prop1']: 'prop' + ++x,
			get ['x' + (function(){ return 123 })()](){ return 3 }
		};
		console.log(obj['x' + 123] === 3, obj['prop1'] === 'prop' + x);
	}

	{// setter simple - right
		let _x;
		let obj = {
			set ['x'](a){ _x = a }
			, ['prop1']: 'prop' + ++x
		};
		obj['x'] = 1;
		console.log(_x === 1, obj['prop1'] === 'prop' + x);
	}

	{// setter simple - left
		let _x;
		let obj = {
			['prop1']: 'prop' + ++x,
			set ['x'](a){ _x = a }
		};
		obj['x'] = 1;
		console.log(_x === 1, obj['prop1'] === 'prop' + x);
	}

	{// setter simple exspression - right
		let _x;
		let obj = {
			set ['x' + 1](a){ _x = a }
			, ['prop' + 1]: 'prop' + ++x
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj['prop1'] === 'prop' + x);
	}

	{// setter simple exspression - left
		let _x;
		let obj = {
			['prop' + 1]: 'prop' + ++x,
			set ['x' + 1](a){ _x = a }
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj['prop1'] === 'prop' + x);
	}

	{// setter exspression - right
		let _x;
		let obj = {
			set ['x' + (function(){ return 123 })()](a){ _x = a }
			, ['prop1']: 'prop' + ++x
		};
		obj['x' + 123] = 3;
		console.log(_x === 3, obj['prop1'] === 'prop' + x);
	}

	{// setter exspression - left
		let _x;
		let obj = {
			['prop1']: 'prop' + ++x,
			set ['x' + (function(){ return 123 })()](a){ _x = a }
		};
		obj['x' + 123] = 3;
		console.log(_x === 3, obj['prop1'] === 'prop' + x);
	}
}

{//two computed properties - accessors
	let x = 0;

	{// getter + setter simple - right
		let _x;
		let obj = {
			get ['x'](){ return _x }
			, set ['x'](a){ _x = a }
		};
		obj['x'] = ++x;
		console.log(_x === x, obj['x'] === x);
	}

	{// getter + setter simple - left
		let _x;
		let obj = {
			set ['x'](a){ _x = a },
			get ['x'](){ return _x }
		};
		obj['x'] = ++x;
		console.log(_x === x, obj['x'] === x);
	}

	{// getter + setter simple exspression - right
		let _x;
		let obj = {
			get ['x' + 1](){ return _x }
			, set ['x' + 1](a){ _x = a }
		};
		obj['x' + 1] = 2;
		console.log(_x === 2, obj['x' + 1] === x);
	}

	{// getter + setter simple exspression - left
		let _x;
		let obj = {
			set ['x' + 1](a){ _x = a },
			get ['x' + 1](){ return _x }
		};
		obj['x' + 1] = ++x;
		console.log(_x === x, obj['x' + 1] === x);
	}

	{// getter + setter exspression - right
		let _x;
		let obj = {
			get ['x' + (function(){ return 123 })()](){ return _x }
			, set ['x' + (function(){ return 123 })()](a){ _x = a }
		};
		obj['x' + 123] = ++x;
		console.log(_x === x, obj['x' + 123] === x);
	}

	{// getter + setter exspression - left
		let _x;
		let obj = {
			set ['x' + (function(){ return 123 })()](a){ _x = a },
			get ['x' + (function(){ return 123 })()](){ return _x }
		};
		obj['x' + 123] = ++x;
		console.log(_x === x, obj['x' + 123] === x);
	}
}
