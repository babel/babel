var DP$0 = Object.defineProperty;var DPS$0 = Object.defineProperties;var GOPDS_P$0 = function(o){var d=Object.create(null);for(var p in o)if(o.hasOwnProperty(p)){d[p]={"value":o[p],"enumerable":true,"configurable":true,"writable":true};}return d;};var GOPDS_A$0 = function(o){var d=Object.create(null);for(var p in o)if(o.hasOwnProperty(p)){d[p]=o[p];}return d;};
{// one property
	{// simple
		var obj = DP$0({},
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj['x'] === 1);
	}

	{// simple exspression
		var obj$0 = DP$0({},
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$0['x' + 1] === 2);
	}

	{// exspression
		var obj$1 = DP$0({},
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$1['x' + 123] === 3);
	}

	{// method simple
		var obj$2 = DP$0({},
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$2['x']() === 1);
	}

	{// method simple exspression
		var obj$3 = DP$0({},
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$3['x' + 1]() === 2);
	}

	{// method exspression
		var obj$4 = DP$0({},
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$4['x' + 123]() === 3);
	}

	{// function simple
		var obj$5 = DP$0({},
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$5['x']() === 1);
	}

	{// function simple exspression
		var obj$6 = DP$0({},
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$6['x' + 1]() === 2);
	}

	{// function exspression
		var obj$7 = DP$0({},
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$7['x' + 123]() === 3);
	}

	{// getter simple
		var obj$8 = DP$0({},
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true}
		);
		console.log(obj$8['x'] === 1);
	}

	{// getter simple exspression
		var obj$9 = DP$0({},
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true}
		);
		console.log(obj$9['x' + 1] === 2);
	}

	{// getter exspression
		var obj$10 = DP$0({},
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true}
		);
		console.log(obj$10['x' + 123] === 3);
	}

	{// setter simple
		var _x = void 0;
		var obj$11 = DP$0({},
			'x',{"set":function(a){ _x = a },"configurable":true,"enumerable":true}
		);
		obj$11['x'] = 1;
		console.log(_x === 1);
	}

	{// setter simple exspression
		var _x$0 = void 0;
		var obj$12 = DP$0({},
			'x' + 1,{"set":function(a){ _x$0 = a },"configurable":true,"enumerable":true}
		);
		obj$12['x' + 1] = 2;
		console.log(_x$0 === 2);
	}

	{// setter exspression
		var _x$1 = void 0;
		var obj$13 = DP$0({},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$1 = a },"configurable":true,"enumerable":true}
		);
		obj$13['x' + 123] = 3;
		console.log(_x$1 === 3);
	}
}

{// two properties
	var x = 0;

	{// simple - right
		var obj$14 = DPS$0(DP$0({},
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$14['x'] === 1, obj$14.prop1 === 'prop' + x);
	}

	{// simple - left
		var obj$15 = DP$0({
			prop1: 'prop' + ++x},
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$15['x'] === 1, obj$15.prop1 === 'prop' + x);
	}

	{// simple exspression - right
		var obj$16 = DPS$0(DP$0({},
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$16['x' + 1] === 2, obj$16.prop1 === 'prop' + x);
	}

	{// simple exspression - left
		var obj$17 = DP$0({
			prop1: 'prop' + ++x},
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$17['x' + 1] === 2, obj$17.prop1 === 'prop' + x);
	}

	{// exspression - right
		var obj$18 = DPS$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$18['x' + 123] === 3, obj$18.prop1 === 'prop' + x);
	}

	{// exspression - left
		var obj$19 = DP$0({
			prop1: 'prop' + ++x},
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$19['x' + 123] === 3, obj$19.prop1 === 'prop' + x);
	}

	{// method simple - right
		var obj$20 = DPS$0(DP$0({},
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$20['x']() === 1, obj$20.prop1 === 'prop' + x);
	}

	{// method simple - left
		var obj$21 = DP$0({
			prop1: 'prop' + ++x},
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$21['x']() === 1, obj$21.prop1 === 'prop' + x);
	}

	{// method simple exspression - right
		var obj$22 = DPS$0(DP$0({},
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$22['x' + 1]() === 2, obj$22.prop1 === 'prop' + x);
	}

	{// method simple exspression - left
		var obj$23 = DP$0({
			prop1: 'prop' + ++x},
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$23['x' + 1]() === 2, obj$23.prop1 === 'prop' + x);
	}

	{// method exspression - right
		var obj$24 = DPS$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$24['x' + 123]() === 3, obj$24.prop1 === 'prop' + x);
	}

	{// method exspression - left
		var obj$25 = DP$0({
			prop1: 'prop' + ++x},
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$25['x' + 123]() === 3, obj$25.prop1 === 'prop' + x);
	}

	{// function simple - right
		var obj$26 = DPS$0(DP$0({},
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$26['x']() === 1, obj$26.prop1 === 'prop' + x);
	}

	{// function simple - left
		var obj$27 = DP$0({
			prop1: 'prop' + ++x},
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$27['x']() === 1, obj$27.prop1 === 'prop' + x);
	}

	{// function simple exspression - right
		var obj$28 = DPS$0(DP$0({},
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$28['x' + 1]() === 2, obj$28.prop1 === 'prop' + x);
	}

	{// function simple exspression - left
		var obj$29 = DP$0({
			prop1: 'prop' + ++x},
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$29['x' + 1]() === 2, obj$29.prop1 === 'prop' + x);
	}

	{// function exspression - right
		var obj$30 = DPS$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$30['x' + 123]() === 3, obj$30.prop1 === 'prop' + x);
	}

	{// function exspression - left
		var obj$31 = DP$0({
			prop1: 'prop' + ++x},
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$31['x' + 123]() === 3, obj$31.prop1 === 'prop' + x);
	}

	{// getter simple - right
		var obj$32 = DPS$0(DP$0({},
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$32['x'] === 1, obj$32.prop1 === 'prop' + x);
	}

	{// getter simple - left
		var obj$33 = DP$0({
			prop1: 'prop' + ++x},
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true}
		);
		console.log(obj$33['x'] === 1, obj$33.prop1 === 'prop' + x);
	}

	{// getter simple exspression - right
		var obj$34 = DPS$0(DP$0({},
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$34['x' + 1] === 2, obj$34.prop1 === 'prop' + x);
	}

	{// getter simple exspression - left
		var obj$35 = DP$0({
			prop1: 'prop' + ++x},
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true}
		);
		console.log(obj$35['x' + 1] === 2, obj$35.prop1 === 'prop' + x);
	}

	{// getter exspression - right
		var obj$36 = DPS$0(DP$0({},
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		console.log(obj$36['x' + 123] === 3, obj$36.prop1 === 'prop' + x);
	}

	{// getter exspression - left
		var obj$37 = DP$0({
			prop1: 'prop' + ++x},
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true}
		);
		console.log(obj$37['x' + 123] === 3, obj$37.prop1 === 'prop' + x);
	}

	{// setter simple - right
		var _x$2 = void 0;
		var obj$38 = DPS$0(DP$0({},
			'x',{"set":function(a){ _x$2 = a },"configurable":true,"enumerable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		obj$38['x'] = 1;
		console.log(_x$2 === 1, obj$38.prop1 === 'prop' + x);
	}

	{// setter simple - left
		var _x$3 = void 0;
		var obj$39 = DP$0({
			prop1: 'prop' + ++x},
			'x',{"set":function(a){ _x$3 = a },"configurable":true,"enumerable":true}
		);
		obj$39['x'] = 1;
		console.log(_x$3 === 1, obj$39.prop1 === 'prop' + x);
	}

	{// setter simple exspression - right
		var _x$4 = void 0;
		var obj$40 = DPS$0(DP$0({},
			'x' + 1,{"set":function(a){ _x$4 = a },"configurable":true,"enumerable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		obj$40['x' + 1] = 2;
		console.log(_x$4 === 2, obj$40.prop1 === 'prop' + x);
	}

	{// setter simple exspression - left
		var _x$5 = void 0;
		var obj$41 = DP$0({
			prop1: 'prop' + ++x},
			'x' + 1,{"set":function(a){ _x$5 = a },"configurable":true,"enumerable":true}
		);
		obj$41['x' + 1] = 2;
		console.log(_x$5 === 2, obj$41.prop1 === 'prop' + x);
	}

	{// setter exspression - right
		var _x$6 = void 0;
		var obj$42 = DPS$0(DP$0({},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$6 = a },"configurable":true,"enumerable":true})
			, GOPDS_P$0({prop1: 'prop' + ++x
		}));
		obj$42['x' + 123] = 3;
		console.log(_x$6 === 3, obj$42.prop1 === 'prop' + x);
	}

	{// setter exspression - left
		var _x$7 = void 0;
		var obj$43 = DP$0({
			prop1: 'prop' + ++x},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$7 = a },"configurable":true,"enumerable":true}
		);
		obj$43['x' + 123] = 3;
		console.log(_x$7 === 3, obj$43.prop1 === 'prop' + x);
	}
}

{// two properties - computed and string literal
	var x$0 = 0;

	{// simple - right
		var obj$44 = DP$0(DP$0({},
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$44['x'] === 1, obj$44['prop1'] === 'prop' + x$0);
	}

	{// simple - left
		var obj$45 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$45['x'] === 1, obj$45['prop1'] === 'prop' + x$0);
	}

	{// simple exspression - right
		var obj$46 = DP$0(DP$0({},
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$46['x' + 1] === 2, obj$46['prop1'] === 'prop' + x$0);
	}

	{// simple exspression - left
		var obj$47 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$47['x' + 1] === 2, obj$47['prop1'] === 'prop' + x$0);
	}

	{// exspression - right
		var obj$48 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$48['x' + 123] === 3, obj$48['prop1'] === 'prop' + x$0);
	}

	{// exspression - left
		var obj$49 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$49['x' + 123] === 3, obj$49['prop1'] === 'prop' + x$0);
	}

	{// method simple - right
		var obj$50 = DP$0(DP$0({},
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$50['x']() === 1, obj$50['prop1'] === 'prop' + x$0);
	}

	{// method simple - left
		var obj$51 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$51['x']() === 1, obj$51['prop1'] === 'prop' + x$0);
	}

	{// method simple exspression - right
		var obj$52 = DP$0(DP$0({},
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$52['x' + 1]() === 2, obj$52['prop1'] === 'prop' + x$0);
	}

	{// method simple exspression - left
		var obj$53 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$53['x' + 1]() === 2, obj$53['prop1'] === 'prop' + x$0);
	}

	{// method exspression - right
		var obj$54 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$54['x' + 123]() === 3, obj$54['prop1'] === 'prop' + x$0);
	}

	{// method exspression - left
		var obj$55 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$55['x' + 123]() === 3, obj$55['prop1'] === 'prop' + x$0);
	}

	{// function simple - right
		var obj$56 = DP$0(DP$0({},
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$56['x']() === 1, obj$56['prop1'] === 'prop' + x$0);
	}

	{// function simple - left
		var obj$57 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$57['x']() === 1, obj$57['prop1'] === 'prop' + x$0);
	}

	{// function simple exspression - right
		var obj$58 = DP$0(DP$0({},
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$58['x' + 1]() === 2, obj$58['prop1'] === 'prop' + x$0);
	}

	{// function simple exspression - left
		var obj$59 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$59['x' + 1]() === 2, obj$59['prop1'] === 'prop' + x$0);
	}

	{// function exspression - right
		var obj$60 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$60['x' + 123]() === 3, obj$60['prop1'] === 'prop' + x$0);
	}

	{// function exspression - left
		var obj$61 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$61['x' + 123]() === 3, obj$61['prop1'] === 'prop' + x$0);
	}

	{// getter simple - right
		var obj$62 = DP$0(DP$0({},
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$62['x'] === 1, obj$62['prop1'] === 'prop' + x$0);
	}

	{// getter simple - left
		var obj$63 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true}
		);
		console.log(obj$63['x'] === 1, obj$63['prop1'] === 'prop' + x$0);
	}

	{// getter simple exspression - right
		var obj$64 = DP$0(DP$0({},
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$64['x' + 1] === 2, obj$64['prop1'] === 'prop' + x$0);
	}

	{// getter simple exspression - left
		var obj$65 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true}
		);
		console.log(obj$65['x' + 1] === 2, obj$65['prop1'] === 'prop' + x$0);
	}

	{// getter exspression - right
		var obj$66 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$66['x' + 123] === 3, obj$66['prop1'] === 'prop' + x$0);
	}

	{// getter exspression - left
		var obj$67 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true}
		);
		console.log(obj$67['x' + 123] === 3, obj$67['prop1'] === 'prop' + x$0);
	}

	{// setter simple - right
		var _x$8 = void 0;
		var obj$68 = DP$0(DP$0({},
			'x',{"set":function(a){ _x$8 = a },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		obj$68['x'] = 1;
		console.log(_x$8 === 1, obj$68['prop1'] === 'prop' + x$0);
	}

	{// setter simple - left
		var _x$9 = void 0;
		var obj$69 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x',{"set":function(a){ _x$9 = a },"configurable":true,"enumerable":true}
		);
		obj$69['x'] = 1;
		console.log(_x$9 === 1, obj$69['prop1'] === 'prop' + x$0);
	}

	{// setter simple exspression - right
		var _x$10 = void 0;
		var obj$70 = DP$0(DP$0({},
			'x' + 1,{"set":function(a){ _x$10 = a },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		obj$70['x' + 1] = 2;
		console.log(_x$10 === 2, obj$70['prop1'] === 'prop' + x$0);
	}

	{// setter simple exspression - left
		var _x$11 = void 0;
		var obj$71 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + 1,{"set":function(a){ _x$11 = a },"configurable":true,"enumerable":true}
		);
		obj$71['x' + 1] = 2;
		console.log(_x$11 === 2, obj$71['prop1'] === 'prop' + x$0);
	}

	{// setter exspression - right
		var _x$12 = void 0;
		var obj$72 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$12 = a },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$0,"configurable":true,"enumerable":true,"writable":true}
		);
		obj$72['x' + 123] = 3;
		console.log(_x$12 === 3, obj$72['prop1'] === 'prop' + x$0);
	}

	{// setter exspression - left
		var _x$13 = void 0;
		var obj$73 = DP$0({
			'prop1': 'prop' + ++x$0},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$13 = a },"configurable":true,"enumerable":true}
		);
		obj$73['x' + 123] = 3;
		console.log(_x$13 === 3, obj$73['prop1'] === 'prop' + x$0);
	}
}

{//two properties - accessors
	var x$1 = 0;

	{// getter + setter simple - right
		var _x$14 = void 0;
		var obj$74 = DPS$0(DP$0({},
			'x',{"get":function(){ return _x$14 },"configurable":true,"enumerable":true})
			, GOPDS_A$0({x:{"set":function(a){ _x$14 = a },"configurable":true,"enumerable":true}
		}));
		obj$74['x'] = ++x$1;
		console.log(_x$14 === x$1, obj$74['x'] === x$1);
	}

	{// getter + setter simple - left
		var _x$15 = void 0;
		var obj$75 = DP$0(DPS$0({},
			GOPDS_A$0({x:{"set":function(a){ _x$15 = a },"configurable":true,"enumerable":true}})),
			'x',{"get":function(){ return _x$15 },"configurable":true,"enumerable":true}
		);
		obj$75['x'] = ++x$1;
		console.log(_x$15 === x$1, obj$75['x'] === x$1);
	}

	{// getter + setter simple exspression - right
		var _x$16 = void 0;
		var obj$76 = DPS$0(DP$0({},
			'x' + 1,{"get":function(){ return _x$16 },"configurable":true,"enumerable":true})
			, GOPDS_A$0({x1:{"set":function(a){ _x$16 = a },"configurable":true,"enumerable":true}
		}));
		obj$76['x' + 1] = 2;
		console.log(_x$16 === 2, obj$76['x' + 1] === x$1);
	}

	{// getter + setter simple exspression - left
		var _x$17 = void 0;
		var obj$77 = DP$0(DPS$0({},
			GOPDS_A$0({x1:{"set":function(a){ _x$17 = a },"configurable":true,"enumerable":true}})),
			'x' + 1,{"get":function(){ return _x$17 },"configurable":true,"enumerable":true}
		);
		obj$77['x' + 1] = ++x$1;
		console.log(_x$17 === x$1, obj$77['x' + 1] === x$1);
	}

	{// getter + setter exspression - right
		var _x$18 = void 0;
		var obj$78 = DPS$0(DP$0({},
			'x' + (function(){ return 123 })(),{"get":function(){ return _x$18 },"configurable":true,"enumerable":true})
			, GOPDS_A$0({x123:{"set":function(a){ _x$18 = a },"configurable":true,"enumerable":true}
		}));
		obj$78['x' + 123] = ++x$1;
		console.log(_x$18 === x$1, obj$78['x' + 123] === x$1);
	}

	{// getter + setter exspression - left
		var _x$19 = void 0;
		var obj$79 = DP$0(DPS$0({},
			GOPDS_A$0({x123:{"set":function(a){ _x$19 = a },"configurable":true,"enumerable":true}})),
			'x' + (function(){ return 123 })(),{"get":function(){ return _x$19 },"configurable":true,"enumerable":true}
		);
		obj$79['x' + 123] = ++x$1;
		console.log(_x$19 === x$1, obj$79['x' + 123] === x$1);
	}
}

{//two computed properties
	var x$2 = 0;

	{// simple - right
		var obj$80 = DP$0(DP$0({},
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$80['x'] === 1, obj$80['prop1'] === 'prop' + x$2);
	}

	{// simple - left
		var obj$81 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x',{"value": 1,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$81['x'] === 1, obj$81['prop1'] === 'prop' + x$2);
	}

	{// simple exspression - right
		var obj$82 = DP$0(DP$0({},
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true})
			, 'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$82['x' + 1] === 2, obj$82['prop1'] === 'prop' + x$2);
	}

	{// simple exspression - left
		var obj$83 = DP$0(DP$0({},
			'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + 1,{"value": 2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$83['x' + 1] === 2, obj$83['prop1'] === 'prop' + x$2);
	}

	{// exspression - right
		var obj$84 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$84['x' + 123] === 3, obj$84['prop1'] === 'prop' + x$2);
	}

	{// exspression - left
		var obj$85 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + (function(){ return 123 })(),{"value": 3,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$85['x' + 123] === 3, obj$85['prop1'] === 'prop' + x$2);
	}

	{// method simple - right
		var obj$86 = DP$0(DP$0({},
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$86['x']() === 1, obj$86['prop1'] === 'prop' + x$2);
	}

	{// method simple - left
		var obj$87 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x',{"value": function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$87['x']() === 1, obj$87['prop1'] === 'prop' + x$2);
	}

	{// method simple exspression - right
		var obj$88 = DP$0(DP$0({},
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$88['x' + 1]() === 2, obj$88['prop1'] === 'prop' + x$2);
	}

	{// method simple exspression - left
		var obj$89 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + 1,{"value": function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$89['x' + 1]() === 2, obj$89['prop1'] === 'prop' + x$2);
	}

	{// method exspression - right
		var obj$90 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$90['x' + 123]() === 3, obj$90['prop1'] === 'prop' + x$2);
	}

	{// method exspression - left
		var obj$91 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + (function(){ return 123 })(),{"value": function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$91['x' + 123]() === 3, obj$91['prop1'] === 'prop' + x$2);
	}

	{// function simple - right
		var obj$92 = DP$0(DP$0({},
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$92['x']() === 1, obj$92['prop1'] === 'prop' + x$2);
	}

	{// function simple - left
		var obj$93 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x',{"value":function(){ return 1 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$93['x']() === 1, obj$93['prop1'] === 'prop' + x$2);
	}

	{// function simple exspression - right
		var obj$94 = DP$0(DP$0({},
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$94['x' + 1]() === 2, obj$94['prop1'] === 'prop' + x$2);
	}

	{// function simple exspression - left
		var obj$95 = DP$0(DP$0({},
			'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + 1,{"value":function(){ return 2 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$95['x' + 1]() === 2, obj$95['prop1'] === 'prop' + x$2);
	}

	{// function exspression - right
		var obj$96 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$96['x' + 123]() === 3, obj$96['prop1'] === 'prop' + x$2);
	}

	{// function exspression - left
		var obj$97 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + (function(){ return 123 })(),{"value":function(){ return 3 },"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$97['x' + 123]() === 3, obj$97['prop1'] === 'prop' + x$2);
	}

	{// getter simple - right
		var obj$98 = DP$0(DP$0({},
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$98['x'] === 1, obj$98['prop1'] === 'prop' + x$2);
	}

	{// getter simple - left
		var obj$99 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x',{"get":function(){ return 1 },"configurable":true,"enumerable":true}
		);
		console.log(obj$99['x'] === 1, obj$99['prop1'] === 'prop' + x$2);
	}

	{// getter simple exspression - right
		var obj$100 = DP$0(DP$0({},
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true})
			, 'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$100['x' + 1] === 2, obj$100['prop1'] === 'prop' + x$2);
	}

	{// getter simple exspression - left
		var obj$101 = DP$0(DP$0({},
			'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + 1,{"get":function(){ return 2 },"configurable":true,"enumerable":true}
		);
		console.log(obj$101['x' + 1] === 2, obj$101['prop1'] === 'prop' + x$2);
	}

	{// getter exspression - right
		var obj$102 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		console.log(obj$102['x' + 123] === 3, obj$102['prop1'] === 'prop' + x$2);
	}

	{// getter exspression - left
		var obj$103 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + (function(){ return 123 })(),{"get":function(){ return 3 },"configurable":true,"enumerable":true}
		);
		console.log(obj$103['x' + 123] === 3, obj$103['prop1'] === 'prop' + x$2);
	}

	{// setter simple - right
		var _x$20 = void 0;
		var obj$104 = DP$0(DP$0({},
			'x',{"set":function(a){ _x$20 = a },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		obj$104['x'] = 1;
		console.log(_x$20 === 1, obj$104['prop1'] === 'prop' + x$2);
	}

	{// setter simple - left
		var _x$21 = void 0;
		var obj$105 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x',{"set":function(a){ _x$21 = a },"configurable":true,"enumerable":true}
		);
		obj$105['x'] = 1;
		console.log(_x$21 === 1, obj$105['prop1'] === 'prop' + x$2);
	}

	{// setter simple exspression - right
		var _x$22 = void 0;
		var obj$106 = DP$0(DP$0({},
			'x' + 1,{"set":function(a){ _x$22 = a },"configurable":true,"enumerable":true})
			, 'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		obj$106['x' + 1] = 2;
		console.log(_x$22 === 2, obj$106['prop1'] === 'prop' + x$2);
	}

	{// setter simple exspression - left
		var _x$23 = void 0;
		var obj$107 = DP$0(DP$0({},
			'prop' + 1,{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + 1,{"set":function(a){ _x$23 = a },"configurable":true,"enumerable":true}
		);
		obj$107['x' + 1] = 2;
		console.log(_x$23 === 2, obj$107['prop1'] === 'prop' + x$2);
	}

	{// setter exspression - right
		var _x$24 = void 0;
		var obj$108 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$24 = a },"configurable":true,"enumerable":true})
			, 'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}
		);
		obj$108['x' + 123] = 3;
		console.log(_x$24 === 3, obj$108['prop1'] === 'prop' + x$2);
	}

	{// setter exspression - left
		var _x$25 = void 0;
		var obj$109 = DP$0(DP$0({},
			'prop1',{"value": 'prop' + ++x$2,"configurable":true,"enumerable":true,"writable":true}),
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$25 = a },"configurable":true,"enumerable":true}
		);
		obj$109['x' + 123] = 3;
		console.log(_x$25 === 3, obj$109['prop1'] === 'prop' + x$2);
	}
}

{//two computed properties - accessors
	var x$3 = 0;

	{// getter + setter simple - right
		var _x$26 = void 0;
		var obj$110 = DP$0(DP$0({},
			'x',{"get":function(){ return _x$26 },"configurable":true,"enumerable":true})
			, 'x',{"set":function(a){ _x$26 = a },"configurable":true,"enumerable":true}
		);
		obj$110['x'] = ++x$3;
		console.log(_x$26 === x$3, obj$110['x'] === x$3);
	}

	{// getter + setter simple - left
		var _x$27 = void 0;
		var obj$111 = DP$0(DP$0({},
			'x',{"set":function(a){ _x$27 = a },"configurable":true,"enumerable":true}),
			'x',{"get":function(){ return _x$27 },"configurable":true,"enumerable":true}
		);
		obj$111['x'] = ++x$3;
		console.log(_x$27 === x$3, obj$111['x'] === x$3);
	}

	{// getter + setter simple exspression - right
		var _x$28 = void 0;
		var obj$112 = DP$0(DP$0({},
			'x' + 1,{"get":function(){ return _x$28 },"configurable":true,"enumerable":true})
			, 'x' + 1,{"set":function(a){ _x$28 = a },"configurable":true,"enumerable":true}
		);
		obj$112['x' + 1] = 2;
		console.log(_x$28 === 2, obj$112['x' + 1] === x$3);
	}

	{// getter + setter simple exspression - left
		var _x$29 = void 0;
		var obj$113 = DP$0(DP$0({},
			'x' + 1,{"set":function(a){ _x$29 = a },"configurable":true,"enumerable":true}),
			'x' + 1,{"get":function(){ return _x$29 },"configurable":true,"enumerable":true}
		);
		obj$113['x' + 1] = ++x$3;
		console.log(_x$29 === x$3, obj$113['x' + 1] === x$3);
	}

	{// getter + setter exspression - right
		var _x$30 = void 0;
		var obj$114 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"get":function(){ return _x$30 },"configurable":true,"enumerable":true})
			, 'x' + (function(){ return 123 })(),{"set":function(a){ _x$30 = a },"configurable":true,"enumerable":true}
		);
		obj$114['x' + 123] = ++x$3;
		console.log(_x$30 === x$3, obj$114['x' + 123] === x$3);
	}

	{// getter + setter exspression - left
		var _x$31 = void 0;
		var obj$115 = DP$0(DP$0({},
			'x' + (function(){ return 123 })(),{"set":function(a){ _x$31 = a },"configurable":true,"enumerable":true}),
			'x' + (function(){ return 123 })(),{"get":function(){ return _x$31 },"configurable":true,"enumerable":true}
		);
		obj$115['x' + 123] = ++x$3;
		console.log(_x$31 === x$3, obj$115['x' + 123] === x$3);
	}
}
