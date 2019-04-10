// @flow

import * as N from "../types";
import type { Pos, Position } from "../util/location";
import { type BindingTypes, BIND_NONE, SCOPE_OTHER } from "../util/scopeflags";
import { types as tt, type TokenType } from "../util/token-types";

import { original } from "::build-tool::";

import {
  ct,
  match,
  next,
  eat,
  lookahead,
  curContext,
  finishOp,
} from "::build-tool::bindings/tokenizer";
import {
  scope,
  state,
  resetState,
  hasPlugin,
  startNode,
  startNodeAt,
  startNodeAtNode,
  finishNode,
  finishNodeAt,
  resetStartLocation,
  resetStartLocationFromNode,
  raise,
  unexpected,
  expect,
  expectRelational,
  isRelational,
  isContextual,
  isLookaheadContextual,
  expectContextual,
  eatContextual,
  hasPrecedingLineBreak,
  isLineTerminator,
  canInsertSemicolon,
  checkCommaAfterRest,
  atPossibleAsync,
  parseArrowExpression,
  parseClassPropertyName,
  parseExprAtom,
  parseExpression,
  parseBindingList,
  parseBlockOrModuleBlockBody,
  parseCallExpressionArguments,
  parseClass,
  parseIdentifier,
  parseIdentifierName,
  parseFunctionStatement,
  parsePropertyName,
  parseTemplate,
  parseTaggedTemplateExpression,
  parseVarStatement,
  pushClassProperty,
  finishCallExpression,
  semicolon,
} from "::build-tool::bindings/parser";

type TsModifier =
  | "readonly"
  | "abstract"
  | "static"
  | "public"
  | "private"
  | "protected";

function nonNull<T>(x: ?T): T {
  if (x == null) {
    // $FlowIgnore
    throw new Error(`Unexpected ${x} value.`);
  }
  return x;
}

function assert(x: boolean): void {
  if (!x) {
    throw new Error("Assert fail");
  }
}

type ParsingContext =
  | "EnumMembers"
  | "HeritageClauseElement"
  | "TupleElementTypes"
  | "TypeMembers"
  | "TypeParametersOrArguments";

// Doesn't handle "void" or "null" because those are keywords, not identifiers.
function keywordTypeFromName(
  value: string,
): N.TsKeywordTypeType | typeof undefined {
  switch (value) {
    case "any":
      return "TSAnyKeyword";
    case "boolean":
      return "TSBooleanKeyword";
    case "bigint":
      return "TSBigIntKeyword";
    case "never":
      return "TSNeverKeyword";
    case "number":
      return "TSNumberKeyword";
    case "object":
      return "TSObjectKeyword";
    case "string":
      return "TSStringKeyword";
    case "symbol":
      return "TSSymbolKeyword";
    case "undefined":
      return "TSUndefinedKeyword";
    case "unknown":
      return "TSUnknownKeyword";
    default:
      return undefined;
  }
}

function tsIsIdentifier(): boolean {
  // TODO: actually a bit more complex in TypeScript, but shouldn't matter.
  // See https://github.com/Microsoft/TypeScript/issues/15008
  return match(tt.name);
}

function tsNextTokenCanFollowModifier() {
  // Note: TypeScript's implementation is much more complicated because
  // more things are considered modifiers there.
  // This implementation only handles modifiers not handled by @babel/parser itself. And "static".
  // TODO: Would be nice to avoid lookahead. Want a hasLineBreakUpNext() method...
  next();
  return (
    !hasPrecedingLineBreak() &&
    !match(tt.parenL) &&
    !match(tt.parenR) &&
    !match(tt.colon) &&
    !match(tt.eq) &&
    !match(tt.question) &&
    !match(tt.bang)
  );
}

/** Parses a modifier matching one the given modifier names. */
function tsParseModifier<T: TsModifier>(allowedModifiers: T[]): ?T {
  if (!match(tt.name)) {
    return undefined;
  }

  const modifier = state.value;
  if (
    allowedModifiers.indexOf(modifier) !== -1 &&
    tsTryParse(tsNextTokenCanFollowModifier.bind(this))
  ) {
    return modifier;
  }
  return undefined;
}

function tsIsListTerminator(kind: ParsingContext): boolean {
  switch (kind) {
    case "EnumMembers":
    case "TypeMembers":
      return match(tt.braceR);
    case "HeritageClauseElement":
      return match(tt.braceL);
    case "TupleElementTypes":
      return match(tt.bracketR);
    case "TypeParametersOrArguments":
      return isRelational(">");
  }

  throw new Error("Unreachable");
}

function tsParseList<T: N.Node>(
  kind: ParsingContext,
  parseElement: () => T,
): T[] {
  const result: T[] = [];
  while (!tsIsListTerminator(kind)) {
    // Skipping "parseListElement" from the TS source since that's just for error handling.
    result.push(parseElement());
  }
  return result;
}

function tsParseDelimitedList<T: N.Node>(
  kind: ParsingContext,
  parseElement: () => T,
): T[] {
  return nonNull(
    tsParseDelimitedListWorker(kind, parseElement, /* expectSuccess */ true),
  );
}

/**
 * If !expectSuccess, returns undefined instead of failing to parse.
 * If expectSuccess, parseElement should always return a defined value.
 */
function tsParseDelimitedListWorker<T: N.Node>(
  kind: ParsingContext,
  parseElement: () => ?T,
  expectSuccess: boolean,
): ?(T[]) {
  const result = [];

  while (true) {
    if (tsIsListTerminator(kind)) {
      break;
    }

    const element = parseElement();
    if (element == null) {
      return undefined;
    }
    result.push(element);

    if (eat(tt.comma)) {
      continue;
    }

    if (tsIsListTerminator(kind)) {
      break;
    }

    if (expectSuccess) {
      // This will fail with an error about a missing comma
      expect(tt.comma);
    }
    return undefined;
  }

  return result;
}

function tsParseBracketedList<T: N.Node>(
  kind: ParsingContext,
  parseElement: () => T,
  bracket: boolean,
  skipFirstToken: boolean,
): T[] {
  if (!skipFirstToken) {
    if (bracket) {
      expect(tt.bracketL);
    } else {
      expectRelational("<");
    }
  }

  const result = tsParseDelimitedList(kind, parseElement);

  if (bracket) {
    expect(tt.bracketR);
  } else {
    expectRelational(">");
  }

  return result;
}

function tsParseImportType(): N.TsImportType {
  const node: N.TsImportType = startNode();
  expect(tt._import);
  expect(tt.parenL);
  if (!match(tt.string)) {
    throw unexpected(
      null,
      "Argument in a type import must be a string literal",
    );
  }

  // For compatibility to estree we cannot call parseLiteral directly here
  node.argument = parseExprAtom();
  expect(tt.parenR);

  if (eat(tt.dot)) {
    node.qualifier = tsParseEntityName(/* allowReservedWords */ true);
  }
  if (isRelational("<")) {
    node.typeParameters = tsParseTypeArguments();
  }
  return finishNode(node, "TSImportType");
}

function tsParseEntityName(allowReservedWords: boolean): N.TsEntityName {
  let entity: N.TsEntityName = parseIdentifier();
  while (eat(tt.dot)) {
    const node: N.TsQualifiedName = startNodeAtNode(entity);
    node.left = entity;
    node.right = parseIdentifier(allowReservedWords);
    entity = finishNode(node, "TSQualifiedName");
  }
  return entity;
}

function tsParseTypeReference(): N.TsTypeReference {
  const node: N.TsTypeReference = startNode();
  node.typeName = tsParseEntityName(/* allowReservedWords */ false);
  if (!hasPrecedingLineBreak() && isRelational("<")) {
    node.typeParameters = tsParseTypeArguments();
  }
  return finishNode(node, "TSTypeReference");
}

function tsParseThisTypePredicate(lhs: N.TsThisType): N.TsTypePredicate {
  next();
  const node: N.TsTypePredicate = startNodeAtNode(lhs);
  node.parameterName = lhs;
  node.typeAnnotation = tsParseTypeAnnotation(/* eatColon */ false);
  return finishNode(node, "TSTypePredicate");
}

function tsParseThisTypeNode(): N.TsThisType {
  const node: N.TsThisType = startNode();
  next();
  return finishNode(node, "TSThisType");
}

function tsParseTypeQuery(): N.TsTypeQuery {
  const node: N.TsTypeQuery = startNode();
  expect(tt._typeof);
  if (match(tt._import)) {
    node.exprName = tsParseImportType();
  } else {
    node.exprName = tsParseEntityName(/* allowReservedWords */ true);
  }
  return finishNode(node, "TSTypeQuery");
}

function tsParseTypeParameter(): N.TsTypeParameter {
  const node: N.TsTypeParameter = startNode();
  node.name = parseIdentifierName(node.start);
  node.constraint = tsEatThenParseType(tt._extends);
  node.default = tsEatThenParseType(tt.eq);
  return finishNode(node, "TSTypeParameter");
}

function tsTryParseTypeParameters(): ?N.TsTypeParameterDeclaration {
  if (isRelational("<")) {
    return tsParseTypeParameters();
  }
}

function tsParseTypeParameters() {
  const node: N.TsTypeParameterDeclaration = startNode();

  if (isRelational("<") || match(tt.jsxTagStart)) {
    next();
  } else {
    unexpected();
  }

  node.params = tsParseBracketedList(
    "TypeParametersOrArguments",
    tsParseTypeParameter.bind(this),
    /* bracket */ false,
    /* skipFirstToken */ true,
  );
  return finishNode(node, "TSTypeParameterDeclaration");
}

function tsTryNextParseConstantContext(): ?N.TsTypeReference {
  if (lookahead().type === tt._const) {
    next();
    return tsParseTypeReference();
  }
  return null;
}

function tsCheckLiteralForConstantContext(node: N.Node) {
  switch (node.type) {
    case "StringLiteral":
    case "TemplateLiteral":
    case "NumericLiteral":
    case "BooleanLiteral":
    case "SpreadElement":
    case "ObjectMethod":
    case "ObjectExpression":
      return;
    case "ArrayExpression":
      return (node: N.ArrayExpression).elements.forEach(element => {
        if (element) {
          tsCheckLiteralForConstantContext(element);
        }
      });
    case "ObjectProperty":
      return tsCheckLiteralForConstantContext((node: N.ObjectProperty).value);
    case "UnaryExpression":
      return tsCheckLiteralForConstantContext(node.argument);
    default:
      raise(node.start, "Only literal values are allowed in constant contexts");
  }
}

// Note: In TypeScript implementation we must provide `yieldContext` and `awaitContext`,
// but here it's always false, because this is only used for types.
function tsFillSignature(
  returnToken: TokenType,
  signature: N.TsSignatureDeclaration,
): void {
  // Arrow fns *must* have return token (`=>`). Normal functions can omit it.
  const returnTokenRequired = returnToken === tt.arrow;
  signature.typeParameters = tsTryParseTypeParameters();
  expect(tt.parenL);
  signature.parameters = tsParseBindingListForSignature();
  if (returnTokenRequired) {
    signature.typeAnnotation = tsParseTypeOrTypePredicateAnnotation(
      returnToken,
    );
  } else if (match(returnToken)) {
    signature.typeAnnotation = tsParseTypeOrTypePredicateAnnotation(
      returnToken,
    );
  }
}

function tsParseBindingListForSignature(): $ReadOnlyArray<
  N.Identifier | N.RestElement | N.ObjectPattern | N.ArrayPattern,
> {
  return parseBindingList(tt.parenR).map(pattern => {
    if (
      pattern.type !== "Identifier" &&
      pattern.type !== "RestElement" &&
      pattern.type !== "ObjectPattern" &&
      pattern.type !== "ArrayPattern"
    ) {
      throw unexpected(
        pattern.start,
        `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${
          pattern.type
        }`,
      );
    }
    return pattern;
  });
}

function tsParseTypeMemberSemicolon(): void {
  if (!eat(tt.comma)) {
    semicolon();
  }
}

function tsParseSignatureMember(
  kind: "TSCallSignatureDeclaration" | "TSConstructSignatureDeclaration",
): N.TsCallSignatureDeclaration | N.TsConstructSignatureDeclaration {
  const node:
    | N.TsCallSignatureDeclaration
    | N.TsConstructSignatureDeclaration = startNode();
  if (kind === "TSConstructSignatureDeclaration") {
    expect(tt._new);
  }
  tsFillSignature(tt.colon, node);
  tsParseTypeMemberSemicolon();
  return finishNode(node, kind);
}

function tsIsUnambiguouslyIndexSignature() {
  next(); // Skip '{'
  return eat(tt.name) && match(tt.colon);
}

function tsTryParseIndexSignature(
  node: N.TsIndexSignature,
): ?N.TsIndexSignature {
  if (
    !(
      match(tt.bracketL) &&
      tsLookAhead(tsIsUnambiguouslyIndexSignature.bind(this))
    )
  ) {
    return undefined;
  }

  expect(tt.bracketL);
  const id = parseIdentifier();
  id.typeAnnotation = tsParseTypeAnnotation();
  finishNode(id, "Identifier"); // set end position to end of type

  expect(tt.bracketR);
  node.parameters = [id];

  const type = tsTryParseTypeAnnotation();
  if (type) node.typeAnnotation = type;
  tsParseTypeMemberSemicolon();
  return finishNode(node, "TSIndexSignature");
}

function tsParsePropertyOrMethodSignature(
  node: N.TsPropertySignature | N.TsMethodSignature,
  readonly: boolean,
): N.TsPropertySignature | N.TsMethodSignature {
  parsePropertyName(node);
  if (eat(tt.question)) node.optional = true;
  const nodeAny: any = node;

  if (!readonly && (match(tt.parenL) || isRelational("<"))) {
    const method: N.TsMethodSignature = nodeAny;
    tsFillSignature(tt.colon, method);
    tsParseTypeMemberSemicolon();
    return finishNode(method, "TSMethodSignature");
  } else {
    const property: N.TsPropertySignature = nodeAny;
    if (readonly) property.readonly = true;
    const type = tsTryParseTypeAnnotation();
    if (type) property.typeAnnotation = type;
    tsParseTypeMemberSemicolon();
    return finishNode(property, "TSPropertySignature");
  }
}

function tsParseTypeMember(): N.TsTypeElement {
  if (match(tt.parenL) || isRelational("<")) {
    return tsParseSignatureMember("TSCallSignatureDeclaration");
  }
  if (match(tt._new) && tsLookAhead(tsIsStartOfConstructSignature.bind(this))) {
    return tsParseSignatureMember("TSConstructSignatureDeclaration");
  }
  // Instead of fullStart, we create a node here.
  const node: any = startNode();
  const readonly = !!tsParseModifier(["readonly"]);

  const idx = tsTryParseIndexSignature(node);
  if (idx) {
    if (readonly) node.readonly = true;
    return idx;
  }
  return tsParsePropertyOrMethodSignature(node, readonly);
}

function tsIsStartOfConstructSignature() {
  next();
  return match(tt.parenL) || isRelational("<");
}

function tsParseTypeLiteral(): N.TsTypeLiteral {
  const node: N.TsTypeLiteral = startNode();
  node.members = tsParseObjectTypeMembers();
  return finishNode(node, "TSTypeLiteral");
}

function tsParseObjectTypeMembers(): $ReadOnlyArray<N.TsTypeElement> {
  expect(tt.braceL);
  const members = tsParseList("TypeMembers", tsParseTypeMember.bind(this));
  expect(tt.braceR);
  return members;
}

function tsIsStartOfMappedType(): boolean {
  next();
  if (eat(tt.plusMin)) {
    return isContextual("readonly");
  }
  if (isContextual("readonly")) {
    next();
  }
  if (!match(tt.bracketL)) {
    return false;
  }
  next();
  if (!tsIsIdentifier()) {
    return false;
  }
  next();
  return match(tt._in);
}

function tsParseMappedTypeParameter(): N.TsTypeParameter {
  const node: N.TsTypeParameter = startNode();
  node.name = parseIdentifierName(node.start);
  node.constraint = tsExpectThenParseType(tt._in);
  return finishNode(node, "TSTypeParameter");
}

function tsParseMappedType(): N.TsMappedType {
  const node: N.TsMappedType = startNode();

  expect(tt.braceL);

  if (match(tt.plusMin)) {
    node.readonly = state.value;
    next();
    expectContextual("readonly");
  } else if (eatContextual("readonly")) {
    node.readonly = true;
  }

  expect(tt.bracketL);
  node.typeParameter = tsParseMappedTypeParameter();
  expect(tt.bracketR);

  if (match(tt.plusMin)) {
    node.optional = state.value;
    next();
    expect(tt.question);
  } else if (eat(tt.question)) {
    node.optional = true;
  }

  node.typeAnnotation = tsTryParseType();
  semicolon();
  expect(tt.braceR);

  return finishNode(node, "TSMappedType");
}

function tsParseTupleType(): N.TsTupleType {
  const node: N.TsTupleType = startNode();
  node.elementTypes = tsParseBracketedList(
    "TupleElementTypes",
    tsParseTupleElementType.bind(this),
    /* bracket */ true,
    /* skipFirstToken */ false,
  );

  // Validate the elementTypes to ensure:
  //   No mandatory elements may follow optional elements
  //   If there's a rest element, it must be at the end of the tuple
  let seenOptionalElement = false;
  node.elementTypes.forEach(elementNode => {
    if (elementNode.type === "TSOptionalType") {
      seenOptionalElement = true;
    } else if (seenOptionalElement && elementNode.type !== "TSRestType") {
      raise(
        elementNode.start,
        "A required element cannot follow an optional element.",
      );
    }
  });

  return finishNode(node, "TSTupleType");
}

function tsParseTupleElementType(): N.TsType {
  // parses `...TsType[]`
  if (match(tt.ellipsis)) {
    const restNode: N.TsRestType = startNode();
    next(); // skips ellipsis
    restNode.typeAnnotation = tsParseType();
    checkCommaAfterRest();
    return finishNode(restNode, "TSRestType");
  }

  const type = tsParseType();
  // parses `TsType?`
  if (eat(tt.question)) {
    const optionalTypeNode: N.TsOptionalType = startNodeAtNode(type);
    optionalTypeNode.typeAnnotation = type;
    return finishNode(optionalTypeNode, "TSOptionalType");
  }
  return type;
}

function tsParseParenthesizedType(): N.TsParenthesizedType {
  const node = startNode();
  expect(tt.parenL);
  node.typeAnnotation = tsParseType();
  expect(tt.parenR);
  return finishNode(node, "TSParenthesizedType");
}

function tsParseFunctionOrConstructorType(
  type: "TSFunctionType" | "TSConstructorType",
): N.TsFunctionOrConstructorType {
  const node: N.TsFunctionOrConstructorType = startNode();
  if (type === "TSConstructorType") {
    expect(tt._new);
  }
  tsFillSignature(tt.arrow, node);
  return finishNode(node, type);
}

function tsParseLiteralTypeNode(): N.TsLiteralType {
  const node: N.TsLiteralType = startNode();
  node.literal = (() => {
    switch (state.type) {
      case tt.num:
      case tt.string:
      case tt._true:
      case tt._false:
        // For compatibility to estree we cannot call parseLiteral directly here
        return parseExprAtom();
      default:
        throw unexpected();
    }
  })();
  return finishNode(node, "TSLiteralType");
}

function tsParseTemplateLiteralType(): N.TsType {
  const node: N.TsLiteralType = startNode();
  const templateNode = parseTemplate(false);
  if (templateNode.expressions.length > 0) {
    throw raise(
      templateNode.expressions[0].start,
      "Template literal types cannot have any substitution",
    );
  }
  node.literal = templateNode;
  return finishNode(node, "TSLiteralType");
}

function tsParseNonArrayType(): N.TsType {
  switch (state.type) {
    case tt.name:
    case tt._void:
    case tt._null: {
      const type = match(tt._void)
        ? "TSVoidKeyword"
        : match(tt._null)
        ? "TSNullKeyword"
        : keywordTypeFromName(state.value);
      if (type !== undefined && lookahead().type !== tt.dot) {
        const node: N.TsKeywordType = startNode();
        next();
        return finishNode(node, type);
      }
      return tsParseTypeReference();
    }
    case tt.string:
    case tt.num:
    case tt._true:
    case tt._false:
      return tsParseLiteralTypeNode();
    case tt.plusMin:
      if (state.value === "-") {
        const node: N.TsLiteralType = startNode();
        if (lookahead().type !== tt.num) {
          throw unexpected();
        }
        node.literal = parseMaybeUnary();
        return finishNode(node, "TSLiteralType");
      }
      break;
    case tt._this: {
      const thisKeyword = tsParseThisTypeNode();
      if (isContextual("is") && !hasPrecedingLineBreak()) {
        return tsParseThisTypePredicate(thisKeyword);
      } else {
        return thisKeyword;
      }
    }
    case tt._typeof:
      return tsParseTypeQuery();
    case tt._import:
      return tsParseImportType();
    case tt.braceL:
      return tsLookAhead(tsIsStartOfMappedType.bind(this))
        ? tsParseMappedType()
        : tsParseTypeLiteral();
    case tt.bracketL:
      return tsParseTupleType();
    case tt.parenL:
      return tsParseParenthesizedType();
    case tt.backQuote:
      return tsParseTemplateLiteralType();
  }

  throw unexpected();
}

function tsParseArrayTypeOrHigher(): N.TsType {
  let type = tsParseNonArrayType();
  while (!hasPrecedingLineBreak() && eat(tt.bracketL)) {
    if (match(tt.bracketR)) {
      const node: N.TsArrayType = startNodeAtNode(type);
      node.elementType = type;
      expect(tt.bracketR);
      type = finishNode(node, "TSArrayType");
    } else {
      const node: N.TsIndexedAccessType = startNodeAtNode(type);
      node.objectType = type;
      node.indexType = tsParseType();
      expect(tt.bracketR);
      type = finishNode(node, "TSIndexedAccessType");
    }
  }
  return type;
}

function tsParseTypeOperator(
  operator: "keyof" | "unique" | "readonly",
): N.TsTypeOperator {
  const node: N.TsTypeOperator = startNode();
  expectContextual(operator);
  node.operator = operator;
  node.typeAnnotation = tsParseTypeOperatorOrHigher();

  if (operator === "readonly") {
    tsCheckTypeAnnotationForReadOnly(node);
  }

  return finishNode(node, "TSTypeOperator");
}

function tsCheckTypeAnnotationForReadOnly(node: N.Node) {
  switch (node.typeAnnotation.type) {
    case "TSTupleType":
    case "TSArrayType":
      return;
    default:
      raise(
        node.operator,
        "'readonly' type modifier is only permitted on array and tuple literal types.",
      );
  }
}

function tsParseInferType(): N.TsInferType {
  const node = startNode();
  expectContextual("infer");
  const typeParameter = startNode();
  typeParameter.name = parseIdentifierName(typeParameter.start);
  node.typeParameter = finishNode(typeParameter, "TSTypeParameter");
  return finishNode(node, "TSInferType");
}

function tsParseTypeOperatorOrHigher(): N.TsType {
  const operator = ["keyof", "unique", "readonly"].find(kw => isContextual(kw));
  return operator
    ? tsParseTypeOperator(operator)
    : isContextual("infer")
    ? tsParseInferType()
    : tsParseArrayTypeOrHigher();
}

function tsParseUnionOrIntersectionType(
  kind: "TSUnionType" | "TSIntersectionType",
  parseConstituentType: () => N.TsType,
  operator: TokenType,
): N.TsType {
  eat(operator);
  let type = parseConstituentType();
  if (match(operator)) {
    const types = [type];
    while (eat(operator)) {
      types.push(parseConstituentType());
    }
    const node: N.TsUnionType | N.TsIntersectionType = startNodeAtNode(type);
    node.types = types;
    type = finishNode(node, kind);
  }
  return type;
}

function tsParseIntersectionTypeOrHigher(): N.TsType {
  return tsParseUnionOrIntersectionType(
    "TSIntersectionType",
    tsParseTypeOperatorOrHigher.bind(this),
    tt.bitwiseAND,
  );
}

function tsParseUnionTypeOrHigher() {
  return tsParseUnionOrIntersectionType(
    "TSUnionType",
    tsParseIntersectionTypeOrHigher.bind(this),
    tt.bitwiseOR,
  );
}

function tsIsStartOfFunctionType() {
  if (isRelational("<")) {
    return true;
  }
  return (
    match(tt.parenL) &&
    tsLookAhead(tsIsUnambiguouslyStartOfFunctionType.bind(this))
  );
}

function tsSkipParameterStart(): boolean {
  if (match(tt.name) || match(tt._this)) {
    next();
    return true;
  }

  if (match(tt.braceL)) {
    let braceStackCounter = 1;
    next();

    while (braceStackCounter > 0) {
      if (match(tt.braceL)) {
        ++braceStackCounter;
      } else if (match(tt.braceR)) {
        --braceStackCounter;
      }
      next();
    }
    return true;
  }

  if (match(tt.bracketL)) {
    let braceStackCounter = 1;
    next();

    while (braceStackCounter > 0) {
      if (match(tt.bracketL)) {
        ++braceStackCounter;
      } else if (match(tt.bracketR)) {
        --braceStackCounter;
      }
      next();
    }
    return true;
  }

  return false;
}

function tsIsUnambiguouslyStartOfFunctionType(): boolean {
  next();
  if (match(tt.parenR) || match(tt.ellipsis)) {
    // ( )
    // ( ...
    return true;
  }
  if (tsSkipParameterStart()) {
    if (
      match(tt.colon) ||
      match(tt.comma) ||
      match(tt.question) ||
      match(tt.eq)
    ) {
      // ( xxx :
      // ( xxx ,
      // ( xxx ?
      // ( xxx =
      return true;
    }
    if (match(tt.parenR)) {
      next();
      if (match(tt.arrow)) {
        // ( xxx ) =>
        return true;
      }
    }
  }
  return false;
}

function tsParseTypeOrTypePredicateAnnotation(
  returnToken: TokenType,
): N.TsTypeAnnotation {
  return tsInType(() => {
    const t: N.TsTypeAnnotation = startNode();
    expect(returnToken);

    const typePredicateVariable =
      tsIsIdentifier() && tsTryParse(tsParseTypePredicatePrefix.bind(this));

    if (!typePredicateVariable) {
      return tsParseTypeAnnotation(/* eatColon */ false, t);
    }

    const type = tsParseTypeAnnotation(/* eatColon */ false);

    const node: N.TsTypePredicate = startNodeAtNode(typePredicateVariable);
    node.parameterName = typePredicateVariable;
    node.typeAnnotation = type;
    t.typeAnnotation = finishNode(node, "TSTypePredicate");
    return finishNode(t, "TSTypeAnnotation");
  });
}

function tsTryParseTypeOrTypePredicateAnnotation(): ?N.TsTypeAnnotation {
  return match(tt.colon)
    ? tsParseTypeOrTypePredicateAnnotation(tt.colon)
    : undefined;
}

function tsTryParseTypeAnnotation(): ?N.TsTypeAnnotation {
  return match(tt.colon) ? tsParseTypeAnnotation() : undefined;
}

function tsTryParseType(): ?N.TsType {
  return tsEatThenParseType(tt.colon);
}

function tsParseTypePredicatePrefix(): ?N.Identifier {
  const id = parseIdentifier();
  if (isContextual("is") && !hasPrecedingLineBreak()) {
    next();
    return id;
  }
}

function tsParseTypeAnnotation(
  eatColon = true,
  t: N.TsTypeAnnotation = startNode(),
): N.TsTypeAnnotation {
  tsInType(() => {
    if (eatColon) expect(tt.colon);
    t.typeAnnotation = tsParseType();
  });
  return finishNode(t, "TSTypeAnnotation");
}

/** Be sure to be in a type context before calling this, using `tsInType`. */
function tsParseType(): N.TsType {
  // Need to set `state.inType` so that we don't parse JSX in a type context.
  assert(state.inType);
  const type = tsParseNonConditionalType();
  if (hasPrecedingLineBreak() || !eat(tt._extends)) {
    return type;
  }
  const node: N.TsConditionalType = startNodeAtNode(type);
  node.checkType = type;
  node.extendsType = tsParseNonConditionalType();
  expect(tt.question);
  node.trueType = tsParseType();
  expect(tt.colon);
  node.falseType = tsParseType();
  return finishNode(node, "TSConditionalType");
}

function tsParseNonConditionalType(): N.TsType {
  if (tsIsStartOfFunctionType()) {
    return tsParseFunctionOrConstructorType("TSFunctionType");
  }
  if (match(tt._new)) {
    // As in `new () => Date`
    return tsParseFunctionOrConstructorType("TSConstructorType");
  }
  return tsParseUnionTypeOrHigher();
}

function tsParseTypeAssertion(): N.TsTypeAssertion {
  const node: N.TsTypeAssertion = startNode();
  const _const = tsTryNextParseConstantContext();
  node.typeAnnotation = _const || tsNextThenParseType();
  expectRelational(">");
  node.expression = parseMaybeUnary();
  if (_const) {
    tsCheckLiteralForConstantContext(node.expression);
  }
  return finishNode(node, "TSTypeAssertion");
}

function tsParseHeritageClause(
  descriptor: string,
): $ReadOnlyArray<N.TsExpressionWithTypeArguments> {
  const originalStart = state.start;

  const delimitedList = tsParseDelimitedList(
    "HeritageClauseElement",
    tsParseExpressionWithTypeArguments.bind(this),
  );

  if (!delimitedList.length) {
    raise(originalStart, `'${descriptor}' list cannot be empty.`);
  }

  return delimitedList;
}

function tsParseExpressionWithTypeArguments(): N.TsExpressionWithTypeArguments {
  const node: N.TsExpressionWithTypeArguments = startNode();
  // Note: TS uses parseLeftHandSideExpressionOrHigher,
  // then has grammar errors later if it's not an EntityName.
  node.expression = tsParseEntityName(/* allowReservedWords */ false);
  if (isRelational("<")) {
    node.typeParameters = tsParseTypeArguments();
  }

  return finishNode(node, "TSExpressionWithTypeArguments");
}

function tsParseInterfaceDeclaration(
  node: N.TsInterfaceDeclaration,
): N.TsInterfaceDeclaration {
  node.id = parseIdentifier();
  node.typeParameters = tsTryParseTypeParameters();
  if (eat(tt._extends)) {
    node.extends = tsParseHeritageClause("extends");
  }
  const body: N.TSInterfaceBody = startNode();
  body.body = tsInType(tsParseObjectTypeMembers.bind(this));
  node.body = finishNode(body, "TSInterfaceBody");
  return finishNode(node, "TSInterfaceDeclaration");
}

function tsParseTypeAliasDeclaration(
  node: N.TsTypeAliasDeclaration,
): N.TsTypeAliasDeclaration {
  node.id = parseIdentifier();
  node.typeParameters = tsTryParseTypeParameters();
  node.typeAnnotation = tsExpectThenParseType(tt.eq);
  semicolon();
  return finishNode(node, "TSTypeAliasDeclaration");
}

function tsInNoContext<T>(cb: () => T): T {
  const oldContext = state.context;
  state.context = [oldContext[0]];
  try {
    return cb();
  } finally {
    state.context = oldContext;
  }
}

/**
 * Runs `cb` in a type context.
 * This should be called one token *before* the first type token,
 * so that the call to `next()` is run in type context.
 */
function tsInType<T>(cb: () => T): T {
  const oldInType = state.inType;
  state.inType = true;
  try {
    return cb();
  } finally {
    state.inType = oldInType;
  }
}

function tsEatThenParseType(token: TokenType): N.TsType | typeof undefined {
  return !match(token) ? undefined : tsNextThenParseType();
}

function tsExpectThenParseType(token: TokenType): N.TsType {
  return tsDoThenParseType(() => expect(token));
}

function tsNextThenParseType(): N.TsType {
  return tsDoThenParseType(() => next());
}

function tsDoThenParseType(cb: () => void): N.TsType {
  return tsInType(() => {
    cb();
    return tsParseType();
  });
}

function tsParseEnumMember(): N.TsEnumMember {
  const node: N.TsEnumMember = startNode();
  // Computed property names are grammar errors in an enum, so accept just string literal or identifier.
  node.id = match(tt.string)
    ? parseExprAtom()
    : parseIdentifier(/* liberal */ true);
  if (eat(tt.eq)) {
    node.initializer = parseMaybeAssign();
  }
  return finishNode(node, "TSEnumMember");
}

function tsParseEnumDeclaration(
  node: N.TsEnumDeclaration,
  isConst: boolean,
): N.TsEnumDeclaration {
  if (isConst) node.const = true;
  node.id = parseIdentifier();
  expect(tt.braceL);
  node.members = tsParseDelimitedList(
    "EnumMembers",
    tsParseEnumMember.bind(this),
  );
  expect(tt.braceR);
  return finishNode(node, "TSEnumDeclaration");
}

function tsParseModuleBlock(): N.TsModuleBlock {
  const node: N.TsModuleBlock = startNode();
  scope.enter(SCOPE_OTHER);

  expect(tt.braceL);
  // Inside of a module block is considered "top-level", meaning it can have imports and exports.
  parseBlockOrModuleBlockBody(
    (node.body = []),
    /* directives */ undefined,
    /* topLevel */ true,
    /* end */ tt.braceR,
  );
  scope.exit();
  return finishNode(node, "TSModuleBlock");
}

function tsParseModuleOrNamespaceDeclaration(
  node: N.TsModuleDeclaration,
): N.TsModuleDeclaration {
  node.id = parseIdentifier();
  if (eat(tt.dot)) {
    const inner = startNode();
    tsParseModuleOrNamespaceDeclaration(inner);
    node.body = inner;
  } else {
    node.body = tsParseModuleBlock();
  }
  return finishNode(node, "TSModuleDeclaration");
}

function tsParseAmbientExternalModuleDeclaration(
  node: N.TsModuleDeclaration,
): N.TsModuleDeclaration {
  if (isContextual("global")) {
    node.global = true;
    node.id = parseIdentifier();
  } else if (match(tt.string)) {
    node.id = parseExprAtom();
  } else {
    unexpected();
  }

  if (match(tt.braceL)) {
    node.body = tsParseModuleBlock();
  } else {
    semicolon();
  }

  return finishNode(node, "TSModuleDeclaration");
}

function tsParseImportEqualsDeclaration(
  node: N.TsImportEqualsDeclaration,
  isExport?: boolean,
): N.TsImportEqualsDeclaration {
  node.isExport = isExport || false;
  node.id = parseIdentifier();
  expect(tt.eq);
  node.moduleReference = tsParseModuleReference();
  semicolon();
  return finishNode(node, "TSImportEqualsDeclaration");
}

function tsIsExternalModuleReference(): boolean {
  return isContextual("require") && lookahead().type === tt.parenL;
}

function tsParseModuleReference(): N.TsModuleReference {
  return tsIsExternalModuleReference()
    ? tsParseExternalModuleReference()
    : tsParseEntityName(/* allowReservedWords */ false);
}

function tsParseExternalModuleReference(): N.TsExternalModuleReference {
  const node: N.TsExternalModuleReference = startNode();
  expectContextual("require");
  expect(tt.parenL);
  if (!match(tt.string)) {
    throw unexpected();
  }
  // For compatibility to estree we cannot call parseLiteral directly here
  node.expression = parseExprAtom();
  expect(tt.parenR);
  return finishNode(node, "TSExternalModuleReference");
}

// Utilities

function tsLookAhead<T>(f: () => T): T {
  const oldState = state.clone();
  const res = f();
  resetState(oldState);
  return res;
}

function tsTryParseAndCatch<T>(f: () => T): ?T {
  const oldState = state.clone();
  try {
    return f();
  } catch (e) {
    if (e instanceof SyntaxError) {
      resetState(oldState);
      return undefined;
    }
    throw e;
  }
}

function tsTryParse<T>(f: () => ?T): ?T {
  const oldState = state.clone();
  const result = f();
  if (result !== undefined && result !== false) {
    return result;
  } else {
    resetState(oldState);
    return undefined;
  }
}

function tsTryParseDeclare(nany: any): ?N.Declaration {
  if (isLineTerminator()) {
    return;
  }
  let starttype = state.type;
  let kind;

  if (isContextual("let")) {
    starttype = tt._var;
    kind = "let";
  }

  switch (starttype) {
    case tt._function:
      return parseFunctionStatement(nany);
    case tt._class:
      return parseClass(nany, /* isStatement */ true, /* optionalId */ false);
    case tt._const:
      if (match(tt._const) && isLookaheadContextual("enum")) {
        // `const enum = 0;` not allowed because "enum" is a strict mode reserved word.
        expect(tt._const);
        expectContextual("enum");
        return tsParseEnumDeclaration(nany, /* isConst */ true);
      }
    // falls through
    case tt._var:
      kind = kind || state.value;
      return parseVarStatement(nany, kind);
    case tt.name: {
      const value = state.value;
      if (value === "global") {
        return tsParseAmbientExternalModuleDeclaration(nany);
      } else {
        return tsParseDeclaration(nany, value, /* next */ true);
      }
    }
  }
}

// Note: this won't be called unless the keyword is allowed in `shouldParseExportDeclaration`.
function tsTryParseExportDeclaration(): ?N.Declaration {
  return tsParseDeclaration(startNode(), state.value, /* next */ true);
}

function tsParseExpressionStatement(
  node: any,
  expr: N.Identifier,
): ?N.Declaration {
  switch (expr.name) {
    case "declare": {
      const declaration = tsTryParseDeclare(node);
      if (declaration) {
        declaration.declare = true;
        return declaration;
      }
      break;
    }
    case "global":
      // `global { }` (with no `declare`) may appear inside an ambient module declaration.
      // Would like to use tsParseAmbientExternalModuleDeclaration here, but already ran past "global".
      if (match(tt.braceL)) {
        const mod: N.TsModuleDeclaration = node;
        mod.global = true;
        mod.id = expr;
        mod.body = tsParseModuleBlock();
        return finishNode(mod, "TSModuleDeclaration");
      }
      break;

    default:
      return tsParseDeclaration(node, expr.name, /* advance */ false);
  }
}

// Common to tsTryParseDeclare, tsTryParseExportDeclaration, and tsParseExpressionStatement.
function tsParseDeclaration(
  node: any,
  value: string,
  advance: boolean,
): ?N.Declaration {
  switch (value) {
    case "abstract":
      if (tsCheckLineTerminatorAndMatch(tt._class, advance)) {
        const cls: N.ClassDeclaration = node;
        cls.abstract = true;
        if (advance) {
          next();
          if (!match(tt._class)) {
            unexpected(null, tt._class);
          }
        }
        return parseClass(cls, /* isStatement */ true, /* optionalId */ false);
      }
      break;

    case "enum":
      if (advance || match(tt.name)) {
        if (advance) next();
        return tsParseEnumDeclaration(node, /* isConst */ false);
      }
      break;

    case "interface":
      if (tsCheckLineTerminatorAndMatch(tt.name, advance)) {
        if (advance) next();
        return tsParseInterfaceDeclaration(node);
      }
      break;

    case "module":
      if (advance) next();
      if (match(tt.string)) {
        return tsParseAmbientExternalModuleDeclaration(node);
      } else if (tsCheckLineTerminatorAndMatch(tt.name, advance)) {
        return tsParseModuleOrNamespaceDeclaration(node);
      }
      break;

    case "namespace":
      if (tsCheckLineTerminatorAndMatch(tt.name, advance)) {
        if (advance) next();
        return tsParseModuleOrNamespaceDeclaration(node);
      }
      break;

    case "type":
      if (tsCheckLineTerminatorAndMatch(tt.name, advance)) {
        if (advance) next();
        return tsParseTypeAliasDeclaration(node);
      }
      break;
  }
}

function tsCheckLineTerminatorAndMatch(tokenType: TokenType, advance: boolean) {
  return (advance || match(tokenType)) && !isLineTerminator();
}

function tsTryParseGenericAsyncArrowFunction(
  startPos: number,
  startLoc: Position,
): ?N.ArrowFunctionExpression {
  const res: ?N.ArrowFunctionExpression = tsTryParseAndCatch(() => {
    const node: N.ArrowFunctionExpression = startNodeAt(startPos, startLoc);
    node.typeParameters = tsParseTypeParameters();
    // Don't use overloaded parseFunctionParams which would look for "<" again.
    original(parseFunctionParams)(node);
    node.returnType = tsTryParseTypeOrTypePredicateAnnotation();
    expect(tt.arrow);
    return node;
  });

  if (!res) {
    return undefined;
  }

  return parseArrowExpression(
    res,
    /* params are already set */ null,
    /* async */ true,
  );
}

function tsParseTypeArguments(): N.TsTypeParameterInstantiation {
  const node = startNode();
  node.params = tsInType(() =>
    // Temporarily remove a JSX parsing context, which makes us scan different tokens.
    tsInNoContext(() => {
      expectRelational("<");
      return tsParseDelimitedList(
        "TypeParametersOrArguments",
        tsParseType.bind(this),
      );
    }),
  );
  // This reads the next token after the `>` too, so do this in the enclosing context.
  // But be sure not to parse a regex in the jsx expression `<C<number> />`, so set exprAllowed = false
  state.exprAllowed = false;
  expectRelational(">");
  return finishNode(node, "TSTypeParameterInstantiation");
}

function tsIsDeclarationStart(): boolean {
  if (match(tt.name)) {
    switch (state.value) {
      case "abstract":
      case "declare":
      case "enum":
      case "interface":
      case "module":
      case "namespace":
      case "type":
        return true;
    }
  }

  return false;
}

// ======================================================
// OVERRIDES
// ======================================================

export function isExportDefaultSpecifier(): boolean {
  if (tsIsDeclarationStart()) return false;
  return original(isExportDefaultSpecifier)();
}

export function parseAssignableListItem(
  allowModifiers: ?boolean,
  decorators: N.Decorator[],
): N.Pattern | N.TSParameterProperty {
  // Store original location/position to include modifiers in range
  const startPos = state.start;
  const startLoc = state.startLoc;

  let accessibility: ?N.Accessibility;
  let readonly = false;
  if (allowModifiers) {
    accessibility = parseAccessModifier();
    readonly = !!tsParseModifier(["readonly"]);
  }

  const left = parseMaybeDefault();
  parseAssignableListItemTypes(left);
  const elt = parseMaybeDefault(left.start, left.loc.start, left);
  if (accessibility || readonly) {
    const pp: N.TSParameterProperty = startNodeAt(startPos, startLoc);
    if (decorators.length) {
      pp.decorators = decorators;
    }
    if (accessibility) pp.accessibility = accessibility;
    if (readonly) pp.readonly = readonly;
    if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
      throw raise(
        pp.start,
        "A parameter property may not be declared using a binding pattern.",
      );
    }
    pp.parameter = elt;
    return finishNode(pp, "TSParameterProperty");
  }

  if (decorators.length) {
    left.decorators = decorators;
  }

  return elt;
}

export function parseFunctionBodyAndFinish(
  node: N.BodilessFunctionOrMethodBase,
  type: string,
  isMethod?: boolean = false,
): void {
  if (match(tt.colon)) {
    node.returnType = tsParseTypeOrTypePredicateAnnotation(tt.colon);
  }

  const bodilessType =
    type === "FunctionDeclaration"
      ? "TSDeclareFunction"
      : type === "ClassMethod"
      ? "TSDeclareMethod"
      : undefined;
  if (bodilessType && !match(tt.braceL) && isLineTerminator()) {
    finishNode(node, bodilessType);
    return;
  }

  original(parseFunctionBodyAndFinish)(node, type, isMethod);
}

export function parseSubscript(
  base: N.Expression,
  startPos: number,
  startLoc: Position,
  noCalls: ?boolean,
  psState: N.ParseSubscriptState,
  maybeAsyncArrow: boolean,
): N.Expression {
  if (!hasPrecedingLineBreak() && match(tt.bang)) {
    state.exprAllowed = false;
    next();

    const nonNullExpression: N.TsNonNullExpression = startNodeAt(
      startPos,
      startLoc,
    );
    nonNullExpression.expression = base;
    return finishNode(nonNullExpression, "TSNonNullExpression");
  }

  if (isRelational("<")) {
    // tsTryParseAndCatch is expensive, so avoid if not necessary.
    // There are number of things we are going to "maybe" parse, like type arguments on
    // tagged template expressions. If any of them fail, walk it back and continue.
    const result = tsTryParseAndCatch(() => {
      if (!noCalls && atPossibleAsync(base)) {
        // Almost certainly this is a generic async function `async <T>() => ...
        // But it might be a call with a type argument `async<T>();`
        const asyncArrowFn = tsTryParseGenericAsyncArrowFunction(
          startPos,
          startLoc,
        );
        if (asyncArrowFn) {
          return asyncArrowFn;
        }
      }

      const node: N.CallExpression = startNodeAt(startPos, startLoc);
      node.callee = base;

      const typeArguments = tsParseTypeArguments();

      if (typeArguments) {
        if (!noCalls && eat(tt.parenL)) {
          // possibleAsync always false here, because we would have handled it above.
          // $FlowIgnore (won't be any undefined arguments)
          node.arguments = parseCallExpressionArguments(
            tt.parenR,
            /* possibleAsync */ false,
          );
          node.typeParameters = typeArguments;
          return finishCallExpression(node);
        } else if (match(tt.backQuote)) {
          return parseTaggedTemplateExpression(
            startPos,
            startLoc,
            base,
            psState,
            typeArguments,
          );
        }
      }

      unexpected();
    });

    if (result) return result;
  }

  return original(parseSubscript)(
    base,
    startPos,
    startLoc,
    noCalls,
    psState,
    maybeAsyncArrow,
  );
}

export function parseNewArguments(node: N.NewExpression): void {
  if (isRelational("<")) {
    // tsTryParseAndCatch is expensive, so avoid if not necessary.
    // 99% certain this is `new C<T>();`. But may be `new C < T;`, which is also legal.
    const typeParameters = tsTryParseAndCatch(() => {
      const args = tsParseTypeArguments();
      if (!match(tt.parenL)) unexpected();
      return args;
    });
    if (typeParameters) {
      node.typeParameters = typeParameters;
    }
  }

  original(parseNewArguments)(node);
}

export function parseExprOp(
  left: N.Expression,
  leftStartPos: number,
  leftStartLoc: Position,
  minPrec: number,
  noIn: ?boolean,
) {
  if (
    nonNull(tt._in.binop) > minPrec &&
    !hasPrecedingLineBreak() &&
    isContextual("as")
  ) {
    const node: N.TsAsExpression = startNodeAt(leftStartPos, leftStartLoc);
    node.expression = left;
    const _const = tsTryNextParseConstantContext();
    if (_const) {
      tsCheckLiteralForConstantContext(node.expression);
      node.typeAnnotation = _const;
    } else {
      node.typeAnnotation = tsNextThenParseType();
    }
    finishNode(node, "TSAsExpression");
    return parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
  }

  return original(parseExprOp)(left, leftStartPos, leftStartLoc, minPrec, noIn);
}

export function checkReservedWord(
  word: string, // eslint-disable-line no-unused-vars
  startLoc: number, // eslint-disable-line no-unused-vars
  checkKeywords: boolean, // eslint-disable-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  isBinding: boolean,
): void {
  // Don't bother checking for TypeScript code.
  // Strict mode words may be allowed as in `declare namespace N { const static: number; }`.
  // And we have a type checker anyway, so don't bother having the parser do it.
}

/*
Don't bother doing this check in TypeScript code because:
1. We may have a nested export statement with the same name:
  export const x = 0;
  export namespace N {
    export const x = 1;
  }
2. We have a type checker to warn us about this sort of thing.
*/
export function checkDuplicateExports() {}

export function parseImport(node: N.Node): N.AnyImport {
  if (match(tt.name) && lookahead().type === tt.eq) {
    return tsParseImportEqualsDeclaration(node);
  }
  return original(parseImport)(node);
}

export function parseExport(node: N.Node): N.AnyExport {
  if (match(tt._import)) {
    // `export import A = B;`
    expect(tt._import);
    return tsParseImportEqualsDeclaration(node, /* isExport */ true);
  } else if (eat(tt.eq)) {
    // `export = x;`
    const assign: N.TsExportAssignment = node;
    assign.expression = parseExpression();
    semicolon();
    return finishNode(assign, "TSExportAssignment");
  } else if (eatContextual("as")) {
    // `export as namespace A;`
    const decl: N.TsNamespaceExportDeclaration = node;
    // See `parseNamespaceExportDeclaration` in TypeScript's own parser
    expectContextual("namespace");
    decl.id = parseIdentifier();
    semicolon();
    return finishNode(decl, "TSNamespaceExportDeclaration");
  } else {
    return original(parseExport)(node);
  }
}

export function isAbstractClass(): boolean {
  return isContextual("abstract") && lookahead().type === tt._class;
}

export function parseExportDefaultExpression(): N.Expression | N.Declaration {
  if (isAbstractClass()) {
    const cls = startNode();
    next(); // Skip "abstract"
    parseClass(cls, true, true);
    cls.abstract = true;
    return cls;
  }

  // export default interface allowed in:
  // https://github.com/Microsoft/TypeScript/pull/16040
  if (state.value === "interface") {
    const result = tsParseDeclaration(startNode(), state.value, true);

    if (result) return result;
  }

  return original(parseExportDefaultExpression)();
}

export function parseStatementContent(
  context: ?string,
  topLevel: ?boolean,
): N.Statement {
  if (state.type === tt._const) {
    const ahead = lookahead();
    if (ahead.type === tt.name && ahead.value === "enum") {
      const node: N.TsEnumDeclaration = startNode();
      expect(tt._const);
      expectContextual("enum");
      return tsParseEnumDeclaration(node, /* isConst */ true);
    }
  }
  return original(parseStatementContent)(context, topLevel);
}

function parseAccessModifier(): ?N.Accessibility {
  return tsParseModifier(["public", "protected", "private"]);
}

export function parseClassMember(
  classBody: N.ClassBody,
  member: any,
  state: { hadConstructor: boolean },
  constructorAllowsSuper: boolean,
): void {
  const accessibility = parseAccessModifier();
  if (accessibility) member.accessibility = accessibility;

  original(parseClassMember)(classBody, member, state, constructorAllowsSuper);
}

export function parseClassMemberWithIsStatic(
  classBody: N.ClassBody,
  member: any,
  state: { hadConstructor: boolean },
  isStatic: boolean,
  constructorAllowsSuper: boolean,
): void {
  const methodOrProp: N.ClassMethod | N.ClassProperty = member;
  const prop: N.ClassProperty = member;
  const propOrIdx: N.ClassProperty | N.TsIndexSignature = member;

  let abstract = false,
    readonly = false;

  const mod = tsParseModifier(["abstract", "readonly"]);
  switch (mod) {
    case "readonly":
      readonly = true;
      abstract = !!tsParseModifier(["abstract"]);
      break;
    case "abstract":
      abstract = true;
      readonly = !!tsParseModifier(["readonly"]);
      break;
  }

  if (abstract) methodOrProp.abstract = true;
  if (readonly) propOrIdx.readonly = true;

  if (!abstract && !isStatic && !methodOrProp.accessibility) {
    const idx = tsTryParseIndexSignature(member);
    if (idx) {
      classBody.body.push(idx);
      return;
    }
  }

  if (readonly) {
    // Must be a property (if not an index signature).
    methodOrProp.static = isStatic;
    parseClassPropertyName(prop);
    parsePostMemberNameModifiers(methodOrProp);
    pushClassProperty(classBody, prop);
    return;
  }

  original(parseClassMemberWithIsStatic)(
    classBody,
    member,
    state,
    isStatic,
    constructorAllowsSuper,
  );
}

export function parsePostMemberNameModifiers(
  methodOrProp: N.ClassMethod | N.ClassProperty,
): void {
  const optional = eat(tt.question);
  if (optional) methodOrProp.optional = true;
}

// Note: The reason we do this in `parseExpressionStatement` and not `parseStatement`
// is that e.g. `type()` is valid JS, so we must try parsing that first.
// If it's really a type, we will parse `type` as the statement, and can correct it here
// by parsing the rest.
export function parseExpressionStatement(
  node: N.ExpressionStatement,
  expr: N.Expression,
): N.Statement {
  const decl =
    expr.type === "Identifier"
      ? tsParseExpressionStatement(node, expr)
      : undefined;
  return decl || original(parseExpressionStatement)(node, expr);
}

// export type
// Should be true for anything parsed by `tsTryParseExportDeclaration`.
export function shouldParseExportDeclaration(): boolean {
  if (tsIsDeclarationStart()) return true;
  return original(shouldParseExportDeclaration)();
}

// An apparent conditional expression could actually be an optional parameter in an arrow function.
export function parseConditional(
  expr: N.Expression,
  noIn: ?boolean,
  startPos: number,
  startLoc: Position,
  refNeedsArrowPos?: ?Pos,
): N.Expression {
  // only do the expensive clone if there is a question mark
  // and if we come from inside parens
  if (!refNeedsArrowPos || !match(tt.question)) {
    return original(parseConditional)(
      expr,
      noIn,
      startPos,
      startLoc,
      refNeedsArrowPos,
    );
  }

  const oldState = state.clone();
  try {
    return original(parseConditional)(expr, noIn, startPos, startLoc);
  } catch (err) {
    if (!(err instanceof SyntaxError)) {
      // istanbul ignore next: no such error is expected
      throw err;
    }

    resetState(oldState);
    refNeedsArrowPos.start = err.pos || state.start;
    return expr;
  }
}

// Note: These "type casts" are *not* valid TS expressions.
// But we parse them here and change them when completing the arrow function.
export function parseParenItem(
  node: N.Expression,
  startPos: number,
  startLoc: Position,
): N.Expression {
  node = original(parseParenItem)(node, startPos, startLoc);
  if (eat(tt.question)) {
    node.optional = true;
  }

  if (match(tt.colon)) {
    const typeCastNode: N.TsTypeCastExpression = startNodeAt(
      startPos,
      startLoc,
    );
    typeCastNode.expression = node;
    typeCastNode.typeAnnotation = tsParseTypeAnnotation();

    return finishNode(typeCastNode, "TSTypeCastExpression");
  }

  return finishNode(node, node.type);
}

export function parseExportDeclaration(
  node: N.ExportNamedDeclaration,
): ?N.Declaration {
  // Store original location/position
  const startPos = state.start;
  const startLoc = state.startLoc;

  // "export declare" is equivalent to just "export".
  const isDeclare = eatContextual("declare");

  let declaration: ?N.Declaration;

  if (match(tt.name)) {
    declaration = tsTryParseExportDeclaration();
  }
  if (!declaration) {
    declaration = original(parseExportDeclaration)(node);
  }

  if (declaration && isDeclare) {
    // Reset location to include `declare` in range
    resetStartLocation(declaration, startPos, startLoc);

    declaration.declare = true;
  }

  return declaration;
}

export function parseClassId(
  node: N.Class,
  isStatement: boolean,
  optionalId: ?boolean,
): void {
  if ((!isStatement || optionalId) && isContextual("implements")) {
    return;
  }

  original(parseClassId)(...arguments);
  const typeParameters = tsTryParseTypeParameters();
  if (typeParameters) node.typeParameters = typeParameters;
}

export function parseClassProperty(node: N.ClassProperty): N.ClassProperty {
  if (!node.optional && eat(tt.bang)) {
    node.definite = true;
  }

  const type = tsTryParseTypeAnnotation();
  if (type) node.typeAnnotation = type;
  return original(parseClassProperty)(node);
}

export function pushClassMethod(
  classBody: N.ClassBody,
  method: N.ClassMethod,
  isGenerator: boolean,
  isAsync: boolean,
  isConstructor: boolean,
  allowsDirectSuper: boolean,
): void {
  const typeParameters = tsTryParseTypeParameters();
  if (typeParameters) method.typeParameters = typeParameters;
  original(pushClassMethod)(
    classBody,
    method,
    isGenerator,
    isAsync,
    isConstructor,
    allowsDirectSuper,
  );
}

export function pushClassPrivateMethod(
  classBody: N.ClassBody,
  method: N.ClassPrivateMethod,
  isGenerator: boolean,
  isAsync: boolean,
): void {
  const typeParameters = tsTryParseTypeParameters();
  if (typeParameters) method.typeParameters = typeParameters;
  original(pushClassPrivateMethod)(classBody, method, isGenerator, isAsync);
}

export function parseClassSuper(node: N.Class): void {
  original(parseClassSuper)(node);
  if (node.superClass && isRelational("<")) {
    node.superTypeParameters = tsParseTypeArguments();
  }
  if (eatContextual("implements")) {
    node.implements = tsParseHeritageClause("implements");
  }
}

export function parseObjPropValue(prop: N.ObjectMember): void {
  const typeParameters = tsTryParseTypeParameters();
  if (typeParameters) prop.typeParameters = typeParameters;

  original(parseObjPropValue)(...arguments);
}

export function parseFunctionParams(
  node: N.Function,
  allowModifiers?: boolean,
): void {
  const typeParameters = tsTryParseTypeParameters();
  if (typeParameters) node.typeParameters = typeParameters;
  original(parseFunctionParams)(node, allowModifiers);
}

// `let x: number;`
export function parseVarId(
  decl: N.VariableDeclarator,
  kind: "var" | "let" | "const",
): void {
  original(parseVarId)(decl, kind);
  if (decl.id.type === "Identifier" && eat(tt.bang)) {
    decl.definite = true;
  }

  const type = tsTryParseTypeAnnotation();
  if (type) {
    decl.id.typeAnnotation = type;
    finishNode(decl.id, decl.id.type); // set end position to end of type
  }
}

// parse the return type of an async arrow function - let foo = (async (): number => {});
export function parseAsyncArrowFromCallExpression(
  node: N.ArrowFunctionExpression,
  call: N.CallExpression,
): N.ArrowFunctionExpression {
  if (match(tt.colon)) {
    node.returnType = tsParseTypeAnnotation();
  }
  return original(parseAsyncArrowFromCallExpression)(node, call);
}

export function parseMaybeAssign(): N.Expression {
  // Note: When the JSX plugin is on, type assertions (`<T> x`) aren't valid syntax.

  let jsxError: ?SyntaxError;

  if (match(tt.jsxTagStart)) {
    const context = curContext();
    assert(context === ct.j_oTag);
    // Only time j_oTag is pushed is right after j_expr.
    assert(state.context[state.context.length - 2] === ct.j_expr);

    // Prefer to parse JSX if possible. But may be an arrow fn.
    const oldState = state.clone();
    try {
      return original(parseMaybeAssign)(...arguments);
    } catch (err) {
      if (!(err instanceof SyntaxError)) {
        // istanbul ignore next: no such error is expected
        throw err;
      }

      resetState(oldState);
      // Pop the context added by the jsxTagStart.
      assert(curContext() === ct.j_oTag);
      state.context.pop();
      assert(curContext() === ct.j_expr);
      state.context.pop();
      jsxError = err;
    }
  }

  if (jsxError === undefined && !isRelational("<")) {
    return original(parseMaybeAssign)(...arguments);
  }

  // Either way, we're looking at a '<': tt.jsxTagStart or relational.

  let arrowExpression;
  let typeParameters: N.TsTypeParameterDeclaration;
  const oldState = state.clone();
  try {
    // This is similar to TypeScript's `tryParseParenthesizedArrowFunctionExpression`.
    typeParameters = tsParseTypeParameters();
    arrowExpression = original(parseMaybeAssign)(...arguments);
    if (
      arrowExpression.type !== "ArrowFunctionExpression" ||
      (arrowExpression.extra && arrowExpression.extra.parenthesized)
    ) {
      unexpected(); // Go to the catch block (needs a SyntaxError).
    }
  } catch (err) {
    if (!(err instanceof SyntaxError)) {
      // istanbul ignore next: no such error is expected
      throw err;
    }

    if (jsxError) {
      throw jsxError;
    }

    // Try parsing a type cast instead of an arrow function.
    // This will never happen outside of JSX.
    // (Because in JSX the '<' should be a jsxTagStart and not a relational.
    assert(!hasPlugin("jsx"));
    // Parsing an arrow function failed, so try a type cast.
    resetState(oldState);
    // This will start with a type assertion (via parseMaybeUnary).
    // But don't directly call `tsParseTypeAssertion` because we want to handle any binary after it.
    return original(parseMaybeAssign)(...arguments);
  }

  // Correct TypeScript code should have at least 1 type parameter, but don't crash on bad code.
  if (typeParameters && typeParameters.params.length !== 0) {
    resetStartLocationFromNode(arrowExpression, typeParameters);
  }
  arrowExpression.typeParameters = typeParameters;
  return arrowExpression;
}

// Handle type assertions
export function parseMaybeUnary(refShorthandDefaultPos?: ?Pos): N.Expression {
  if (!hasPlugin("jsx") && isRelational("<")) {
    return tsParseTypeAssertion();
  } else {
    return original(parseMaybeUnary)(refShorthandDefaultPos);
  }
}

export function parseArrow(
  node: N.ArrowFunctionExpression,
): ?N.ArrowFunctionExpression {
  if (match(tt.colon)) {
    // This is different from how the TS parser does it.
    // TS uses lookahead. The Babel Parser parses it as a parenthesized expression and converts.
    const oldState = state.clone();
    try {
      const returnType = tsParseTypeOrTypePredicateAnnotation(tt.colon);
      if (canInsertSemicolon()) unexpected();
      if (!match(tt.arrow)) unexpected();
      node.returnType = returnType;
    } catch (err) {
      if (err instanceof SyntaxError) {
        resetState(oldState);
      } else {
        // istanbul ignore next: no such error is expected
        throw err;
      }
    }
  }

  return original(parseArrow)(node);
}

// Allow type annotations inside of a parameter list.
export function parseAssignableListItemTypes(param: N.Pattern) {
  if (eat(tt.question)) {
    if (param.type !== "Identifier") {
      throw raise(
        param.start,
        "A binding pattern parameter cannot be optional in an implementation signature.",
      );
    }

    param.optional = true;
  }
  const type = tsTryParseTypeAnnotation();
  if (type) param.typeAnnotation = type;
  return finishNode(param, param.type);
}

export function toAssignable(
  node: N.Node,
  isBinding: ?boolean,
  contextDescription: string,
): N.Node {
  switch (node.type) {
    case "TSTypeCastExpression":
      return original(toAssignable)(
        typeCastToParameter(node),
        isBinding,
        contextDescription,
      );
    case "TSParameterProperty":
      return original(toAssignable)(node, isBinding, contextDescription);
    case "TSAsExpression":
    case "TSNonNullExpression":
    case "TSTypeAssertion":
      node.expression = toAssignable(
        node.expression,
        isBinding,
        contextDescription,
      );
      return node;
    default:
      return original(toAssignable)(node, isBinding, contextDescription);
  }
}

export function checkLVal(
  expr: N.Expression,
  bindingType: ?BindingTypes = BIND_NONE,
  checkClashes: ?{ [key: string]: boolean },
  contextDescription: string,
): void {
  switch (expr.type) {
    case "TSTypeCastExpression":
      // Allow "typecasts" to appear on the left of assignment expressions,
      // because it may be in an arrow function.
      // e.g. `const f = (foo: number = 0) => foo;`
      return;
    case "TSParameterProperty":
      checkLVal(
        expr.parameter,
        bindingType,
        checkClashes,
        "parameter property",
      );
      return;
    case "TSAsExpression":
    case "TSNonNullExpression":
    case "TSTypeAssertion":
      checkLVal(expr.expression, bindingType, checkClashes, contextDescription);
      return;
    default:
      original(checkLVal)(expr, bindingType, checkClashes, contextDescription);
      return;
  }
}

export function parseBindingAtom(): N.Pattern {
  switch (state.type) {
    case tt._this:
      // "this" may be the name of a parameter, so allow it.
      return parseIdentifier(/* liberal */ true);
    default:
      return original(parseBindingAtom)();
  }
}

export function parseMaybeDecoratorArguments(expr: N.Expression): N.Expression {
  if (isRelational("<")) {
    const typeArguments = tsParseTypeArguments();

    if (match(tt.parenL)) {
      const call = original(parseMaybeDecoratorArguments)(expr);
      call.typeParameters = typeArguments;
      return call;
    }

    unexpected(state.start, tt.parenL);
  }

  return original(parseMaybeDecoratorArguments)(expr);
}

// === === === === === === === === === === === === === === === ===
// Note: All below methods are duplicates of something in flow.js.
// Not sure what the best way to combine these is.
// === === === === === === === === === === === === === === === ===
export function isClassMethod(): boolean {
  return isRelational("<") || original(isClassMethod)();
}

export function isClassProperty(): boolean {
  return match(tt.bang) || match(tt.colon) || original(isClassProperty)();
}

export function parseMaybeDefault(...args: *): N.Pattern {
  const node = original(parseMaybeDefault)(...args);

  if (
    node.type === "AssignmentPattern" &&
    node.typeAnnotation &&
    node.right.start < node.typeAnnotation.start
  ) {
    raise(
      node.typeAnnotation.start,
      "Type annotations must come before default assignments, " +
        "e.g. instead of `age = 25: number` use `age: number = 25`",
    );
  }

  return node;
}

// ensure that inside types, we bypass the jsx parser plugin
export function getTokenFromCode(code: number): void {
  if (state.inType && (code === 62 || code === 60)) {
    return finishOp(tt.relational, 1);
  } else {
    return original(getTokenFromCode)(code);
  }
}

export function toAssignableList(
  exprList: N.Expression[],
  isBinding: ?boolean,
  contextDescription: string,
): $ReadOnlyArray<N.Pattern> {
  for (let i = 0; i < exprList.length; i++) {
    const expr = exprList[i];
    if (!expr) continue;
    switch (expr.type) {
      case "TSTypeCastExpression":
        exprList[i] = typeCastToParameter(expr);
        break;
      case "TSAsExpression":
      case "TSTypeAssertion":
        raise(expr.start, "Unexpected type cast in parameter position.");
        break;
    }
  }
  return original(toAssignableList)(exprList, isBinding, contextDescription);
}

function typeCastToParameter(node: N.TsTypeCastExpression): N.Node {
  node.expression.typeAnnotation = node.typeAnnotation;

  return finishNodeAt(
    node.expression,
    node.expression.type,
    node.typeAnnotation.end,
    node.typeAnnotation.loc.end,
  );
}

export function toReferencedList(
  exprList: $ReadOnlyArray<?N.Expression>,
  isInParens?: boolean, // eslint-disable-line no-unused-vars
): $ReadOnlyArray<?N.Expression> {
  for (let i = 0; i < exprList.length; i++) {
    const expr = exprList[i];
    if (expr && expr._exprListItem && expr.type === "TsTypeCastExpression") {
      raise(expr.start, "Did not expect a type annotation here.");
    }
  }

  return exprList;
}

export function shouldParseArrow() {
  return match(tt.colon) || original(shouldParseArrow)();
}

export function shouldParseAsyncArrow(): boolean {
  return match(tt.colon) || original(shouldParseAsyncArrow)();
}

export function canHaveLeadingDecorator() {
  // Avoid unnecessary lookahead in checking for abstract class unless needed!
  return original(canHaveLeadingDecorator)() || isAbstractClass();
}

export function jsxParseOpeningElementAfterName(
  node: N.JSXOpeningElement,
): N.JSXOpeningElement {
  const typeArguments = tsTryParseAndCatch(() => tsParseTypeArguments());
  if (typeArguments) node.typeParameters = typeArguments;
  return original(jsxParseOpeningElementAfterName)(node);
}

export function getGetterSetterExpectedParamCount(
  method: N.ObjectMethod | N.ClassMethod,
): number {
  const baseCount = original(getGetterSetterExpectedParamCount)(method);
  const firstParam = method.params[0];
  const hasContextParam =
    firstParam &&
    firstParam.type === "Identifier" &&
    firstParam.name === "this";

  return hasContextParam ? baseCount + 1 : baseCount;
}
