var {default: reporter} = (require('nodeunit').reporters)
	, path = require('path');

reporter.run(
	['specs/RegExp'].map( (moduleName) => path.join(__dirname, `${moduleName}.js`) )
);
