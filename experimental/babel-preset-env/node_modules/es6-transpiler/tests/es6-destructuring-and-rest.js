/*
 Test note:
 ! completed test: do not edit it       !
 */

var arr = [{a: [1, 2, 3]}, {a: [4, 5, 6]}];
function test(first) {
	if ( first ) {
		if ( first ) {
			for ( var i = 0, len = arr.length ; i < len ; i++ ) {
				var some = arr[i];
				var a = some.a, b = some.b;

				return this.method.apply(this, [b].concat(a));
			}
		}
	}
	else {
		for ( var i$0 = 0, len$0 = arr.length ; i$0 < len$0 ; i$0++ ) {
			var some$0 = arr[i$0];
			let {a, b} = some$0;

			return this.method(b, ...a);
		}
	}
}

var obj = {
	method: function(def) {
		var res = [].slice.call(arguments, 1);

		return def + "-" + res.join("|");
	}
};

console.log(test.call(obj, true) === 'undefined-1|2|3');
console.log(test.call(obj, false) === 'undefined-1|2|3');