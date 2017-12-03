/*globals module*/

"use strict";

let re_isJSHintGlobal = /^(\s)?global(s)?\s+/;
let re_isES6TranspilerOptions = /^(\s)?es6-transpiler?\s+/;

module.exports = {
	scanCommentsForOptions: function(commentsNodes, onoption) {
		commentsNodes.forEach(function(commentNode) {
			if ( commentNode.type === 'Block' ) {
				let value = commentNode.value;

				let matchedRE
					, defaultValue = false
					, optionsName
				;

				if ( re_isJSHintGlobal.test(value) ) {
					matchedRE = re_isJSHintGlobal;
					optionsName = 'globals';
				}
				else if ( re_isES6TranspilerOptions.test(value) ) {
					matchedRE = re_isES6TranspilerOptions;
					defaultValue = true;
					optionsName = 'es6';
				}

				if ( matchedRE ) {
					let defWithValue = /^\s*(\S+)\s*:\s*((?:true)|(?:false))\s*$/;
					let defWithoutValue = /^\s*(\S+)\s*$/;

					onoption(commentNode, optionsName, value.replace(matchedRE, "").split(",").reduce(function(obj, val) {
						let variableDef;
						val = val.trim();

						if ( val.charAt(0) != '-' ) {
							if ( variableDef = val.match(defWithValue) ) {
								obj[variableDef[1]] = variableDef[2] == 'true';
							}
							else if ( variableDef = val.match(defWithoutValue) ) {
								obj[variableDef[1]] = defaultValue;
							}
						}

						return obj;
					}, {}));
				}
			}
		});
	}
};