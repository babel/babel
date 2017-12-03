"use strict";

const assert = require("assert");
const error = require("./../lib/error");
const core = require("./core");

function findSpreadArgument(node) {
	let spreadIndex = -1;
	let elements;
	if( node && Array.isArray(elements = (node.elements || node["arguments"])) ) {
		elements.forEach(function(arg, i) {
			if( spreadIndex === -1 && core.is.isSpreadElement(arg) ) {
				spreadIndex = i;
			}
		});
	}
	return spreadIndex;
}

function getRange(node) {
	return node && (node.bracketsRange || node.groupRange || node.range);
}

function needFirstSquareBracket(args) {
	let argsLength = args.length;
	return argsLength > 1
		|| (
			core.is.isArrayExpression(args[0].argument)
			&& !core.is.isSpreadElement(args[0].argument.elements[0])
		)
	;
}

function getLastNotNullElementIndex(elements, index) {
	if ( index === void 0 )index = elements.length;

	let element = null;

	while( element == null && index > 0 ) {
		element = elements[--index];
	}

	return element === null ? -1 : index;
}
function createArrayHoles(holesCount) {
	return holesCount > 0
		? "(new Array(" + holesCount + "))"
		: ""
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

	, ':: CallExpression,NewExpression,ArrayExpression': function(node) {
		let spreadIndex = findSpreadArgument(node);
		if( spreadIndex !== -1 ) {
			let type = node.type;

			if ( type === "CallExpression" ) {
				this.replaceCallExpression(node);
			}
			else if ( type === "NewExpression" ) {
				this.replaceNewExpression(node);
			}
			else if ( type === "ArrayExpression" && node.$despread !== true ) {
				this.replaceArrayExpression(node);
			}
		}
	}

	, replaceCallExpression: function(node) {
		const isMemberExpression = node.callee.type === "MemberExpression";
		const calleeType = isMemberExpression && node.callee.object.type;
		const isSimpleMemberExpression = isMemberExpression && (calleeType === "Identifier" || calleeType === "ThisExpression");
		const args = node["arguments"];
		const argsLength = args.length;
		const isSuper = isMemberExpression
			? node.callee.object.$originalName === 'super' || node.callee.object.name === 'super'
			: node.callee.$originalName === 'super' || node.callee.name === 'super'
		;

		assert(argsLength);

		let expressionBefore = ""
			, expressionInside = ""
		;

		if( isMemberExpression ) {
			if( isSimpleMemberExpression || isSuper ) {
				if ( isSuper ) {
					expressionInside =
						".apply(this, "
					;
				}
				else {
					expressionInside =
						".apply("
							+ this.alter.get(node.callee.object.range[0], node.callee.object.range[1])
							+ ", "
					;
				}
			}
			else {
				let tempVar = core.getScopeTempVar(node.callee.object, node.$scope);

				this.alter.wrap(
					node.callee.object.range[0]
					, node.callee.object.range[1]
					, (core.detectSemicolonNecessity(node) ? ";" : "") + "(" + tempVar + " = "
					, ")"
//					, {extend: true}
				);

				expressionInside = ".apply(" + tempVar + ", ";

				core.setScopeTempVar(tempVar, node, node.$scope, true);
			}
		}
		else {
			if ( isSuper ) {
				expressionInside =
					".apply(this, "
				;
			}
			else {
				expressionInside =
					".apply(null, "
				;
			}

			if( node.callee.type === "FunctionExpression" ) {
				expressionBefore = "(";
				expressionInside = ")" + expressionInside;
			}
		}

		if( expressionBefore ) {
			this.alter.insertBefore(
				node.callee.range[0]
				, expressionBefore
			);
		}

		this.alter.replace(
			node.parenthesesRange[0]
			, getRange(args[0])[0]
			, expressionInside + (needFirstSquareBracket(args) ? "[" : "")
		);

		this.replaceSpreads(node, args, true);
	}

	, replaceNewExpression: function(node) {
		// http://jsperf.com/object-create-bind-aply/2

		const isMemberExpression = node.callee.type === "MemberExpression";
		const isFunctionExpression = node.callee.type === "FunctionExpression";
		const args = node["arguments"];
		const argsLength = args.length;
		const isSuper = isMemberExpression
			? node.callee.object.$originalName === 'super' || node.callee.object.name === 'super'
			: node.callee.$originalName === 'super' || node.callee.name === 'super'
		;

		assert(argsLength);

		this.alter.remove(node.range[0], node.range[0] + 3);// remove 'new'

		let tempVarInstance = core.getScopeTempVar(node, node.$scope);
		let tempVar = core.getScopeTempVar(node, node.$scope);

		this.alter.insert(
			node.range[0]
			, (core.detectSemicolonNecessity(node) ? ";" : "")
				+ '((' + tempVar + '='
				+ (isFunctionExpression ? '(' : '')
				+ '((' + tempVarInstance + '=' + core.createVars(node, "create") + '((' + tempVar + '='
		);
		this.alter.insertBefore(
			node.parenthesesRange[0]
			, (isSuper
				? ')===null?null:' + tempVar + '.prototype))'
				: ').prototype))'
				) + ','
				+ (isSuper
					? tempVar + '===null?function(){}:' + tempVar
					: tempVar
					) + ').apply'
		);

		this.alter.replace(
			node.parenthesesRange[0] + 1
			, getRange(args[0])[0]
			, tempVarInstance + ', ' + (needFirstSquareBracket(args) ? '[' : '')
		);

//		this.alter.insertBefore(getRange(args)[1],
		this.alter.insert(node.range[1],
			(isFunctionExpression ? ')' : '')
			+ ')&&typeof ' + tempVar + '===\'object\'?' + tempVar + ':' + tempVarInstance + ')');

		core.setScopeTempVar(tempVarInstance, node, node.$scope, true);
		core.setScopeTempVar(tempVar, node, node.$scope, true);

		this.replaceSpreads(node, args, true);
	}

	, replaceArrayExpression: function(node) {
		// found new line symbols
		this.replaceSpreads(node);
	}

	, replaceSpreads: function(node, elements, innerSpread) {
		let self = this;

		let nonSpreadElementStart = -1;
		function startNotSpreadElementsGroup(start) {
			if( nonSpreadElementStart === -1 ) {
				nonSpreadElementStart = start;
			}
		}
		function endNotSpreadElementsGroup(end) {
			if( nonSpreadElementStart < 0 )return;

			let startElement = elements[nonSpreadElementStart]
				, endElement = elements[end || elements.length - 1]
			;

			assert(!!startElement);

			if( !endElement ) {
				endElement = elements[getLastNotNullElementIndex(elements, end)];
			}

			self.alter
				.insertBefore(getRange(startElement)[0], "[")
				.insert(getRange(endElement)[1], "]")
			;

			nonSpreadElementStart = -1;
		}

		let firstElemIsSpreadFlag = -1, that = this;

		function removeFirstSquareBracket() {
			if ( firstElemIsSpreadFlag >= 0 ) {
				if( !concatOpen ) {
					let from = firstElemIsSpreadFlag;

					that.alter.remove(from, from + 1);
				}
				firstElemIsSpreadFlag = -1;
			}
		}

		elements = elements || node.elements;

		let argsLength = elements.length;
		let callIteratorOpen = false, concatOpen = false, prevConcatOpen = false;
		let lastNullElementCount = 0, ArrayExpressionElementInInnerSpread = null;
		let callIteratorFunctionName, endString = "";
		let i = 0;

		for( ; i < argsLength ; i++ ) {
			const element = elements[i]
				, elementRange = getRange(element)
			;
			const isFirst = i === 0
				, isLast = i === argsLength - 1
				, isLastAndNull = isLast && element == null
				, theOnlyOne = isLast && isFirst
				, isSpreadEl = core.is.isSpreadElement(element)
			;

			prevConcatOpen = concatOpen;

			if( concatOpen ) {
				if( element || isLastAndNull ) {
					if( lastNullElementCount ) {
						let fistNullIndex = i - lastNullElementCount;

						if( isLastAndNull )lastNullElementCount++;// [1, ...a, , , , ] -> [1].concat(ITER(a), [ , , , ]) case

						if( !isSpreadEl ) {/* see: LINK createArrayHoles#1 */
							this.alter.replace(
								getRange(elements[getLastNotNullElementIndex(elements, fistNullIndex)])[1]
								, isLastAndNull ? node.range[1] - 1 : elementRange[0]
								, (isFirst ? "" : ", ") + createArrayHoles(lastNullElementCount) + (isLastAndNull ? "" : ", ")
							);
						}

						lastNullElementCount = 0;
					}
				}
				else {
					lastNullElementCount++;
				}
			}

			if( isSpreadEl ) {
				const argument = element.argument
					, argumentRange = getRange(argument)
				;

				if ( core.is.isArrayExpression(argument) ) {
					removeFirstSquareBracket();
					firstElemIsSpreadFlag = theOnlyOne && core.is.isSpreadElement(argument.elements[0]) ? argument.range[0] : -1;
					// link `spread_in_spread` 1
					// cases: [...[...obj]] and [...[N, , ...obj]], [...([...obj])] and [...([N, , ...obj])]
					this.alter.remove(elementRange[0], argument.range[0] + (firstElemIsSpreadFlag === -1 ? 1 : 0), {a: 1});// remove "...[" or "...(["

					if ( argument.groupRange ) {
						// cases: [...([...obj])] and [...([N, , ...obj])]
						this.alter.remove(argument.range[1], argument.groupRange[1], {a: 2});// remove ")" from "])"
					}
					let index;
					if ( !isLast
						&& (index = getLastNotNullElementIndex(argument.elements)) != argument.elements.length - 1
					) {
						// cases: [...[ , ], 1] -> [, 1], [...[2, ], 1] -> [2, 1]
						let start = index == -1 ? argument.range[0] + 1 : argument.elements[index].range[0]
							, end = argument.range[1] - 1
						;
						this.alter.remove(start, end, {a: 3});// remove "," from "[ , ]"
					}

					if( !innerSpread || ArrayExpressionElementInInnerSpread ) {
						// link `spread_in_spread` 2
						// cases: [...[N, , ...obj]]
						this.alter.remove(argument.range[1] - 1, argumentRange[1], {a: 4});// remove "]"
					}
					else {
						// FIXME: do something better
						ArrayExpressionElementInInnerSpread = argument;
					}

					elements.splice.apply(elements, [i, 1].concat(argument.elements));
					i--;
					argsLength = elements.length;

					argument.$despread = true;

					continue;
				}
				else {
					endNotSpreadElementsGroup(i - 1);

					if( !callIteratorFunctionName ) callIteratorFunctionName = core.createVars(node, 'callIterator');

					const concatStr = concatOpen ? ", " :
						theOnlyOne
							? ""
							: ( (isFirst ? " " : "") + "].concat(" )
					;
					if( !concatOpen )concatOpen = !!concatStr;

					const callIteratorCloseStr = this.__detectNeedToCloneSpreadVariable(argument, elements, i)
						? ", true)"
						: ")"
					;

					if( isFirst ) {
						// TODO:: one this.alter.replace
						let from = elementRange[0];
						if ( !innerSpread && !concatStr ) {
							do {
								--from;
							}
							while ( this.alter.getRange(from, from + 1) !== "[" );
						}

						this.alter.remove(//remove "[..." or "..."
							from
							, argumentRange[0], {a: 5}
						);
						this.alter.insertBefore(
							argumentRange[0]
							, concatStr + callIteratorFunctionName + "("
						);
						if( !theOnlyOne && (concatOpen || callIteratorCloseStr) ) {
							this.alter.insert(argumentRange[1], callIteratorCloseStr);
						}
					}
					else {
						const lastNotNullElementIndex = getLastNotNullElementIndex(elements, i);

						if( lastNotNullElementIndex === -1 ) {// [ , , ...spread] case
							let arrayHolesString = createArrayHoles(i);
							this.alter.replace(
								node.range[0]
								, argumentRange[0]
								, arrayHolesString + ".concat([" + concatStr + callIteratorFunctionName + "("
							);
							endString = ")";
						}
						else {
							let arrayHolesString = createArrayHoles(i - lastNotNullElementIndex - 1);/* LINK createArrayHoles#1 */
							if( arrayHolesString ) {
								arrayHolesString += ", ";
							}

							let lastElement = elements[lastNotNullElementIndex];
							let from = getRange(lastElement)[1]
								, to = argumentRange[0]
							;

							const lineBreaks = this.alter.getRange(from, to).match(/[\r\n]/g) || [];
							const lineBreaksCount = lineBreaks.length;

							this.alter.replace(
								from
								, to
								, this.alter.get(from, to) + '|' + concatStr + arrayHolesString + callIteratorFunctionName + "("
								, {transform: function(str) {
									// HACK START: fix strange bug: removing last ')' if we come from replaceNewExpression
									let char0, add = '', index = 0;
									do {
										char0 = str.charAt(index);
										index++;
										if ( char0 === ')' ) {
											add += ')';
										}
									}
									while ( char0 != '|' );
									str = add + str.substr(index);
									// HACK END

									const newLineBreaks = str.match(/[\r\n]/g) || [];
									const newLineBreaksCount = newLineBreaks.length;

									if ( newLineBreaksCount < lineBreaksCount ) {
										str = lineBreaks.slice(newLineBreaksCount).join("") + str;
									}
									return str;
								}}
							);
						}
						this.alter.insert(argumentRange[1], callIteratorCloseStr);
					}

					callIteratorOpen = true;
				}
			}
			else if( concatOpen ) {
				if( element ) {
					startNotSpreadElementsGroup(i);
				}
				else {
					endNotSpreadElementsGroup(i);
				}
			}

			removeFirstSquareBracket();
		}
		endNotSpreadElementsGroup();

		if( endString ) {
			this.alter.insertBefore(node.range[1], endString, {extend: true});
		}

		if ( elements.length == 1 && !concatOpen && callIteratorOpen ) {
			if ( core.is.isArrayExpression(node) ) {// for "NewExpression" and "CallExpression", node is not a SpreadElement )
				this.alter.remove(node.range[0], node.range[0] + 1);
			}
		}

		if( (concatOpen || callIteratorOpen) ) {
			if( innerSpread ) {
				this.alter.insertBefore(node.range[1], ")", {extend: true});
				if( ArrayExpressionElementInInnerSpread ) {
					this.alter.remove(getRange(ArrayExpressionElementInInnerSpread)[1] - 1, getRange(ArrayExpressionElementInInnerSpread)[1], {a: 6});// remove "]"
					ArrayExpressionElementInInnerSpread = null;
				}
			}
			else {
				this.alter.replace(node.range[1] - 1, node.range[1], ")", {extend: true});
			}

		}
	}

	, __detectNeedToCloneSpreadVariable: function(variable, elements, startsFrom) {
		startsFrom = +startsFrom + 1;

		if ( startsFrom >= elements.length )return false;
		if ( core.is.isSequenceExpression(variable) )return true;// TODO: need more work to deep analise SequenceExpression
		if ( variable.type !== "Identifier" )return false;

		elements = elements.slice(startsFrom);

		let variableName = variable.name;

		function checkElement(variableName, element, parentType) {
			let elementType = element.type;

			if( elementType === "Identifier" ) {
				return element.name === variableName
					&& parentType !== "Property"		// [...a, 0, {prop: a}]
					&& parentType !== "ArrayExpression"	// [...a, 0, [a]]
					&& parentType !== "SpreadElement"	// [...a, 0, ...a]
				;
			}
			else if ( core.is.isSpreadElement(element) || core.is.isArgumentExpression(element) ) {
				return checkElement.call(this, variableName, element.argument, element.type);
			}
			else if( elementType === "BinaryExpression" ) {
				return checkElement.call(this, variableName, element.left)
					|| checkElement.call(this, variableName, element.right)
				;
			}
			else if( elementType === "MemberExpression" ) {
				return checkElement.call(this, variableName, element.object);
			}
			else if( elementType === "Property" ) {
				return checkElement.call(this, variableName, element.value, elementType);
			}
			else if( elementType === "ArrayExpression" ) {
				return checkManyElements.call(this, variableName, element.elements, elementType);
			}
			else if( elementType === "SequenceExpression" ) {
				return checkManyElements.call(this, variableName, element.expressions, elementType);
			}
			else if( elementType === "ObjectExpression" ) {
				return /*parentType !== "ArrayExpression" || */checkManyElements.call(this, variableName, element.properties, elementType);
			}
			else if( elementType === "CallExpression" || elementType === "YieldExpression" ) {
				return true;
			}
			else if( elementType === "Literal" ) {
				return false;
			}
			else {
				// all other nodeS can affect to the original variable. Example: var arr = [1], a = [...arr, (()=>(arr.push(2),arr))()]
				return parentType !== "Property" && parentType !== "ArrayExpression";
			}
		}

		function checkManyElements(variableName, elements, parentType) {
			return elements.some(function(element) {
				return element && checkElement.call(this, variableName, element, parentType);
			}, this);
		}

		return checkManyElements(variableName, elements);
	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
