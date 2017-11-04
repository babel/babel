// @flow
import isReactComponent from "./validators/react/isReactComponent";
import isCompatTag from "./validators/react/isCompatTag";
import buildChildren from "./builders/react/buildChildren";

// asserts
export { default as assertNode } from "./asserts/assertNode";
export * from "./asserts/generated";

//builders
export {
  default as createTypeAnnotationBasedOnTypeof,
} from "./builders/flow/createTypeAnnotationBasedOnTypeof";
export {
  default as createUnionTypeAnnotation,
} from "./builders/flow/createUnionTypeAnnotation";
export * from "./builders/generated";

// clone
export { default as clone } from "./clone/clone";
export { default as cloneDeep } from "./clone/cloneDeep";
export { default as cloneWithoutLoc } from "./clone/cloneWithoutLoc";

// comments
export { default as addComment } from "./comments/addComment";
export { default as addComments } from "./comments/addComments";
export {
  default as inheritInnerComments,
} from "./comments/inheritInnerComments";
export {
  default as inheritLeadingComments,
} from "./comments/inheritLeadingComments";
export { default as inheritsComments } from "./comments/inheritsComments";
export {
  default as inheritTrailingComments,
} from "./comments/inheritTrailingComments";
export { default as removeComments } from "./comments/removeComments";

// constants
export * from "./constants/generated";
export * from "./constants";

// converters
export { default as ensureBlock } from "./converters/ensureBlock";
export {
  default as toBindingIdentifierName,
} from "./converters/toBindingIdentifierName";
export { default as toBlock } from "./converters/toBlock";
export { default as toComputedKey } from "./converters/toComputedKey";
export { default as toExpression } from "./converters/toExpression";
export { default as toIdentifier } from "./converters/toIdentifier";
export { default as toKeyAlias } from "./converters/toKeyAlias";
export {
  default as toSequenceExpression,
} from "./converters/toSequenceExpression";
export { default as toStatement } from "./converters/toStatement";
export { default as valueToNode } from "./converters/valueToNode";

// definitions
export * from "./definitions";

// modifications
export {
  default as appendToMemberExpression,
} from "./modifications/appendToMemberExpression";
export { default as inherits } from "./modifications/inherits";
export {
  default as prependToMemberExpression,
} from "./modifications/prependToMemberExpression";
export { default as removeProperties } from "./modifications/removeProperties";
export {
  default as removePropertiesDeep,
} from "./modifications/removePropertiesDeep";
export {
  default as removeTypeDuplicates,
} from "./modifications/flow/removeTypeDuplicates";

// retrievers
export {
  default as getBindingIdentifiers,
} from "./retrievers/getBindingIdentifiers";
export {
  default as getOuterBindingIdentifiers,
} from "./retrievers/getOuterBindingIdentifiers";

// traverse
export { default as traverse } from "./traverse/traverse";
export { default as traverseFast } from "./traverse/traverseFast";

// utils
export { default as shallowEqual } from "./utils/shallowEqual";

// validators
export { default as is } from "./validators/is";
export { default as isBinding } from "./validators/isBinding";
export { default as isBlockScoped } from "./validators/isBlockScoped";
export { default as isImmutable } from "./validators/isImmutable";
export { default as isLet } from "./validators/isLet";
export { default as isNode } from "./validators/isNode";
export { default as isNodesEquivalent } from "./validators/isNodesEquivalent";
export { default as isReferenced } from "./validators/isReferenced";
export { default as isScope } from "./validators/isScope";
export { default as isSpecifierDefault } from "./validators/isSpecifierDefault";
export { default as isType } from "./validators/isType";
export {
  default as isValidES3Identifier,
} from "./validators/isValidES3Identifier";
export { default as isValidIdentifier } from "./validators/isValidIdentifier";
export { default as isVar } from "./validators/isVar";
export { default as matchesPattern } from "./validators/matchesPattern";
export { default as validate } from "./validators/validate";
export {
  default as buildMatchMemberExpression,
} from "./validators/buildMatchMemberExpression";
export * from "./validators/generated";

// react
export const react = {
  isReactComponent,
  isCompatTag,
  buildChildren,
};

// flow-types

export type * from "./flow-types/traverse";
