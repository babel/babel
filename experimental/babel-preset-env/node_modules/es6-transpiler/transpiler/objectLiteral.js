"use strict";

const assert = require("assert");
const error = require("./../lib/error");
const core = require("./core");

function is__proto__Property(node) {
	if ( core.is.isProperty(node) && node.kind !== 'get' && node.kind !== 'set' ) {
		let nodeKey = node.key;

		if ( nodeKey ) {
			return nodeKey.name === '__proto__' || nodeKey.value === '__proto__';
		}
	}

	return false;
}

const $GOPDS_P = "function(o){" +
	"var d=Object.create(null);" +
	"for(var p in o)if(o.hasOwnProperty(p)){" +
		"d[p]={\"value\":o[p],\"enumerable\":true,\"configurable\":true,\"writable\":true};" +
	"}" +
	"return d;" +
"}";
const $GOPDS_A = "function(o){" +
	"var d=Object.create(null);" +
	"for(var p in o)if(o.hasOwnProperty(p)){" +
		"d[p]=o[p];" +
	"}" +
	"return d;" +
"}";

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

		core.registerVar('getPropertiesDef', {name: 'GOPDS_P', template: $GOPDS_P});
		core.registerVar('getAccessorsDef', {name: 'GOPDS_A', template: $GOPDS_A});
	}

	, '::Property[method=true]': function(node) {
		const methodKey = node.key;

		this.alter.insert(methodKey.range[1], ": function");
	}

	, '::Property[shorthand=true]': function(node) {//':: :not(ObjectPattern,ArrayPattern) > Property[shorthand=true]'
		var parent = node.$parent;
		if ( !core.is.isArrayPattern(parent) && !core.is.isObjectPattern(parent) ) {//filter destructuring
			const propertyKey = node.key;
			const propertyValue = node.value;

			let renamingOptions = propertyValue.$renamingOptions;
			if( renamingOptions ) {// turn off changes were made by 'letConst' transpiler
				renamingOptions.inactive = true;
			}

			this.alter.insert(propertyKey.range[1], ": " + propertyValue.name);
		}
	}

	, '::Identifier[name=__proto__], Literal[value=__proto__]': function(node) {// ':: Property:has(Identifier[name=__proto__], Literal[value=__proto__])'
		var parent = node.$parent;
		if( parent && parent.type === 'Property' ) {
			parent = parent.$parent;

			if ( !parent.$uncomputed ) {
				parent.$uncomputed = true;

				assert(parent.type === 'ObjectExpression', parent.type + ' shoud be "ObjectExpression" instead');

				this.replaceComputedProperties(parent);
			}
		}
	}

	, '::Property[computed=true]': function(node) {//':: !:not(ObjectPattern,ArrayPattern) > Property[computed=true]'
		var parent = node.$parent;
		if ( !core.is.isArrayPattern(parent) && !core.is.isObjectPattern(parent)//filter destructuring
			&& !parent.$uncomputed
		) {
			parent.$uncomputed = true;

			assert(parent.type === 'ObjectExpression', parent.type + ' shoud be "ObjectExpression" instead');

			this.replaceComputedProperties(parent);
		}
	}

	, replaceComputedProperties: function(node) {
		let properties = node.properties;
		let beforeString = '';

		let endFragment = '}';
		let computedReplacementStarted = false;

		let objectOpened = '';
		let has__proto__inside = false;

		let _this = this;
		function closeOpenTag(prevProperty) {
			if ( prevProperty ) {
				_this.alter.insertAfter(prevProperty.range[1], endFragment, {extend: true});
			}
			else {
				objectOpened = '},';
			}
		}

		let property = null, prevProperty;
		for ( let i = 0, len = properties.length ; i < len ; i++ ) {
			prevProperty = property;
			property = properties[i];

			let isComputed = property.computed;

			if ( !isComputed && is__proto__Property(property) ) {
				has__proto__inside = true;

				let propKey = property.key;
				if ( !core.is.isLiteral(propKey) ) {
					delete propKey.name;
					propKey.value = '__proto__';
					propKey.raw = '\'__proto__\'';
					propKey.type = 'Literal';
					this.alter.insert(propKey.range[0], '\'', {extend: true});
					this.alter.insertBefore(propKey.range[1], '\'', {extend: true});
				}
			}

			if ( property.kind === 'get' || property.kind === 'set' ) {
				if ( property.$objectLiteral_pass ) {
					continue;
				}

				let expectedNextKind = property.kind === 'set' ? 'get' : 'set';
				let nextAccessor = !isComputed && properties[i + 1];

				if ( nextAccessor ) {
					if ( nextAccessor.computed || nextAccessor.kind !== expectedNextKind ) {
						nextAccessor = void 0;
					}
				}
				if ( nextAccessor ) {
					nextAccessor.$objectLiteral_pass = true;
				}

				closeOpenTag(prevProperty);

				if ( isComputed ) {
					computedReplacementStarted = true;

					beforeString = core.createVars(node, "defineProperty") + '(' + beforeString;
				}
				else {
					beforeString = core.createVars(node, "defineProperties") + '(' + beforeString;

					this.alter.insertBefore(property.range[0], core.createVars(node, "getAccessorsDef") + '({');
				}

				let propKey = property.key;
				this.alter.remove(property.range[0], propKey.range[0]);//remove 'set ' or 'get ', or 'set [' or 'get ['
				if ( isComputed ) {
					this.alter.remove(propKey.bracketsRange[1] - 1, propKey.bracketsRange[1]);//remove ']'
				}
				this.alter.insertBefore(propKey.range[1], (isComputed ? ',' : ':') + '{"' + property.kind + '":function');

				if ( nextAccessor ) {
					let nextAccessorKey = nextAccessor.key;
					this.alter.remove(nextAccessor.range[0], nextAccessorKey.range[1]);//remove 'set <name>' or 'get <name>', or 'set [<name>' or 'get [<name>'
					if ( nextAccessor.computed === true ) {
						this.alter.remove(nextAccessorKey.bracketsRange[1] - 1, nextAccessorKey.bracketsRange[1]);//remove ']'
					}
					this.alter.insertBefore(nextAccessorKey.range[1], '"' + nextAccessor.kind + '":function');
					this.alter.insert(nextAccessor.range[1], ',"configurable":true,"enumerable":true}');
				}
				else {
					let propValue = property.value;
					this.alter.insert(propValue.range[1], ',"configurable":true,"enumerable":true}');
				}

				endFragment = isComputed ? ')' : '}))';
			}
			else if ( isComputed || (computedReplacementStarted && core.is.isLiteral(property.key)) ) {
				computedReplacementStarted = true;

				beforeString = core.createVars(node, "defineProperty") + '(' + beforeString;

				let propKey = property.key;
				if ( isComputed ) {
					this.alter.remove(propKey.bracketsRange[0], propKey.bracketsRange[0] + 1);//remove '['
					this.alter.remove(propKey.bracketsRange[1] - 1, propKey.bracketsRange[1]);//remove ']'
				}
				else {
					property.$literal = true;
				}
				this.alter.insertBefore(propKey.range[1], ',{"value"');

				let propValue = property.value;
				this.alter.insert(propValue.range[1], ',"configurable":true,"enumerable":true,"writable":true}');

				closeOpenTag(prevProperty);

				endFragment = ')';
			}
			else if ( computedReplacementStarted ) {
				beforeString = core.createVars(node, "defineProperties") + '(' + beforeString;

				closeOpenTag(prevProperty);

				this.alter.insertBefore(property.range[0], core.createVars(node, "getPropertiesDef") + '({', {extend: true});

				endFragment = '}))';

				computedReplacementStarted = false;
			}
		}

		if ( has__proto__inside ) {
			let forceFix = !!beforeString;

			endFragment = (forceFix ? (endFragment + ', true') : '') + ')';

			beforeString = core.createVars(node, "fix__proto__") + '(' + beforeString;
		}

		if ( beforeString ) {
			if ( endFragment === '}))' ) {
				endFragment = '))';
			}

			if ( property.computed === true || property.$literal === true ) {// lastProperty
				this.alter.replace(node.range[1] - 1, node.range[1], endFragment, {extend: true});//replace '}'
			}
			else {
				this.alter.insertBefore(node.range[1], endFragment, {extend: true});
			}

			this.alter.insertBefore(node.range[0], beforeString, {extend: true});
			if ( objectOpened ) {
				this.alter.insert(node.range[0] + 1, objectOpened);
			}
		}

	}
};

for(let i in plugin) if( plugin.hasOwnProperty(i) && typeof plugin[i] === "function" ) {
	plugin[i] = plugin[i].bind(plugin);
}
