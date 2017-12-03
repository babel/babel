
"use strict";

//let isLetConstAvalibale = (function(){"use strict";
//	let supported = false;
//	try {
//		supported = (new Function('"use strict";let a = 1;const b = 2;return a===1&&b===2'))();
//	}
//	catch(e){}
//	return supported;
//})();
let original_compile;
let es6transpiler;
let filter;
let transpilerLaunched = false;

function es6_compile(content, filename) {
	if ( ( !filter || filter(filename, content) ) && !transpilerLaunched ) {
		transpilerLaunched = true;
		var transpiledResult = es6transpiler.run({src: content, filename: filename, fullES6: true});
		transpilerLaunched = false;

		if( transpiledResult.errors && transpiledResult.errors.length ) {
			throw new Error(transpiledResult.errors.join("\n"));
		}
		else {
			content = transpiledResult.src;
		}
	}
	return original_compile.call(this, content, filename);
}

module.exports = {
	setES6transpiler: function(_es6transpiler) {
		es6transpiler = _es6transpiler
	}

	, node_inject_on: function(_filter) {
		if ( !es6transpiler ) {
			throw new Error('uninitialized');
		}

		if ( !original_compile ) {
			filter = _filter;

			if ( typeof filter !== 'function' ) {
				filter = void 0;
			}

			original_compile = require('module').prototype._compile;
			require('module').prototype._compile = es6_compile;
		}
	}

	, node_inject_off: function() {
		if ( original_compile ) {
			require('module').prototype._compile = original_compile;
			original_compile = void 0;
		}
	}
};
