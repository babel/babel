// @flow

import type { TokenType } from "../tokenizer/types";
import { types as tt } from "../tokenizer/types";
import { types as ct } from "../tokenizer/context";
import * as N from "../types";
import type { Pos, Position } from "../util/location";
import Parser from "../parser";

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

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    tsIsIdentifier(): boolean {
      // TODO: actually a bit more complex in TypeScript, but shouldn't matter.
      // See https://github.com/Microsoft/TypeScript/issues/15008
      return this.match(tt.name);
    }

    tsNextTokenCanFollowModifier() {
      // Note: TypeScript's implementation is much more complicated because
      // more things are considered modifiers there.
      // This implementation only handles modifiers not handled by @babel/parser itself. And "static".
      // TODO: Would be nice to avoid lookahead. Want a hasLineBreakUpNext() method...
      this.next();
      return (
        !this.hasPrecedingLineBreak() &&
        !this.match(tt.parenL) &&
        !this.match(tt.parenR) &&
        !this.match(tt.colon) &&
        !this.match(tt.eq) &&
        !this.match(tt.question)
      );
    }

    /** Parses a modifier matching one the given modifier names. */
    tsParseModifier<T: TsModifier>(allowedModifiers: T[]): ?T {
      if (!this.match(tt.name)) {
        return undefined;
      }

      const modifier = this.state.value;
      if (
        allowedModifiers.indexOf(modifier) !== -1 &&
        this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))
      ) {
        return modifier;
      }
      return undefined;
    }

    tsIsListTerminator(kind: ParsingContext): boolean {
      switch (kind) {
        case "EnumMembers":
        case "TypeMembers":
          return this.match(tt.braceR);
        case "HeritageClauseElement":
          return this.match(tt.braceL);
        case "TupleElementTypes":
          return this.match(tt.bracketR);
        case "TypeParametersOrArguments":
          return this.isRelational(">");
      }

      throw new Error("Unreachable");
    }

    tsParseList<T: N.Node>(kind: ParsingContext, parseElement: () => T): T[] {
      const result: T[] = [];
      while (!this.tsIsListTerminator(kind)) {
        // Skipping "parseListElement" from the TS source since that's just for error handling.
        result.push(parseElement());
      }
      return result;
    }

    tsParseDelimitedList<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => T,
    ): T[] {
      return nonNull(
        this.tsParseDelimitedListWorker(
          kind,
          parseElement,
          /* expectSuccess */ true,
        ),
      );
    }

    tsTryParseDelimitedList<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => ?T,
    ): ?(T[]) {
      return this.tsParseDelimitedListWorker(
        kind,
        parseElement,
        /* expectSuccess */ false,
      );
    }

    /**
     * If !expectSuccess, returns undefined instead of failing to parse.
     * If expectSuccess, parseElement should always return a defined value.
     */
    tsParseDelimitedListWorker<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => ?T,
      expectSuccess: boolean,
    ): ?(T[]) {
      const result = [];

      while (true) {
        if (this.tsIsListTerminator(kind)) {
          break;
        }

        const element = parseElement();
        if (element == null) {
          return undefined;
        }
        result.push(element);

        if (this.eat(tt.comma)) {
          continue;
        }

        if (this.tsIsListTerminator(kind)) {
          break;
        }

        if (expectSuccess) {
          // This will fail with an error about a missing comma
          this.expect(tt.comma);
        }
        return undefined;
      }

      return result;
    }

    tsParseBracketedList<T: N.Node>(
      kind: ParsingContext,
      parseElement: () => T,
      bracket: boolean,
      skipFirstToken: boolean,
    ): T[] {
      if (!skipFirstToken) {
        if (bracket) {
          this.expect(tt.bracketL);
        } else {
          this.expectRelational("<");
        }
      }

      const result = this.tsParseDelimitedList(kind, parseElement);

      if (bracket) {
        this.expect(tt.bracketR);
      } else {
        this.expectRelational(">");
      }

      return result;
    }

    tsParseImportType(): N.TsImportType {
      const node: N.TsImportType = this.startNode();
      this.expect(tt._import);
      this.expect(tt.parenL);
      if (!this.match(tt.string)) {
        throw this.unexpected(
          null,
          "Argument in a type import must be a string literal",
        );
      }
      node.argument = this.parseLiteral(this.state.value, "StringLiteral");
      this.expect(tt.parenR);

      if (this.eat(tt.dot)) {
        node.qualifier = this.tsParseEntityName(/* allowReservedWords */ true);
      }
      if (this.isRelational("<")) {
        node.typeParameters = this.tsParseTypeArguments();
      }
      return this.finishNode(node, "TSImportType");
    }

    tsParseEntityName(allowReservedWords: boolean): N.TsEntityName {
      let entity: N.TsEntityName = this.parseIdentifier();
      while (this.eat(tt.dot)) {
        const node: N.TsQualifiedName = this.startNodeAtNode(entity);
        node.left = entity;
        node.right = this.parseIdentifier(allowReservedWords);
        entity = this.finishNode(node, "TSQualifiedName");
      }
      return entity;
    }

    tsParseTypeReference(): N.TsTypeReference {
      const node: N.TsTypeReference = this.startNode();
      node.typeName = this.tsParseEntityName(/* allowReservedWords */ false);
      if (!this.hasPrecedingLineBreak() && this.isRelational("<")) {
        node.typeParameters = this.tsParseTypeArguments();
      }
      return this.finishNode(node, "TSTypeReference");
    }

    tsParseThisTypePredicate(lhs: N.TsThisType): N.TsTypePredicate {
      this.next();
      const node: N.TsTypePredicate = this.startNodeAtNode(lhs);
      node.parameterName = lhs;
      node.typeAnnotation = this.tsParseTypeAnnotation(/* eatColon */ false);
      return this.finishNode(node, "TSTypePredicate");
    }

    tsParseThisTypeNode(): N.TsThisType {
      const node: N.TsThisType = this.startNode();
      this.next();
      return this.finishNode(node, "TSThisType");
    }

    tsParseTypeQuery(): N.TsTypeQuery {
      const node: N.TsTypeQuery = this.startNode();
      this.expect(tt._typeof);
      if (this.match(tt._import)) {
        node.exprName = this.tsParseImportType();
      } else {
        node.exprName = this.tsParseEntityName(/* allowReservedWords */ true);
      }
      return this.finishNode(node, "TSTypeQuery");
    }

    tsParseTypeParameter(): N.TsTypeParameter {
      const node: N.TsTypeParameter = this.startNode();
      node.name = this.parseIdentifierName(node.start);
      node.constraint = this.tsEatThenParseType(tt._extends);
      node.default = this.tsEatThenParseType(tt.eq);
      return this.finishNode(node, "TSTypeParameter");
    }

    tsTryParseTypeParameters(): ?N.TsTypeParameterDeclaration {
      if (this.isRelational("<")) {
        return this.tsParseTypeParameters();
      }
    }

    tsParseTypeParameters() {
      const node: N.TsTypeParameterDeclaration = this.startNode();

      if (this.isRelational("<") || this.match(tt.jsxTagStart)) {
        this.next();
      } else {
        this.unexpected();
      }

      node.params = this.tsParseBracketedList(
        "TypeParametersOrArguments",
        this.tsParseTypeParameter.bind(this),
        /* bracket */ false,
        /* skipFirstToken */ true,
      );
      return this.finishNode(node, "TSTypeParameterDeclaration");
    }

    // Note: In TypeScript implementation we must provide `yieldContext` and `awaitContext`,
    // but here it's always false, because this is only used for types.
    tsFillSignature(
      returnToken: TokenType,
      signature: N.TsSignatureDeclaration,
    ): void {
      // Arrow fns *must* have return token (`=>`). Normal functions can omit it.
      const returnTokenRequired = returnToken === tt.arrow;
      signature.typeParameters = this.tsTryParseTypeParameters();
      this.expect(tt.parenL);
      signature.parameters = this.tsParseBindingListForSignature();
      if (returnTokenRequired) {
        signature.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(
          returnToken,
        );
      } else if (this.match(returnToken)) {
        signature.typeAnnotation = this.tsParseTypeOrTypePredicateAnnotation(
          returnToken,
        );
      }
    }

    tsParseBindingListForSignature(): $ReadOnlyArray<
      N.Identifier | N.RestElement | N.ObjectPattern,
    > {
      return this.parseBindingList(tt.parenR).map(pattern => {
        if (
          pattern.type !== "Identifier" &&
          pattern.type !== "RestElement" &&
          pattern.type !== "ObjectPattern"
        ) {
          throw this.unexpected(
            pattern.start,
            `Name in a signature must be an Identifier or ObjectPattern, instead got ${
              pattern.type
            }`,
          );
        }
        return pattern;
      });
    }

    tsParseTypeMemberSemicolon(): void {
      if (!this.eat(tt.comma)) {
        this.semicolon();
      }
    }

    tsParseSignatureMember(
      kind: "TSCallSignatureDeclaration" | "TSConstructSignatureDeclaration",
    ): N.TsCallSignatureDeclaration | N.TsConstructSignatureDeclaration {
      const node:
        | N.TsCallSignatureDeclaration
        | N.TsConstructSignatureDeclaration = this.startNode();
      if (kind === "TSConstructSignatureDeclaration") {
        this.expect(tt._new);
      }
      this.tsFillSignature(tt.colon, node);
      this.tsParseTypeMemberSemicolon();
      return this.finishNode(node, kind);
    }

    tsIsUnambiguouslyIndexSignature() {
      this.next(); // Skip '{'
      return this.eat(tt.name) && this.match(tt.colon);
    }

    tsTryParseIndexSignature(node: N.TsIndexSignature): ?N.TsIndexSignature {
      if (
        !(
          this.match(tt.bracketL) &&
          this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this))
        )
      ) {
        return undefined;
      }

      this.expect(tt.bracketL);
      const id = this.parseIdentifier();
      id.typeAnnotation = this.tsParseTypeAnnotation();
      this.finishNode(id, "Identifier"); // set end position to end of type

      this.expect(tt.bracketR);
      node.parameters = [id];

      const type = this.tsTryParseTypeAnnotation();
      if (type) node.typeAnnotation = type;
      this.tsParseTypeMemberSemicolon();
      return this.finishNode(node, "TSIndexSignature");
    }

    tsParsePropertyOrMethodSignature(
      node: N.TsPropertySignature | N.TsMethodSignature,
      readonly: boolean,
    ): N.TsPropertySignature | N.TsMethodSignature {
      this.parsePropertyName(node);
      if (this.eat(tt.question)) node.optional = true;
      const nodeAny: any = node;

      if (!readonly && (this.match(tt.parenL) || this.isRelational("<"))) {
        const method: N.TsMethodSignature = nodeAny;
        this.tsFillSignature(tt.colon, method);
        this.tsParseTypeMemberSemicolon();
        return this.finishNode(method, "TSMethodSignature");
      } else {
        const property: N.TsPropertySignature = nodeAny;
        if (readonly) property.readonly = true;
        const type = this.tsTryParseTypeAnnotation();
        if (type) property.typeAnnotation = type;
        this.tsParseTypeMemberSemicolon();
        return this.finishNode(property, "TSPropertySignature");
      }
    }

    tsParseTypeMember(): N.TsTypeElement {
      if (this.match(tt.parenL) || this.isRelational("<")) {
        return this.tsParseSignatureMember("TSCallSignatureDeclaration");
      }
      if (
        this.match(tt._new) &&
        this.tsLookAhead(this.tsIsStartOfConstructSignature.bind(this))
      ) {
        return this.tsParseSignatureMember("TSConstructSignatureDeclaration");
      }
      // Instead of fullStart, we create a node here.
      const node: any = this.startNode();
      const readonly = !!this.tsParseModifier(["readonly"]);

      const idx = this.tsTryParseIndexSignature(node);
      if (idx) {
        if (readonly) node.readonly = true;
        return idx;
      }
      return this.tsParsePropertyOrMethodSignature(node, readonly);
    }

    tsIsStartOfConstructSignature() {
      this.next();
      return this.match(tt.parenL) || this.isRelational("<");
    }

    tsParseTypeLiteral(): N.TsTypeLiteral {
      const node: N.TsTypeLiteral = this.startNode();
      node.members = this.tsParseObjectTypeMembers();
      return this.finishNode(node, "TSTypeLiteral");
    }

    tsParseObjectTypeMembers(): $ReadOnlyArray<N.TsTypeElement> {
      this.expect(tt.braceL);
      const members = this.tsParseList(
        "TypeMembers",
        this.tsParseTypeMember.bind(this),
      );
      this.expect(tt.braceR);
      return members;
    }

    tsIsStartOfMappedType(): boolean {
      this.next();
      if (this.eat(tt.plusMin)) {
        return this.isContextual("readonly");
      }
      if (this.isContextual("readonly")) {
        this.next();
      }
      if (!this.match(tt.bracketL)) {
        return false;
      }
      this.next();
      if (!this.tsIsIdentifier()) {
        return false;
      }
      this.next();
      return this.match(tt._in);
    }

    tsParseMappedTypeParameter(): N.TsTypeParameter {
      const node: N.TsTypeParameter = this.startNode();
      node.name = this.parseIdentifierName(node.start);
      node.constraint = this.tsExpectThenParseType(tt._in);
      return this.finishNode(node, "TSTypeParameter");
    }

    tsParseMappedType(): N.TsMappedType {
      const node: N.TsMappedType = this.startNode();

      this.expect(tt.braceL);

      if (this.match(tt.plusMin)) {
        node.readonly = this.state.value;
        this.next();
        this.expectContextual("readonly");
      } else if (this.eatContextual("readonly")) {
        node.readonly = true;
      }

      this.expect(tt.bracketL);
      node.typeParameter = this.tsParseMappedTypeParameter();
      this.expect(tt.bracketR);

      if (this.match(tt.plusMin)) {
        node.optional = this.state.value;
        this.next();
        this.expect(tt.question);
      } else if (this.eat(tt.question)) {
        node.optional = true;
      }

      node.typeAnnotation = this.tsTryParseType();
      this.semicolon();
      this.expect(tt.braceR);

      return this.finishNode(node, "TSMappedType");
    }

    tsParseTupleType(): N.TsTupleType {
      const node: N.TsTupleType = this.startNode();
      node.elementTypes = this.tsParseBracketedList(
        "TupleElementTypes",
        this.tsParseTupleElementType.bind(this),
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
          this.raise(
            elementNode.start,
            "A required element cannot follow an optional element.",
          );
        }
      });

      return this.finishNode(node, "TSTupleType");
    }

    tsParseTupleElementType(): N.TsType {
      // parses `...TsType[]`
      if (this.match(tt.ellipsis)) {
        const restNode: N.TsRestType = this.startNode();
        this.next(); // skips ellipsis
        restNode.typeAnnotation = this.tsParseType();
        this.checkCommaAfterRest(tt.bracketR, "type");
        return this.finishNode(restNode, "TSRestType");
      }

      const type = this.tsParseType();
      // parses `TsType?`
      if (this.eat(tt.question)) {
        const optionalTypeNode: N.TsOptionalType = this.startNodeAtNode(type);
        optionalTypeNode.typeAnnotation = type;
        return this.finishNode(optionalTypeNode, "TSOptionalType");
      }
      return type;
    }

    tsParseParenthesizedType(): N.TsParenthesizedType {
      const node = this.startNode();
      this.expect(tt.parenL);
      node.typeAnnotation = this.tsParseType();
      this.expect(tt.parenR);
      return this.finishNode(node, "TSParenthesizedType");
    }

    tsParseFunctionOrConstructorType(
      type: "TSFunctionType" | "TSConstructorType",
    ): N.TsFunctionOrConstructorType {
      const node: N.TsFunctionOrConstructorType = this.startNode();
      if (type === "TSConstructorType") {
        this.expect(tt._new);
      }
      this.tsFillSignature(tt.arrow, node);
      return this.finishNode(node, type);
    }

    tsParseLiteralTypeNode(): N.TsLiteralType {
      const node: N.TsLiteralType = this.startNode();
      node.literal = (() => {
        switch (this.state.type) {
          case tt.num:
            return this.parseLiteral(this.state.value, "NumericLiteral");
          case tt.string:
            return this.parseLiteral(this.state.value, "StringLiteral");
          case tt._true:
          case tt._false:
            return this.parseBooleanLiteral();
          default:
            throw this.unexpected();
        }
      })();
      return this.finishNode(node, "TSLiteralType");
    }

    tsParseNonArrayType(): N.TsType {
      switch (this.state.type) {
        case tt.name:
        case tt._void:
        case tt._null: {
          const type = this.match(tt._void)
            ? "TSVoidKeyword"
            : this.match(tt._null)
            ? "TSNullKeyword"
            : keywordTypeFromName(this.state.value);
          if (type !== undefined && this.lookahead().type !== tt.dot) {
            const node: N.TsKeywordType = this.startNode();
            this.next();
            return this.finishNode(node, type);
          }
          return this.tsParseTypeReference();
        }
        case tt.string:
        case tt.num:
        case tt._true:
        case tt._false:
          return this.tsParseLiteralTypeNode();
        case tt.plusMin:
          if (this.state.value === "-") {
            const node: N.TsLiteralType = this.startNode();
            this.next();
            if (!this.match(tt.num)) {
              throw this.unexpected();
            }
            node.literal = this.parseLiteral(
              -this.state.value,
              "NumericLiteral",
              node.start,
              node.loc.start,
            );
            return this.finishNode(node, "TSLiteralType");
          }
          break;
        case tt._this: {
          const thisKeyword = this.tsParseThisTypeNode();
          if (this.isContextual("is") && !this.hasPrecedingLineBreak()) {
            return this.tsParseThisTypePredicate(thisKeyword);
          } else {
            return thisKeyword;
          }
        }
        case tt._typeof:
          return this.tsParseTypeQuery();
        case tt._import:
          return this.tsParseImportType();
        case tt.braceL:
          return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this))
            ? this.tsParseMappedType()
            : this.tsParseTypeLiteral();
        case tt.bracketL:
          return this.tsParseTupleType();
        case tt.parenL:
          return this.tsParseParenthesizedType();
      }

      throw this.unexpected();
    }

    tsParseArrayTypeOrHigher(): N.TsType {
      let type = this.tsParseNonArrayType();
      while (!this.hasPrecedingLineBreak() && this.eat(tt.bracketL)) {
        if (this.match(tt.bracketR)) {
          const node: N.TsArrayType = this.startNodeAtNode(type);
          node.elementType = type;
          this.expect(tt.bracketR);
          type = this.finishNode(node, "TSArrayType");
        } else {
          const node: N.TsIndexedAccessType = this.startNodeAtNode(type);
          node.objectType = type;
          node.indexType = this.tsParseType();
          this.expect(tt.bracketR);
          type = this.finishNode(node, "TSIndexedAccessType");
        }
      }
      return type;
    }

    tsParseTypeOperator(operator: "keyof" | "unique"): N.TsTypeOperator {
      const node: N.TsTypeOperator = this.startNode();
      this.expectContextual(operator);
      node.operator = operator;
      node.typeAnnotation = this.tsParseTypeOperatorOrHigher();
      return this.finishNode(node, "TSTypeOperator");
    }

    tsParseInferType(): N.TsInferType {
      const node = this.startNode();
      this.expectContextual("infer");
      const typeParameter = this.startNode();
      typeParameter.name = this.parseIdentifierName(typeParameter.start);
      node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter");
      return this.finishNode(node, "TSInferType");
    }

    tsParseTypeOperatorOrHigher(): N.TsType {
      const operator = ["keyof", "unique"].find(kw => this.isContextual(kw));
      return operator
        ? this.tsParseTypeOperator(operator)
        : this.isContextual("infer")
        ? this.tsParseInferType()
        : this.tsParseArrayTypeOrHigher();
    }

    tsParseUnionOrIntersectionType(
      kind: "TSUnionType" | "TSIntersectionType",
      parseConstituentType: () => N.TsType,
      operator: TokenType,
    ): N.TsType {
      this.eat(operator);
      let type = parseConstituentType();
      if (this.match(operator)) {
        const types = [type];
        while (this.eat(operator)) {
          types.push(parseConstituentType());
        }
        const node: N.TsUnionType | N.TsIntersectionType = this.startNodeAtNode(
          type,
        );
        node.types = types;
        type = this.finishNode(node, kind);
      }
      return type;
    }

    tsParseIntersectionTypeOrHigher(): N.TsType {
      return this.tsParseUnionOrIntersectionType(
        "TSIntersectionType",
        this.tsParseTypeOperatorOrHigher.bind(this),
        tt.bitwiseAND,
      );
    }

    tsParseUnionTypeOrHigher() {
      return this.tsParseUnionOrIntersectionType(
        "TSUnionType",
        this.tsParseIntersectionTypeOrHigher.bind(this),
        tt.bitwiseOR,
      );
    }

    tsIsStartOfFunctionType() {
      if (this.isRelational("<")) {
        return true;
      }
      return (
        this.match(tt.parenL) &&
        this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this))
      );
    }

    tsSkipParameterStart(): boolean {
      if (this.match(tt.name) || this.match(tt._this)) {
        this.next();
        return true;
      }

      if (this.match(tt.braceL)) {
        let braceStackCounter = 1;
        this.next();

        while (braceStackCounter > 0) {
          if (this.match(tt.braceL)) {
            ++braceStackCounter;
          } else if (this.match(tt.braceR)) {
            --braceStackCounter;
          }
          this.next();
        }
        return true;
      }

      return false;
    }

    tsIsUnambiguouslyStartOfFunctionType(): boolean {
      this.next();
      if (this.match(tt.parenR) || this.match(tt.ellipsis)) {
        // ( )
        // ( ...
        return true;
      }
      if (this.tsSkipParameterStart()) {
        if (
          this.match(tt.colon) ||
          this.match(tt.comma) ||
          this.match(tt.question) ||
          this.match(tt.eq)
        ) {
          // ( xxx :
          // ( xxx ,
          // ( xxx ?
          // ( xxx =
          return true;
        }
        if (this.match(tt.parenR)) {
          this.next();
          if (this.match(tt.arrow)) {
            // ( xxx ) =>
            return true;
          }
        }
      }
      return false;
    }

    tsParseTypeOrTypePredicateAnnotation(
      returnToken: TokenType,
    ): N.TsTypeAnnotation {
      return this.tsInType(() => {
        const t: N.TsTypeAnnotation = this.startNode();
        this.expect(returnToken);

        const typePredicateVariable =
          this.tsIsIdentifier() &&
          this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));

        if (!typePredicateVariable) {
          return this.tsParseTypeAnnotation(/* eatColon */ false, t);
        }

        const type = this.tsParseTypeAnnotation(/* eatColon */ false);

        const node: N.TsTypePredicate = this.startNodeAtNode(
          typePredicateVariable,
        );
        node.parameterName = typePredicateVariable;
        node.typeAnnotation = type;
        t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
        return this.finishNode(t, "TSTypeAnnotation");
      });
    }

    tsTryParseTypeOrTypePredicateAnnotation(): ?N.TsTypeAnnotation {
      return this.match(tt.colon)
        ? this.tsParseTypeOrTypePredicateAnnotation(tt.colon)
        : undefined;
    }

    tsTryParseTypeAnnotation(): ?N.TsTypeAnnotation {
      return this.match(tt.colon) ? this.tsParseTypeAnnotation() : undefined;
    }

    tsTryParseType(): ?N.TsType {
      return this.tsEatThenParseType(tt.colon);
    }

    tsParseTypePredicatePrefix(): ?N.Identifier {
      const id = this.parseIdentifier();
      if (this.isContextual("is") && !this.hasPrecedingLineBreak()) {
        this.next();
        return id;
      }
    }

    tsParseTypeAnnotation(
      eatColon = true,
      t: N.TsTypeAnnotation = this.startNode(),
    ): N.TsTypeAnnotation {
      this.tsInType(() => {
        if (eatColon) this.expect(tt.colon);
        t.typeAnnotation = this.tsParseType();
      });
      return this.finishNode(t, "TSTypeAnnotation");
    }

    /** Be sure to be in a type context before calling this, using `tsInType`. */
    tsParseType(): N.TsType {
      // Need to set `state.inType` so that we don't parse JSX in a type context.
      assert(this.state.inType);
      const type = this.tsParseNonConditionalType();
      if (this.hasPrecedingLineBreak() || !this.eat(tt._extends)) {
        return type;
      }
      const node: N.TsConditionalType = this.startNodeAtNode(type);
      node.checkType = type;
      node.extendsType = this.tsParseNonConditionalType();
      this.expect(tt.question);
      node.trueType = this.tsParseType();
      this.expect(tt.colon);
      node.falseType = this.tsParseType();
      return this.finishNode(node, "TSConditionalType");
    }

    tsParseNonConditionalType(): N.TsType {
      if (this.tsIsStartOfFunctionType()) {
        return this.tsParseFunctionOrConstructorType("TSFunctionType");
      }
      if (this.match(tt._new)) {
        // As in `new () => Date`
        return this.tsParseFunctionOrConstructorType("TSConstructorType");
      }
      return this.tsParseUnionTypeOrHigher();
    }

    tsParseTypeAssertion(): N.TsTypeAssertion {
      const node: N.TsTypeAssertion = this.startNode();
      this.next(); // <
      // Not actually necessary to set state.inType because we never reach here if JSX plugin is enabled,
      // but need `tsInType` to satisfy the assertion in `tsParseType`.
      node.typeAnnotation = this.tsInType(() => this.tsParseType());
      this.expectRelational(">");
      node.expression = this.parseMaybeUnary();
      return this.finishNode(node, "TSTypeAssertion");
    }

    tsParseHeritageClause(
      descriptor: string,
    ): $ReadOnlyArray<N.TsExpressionWithTypeArguments> {
      const originalStart = this.state.start;

      const delimitedList = this.tsParseDelimitedList(
        "HeritageClauseElement",
        this.tsParseExpressionWithTypeArguments.bind(this),
      );

      if (!delimitedList.length) {
        this.raise(originalStart, `'${descriptor}' list cannot be empty.`);
      }

      return delimitedList;
    }

    tsParseExpressionWithTypeArguments(): N.TsExpressionWithTypeArguments {
      const node: N.TsExpressionWithTypeArguments = this.startNode();
      // Note: TS uses parseLeftHandSideExpressionOrHigher,
      // then has grammar errors later if it's not an EntityName.
      node.expression = this.tsParseEntityName(/* allowReservedWords */ false);
      if (this.isRelational("<")) {
        node.typeParameters = this.tsParseTypeArguments();
      }

      return this.finishNode(node, "TSExpressionWithTypeArguments");
    }

    tsParseInterfaceDeclaration(
      node: N.TsInterfaceDeclaration,
    ): N.TsInterfaceDeclaration {
      node.id = this.parseIdentifier();
      node.typeParameters = this.tsTryParseTypeParameters();
      if (this.eat(tt._extends)) {
        node.extends = this.tsParseHeritageClause("extends");
      }
      const body: N.TSInterfaceBody = this.startNode();
      body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this));
      node.body = this.finishNode(body, "TSInterfaceBody");
      return this.finishNode(node, "TSInterfaceDeclaration");
    }

    tsParseTypeAliasDeclaration(
      node: N.TsTypeAliasDeclaration,
    ): N.TsTypeAliasDeclaration {
      node.id = this.parseIdentifier();
      node.typeParameters = this.tsTryParseTypeParameters();
      node.typeAnnotation = this.tsExpectThenParseType(tt.eq);
      this.semicolon();
      return this.finishNode(node, "TSTypeAliasDeclaration");
    }

    tsInNoContext<T>(cb: () => T): T {
      const oldContext = this.state.context;
      this.state.context = [oldContext[0]];
      try {
        return cb();
      } finally {
        this.state.context = oldContext;
      }
    }

    /**
     * Runs `cb` in a type context.
     * This should be called one token *before* the first type token,
     * so that the call to `next()` is run in type context.
     */
    tsInType<T>(cb: () => T): T {
      const oldInType = this.state.inType;
      this.state.inType = true;
      try {
        return cb();
      } finally {
        this.state.inType = oldInType;
      }
    }

    tsEatThenParseType(token: TokenType): N.TsType | typeof undefined {
      return !this.match(token) ? undefined : this.tsNextThenParseType();
    }

    tsExpectThenParseType(token: TokenType): N.TsType {
      return this.tsDoThenParseType(() => this.expect(token));
    }

    tsNextThenParseType(): N.TsType {
      return this.tsDoThenParseType(() => this.next());
    }

    tsDoThenParseType(cb: () => void): N.TsType {
      return this.tsInType(() => {
        cb();
        return this.tsParseType();
      });
    }

    tsParseEnumMember(): N.TsEnumMember {
      const node: N.TsEnumMember = this.startNode();
      // Computed property names are grammar errors in an enum, so accept just string literal or identifier.
      node.id = this.match(tt.string)
        ? this.parseLiteral(this.state.value, "StringLiteral")
        : this.parseIdentifier(/* liberal */ true);
      if (this.eat(tt.eq)) {
        node.initializer = this.parseMaybeAssign();
      }
      return this.finishNode(node, "TSEnumMember");
    }

    tsParseEnumDeclaration(
      node: N.TsEnumDeclaration,
      isConst: boolean,
    ): N.TsEnumDeclaration {
      if (isConst) node.const = true;
      node.id = this.parseIdentifier();
      this.expect(tt.braceL);
      node.members = this.tsParseDelimitedList(
        "EnumMembers",
        this.tsParseEnumMember.bind(this),
      );
      this.expect(tt.braceR);
      return this.finishNode(node, "TSEnumDeclaration");
    }

    tsParseModuleBlock(): N.TsModuleBlock {
      const node: N.TsModuleBlock = this.startNode();
      this.expect(tt.braceL);
      // Inside of a module block is considered "top-level", meaning it can have imports and exports.
      this.parseBlockOrModuleBlockBody(
        (node.body = []),
        /* directives */ undefined,
        /* topLevel */ true,
        /* end */ tt.braceR,
      );
      return this.finishNode(node, "TSModuleBlock");
    }

    tsParseModuleOrNamespaceDeclaration(
      node: N.TsModuleDeclaration,
    ): N.TsModuleDeclaration {
      node.id = this.parseIdentifier();
      if (this.eat(tt.dot)) {
        const inner = this.startNode();
        this.tsParseModuleOrNamespaceDeclaration(inner);
        node.body = inner;
      } else {
        node.body = this.tsParseModuleBlock();
      }
      return this.finishNode(node, "TSModuleDeclaration");
    }

    tsParseAmbientExternalModuleDeclaration(
      node: N.TsModuleDeclaration,
    ): N.TsModuleDeclaration {
      if (this.isContextual("global")) {
        node.global = true;
        node.id = this.parseIdentifier();
      } else if (this.match(tt.string)) {
        node.id = this.parseExprAtom();
      } else {
        this.unexpected();
      }

      if (this.match(tt.braceL)) {
        node.body = this.tsParseModuleBlock();
      } else {
        this.semicolon();
      }

      return this.finishNode(node, "TSModuleDeclaration");
    }

    tsParseImportEqualsDeclaration(
      node: N.TsImportEqualsDeclaration,
      isExport?: boolean,
    ): N.TsImportEqualsDeclaration {
      node.isExport = isExport || false;
      node.id = this.parseIdentifier();
      this.expect(tt.eq);
      node.moduleReference = this.tsParseModuleReference();
      this.semicolon();
      return this.finishNode(node, "TSImportEqualsDeclaration");
    }

    tsIsExternalModuleReference(): boolean {
      return (
        this.isContextual("require") && this.lookahead().type === tt.parenL
      );
    }

    tsParseModuleReference(): N.TsModuleReference {
      return this.tsIsExternalModuleReference()
        ? this.tsParseExternalModuleReference()
        : this.tsParseEntityName(/* allowReservedWords */ false);
    }

    tsParseExternalModuleReference(): N.TsExternalModuleReference {
      const node: N.TsExternalModuleReference = this.startNode();
      this.expectContextual("require");
      this.expect(tt.parenL);
      if (!this.match(tt.string)) {
        throw this.unexpected();
      }
      node.expression = this.parseLiteral(this.state.value, "StringLiteral");
      this.expect(tt.parenR);
      return this.finishNode(node, "TSExternalModuleReference");
    }

    // Utilities

    tsLookAhead<T>(f: () => T): T {
      const state = this.state.clone();
      const res = f();
      this.state = state;
      return res;
    }

    tsTryParseAndCatch<T>(f: () => T): ?T {
      const state = this.state.clone();
      try {
        return f();
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.state = state;
          return undefined;
        }
        throw e;
      }
    }

    tsTryParse<T>(f: () => ?T): ?T {
      const state = this.state.clone();
      const result = f();
      if (result !== undefined && result !== false) {
        return result;
      } else {
        this.state = state;
        return undefined;
      }
    }

    nodeWithSamePosition<T: N.Node>(original: N.Node, type: string): T {
      const node = this.startNodeAtNode(original);
      node.type = type;
      node.end = original.end;
      node.loc.end = original.loc.end;

      if (original.leadingComments) {
        node.leadingComments = original.leadingComments;
      }
      if (original.trailingComments) {
        node.trailingComments = original.trailingComments;
      }
      if (original.innerComments) node.innerComments = original.innerComments;

      return node;
    }

    tsTryParseDeclare(nany: any): ?N.Declaration {
      if (this.isLineTerminator()) {
        return;
      }
      let starttype = this.state.type;
      let kind;

      if (this.isContextual("let")) {
        starttype = tt._var;
        kind = "let";
      }

      switch (starttype) {
        case tt._function:
          this.next();
          return this.parseFunction(nany, /* isStatement */ true);
        case tt._class:
          return this.parseClass(
            nany,
            /* isStatement */ true,
            /* optionalId */ false,
          );
        case tt._const:
          if (this.match(tt._const) && this.isLookaheadContextual("enum")) {
            // `const enum = 0;` not allowed because "enum" is a strict mode reserved word.
            this.expect(tt._const);
            this.expectContextual("enum");
            return this.tsParseEnumDeclaration(nany, /* isConst */ true);
          }
        // falls through
        case tt._var:
          kind = kind || this.state.value;
          return this.parseVarStatement(nany, kind);
        case tt.name: {
          const value = this.state.value;
          if (value === "global") {
            return this.tsParseAmbientExternalModuleDeclaration(nany);
          } else {
            return this.tsParseDeclaration(nany, value, /* next */ true);
          }
        }
      }
    }

    // Note: this won't be called unless the keyword is allowed in `shouldParseExportDeclaration`.
    tsTryParseExportDeclaration(): ?N.Declaration {
      return this.tsParseDeclaration(
        this.startNode(),
        this.state.value,
        /* next */ true,
      );
    }

    tsParseExpressionStatement(node: any, expr: N.Identifier): ?N.Declaration {
      switch (expr.name) {
        case "declare": {
          const declaration = this.tsTryParseDeclare(node);
          if (declaration) {
            declaration.declare = true;
            return declaration;
          }
          break;
        }
        case "global":
          // `global { }` (with no `declare`) may appear inside an ambient module declaration.
          // Would like to use tsParseAmbientExternalModuleDeclaration here, but already ran past "global".
          if (this.match(tt.braceL)) {
            const mod: N.TsModuleDeclaration = node;
            mod.global = true;
            mod.id = expr;
            mod.body = this.tsParseModuleBlock();
            return this.finishNode(mod, "TSModuleDeclaration");
          }
          break;

        default:
          return this.tsParseDeclaration(node, expr.name, /* next */ false);
      }
    }

    // Common to tsTryParseDeclare, tsTryParseExportDeclaration, and tsParseExpressionStatement.
    tsParseDeclaration(
      node: any,
      value: string,
      next: boolean,
    ): ?N.Declaration {
      switch (value) {
        case "abstract":
          if (this.tsCheckLineTerminatorAndMatch(tt._class, next)) {
            const cls: N.ClassDeclaration = node;
            cls.abstract = true;
            if (next) {
              this.next();
              if (!this.match(tt._class)) {
                this.unexpected(null, tt._class);
              }
            }
            return this.parseClass(
              cls,
              /* isStatement */ true,
              /* optionalId */ false,
            );
          }
          break;

        case "enum":
          if (next || this.match(tt.name)) {
            if (next) this.next();
            return this.tsParseEnumDeclaration(node, /* isConst */ false);
          }
          break;

        case "interface":
          if (this.tsCheckLineTerminatorAndMatch(tt.name, next)) {
            if (next) this.next();
            return this.tsParseInterfaceDeclaration(node);
          }
          break;

        case "module":
          if (next) this.next();
          if (this.match(tt.string)) {
            return this.tsParseAmbientExternalModuleDeclaration(node);
          } else if (this.tsCheckLineTerminatorAndMatch(tt.name, next)) {
            return this.tsParseModuleOrNamespaceDeclaration(node);
          }
          break;

        case "namespace":
          if (this.tsCheckLineTerminatorAndMatch(tt.name, next)) {
            if (next) this.next();
            return this.tsParseModuleOrNamespaceDeclaration(node);
          }
          break;

        case "type":
          if (this.tsCheckLineTerminatorAndMatch(tt.name, next)) {
            if (next) this.next();
            return this.tsParseTypeAliasDeclaration(node);
          }
          break;
      }
    }

    tsCheckLineTerminatorAndMatch(tokenType: TokenType, next: boolean) {
      return (next || this.match(tokenType)) && !this.isLineTerminator();
    }

    tsTryParseGenericAsyncArrowFunction(
      startPos: number,
      startLoc: Position,
    ): ?N.ArrowFunctionExpression {
      const res: ?N.ArrowFunctionExpression = this.tsTryParseAndCatch(() => {
        const node: N.ArrowFunctionExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        node.typeParameters = this.tsParseTypeParameters();
        // Don't use overloaded parseFunctionParams which would look for "<" again.
        super.parseFunctionParams(node);
        node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation();
        this.expect(tt.arrow);
        return node;
      });

      if (!res) {
        return undefined;
      }

      const oldInAsync = this.state.inAsync;
      const oldInGenerator = this.state.inGenerator;
      this.state.inAsync = true;
      this.state.inGenerator = false;
      res.id = null;
      res.generator = false;
      res.expression = true; // May be set again by parseFunctionBody.
      res.async = true;
      this.parseFunctionBody(res, true);
      this.state.inAsync = oldInAsync;
      this.state.inGenerator = oldInGenerator;
      return this.finishNode(res, "ArrowFunctionExpression");
    }

    tsParseTypeArguments(): N.TsTypeParameterInstantiation {
      const node = this.startNode();
      node.params = this.tsInType(() =>
        // Temporarily remove a JSX parsing context, which makes us scan different tokens.
        this.tsInNoContext(() => {
          this.expectRelational("<");
          return this.tsParseDelimitedList(
            "TypeParametersOrArguments",
            this.tsParseType.bind(this),
          );
        }),
      );
      // This reads the next token after the `>` too, so do this in the enclosing context.
      // But be sure not to parse a regex in the jsx expression `<C<number> />`, so set exprAllowed = false
      this.state.exprAllowed = false;
      this.expectRelational(">");
      return this.finishNode(node, "TSTypeParameterInstantiation");
    }

    tsIsDeclarationStart(): boolean {
      if (this.match(tt.name)) {
        switch (this.state.value) {
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

    isExportDefaultSpecifier(): boolean {
      if (this.tsIsDeclarationStart()) return false;
      return super.isExportDefaultSpecifier();
    }

    parseAssignableListItem(
      allowModifiers: ?boolean,
      decorators: N.Decorator[],
    ): N.Pattern | N.TSParameterProperty {
      // Store original location/position to include modifiers in range
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;

      let accessibility: ?N.Accessibility;
      let readonly = false;
      if (allowModifiers) {
        accessibility = this.parseAccessModifier();
        readonly = !!this.tsParseModifier(["readonly"]);
      }

      const left = this.parseMaybeDefault();
      this.parseAssignableListItemTypes(left);
      const elt = this.parseMaybeDefault(left.start, left.loc.start, left);
      if (accessibility || readonly) {
        const pp: N.TSParameterProperty = this.startNodeAt(startPos, startLoc);
        if (decorators.length) {
          pp.decorators = decorators;
        }
        if (accessibility) pp.accessibility = accessibility;
        if (readonly) pp.readonly = readonly;
        if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
          throw this.raise(
            pp.start,
            "A parameter property may not be declared using a binding pattern.",
          );
        }
        pp.parameter = elt;
        return this.finishNode(pp, "TSParameterProperty");
      }

      if (decorators.length) {
        left.decorators = decorators;
      }

      return elt;
    }

    parseFunctionBodyAndFinish(
      node: N.BodilessFunctionOrMethodBase,
      type: string,
      allowExpressionBody?: boolean,
    ): void {
      // For arrow functions, `parseArrow` handles the return type itself.
      if (!allowExpressionBody && this.match(tt.colon)) {
        node.returnType = this.tsParseTypeOrTypePredicateAnnotation(tt.colon);
      }

      const bodilessType =
        type === "FunctionDeclaration"
          ? "TSDeclareFunction"
          : type === "ClassMethod"
          ? "TSDeclareMethod"
          : undefined;
      if (bodilessType && !this.match(tt.braceL) && this.isLineTerminator()) {
        this.finishNode(node, bodilessType);
        return;
      }

      super.parseFunctionBodyAndFinish(node, type, allowExpressionBody);
    }

    parseSubscript(
      base: N.Expression,
      startPos: number,
      startLoc: Position,
      noCalls: ?boolean,
      state: N.ParseSubscriptState,
    ): N.Expression {
      if (!this.hasPrecedingLineBreak() && this.match(tt.bang)) {
        this.state.exprAllowed = false;
        this.next();

        const nonNullExpression: N.TsNonNullExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        nonNullExpression.expression = base;
        return this.finishNode(nonNullExpression, "TSNonNullExpression");
      }

      if (this.isRelational("<")) {
        // tsTryParseAndCatch is expensive, so avoid if not necessary.
        // There are number of things we are going to "maybe" parse, like type arguments on
        // tagged template expressions. If any of them fail, walk it back and continue.
        const result = this.tsTryParseAndCatch(() => {
          if (!noCalls && this.atPossibleAsync(base)) {
            // Almost certainly this is a generic async function `async <T>() => ...
            // But it might be a call with a type argument `async<T>();`
            const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(
              startPos,
              startLoc,
            );
            if (asyncArrowFn) {
              return asyncArrowFn;
            }
          }

          const node: N.CallExpression = this.startNodeAt(startPos, startLoc);
          node.callee = base;

          const typeArguments = this.tsParseTypeArguments();

          if (typeArguments) {
            if (!noCalls && this.eat(tt.parenL)) {
              // possibleAsync always false here, because we would have handled it above.
              // $FlowIgnore (won't be any undefined arguments)
              node.arguments = this.parseCallExpressionArguments(
                tt.parenR,
                /* possibleAsync */ false,
              );
              node.typeParameters = typeArguments;
              return this.finishCallExpression(node);
            } else if (this.match(tt.backQuote)) {
              return this.parseTaggedTemplateExpression(
                startPos,
                startLoc,
                base,
                state,
                typeArguments,
              );
            }
          }

          this.unexpected();
        });

        if (result) return result;
      }

      return super.parseSubscript(base, startPos, startLoc, noCalls, state);
    }

    parseNewArguments(node: N.NewExpression): void {
      if (this.isRelational("<")) {
        // tsTryParseAndCatch is expensive, so avoid if not necessary.
        // 99% certain this is `new C<T>();`. But may be `new C < T;`, which is also legal.
        const typeParameters = this.tsTryParseAndCatch(() => {
          const args = this.tsParseTypeArguments();
          if (!this.match(tt.parenL)) this.unexpected();
          return args;
        });
        if (typeParameters) {
          node.typeParameters = typeParameters;
        }
      }

      super.parseNewArguments(node);
    }

    parseExprOp(
      left: N.Expression,
      leftStartPos: number,
      leftStartLoc: Position,
      minPrec: number,
      noIn: ?boolean,
    ) {
      if (
        nonNull(tt._in.binop) > minPrec &&
        !this.hasPrecedingLineBreak() &&
        this.isContextual("as")
      ) {
        const node: N.TsAsExpression = this.startNodeAt(
          leftStartPos,
          leftStartLoc,
        );
        node.expression = left;
        node.typeAnnotation = this.tsNextThenParseType();
        this.finishNode(node, "TSAsExpression");
        return this.parseExprOp(
          node,
          leftStartPos,
          leftStartLoc,
          minPrec,
          noIn,
        );
      }

      return super.parseExprOp(left, leftStartPos, leftStartLoc, minPrec, noIn);
    }

    checkReservedWord(
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
    checkDuplicateExports() {}

    parseImport(node: N.Node): N.AnyImport {
      if (this.match(tt.name) && this.lookahead().type === tt.eq) {
        return this.tsParseImportEqualsDeclaration(node);
      }
      return super.parseImport(node);
    }

    parseExport(node: N.Node): N.AnyExport {
      if (this.match(tt._import)) {
        // `export import A = B;`
        this.expect(tt._import);
        return this.tsParseImportEqualsDeclaration(node, /* isExport */ true);
      } else if (this.eat(tt.eq)) {
        // `export = x;`
        const assign: N.TsExportAssignment = node;
        assign.expression = this.parseExpression();
        this.semicolon();
        return this.finishNode(assign, "TSExportAssignment");
      } else if (this.eatContextual("as")) {
        // `export as namespace A;`
        const decl: N.TsNamespaceExportDeclaration = node;
        // See `parseNamespaceExportDeclaration` in TypeScript's own parser
        this.expectContextual("namespace");
        decl.id = this.parseIdentifier();
        this.semicolon();
        return this.finishNode(decl, "TSNamespaceExportDeclaration");
      } else {
        return super.parseExport(node);
      }
    }

    isAbstractClass(): boolean {
      return (
        this.isContextual("abstract") && this.lookahead().type === tt._class
      );
    }

    parseExportDefaultExpression(): N.Expression | N.Declaration {
      if (this.isAbstractClass()) {
        const cls = this.startNode();
        this.next(); // Skip "abstract"
        this.parseClass(cls, true, true);
        cls.abstract = true;
        return cls;
      }

      // export default interface allowed in:
      // https://github.com/Microsoft/TypeScript/pull/16040
      if (this.state.value === "interface") {
        const result = this.tsParseDeclaration(
          this.startNode(),
          this.state.value,
          true,
        );

        if (result) return result;
      }

      return super.parseExportDefaultExpression();
    }

    parseStatementContent(
      declaration: boolean,
      topLevel: ?boolean,
    ): N.Statement {
      if (this.state.type === tt._const) {
        const ahead = this.lookahead();
        if (ahead.type === tt.name && ahead.value === "enum") {
          const node: N.TsEnumDeclaration = this.startNode();
          this.expect(tt._const);
          this.expectContextual("enum");
          return this.tsParseEnumDeclaration(node, /* isConst */ true);
        }
      }
      return super.parseStatementContent(declaration, topLevel);
    }

    parseAccessModifier(): ?N.Accessibility {
      return this.tsParseModifier(["public", "protected", "private"]);
    }

    parseClassMember(
      classBody: N.ClassBody,
      member: any,
      state: { hadConstructor: boolean },
    ): void {
      const accessibility = this.parseAccessModifier();
      if (accessibility) member.accessibility = accessibility;

      super.parseClassMember(classBody, member, state);
    }

    parseClassMemberWithIsStatic(
      classBody: N.ClassBody,
      member: any,
      state: { hadConstructor: boolean },
      isStatic: boolean,
    ): void {
      const methodOrProp: N.ClassMethod | N.ClassProperty = member;
      const prop: N.ClassProperty = member;
      const propOrIdx: N.ClassProperty | N.TsIndexSignature = member;

      let abstract = false,
        readonly = false;

      const mod = this.tsParseModifier(["abstract", "readonly"]);
      switch (mod) {
        case "readonly":
          readonly = true;
          abstract = !!this.tsParseModifier(["abstract"]);
          break;
        case "abstract":
          abstract = true;
          readonly = !!this.tsParseModifier(["readonly"]);
          break;
      }

      if (abstract) methodOrProp.abstract = true;
      if (readonly) propOrIdx.readonly = true;

      if (!abstract && !isStatic && !methodOrProp.accessibility) {
        const idx = this.tsTryParseIndexSignature(member);
        if (idx) {
          classBody.body.push(idx);
          return;
        }
      }

      if (readonly) {
        // Must be a property (if not an index signature).
        methodOrProp.static = isStatic;
        this.parseClassPropertyName(prop);
        this.parsePostMemberNameModifiers(methodOrProp);
        this.pushClassProperty(classBody, prop);
        return;
      }

      super.parseClassMemberWithIsStatic(classBody, member, state, isStatic);
    }

    parsePostMemberNameModifiers(
      methodOrProp: N.ClassMethod | N.ClassProperty,
    ): void {
      const optional = this.eat(tt.question);
      if (optional) methodOrProp.optional = true;
    }

    // Note: The reason we do this in `parseExpressionStatement` and not `parseStatement`
    // is that e.g. `type()` is valid JS, so we must try parsing that first.
    // If it's really a type, we will parse `type` as the statement, and can correct it here
    // by parsing the rest.
    parseExpressionStatement(
      node: N.ExpressionStatement,
      expr: N.Expression,
    ): N.Statement {
      const decl =
        expr.type === "Identifier"
          ? this.tsParseExpressionStatement(node, expr)
          : undefined;
      return decl || super.parseExpressionStatement(node, expr);
    }

    // export type
    // Should be true for anything parsed by `tsTryParseExportDeclaration`.
    shouldParseExportDeclaration(): boolean {
      if (this.tsIsDeclarationStart()) return true;
      return super.shouldParseExportDeclaration();
    }

    // An apparent conditional expression could actually be an optional parameter in an arrow function.
    parseConditional(
      expr: N.Expression,
      noIn: ?boolean,
      startPos: number,
      startLoc: Position,
      refNeedsArrowPos?: ?Pos,
    ): N.Expression {
      // only do the expensive clone if there is a question mark
      // and if we come from inside parens
      if (!refNeedsArrowPos || !this.match(tt.question)) {
        return super.parseConditional(
          expr,
          noIn,
          startPos,
          startLoc,
          refNeedsArrowPos,
        );
      }

      const state = this.state.clone();
      try {
        return super.parseConditional(expr, noIn, startPos, startLoc);
      } catch (err) {
        if (!(err instanceof SyntaxError)) {
          // istanbul ignore next: no such error is expected
          throw err;
        }

        this.state = state;
        refNeedsArrowPos.start = err.pos || this.state.start;
        return expr;
      }
    }

    // Note: These "type casts" are *not* valid TS expressions.
    // But we parse them here and change them when completing the arrow function.
    parseParenItem(
      node: N.Expression,
      startPos: number,
      startLoc: Position,
    ): N.Expression {
      node = super.parseParenItem(node, startPos, startLoc);
      if (this.eat(tt.question)) {
        node.optional = true;
      }

      if (this.match(tt.colon)) {
        const typeCastNode: N.TsTypeCastExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.tsParseTypeAnnotation();

        return this.finishNode(typeCastNode, "TSTypeCastExpression");
      }

      return node;
    }

    parseExportDeclaration(node: N.ExportNamedDeclaration): ?N.Declaration {
      // "export declare" is equivalent to just "export".
      const isDeclare = this.eatContextual("declare");

      let declaration: ?N.Declaration;
      if (this.match(tt.name)) {
        declaration = this.tsTryParseExportDeclaration();
      }
      if (!declaration) {
        declaration = super.parseExportDeclaration(node);
      }

      if (declaration && isDeclare) {
        declaration.declare = true;
      }

      return declaration;
    }

    parseClassId(
      node: N.Class,
      isStatement: boolean,
      optionalId: ?boolean,
    ): void {
      if ((!isStatement || optionalId) && this.isContextual("implements")) {
        return;
      }

      super.parseClassId(...arguments);
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) node.typeParameters = typeParameters;
    }

    parseClassProperty(node: N.ClassProperty): N.ClassProperty {
      if (!node.optional && this.eat(tt.bang)) {
        node.definite = true;
      }

      const type = this.tsTryParseTypeAnnotation();
      if (type) node.typeAnnotation = type;
      return super.parseClassProperty(node);
    }

    pushClassMethod(
      classBody: N.ClassBody,
      method: N.ClassMethod,
      isGenerator: boolean,
      isAsync: boolean,
      isConstructor: boolean,
    ): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) method.typeParameters = typeParameters;
      super.pushClassMethod(
        classBody,
        method,
        isGenerator,
        isAsync,
        isConstructor,
      );
    }

    pushClassPrivateMethod(
      classBody: N.ClassBody,
      method: N.ClassPrivateMethod,
      isGenerator: boolean,
      isAsync: boolean,
    ): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) method.typeParameters = typeParameters;
      super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
    }

    parseClassSuper(node: N.Class): void {
      super.parseClassSuper(node);
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.tsParseTypeArguments();
      }
      if (this.eatContextual("implements")) {
        node.implements = this.tsParseHeritageClause("implements");
      }
    }

    parseObjPropValue(prop: N.ObjectMember, ...args): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) prop.typeParameters = typeParameters;

      super.parseObjPropValue(prop, ...args);
    }

    parseFunctionParams(node: N.Function, allowModifiers?: boolean): void {
      const typeParameters = this.tsTryParseTypeParameters();
      if (typeParameters) node.typeParameters = typeParameters;
      super.parseFunctionParams(node, allowModifiers);
    }

    // `let x: number;`
    parseVarId(
      decl: N.VariableDeclarator,
      kind: "var" | "let" | "const",
    ): void {
      super.parseVarId(decl, kind);
      if (decl.id.type === "Identifier" && this.eat(tt.bang)) {
        decl.definite = true;
      }

      const type = this.tsTryParseTypeAnnotation();
      if (type) {
        decl.id.typeAnnotation = type;
        this.finishNode(decl.id, decl.id.type); // set end position to end of type
      }
    }

    // parse the return type of an async arrow function - let foo = (async (): number => {});
    parseAsyncArrowFromCallExpression(
      node: N.ArrowFunctionExpression,
      call: N.CallExpression,
    ): N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        node.returnType = this.tsParseTypeAnnotation();
      }
      return super.parseAsyncArrowFromCallExpression(node, call);
    }

    parseMaybeAssign(...args): N.Expression {
      // Note: When the JSX plugin is on, type assertions (`<T> x`) aren't valid syntax.

      let jsxError: ?SyntaxError;

      if (this.match(tt.jsxTagStart)) {
        const context = this.curContext();
        assert(context === ct.j_oTag);
        // Only time j_oTag is pushed is right after j_expr.
        assert(this.state.context[this.state.context.length - 2] === ct.j_expr);

        // Prefer to parse JSX if possible. But may be an arrow fn.
        const state = this.state.clone();
        try {
          return super.parseMaybeAssign(...args);
        } catch (err) {
          if (!(err instanceof SyntaxError)) {
            // istanbul ignore next: no such error is expected
            throw err;
          }

          this.state = state;
          // Pop the context added by the jsxTagStart.
          assert(this.curContext() === ct.j_oTag);
          this.state.context.pop();
          assert(this.curContext() === ct.j_expr);
          this.state.context.pop();
          jsxError = err;
        }
      }

      if (jsxError === undefined && !this.isRelational("<")) {
        return super.parseMaybeAssign(...args);
      }

      // Either way, we're looking at a '<': tt.jsxTagStart or relational.

      let arrowExpression;
      let typeParameters: N.TsTypeParameterDeclaration;
      const state = this.state.clone();
      try {
        // This is similar to TypeScript's `tryParseParenthesizedArrowFunctionExpression`.
        typeParameters = this.tsParseTypeParameters();
        arrowExpression = super.parseMaybeAssign(...args);
        if (arrowExpression.type !== "ArrowFunctionExpression") {
          this.unexpected(); // Go to the catch block (needs a SyntaxError).
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
        assert(!this.hasPlugin("jsx"));
        // Parsing an arrow function failed, so try a type cast.
        this.state = state;
        // This will start with a type assertion (via parseMaybeUnary).
        // But don't directly call `this.tsParseTypeAssertion` because we want to handle any binary after it.
        return super.parseMaybeAssign(...args);
      }

      // Correct TypeScript code should have at least 1 type parameter, but don't crash on bad code.
      if (typeParameters && typeParameters.params.length !== 0) {
        this.resetStartLocationFromNode(arrowExpression, typeParameters);
      }
      arrowExpression.typeParameters = typeParameters;
      return arrowExpression;
    }

    // Handle type assertions
    parseMaybeUnary(refShorthandDefaultPos?: ?Pos): N.Expression {
      if (!this.hasPlugin("jsx") && this.isRelational("<")) {
        return this.tsParseTypeAssertion();
      } else {
        return super.parseMaybeUnary(refShorthandDefaultPos);
      }
    }

    parseArrow(node: N.ArrowFunctionExpression): ?N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        // This is different from how the TS parser does it.
        // TS uses lookahead. The Babel Parser parses it as a parenthesized expression and converts.
        const state = this.state.clone();
        try {
          const returnType = this.tsParseTypeOrTypePredicateAnnotation(
            tt.colon,
          );
          if (this.canInsertSemicolon()) this.unexpected();
          if (!this.match(tt.arrow)) this.unexpected();
          node.returnType = returnType;
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
          } else {
            // istanbul ignore next: no such error is expected
            throw err;
          }
        }
      }

      return super.parseArrow(node);
    }

    // Allow type annotations inside of a parameter list.
    parseAssignableListItemTypes(param: N.Pattern) {
      if (this.eat(tt.question)) {
        if (param.type !== "Identifier") {
          throw this.raise(
            param.start,
            "A binding pattern parameter cannot be optional in an implementation signature.",
          );
        }

        param.optional = true;
      }
      const type = this.tsTryParseTypeAnnotation();
      if (type) param.typeAnnotation = type;
      return this.finishNode(param, param.type);
    }

    toAssignable(
      node: N.Node,
      isBinding: ?boolean,
      contextDescription: string,
    ): N.Node {
      switch (node.type) {
        case "TSTypeCastExpression":
          return super.toAssignable(
            this.typeCastToParameter(node),
            isBinding,
            contextDescription,
          );
        case "TSParameterProperty":
          return super.toAssignable(node, isBinding, contextDescription);
        case "TSAsExpression":
        case "TSNonNullExpression":
        case "TSTypeAssertion":
          node.expression = this.toAssignable(
            node.expression,
            isBinding,
            contextDescription,
          );
          return node;
        default:
          return super.toAssignable(node, isBinding, contextDescription);
      }
    }

    checkLVal(
      expr: N.Expression,
      isBinding: ?boolean,
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
          this.checkLVal(
            expr.parameter,
            isBinding,
            checkClashes,
            "parameter property",
          );
          return;
        case "TSAsExpression":
        case "TSNonNullExpression":
        case "TSTypeAssertion":
          this.checkLVal(
            expr.expression,
            isBinding,
            checkClashes,
            contextDescription,
          );
          return;
        default:
          super.checkLVal(expr, isBinding, checkClashes, contextDescription);
          return;
      }
    }

    parseBindingAtom(): N.Pattern {
      switch (this.state.type) {
        case tt._this:
          // "this" may be the name of a parameter, so allow it.
          return this.parseIdentifier(/* liberal */ true);
        default:
          return super.parseBindingAtom();
      }
    }

    parseMaybeDecoratorArguments(expr: N.Expression): N.Expression {
      if (this.isRelational("<")) {
        const typeArguments = this.tsParseTypeArguments();

        if (this.match(tt.parenL)) {
          const call = super.parseMaybeDecoratorArguments(expr);
          call.typeParameters = typeArguments;
          return call;
        }

        this.unexpected(this.state.start, tt.parenL);
      }

      return super.parseMaybeDecoratorArguments(expr);
    }

    // === === === === === === === === === === === === === === === ===
    // Note: All below methods are duplicates of something in flow.js.
    // Not sure what the best way to combine these is.
    // === === === === === === === === === === === === === === === ===

    isClassMethod(): boolean {
      return this.isRelational("<") || super.isClassMethod();
    }

    isClassProperty(): boolean {
      return (
        this.match(tt.bang) || this.match(tt.colon) || super.isClassProperty()
      );
    }

    parseMaybeDefault(...args): N.Pattern {
      const node = super.parseMaybeDefault(...args);

      if (
        node.type === "AssignmentPattern" &&
        node.typeAnnotation &&
        node.right.start < node.typeAnnotation.start
      ) {
        this.raise(
          node.typeAnnotation.start,
          "Type annotations must come before default assignments, " +
            "e.g. instead of `age = 25: number` use `age: number = 25`",
        );
      }

      return node;
    }

    // ensure that inside types, we bypass the jsx parser plugin
    getTokenFromCode(code: number): void {
      if (this.state.inType && (code === 62 || code === 60)) {
        return this.finishOp(tt.relational, 1);
      } else {
        return super.getTokenFromCode(code);
      }
    }

    toAssignableList(
      exprList: N.Expression[],
      isBinding: ?boolean,
      contextDescription: string,
    ): $ReadOnlyArray<N.Pattern> {
      for (let i = 0; i < exprList.length; i++) {
        const expr = exprList[i];
        if (expr && expr.type === "TSTypeCastExpression") {
          exprList[i] = this.typeCastToParameter(expr);
        }
      }
      return super.toAssignableList(exprList, isBinding, contextDescription);
    }

    typeCastToParameter(node: N.TsTypeCastExpression): N.Node {
      node.expression.typeAnnotation = node.typeAnnotation;

      return this.finishNodeAt(
        node.expression,
        node.expression.type,
        node.typeAnnotation.end,
        node.typeAnnotation.loc.end,
      );
    }

    toReferencedList(
      exprList: $ReadOnlyArray<?N.Expression>,
      isInParens?: boolean, // eslint-disable-line no-unused-vars
    ): $ReadOnlyArray<?N.Expression> {
      for (let i = 0; i < exprList.length; i++) {
        const expr = exprList[i];
        if (
          expr &&
          expr._exprListItem &&
          expr.type === "TsTypeCastExpression"
        ) {
          this.raise(expr.start, "Did not expect a type annotation here.");
        }
      }

      return exprList;
    }

    shouldParseArrow() {
      return this.match(tt.colon) || super.shouldParseArrow();
    }

    shouldParseAsyncArrow(): boolean {
      return this.match(tt.colon) || super.shouldParseAsyncArrow();
    }

    canHaveLeadingDecorator() {
      // Avoid unnecessary lookahead in checking for abstract class unless needed!
      return super.canHaveLeadingDecorator() || this.isAbstractClass();
    }

    jsxParseOpeningElementAfterName(
      node: N.JSXOpeningElement,
    ): N.JSXOpeningElement {
      const typeArguments = this.tsTryParseAndCatch(() =>
        this.tsParseTypeArguments(),
      );
      if (typeArguments) node.typeParameters = typeArguments;
      return super.jsxParseOpeningElementAfterName(node);
    }
  };
