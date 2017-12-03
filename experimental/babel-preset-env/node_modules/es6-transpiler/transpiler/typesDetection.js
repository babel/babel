/*global Set:false*/
"use strict";

const assert = require("assert");
const core = require("./core");

let TYPES = {
	Undefined: 'undefined'
	, Null: 'null'
	, Number: 'Number'
	, Boolean: 'Boolean'
	, Class: 'Class'
	, Function: 'Function'
	, String: 'String'
	, Array: 'Array'
	, Object: 'Object'
	, Variant: 'Variant'
	, RegExp: 'RegExp'
};

var plugin = module.exports = {
	reset: function() {

	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;

		return false;// TODO:: this plugin is not ready yet
	}

	, ':: ClassDeclaration': function(node) {
		this.addVariableType(node.id, TYPES.Class);
	}

	, ':: VariableDeclarator': function(node) {
		this.addVariableType(node.id, node.init);
	}
	
	, ':: FunctionDeclaration': function(node) {
		this.addVariableType(node.id, TYPES.Function);
		this.addVariableType(node.rest, TYPES.Array);
	}
	
	, ':: ReturnStatement': function(node) {
		let hoistNode = node.$scope.closestHoistScope().node;
		
		assert(core.is.isFunction(hoistNode));
		
		this.addReturnType(hoistNode.id, node.argument);
	}
	
	, ':: SpreadElement': function(node) {
		this.addVariableType(node, TYPES.Array);
	}

	, ':: ArrayExpression,ComprehensionExpression': function(node) {
		this.addEvalType(node, TYPES.Array);
	}
	
	, ':: ObjectExpression': function(node) {
		this.addEvalType(node, TYPES.Object);
	}

	, ':: AssignmentExpression': function(node) {
		this.addVariableType(node.left, this.AssignmentExpression(node));//console.log(node.left.name, this.AssignmentExpression(node), this.detectType(node.right), node.right.name)
	}
	
	, ':: UpdateExpression': function(node) {
		this.addVariableType(node.argument, this.UpdateExpression(node));		
	}
	
	, addVariableType: function(node, type) {
		if ( !node ) {
			return;
		}		
		
		let name = node.name;
		if ( name ) {
			let decl = node.$scope.get(name);

			if ( decl ) {
				this.addTypes(decl.$types || (decl.$types = []), this.detectType(type, node));
			}
		}
	}
	
	, addEvalType: function(node, type) {
		if ( !node ) {
			return;
		}
		this.addTypes(node.$evalTypes || (node.$evalTypes = []), this.detectType(type, node));
	}
	
	, addReturnType: function(node, type) {
		if ( !node ) {
			return;
		}
		this.addTypes(node.$retTypes || (node.$retTypes = []), this.detectType(type, node));
	}

	, addTypes: function(conteiner, types) {
		if ( Array.isArray(types) ) {
			conteiner.push.apply(conteiner, types);
		}
		else {
			conteiner.push(types);
		}
	}
	
	, detectType: function(valueNode, recipientNode) {
		if ( !valueNode ) {
			return TYPES.Undefined;
		}
		
		if ( typeof valueNode === 'string' ) {
			return valueNode;
		}
		
		assert(typeof valueNode === 'object');

		if ( valueNode.$evalTypes ) {
			return valueNode.$evalTypes;
		}
		if ( valueNode.$types ) {
			return valueNode.$types
		}

		let type = valueNode.type;

		if ( type === 'TemplateLiteral' ) {
			return TYPES.String;
		}
		if ( type === 'ArrayExpression' ) {
			return TYPES.Array;
		}
		if ( type === 'ObjectExpression' ) {
			return TYPES.Object;
		}
		if ( type === 'ClassDeclaration' ) {
			return TYPES.Class;
		}
		if ( type === 'CatchClause' ) {
			return TYPES.Error;
		}
		if ( core.is.isFunction(valueNode) ) {
			return TYPES.Function;
		}
		{
			let test = this[type], ret;
			if ( typeof test === 'function' && (ret = test.call(this, valueNode, recipientNode)) ) {
				return ret;
			}
		}

		return TYPES.Variant;
	}

	, Literal: function(node) {
		let value = node.value
			, raw = node.raw
			, lastSlashIndex
			, typeofValue = typeof value
		;
		return raw[0] == '/' && (lastSlashIndex = raw.lastIndexOf("/")) !== -1 && lastSlashIndex !== 0
			? TYPES.RegExp
			: value === null
				? TYPES.Null
				: typeofValue === 'string'
					? TYPES.String
					: typeofValue === 'number'
						? TYPES.Number
						: TYPES.Variant
		;
	}
	
	, UpdateExpression: function(node) {
		let operator = node.operator;
		if ( operator === '++' || operator === '--' ) {
			return TYPES.Undefined;
		}
	}

	, UnaryExpression: function(node) {
		let operator = node.operator;

		if ( operator === 'void' ) {
			return TYPES.Undefined;
		}
		else if ( operator === '~' ) {
			return TYPES.Number;
		}
		else if ( operator === '!' ) {
			return TYPES.Boolean;
		}
		return void 0;
	}

	, BinaryExpression: function(node) {
		let operator = node.operator;

		if ( operator === '|' || operator === '&' ) {
			return TYPES.Number;
		}
		return void 0;
	}

	, AssignmentExpression: function(node) {
		let operator = node.operator;
		let type;
		let left = node.left, right = node.right;

		if ( operator === '+=' ) {
			// TODO:: more complex detection
			type = TYPES.Variant;
		}
		else if ( operator === '-=' || operator === '*=' || operator === '/=' || operator === '>>=' || operator === '>>>=' || operator === '<<=' || operator === '|=' ) {
			type = TYPES.Number;
		}
		else if ( operator === '=' ) {
			type = this.detectType(right);
		}

		this.addReturnType(left, right.$retTypes);
		this.addVariableType(left, type);

		return type;
	}

	, SequenceExpression: function(node) {
		return this.detectType(node.expressions[node.expressions.length - 1]);
	}

	, CallExpression: function(node) {
		let callee = node.callee;
		if ( callee && callee.$refToScope ) {
			let name = callee.name;
			let decl = callee.$refToScope.get(name);

			if ( decl && decl.node ) {
				return decl.node.$retTypes;
			}
		}
		return void 0;
	}

	, Identifier: function(node) {
		let declarationScope = node.$refToScope;

		if ( declarationScope ) {
			let decl = declarationScope.get(node.name);

			if ( decl && decl.node ) {
				return decl.node.$types;
			}
		}

		return void 0;
	}
};
