
function generateUUID() {
	var d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	});
}

var tmplUUID = generateUUID();

module.exports = {
	generateUUID: generateUUID

	, generate: function(str) {
		return str.replace(/\$\{([a-z0-9_]+)\}/gi, function(str, group) {return '\${' + group + tmplUUID + '}'})
	}

	, replace: function(tmpl) {
		var i = 0;
		var keys = [];
		var allPrams = {};
		var params;
		while ( params = arguments[++i] ) {
			if ( typeof params === 'object' && params ) {
				keys.push.apply(keys, Object.keys(params).map(function(key) {
					allPrams[key] = params[key];
					return key;
				}));
			}
		}

		return keys.reduce(function(tmpl, paramName) {
			return tmpl.replace(new RegExp('\\\${' + paramName + tmplUUID + '}', "g"), allPrams[paramName]);
		}, tmpl);
	}
};
