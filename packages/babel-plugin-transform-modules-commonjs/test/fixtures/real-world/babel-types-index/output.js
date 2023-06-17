"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = ["react", "assertNode", "createTypeAnnotationBasedOnTypeof", "createUnionTypeAnnotation", "createFlowUnionType", "createTSUnionType", "cloneNode", "clone", "cloneDeep", "cloneDeepWithoutLoc", "cloneWithoutLoc", "addComment", "addComments", "inheritInnerComments", "inheritLeadingComments", "inheritsComments", "inheritTrailingComments", "removeComments", "ensureBlock", "toBindingIdentifierName", "toBlock", "toComputedKey", "toExpression", "toIdentifier", "toKeyAlias", "toSequenceExpression", "toStatement", "valueToNode", "appendToMemberExpression", "inherits", "prependToMemberExpression", "removeProperties", "removePropertiesDeep", "removeTypeDuplicates", "getBindingIdentifiers", "getOuterBindingIdentifiers", "traverse", "traverseFast", "shallowEqual", "is", "isBinding", "isBlockScoped", "isImmutable", "isLet", "isNode", "isNodesEquivalent", "isPlaceholderType", "isReferenced", "isScope", "isSpecifierDefault", "isType", "isValidES3Identifier", "isValidIdentifier", "isVar", "matchesPattern", "validate", "buildMatchMemberExpression", "__internal__deprecationWarning"];
_defineGetter(exports, "__internal__deprecationWarning", function () {
  return _deprecationWarning.default;
});
_defineGetter(exports, "addComment", function () {
  return _addComment.default;
});
_defineGetter(exports, "addComments", function () {
  return _addComments.default;
});
_defineGetter(exports, "appendToMemberExpression", function () {
  return _appendToMemberExpression.default;
});
_defineGetter(exports, "assertNode", function () {
  return _assertNode.default;
});
_defineGetter(exports, "buildMatchMemberExpression", function () {
  return _buildMatchMemberExpression.default;
});
_defineGetter(exports, "clone", function () {
  return _clone.default;
});
_defineGetter(exports, "cloneDeep", function () {
  return _cloneDeep.default;
});
_defineGetter(exports, "cloneDeepWithoutLoc", function () {
  return _cloneDeepWithoutLoc.default;
});
_defineGetter(exports, "cloneNode", function () {
  return _cloneNode.default;
});
_defineGetter(exports, "cloneWithoutLoc", function () {
  return _cloneWithoutLoc.default;
});
_defineGetter(exports, "createFlowUnionType", function () {
  return _createFlowUnionType.default;
});
_defineGetter(exports, "createTSUnionType", function () {
  return _createTSUnionType.default;
});
_defineGetter(exports, "createTypeAnnotationBasedOnTypeof", function () {
  return _createTypeAnnotationBasedOnTypeof.default;
});
_defineGetter(exports, "createUnionTypeAnnotation", function () {
  return _createFlowUnionType.default;
});
_defineGetter(exports, "ensureBlock", function () {
  return _ensureBlock.default;
});
_defineGetter(exports, "getBindingIdentifiers", function () {
  return _getBindingIdentifiers.default;
});
_defineGetter(exports, "getOuterBindingIdentifiers", function () {
  return _getOuterBindingIdentifiers.default;
});
_defineGetter(exports, "inheritInnerComments", function () {
  return _inheritInnerComments.default;
});
_defineGetter(exports, "inheritLeadingComments", function () {
  return _inheritLeadingComments.default;
});
_defineGetter(exports, "inheritTrailingComments", function () {
  return _inheritTrailingComments.default;
});
_defineGetter(exports, "inherits", function () {
  return _inherits.default;
});
_defineGetter(exports, "inheritsComments", function () {
  return _inheritsComments.default;
});
_defineGetter(exports, "is", function () {
  return _is.default;
});
_defineGetter(exports, "isBinding", function () {
  return _isBinding.default;
});
_defineGetter(exports, "isBlockScoped", function () {
  return _isBlockScoped.default;
});
_defineGetter(exports, "isImmutable", function () {
  return _isImmutable.default;
});
_defineGetter(exports, "isLet", function () {
  return _isLet.default;
});
_defineGetter(exports, "isNode", function () {
  return _isNode.default;
});
_defineGetter(exports, "isNodesEquivalent", function () {
  return _isNodesEquivalent.default;
});
_defineGetter(exports, "isPlaceholderType", function () {
  return _isPlaceholderType.default;
});
_defineGetter(exports, "isReferenced", function () {
  return _isReferenced.default;
});
_defineGetter(exports, "isScope", function () {
  return _isScope.default;
});
_defineGetter(exports, "isSpecifierDefault", function () {
  return _isSpecifierDefault.default;
});
_defineGetter(exports, "isType", function () {
  return _isType.default;
});
_defineGetter(exports, "isValidES3Identifier", function () {
  return _isValidES3Identifier.default;
});
_defineGetter(exports, "isValidIdentifier", function () {
  return _isValidIdentifier.default;
});
_defineGetter(exports, "isVar", function () {
  return _isVar.default;
});
_defineGetter(exports, "matchesPattern", function () {
  return _matchesPattern.default;
});
_defineGetter(exports, "prependToMemberExpression", function () {
  return _prependToMemberExpression.default;
});
exports.react = void 0;
_defineGetter(exports, "removeComments", function () {
  return _removeComments.default;
});
_defineGetter(exports, "removeProperties", function () {
  return _removeProperties.default;
});
_defineGetter(exports, "removePropertiesDeep", function () {
  return _removePropertiesDeep.default;
});
_defineGetter(exports, "removeTypeDuplicates", function () {
  return _removeTypeDuplicates.default;
});
_defineGetter(exports, "shallowEqual", function () {
  return _shallowEqual.default;
});
_defineGetter(exports, "toBindingIdentifierName", function () {
  return _toBindingIdentifierName.default;
});
_defineGetter(exports, "toBlock", function () {
  return _toBlock.default;
});
_defineGetter(exports, "toComputedKey", function () {
  return _toComputedKey.default;
});
_defineGetter(exports, "toExpression", function () {
  return _toExpression.default;
});
_defineGetter(exports, "toIdentifier", function () {
  return _toIdentifier.default;
});
_defineGetter(exports, "toKeyAlias", function () {
  return _toKeyAlias.default;
});
_defineGetter(exports, "toSequenceExpression", function () {
  return _toSequenceExpression.default;
});
_defineGetter(exports, "toStatement", function () {
  return _toStatement.default;
});
_defineGetter(exports, "traverse", function () {
  return _traverse.default;
});
_defineGetter(exports, "traverseFast", function () {
  return _traverseFast.default;
});
_defineGetter(exports, "validate", function () {
  return _validate.default;
});
_defineGetter(exports, "valueToNode", function () {
  return _valueToNode.default;
});
var _isReactComponent = _interopRequireDefault(require("./validators/react/isReactComponent"));
var _isCompatTag = _interopRequireDefault(require("./validators/react/isCompatTag"));
var _buildChildren = _interopRequireDefault(require("./builders/react/buildChildren"));
var _assertNode = _interopRequireDefault(require("./asserts/assertNode"));
var _generated = require("./asserts/generated");
_reexports(exports, _generated, _exportNames);
var _createTypeAnnotationBasedOnTypeof = _interopRequireDefault(require("./builders/flow/createTypeAnnotationBasedOnTypeof"));
var _createFlowUnionType = _interopRequireDefault(require("./builders/flow/createFlowUnionType"));
var _createTSUnionType = _interopRequireDefault(require("./builders/typescript/createTSUnionType"));
var _generated2 = require("./builders/generated");
_reexports(exports, _generated2, _exportNames);
var _uppercase = require("./builders/generated/uppercase");
_reexports(exports, _uppercase, _exportNames);
var _cloneNode = _interopRequireDefault(require("./clone/cloneNode"));
var _clone = _interopRequireDefault(require("./clone/clone"));
var _cloneDeep = _interopRequireDefault(require("./clone/cloneDeep"));
var _cloneDeepWithoutLoc = _interopRequireDefault(require("./clone/cloneDeepWithoutLoc"));
var _cloneWithoutLoc = _interopRequireDefault(require("./clone/cloneWithoutLoc"));
var _addComment = _interopRequireDefault(require("./comments/addComment"));
var _addComments = _interopRequireDefault(require("./comments/addComments"));
var _inheritInnerComments = _interopRequireDefault(require("./comments/inheritInnerComments"));
var _inheritLeadingComments = _interopRequireDefault(require("./comments/inheritLeadingComments"));
var _inheritsComments = _interopRequireDefault(require("./comments/inheritsComments"));
var _inheritTrailingComments = _interopRequireDefault(require("./comments/inheritTrailingComments"));
var _removeComments = _interopRequireDefault(require("./comments/removeComments"));
var _generated3 = require("./constants/generated");
_reexports(exports, _generated3, _exportNames);
var _constants = require("./constants");
_reexports(exports, _constants, _exportNames);
var _ensureBlock = _interopRequireDefault(require("./converters/ensureBlock"));
var _toBindingIdentifierName = _interopRequireDefault(require("./converters/toBindingIdentifierName"));
var _toBlock = _interopRequireDefault(require("./converters/toBlock"));
var _toComputedKey = _interopRequireDefault(require("./converters/toComputedKey"));
var _toExpression = _interopRequireDefault(require("./converters/toExpression"));
var _toIdentifier = _interopRequireDefault(require("./converters/toIdentifier"));
var _toKeyAlias = _interopRequireDefault(require("./converters/toKeyAlias"));
var _toSequenceExpression = _interopRequireDefault(require("./converters/toSequenceExpression"));
var _toStatement = _interopRequireDefault(require("./converters/toStatement"));
var _valueToNode = _interopRequireDefault(require("./converters/valueToNode"));
var _definitions = require("./definitions");
_reexports(exports, _definitions, _exportNames);
var _appendToMemberExpression = _interopRequireDefault(require("./modifications/appendToMemberExpression"));
var _inherits = _interopRequireDefault(require("./modifications/inherits"));
var _prependToMemberExpression = _interopRequireDefault(require("./modifications/prependToMemberExpression"));
var _removeProperties = _interopRequireDefault(require("./modifications/removeProperties"));
var _removePropertiesDeep = _interopRequireDefault(require("./modifications/removePropertiesDeep"));
var _removeTypeDuplicates = _interopRequireDefault(require("./modifications/flow/removeTypeDuplicates"));
var _getBindingIdentifiers = _interopRequireDefault(require("./retrievers/getBindingIdentifiers"));
var _getOuterBindingIdentifiers = _interopRequireDefault(require("./retrievers/getOuterBindingIdentifiers"));
var _traverse = _interopRequireWildcard(require("./traverse/traverse"));
_reexports(exports, _traverse, _exportNames);
var _traverseFast = _interopRequireDefault(require("./traverse/traverseFast"));
var _shallowEqual = _interopRequireDefault(require("./utils/shallowEqual"));
var _is = _interopRequireDefault(require("./validators/is"));
var _isBinding = _interopRequireDefault(require("./validators/isBinding"));
var _isBlockScoped = _interopRequireDefault(require("./validators/isBlockScoped"));
var _isImmutable = _interopRequireDefault(require("./validators/isImmutable"));
var _isLet = _interopRequireDefault(require("./validators/isLet"));
var _isNode = _interopRequireDefault(require("./validators/isNode"));
var _isNodesEquivalent = _interopRequireDefault(require("./validators/isNodesEquivalent"));
var _isPlaceholderType = _interopRequireDefault(require("./validators/isPlaceholderType"));
var _isReferenced = _interopRequireDefault(require("./validators/isReferenced"));
var _isScope = _interopRequireDefault(require("./validators/isScope"));
var _isSpecifierDefault = _interopRequireDefault(require("./validators/isSpecifierDefault"));
var _isType = _interopRequireDefault(require("./validators/isType"));
var _isValidES3Identifier = _interopRequireDefault(require("./validators/isValidES3Identifier"));
var _isValidIdentifier = _interopRequireDefault(require("./validators/isValidIdentifier"));
var _isVar = _interopRequireDefault(require("./validators/isVar"));
var _matchesPattern = _interopRequireDefault(require("./validators/matchesPattern"));
var _validate = _interopRequireDefault(require("./validators/validate"));
var _buildMatchMemberExpression = _interopRequireDefault(require("./validators/buildMatchMemberExpression"));
var _generated4 = require("./validators/generated");
_reexports(exports, _generated4, _exportNames);
var _deprecationWarning = _interopRequireDefault(require("./utils/deprecationWarning"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _reexports(exports, namespace, exportNames) {
  Object.keys(namespace).forEach(function (k) {
    if (k === "default" || k === "__esModule") return;
    if (exportNames.indexOf(k) >= 0) return;
    if (k in exports && exports[k] === namespace[k]) return;
    _defineGetter(exports, k, function () {
      return namespace[k];
    });
  });
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
// asserts

// builders

/** @deprecated use createFlowUnionType instead */

// clone

// comments

// constants

// converters

// definitions

// modifications

// retrievers

// traverse

// utils

// validators

// react
const react = {
  isReactComponent: _isReactComponent.default,
  isCompatTag: _isCompatTag.default,
  buildChildren: _buildChildren.default
};

// this is used by @babel/traverse to warn about deprecated visitors
exports.react = react;
