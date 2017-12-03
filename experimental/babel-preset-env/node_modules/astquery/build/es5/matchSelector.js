"use strict";

var parseAttrSelector = (require('./parseSelector.js')).parseAttrSelector;

/**
 * Get the value of a property which may be multiple levels down in the object.
 */
function getPathValue(node, path) {
	var names = path.split("."), name;

	while ( name = names.shift() ) {
		if (node == null) {
			return names.length ? void 0 : null;
		}
		node = node[name];
	}

	return node;
}

function matchAttributes(node, attributes, options) {function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;if(typeof v==='object'&&typeof v['@@iterator']==='function')return v['@@iterator']();}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;
	if( typeof attributes === 'string' ) {
		attributes = parseAttrSelector(attributes);
	}

	var match = true;

	$D$0 = GET_ITER$0(attributes);$D$1 = $D$0 === 0;$D$2 = ($D$1 ? attributes.length : void 0);for( var attrRule ; $D$1 ? ($D$0 < $D$2) : !($D$2 = $D$0["next"]())["done"]; ){attrRule = ($D$1 ? attributes[$D$0++] : $D$2["value"]);
		// Save attribute check operator in a temporary variable
		var operator = attrRule[2];
		//attr[1] is an attribute name
		var attrName = attrRule[1], attrValue = void 0;
		if ( attrName.indexOf('.') !== -1 && (options || {}).attrNameAsPath === true ) {
			attrValue = getPathValue(node, attrName);
		}
		else {
			attrValue = node[attrName];
		}

		// Quick check if we have no attribute value and attribute check operator is not '!=' (8)
		if(attrValue === void 0 && !(attrRule[1] in node)) {
			match = operator === 8;
			continue;
		}
		attrValue = attrValue + "";

		// CSS4 Attribute case-sensitivity
		if ( attrRule[4] ) {
			attrValue = attrValue.toUpperCase();
		}

		// Expected attribute value
		var attrExpectedValue = attrRule[3];

		switch(operator) {// operator - attribute check operator defined in map SELECTOR_ATTR_OPERATIONS_MAP

			case 1://css3Attr[2] == '' // W3C "an E element with a "attrValue" attribute"
				match = !!attrValue || attrValue === "";
				break;

			case 2://'=' // W3C "an E element whose "attrValue" attribute attrExpectedValue is exactly equal to "attrExpectedValue"
				match = attrValue === attrExpectedValue;
				break;

			case 3://'&=' // from w3.prg "an E element whose "attrValue" attribute attrExpectedValue is a list of space-separated attrExpectedValue's, one of which is exactly equal to "attrExpectedValue"
			case 8://'!=' // attrValue doesn't contain given attrExpectedValue
				match = (new RegExp((("(^| +)" + attrExpectedValue) + "($| +)")).test(attrValue));
				if(operator === 8)match = !match;
				break;

			case 4://'^=' // from w3.prg "an E element whose "attrValue" attribute attrExpectedValue begins exactly with the string "attrExpectedValue"
			case 5://'$=' // W3C "an E element whose "attrValue" attribute attrExpectedValue ends exactly with the string "attrExpectedValue"
			case 6://'*=' // W3C "an E element whose "attrValue" attribute attrExpectedValue contains the substring "attrExpectedValue"
				var containsIndex = attrValue.indexOf(attrExpectedValue);
				match = operator === 6 ? !!~containsIndex : operator === 5 ? (containsIndex == attrValue.length - attrExpectedValue.length) : !containsIndex;
				break;

			case 7://'|=' // W3C "an E element whose "attrValue" attribute has a hyphen-separated list of attrExpectedValue's beginning (from the left) with "attrExpectedValue"
				match = ((attrValue === attrExpectedValue || !!~attrValue.indexOf(attrExpectedValue + '-')));
				break;

			case 9://'~='
				match = !!~(((" " + (attrValue.replace(/\s/g, " "))) + " ")).indexOf(((" " + attrExpectedValue) + " "));
				break;
		}

		if( !match )break;
	};$D$0 = $D$1 = $D$2 = void 0;

	return match;
}

module.exports = {
	matchAttributes: matchAttributes
};
