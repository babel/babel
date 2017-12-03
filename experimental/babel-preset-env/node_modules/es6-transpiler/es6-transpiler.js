/*global require*/
"use strict";

require("es5-shim");
require("es6-shim");
polifills();

var MIXIN = function(t,s) {
	for(var p in s) {
		if(s.hasOwnProperty(p)) {
			Object.defineProperty(t, p, Object.getOwnPropertyDescriptor(s,p));
		}
	}
	return t;
};

const BUILD_VERSION = '%%BUILD_VERSION%%';

const fs = require("fs");
const error = require("./lib/error");
const defaultOptions = require("./options");
const core = require("./transpiler/core");
const StringAlter = require("string-alter");
const is = require("simple-is");
const ASTQuery = require("astquery");
const node_inject = require("./lib/node_inject");
const esprima = require("./lib/esprima_harmony");

const ESPRIMA_OPTIONS = {
	loc: true,
	groupLoc: true,
	range: true,
	groupRange: true,
	comment: true,
	strictMode: true
};

let plugins = [
	core
	, require("./transpiler/typesDetection")
	, require("./transpiler/numericLiteral")
	, require("./transpiler/classes")
	, require("./transpiler/loopClosures")
	, require("./transpiler/letConst")
	, require("./transpiler/objectLiteral")
	, require("./transpiler/functions")
	, require("./transpiler/spread")
	, require("./transpiler/destructuring")
	, require("./transpiler/quasiLiterals")
	, require("./transpiler/arrayComprehension")
	, require("./transpiler/generatorComprehension")
	, require("./transpiler/forOf")
	, require("./transpiler/optimiser")
	, require("./transpiler/RegExp")
	, require("./transpiler/unicode")
	, require("./transpiler/polyfills")
];

let extensions = [
	{
		check: 'classesExtras'// should be object {staticProperty: boolean, publicProperty: boolean}
		, esprimaOption: 'classesExtras'
		, lib: "./transpiler/extensions/classes"
	}
];

function consoleArgumentsToOptions(args, options) {
	args.forEach(function(arg, index, args) {
		arg = arg + "";
		if ( arg.startsWith("--") ) {
			let val = args[index + 1];
			options[arg.substr(2)] = (!val || val.startsWith("--")) ? true : val;
		}
	});
	return options;
}

function esprimaParse(src, esprimaOptions, fileName) {
	let ast;
	try {
		ast = esprima.parse(src, esprimaOptions);
	}
	catch(e) {
		e.message += ('\nfilename: ' + fileName);
		throw e;
	}
	return ast;
}

module.exports = {
	runned: false

	, node_inject_on: node_inject.node_inject_on
	, node_inject_off: node_inject.node_inject_off

	, setupPlugins: function(config, astQuery) {
		var optionsList = this.optionsList = [];

		config.esprima = esprima;

		plugins.forEach(function(plugin, index) {
			var options = optionsList[index] = {}, passIt = false;

			if( typeof plugin.setup === "function" ) {
				for(let i in config)if(config.hasOwnProperty(i))options[i] = config[i];

				if( plugin.setup(this.alter, this.ast, options, this.src) === false ) {
					passIt = options.passIt = true;
				}
			}

			if ( passIt === false ) {
				if ( typeof plugin.onResultObject === 'function' ) {
					this._onResults.push(plugin.onResultObject);
				}

				astQuery.on(plugin, {prefix: '::', group: index});
			}
		}, this);
	}

	, applyChanges: function(config, doNotReset, esprimaOptions, fileName) {
		if( this.alter.hasChanges() ) {// has changes in classes replacement Step
			this.src = this.alter.apply();

			if( doNotReset !== true ) {

				this.ast = esprimaParse(this.src, esprimaOptions, fileName);

				error.reset();
				core.reset();

				this.alter = new StringAlter(this.src);
			}

			if( config ) {
				this.reset();
				this.setupPlugins(config);
			}
		}
	}
	, reset: function() {
		this.ast = this.src = null;
		error.reset();

		plugins.forEach(function(plugin) {
			if( typeof plugin.reset === "function" ) {
				plugin.reset();
			}
		});

		this._astQuerySteps = {};
		this._onResults = [];
	}

	, run: function run(config) {
		this.config = config || (config = {});
		for(let i in defaultOptions)if(defaultOptions.hasOwnProperty(i) && !config.hasOwnProperty(i))config[i] = defaultOptions[i];
		if ( config["fromConsole"] === true && Array.isArray(config["consoleArgs"]) ) {
			consoleArgumentsToOptions(config["consoleArgs"], config);
		}
//		config.classesExtras = {staticProperty: true, publicProperty: true};
		config.esprimaOptions = MIXIN({}, ESPRIMA_OPTIONS);

		if( this.runned === true ) {
			this.reset();
		}
		this._astQuerySteps = {};
		this._onResults = [];
		this.runned = true;

		config.fullES6 = true;// by default for now
		config.environments = Array.isArray(config.environments) ? config.environments : [
			// by default
			"browser"
			, "node"
		];

		// adding extensions to plugin list
		extensions.forEach(function(extension) {
			if ( config[extension.check] ) {
				plugins.push(require(extension.lib));
				if ( typeof extension.esprimaOption === 'string' ) {
					config.esprimaOptions[extension.esprimaOption] = config[extension.esprimaOption];
				}
			}
		});

		// input
		let isSourceInput = false;
		if( typeof config.src === "string" || typeof config.src === "object" ) {
			this.src = String(config.src);
			isSourceInput = true;
		}
		else if( typeof config.filename === "string" ) {
			this.src = String(fs.readFileSync(config.filename));
			isSourceInput = true;
		}
		else if( typeof config.ast === "object" ) {
			throw new Error("Currently unsupported");
			/*
			src = null;
			ast = config.ast;
			*/
		}

		if( !this.ast && isSourceInput ) {
			this.ast = esprimaParse(this.src, config.esprimaOptions, config.filename);
		}
		else {
			throw new Error("Input not found " + config.filename);
		}

		this.alter = new StringAlter(this.src, {policy: {/*eraseInErase: "error", */fromMoreThanTo: "disallow", unUniqueRemove: "error"}});

		// output
		const output = this.output = {errors: [], src: ""};

		let astQuery = this.loadASTQuery();
		this.setupPlugins(config, astQuery);

		plugins.forEach(this.runPlugin, this);

		// output
		if( error.errors.length ) {
			output.exitcode = -1;
			output.errors = error.errors;
		}
		else if (config.outputType === "ast") {
			// return the modified AST instead of src code
			// get rid of all added $ properties first, such as $parent and $scope
			output.ast = astQuery.getAST({cleanup: true});
		}
		else {
			// apply changes produced by varify and return the transformed src
			//console.log(changes);var transformedSrc = "";try{ transformedSrc = alter(src, changes) } catch(e){ console.error(e+"") };

			this.applyChanges(null, true, config.esprimaOptions, config.filename);
			output.src = this.src;
		}

		if( config.errorsToConsole ) {
			if ( output.errors.length ) {
				process.stderr.write(output.errors.join("\n"));
				process.stderr.write("\n");
				process.exit(-1);
			}
		}

		if( config.outputToConsole === true	) {
			outputToConsole(output, config);
		}

		if( config.outputFilename ) {
			fs.writeFileSync(config.outputFilename, output.src)
		}

		this._onResults.forEach(function(callback) {
			callback(output)
		});

		return output;
	}

	, runPlugin: function(plugin, index) {
		let options = this.optionsList[index];
		let astQuery = this.astQuery;

		if( options.passIt === true ) {
			return;
		}

		if( typeof plugin.before === "function" ) {
			if( plugin.before(this.ast, this.output) === false ) {
				return;
			}
		}

		astQuery.apply({group: index});

		if( typeof plugin.after === "function" ) {
			if( plugin.after(this.ast, this.output) === false ) {
				return;
			}
		}

		if( options.applyChangesAfter ) {
			this.applyChanges(this.config);
		}
	}

	, loadASTQuery: function() {
		// adding custom keys in ASTQuery.VISITOR_KEYS
		let visitorKeys = ASTQuery.getVisitorKeys('es6');
		let IdentifierVK = visitorKeys['Identifier'];
		if ( IdentifierVK.indexOf('default') === -1 ) {
			IdentifierVK.push('default');
		}
		return this.astQuery = new ASTQuery(this.ast, visitorKeys, {onpreparenode: core.onpreparenode});
	}

	, version: BUILD_VERSION
};

node_inject.setES6transpiler(module.exports);

function outputToConsole(output, config) {
	if (config.outputType === "stats" && output.stats) {
		process.stdout.write(output.stats.toString());
		process.exit(0);
	}
	if (config.outputType === "ast" && output.ast) {
		process.stdout.write(JSON.stringify(output.ast, null, 4));
	}
	if (output.src) {
		process.stdout.write(output.src);
	}
	process.exit(0);
}

function polifills() {
	if ( !Array.prototype.contains ) {
		Array.prototype.contains = function(from) {
			return !!~this.indexOf(from);
		}
	}

	if ( !String.prototype.contains ) {
		String.prototype.contains = function(from) {
			return !!~this.indexOf(from);
		}
	}
}
