"use strict";

const assert = require("assert");
const error = require("./../lib/error");
const core = require("./core");
const Scope = require("./../lib/scope");



function getline(node) {
	return node.loc.start.line;
}

let transformLoop_fragmentOption_functionHeadAndTail = {
	applyChanges: true
	, extend: true

	, onbefore: function() {

		let fragmentOption = this.options;
		let forVariableNode = fragmentOption.variableDeclarationNode;
		let forVariableNode_newName = fragmentOption.newName || ""
			, forVariableNode_oldName = fragmentOption.oldName || ""
			, afterTail = fragmentOption.afterTail || ""
			, beforeHead = fragmentOption.beforeHead || ""
		;

		let isHead = this.data === "--head--";

		if( forVariableNode && !fragmentOption.secondTime ) {
			let destructuringVariableDeclarationNode = core.detectDestructuringParent(forVariableNode);

			if ( destructuringVariableDeclarationNode ) {
				forVariableNode_newName = core.getDestructuringVariablesName(destructuringVariableDeclarationNode).join(", ");
				let names = [];
				core.traverseDestructuringVariables(destructuringVariableDeclarationNode, function(element) {
					names.push(element.originalName || element.name);
				});

				forVariableNode_oldName = names.join(", ");
			}
			else if( forVariableNode.type === "Identifier" ) {
				forVariableNode_newName = (forVariableNode ? forVariableNode.name : void 0);
				forVariableNode_oldName = (forVariableNode ? forVariableNode.originalName : void 0);
			}
			else {
				assert(false, forVariableNode);
			}

			fragmentOption.newName = forVariableNode_newName = forVariableNode_newName || forVariableNode_oldName;
			fragmentOption.oldName = forVariableNode_oldName = forVariableNode_oldName || forVariableNode_newName;
			fragmentOption.variableDeclarationNode = null;//cleanup
			fragmentOption.secondTime = true;
		}

		this.data = isHead
			? beforeHead + "(function(" + (forVariableNode_oldName || "") + "){"
			: "})(" + (forVariableNode_newName ? "" + forVariableNode_newName : "") + ");" + afterTail
		;
	}
};

var plugin = module.exports = {
	reset: function() {
		this.permamentNames = {};
	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.options = options;
		this.esprima = options.esprima;
	}

	, ':: Identifier': function detectLoopClosures(node, astQuery) {
		// forbidden pattern:
		// <any>* <loop> <non-fn>* <constlet-def> <any>* <fn> <any>* <constlet-ref>
		var loopNode = null;
		if( core.is.isReference(node)
			&& node.$refToScope
			&& node.$refToScope !== node.$scope
			&& core.is.isConstLet({kind: node.$refToScope.getKind(node.name)})
		) {
			// traverse nodes up towards root from constlet-def
			// if we hit a function (before a loop) - ok!
			// if we hit a loop - maybe-ouch
			// if we reach root - ok!
			for (let n = node.$refToScope.node ; ; ) {
				if (core.is.isFunction(n)) {
					// we're ok (function-local)
					return;
				} else if (core.is.isLoop(n)) {
					loopNode = n;
					// maybe not ok (between loop and function)
					break;
				}
				n = n.$parent;
				if (!n) {
					// ok (reached root)
					return;
				}
			}

			// traverse scopes from reference-scope up towards definition-scope
			// if we hit a function, ouch!
			const defScope = node.$refToScope;
			const generateIIFE = true; // TODO get from options

			if( !loopNode.$iify ) for (let s = node.$scope ; s ; s = s.parent) {
				if (s === defScope) {
					// we're ok
					return;
				} else if (core.is.isFunction(s.node)) {
					// not ok (there's a function between the reference and definition)
					// may be transformable via IIFE

					if (!generateIIFE || !core.is.isLoop(loopNode)) {
						return error(getline(node), "can't transform closure. {0} is defined outside closure, inside loop", node.name);
					}

					const variableDeclarationNode = defScope.getNode(node.name);

					// here be dragons
					// for (let x = ..; .. ; ..) { (function(){x})() } is forbidden because of current
					// spec and VM status
					if (loopNode.type === "ForStatement" && defScope.node === loopNode) {
						return error(getline(variableDeclarationNode), "Not yet specced ES6 feature. {0} is declared in for-loop header and then captured in loop closure", variableDeclarationNode.name);
					}

					let special = this.detectIifyBodyBlockers(loopNode.body, node, astQuery);

					// mark loop for IIFE-insertion
					loopNode.$iify = true;
					this.transformLoop(loopNode, node, variableDeclarationNode, special);
					break;
				}
			}
		}
	}

	, detectIifyBodyBlockers: function detectIifyBodyBlockers(body, n, astQuery) {
		var result = [];

		astQuery.traverse(body, function(n) {
			// if we hit an inner function of the loop body, don't traverse further
			if (core.is.isFunction(n)) {
				return false;
			}

			if (n.type === "BreakStatement") {
				result.push(n);
			} else if (n.type === "ContinueStatement") {
				result.push(n);
			} else if (n.type === "ReturnStatement") {
				result.push(n);
			} else if (n.type === "Identifier" && n.name === "arguments") {
				result.push(n);
			} else if (n.type === "VariableDeclaration" && n.kind === "var") {
				result.push(n);
			} else if (n.type === "ThisExpression" ) {
				result.push(n);
			} else if (n.type === "YieldExpression" ) {
				result.push(n);
			}
		});

		return result;
	}

	, transformLoop: function transformLoop(loopNode, variableNode, variableDeclarationNode, special) {
		const hasBlock = (loopNode.body.type === "BlockStatement");

		const insertHeadPosition = (hasBlock
			? loopNode.body.range[0] + 1// just after body {
			: loopNode.body.range[0])	// just before existing expression
		;
		const insertTailPosition = (hasBlock
			? loopNode.body.range[1] - 1// just before body }
			: loopNode.body.range[1])	// just after existing expression
		;

		let variableDeclarator = core.getVariableDeclaratorForIdentifier(variableDeclarationNode);

		let fragmentOption = Object.create(transformLoop_fragmentOption_functionHeadAndTail);
		fragmentOption.variableDeclarationNode =
			core.is.isForInOfWithConstLet(loopNode)
			&& variableNode
			&& core.declarationContainsDeclarator(loopNode.left, variableDeclarator)
			&& variableDeclarationNode
		;

		let afterTail = "";
		let beforeHead = "";
		let funcCallResult = "";

		special.forEach(function(special) {
			let type = special.type
				, result
				, replaceWith
				, from = special.range[0]
				, to = special.range[1]
			;

			if (type === "BreakStatement") {
				let labelName = special.label && special.label.name || "";
				let name = this.getPermamentName("break" + labelName);

				if ( !loopNode["$__break" + labelName] ) {
					loopNode["$__break" + labelName] = true;
					result = "if(" + name + "===true){" + name + "=void 0;break " + labelName + "}";
					beforeHead += ";var " + name + ";"
				}

				replaceWith = "{" + name + " = true;return}";
			}
			else if (type === "ContinueStatement") {
				let labelName = special.label && special.label.name || "";
				let name = this.getPermamentName("continue" + labelName);

				if ( !loopNode["$__continue" + labelName] ) {
					loopNode["$__continue" + labelName] = true;
					if ( labelName ) {
						result = "if(" + name + "===true){" + name + "=void 0;continue " + labelName + "}";
						beforeHead += ";var " + name + ";"
					}
				}

				if ( labelName ) {
					replaceWith = "{" + name + " = true;return}";
				}
				else {
					replaceWith = "return;"
				}
			}
			else if ( type === "ReturnStatement" || type === "YieldExpression" ) {
				let argument = special.argument
					, argTypeIsPrimitive = argument && argument.type === 'Literal'
					, keys = type === "YieldExpression"
						? {primitive: "yieldPrim", probablyObject: "yieldVal", exitPoint: "yield", nodeKey: "$__yield"}
						: {primitive: "retPrim", probablyObject: "retVal", undefined: "retVoid", exitPoint: "return", nodeKey: "$__return"}
				;

				if ( argument ) {
					let key = argTypeIsPrimitive ? keys.primitive : keys.probablyObject;
					let name = this.getPermamentName(key);
					let recipient = loopNode[keys.nodeKey + key];

					replaceWith = "{" + name + " = true;return ";
					this.alter.insertAfter(to, "}");

					if ( !recipient ) {
						recipient = loopNode[keys.nodeKey + key] = this.getPermamentName("value");

						beforeHead += ";var " + name + ";";

						funcCallResult = ";var " + recipient + " = ";
						if ( argTypeIsPrimitive ) {
							result = "if(" + name + "===true){" + name + "=void 0;" + keys.exitPoint + " " + recipient + "}";
						}
						else {
							let returnPointName = this.getPermamentName("rp");
							// wrap return/yield to try/catch to prevent memory leaking
							result = "if(" + name + "===true){try{throw " + recipient + " }catch(" + returnPointName + "){" + recipient + "=" + name + "=void 0;" + keys.exitPoint + " " + returnPointName + "}}";
						}
					}
					else {
						result = "";
					}
					to = argument.range[0];
				}
				else {
					assert(type === "ReturnStatement");//yield should always return value

					let name = this.getPermamentName(keys.undefined);
					if ( !loopNode[keys.nodeKey + "Void"] ) {
						loopNode[keys.nodeKey + "Void"] = true;
						result = "if(" + name + "===true){" + name + "=void 0;" + keys.exitPoint + "}";
						beforeHead += ";var " + name + ";"
					}
					else {
						result = ""
					}

					replaceWith = "{" + name + " = true;return}";
				}
			}
			else if (type === "ThisExpression" || (type === "Identifier" && special.name === "arguments")) {
				let keys = type === "ThisExpression"
					? {nodeKey: "$__this", varName: "this", permamentName: "that"}
					: {nodeKey: "$__arguments", varName: "arguments", permamentName: "args"}
				;
				let name = this.getPermamentName(keys.permamentName);

				if ( !loopNode[keys.nodeKey] ) {
					let hoistScopeNode = loopNode.$scope.closestHoistScope().node;

					if ( !hoistScopeNode['$__has__' + name] ) {
						hoistScopeNode['$__has__' + name] = true;
						this.alter.insertAfter(core.__getNodeBegin(hoistScopeNode), ";var " + name + "=" + keys.varName + ";");
					}
				}

				result = "";
				replaceWith = name;
			}
			else if (type === "VariableDeclaration" && special.kind === "var") {
				beforeHead += (";var " + special.declarations.map(function(node) {
					if ( core.is.isObjectPattern(node.id) || core.is.isArrayPattern(node.id) ) {
						return core.getDestructuringVariablesName(node.id).join(", ");
					}
					else if ( node ) {
						return node.id.name;
					}
					else {
						return null
					}
					}).filter(function(name) {
						return !!name;
					}).join(", ") + ";"
				);

				this.alter.replace(special.range[0], special.range[0] + 4, ";");//remove 'val'
			}

			if ( replaceWith ) {
				this.alter.replace(from, to, replaceWith);
			}

			if ( result ) {
				afterTail += result;
			}
		}, this);

		fragmentOption.afterTail = afterTail;
		fragmentOption.beforeHead = (beforeHead + funcCallResult).replace(/;;/g, ";");

		this.alter.insert(insertHeadPosition, "--head--", fragmentOption);
		this.alter.insert(insertTailPosition, "--tail--", fragmentOption);

		this.transformLoopScope(loopNode, variableDeclarationNode, variableDeclarator, hasBlock);
	}

	, transformLoopScope: function(loopNode, variableDeclarationNode, variableDeclarator, hasBlock) {
		if( hasBlock === void 0 ) {
			hasBlock = (loopNode.body.type === "BlockStatement")
		}

		let newScope;

		// Update scope's
		if( hasBlock ) {
			loopNode.body.$scope.mutate("hoist");
			newScope = loopNode.body.$scope;
		}
		else {
			loopNode.body.$wrappedHoistScope = true;

			let oldScope = loopNode.body.$scope;
			newScope = new Scope({
				kind: "hoist",
				node: loopNode.body,
				parent: oldScope,
				wrapper: true
			});

			oldScope.children.forEach(function(scope) {
				if ( scope != newScope ) {
					scope.parent = newScope;
				}
			});
			oldScope.children = [newScope];
		}

		function setNewRefToScope(variableNode, i) {
			variableNode.$refToScope = newScope;

			if( core.is.isDeclaration(variableNode) ) {
				let refs = variableNode.$scope.getRefs(variableNode.name) || [];
				refs.forEach(setNewRefToScope);
			}
		}

		let destructuringVariableDeclarationNode =
			core.is.isForInOfWithConstLet(loopNode)
			&& core.declarationContainsDeclarator(loopNode.left, variableDeclarator)
			&& core.detectDestructuringParent(variableDeclarationNode)
		;

		if( destructuringVariableDeclarationNode ) {
			core.traverseDestructuringVariables(destructuringVariableDeclarationNode, setNewRefToScope);
		}
		else if( variableDeclarationNode.type === "Identifier" ) {
			setNewRefToScope(variableDeclarationNode);
		}
	}

	, getPermamentName: function(name) {
		return this.permamentNames[name] || (this.permamentNames[name] = core.unique("$" + name, true));
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
