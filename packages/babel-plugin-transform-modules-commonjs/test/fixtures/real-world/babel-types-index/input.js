import isReactComponent from "./validators/react/isReactComponent.js";
import isCompatTag from "./validators/react/isCompatTag.js";
import buildChildren from "./builders/react/buildChildren.js";
export { default as assertNode } from "./asserts/assertNode.js";
export * from "./asserts/generated/index.js";
export { default as createTypeAnnotationBasedOnTypeof } from "./builders/flow/createTypeAnnotationBasedOnTypeof.js";
export { default as createUnionTypeAnnotation } from "./builders/flow/createFlowUnionType.js";
export { default as createFlowUnionType } from "./builders/flow/createFlowUnionType.js";
export { default as createTSUnionType } from "./builders/typescript/createTSUnionType.js";
export * from "./builders/generated/index.js";
export * from "./builders/generated/uppercase.js";
export * from "./builders/productions.js";
export { default as cloneNode } from "./clone/cloneNode.js";
export { default as clone } from "./clone/clone.js";
export { default as cloneDeep } from "./clone/cloneDeep.js";
export { default as cloneDeepWithoutLoc } from "./clone/cloneDeepWithoutLoc.js";
export { default as cloneWithoutLoc } from "./clone/cloneWithoutLoc.js";
export { default as addComment } from "./comments/addComment.js";
export { default as addComments } from "./comments/addComments.js";
export { default as inheritInnerComments } from "./comments/inheritInnerComments.js";
export { default as inheritLeadingComments } from "./comments/inheritLeadingComments.js";
export { default as inheritsComments } from "./comments/inheritsComments.js";
export { default as inheritTrailingComments } from "./comments/inheritTrailingComments.js";
export { default as removeComments } from "./comments/removeComments.js";
export * from "./constants/generated/index.js";
export * from "./constants/index.js";
export { default as ensureBlock } from "./converters/ensureBlock.js";
export { default as toBindingIdentifierName } from "./converters/toBindingIdentifierName.js";
export { default as toBlock } from "./converters/toBlock.js";
export { default as toComputedKey } from "./converters/toComputedKey.js";
export { default as toExpression } from "./converters/toExpression.js";
export { default as toIdentifier } from "./converters/toIdentifier.js";
export { default as toKeyAlias } from "./converters/toKeyAlias.js";
export { default as toStatement } from "./converters/toStatement.js";
export { default as valueToNode } from "./converters/valueToNode.js";
export * from "./definitions/index.js";
export { default as appendToMemberExpression } from "./modifications/appendToMemberExpression.js";
export { default as inherits } from "./modifications/inherits.js";
export { default as prependToMemberExpression } from "./modifications/prependToMemberExpression.js";
export { default as removeProperties } from "./modifications/removeProperties.js";
export { default as removePropertiesDeep } from "./modifications/removePropertiesDeep.js";
export { default as removeTypeDuplicates } from "./modifications/flow/removeTypeDuplicates.js";
export { default as getBindingIdentifiers } from "./retrievers/getBindingIdentifiers.js";
export { default as getOuterBindingIdentifiers } from "./retrievers/getOuterBindingIdentifiers.js";
export { default as traverse } from "./traverse/traverse.js";
export * from "./traverse/traverse.js";
export { default as traverseFast } from "./traverse/traverseFast.js";
export { default as shallowEqual } from "./utils/shallowEqual.js";
export { default as is } from "./validators/is.js";
export { default as isBinding } from "./validators/isBinding.js";
export { default as isBlockScoped } from "./validators/isBlockScoped.js";
export { default as isImmutable } from "./validators/isImmutable.js";
export { default as isLet } from "./validators/isLet.js";
export { default as isNode } from "./validators/isNode.js";
export { default as isNodesEquivalent } from "./validators/isNodesEquivalent.js";
export { default as isPlaceholderType } from "./validators/isPlaceholderType.js";
export { default as isReferenced } from "./validators/isReferenced.js";
export { default as isScope } from "./validators/isScope.js";
export { default as isSpecifierDefault } from "./validators/isSpecifierDefault.js";
export { default as isType } from "./validators/isType.js";
export { default as isValidES3Identifier } from "./validators/isValidES3Identifier.js";
export { default as isValidIdentifier } from "./validators/isValidIdentifier.js";
export { default as isVar } from "./validators/isVar.js";
export { default as matchesPattern } from "./validators/matchesPattern.js";
export { default as validate } from "./validators/validate.js";
export { default as buildMatchMemberExpression } from "./validators/buildMatchMemberExpression.js";
export * from "./validators/generated/index.js";
export const react = {
  isReactComponent,
  isCompatTag,
  buildChildren
};
export { default as __internal__deprecationWarning } from "./utils/deprecationWarning.js";
;
