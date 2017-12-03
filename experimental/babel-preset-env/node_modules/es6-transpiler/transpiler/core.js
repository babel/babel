/*globals require, module*/
"use strict";

const assert = require("assert");
const is = require("simple-is");
const stringset = require("stringset");
const jshint_vars = require("./../jshint_globals/vars.js");
const Scope = require("./../lib/scope");
const error = require("./../lib/error");
const comments = require('./core/comments.js');

function extend(target) {
	for ( let i = 1, len = arguments.length ; i < len ; i++ ) {
		let source = arguments[i];

		for ( let key in source ) if ( source.hasOwnProperty(key) ) {
			target[key] = source[key];
		}
	}

	return target;
}

function getline(node) {
	return node.loc.start.line;
}

function getRange(node) {
	return node && (node.groupRange || node.range);
}

let UUID_PREFIX = "uuid" + ((Math.random() * 1e6) | 0);
let UUID = 1;

let core = module.exports = extend({}, require('./core/is.js'), require('./core/standardVars.js'), {
	reset: function() {
		this.allIdentifiers = stringset();

		this.functions = [];
		this.bubbledVariables = {};
		this.commentOptionsCount = 0;
		this.astTopScope = null;
	}

	, setup: function(alter, ast, options, src) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		this.alter = alter;
		this.src = src;
		this.options = options;

		Scope.setOptions(options);
	}

	, '::Program': function(node) {
		// setup scopes
		const topScope = this.createTopScope(node.$scope, this.options.environments, this.options.globals, this.src.length);

		// allIdentifiers contains all declared and referenced vars
		// collect all declaration names (including those in topScope)
		const allIdentifiers = this.allIdentifiers;
		topScope.traverse({pre: function(scope) {
			allIdentifiers.addMany(scope.decls.keys());
		}});

		let topOptions = [], from = node.range[0];

		if ( from != 0 ) {
			let newOptions = node.$scope.options.filter(function(record) {
				if ( record.range[1] < from ) {
					topOptions.push(record);
					return false;
				}
				return true;
			});
			node.$scope.options = newOptions;
		}

		topScope.options = topOptions;
		this.astTopScope = topScope;
	}

	, '::Identifier': function(node) {
		// setup node.$refToScope, check for errors.
		// also collects all referenced names to allIdentifiers
		this.setupReferences(node);
		this.detectConstAssignment(node);// static analysis passes
	}

	, onpreparenode: function createScopes(node, parent) {
		assert(!node.$scope);

		node.$parent = parent;
		node.$scope = node.$parent ? node.$parent.$scope : null; // may be overridden

		let newNotProgramScope;

		let _this = this;
		function addParamToScope(param) {
			if ( param === null ) {
				return;
			}

			if ( _this.is.isObjectPattern(param) ) {
				param.properties.forEach(addParamToScope);
			}
			else if ( param.type === "Property" ) {//from objectPattern
				addParamToScope(param.value);
			}
			else if ( _this.is.isArrayPattern(param) ) {
				param.elements.forEach(addParamToScope);
			}
			else {
				node.$scope.add(param.name, "param", param);
			}

			param.$paramDefinition = true;
		}

		function addVariableToScope(variable, kind, originalDeclarator, scope, initNode) {
			if( _this.is.isObjectPattern(variable) ) {
				variable.properties.forEach(function(variable) {
					addVariableToScope(variable, kind, originalDeclarator, scope);
				});
			}
			else if( variable.type === "Property" ) {//from objectPattern
				addVariableToScope(variable.value, kind, originalDeclarator, scope);
			}
			else if( _this.is.isArrayPattern(variable) ) {
				variable.elements.forEach(function(variable) {
					if( variable ) {
						addVariableToScope(variable, kind, originalDeclarator, scope);
					}
				});
			}
			else if( variable.type === "SpreadElement" ) {//from arrayPattern
				addVariableToScope(variable.argument, kind, originalDeclarator, scope);
//				node.$scope.add(variable.argument.name, kind, variable, variable.range[1], 0, originalDeclarator);
			}
			else {
				let referableFromPos;
				if( is.someof(kind, ["var", "const", "let"]) ) {
					referableFromPos = variable.range[1];
				}
				(scope || node.$scope).add(variable.name, kind, variable, referableFromPos, void 0, originalDeclarator);
			}

			variable.$variableDeclaration = true;
		}

		if (node.type === "Program") {
			// Top-level program is a scope
			// There's no block-scope under it
			let newScope = node.$scope = new Scope({
				kind: "hoist",
				node: node,
				parent: null
			});

			const self = this, rangedOptions = [], minFrom = node.range[0];
			comments.scanCommentsForOptions(node.comments || [], function(commentNode, optionName, data) {
				if ( optionName === 'globals' ) {
					self._injectGlobals(data, newScope, commentNode.range[1], "let");
				}
				else if ( optionName === 'es6' ) {
					rangedOptions.push({range: commentNode.range, data: data});
				}
			});

			newScope.options = rangedOptions;
			this.commentOptionsCount = rangedOptions.length;

		} if (node.type === "ClassDeclaration" || node.type === "ClassExpression") {// class definition
			newNotProgramScope = node.$scope = new Scope({
				kind: "hoist",
				node: node,
				parent: node.$parent.$scope
			});

			let nodeId = node.id;

			if ( node.type !== "ClassExpression" || nodeId ) {
				addVariableToScope(nodeId, "let"/*TODO::"class"*/, nodeId, node.$parent.$scope, node);
			}

			if( node.superClass ) {
				node.$scope.add("super", "var");
			}

			node.body.body.forEach(function(method) {
				// TODO:: refactor/redesign this function
				if( method.computed ) {
					return;
				}

				let type = method.type;
				let classesExtras = this.options.classesExtras || {};
				let xSpecialNode =
					type === "XStaticProperty" && classesExtras.staticProperty
					|| type === "XPublicProperty" && classesExtras.publicProperty
				;

				assert(type === "MethodDefinition" || xSpecialNode);//TODO:: static properties

				//TODO:: class A { m(){} static m(){} m2{ m(); //where m referred? } }

				// method.kind ca be 'get', 'set', ''
				let name = this.getKeyName(method.key);
				if ( !node.$scope.hasOwn(name) ) {
					node.$scope.add(name, xSpecialNode ? "var" : (method.kind || "fun"), method.value);
				}

			}, this);

		} else if (this.is.isFunction(node)) {
			// Function is a scope, with params in it
			// There's no block-scope under it

			newNotProgramScope = node.$scope = new Scope({
				kind: "hoist",
				node: node,
				parent: node.$parent.$scope
			});

			// function has a name
			if (node.id) {
				assert(node.id.type === "Identifier");

				if (node.type === "FunctionDeclaration") {
					// Function name goes in parent scope for declared functions
					addVariableToScope(node.id, "fun", node.id, node.$parent.$scope, node);
				} else if (node.type === "FunctionExpression") {
					// Function name goes in function's scope for named function expressions
					addVariableToScope(node.id, "fun", node.id, void 0, node);
				} else {
					assert(false);
				}
			}

			node.params.forEach(addParamToScope);
			if( node.rest ) {
				addParamToScope(node.rest)
			}

		} else if (node.type === "ImportDeclaration") {
			// Variable declarations names in import's
			assert( node.kind === "default" || node.kind === "named" );
			node.specifiers.forEach(function(declarator) {
				assert(declarator.type === "ImportSpecifier");

				addVariableToScope(declarator.id, "var"/*, node.kind*/, declarator, void 0, declarator);
			}, this);

		} else if (node.type === "VariableDeclaration") {
			// Variable declarations names goes in current scope
			assert(this.is.isVarConstLet(node));
			node.declarations.forEach(function(declarator) {
				assert(declarator.type === "VariableDeclarator");

				if (this.options.disallowVars && node.kind === "var") {
					error(getline(declarator), "var {0} is not allowed (use let or const)", declarator.id.name);
				}

				addVariableToScope(declarator.id, node.kind, declarator, void 0, declarator.init);
			}, this);

		} else if (this.is.isForWithConstLet(node) || this.is.isForInOfWithConstLet(node)) {
			// For(In) loop with const|let declaration is a scope, with declaration in it
			// There may be a block-scope under it
			newNotProgramScope = node.$scope = new Scope({
				kind: "block",
				node: node,
				parent: node.$parent.$scope
			});

		} else if (this.is.isNonFunctionBlock(node)) {
			// A block node is a scope unless parent is a function
			newNotProgramScope = node.$scope = new Scope({
				kind: "block",
				node: node,
				parent: node.$parent.$scope
			});

		} else if (node.type === "CatchClause") {
			const identifier = node.param;

			newNotProgramScope = node.$scope = new Scope({
				kind: "catch-block",
				node: node,
				parent: node.$parent.$scope
			});
			addVariableToScope(identifier, "caught", identifier, void 0, node);

			// All hoist-scope keeps track of which variables that are propagated through,
			// i.e. an reference inside the scope points to a declaration outside the scope.
			// This is used to mark "taint" the name since adding a new variable in the scope,
			// with a propagated name, would change the meaning of the existing references.
			//
			// catch(e) is special because even though e is a variable in its own scope,
			// we want to make sure that catch(e){let e} is never transformed to
			// catch(e){var e} (but rather var e$0). For that reason we taint the use of e
			// in the closest hoist-scope, i.e. where var e$0 belongs.
			node.$scope.closestHoistScope().markPropagates(identifier.name);
		}
		else if ( node.type === "ThisExpression" ) {
			let thisFunctionScope = node.$scope.closestHoistScope()
				, functionNode = thisFunctionScope.node
			;

			thisFunctionScope.markThisUsing();

			if( functionNode.type === "ArrowFunctionExpression" ) {
				do {
					// ArrowFunction should transpile to the function with .bind(this) at the end
					thisFunctionScope.markThisUsing();
				}
				while(
					(functionNode = thisFunctionScope.node.$parent)
						&& functionNode.type === "ArrowFunctionExpression"
						&& (thisFunctionScope = functionNode.$scope.closestHoistScope())
					);
			}
		}
		else if ( node.type === "Identifier" && node.name === "arguments" ) {
			let thisFunctionScope = node.$scope.closestHoistScope();

			thisFunctionScope.markArgumentsUsing();
		}
		else if ( node.type === "ComprehensionExpression" ) {
			// TODO:: when I write this, I am not looking to spec
			// TODO:: check the logic below

			newNotProgramScope = node.$scope = new Scope({
				kind: "hoist",
				node: node,
				parent: node.$parent.$scope
			});

			let blocks = node.blocks;
			for( let i = 0, len = blocks.length ; i < len ; i++) {
				let block = blocks[i];

				if( block.type === "ComprehensionBlock" ) {
					addVariableToScope(block.left, "let", node);
				}
			}
		}

		if ( newNotProgramScope ) {
			let from = node.range[0]
				, to = node.range[1]
			;
			let parentScope = newNotProgramScope.parent
				, parentOptions = parentScope.options
				, options = []
			;

			parentScope.options = parentOptions.filter(function(record) {
				let range = record.range, data = record.data;

				if ( range[0] >= from && range[1] <= to ) {
					options.push({range: range, data: data});
					return false;
				}
				return true;
			});

			newNotProgramScope.options = options;
		}
	}

	, unique: function (name, newVariable, additionalFilter) {
		assert(newVariable || this.allIdentifiers.has(name));

		for( let cnt = 0 ; ; cnt++ ) {
			const genName = name + "$" + cnt;
			if( !this.allIdentifiers.has(genName) && (!additionalFilter || !additionalFilter.has(genName))) {
				if( newVariable ) {
					this.allIdentifiers.add(genName);
				}
				return genName;
			}
		}
	}

	, uniqueByToken: function (token, name, newVariable, additionalFilter) {
		if( this.__nameByToken && token in this.__nameByToken ) {
			return this.__nameByToken[token];
		}

		if( !this.__nameByToken ) {
			this.__nameByToken = {};
		}

		return this.__nameByToken[token] = this.unique(name, newVariable, additionalFilter);
	}

	, _injectGlobals: function inject(obj, scope, from, varKind) {
		for ( let name in obj ) {
			const writeable = obj[name];
			const kind = (writeable ? (varKind || "var") : "const");
			if (scope.hasOwn(name)) {
				scope.remove(name);
			}
			scope.add(name, kind, {loc: {start: {line: -1}}, range: [-1, -1]}, from === void 0 ? -1 : from);
		}
	}

	, createTopScope: function(programScope, environments, globals, to) {
		const topScope = new Scope({
			kind: "hoist",
			node: {range:[0, to]},
			parent: null
		});

		const complementary = {
			undefined: false,
			Infinity: false,
			console: false
		};

		this._injectGlobals(complementary, topScope);
		this._injectGlobals(jshint_vars.reservedVars, topScope);
		this._injectGlobals(jshint_vars.ecmaIdentifiers, topScope);
		this._injectGlobals(jshint_vars.newEcmaIdentifiers, topScope);
		this._injectGlobals(jshint_vars.typed, topScope);
		if (environments) {
			environments.forEach(function(env) {
				if (!jshint_vars[env]) {
					error(-1, 'environment "{0}" not found', env);
				} else {
					this._injectGlobals(jshint_vars[env], topScope);
				}
			}, this);
		}
		if (globals) {
			this._injectGlobals(globals, topScope);
		}

		// link it in
		programScope.parent = topScope;
		topScope.children.push(programScope);

		return topScope;
	}

	/**
	 * traverse: pre
	 * after 'createScopes'
	 */
	, setupReferences: function(node) {
		if (this.is.isReference(node)) {
			this.allIdentifiers.add(node.name);

			const scope = node.$scope.lookup(node.name);
			if (!scope && this.options.disallowUnknownReferences) {
				error(getline(node), "reference to unknown global variable {0}", node.name);
			}

			if( !this.is.isDeclaration(node) ) {
				if( scope ) {
					scope.addRef(node);
				}
			}

			if( !scope ) {
				// 'reference to unknown global variable' case
				return;
			}

			let decl = scope.get(node.name);

			// check const and let for referenced-before-declaration
			if ( this.is.isConstLet(decl) ) {
				const allowedFromPos = scope.getFromPos(node.name);
				const referencedAtPos = node.range[0];

				assert(is.finitenumber(allowedFromPos));
				assert(is.finitenumber(referencedAtPos));

				if ( referencedAtPos < allowedFromPos ) {
					if ( decl.isGlobal || !core.hasNodeBetween(node, scope.node, 'FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression') ) {
						// decl.isGlobal == true: global variable could be defined by jshint-like comment at any
						//  line the file and this variable will be available after this line
						error(getline(node), "{0} is referenced before its declaration", node.name);
					}
				}
			}

			node.$refToScope = scope;

			let declNode = decl.node;
			if( declNode ) {
				node.$declaration = declNode;
				node.$captured = declNode.$captured =
					declNode.$captured || scope != node.$scope.closestHoistScope()
				;
			}
			else {
				// Special case. For example, 'super' or 'this' doesn't has any declaration node
				node.$captured = true;
			}
		}
	}

	, detectConstAssignment: function detectConstAssignment(node) {
		if (this.is.isLvalue(node)) {
			const scope = node.$scope.lookup(node.name);
			if (scope && scope.getKind(node.name) === "const") {
				error(getline(node), "can't assign to const variable {0}", node.name);
			}
		}
	}

	, getNodeVariableNames: function(node) {
		let vars = [];

		var _this = this;
		function addParam(param) {
			if( param === null ){
				return;
			}

			if( _this.is.isObjectPattern(param) ) {
				param.properties.forEach(addParam);
			}
			else if( param.type === "Property" ) {//from objectPattern
				addParam(param.value);
			}
			else if( _this.is.isArrayPattern(param) ) {
				param.elements.forEach(addParam);
			}
			else {
				vars.push(param.name);
			}
		}

		function addVariable(variable) {
			if( !variable ) {
				return;
			}

			if( _this.is.isObjectPattern(variable) ) {
				variable.properties.forEach(addVariable);
			}
			else if( variable.type === "Property" ) {//from objectPattern
				addVariable(variable.value);
			}
			else if( _this.is.isArrayPattern(variable) ) {
				variable.elements.forEach(addVariable);
			}
			else if( variable.type === "SpreadElement" ) {//from arrayPattern
				vars.push(variable.argument.name);
			}
			else {
				vars.push(variable.name);
			}
		}

		if( this.is.isFunction(node) ) {
			node.params.forEach(addParam);

			if( node.rest ) {
				addParam(node.rest)
			}
		}
		else if( node.type === "VariableDeclaration" ) {
			node.declarations.forEach(function(declarator) {
				addVariable(declarator.id);
			});
		}
		else if( node.type === "AssignmentExpression" ) {
			addVariable(node.left)
		}
		else {
			addVariable(node)
		}

		return vars;
	}

	, PropertyToString: function(node, justName) {
		let isParentComputedProperty = node
			&& (this.is.isProperty(node.$parentNode) || this.is.isMethodDefinition(node.$parentNode))
			&& node.$parentNode.computed
		;

		let _dot = justName ? '' : '.';
		let _computedBefore = justName ? '' : '[';
		let _computedAfter = justName ? '' : ']';

		if ( isParentComputedProperty ) {
			return _computedBefore + this.alter.get(node.range[0], node.range[1]) + _computedAfter;
		}

		let isPrimitive = this.is.isLiteral(node) || this.is.isIdentifier(node);

		if ( isPrimitive ) {
			var result;
			if( node.type === "Literal" ) {
				result = _computedBefore + node.raw + _computedAfter;
			}
			else {
				result = _dot + node.name;
			}

			return result;
		}
		core.__printNode(node)

		assert(false);
	}

	,
	/**
	 *
	 * @param {Object} node
	 * @param {string} donor
	 * @param {number} fromIndex
	 */
	unwrapRestDeclaration: function(node, donor, fromIndex) {
		assert(node.type === "Identifier");

		const sliceFunctionName = this.createVars(node, "slice");

		return node.name + " = " + sliceFunctionName + ".call(" + donor + ", " + fromIndex + ")";
	}


	,
	/**
	 * TODO:: update this method to unwrapp more node types
	 * @param {Object} node
	 */
	unwrapNode: function(node) {
		assert(typeof node === "object");
		var from = node.range[0], to = node.range[1];

		if( node.type === "SequenceExpression" )return "(" + this.alter.get(from, to) + ")";
		if( node.type === "ConditionalExpression" )return "(" + this.alter.get(from, to) + ")";
		return this.alter.get(from, to);
	}

	,
	/**
	 *
	 * @param {Object} node
	 * @param {string} donor
	 * @param {string} value
	 */
	definitionWithDefaultString: function(node, donor, value) {
		assert(node.type === "Identifier");

		return node.name + " = " + donor + ";" + this.defaultString(node, value);
	}

	,
	/**
	 *
	 * @param {Object} node
	 * @param {string} value
	 */
	defaultString: function(node, value) {
		assert(node.type === "Identifier");

		return "if(" + node.name + " === void 0)" + node.name + " = " + value;
	}

	,

	__assignmentString: function(node, isDeclaration) {
		assert(node.type === "AssignmentExpression" || node.type === "VariableDeclarator");

		let left, right, isAssignmentExpression = node.type === "AssignmentExpression";

		if( isAssignmentExpression ) {
			left = node.left;
			right = node.right;
		}
		else {
			left = node.id;
			right = node.init;
		}

		let destructuringDefaultNode = left.default;//TODO:: goes to latest Parser API from esprima

		let variableName = left.name;
		let result = variableName + " = ";
		let valueString = right["object"].name + core.PropertyToString(right["property"]);

		if( isAssignmentExpression ) {
			result += "(";
		}

		if( typeof destructuringDefaultNode === "object" ) {
//			let tempVar = core.getScopeTempVar(node.$scope);
//
//			result += (
//				"((" + tempVar + " = " + valueString + ") === void 0 ? " + this.alter.get(destructuringDefaultNode.range[0], destructuringDefaultNode.range[1]) + " : " + tempVar + ")"
//			);
//
//			core.setScopeTempVar(node.$scope, tempVar);

			// TODO:: tests
			result += (
				"((" + variableName + " = " + valueString + ") === void 0 ? " + this.alter.get(destructuringDefaultNode.range[0], destructuringDefaultNode.range[1]) + " : " + variableName + ")"
				);
		}
		else {
			result += valueString;
		}

		if( isAssignmentExpression ) {
			result += ", " + left.name + ")";
		}

		return result;
	}

	,
	AssignmentExpressionString: function(expression) {
		return this.__assignmentString(expression, false);
	}

	,
	VariableDeclaratorString: function(definition) {
		return this.__assignmentString(definition, true);
	}

	, __getNodeBegin: function(node) {
		if ( '$nodeBegin' in node ) {
			return node['$nodeBegin'];
		}

		let begin;
		let hoistScopeNodeBody = node.body;

		let _this = this;
		let findUseStrictBlock = function(node) {
			if ( _this.is.isExpressionStatement(node.body[0])
				&& _this.is.isLiteral(node.body[0].expression)
				&& node.body[0].expression.value === 'use strict'
				) {
				return node.body[0];
			}
		};

		if ( node.type === "Program" ) {
			const useStrictBlock = findUseStrictBlock(node);

			if ( useStrictBlock ) {
				const blockEnd = useStrictBlock.range[1];
				begin = useStrictBlock.expression.range[1];

				if ( !useStrictBlock.$new_semi ) {
					if ( !this.alter.getRange(begin, blockEnd).contains(';') ) {
						useStrictBlock.$new_semi = true;
						this.alter.insertBefore(begin, ';', {extend: true});
					}
					else {
						begin = blockEnd;
					}
				}
			}
			else {
				begin = 0;
			}
		}
		else if( this.is.isClass(node) ) {
			begin = hoistScopeNodeBody.range[0] + 1;
		}
		else if( this.is.isFunction(node) ) {
			const isNakedFunction = node.expression === true;
			const useStrictBlock = !isNakedFunction && this.is.isBlock(node.body) && findUseStrictBlock(node.body);

			if ( useStrictBlock ) {
				const blockEnd = useStrictBlock.range[1];
				begin = useStrictBlock.expression.range[1];

				if ( !useStrictBlock.$new_semi ) {
					if ( !this.alter.getRange(begin, blockEnd).contains(';') ) {
						useStrictBlock.$new_semi = true;
						this.alter.insertBefore(begin, ';', {extend: true});
					}
					else {
						begin = blockEnd;
					}
				}
			}
			else {
				begin = hoistScopeNodeBody.range[0] + (isNakedFunction ? 0 : 1);
			}
		}
		else if( node.type === "ComprehensionExpression" ) {
			begin = node.range[0] + 1;
		}
		else if( node.type === "BlockStatement" ) {
			begin = node.range[0] + 1;
		}
		else if( hoistScopeNodeBody ) {
			if( hoistScopeNodeBody.length ) {
				hoistScopeNodeBody = hoistScopeNodeBody[0];
			}
			begin = hoistScopeNodeBody.range[0];

			if( this.is.isFunction(node) ) {
				begin++;
			}
		}
		else {
			begin = node.range[0];
		}

		return begin;
	}

	, getScopeTempVar: function(usingNode, scope, hoistScope, prefix) {
		assert(scope instanceof Scope, scope + " is not instance of Scope");

		if( !hoistScope ) {
			hoistScope = scope.closestHoistScope();
		}

		if( !prefix ) {
			prefix = "$D";
		}

		let startsFrom = usingNode.range[0];

		let freeVar = hoistScope.popFree(startsFrom);

		if( !freeVar ) {
			freeVar = core.unique(prefix, true);
			hoistScope.add(freeVar, "var", {
				//TODO:
			});

			this.alter.insertBefore(this.__getNodeBegin(hoistScope.node), "var " + freeVar + ";");
		}
		/*newDefinitions.push({
			"type": "EmptyStatement"
			, __semicolon: true
		});
		newDefinitions.push({
			"type": "AssignmentExpression"
			, "operator": "="
			, "left": {
				"type": "Identifier",
				"name": valueIdentifierName
			}
			, "right": {
				"type": "__Raw",
				__initValue: valueIdentifierDefinition
			}
		});*/

		return freeVar;
	}

	, setScopeTempVar: function(freeVar, usingNode, hoistScope, cleanup) {
		assert(hoistScope instanceof Scope, hoistScope + " is not instance of Scope");
		assert(typeof freeVar === "string");

		hoistScope = hoistScope.closestHoistScope();

		let endsFrom = usingNode.range[1];

		hoistScope.pushFree(freeVar, endsFrom);

		if( !cleanup ) {
			return;
		}

		// TODO:: maybe cleanup only if variable can be captured by function-closure?

		// go up the tree and trying to find a BlockStatement or Program block
		let blockStatement
			, commaNeeded = false
			, maxParentCount = 20, ii = 0
		;
		while ( usingNode ) {

			if( usingNode.type === 'ReturnStatement' ) {
				usingNode = null;
			}
			else if( usingNode.type === 'BlockStatement' ) {
				blockStatement = usingNode;
				break;
			}
			else if( this.is.isClass(usingNode) ) {
				blockStatement = usingNode;
				break;
			}
			else if( usingNode.type === 'VariableDeclaration' ) {
				let $parent = usingNode.$parent;

				if( $parent && $parent.type === 'BlockStatement' ) {
					if( ($parent = $parent.$parent) && this.is.isFunction($parent) ) {
						blockStatement = usingNode;
						commaNeeded = true;
						break;
					}
				}

				usingNode = usingNode.$parent;
			}
			else if( usingNode.type === 'Program' ) {
				blockStatement = usingNode;
				commaNeeded = true;
				break;
			}
			else if( usingNode.type === 'FunctionDeclaration' ) {
				blockStatement = usingNode.body;
				commaNeeded = true;
				break;
			}
			else {
				usingNode = usingNode.$parent;
			}

			if( ++ii > maxParentCount ) {
				// paranoiac mode on
				break;
			}
		}

		if( blockStatement ) {
			// trying to clean up temporary variable
			let previousCleanupOptions = hoistScope.$cleanups && hoistScope.$cleanups[freeVar];
			if( !previousCleanupOptions ) {
				if( !hoistScope.$cleanups ) {
					hoistScope.$cleanups = {};
				}
			}
			else {
				previousCleanupOptions.inactive = true;// turn-off previous cleanup
			}

			let cleanupOptions = {};
			let isProgramNode = usingNode.type === 'Program';

			this.alter.insertBefore(
				blockStatement.range[1] - ( isProgramNode ? 0 : 1 )
				, ";" + freeVar + " = void 0" + (commaNeeded ? ";" : "")
				, cleanupOptions
			);

			hoistScope.$cleanups[freeVar] = cleanupOptions;
		}
	}

	, findParentForScopes: function() {
		let parentScope
			, scopes = [].slice.call(arguments)
			, scopesLength = scopes.length
			, maxCounter = 0
		;

		assert(scopesLength);

		if( scopesLength === 1 ) {
			return scopes[0].closestHoistScope();
		}

		for( let i = 0 ; i < scopesLength ; ++i ) {
			let scope = scopes[i];
			scope = scopes[i] = scope.closestHoistScope();

			if( scope.node.type === "Program" ) {
				return scope;
			}
		}

		if( scopesLength === 2 ) {
			if( scopes[0] === scopes[1] ) {
				return scopes[0];
			}
		}

		let uniquePathId = UUID_PREFIX + UUID++;

		while( !parentScope && ++maxCounter < 100 ) {
			for( let i = 0 ; i < scopesLength ; ++i ) {
				let scope = scopes[i];

				if( scope.node.type === 'Program') {
					//top scope reached
					parentScope = scope;
					break;
				}

				scope = scope.parent.closestHoistScope();

				if( scope.$__path === uniquePathId ) {
					parentScope = scope;
					break;
				}

				scope.$__path = uniquePathId;
				scopes[i] = scope;
			}
		}

		return parentScope
			|| scopes[0] // could not find a parent for two or more scope's -> using first scope as a default value
		;
	}

	, bubbledVariableDeclaration: function(scope, variableName, variableInitValue, isFunction, variableNamePlaceholder) {
		scope = scope.closestHoistScope();

		if ( scope.node["$bubbleNext"] ) {
			scope = scope.parent.closestHoistScope();
		}

		let bubbledVariable = this.__isBubbledVariableDeclaration(variableName, variableInitValue);

		if( bubbledVariable ) {
			if( scope.lookup(bubbledVariable.name) ) {
				return bubbledVariable.name;
			}

			scope = this.findParentForScopes(scope, bubbledVariable.scope);
			return this.__rebaseBubbledVariableDeclaration(scope, variableName);
		}
		else {
			return this.__createBubbledVariableDeclaration(scope, variableName, variableInitValue, isFunction, void 0, variableNamePlaceholder);
		}
	}

	, __isBubbledVariableDeclaration: function(variableName, variableInitValue) {
		let bubbledVariable = this.bubbledVariables[variableName];

		if( bubbledVariable && bubbledVariable.testValue === variableInitValue ) {
			return bubbledVariable;
		}
		return false;
	}

	, __createBubbledVariableDeclaration: function(scope, variableName, variableInitValue, isFunction, bubbledVariable, variableNamePlaceholder) {
		if( bubbledVariable ) {
			isFunction = bubbledVariable.isFunction;
			variableName = bubbledVariable.name;
			variableInitValue = bubbledVariable.value;

			bubbledVariable.scope = scope;//rebase to the new scope
			bubbledVariable.changesOptions = {};//create new options for new changes
		}
		else {
			let name = core.unique(variableName, true);
			let testValue = variableInitValue;

			if( variableNamePlaceholder ) {
				variableInitValue = variableInitValue.replace(new RegExp(variableNamePlaceholder.replace(/([\$\^\&\[\]\(\)\-])/g, '\\$1'), "g"), name);
			}

			bubbledVariable = {
				name: name
				, testValue: testValue
				, value: variableInitValue
				, isFunction: isFunction
				, scope: scope
				, changesOptions: {}
			};
			this.bubbledVariables[variableName] = bubbledVariable;
			variableName = bubbledVariable.name;
		}

		// remove previous VariableDeclaration ?
		scope.add(variableName, "var", {
			//TODO:
		});

		if( isFunction ) {
			variableInitValue = "function " + variableName + variableInitValue
		}
		else {
			variableInitValue = "var " + variableName + " = " + variableInitValue + ";";
		}

		this.alter.insertBefore(this.__getNodeBegin(scope.node), variableInitValue, bubbledVariable.changesOptions);

		return variableName;
	}

	, __rebaseBubbledVariableDeclaration: function(scope, variableName) {
		let bubbledVariable = this.bubbledVariables[variableName];
		let latestChangesOptions = bubbledVariable.changesOptions;

		latestChangesOptions.inactive = true;//deactivate this changes

		return this.__createBubbledVariableDeclaration(scope, void 0, void 0, void 0, bubbledVariable);
	}

	, getVariableDeclarationNodes: function(variableDeclaration) {
		if( variableDeclaration.type === 'FunctionDeclaration' ) {
			return [variableDeclaration.id];
		}

		let result = [];
		let declarations = variableDeclaration.declarations;

		assert(!!declarations, "Wrong type of declaration");

		declarations.forEach(function(variableDeclarator) {
			let variableDeclaratorId = variableDeclarator.id;

			if( this.is.isArrayPattern(variableDeclaratorId) || this.is.isObjectPattern(variableDeclaratorId) ) {
				this.traverseDestructuringVariables(variableDeclaratorId, function(Identifier) {
					result.push(Identifier);
				})
			}
			else {
				result.push(variableDeclaratorId);
			}
		}, this);

		return result;
	}

	, traverseDestructuringVariables: function(definitionNode, traverse) {
		let isObjectPattern = this.is.isObjectPattern(definitionNode);

		assert(isObjectPattern || this.is.isArrayPattern(definitionNode));

		let elementsList = isObjectPattern ? definitionNode.properties : definitionNode.elements;

		for( let k = 0, len = elementsList.length ; k < len ; k++ ) {
			let element = elementsList[k], elementId = isObjectPattern ? element.value : element;
			if (element) {
				if( this.is.isObjectPattern(elementId) || this.is.isArrayPattern(elementId) ) {
					this.traverseDestructuringVariables(
						isObjectPattern ? element.value : element
						, traverse
					);
				}
				else {
					element = isObjectPattern ? element.value : element;

					const isSpreadElement = element.type === "SpreadElement";

					if( isSpreadElement ) {
						element = element.argument;
					}

					assert(element.type === "Identifier", 'error in "traverseDestructuringVariables". Element is "' + element.type + '"');

					if( traverse(element, isSpreadElement) === false ) {
						break;
					}
				}
			}
		}
	}

	, getDestructuringVariablesName: function(definitionNode) {
		let names = [];
		this.traverseDestructuringVariables(definitionNode, function(element) {
			names.push(element.name);
		});
		return names;
	}

	, detectDestructuringParent: function(node) {
		let parent = node.$parent;

		if( parent ) {
			if( parent.type === 'Property' ) {
				parent = parent.$parent;
				if( this.is.isObjectPattern(parent) ) {
					return parent;
				}
			}
			else if( this.is.isArrayPattern(parent) ) {
				return parent;
			}
		}

		return null;
	}

	/**
	 * check declaration for non-empty
	 * */
	, declarationContainsDeclarator: function(declarationNode, declaratorNode) {
		assert(declarationNode.type === 'VariableDeclaration', 'first parameter must be a "VariableDeclaration" node not a "' + declarationNode.type + '"');
		assert(declaratorNode.type === 'VariableDeclarator', 'second parameter must be a "VariableDeclarator" node not a "' + declaratorNode.type + '"');

		let declarations = declarationNode.declarations;
		let declaration;

		let k = 0, len = declarations.length;
		for(  ; k < len ; k++ ) {
			declaration = declarations[k];

			if( this.is.isObjectPattern(declaration) || this.is.isArrayPattern(declaration) ) {
				let result;
				this.traverseDestructuringVariables(declaration, function(declaration) {
					if( declaration === declaratorNode ) {
						result = true;
						return false;
					}
				});
				if( result === true ) {
					return true;
				}
			}
			else if( declaration === declaratorNode ) {
				return true;
			}
		}
	}

	, getVariableDeclaratorForIdentifier: function(node) {
		assert(node.type === 'Identifier', 'node must be a "Identifier" node not a "' + node.type + '"');

		let parent = node;

		while( true ) {
			parent = parent.$parent;

			if( parent.type === 'VariableDeclarator' ) {
				return parent;
			}

			if( parent.type === 'Property' ) {

			}
			else if( this.is.isObjectPattern(parent) || this.is.isArrayPattern(parent) ) {

			}
			else {
				assert(false, 'Wrong type of node "' + parent.type + '"');
			}
		}
	}

	, getNearestIIFENode: function(node) {
		let closestHoistScope = node.$scope.closestHoistScope();
		let scopeNode = closestHoistScope.node;

		while( scopeNode ) {
			let parent = scopeNode.$parent;

			if( !parent )break;

			if( scopeNode.type === "FunctionExpression" ) {

				if( parent && parent.type === "CallExpression" && parent.callee === scopeNode ) {
					return scopeNode;
				}
			}

			scopeNode = parent.$scope.closestHoistScope().node;
		}

		return null;
	}

	, getKeyName: function(keyNode) {
		let isLiteral = this.is.isLiteral(keyNode);
		assert(isLiteral || this.is.isIdentifier(keyNode));

		return isLiteral ? keyNode.value : keyNode.name;
	}

	, getScopeOptions: function(scope, node) {
		if ( scope === void 0 ) {
			let options = this.astTopScope.options;

			return options['computedAll'] || (options['computedAll'] =
				options.reduce(function(computedOptions, record){
					let options = record.data;
					Object.keys(options).reduce(function(options, key) {
						computedOptions[key] = options[key];
						return options;
					}, options);
					return computedOptions;
				}, {}))
			;
		}
		if ( node === void 0 )node = scope.node;

		let commentOptionsCount = this.commentOptionsCount;

		let to = node.range[0];
		let computedOptions = [];

		let options = scope.options;
		let parentScope = scope;
		let parentRange = parentScope.node.range;
		let from = parentRange[0], key = from + '-' + to;

		do {
			if ( !commentOptionsCount ) {
				break;//just fast return for files without comment options
			}
			parentRange = parentScope.node.range;
			options = parentScope.options;

			let from = parentRange[0], key = from + '-' + to;

			let parentComputedOptions = options;// TODO:: computed property now working not so good as expected
			if ( false && (parentComputedOptions = parentComputedOptions['computed']) && (parentComputedOptions = parentComputedOptions[key]) ) {
				computedOptions.unshift(parentComputedOptions);
				break;
			}
			else {
				computedOptions.unshift.apply(computedOptions, options.filter(function(record) {
					--commentOptionsCount;

					let range = record.range;
					if ( from <= range[0] && to >= range[1] ) {
						return true;
					}
					return false;
				}).map(function(record){ return record.data }));
			}
		}
		while ( (parentScope = parentScope.parent) );

		options = scope.options;
		(options = (options['computed'] || (options['computed'] = {})));
		if ( computedOptions.length === 1 ) {
			return options[key] = computedOptions[0];
		}
		else {
			options[key] = computedOptions.reduce(function(computedOptions, options) {
				Object.keys(options).reduce(function(options, key) {
					computedOptions[key] = options[key];
					return options;
				}, options);
				return computedOptions;
			}, {});
			return options[key]
		}
	}

	, detectSemicolonNecessity: function(node) {
		let prev, parent = node.$parent;

		if ( parent.type === 'ExpressionStatement' ) {
			node = parent;
			parent = parent.$parent;
		}

		if ( (this.is.isBlock(parent) || this.is.isProgram(parent)) && (prev = node.$previousElementSibling) ) {
			let range = getRange(node)
				, prevRange = getRange(prev)
				, end = range[0]
				, start = prevRange[1]
			;
			if ( start < end ) {
				let string = this.alter.getRange(start, end);

				return /[\r\n]/.test(string) && !/;/.test(string);
			}
		}
		return false;
	}

	, __printNode: function(node) {
		function hideSpecialProperties(node, deep) {
			for ( var prop in node ) if ( node.hasOwnProperty(prop) ) {
				if ( deep < 5 && node[prop] && typeof node[prop] === 'object' ) {
					hideSpecialProperties(node, deep + 1);
				}

				if ( prop.charAt(0) === '$' ) {
					Object.defineProperty(node, prop, {enumerable: false});
				}
			}
		}

		hideSpecialProperties(node, 0);

		console.log(node);
	}
	
	, hasNodeBetween: function(fromNode, toNode) {
		let node = fromNode;
		let result = false;
		let findNodes = [].slice.call(arguments, 2);
		
		do {
			for ( var i = 0 ; i < findNodes.length ; i++ ) {
				let findNode = findNodes[i];

				result = typeof findNode === 'string'
					? findNode == node.type
					: findNode == node
				;
				if ( result ) break;
			}

			if ( result ) break;
			if ( typeof toNode === 'string'
					? toNode == node.type
					: toNode == node
				) break;
		}
		while( (node = node.$parentNode) );

		return result;
	}
});

for(let i in core) if( core.hasOwnProperty(i) && typeof core[i] === "function" ) {
	core[i] = core[i].bind(core);
}
