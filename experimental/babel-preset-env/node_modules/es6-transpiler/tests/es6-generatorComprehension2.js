
var arr1 = [1, 2, 3], arr2 = [{a:'a'}, {a:'b'}, {a:'c'}], arr3 = [[{b: 1, a: 2}], [{b: 3, a: 4}], [{b: 5, a: 6}]];
var gen = ( {x, y, b1, a1} for (x of arr1) for ({a: y} of arr2) for ([{b: b1, a: a1}] of arr3) if ( x != 2 ) )

var out = [];

for( let {x, y, b1, a1} of gen )
	out.push(x + y + b1 + a1)

console.log(out.length == 2 * 3 * 3, out.join("|") == '1a12|1a34|1a56|1b12|1b34|1b56|1c12|1c34|1c56|3a12|3a34|3a56|3b12|3b34|3b56|3c12|3c34|3c56')/*
 Test note:
 ! completed test: do not edit it       !
 */
