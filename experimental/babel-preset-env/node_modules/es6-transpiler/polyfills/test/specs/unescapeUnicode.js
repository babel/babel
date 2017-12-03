const utils = require('../utils');
const unescapeUnicode = utils.getES5Module('lib/unescapeUnicode');

exports["complex"] = function(test) {
	let newStr = unescapeUnicode('qwe\\\\\\\\\\u0023 \\\\\\u0024 \\\\u0024 \\u0025\\u0026 ');

	test.equals(newStr, "qwe\\\\\\\\# \\\\$ \\\\u0024 %& ");
};