import isReactComponent from "./validators/react/isReactComponent.ts";
import isCompatTag from "./validators/react/isCompatTag.ts";
import buildChildren from "./builders/react/buildChildren.ts";

// asserts
export { default as assertNode } from "./asserts/assertNode.ts";
export * from "./asserts/generated/index.ts";

// builders
export { default as createTypeAnnotationBasedOnTypeof } from "./builders/flow/createTypeAnnotationBasedOnTypeof.ts";
/** @deprecated use createFlowUnionType instead */
export { default as createUnionTypeAnnotation } from "./builders/flow/createFlowUnionType.ts";
export { default as createFlowUnionType } from "./builders/flow/createFlowUnionType.ts";
export { default as createTSUnionType } from "./builders/typescript/createTSUnionType.ts";
export * from "./builders/productions.ts";
export * from "./builders/generated/index.ts"; // includes AST types

// clone
export { default as cloneNode } from "./clone/cloneNode.ts";
export { default as clone } from "./clone/clone.ts";
export { default as cloneDeep } from "./clone/cloneDeep.ts";
export { default as cloneDeepWithoutLoc } from "./clone/cloneDeepWithoutLoc.ts";
export { default as cloneWithoutLoc } from "./clone/cloneWithoutLoc.ts";

// comments
export { default as addComment } from "./comments/addComment.ts";
export { default as addComments } from "./comments/addComments.ts";
export { default as inheritInnerComments } from "./comments/inheritInnerComments.ts";
export { default as inheritLeadingComments } from "./comments/inheritLeadingComments.ts";
export { default as inheritsComments } from "./comments/inheritsComments.ts";
export { default as inheritTrailingComments } from "./comments/inheritTrailingComments.ts";
export { default as removeComments } from "./comments/removeComments.ts";

// constants
export * from "./constants/generated/index.ts";
export * from "./constants/index.ts";

// converters
export { default as ensureBlock } from "./converters/ensureBlock.ts";
export { default as toBindingIdentifierName } from "./converters/toBindingIdentifierName.ts";
export { default as toBlock } from "./converters/toBlock.ts";
export { default as toComputedKey } from "./converters/toComputedKey.ts";
export { default as toExpression } from "./converters/toExpression.ts";
export { default as toIdentifier } from "./converters/toIdentifier.ts";
export { default as toKeyAlias } from "./converters/toKeyAlias.ts";
export { default as toStatement } from "./converters/toStatement.ts";
export { default as valueToNode } from "./converters/valueToNode.ts";

// definitions
export * from "./definitions/index.ts";

// modifications
export { default as appendToMemberExpression } from "./modifications/appendToMemberExpression.ts";
export { default as inherits } from "./modifications/inherits.ts";
export { default as prependToMemberExpression } from "./modifications/prependToMemberExpression.ts";
export {
  default as removeProperties,
  type Options as RemovePropertiesOptions,
} from "./modifications/removeProperties.ts";
export { default as removePropertiesDeep } from "./modifications/removePropertiesDeep.ts";
export { default as removeTypeDuplicates } from "./modifications/flow/removeTypeDuplicates.ts";

// retrievers
export { default as getAssignmentIdentifiers } from "./retrievers/getAssignmentIdentifiers.ts";
export { default as getBindingIdentifiers } from "./retrievers/getBindingIdentifiers.ts";
export { default as getOuterBindingIdentifiers } from "./retrievers/getOuterBindingIdentifiers.ts";
export { default as getFunctionName } from "./retrievers/getFunctionName.ts";

// traverse
export { default as traverse } from "./traverse/traverse.ts";
export * from "./traverse/traverse.ts";
export { default as traverseFast } from "./traverse/traverseFast.ts";

// utils
export { default as shallowEqual } from "./utils/shallowEqual.ts";

// validators
export { default as is } from "./validators/is.ts";
export { default as isBinding } from "./validators/isBinding.ts";
export { default as isBlockScoped } from "./validators/isBlockScoped.ts";
export { default as isImmutable } from "./validators/isImmutable.ts";
export { default as isLet } from "./validators/isLet.ts";
export { default as isNode } from "./validators/isNode.ts";
export { default as isNodesEquivalent } from "./validators/isNodesEquivalent.ts";
export { default as isPlaceholderType } from "./validators/isPlaceholderType.ts";
export { default as isReferenced } from "./validators/isReferenced.ts";
export { default as isScope } from "./validators/isScope.ts";
export { default as isSpecifierDefault } from "./validators/isSpecifierDefault.ts";
export { default as isType } from "./validators/isType.ts";
export { default as isValidES3Identifier } from "./validators/isValidES3Identifier.ts";
export { default as isValidIdentifier } from "./validators/isValidIdentifier.ts";
export { default as isVar } from "./validators/isVar.ts";
export { default as matchesPattern } from "./validators/matchesPattern.ts";
export { default as validate } from "./validators/validate.ts";
export { default as buildMatchMemberExpression } from "./validators/buildMatchMemberExpression.ts";
export * from "./validators/generated/index.ts";

// react
export const react = {
  isReactComponent,
  isCompatTag,
  buildChildren,
};

// this is used by @babel/traverse to warn about deprecated visitors
export { default as __internal__deprecationWarning } from "./utils/deprecationWarning.ts";

import toSequenceExpression from "./converters/toSequenceExpression.ts" with { if: "!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE" };
if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
  // eslint-disable-next-line no-restricted-globals
  exports.toSequenceExpression = toSequenceExpression;
}

if (!process.env.BABEL_8_BREAKING && process.env.BABEL_TYPES_8_BREAKING) {
  console.warn(
    "BABEL_TYPES_8_BREAKING is not supported anymore. Use the latest Babel 8.0.0 pre-release instead!",
  );
}
