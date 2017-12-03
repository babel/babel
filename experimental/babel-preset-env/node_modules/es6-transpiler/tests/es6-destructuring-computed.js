
let x, y, g, h;
let x1 = 1, y1 = 2;
{
	let {['x' + 1]: x, ['y' + 1]: y} = {x1, y1};
	console.log(x === x1, y === y1);

	{
		let {[((x) => (x.toString()))('x' + 1)]: x, [(function(){return ((x) => (x.toString()))('y' + 1)})()]: y} = {x1, y1};
		console.log(x === x1, y === y1);
	}

	{
		let x1 = 'x', y1 = 'y';

		let {[((x) => (x.toString()))(x1 + 1)]: x, [(function(){return ((x) => (x.toString()))(y1 + 1)})()]: y} = {x1, y1};
		console.log(x1 === 'x', y1 === 'y', x === x1, y === y1);
	}
}

{
	let arr = [];
	for( let {['x' + 1]: g, ['y' + 1]: h} of [{x1, y1}, {x1, y1}] ) {
		arr.push(g + '|' + h);
	}
	console.log(arr.join('|') === [x1, y1, x1, y1].join('|'));

	{
		let arr = [];
		for( let {[((x) => (x.toString()))('x' + 1)]: g, [(function(){return ((x) => (x.toString()))('y' + 1)})()]: h} of [{x1, y1}, {x1, y1}] ) {
			arr.push(g + '|' + h);
		}
		console.log(arr.join('|') === [x1, y1, x1, y1].join('|'));
	}

	{
		let arr = [];
		let x1 = 'x', y1 = 'y';

		for( let {[((x) => (x.toString()))(x1 + 1)]: g, [(function(){return ((x) => (x.toString()))(y1 + 1)})()]: h} of [{x1, y1}, {x1, y1}] ) {
			arr.push(g + '|' + h);
		}
		console.log(arr.join('|') === [x1, y1, x1, y1].join('|'));
	}
}


{
	let func = ({['x' + 1]: x, ['y' + 1]: y}) => (x + y);
	console.log(func({x1, y1}) === x1 + y1);

	{
//		let func = ({[((x) => (x.toString()))('x' + 1)]: x, [(function(){return ((x) => (x.toString()))('y' + 1)})()]: y}) => (x, y);
//		console.log(func({x1, y1}));
	}

	{
		let x1 = 'x', y1 = 'y';

//		let func = ({[((x) => (x.toString()))(x1 + 1)]: x, [(function(){return ((x) => (x.toString()))(y1 + 1)})()]: y}) => (x, y);
//		console.log(func({x1, y1}));
	}
}

