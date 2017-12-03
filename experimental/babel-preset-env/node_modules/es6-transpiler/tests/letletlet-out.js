"use strict";
var x;
{ var x$0 = void 0; }
{ var x$1 = void 0; }
{ var x$2 = void 0; }

{ var y = void 0; }
{ var y$0 = void 0; }
{ var y$1 = void 0; }

{ var z = void 0; { var z$0 = void 0; }}
{ var z$1 = void 0; }
{ var z$2 = void 0; { var z$3 = void 0; { var z$4 = void 0; }}}

function test() {
	var x;
	{ var x$3; }
	{ var x$4; }
	{ var x$5; }

	{ var y; }
	{ var y$2; }
	{ var y$3; }

	{ var z; { var z$5; }}
	{ var z$6; }
	{ var z$7; { var z$8; { var z$9; }}}
}

function test2() {var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;var $D$3;
	var a = 0;
	
	while ( ++a < 10 ) {
		switch ( a ) {
			case 1:
			case 3: {
				var x$6 = void 0;
				console.log(x$6 === void 0);
				x$6 = 999;
			}
				break;
			case 2:
			case 4: {
				var x$7 = void 0;
				console.log(x$7 === void 0);
				x$7 = 888;
			}
				break;
		}
	}
	var x;
	console.log(x === void 0);
	x = 777;
	
	var _x;
	_x = void 0;
	do {
		var x$8 = void 0;
		x$8 = x$8 || _x;
		console.log(x$8 === void 0 || x$8 == 1);
		if ( x$8 == void 0 ) x$8 = 0;
		
		if ( ++x$8 > 1 ) break;
		_x = x$8;
		x$8 = 9;
	}
	while( true );
	
	_x = void 0;
	while( true ) {
		var x$9 = void 0;
		x$9 = x$9 || _x;
		console.log(x$9 === void 0 || x$9 == 1);
		if ( x$9 == void 0 ) x$9 = 0;
		
		if ( ++x$9 > 1 ) break;
		_x = x$9;
		x$9 = 9;
	};
	
	_x = void 0;
	for( ; ; ) {var x$10 = void 0;
		x$10 = x$10 || _x;
		console.log(x$10 === void 0 || x$10 == 1);
		if ( x$10 == void 0 ) x$10 = 0;
		
		if ( ++x$10 > 1 ) break;
		_x = x$10;
		x$10 = 9;
	};
	
	_x = void 0;
	for( var t = 0 ; t < 2 ; t++ ) {
		for( var x$11 = void 0 ; ; ) {
			x$11 = x$11 || _x;
			console.log(x$11 === void 0 || x$11 == 1);
			if ( x$11 == void 0 ) x$11 = 0;
			
			if ( ++x$11 > 1 ) break;
			_x = x$11;
		};
	}
	
	_x = void 0;
	for( var x$12 = void 0 ; ; ) {
		x$12 = x$12 || _x;
		console.log(x$12 === void 0 || x$12 == 1);
		if ( x$12 == void 0 ) x$12 = 0;
		
		if ( ++x$12 > 1 ) {break;}
		_x = x$12;
	};
	
	_x = void 0;
	$D$3 = ([void 0, 1]);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( var x$13 ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){x$13 = ($D$2 ? $D$3[$D$0++] : $D$1["value"]);
		x$13 = x$13 || _x;
		console.log(x$13 === void 0 || x$13 == 1);
		if ( x$13 == void 0 ) x$13 = 0;
		
		if ( ++x$13 > 1 ) {break;}
		_x = x$13;
		x$13 = 9;
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;;
	
	_x = void 0;
	$D$3 = ([ null, null ]);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for( var y ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){y = ($D$2 ? $D$3[$D$0++] : $D$1["value"]);var x$14 = void 0;
		x$14 = x$14 || _x;
		console.log(x$14 === void 0 || x$14 == 1);
		if ( x$14 == void 0 ) x$14 = 0;
		
		if ( ++x$14 > 1 ) break;
		_x = x$14;
		x$14 = 9;
	};$D$0 = $D$1 = $D$2 = $D$3 = void 0;;
	
	_x = void 0;
	for( var x$15 in {0: 0, 1: 1} ) {if ( x$15 == '0' )x$15 = void 0;
		x$15 = x$15 || _x;
		console.log(x$15 === void 0 || x$15 == 1);
		if ( x$15 == void 0 ) x$15 = 0;
		
		if ( ++x$15 > 1 ) break;
		_x = x$15;
		x$15 = 9;
	};
	
	_x = void 0;
	for( var y$4 in {0: null} ) {var x$16 = void 0;
		x$16 = x$16 || _x;
		console.log(x$16 === void 0 || x$16 == 1);
		if ( x$16 == void 0 ) x$16 = 0;
		
		if ( ++x$16 > 1 ) break;
		_x = x$16;
		x$16 = 9;
	};
}
test2();