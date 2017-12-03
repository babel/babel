"use strict";
/*es6-transpiler has-iterators:false, has-generators: false*/
function test_forOf(someArrayLike) {var $D$2;var $D$3;
	var result = [];
	$D$2 = 0;$D$3 = someArrayLike.length;for( var item ;$D$2 < $D$3;){item = (someArrayLike[$D$2++]);
		result.push(item);
	};$D$2 = $D$3 = void 0;
	return result;
}
{
	var arr = [1, 2, 3, 4, 5, 6];
	console.log(test_forOf(arr).join("|") === arr.join("|"));
}

function test_ArrayComprehensions(someArrayLike) {
	return (function(){var $D$0;var $D$1;var $result$0 = [], x;$D$0 = 0;$D$1 = someArrayLike.length;for(;$D$0 < $D$1;){x = (someArrayLike[$D$0++]);{$result$0.push(x)}};return $result$0})()
}
{
	var arr$0 = [6, 5, 4, 3, 2, 1];
	console.log(test_ArrayComprehensions(arr$0).join("|") === arr$0.join("|"));
}
