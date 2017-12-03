var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;var $D$3;
var x = void 0, y = void 0, g = void 0, h = void 0;
var x1 = 1, y1 = 2;
{
	var x$0 = (y$0 = {x1: x1, y1: y1})['x' + 1], y$0 = y$0['y' + 1];
	console.log(x$0 === x1, y$0 === y1);

	{
		var x$1 = (y$1 = {x1: x1, y1: y1})[(function(x)  {return x.toString()} )('x' + 1)], y$1 = y$1[(function(){return (function(x)  {return x.toString()} )('y' + 1)})()];
		console.log(x$1 === x1, y$1 === y1);
	}

	{
		var x1$0 = 'x', y1$0 = 'y';

		var x$2 = (y$2 = {x1: x1$0, y1: y1$0})[(function(x)  {return x.toString()} )(x1$0 + 1)], y$2 = y$2[(function(){return (function(x)  {return x.toString()} )(y1$0 + 1)})()];
		console.log(x1$0 === 'x', y1$0 === 'y', x$2 === x1$0, y$2 === y1$0);
	}
}

{
	var arr = [];
	var g$0=void 0, h$0=void 0;$D$3 = ([{x1: x1, y1: y1}, {x1: x1, y1: y1}]);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for(  ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){g$0 = (h$0 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]))['x' + 1], h$0 = h$0['y' + 1];
		arr.push(g$0 + '|' + h$0);
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;g$0=void 0;h$0=void 0;
	console.log(arr.join('|') === [x1, y1, x1, y1].join('|'));

	{
		var arr$0 = [];
		var g$1=void 0, h$1=void 0;$D$3 = ([{x1: x1, y1: y1}, {x1: x1, y1: y1}]);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for(  ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){g$1 = (h$1 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]))[(function(x)  {return x.toString()} )('x' + 1)], h$1 = h$1[(function(){return (function(x)  {return x.toString()} )('y' + 1)})()];
			arr$0.push(g$1 + '|' + h$1);
		};$D$0 = $D$1 = $D$2 = $D$3 = void 0;g$1=void 0;h$1=void 0;
		console.log(arr$0.join('|') === [x1, y1, x1, y1].join('|'));
	}

	{
		var arr$1 = [];
		var x1$1 = 'x', y1$1 = 'y';

		var g$2=void 0, h$2=void 0;$D$3 = ([{x1: x1$1, y1: y1$1}, {x1: x1$1, y1: y1$1}]);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for(  ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){g$2 = (h$2 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]))[(function(x)  {return x.toString()} )(x1$1 + 1)], h$2 = h$2[(function(){return (function(x)  {return x.toString()} )(y1$1 + 1)})()];
			arr$1.push(g$2 + '|' + h$2);
		};$D$0 = $D$1 = $D$2 = $D$3 = void 0;g$2=void 0;h$2=void 0;
		console.log(arr$1.join('|') === [x1$1, y1$1, x1$1, y1$1].join('|'));
	}
}


{
	var func = function(y)  {var x = y['x' + 1], y = y['y' + 1];return x + y} ;
	console.log(func({x1: x1, y1: y1}) === x1 + y1);

	{
//		let func = ({[((x) => (x.toString()))('x' + 1)]: x, [(function(){return ((x) => (x.toString()))('y' + 1)})()]: y}) => (x, y);
//		console.log(func({x1, y1}));
	}

	{
		var x1$2 = 'x', y1$2 = 'y';

//		let func = ({[((x) => (x.toString()))(x1 + 1)]: x, [(function(){return ((x) => (x.toString()))(y1 + 1)})()]: y}) => (x, y);
//		console.log(func({x1, y1}));
	}
}

