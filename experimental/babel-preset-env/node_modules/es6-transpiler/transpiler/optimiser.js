"use strict";

const assert = require("assert");
const core = require("./core");
const is = require("simple-is");

let plugin = module.exports = {
	reset: function() {

	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;
	}

	, before: function() {
		let resetUnCapturedVariables = this.options.resetUnCapturedVariables
			|| core.getScopeOptions()['resetUnCaptured']
		;

		if( resetUnCapturedVariables === true ) {
			this.options.resetUnCapturedVariables = resetUnCapturedVariables = ['let', 'const', 'fun', 'var'];
		}

		return resetUnCapturedVariables && Array.isArray(resetUnCapturedVariables) && resetUnCapturedVariables.length > 1 || false;
	}

	, ':: VariableDeclaration': function(node) {
		if ( core.getScopeOptions(node.$scope, node)['resetUnCaptured'] === true ) {
			core.getVariableDeclarationNodes(node).forEach(function(declarationNode) {
				if( !declarationNode.$captured ) {
					this.resetVariable(
						declarationNode
						, null
					);
				}
			}, this);
		}
	}

	, ':: FunctionDeclaration': function(node) {
		if ( core.getScopeOptions(node.$scope, node)['resetUnCaptured'] === true ) {
			this.resetVariable(node.id, "fun", node.$scope.parent.node);
		}
	}

	, ':: Identifier': function(node) {
		if( node.$refToScope && core.getScopeOptions(node.$scope, node)['resetUnCaptured'] === true ) {
			if( node.$captured === false ) {
				this.resetVariable(node);
			}
		}
	}

	, resetVariable: function(node, kind, scopeNode) {
		if( node.$captured ) {
			return;
		}

		const name = node.name;
		kind = kind || node.$originalKind || (node.$refToScope && node.$refToScope.getKind(name)) || node.kind || node.$scope.closestHoistScope().getKind(name);

		if( !is.someof(kind, this.options.resetUnCapturedVariables) ) {
			return;
		}

		scopeNode = scopeNode || (node.$refToScope && node.$refToScope.node) || node.$scope.node;

		if( kind === 'var' || kind === 'fun' ) {
			scopeNode = scopeNode.$scope.closestHoistScope().node;
		}

		if ( core.is.isLoop(scopeNode.$parent) && scopeNode.$parent.$iify === true ) {
			// TODO:: allow reset variables inside IIFY (it's buggy now)
			return;
		}

		const insertIndex = scopeNode.range[1] + (core.is.isLoop(scopeNode) ? 0 : (scopeNode.type === "Program" ? 0 : -1));

//		if( !core.is.isFunction(scopeNode) ) {
			if( !scopeNode.$voidsInsert ) {
				scopeNode.$voidsInsert = {};
			}
			if( scopeNode.$voidsInsert[name] === void 0 ) {
				scopeNode.$voidsInsert[name] = null;

				this.alter.insertBefore(
					insertIndex
					, ";" + name + " = void 0;"
				);
			}
//		}
//		else {
			// TODO::
			// function test(){ let a = {}; return; } -> function test(){ var a = {}; a = void 0;return; }
			// function test(){ let a = {}; return a; } -> function test(){ var a = {}; return; }
//		}
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
