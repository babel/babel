"use strict";
var x;
{ let x; }
{ let x; }
{ let x; }

{ let y; }
{ let y; }
{ let y; }

{ let z; { let z; }}
{ let z; }
{ let z; { let z; { let z; }}}

function test() {
	var x;
	{ let x; }
	{ let x; }
	{ let x; }

	{ let y; }
	{ let y; }
	{ let y; }

	{ let z; { let z; }}
	{ let z; }
	{ let z; { let z; { let z; }}}
}

function test2() {
	var a = 0;
	
	while ( ++a < 10 ) {
		switch ( a ) {
			case 1:
			case 3: {
				let x;
				console.log(x === void 0);
				x = 999;
			}
				break;
			case 2:
			case 4: {
				let x;
				console.log(x === void 0);
				x = 888;
			}
				break;
		}
	}
	let x;
	console.log(x === void 0);
	x = 777;
	
	let _x;
	_x = void 0;
	do {
		let x;
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	}
	while( true );
	
	_x = void 0;
	while( true ) {
		let x;
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	};
	
	_x = void 0;
	for( ; ; ) {let x;
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	};
	
	_x = void 0;
	for( var t = 0 ; t < 2 ; t++ ) {
		for( let x ; ; ) {
			x = x || _x;
			console.log(x === void 0 || x == 1);
			if ( x == void 0 ) x = 0;
			
			if ( ++x > 1 ) break;
			_x = x;
		};
	}
	
	_x = void 0;
	for( let x ; ; ) {
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
	};
	
	_x = void 0;
	for( let x of [void 0, 1] ) {
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	};
	
	_x = void 0;
	for( let y of [ null, null ] ) {let x;
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	};
	
	_x = void 0;
	for( let x in {0: 0, 1: 1} ) {if ( x == '0' )x = void 0;
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	};
	
	_x = void 0;
	for( let y in {0: null} ) {let x;
		x = x || _x;
		console.log(x === void 0 || x == 1);
		if ( x == void 0 ) x = 0;
		
		if ( ++x > 1 ) break;
		_x = x;
		x = 9;
	};
}
test2();