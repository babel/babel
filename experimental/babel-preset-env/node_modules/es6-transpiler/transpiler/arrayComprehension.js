"use strict";

const assert = require("assert");
const error = require("./../lib/error");
const core = require("./core");
const forOf = require("./forOf");
const destructuring = require("./destructuring");

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
	}

	, '::ComprehensionExpression': function(node) {
		if ( node.xGenerator === true ) {
			return;
		}

		const blocks = node.blocks
			, body = node.body
			, filter = node.filter
		;

		let beforeBodyString = "";
		let afterBodyString = "";
		let variableNames = [];

		for( let i = 0, len = blocks.length ; i < len ; i++ ) {
			let block = blocks[i];

			let variableBlock = block.left;

			if( variableBlock.type === "Identifier") {
				variableNames.push(variableBlock.name);
			}
			else if ( core.is.isObjectPattern(variableBlock) || core.is.isArrayPattern(variableBlock) ) {
				// creating a 'var <variable_name>' is already in forOf
			}
			else {
				assert(false)
			}

			if( block["of"] === true ) {
				const replacementObj = forOf.createForOfReplacement(block, node);

				beforeBodyString += (
					replacementObj.before
					+ "for(;" + replacementObj.check + ";)"
					+ "{" + replacementObj.inner
				);

				afterBodyString = (
					"}" + replacementObj.after
				) + afterBodyString;
			}
			else {
				beforeBodyString += (
					"for("
					+ this.alter.get(block.left.range[0], block.left.range[1])
					+ " in "
					+ this.alter.get(block.right.range[0], block.right.range[1])
					+ "){"
				);

				afterBodyString = (
					"}"
				) + afterBodyString;
			}
		}

		const resultVariableName = core.unique("$result", true);

		let replacementString =
			"var " + resultVariableName + " = []" + (variableNames.length ? ", " + variableNames.join(",") : "") + ";"
			+ beforeBodyString
			+ (filter ? "if(" + this.alter.get(filter.range[0], filter.range[1]) + ")" : "")
			+ "{" + resultVariableName + ".push("
			+ this.alter.get(body.range[0], body.range[1])
			+ ")}"
			+ afterBodyString
			+ ";return " + resultVariableName + "})"
		;

		if( node.$scope.closestHoistScope().doesThisUsing() ) {
			replacementString += ".call(this)";
		}
		else {
			replacementString += "()";
		}

		this.alter.replace(
			node.range[0]
			, node.range[0] + 1
			, "(function(){"
		);
		// between node.range[0] and (node.range[0] + 1) is a place for inserting from another part of the program
		this.alter.replace(
			node.range[0] + 1
			, node.range[1]
			, replacementString
		);

	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
