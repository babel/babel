"use strict";

const assert = require("assert");

const classesExtendedTranspiler = {
	reset: function() {

	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
	}

	, ':: ClassDeclaration, ClassExpression': function replaceClassBody(node, astQuery) {
		this.__currentClassName = node["$ClassName"];
	}

	, ':: XStaticProperty, XPublicProperty': function replaceClassBody(node, astQuery) {
		var nextNode = node.$nextElementSibling;
		var hasSemicolonNext = nextNode && this.alter.getRange(node.range[1], nextNode.range[0]).trim().startsWith(";");

		this.alter.replace(node.range[0], node.key.range[0], this.__currentClassName + (node.type == "XPublicProperty" ? ".prototype" : "") + ".");
		this.alter.insertAfter(node.range[1], (node.value == null ? " = void 0" : "") + (hasSemicolonNext ? "" : ";"));
	}
};

module.exports = classesExtendedTranspiler;
