
var es6transpiler = require('es6-transpiler');
var path = require('path');
es6transpiler.node_inject_on(function(fileName){
//	console.log(fileName);

	return fileName.indexOf("node_modules") === -1
		&& (fileName.indexOf("transpiler") !== -1 || fileName.indexOf("run-tests") !== -1)
		&& fileName.indexOf("esprima") === -1
		&& fileName.indexOf("regjsparser") === -1
		&& fileName.lastIndexOf(".js") === fileName.length - 3
});
require("./run-tests.es6.js");
es6transpiler.node_inject_off();
