"use strict";

const assert = require("assert");
const core = require("./core");
const error = require("./../lib/error");

function getline(node) {
	return node.loc.start.line;
}

function isEmptyDestructuring(node) {
	if ( core.is.isObjectPattern(node) ) {
		return node.properties.length === 0;
	}
	if ( core.is.isArrayPattern(node) ) {
		return node.elements.length === 0
			|| node.elements.every(function(node) { return node === null })
		;
	}
	return false;
}

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

	, ':: ObjectPattern,ArrayPattern': function replaceDestructuringVariableDeclaration(node) {
		let parentNode, declarationNode;

		{
			parentNode = node.$parent;

			if( parentNode.type === "VariableDeclarator" ) {
				declarationNode = parentNode.$parent;
				if ( core.is.isForInOf(declarationNode.$parent) ) {
					//TODO::
				}
				else if ( core.is.isVarConstLet(declarationNode) ) {
					this.__replaceDeclaration(parentNode, node);
				}
			}
			else if( parentNode.type === "AssignmentExpression" ) {
				this.__replaceAssignment(parentNode, node);
			}
		}
	}

	, __replaceDeclaration: function replaceDeclaration(declarator, declaratorId) {
		let declaratorInit = declarator.init;

		if( declaratorInit == null ) {
			error(getline(declarator), "destructuring must have an initializer");
			return;
		}

		let declarationString = this.unwrapDestructuring("var", declaratorId, declaratorInit);

		let isFirstVar = declarationString.substring(0, 4) === "var ";

		// replace destructuring with simple variable declaration
		this.alter.replace(
			declarator.range[0]
			, declarator.range[1]
			, (isFirstVar ? declarationString.substr(4) : declarationString)//remove first "var " if needed
		);
	}

	, __replaceAssignment: function(assignment, assignmentLeft) {
		let assignmentRight = assignment.right;

		let declarationString = this.unwrapDestructuring("", assignmentLeft, assignmentRight);

		// replace destructuring with simple variable assignment
		this.alter.replace(
			assignment.range[0]
			, assignment.range[1]
			, declarationString
		);
	}

	, unwrapDestructuring: function unwrapDestructuring(kind, definitionNode, valueNode, newVariables, newDefinitions) {
		let isObjectPattern = core.is.isObjectPattern(definitionNode);

		assert(isObjectPattern || core.is.isArrayPattern(definitionNode));
		if( !newVariables )newVariables = [];
		assert(Array.isArray(newVariables));

		newDefinitions = newDefinitions || [];

		if( isEmptyDestructuring(definitionNode) ) {
			// an empty destructuring
			let placeholderVarName = core.getScopeTempVar(definitionNode, definitionNode.$scope.closestHoistScope());
			core.setScopeTempVar(placeholderVarName, definitionNode, definitionNode.$scope.closestHoistScope());

			let newDefinition = {
				"type": "VariableDeclarator",
				"id": {
					"type": "Identifier",
					"name": placeholderVarName
				}
			};
			newDefinitions.push(newDefinition);

			return placeholderVarName;
		}

		this.__unwrapDestructuring(kind === "var" ? 1 : 0, definitionNode, valueNode, newVariables, newDefinitions);

		kind = (kind ? kind + " " : "");

		let destructurisationString = kind;

		let needsFirstComma = false;

		for(let index = 0, len = newDefinitions.length ; index < len ; index++ ){
			let definition = newDefinitions[index];

			// inherit scope from original VariableDefinitions node
			definition.$scope = definitionNode.$scope;

			assert( definition.type === "VariableDeclarator" );

			let delimiter;
			if( needsFirstComma ) {
				delimiter = ", ";
				needsFirstComma = false;
			}
			else {
				delimiter = "";
			}

			assert( typeof definition["$raw"] === "string" );//"$raw" defined in this.__unwrapDestructuring

			destructurisationString += ( delimiter + definition["$raw"] + (definition["$lineBreaks"] || '') );

			if( definition["$assignmentExpressionResult"] === true ) {
				let $parent = valueNode.$parent;
				if( $parent && ($parent = $parent.$parent) && ($parent = $parent.$parent) && !core.is.isBodyStatement($parent) && !core.is.isBinaryExpression($parent) ) {
					let isExpressionStatementWithoutBrackets = this.alter.getRange(valueNode.range[1], valueNode.$parent.$parent.range[1]) !== ')';

					if( isExpressionStatementWithoutBrackets ) {
						destructurisationString = '(' + destructurisationString + ')';
					}
				}
			}

			needsFirstComma = true;
		}

		return destructurisationString;
	}

	, __unwrapDestructuring: function(type, definitionNode, valueNode, newVariables, newDefinitions, hoistScope) {
		let isTemporaryVariable = false, valueIdentifierName, temporaryVariableIndexOrName, valueIdentifierDefinition;
		let isTemporaryValueAssignment = false;

		let isObjectPattern = core.is.isObjectPattern(definitionNode)
			, valueNode_isArrayPattern = core.is.isArrayPattern(valueNode)
			, valueNode_isObjectPattern = core.is.isObjectPattern(valueNode)
			, elementsList = isObjectPattern ? definitionNode.properties : definitionNode.elements
			, localFreeVariables
			, isLocalFreeVariable = type === 1
		;

		assert(elementsList.length);

		if( isLocalFreeVariable || valueNode_isArrayPattern || valueNode_isObjectPattern ) {
			//TODO:: tests
			//TODO:: get only last variable name
			localFreeVariables = core.getNodeVariableNames(definitionNode);
		}

		if( typeof valueNode["$raw"] === "string" ) {
			valueIdentifierName = valueNode["$raw"];

			if( valueIdentifierName.indexOf("[") !== -1 || valueIdentifierName.indexOf(".") !== -1 ) {
				isTemporaryVariable = true;
				valueIdentifierDefinition = valueIdentifierName;
			}
		}
		else if( valueNode.type === "Identifier" ) {
			valueIdentifierName = valueNode.name;

			if( valueIdentifierName.indexOf("[") !== -1 || valueIdentifierName.indexOf(".") !== -1 ) {
				isTemporaryVariable = true;
				valueIdentifierDefinition = valueIdentifierName;
			}
		}
		else {
			isTemporaryVariable = true;

			if( valueNode_isArrayPattern || valueNode_isObjectPattern ) {
				valueIdentifierDefinition = localFreeVariables.pop();
			}
			else {
				let isSequenceExpression = valueNode.type === "SequenceExpression";
				valueIdentifierDefinition = (isSequenceExpression ? "(" : "") + this.alter.get(valueNode.range[0], valueNode.range[1]) + (isSequenceExpression ? ")" : "");
			}

		}

		if( isTemporaryVariable ) {
			if( valueNode.type === "Identifier" || isLocalFreeVariable ) {
				if( elementsList.length < 2 ) {
					isTemporaryVariable = false;
				}

				if( isTemporaryVariable === false ) {
					if( valueIdentifierDefinition.charAt(0) !== "(") {
						valueIdentifierName = "(" + valueIdentifierDefinition + ")";
					}
					else {
						valueIdentifierName = valueIdentifierDefinition;
					}
				}
			}
		}

		if( isTemporaryVariable ) {
			if( isLocalFreeVariable ) {
				valueIdentifierName = localFreeVariables.pop();
			}
			else {
				valueIdentifierName = null;
			}

			if( !valueIdentifierName ) {
				isLocalFreeVariable = false;
				if( !hoistScope ) {
					hoistScope = definitionNode.$scope.closestHoistScope();
				}

				valueIdentifierName = core.getScopeTempVar(definitionNode, hoistScope);
			}
			else {
				isLocalFreeVariable = true;
			}

			temporaryVariableIndexOrName = valueIdentifierName;
			valueIdentifierName = "(" + valueIdentifierName + " = " + valueIdentifierDefinition + ")";
			isTemporaryValueAssignment = true;
		}

		let lastElement;
		for( let k = 0, len = elementsList.length, lineBreaksFrom = definitionNode.range[0] ; k < len ; k++ ) {
			const element = elementsList[k], elementId = isObjectPattern ? element.value : element;

			let lineBreaks = "";
			if ( element ) {
				lineBreaks = (this.alter.getRange(lineBreaksFrom, element.range[0]).match(/[\r\n]/g) || []).join("");

				lineBreaks += (valueNode["$lineBreaks"] || "");

				lineBreaksFrom = element.range[1];
				lastElement = element;
			}

			if ( element ) {
				if ( core.is.isObjectPattern(elementId) || core.is.isArrayPattern(elementId) ) {
					this.__unwrapDestructuring(
						1
						, isObjectPattern ? element.value : element
						, {
							type: "Identifier"
							, name: valueIdentifierName + (isObjectPattern ? core.PropertyToString(element.key) : ("[" + k + "]"))
							, "$lineBreaks": lineBreaks
						}
						, newVariables
						, newDefinitions
						, hoistScope
					);
				}
				else {
					let renamingOptions = elementId.$renamingOptions;
					if( renamingOptions ) {// turn off changes were made by 'letConst' transpiler
						renamingOptions.inactive = true;
					}

					let newDefinition = {
						"type": "VariableDeclarator",
						"id": elementId,
						"init": {
							"type": "MemberExpression",
							"computed": element.computed,
							"object": {
								"type": "Identifier",
								"name": valueIdentifierName
							}
						}
					};
					newDefinition.$scope = definitionNode.$scope;

					if( isObjectPattern ) {
						newDefinition["init"]["property"] = element.key;
					}
					else {
						newDefinition["computed"] = true;
						newDefinition["init"]["property"] = {
							"type": "Literal",
							"value": k,
							"raw": k + ""
						}
					}

//					TODO::
//					if( type === 0 ) {
//						newDefinition["type"] = "AssignmentExpression";
//						newDefinition["left"] = newDefinition["id"];
//						delete newDefinition["id"];
//						newDefinition["right"] = newDefinition["init"];
//						delete newDefinition["init"];
//					}

					if( element.type === "SpreadElement" ) {
						newDefinition["$raw"] = core.unwrapRestDeclaration(element.argument, valueIdentifierName, k);
						newDefinition["$lineBreaks"] = lineBreaks;
					}
					else {
//						if( type === 1 ) {//VariableDeclarator
							newDefinition["$raw"] = core.VariableDeclaratorString(newDefinition);
//						}
//						else {//AssignmentExpression
//							newDefinition["$raw"] = core.AssignmentExpressionString(newDefinition);
//						}
					}
					newDefinition["$lineBreaks"] = lineBreaks;

					newDefinitions.push(newDefinition);
				}

				if( isTemporaryValueAssignment ) {
					valueIdentifierName = temporaryVariableIndexOrName;
					isTemporaryValueAssignment = false;
				}
			}
		}

		let lastLineBreaks = "";
		if ( lastElement ) {
			let start = definitionNode.range[1]
				, end = valueNode.range && valueNode.range[0]
			;
			let lineBreaksBetween =
				end
				&& (start < end)
				&& (this.alter.getRange(start, end).match(/[\r\n]/g))
				|| []
			;

			start = lastElement.range[1];
			end = definitionNode.range[1];
			lastLineBreaks = lineBreaksBetween.concat(
				(start < end)
				&& this.alter.getRange(start, end).match(/[\r\n]/g) || []
			);
			lastLineBreaks = lastLineBreaks.join("")
		}

		if( type === 0 ) {//AssignmentExpression
			newDefinitions.push({
				"type": "VariableDeclarator"
				, "$raw": temporaryVariableIndexOrName || valueIdentifierName
				, "$assignmentExpressionResult": true
				, "$lineBreaks": lastLineBreaks + (valueNode["$lineBreaks"] || "")
			});
		}
		else {
			assert(newDefinitions.length);
			newDefinitions[newDefinitions.length - 1]["$lineBreaks"] += lastLineBreaks;
		}

		assert(!isTemporaryValueAssignment);

		if( !isLocalFreeVariable && isTemporaryVariable && temporaryVariableIndexOrName != void 0 ) {
			core.setScopeTempVar(temporaryVariableIndexOrName, valueNode, hoistScope, true);
		}
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
