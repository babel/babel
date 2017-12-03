"use strict";

const assert = require("assert");
const core = require("./core");

const GET_CNAMES = "function f(o){" +
	"var r,u;for(var p in o)if((r=o[p])&&typeof r ==='object'&&(u=r[\"__unq\"])){" +
		"${getCNames_names}[u]=p;" +
		"delete r[\"__unq\"];" +
	"}" +
	"return o;" +
"};";

function literalToName(string) {
	let firstChar = string.charAt(0), lastChar = string.charAt(string.length - 1);
	let isLiteral = (firstChar === '\'' || firstChar === '\"')
		&& (lastChar === '\'' || lastChar === '\"')
	;

	if ( isLiteral ) {
		return string.substring(1, string.length - 1);
	}
	return string;
}

function getRange(node) {
	return node.groupRange || node.range;
}

const classesTranspiler = {
	reset: function() {
		this.__statistic = {
			staticCount: 0
			, protoCount: 0
			, flexibleNamesCount: 0
		};
		this.__current = {
			method: null
			, name: ''
			, accessors: {}
			, staticAccessors: {}
			, firstStaticAccessors: null
		};
	}

	, setup: function(alter, ast, options) {
		if( !this.__isInit ) {
			this.reset();
			this.__isInit = true;
		}

		core.registerVar('super', {persistent: true});
		core.registerVar('constructor', {persistent: true});
//		core.registerVar('super_prototype', {persistent: true});
		core.registerVar('static', {persistent: true});
		core.registerVar('proto', {persistent: true});
		core.registerVar('getCNames_names', {name: 'CNAMES', template: '[]'});
		core.registerVar('getCNames', {name: 'GET_CNAMES', template: GET_CNAMES, deps: ['getCNames_names']});

		this.alter = alter;
	}

	, accessorsDefinition: function(node, accessors) {
		let accessorsKeys = Object.keys(accessors);
		let accessorsFlexibleName = false;

		let result = {
			objectWrapper: ''
			, main: ''
			, afterAll: ''
		};

		if ( accessorsKeys.length ) {
			result.main = accessorsKeys.map(function(key) {
				let accessor = accessors[key];
				let raw = accessor.raw
					, getter = accessor.get
					, setter = accessor.set
					, isFlexibleName = !!accessor.$nameForSuper
					, uniqueId
				;

				if ( isFlexibleName ) {
					accessorsFlexibleName = isFlexibleName;

					uniqueId = ++this.__statistic.flexibleNamesCount;

					let nameForSuper = accessor.$nameForSuper;

					let namesVar = core.createVars(node, "getCNames_names");

					result.afterAll += (nameForSuper + '=' + namesVar + '[' + uniqueId + '];delete ' + namesVar + '[' + uniqueId + '];');
				}


				return (raw || key)
					+ ": {" + (getter ? "\"get\": " + getter + ", " : "") + (setter ? "\"set\": " + setter + ", " : "") + "\"configurable\":true,\"enumerable\":true"
					+ (isFlexibleName ? ', "__unq": ' + uniqueId : '')
					+ "}"
			}, this).join(", ");

			if ( accessorsFlexibleName ) {
				result.objectWrapper = core.createVars(node, "getCNames");
			}
		}

		return result;
	}

	, createPrototypeString: function(node, className, superName, accessors) {
		const freezePrototypeString =
			core.createVars(node, "defineProperty")
				+ "(" + className + ",\"prototype\",{\"configurable\":false,\"enumerable\":false,\"writable\":false});";

		if ( superName ) {
			let names = core.createVars(node, {setPrototypeOf: true/*, "super_prototype": true*/});

			return "if(" + superName + "!==null)" + names.setPrototypeOf + "(" + className + "," + superName + ");"
				+ className + ".prototype = "
				+ this.createAccessorsDefinitionString(node, className, accessors, true, superName)
				+ freezePrototypeString
			;
		}
		else if ( Object.keys(accessors).length ) {
			return this.createAccessorsDefinitionString(node, className + ".prototype", accessors)
				+ freezePrototypeString
			;
		}
		else {
			return freezePrototypeString;
		}
	}

	, createAccessorsDefinitionString: function(node, recipientStr, accessors, createMode, superName) {
		const accessorsDefinition = this.accessorsDefinition(node, accessors);

		assert(!createMode || superName);

		const accessorsString = accessorsDefinition.main;
		if ( !accessorsString && !createMode ) {
			return '';
		}
		const beforeObject = accessorsDefinition.objectWrapper ? accessorsDefinition.objectWrapper + '(' : '';
		const afterObject = accessorsDefinition.objectWrapper ? ')' : '';
		const afterAll = accessorsDefinition.afterAll ? accessorsDefinition.afterAll + ';' : '';

		let funcName = core.createVars(node, createMode ? 'create' : 'defineProperties');

		return funcName
			+ "("
			+ (createMode ? superName + "!==null?" + superName + ".prototype:null" : recipientStr)
			+ ","
			+ beforeObject
			+ "{"
				+ (createMode
					? "\"constructor\":{\"value\":" + recipientStr + ",\"configurable\":true,\"writable\":true}"
						+ (accessorsString ? ", " + accessorsString : "")
					: accessorsString
				)
			+ "}"
			+ afterObject
			+ ");"
			+ afterAll
		;
	}

	, ':: ClassDeclaration, ClassExpression': function replaceClassBody(node, astQuery) {
		{
			const isClassExpression = node.type === 'ClassExpression'
				, nodeId = node.id
			;

			assert(nodeId ? core.is.isIdentifier(nodeId) : isClassExpression);

			const classBodyNodes = node.body.body
				, useStrictString = node.strictMode ? "" : "\"use strict\";"
			;

			let superClass = node.superClass
				, superIsPrimitive = core.is.isIdentifier(superClass) || core.is.isLiteral(superClass)
				, superIsNotPrimitive = superClass && !superIsPrimitive
				, classBodyNodesCount = classBodyNodes.length
				, insertAfterBodyBegin_string = ""
				, classConstructor
				, extendedClassConstructorPostfix
			;

			if ( superIsNotPrimitive ) {
				node["$bubbleNext"] = true;
			}

			let currentClassName;

			let names = core.createVars(node, {"super": !!superClass, "constructor": !nodeId, __proto__support: !!superClass, MIXIN: true});

			currentClassName = nodeId ? nodeId.name : names.constructor;
			node["$ClassName"] = currentClassName;
			this.__current.name = currentClassName;

			let classStr = (isClassExpression ? "(" : "var " + currentClassName + " = ")
				+ "(function("
			;

			if( superClass ) {
				classStr += names.super;

				insertAfterBodyBegin_string =
					'if(!' + names.__proto__support + ')'
						+ names.MIXIN + "(" + currentClassName + ", " + names.super + ");";
			}

			classStr += ")";

			for( let i = 0 ; i < classBodyNodesCount && !classConstructor ; i++ ) {
				classConstructor = classBodyNodes[i];

				if( classConstructor.type !== "MethodDefinition" ) {
					classConstructor = null;
				}
				else {
					let nodeKey = classConstructor.key;
					let isLiteral = core.is.isLiteral(nodeKey);
					let methodName = isLiteral ? nodeKey.value : nodeKey.name;

					if( methodName !== "constructor" || classConstructor.static ) {
						classConstructor = null;
					}
				}
			}

			this.__current.accessors = {};
			this.__current.staticAccessors = {};
			if( classBodyNodesCount ) {
				for ( let i = 0 ; i < classBodyNodesCount ; i++ ) {
					this.replaceClassMethods(this.__current.method = classBodyNodes[i], astQuery);
					this.__current.method = null;
				}
			}

			extendedClassConstructorPostfix = this.createPrototypeString(node, currentClassName, superClass && names.super, this.__current.accessors);
			let staticAccessorsDefinitionString = this.createAccessorsDefinitionString(node, currentClassName, this.__current.staticAccessors);

			if( classConstructor ) {
				this.alter.replace(classConstructor.key.range[0], classConstructor.key.range[1], "function " + currentClassName);
				if( extendedClassConstructorPostfix ) {
					this.alter.insert(classConstructor.range[1], extendedClassConstructorPostfix);
				}
			}
			else {
				insertAfterBodyBegin_string =  "function " + currentClassName + "() {"
					+ (superClass ? 'if(' + names.super + '!==null)' + names.super + ".apply(this, arguments)" : "")
					+ "}" + (insertAfterBodyBegin_string || "") + (extendedClassConstructorPostfix || "");
			}

			let theEndString = '', tmpVars = [];
			if ( this.__statistic.staticCount ) {
				let staticName = core.createVars(node, "static");

				theEndString += (names.MIXIN + '(' + currentClassName + ',' + staticName + ');')

				tmpVars.push(staticName);
			}
			if ( this.__statistic.protoCount ) {
				let protoName = core.createVars(node, "proto");

				theEndString += (names.MIXIN + '(' + currentClassName + '.prototype,' + protoName + ');')

				tmpVars.push(protoName);
			}
			if ( tmpVars.length ) {
				insertAfterBodyBegin_string += ('var ' + tmpVars.join('={},') + '={};');
				tmpVars.push('void 0');
			}
			theEndString += tmpVars.join('=');

			if ( staticAccessorsDefinitionString ) {
				this.alter.insertAfter(this.__current.firstStaticAccessors.range[1], ';' + staticAccessorsDefinitionString);
			}

			// replace class definition
			if ( !superClass || superIsPrimitive ) {
				if ( useStrictString ) {
					this.alter.replace(node.body.range[0], node.body.range[0] + 1, '{' + useStrictString);
				}

				this.alter.insertBefore(node.body.range[0] + 1, insertAfterBodyBegin_string);

				// text change 'class A[ extends B]' => 'var A = (function([super$0])'
				let from = node.range[0], to = node.body.range[0];
				let lineBreaks = this.alter.getRange(from, to).match(/[\r\n]/g) || [], lineBreaksCount = lineBreaks.length;

				this.alter.replace(from, to, classStr, {transform: function(str) {
					const newLineBreaks = str.match(/[\r\n]/g) || [];
					const newLineBreaksCount = newLineBreaks.length;

					if ( newLineBreaksCount < lineBreaksCount ) {
						str = lineBreaks.slice(newLineBreaksCount).join("") + str;
					}
					return str;
				}});

				if ( superClass ) {
					superClass = core.is.isLiteral(superClass) ? superClass.raw : superClass.name;
				}
			}
			else {
				// text change 'class A extends (returnSuper()){' => 'var A = (function(){super$0=(returnSuper())'
				classStr = classStr + '{' + useStrictString + names.super + '=';

				let superRange = getRange(superClass);

				let from = node.range[0], to = superRange[0];
				let lineBreaks = this.alter.getRange(from, to).match(/[\r\n]/g) || [], lineBreaksCount = lineBreaks.length;

				this.alter.replace(from, to, classStr, {transform: function(str) {
					const newLineBreaks = str.match(/[\r\n]/g) || [];
					const newLineBreaksCount = newLineBreaks.length;

					if ( newLineBreaksCount < lineBreaksCount ) {
						str = lineBreaks.slice(newLineBreaksCount).join("") + str;
					}
					return str;
				}});

				this.alter.replace(superRange[1], node.body.range[0] + 1, ';' + insertAfterBodyBegin_string);//remove class '{'

				superClass = '';
			}

			theEndString += ";return " + currentClassName + ";}";

			if ( superClass ) {
				theEndString += (")(" + superClass + ")"
					+ (isClassExpression ? ")" : ";")//tail ')' or semicolon
				);
			}
			else {
				theEndString += (")()" + (isClassExpression ? ")" : ";"));//tail ')' or semicolon
			}

			let from = node.range[1] - 1;
			let to = node.range[1];
			// replace last '}'
			this.alter.replace(
				from
				, to
				, this.alter.get(from, to) + '|' + theEndString, {
					transform: function(str) {
						// HACK START: fix removing last ';'. SEE: LINK<LAST ';'>
						let char0, add = '', index = 0;
						do {
							char0 = str.charAt(index);
							index++;
							if ( char0 === ';' ) {
								add = ';';
							}
						}
						while ( char0 != '|' );
						str = add + str.substr(index);
						// HACK END
						return str;
					}
				}
			);

			this.reset();
		}
	}

	, unwrapSuperCall: function unwrapSuperCall(node, calleeNode, rootMethod, isConstructor) {
		assert(!calleeNode.$originalName);

		var superName = core.createVars(node, "super");

		let isStatic = rootMethod.static;
		let isAccessor = rootMethod.kind === 'get' || rootMethod.kind === 'set';
		let changeStr = superName + (isStatic || isConstructor ? "" : ".prototype");
		let callArguments = node.arguments;
		let hasSpreadElement = callArguments.some(function(node){ return node.type === "SpreadElement" });

		let name = '', access = '';
		if ( !isConstructor ) {
			if ( name = rootMethod.$nameForSuper ) {
				access = '[' + name + ']';
			}
			else {
				name = core.PropertyToString(rootMethod.key, true);
			}
		}

		if ( isAccessor ) {
			changeStr = core.createVars(node, 'getOwnPropertyDescriptor')
				+ '(' + changeStr + ',' + name + ')[\"' + rootMethod.kind + '\"]'
		}
		else {
			if ( !isConstructor && !access && (!hasSpreadElement || !rootMethod.$__hasName) ) {
				access = core.PropertyToString(rootMethod.key);
			}
			changeStr += access;
		}

		calleeNode.$originalName = calleeNode.name;
		calleeNode.name = superName;

		let changesEnd;
		if( !hasSpreadElement ) {

			if( !callArguments.length ) {
				changeStr += ".call(this)";
				changesEnd = node.range[1];
			}
			else {
				changeStr += ".call(this, ";
				changesEnd = callArguments[0].range[0];
			}

			// text change 'super$0.call(this, <some>)'
			this.alter.replace(calleeNode.range[0], changesEnd, changeStr);
		}
		else {
			// text change 'super(<some>)' => 'super$0(<some>)'
			this.alter.replace(calleeNode.range[0], calleeNode.range[1], changeStr);
		}
	}
	
	, replaceClassMethods: function replaceClassMethods(node, astQuery) {
		if( node.type === "MethodDefinition" ) {
			let nodeKey = node.key;
			let isLiteral = core.is.isLiteral(nodeKey);
			let isStatic = node.static;
			let isConstructor = !isStatic && (isLiteral ? nodeKey.value : nodeKey.name) === "constructor";

			if ( !isConstructor ) {

				let methodName = core.PropertyToString(nodeKey, true);
				let isComputed = node.computed;

				let keyRange = isComputed ? nodeKey.bracketsRange : nodeKey.range;

				this.__namedSuperCount = 0;
				this.__unNamedSuperCount = 0;
				astQuery.traverse(node.value.body, function(child) {
					if( child.type === "CallExpression" ) {
						child = child.callee;

						if ( core.is.isMemberExpression(child) ) {
							let objectNode = child.object;
							if( core.is.isIdentifier(objectNode) && objectNode.name === 'super' ) {
								this.__namedSuperCount++;

								node.$hasSuperInside = true;
							}
						}
						else if ( core.is.isIdentifier(child) && child.name === 'super' ) {
							this.__unNamedSuperCount++;

							node.$hasSuperInside = true;
						}
					}
					else if( core.is.isClass(child) || (core.is.isFunction(node) && node.type !== 'ArrowFunctionExpression' ) ) {
						return false;
					}
				}.bind(this));

				let unNamedSuperCount = this.__unNamedSuperCount;

				if( node.kind === 'set' || node.kind === 'get' ) {
					if ( isComputed ) {
						let targetName = isStatic === true ? this.__current.name : this.__current.name + '.prototype';

						if ( unNamedSuperCount ) {
							node.$nameForSuper = methodName = core.getScopeTempVar(node, node.$scope);
							// get [<name>]() -> $D$0=(<name>]()
							this.alter.replace(node.range[0], nodeKey.bracketsRange[0] + 1, methodName + '=(');
							// $D$0=(<name>]() -> $D$0=(<name>)+'';DP$0(<className>.prototype,$D$0,
							this.alter.insert(
								nodeKey.range[1]
								, ')+\'\';' + core.createVars(node, 'defineProperty') + '(' + targetName + ',' + methodName
							);
						}
						else {
							// get [<name>]() -> DP$0(<className>.prototype,<name>,
							this.alter.replace(
								node.range[0]
								, nodeKey.bracketsRange[0] + 1
								, core.createVars(node, 'defineProperty') + '(' + targetName + ','
							);
						}
						this.alter.replace(nodeKey.range[1], nodeKey.bracketsRange[1], ',{"' + node.kind + '":function');

						let nodeValue = node.value;
						this.alter.insertAfter(nodeValue.range[1], ',"configurable":true,"enumerable":true});');
					}
					else {
						if ( isStatic && !this.__current.firstStaticAccessors ) {
							this.__current.firstStaticAccessors = node;
						}

						assert(core.is.isIdentifier(nodeKey) || isLiteral);

						let key = literalToName(methodName);

						let accessor = isStatic === true
							? this.__current.staticAccessors[key] || (this.__current.staticAccessors[key] = {})
							: this.__current.accessors[key] || (this.__current.accessors[key] = {})
						;
						accessor.node = node;
						let safeKey = key.replace(/[^a-z0-9_$]/gi, function(a) {
							return a.charCodeAt(0);
						});
						let replacement = accessor[node.kind] =
							core.unique("$" + (isStatic ? "static_" : "") + safeKey + "_" + node.kind, true)
						;

						if ( isLiteral ) {
							accessor.raw = nodeKey.raw;
						}
						else if ( node.$hasSuperInside ) {
							if ( !accessor.$nameForSuper ) {
								accessor.$nameForSuper = core.getScopeTempVar(node, node.$scope);
							}
							node.$nameForSuper = accessor.$nameForSuper;
						}

						this.alter.replace(node.range[0], nodeKey.range[1], "function " + replacement);
					}

				}
				else {
					if ( isStatic ) {
						this.__statistic.staticCount++;
					}
					else {
						this.__statistic.protoCount++;
					}

					let targetName = core.createVars(node, isStatic === true ? 'static' : 'proto');

					if ( unNamedSuperCount && isComputed ) {
						node.$nameForSuper = methodName = core.getScopeTempVar(node, node.$scope);

						// text change 'static ['method' + i++](<something>)' => '$D$0=('method' + i++) + '';$static$0[$D$0](<something>)'
						// text change '['method' + i++](<something>)' => '$D$0='method' + i++;$proto$0[$D$0](<something>)'

						// [<name>]() -> $D$0=<name>]() or [<name>]() -> $D$0=(<name>]()
						this.alter.replace(node.range[0], nodeKey.bracketsRange[0] + 1, methodName + '=(');
						// $D$0=(<name>]() -> $D$0=(<name>)+'';$proto$0[$D$0]()
						this.alter.insertBefore(nodeKey.range[1], ')+\'\';' + targetName + '[' + methodName);
					}
					else {
						let beforeName = isLiteral && !isComputed ? '[' : (isComputed ? '' : '.');
						let afterName = isLiteral && !isComputed ? ']' : '';

						if ( isStatic ) {
							// text change 'static method(<something>)' => '$static$0.method(<something>)'
							// text change 'static [method](<something>)' => '$static$0[method](<something>)'
							this.alter.replace(node.range[0], keyRange[0], targetName + beforeName);
						}
						else {
							// text change 'method(<something>)' => '$proto$0.method(<something>)'
							// text change '[method](<something>)' => '$proto$0[method](<something>)'
							this.alter.insert(node.range[0], targetName + beforeName);
						}
						if ( afterName ) {
							this.alter.insert(keyRange[1], afterName);
						}
					}

					// text change 'method(<something>)' => 'method = function(<something>)', '[method](<something>)' => '[method] = function(<something>)'
					this.alter.insert(keyRange[1], " = function");

					this.alter.insertBefore(node.range[1], ';', {extend: true});/*LINK<LAST ';'>*/
				}
			}

			var _this = this;
			astQuery.traverse(node.value.body, function(node) {
				return _this.replaceClassMethodSuper(node, isConstructor);
			});
		}
	}
	
	, replaceClassMethodSuper: function replaceClassMethodSuper(node, isConstructor) {
		if( node.type === "CallExpression" ) {
			let calleeNode = node.callee;

			if ( core.is.isMemberExpression(calleeNode) ) {
				let objectNode = calleeNode.object;
				if ( core.is.isIdentifier(objectNode, 'super') ) {
					// text change 'super.method(<some>)' => 'super$0(<some>)' (if <some> contains SpreadElement) or 'super$0.call(this, <some>)'

					this.unwrapSuperCall(node, objectNode, {
						key: calleeNode.property
						, $__hasName: true
						, static: this.__current.method.static
						, computed: this.__current.method.computed
					});

					return false;
				}
			}
			else if ( core.is.isIdentifier(calleeNode, 'super') ) {
				// text change 'super(<some>)' => 'super$0[<superMethodName>](<some>)' (if <some> contains SpreadElement) or 'super$0[<superMethodName>].call(this, <some>)'
				this.unwrapSuperCall(node, calleeNode, this.__current.method, isConstructor);
			}
		}
		else if ( core.is.isIdentifier(node, 'super') ) {
			if ( !node.$originalName ) {
				let range = getRange(node);

				if ( !this.__current.method.static ) {
					let parent = node.$parentNode;

					if ( core.is.isExpression(parent) ) {
						this.alter.insert(range[1], '.prototype');
					}
				}

				node.$originalName = node.name;
				node.name = core.createVars(node, "super");

				this.alter.replace(range[0], range[1], node.name);
			}
		}
		else if( core.is.isClass(node) || (core.is.isFunction(node) && node.type !== 'ArrowFunctionExpression' ) ) {
			return false;
		}
	}
};

for(let i in classesTranspiler) if( classesTranspiler.hasOwnProperty(i) && typeof classesTranspiler[i] === "function" ) {
	classesTranspiler[i] = classesTranspiler[i].bind(classesTranspiler);
}

module.exports = classesTranspiler;
