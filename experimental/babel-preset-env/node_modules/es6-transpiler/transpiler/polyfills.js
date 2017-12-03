"use strict";

const assert = require("assert");
const core = require("./core");
const is = require("simple-is");
const fs = require("fs");
const path = require("path");
const POLYFILLS_LIB_VERSION = 0.1;

const polifillsMap = {
	"String.raw": "String_raw"
	, "RegExp_u_flag": "RegExp"
	, "RegExp_y_flag": "RegExp"
};

let plugin = module.exports = {
	reset: function() {
		this.__currentApplyName = null;
	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;

		this.polyfills = [];
		this.polyfillKeys = {};

		let buildDir = path.join(__dirname, "..", "build", "es5", "polyfills");
		if ( !fs.existsSync(buildDir) ) {
			buildDir = path.join(__dirname, "..", "polyfills");
		}
		this.polyfillsRoot = buildDir;
	}

	, onResultObject: function(resultObj) {
		resultObj.polyfills = {
			version: POLYFILLS_LIB_VERSION
			, getFullLib: this.getFullLib.bind(this)
			, getNeedfulLib: this.getNeedfulLib.bind(this)
			, getNeedfulList: this.getNeedfulList.bind(this)
		};
	}

	, before: function() {
		if ( core.getScopeOptions()['includePolyfills'] === true ) {
			// TODO:: scope-based options
			this.options.includePolyfills = true;
		}
	}

	, after: function(astTree) {
		let includePolyfillsOption = this.options.includePolyfills;
		let polyfillLib;

		if ( includePolyfillsOption === "full" ) {
			polyfillLib = this.getFullLib();
		}
		else if ( includePolyfillsOption === true ) {
			polyfillLib = this.getNeedfulLib();
		}

		if ( polyfillLib ) {
			let currentApplyName = this.getApplyName();
			let polyfillsSeparator = this.options.polyfillsSeparator || "";

			this.alter.insertBefore(0, ";" + currentApplyName + "();");
			this.alter.insertAfter(astTree.range[1], polyfillsSeparator + "\nfunction " + currentApplyName + "(){\"use strict\";\n" + polyfillLib + "\n}");
		}
	}

//	, 'MemberExpression[object=Identifier]:first': function(node, parent) {
//		let object = node["object"], property = node["property"];
//
//		assert(isIdentifier(object));
//
//		if( (isIdentifier(property) && property["name"] === 'raw' )
//			|| (property["type"] === 'Literal' && property["value"] === 'raw' )
//		) {
//			let index = this.polyfills.length - 1;
//			this.polyfills[index] = 'String.raw';
//			this.polyfillKeys["String.raw"] = index;
//
//			return true;
//		}
//		return false;
//	}
//
//	, 'Identifier[name="Symbol"]:first': function(node, parent) {
//		let index = this.polyfills.length - 1;
//		this.polyfills[index] = 'Symbol';
//		this.polyfillKeys["Symbol"] = index;
//
//		return true;
//	}

	, mark: function(polyfillName) {
		if ( this.polyfillKeys[polyfillName] === void 0 ) {
			let index = this.polyfills.length;
			this.polyfills[index] = polyfillName;
			this.polyfillKeys[polyfillName] = index;
		}
	}

	, getApplyName: function() {
		if( !this.__currentApplyName ) {
			// We need only one unique 'super' name for the entire file
			this.__currentApplyName = core.unique("applyPolyfills", true);
		}
		return this.__currentApplyName;
	}

	, getNeedfulList: function() {
		return this.polyfills;
	}

	, getFullLib: function() {
		let filterMap = {};
		return Object.keys(polifillsMap)
			.map(function(key){ return polifillsMap[key] })
			.filter(function(name){ return filterMap[name] ? false : (filterMap[name] = true) })
			.map(function(name){ return this.loadPolyfill(name) }, this)
		;
	}

	, getNeedfulLib: function() {
		let content = "";
		for ( let i = 0, len = this.polyfills.length ; i < len ; i++ ) {
			content += this.loadPolyfill(this.polyfills[i]);
		}
		return content;
	}

	, loadPolyfill: function(name) {
		let fileName = path.join(this.polyfillsRoot, name + ".js");

		if ( !fs.existsSync(fileName) ) {
			return '';
		}

		return String(fs.readFileSync(fileName));
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
