// @flow

/*:: declare var invariant; */

import type Parser from "../../parser";
import {
  tokenIsIdentifier,
  tokenIsKeyword,
  tokenIsKeywordOrIdentifier,
  tokenIsLiteralPropertyName,
  tokenLabelName,
  tt,
  type TokenType,
  tokenIsFlowInterfaceOrTypeOrOpaque,
} from "../../tokenizer/types";
import * as N from "../../types";
import { Position } from "../../util/location";
import { types as tc } from "../../tokenizer/context";
import * as charCodes from "charcodes";
import { isIteratorStart } from "../../util/identifier";
import FlowScopeHandler from "./scope";
import {
  BIND_LEXICAL,
  BIND_VAR,
  BIND_FUNCTION,
  BIND_FLOW_DECLARE_FN,
  SCOPE_ARROW,
  SCOPE_FUNCTION,
  SCOPE_OTHER,
} from "../../util/scopeflags";
import type { ExpressionErrors } from "../../parser/util";
import { Errors, toParseErrorClasses } from "../../parse-error";
import { cloneIdentifier } from "../../parser/node";

const reservedTypes = new Set([
  "_",
  "any",
  "bool",
  "boolean",
  "empty",
  "extends",
  "false",
  "interface",
  "mixed",
  "null",
  "number",
  "static",
  "string",
  "true",
  "typeof",
  "void",
]);

/* eslint sort-keys: "error" */
// The Errors key follows https://github.com/facebook/flow/blob/master/src/parser/parse_error.ml unless it does not exist
const FlowErrors = toParseErrorClasses`flow`(_ => ({
  AmbiguousConditionalArrow: _(
    "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
  ),
  AmbiguousDeclareModuleKind: _(
    "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.",
  ),
  AssignReservedType: _<{| reservedType: string |}>(
    ({ reservedType }) => `Cannot overwrite reserved type ${reservedType}.`,
  ),
  DeclareClassElement: _(
    "The `declare` modifier can only appear on class fields.",
  ),
  DeclareClassFieldInitializer: _(
    "Initializers are not allowed in fields with the `declare` modifier.",
  ),
  DuplicateDeclareModuleExports: _(
    "Duplicate `declare module.exports` statement.",
  ),
  EnumBooleanMemberNotInitialized: _<{|
    memberName: string,
    enumName: string,
  |}>(
    ({ memberName, enumName }) =>
      `Boolean enum members need to be initialized. Use either \`${memberName} = true,\` or \`${memberName} = false,\` in enum \`${enumName}\`.`,
  ),
  EnumDuplicateMemberName: _<{| memberName: string, enumName: string |}>(
    ({ memberName, enumName }) =>
      `Enum member names need to be unique, but the name \`${memberName}\` has already been used before in enum \`${enumName}\`.`,
  ),
  EnumInconsistentMemberValues: _<{| enumName: string |}>(
    ({ enumName }) =>
      `Enum \`${enumName}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`,
  ),
  EnumInvalidExplicitType: _<{| invalidEnumType: string, enumName: string |}>(
    ({ invalidEnumType, enumName }) =>
      `Enum type \`${invalidEnumType}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`,
  ),
  EnumInvalidExplicitTypeUnknownSupplied: _<{| enumName: string |}>(
    ({ enumName }) =>
      `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${enumName}\`.`,
  ),
  EnumInvalidMemberInitializerPrimaryType: _<{|
    enumName: string,
    memberName: string,
    explicitType: string,
  |}>(
    ({ enumName, memberName, explicitType }) =>
      `Enum \`${enumName}\` has type \`${explicitType}\`, so the initializer of \`${memberName}\` needs to be a ${explicitType} literal.`,
  ),
  EnumInvalidMemberInitializerSymbolType: _<{|
    enumName: string,
    memberName: string,
    explicitType: string,
  |}>(
    ({ enumName, memberName }) =>
      `Symbol enum members cannot be initialized. Use \`${memberName},\` in enum \`${enumName}\`.`,
  ),
  EnumInvalidMemberInitializerUnknownType: _<{|
    enumName: string,
    memberName: string,
    // eslint-disable-next-line no-unused-vars
    explicitType: string,
  |}>(
    ({ enumName, memberName }) =>
      `The enum member initializer for \`${memberName}\` needs to be a literal (either a boolean, number, or string) in enum \`${enumName}\`.`,
  ),
  EnumInvalidMemberName: _<{|
    enumName: string,
    memberName: string,
    suggestion: string,
  |}>(
    ({ enumName, memberName, suggestion }) =>
      `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${memberName}\`, consider using \`${suggestion}\`, in enum \`${enumName}\`.`,
  ),
  EnumNumberMemberNotInitialized: _<{|
    enumName: string,
    memberName: string,
  |}>(
    ({ enumName, memberName }) =>
      `Number enum members need to be initialized, e.g. \`${memberName} = 1\` in enum \`${enumName}\`.`,
  ),
  EnumStringMemberInconsistentlyInitailized: _<{| enumName: string |}>(
    ({ enumName }) =>
      `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${enumName}\`.`,
  ),
  GetterMayNotHaveThisParam: _("A getter cannot have a `this` parameter."),
  ImportTypeShorthandOnlyInPureImport: _(
    "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.",
  ),
  InexactInsideExact: _(
    "Explicit inexact syntax cannot appear inside an explicit exact object type.",
  ),
  InexactInsideNonObject: _(
    "Explicit inexact syntax cannot appear in class or interface definitions.",
  ),
  InexactVariance: _("Explicit inexact syntax cannot have variance."),
  InvalidNonTypeImportInDeclareModule: _(
    "Imports within a `declare module` body must always be `import type` or `import typeof`.",
  ),
  MissingTypeParamDefault: _(
    "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
  ),
  NestedDeclareModule: _(
    "`declare module` cannot be used inside another `declare module`.",
  ),
  NestedFlowComment: _(
    "Cannot have a flow comment inside another flow comment.",
  ),
  PatternIsOptional: _(
    "A binding pattern parameter cannot be optional in an implementation signature.",
    // For consistency in TypeScript and Flow error codes
    !process.env.BABEL_8_BREAKING
      ? { reasonCode: "OptionalBindingPattern" }
      : {},
  ),
  SetterMayNotHaveThisParam: _("A setter cannot have a `this` parameter."),
  SpreadVariance: _("Spread properties cannot have variance."),
  ThisParamAnnotationRequired: _(
    "A type annotation is required for the `this` parameter.",
  ),
  ThisParamBannedInConstructor: _(
    "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.",
  ),
  ThisParamMayNotBeOptional: _("The `this` parameter cannot be optional."),
  ThisParamMustBeFirst: _(
    "The `this` parameter must be the first function parameter.",
  ),
  ThisParamNoDefault: _("The `this` parameter may not have a default value."),
  TypeBeforeInitializer: _(
    "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
  ),
  TypeCastInPattern: _(
    "The type cast expression is expected to be wrapped with parenthesis.",
  ),
  UnexpectedExplicitInexactInObject: _(
    "Explicit inexact syntax must appear at the end of an inexact object.",
  ),
  UnexpectedReservedType: _<{| reservedType: string |}>(
    ({ reservedType }) => `Unexpected reserved type ${reservedType}.`,
  ),
  UnexpectedReservedUnderscore: _(
    "`_` is only allowed as a type argument to call or new.",
  ),
  UnexpectedSpaceBetweenModuloChecks: _(
    "Spaces between `%` and `checks` are not allowed here.",
  ),
  UnexpectedSpreadType: _(
    "Spread operator cannot appear in class or interface definitions.",
  ),
  UnexpectedSubtractionOperand: _(
    'Unexpected token, expected "number" or "bigint".',
  ),
  UnexpectedTokenAfterTypeParameter: _(
    "Expected an arrow function after this type parameter declaration.",
  ),
  UnexpectedTypeParameterBeforeAsyncArrowFunction: _(
    "Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.",
  ),
  UnsupportedDeclareExportKind: _<{|
    unsupported: string,
    suggestion: string,
  |}>(
    ({ unsupported, suggestion }) =>
      `\`declare export ${unsupported}\` is not supported. Use \`${suggestion}\` instead.`,
  ),
  UnsupportedStatementInDeclareModule: _(
    "Only declares and type imports are allowed inside declare module.",
  ),
  UnterminatedFlowComment: _("Unterminated flow-comment."),
}));
/* eslint-disable sort-keys */

function isEsModuleType(bodyElement: N.Node): boolean {
  return (
    bodyElement.type === "DeclareExportAllDeclaration" ||
    (bodyElement.type === "DeclareExportDeclaration" &&
      (!bodyElement.declaration ||
        (bodyElement.declaration.type !== "TypeAlias" &&
          bodyElement.declaration.type !== "InterfaceDeclaration")))
  );
}

function hasTypeImportKind(node: N.Node): boolean {
  return node.importKind === "type" || node.importKind === "typeof";
}

function isMaybeDefaultImport(type: TokenType): boolean {
  return tokenIsKeywordOrIdentifier(type) && type !== tt._from;
}

const exportSuggestions = {
  const: "declare export var",
  let: "declare export var",
  type: "export type",
  interface: "export interface",
};

// Like Array#filter, but returns a tuple [ acceptedElements, discardedElements ]
function partition<T>(
  list: T[],
  test: (T, number, T[]) => ?boolean,
): [T[], T[]] {
  const list1 = [];
  const list2 = [];
  for (let i = 0; i < list.length; i++) {
    (test(list[i], i, list) ? list1 : list2).push(list[i]);
  }
  return [list1, list2];
}

const FLOW_PRAGMA_REGEX = /\*?\s*@((?:no)?flow)\b/;

// Flow enums types
type EnumExplicitType = null | "boolean" | "number" | "string" | "symbol";
type EnumContext = {|
  enumName: string,
  explicitType: EnumExplicitType,
  memberName: string,
|};
type EnumMemberInit =
  | {| type: "number", loc: Position, value: N.Node |}
  | {| type: "string", loc: Position, value: N.Node |}
  | {| type: "boolean", loc: Position, value: N.Node |}
  | {| type: "invalid", loc: Position |}
  | {| type: "none", loc: Position |};

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    // The value of the @flow/@noflow pragma. Initially undefined, transitions
    // to "@flow" or "@noflow" if we see a pragma. Transitions to null if we are
    // past the initial comment.
    flowPragma: void | null | "flow" | "noflow" = undefined;

    getScopeHandler(): Class<FlowScopeHandler> {
      return FlowScopeHandler;
    }

    shouldParseTypes(): boolean {
      return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
    }

    shouldParseEnums(): boolean {
      return !!this.getPluginOption("flow", "enums");
    }

    finishToken(type: TokenType, val: any): void {
      if (
        type !== tt.string &&
        type !== tt.semi &&
        type !== tt.interpreterDirective
      ) {
        if (this.flowPragma === undefined) {
          this.flowPragma = null;
        }
      }
      return super.finishToken(type, val);
    }

    addComment(comment: N.Comment): void {
      if (this.flowPragma === undefined) {
        // Try to parse a flow pragma.
        const matches = FLOW_PRAGMA_REGEX.exec(comment.value);
        if (!matches) {
          // do nothing
        } else if (matches[1] === "flow") {
          this.flowPragma = "flow";
        } else if (matches[1] === "noflow") {
          this.flowPragma = "noflow";
        } else {
          throw new Error("Unexpected flow pragma");
        }
      }
      return super.addComment(comment);
    }

    flowParseTypeInitialiser(tok?: TokenType): N.FlowType {
      const oldInType = this.state.inType;
      this.state.inType = true;
      this.expect(tok || tt.colon);

      const type = this.flowParseType();
      this.state.inType = oldInType;
      return type;
    }

    flowParsePredicate(): N.FlowType {
      const node = this.startNode();
      const moduloLoc = this.state.startLoc;
      this.next(); // eat `%`
      this.expectContextual(tt._checks);
      // Force '%' and 'checks' to be adjacent
      if (this.state.lastTokStart > moduloLoc.index + 1) {
        this.raise(FlowErrors.UnexpectedSpaceBetweenModuloChecks, {
          at: moduloLoc,
        });
      }
      if (this.eat(tt.parenL)) {
        node.value = this.parseExpression();
        this.expect(tt.parenR);
        return this.finishNode(node, "DeclaredPredicate");
      } else {
        return this.finishNode(node, "InferredPredicate");
      }
    }

    flowParseTypeAndPredicateInitialiser(): [?N.FlowType, ?N.FlowPredicate] {
      const oldInType = this.state.inType;
      this.state.inType = true;
      this.expect(tt.colon);
      let type = null;
      let predicate = null;
      if (this.match(tt.modulo)) {
        this.state.inType = oldInType;
        predicate = this.flowParsePredicate();
      } else {
        type = this.flowParseType();
        this.state.inType = oldInType;
        if (this.match(tt.modulo)) {
          predicate = this.flowParsePredicate();
        }
      }
      return [type, predicate];
    }

    flowParseDeclareClass(node: N.FlowDeclareClass): N.FlowDeclareClass {
      this.next();
      this.flowParseInterfaceish(node, /*isClass*/ true);
      return this.finishNode(node, "DeclareClass");
    }

    flowParseDeclareFunction(
      node: N.FlowDeclareFunction,
    ): N.FlowDeclareFunction {
      this.next();

      const id = (node.id = this.parseIdentifier());

      const typeNode = this.startNode();
      const typeContainer = this.startNode();

      if (this.match(tt.lt)) {
        typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        typeNode.typeParameters = null;
      }

      this.expect(tt.parenL);
      const tmp = this.flowParseFunctionTypeParams();
      typeNode.params = tmp.params;
      typeNode.rest = tmp.rest;
      typeNode.this = tmp._this;
      this.expect(tt.parenR);

      [
        // $FlowFixMe (destructuring not supported yet)
        typeNode.returnType,
        // $FlowFixMe (destructuring not supported yet)
        node.predicate,
      ] = this.flowParseTypeAndPredicateInitialiser();

      typeContainer.typeAnnotation = this.finishNode(
        typeNode,
        "FunctionTypeAnnotation",
      );

      id.typeAnnotation = this.finishNode(typeContainer, "TypeAnnotation");

      this.resetEndLocation(id);
      this.semicolon();

      this.scope.declareName(
        node.id.name,
        BIND_FLOW_DECLARE_FN,
        node.id.loc.start,
      );

      return this.finishNode(node, "DeclareFunction");
    }

    flowParseDeclare(
      node: N.FlowDeclare,
      insideModule?: boolean,
    ): N.FlowDeclare {
      if (this.match(tt._class)) {
        return this.flowParseDeclareClass(node);
      } else if (this.match(tt._function)) {
        return this.flowParseDeclareFunction(node);
      } else if (this.match(tt._var)) {
        return this.flowParseDeclareVariable(node);
      } else if (this.eatContextual(tt._module)) {
        if (this.match(tt.dot)) {
          return this.flowParseDeclareModuleExports(node);
        } else {
          if (insideModule) {
            this.raise(FlowErrors.NestedDeclareModule, {
              at: this.state.lastTokStartLoc,
            });
          }
          return this.flowParseDeclareModule(node);
        }
      } else if (this.isContextual(tt._type)) {
        return this.flowParseDeclareTypeAlias(node);
      } else if (this.isContextual(tt._opaque)) {
        return this.flowParseDeclareOpaqueType(node);
      } else if (this.isContextual(tt._interface)) {
        return this.flowParseDeclareInterface(node);
      } else if (this.match(tt._export)) {
        return this.flowParseDeclareExportDeclaration(node, insideModule);
      } else {
        throw this.unexpected();
      }
    }

    flowParseDeclareVariable(
      node: N.FlowDeclareVariable,
    ): N.FlowDeclareVariable {
      this.next();
      node.id = this.flowParseTypeAnnotatableIdentifier(
        /*allowPrimitiveOverride*/ true,
      );
      this.scope.declareName(node.id.name, BIND_VAR, node.id.loc.start);
      this.semicolon();
      return this.finishNode(node, "DeclareVariable");
    }

    flowParseDeclareModule(node: N.FlowDeclareModule): N.FlowDeclareModule {
      this.scope.enter(SCOPE_OTHER);

      if (this.match(tt.string)) {
        node.id = this.parseExprAtom();
      } else {
        node.id = this.parseIdentifier();
      }

      const bodyNode = (node.body = this.startNode());
      const body = (bodyNode.body = []);
      this.expect(tt.braceL);
      while (!this.match(tt.braceR)) {
        let bodyNode = this.startNode();

        if (this.match(tt._import)) {
          this.next();
          if (!this.isContextual(tt._type) && !this.match(tt._typeof)) {
            this.raise(FlowErrors.InvalidNonTypeImportInDeclareModule, {
              at: this.state.lastTokStartLoc,
            });
          }
          this.parseImport(bodyNode);
        } else {
          this.expectContextual(
            tt._declare,
            FlowErrors.UnsupportedStatementInDeclareModule,
          );

          bodyNode = this.flowParseDeclare(bodyNode, true);
        }

        body.push(bodyNode);
      }

      this.scope.exit();

      this.expect(tt.braceR);

      this.finishNode(bodyNode, "BlockStatement");

      let kind = null;
      let hasModuleExport = false;
      body.forEach(bodyElement => {
        if (isEsModuleType(bodyElement)) {
          if (kind === "CommonJS") {
            this.raise(FlowErrors.AmbiguousDeclareModuleKind, {
              at: bodyElement,
            });
          }
          kind = "ES";
        } else if (bodyElement.type === "DeclareModuleExports") {
          if (hasModuleExport) {
            this.raise(FlowErrors.DuplicateDeclareModuleExports, {
              at: bodyElement,
            });
          }
          if (kind === "ES") {
            this.raise(FlowErrors.AmbiguousDeclareModuleKind, {
              at: bodyElement,
            });
          }
          kind = "CommonJS";
          hasModuleExport = true;
        }
      });

      node.kind = kind || "CommonJS";
      return this.finishNode(node, "DeclareModule");
    }

    flowParseDeclareExportDeclaration(
      node: N.FlowDeclareExportDeclaration,
      insideModule: ?boolean,
    ): N.FlowDeclareExportDeclaration {
      this.expect(tt._export);

      if (this.eat(tt._default)) {
        if (this.match(tt._function) || this.match(tt._class)) {
          // declare export default class ...
          // declare export default function ...
          node.declaration = this.flowParseDeclare(this.startNode());
        } else {
          // declare export default [type];
          node.declaration = this.flowParseType();
          this.semicolon();
        }
        node.default = true;

        return this.finishNode(node, "DeclareExportDeclaration");
      } else {
        if (
          this.match(tt._const) ||
          this.isLet() ||
          ((this.isContextual(tt._type) || this.isContextual(tt._interface)) &&
            !insideModule)
        ) {
          const label = this.state.value;
          throw this.raise(FlowErrors.UnsupportedDeclareExportKind, {
            at: this.state.startLoc,
            unsupported: label,
            suggestion: exportSuggestions[label],
          });
        }

        if (
          this.match(tt._var) || // declare export var ...
          this.match(tt._function) || // declare export function ...
          this.match(tt._class) || // declare export class ...
          this.isContextual(tt._opaque) // declare export opaque ..
        ) {
          node.declaration = this.flowParseDeclare(this.startNode());
          node.default = false;

          return this.finishNode(node, "DeclareExportDeclaration");
        } else if (
          this.match(tt.star) || // declare export * from ''
          this.match(tt.braceL) || // declare export {} ...
          this.isContextual(tt._interface) || // declare export interface ...
          this.isContextual(tt._type) || // declare export type ...
          this.isContextual(tt._opaque) // declare export opaque type ...
        ) {
          node = this.parseExport(node);
          if (node.type === "ExportNamedDeclaration") {
            // flow does not support the ExportNamedDeclaration
            // $FlowIgnore
            node.type = "ExportDeclaration";
            // $FlowFixMe
            node.default = false;
            delete node.exportKind;
          }

          // $FlowIgnore
          node.type = "Declare" + node.type;

          return node;
        }
      }

      throw this.unexpected();
    }

    flowParseDeclareModuleExports(
      node: N.FlowDeclareModuleExports,
    ): N.FlowDeclareModuleExports {
      this.next();
      this.expectContextual(tt._exports);
      node.typeAnnotation = this.flowParseTypeAnnotation();
      this.semicolon();

      return this.finishNode(node, "DeclareModuleExports");
    }

    flowParseDeclareTypeAlias(
      node: N.FlowDeclareTypeAlias,
    ): N.FlowDeclareTypeAlias {
      this.next();
      this.flowParseTypeAlias(node);
      // Don't do finishNode as we don't want to process comments twice
      node.type = "DeclareTypeAlias";
      return node;
    }

    flowParseDeclareOpaqueType(
      node: N.FlowDeclareOpaqueType,
    ): N.FlowDeclareOpaqueType {
      this.next();
      this.flowParseOpaqueType(node, true);
      // Don't do finishNode as we don't want to process comments twice
      node.type = "DeclareOpaqueType";
      return node;
    }

    flowParseDeclareInterface(
      node: N.FlowDeclareInterface,
    ): N.FlowDeclareInterface {
      this.next();
      this.flowParseInterfaceish(node);
      return this.finishNode(node, "DeclareInterface");
    }

    // Interfaces

    flowParseInterfaceish(
      node: N.FlowDeclare,
      isClass?: boolean = false,
    ): void {
      node.id = this.flowParseRestrictedIdentifier(
        /* liberal */ !isClass,
        /* declaration */ true,
      );

      this.scope.declareName(
        node.id.name,
        isClass ? BIND_FUNCTION : BIND_LEXICAL,
        node.id.loc.start,
      );

      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        node.typeParameters = null;
      }

      node.extends = [];
      node.implements = [];
      node.mixins = [];

      if (this.eat(tt._extends)) {
        do {
          node.extends.push(this.flowParseInterfaceExtends());
        } while (!isClass && this.eat(tt.comma));
      }

      if (this.isContextual(tt._mixins)) {
        this.next();
        do {
          node.mixins.push(this.flowParseInterfaceExtends());
        } while (this.eat(tt.comma));
      }

      if (this.isContextual(tt._implements)) {
        this.next();
        do {
          node.implements.push(this.flowParseInterfaceExtends());
        } while (this.eat(tt.comma));
      }

      node.body = this.flowParseObjectType({
        allowStatic: isClass,
        allowExact: false,
        allowSpread: false,
        allowProto: isClass,
        allowInexact: false,
      });
    }

    flowParseInterfaceExtends(): N.FlowInterfaceExtends {
      const node = this.startNode();

      node.id = this.flowParseQualifiedTypeIdentifier();
      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterInstantiation();
      } else {
        node.typeParameters = null;
      }

      return this.finishNode(node, "InterfaceExtends");
    }

    flowParseInterface(node: N.FlowInterface): N.FlowInterface {
      this.flowParseInterfaceish(node);
      return this.finishNode(node, "InterfaceDeclaration");
    }

    checkNotUnderscore(word: string) {
      if (word === "_") {
        this.raise(FlowErrors.UnexpectedReservedUnderscore, {
          at: this.state.startLoc,
        });
      }
    }

    checkReservedType(word: string, startLoc: Position, declaration?: boolean) {
      if (!reservedTypes.has(word)) return;

      this.raise(
        declaration
          ? FlowErrors.AssignReservedType
          : FlowErrors.UnexpectedReservedType,
        {
          at: startLoc,
          reservedType: word,
        },
      );
    }

    flowParseRestrictedIdentifier(
      liberal?: boolean,
      declaration?: boolean,
    ): N.Identifier {
      this.checkReservedType(
        this.state.value,
        this.state.startLoc,
        declaration,
      );
      return this.parseIdentifier(liberal);
    }

    // Type aliases

    flowParseTypeAlias(node: N.FlowTypeAlias): N.FlowTypeAlias {
      node.id = this.flowParseRestrictedIdentifier(
        /* liberal */ false,
        /* declaration */ true,
      );
      this.scope.declareName(node.id.name, BIND_LEXICAL, node.id.loc.start);

      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        node.typeParameters = null;
      }

      node.right = this.flowParseTypeInitialiser(tt.eq);
      this.semicolon();

      return this.finishNode(node, "TypeAlias");
    }

    flowParseOpaqueType(
      node: N.FlowOpaqueType,
      declare: boolean,
    ): N.FlowOpaqueType {
      this.expectContextual(tt._type);
      node.id = this.flowParseRestrictedIdentifier(
        /* liberal */ true,
        /* declaration */ true,
      );
      this.scope.declareName(node.id.name, BIND_LEXICAL, node.id.loc.start);

      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        node.typeParameters = null;
      }

      // Parse the supertype
      node.supertype = null;
      if (this.match(tt.colon)) {
        node.supertype = this.flowParseTypeInitialiser(tt.colon);
      }

      node.impltype = null;
      if (!declare) {
        node.impltype = this.flowParseTypeInitialiser(tt.eq);
      }
      this.semicolon();

      return this.finishNode(node, "OpaqueType");
    }

    // Type annotations

    flowParseTypeParameter(requireDefault?: boolean = false): N.TypeParameter {
      const nodeStartLoc = this.state.startLoc;

      const node = this.startNode();

      const variance = this.flowParseVariance();

      const ident = this.flowParseTypeAnnotatableIdentifier();
      node.name = ident.name;
      node.variance = variance;
      node.bound = ident.typeAnnotation;

      if (this.match(tt.eq)) {
        this.eat(tt.eq);
        node.default = this.flowParseType();
      } else {
        if (requireDefault) {
          this.raise(FlowErrors.MissingTypeParamDefault, { at: nodeStartLoc });
        }
      }

      return this.finishNode(node, "TypeParameter");
    }

    flowParseTypeParameterDeclaration(): N.TypeParameterDeclaration {
      const oldInType = this.state.inType;
      const node = this.startNode();
      node.params = [];

      this.state.inType = true;

      // istanbul ignore else: this condition is already checked at all call sites
      if (this.match(tt.lt) || this.match(tt.jsxTagStart)) {
        this.next();
      } else {
        this.unexpected();
      }

      let defaultRequired = false;

      do {
        const typeParameter = this.flowParseTypeParameter(defaultRequired);

        node.params.push(typeParameter);

        if (typeParameter.default) {
          defaultRequired = true;
        }

        if (!this.match(tt.gt)) {
          this.expect(tt.comma);
        }
      } while (!this.match(tt.gt));
      this.expect(tt.gt);

      this.state.inType = oldInType;

      return this.finishNode(node, "TypeParameterDeclaration");
    }

    flowParseTypeParameterInstantiation(): N.TypeParameterInstantiation {
      const node = this.startNode();
      const oldInType = this.state.inType;
      node.params = [];

      this.state.inType = true;

      this.expect(tt.lt);
      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
      this.state.noAnonFunctionType = false;
      while (!this.match(tt.gt)) {
        node.params.push(this.flowParseType());
        if (!this.match(tt.gt)) {
          this.expect(tt.comma);
        }
      }
      this.state.noAnonFunctionType = oldNoAnonFunctionType;
      this.expect(tt.gt);

      this.state.inType = oldInType;

      return this.finishNode(node, "TypeParameterInstantiation");
    }

    flowParseTypeParameterInstantiationCallOrNew(): N.TypeParameterInstantiation {
      const node = this.startNode();
      const oldInType = this.state.inType;
      node.params = [];

      this.state.inType = true;

      this.expect(tt.lt);
      while (!this.match(tt.gt)) {
        node.params.push(this.flowParseTypeOrImplicitInstantiation());
        if (!this.match(tt.gt)) {
          this.expect(tt.comma);
        }
      }
      this.expect(tt.gt);

      this.state.inType = oldInType;

      return this.finishNode(node, "TypeParameterInstantiation");
    }

    flowParseInterfaceType(): N.FlowInterfaceType {
      const node = this.startNode();
      this.expectContextual(tt._interface);

      node.extends = [];
      if (this.eat(tt._extends)) {
        do {
          node.extends.push(this.flowParseInterfaceExtends());
        } while (this.eat(tt.comma));
      }

      node.body = this.flowParseObjectType({
        allowStatic: false,
        allowExact: false,
        allowSpread: false,
        allowProto: false,
        allowInexact: false,
      });

      return this.finishNode(node, "InterfaceTypeAnnotation");
    }

    flowParseObjectPropertyKey(): N.Expression {
      return this.match(tt.num) || this.match(tt.string)
        ? this.parseExprAtom()
        : this.parseIdentifier(true);
    }

    flowParseObjectTypeIndexer(
      node: N.FlowObjectTypeIndexer,
      isStatic: boolean,
      variance: ?N.FlowVariance,
    ): N.FlowObjectTypeIndexer {
      node.static = isStatic;

      // Note: bracketL has already been consumed
      if (this.lookahead().type === tt.colon) {
        node.id = this.flowParseObjectPropertyKey();
        node.key = this.flowParseTypeInitialiser();
      } else {
        node.id = null;
        node.key = this.flowParseType();
      }
      this.expect(tt.bracketR);
      node.value = this.flowParseTypeInitialiser();
      node.variance = variance;

      return this.finishNode(node, "ObjectTypeIndexer");
    }

    flowParseObjectTypeInternalSlot(
      node: N.FlowObjectTypeInternalSlot,
      isStatic: boolean,
    ): N.FlowObjectTypeInternalSlot {
      node.static = isStatic;
      // Note: both bracketL have already been consumed
      node.id = this.flowParseObjectPropertyKey();
      this.expect(tt.bracketR);
      this.expect(tt.bracketR);
      if (this.match(tt.lt) || this.match(tt.parenL)) {
        node.method = true;
        node.optional = false;
        node.value = this.flowParseObjectTypeMethodish(
          this.startNodeAt(node.start, node.loc.start),
        );
      } else {
        node.method = false;
        if (this.eat(tt.question)) {
          node.optional = true;
        }
        node.value = this.flowParseTypeInitialiser();
      }
      return this.finishNode(node, "ObjectTypeInternalSlot");
    }

    flowParseObjectTypeMethodish(
      node: N.FlowFunctionTypeAnnotation,
    ): N.FlowFunctionTypeAnnotation {
      node.params = [];
      node.rest = null;
      node.typeParameters = null;
      node.this = null;

      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }

      this.expect(tt.parenL);
      if (this.match(tt._this)) {
        node.this = this.flowParseFunctionTypeParam(/* first */ true);
        // match Flow parser behavior
        node.this.name = null;
        if (!this.match(tt.parenR)) {
          this.expect(tt.comma);
        }
      }
      while (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
        node.params.push(this.flowParseFunctionTypeParam(false));
        if (!this.match(tt.parenR)) {
          this.expect(tt.comma);
        }
      }

      if (this.eat(tt.ellipsis)) {
        node.rest = this.flowParseFunctionTypeParam(false);
      }
      this.expect(tt.parenR);
      node.returnType = this.flowParseTypeInitialiser();

      return this.finishNode(node, "FunctionTypeAnnotation");
    }

    flowParseObjectTypeCallProperty(
      node: N.FlowObjectTypeCallProperty,
      isStatic: boolean,
    ): N.FlowObjectTypeCallProperty {
      const valueNode = this.startNode();
      node.static = isStatic;
      node.value = this.flowParseObjectTypeMethodish(valueNode);
      return this.finishNode(node, "ObjectTypeCallProperty");
    }

    flowParseObjectType({
      allowStatic,
      allowExact,
      allowSpread,
      allowProto,
      allowInexact,
    }: {
      allowStatic: boolean,
      allowExact: boolean,
      allowSpread: boolean,
      allowProto: boolean,
      allowInexact: boolean,
    }): N.FlowObjectTypeAnnotation {
      const oldInType = this.state.inType;
      this.state.inType = true;

      const nodeStart = this.startNode();

      nodeStart.callProperties = [];
      nodeStart.properties = [];
      nodeStart.indexers = [];
      nodeStart.internalSlots = [];

      let endDelim;
      let exact;
      let inexact = false;
      if (allowExact && this.match(tt.braceBarL)) {
        this.expect(tt.braceBarL);
        endDelim = tt.braceBarR;
        exact = true;
      } else {
        this.expect(tt.braceL);
        endDelim = tt.braceR;
        exact = false;
      }

      nodeStart.exact = exact;

      while (!this.match(endDelim)) {
        let isStatic = false;
        let protoStartLoc: ?Position = null;
        let inexactStartLoc: ?Position = null;
        const node = this.startNode();

        if (allowProto && this.isContextual(tt._proto)) {
          const lookahead = this.lookahead();

          if (lookahead.type !== tt.colon && lookahead.type !== tt.question) {
            this.next();
            protoStartLoc = this.state.startLoc;
            allowStatic = false;
          }
        }

        if (allowStatic && this.isContextual(tt._static)) {
          const lookahead = this.lookahead();

          // static is a valid identifier name
          if (lookahead.type !== tt.colon && lookahead.type !== tt.question) {
            this.next();
            isStatic = true;
          }
        }

        const variance = this.flowParseVariance();

        if (this.eat(tt.bracketL)) {
          if (protoStartLoc != null) {
            this.unexpected(protoStartLoc);
          }
          if (this.eat(tt.bracketL)) {
            if (variance) {
              this.unexpected(variance.loc.start);
            }
            nodeStart.internalSlots.push(
              this.flowParseObjectTypeInternalSlot(node, isStatic),
            );
          } else {
            nodeStart.indexers.push(
              this.flowParseObjectTypeIndexer(node, isStatic, variance),
            );
          }
        } else if (this.match(tt.parenL) || this.match(tt.lt)) {
          if (protoStartLoc != null) {
            this.unexpected(protoStartLoc);
          }
          if (variance) {
            this.unexpected(variance.loc.start);
          }
          nodeStart.callProperties.push(
            this.flowParseObjectTypeCallProperty(node, isStatic),
          );
        } else {
          let kind = "init";

          if (this.isContextual(tt._get) || this.isContextual(tt._set)) {
            const lookahead = this.lookahead();
            if (tokenIsLiteralPropertyName(lookahead.type)) {
              kind = this.state.value;
              this.next();
            }
          }

          const propOrInexact = this.flowParseObjectTypeProperty(
            node,
            isStatic,
            protoStartLoc,
            variance,
            kind,
            allowSpread,
            allowInexact ?? !exact,
          );

          if (propOrInexact === null) {
            inexact = true;
            inexactStartLoc = this.state.lastTokStartLoc;
          } else {
            nodeStart.properties.push(propOrInexact);
          }
        }

        this.flowObjectTypeSemicolon();

        if (
          inexactStartLoc &&
          !this.match(tt.braceR) &&
          !this.match(tt.braceBarR)
        ) {
          this.raise(FlowErrors.UnexpectedExplicitInexactInObject, {
            at: inexactStartLoc,
          });
        }
      }

      this.expect(endDelim);

      /* The inexact flag should only be added on ObjectTypeAnnotations that
       * are not the body of an interface, declare interface, or declare class.
       * Since spreads are only allowed in object types, checking that is
       * sufficient here.
       */
      if (allowSpread) {
        nodeStart.inexact = inexact;
      }

      const out = this.finishNode(nodeStart, "ObjectTypeAnnotation");

      this.state.inType = oldInType;

      return out;
    }

    flowParseObjectTypeProperty(
      node: N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty,
      isStatic: boolean,
      protoStartLoc: ?Position,
      variance: ?N.FlowVariance,
      kind: string,
      allowSpread: boolean,
      allowInexact: boolean,
    ): (N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty) | null {
      if (this.eat(tt.ellipsis)) {
        const isInexactToken =
          this.match(tt.comma) ||
          this.match(tt.semi) ||
          this.match(tt.braceR) ||
          this.match(tt.braceBarR);

        if (isInexactToken) {
          if (!allowSpread) {
            this.raise(FlowErrors.InexactInsideNonObject, {
              at: this.state.lastTokStartLoc,
            });
          } else if (!allowInexact) {
            this.raise(FlowErrors.InexactInsideExact, {
              at: this.state.lastTokStartLoc,
            });
          }
          if (variance) {
            this.raise(FlowErrors.InexactVariance, { at: variance });
          }

          return null;
        }

        if (!allowSpread) {
          this.raise(FlowErrors.UnexpectedSpreadType, {
            at: this.state.lastTokStartLoc,
          });
        }
        if (protoStartLoc != null) {
          this.unexpected(protoStartLoc);
        }
        if (variance) {
          this.raise(FlowErrors.SpreadVariance, { at: variance });
        }

        node.argument = this.flowParseType();
        return this.finishNode(node, "ObjectTypeSpreadProperty");
      } else {
        node.key = this.flowParseObjectPropertyKey();
        node.static = isStatic;
        node.proto = protoStartLoc != null;
        node.kind = kind;

        let optional = false;
        if (this.match(tt.lt) || this.match(tt.parenL)) {
          // This is a method property
          node.method = true;

          if (protoStartLoc != null) {
            this.unexpected(protoStartLoc);
          }
          if (variance) {
            this.unexpected(variance.loc.start);
          }

          node.value = this.flowParseObjectTypeMethodish(
            this.startNodeAt(node.start, node.loc.start),
          );
          if (kind === "get" || kind === "set") {
            this.flowCheckGetterSetterParams(node);
          }
          /** Declared classes/interfaces do not allow spread */
          if (
            !allowSpread &&
            node.key.name === "constructor" &&
            node.value.this
          ) {
            this.raise(FlowErrors.ThisParamBannedInConstructor, {
              at: node.value.this,
            });
          }
        } else {
          if (kind !== "init") this.unexpected();

          node.method = false;

          if (this.eat(tt.question)) {
            optional = true;
          }
          node.value = this.flowParseTypeInitialiser();
          node.variance = variance;
        }

        node.optional = optional;

        return this.finishNode(node, "ObjectTypeProperty");
      }
    }

    // This is similar to checkGetterSetterParams, but as
    // @babel/parser uses non estree properties we cannot reuse it here
    flowCheckGetterSetterParams(
      property: N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty,
    ): void {
      const paramCount = property.kind === "get" ? 0 : 1;
      const length =
        property.value.params.length + (property.value.rest ? 1 : 0);

      if (property.value.this) {
        this.raise(
          property.kind === "get"
            ? FlowErrors.GetterMayNotHaveThisParam
            : FlowErrors.SetterMayNotHaveThisParam,
          { at: property.value.this },
        );
      }

      if (length !== paramCount) {
        this.raise(
          property.kind === "get"
            ? Errors.BadGetterArity
            : Errors.BadSetterArity,
          { at: property },
        );
      }

      if (property.kind === "set" && property.value.rest) {
        this.raise(Errors.BadSetterRestParameter, { at: property });
      }
    }

    flowObjectTypeSemicolon(): void {
      if (
        !this.eat(tt.semi) &&
        !this.eat(tt.comma) &&
        !this.match(tt.braceR) &&
        !this.match(tt.braceBarR)
      ) {
        this.unexpected();
      }
    }

    flowParseQualifiedTypeIdentifier(
      startPos?: number,
      startLoc?: Position,
      id?: N.Identifier,
    ): N.FlowQualifiedTypeIdentifier {
      startPos = startPos || this.state.start;
      startLoc = startLoc || this.state.startLoc;
      let node = id || this.flowParseRestrictedIdentifier(true);

      while (this.eat(tt.dot)) {
        const node2 = this.startNodeAt(startPos, startLoc);
        node2.qualification = node;
        node2.id = this.flowParseRestrictedIdentifier(true);
        node = this.finishNode(node2, "QualifiedTypeIdentifier");
      }

      return node;
    }

    flowParseGenericType(
      startPos: number,
      startLoc: Position,
      id: N.Identifier,
    ): N.FlowGenericTypeAnnotation {
      const node = this.startNodeAt(startPos, startLoc);

      node.typeParameters = null;
      node.id = this.flowParseQualifiedTypeIdentifier(startPos, startLoc, id);

      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterInstantiation();
      }

      return this.finishNode(node, "GenericTypeAnnotation");
    }

    flowParseTypeofType(): N.FlowTypeofTypeAnnotation {
      const node = this.startNode();
      this.expect(tt._typeof);
      node.argument = this.flowParsePrimaryType();
      return this.finishNode(node, "TypeofTypeAnnotation");
    }

    flowParseTupleType(): N.FlowTupleTypeAnnotation {
      const node = this.startNode();
      node.types = [];
      this.expect(tt.bracketL);
      // We allow trailing commas
      while (this.state.pos < this.length && !this.match(tt.bracketR)) {
        node.types.push(this.flowParseType());
        if (this.match(tt.bracketR)) break;
        this.expect(tt.comma);
      }
      this.expect(tt.bracketR);
      return this.finishNode(node, "TupleTypeAnnotation");
    }

    flowParseFunctionTypeParam(first: boolean): N.FlowFunctionTypeParam {
      let name = null;
      let optional = false;
      let typeAnnotation = null;
      const node = this.startNode();
      const lh = this.lookahead();
      const isThis = this.state.type === tt._this;

      if (lh.type === tt.colon || lh.type === tt.question) {
        if (isThis && !first) {
          this.raise(FlowErrors.ThisParamMustBeFirst, { at: node });
        }
        name = this.parseIdentifier(isThis);
        if (this.eat(tt.question)) {
          optional = true;
          if (isThis) {
            this.raise(FlowErrors.ThisParamMayNotBeOptional, { at: node });
          }
        }
        typeAnnotation = this.flowParseTypeInitialiser();
      } else {
        typeAnnotation = this.flowParseType();
      }
      node.name = name;
      node.optional = optional;
      node.typeAnnotation = typeAnnotation;
      return this.finishNode(node, "FunctionTypeParam");
    }

    reinterpretTypeAsFunctionTypeParam(
      type: N.FlowType,
    ): N.FlowFunctionTypeParam {
      const node = this.startNodeAt(type.start, type.loc.start);
      node.name = null;
      node.optional = false;
      node.typeAnnotation = type;
      return this.finishNode(node, "FunctionTypeParam");
    }

    flowParseFunctionTypeParams(params: N.FlowFunctionTypeParam[] = []): {
      params: N.FlowFunctionTypeParam[],
      rest: ?N.FlowFunctionTypeParam,
      _this: ?N.FlowFunctionTypeParam,
    } {
      let rest: ?N.FlowFunctionTypeParam = null;
      let _this: ?N.FlowFunctionTypeParam = null;
      if (this.match(tt._this)) {
        _this = this.flowParseFunctionTypeParam(/* first */ true);
        // match Flow parser behavior
        _this.name = null;
        if (!this.match(tt.parenR)) {
          this.expect(tt.comma);
        }
      }
      while (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
        params.push(this.flowParseFunctionTypeParam(false));
        if (!this.match(tt.parenR)) {
          this.expect(tt.comma);
        }
      }
      if (this.eat(tt.ellipsis)) {
        rest = this.flowParseFunctionTypeParam(false);
      }
      return { params, rest, _this };
    }

    flowIdentToTypeAnnotation(
      startPos: number,
      startLoc: Position,
      node: N.FlowTypeAnnotation,
      id: N.Identifier,
    ): N.FlowTypeAnnotation {
      switch (id.name) {
        case "any":
          return this.finishNode(node, "AnyTypeAnnotation");

        case "bool":
        case "boolean":
          return this.finishNode(node, "BooleanTypeAnnotation");

        case "mixed":
          return this.finishNode(node, "MixedTypeAnnotation");

        case "empty":
          return this.finishNode(node, "EmptyTypeAnnotation");

        case "number":
          return this.finishNode(node, "NumberTypeAnnotation");

        case "string":
          return this.finishNode(node, "StringTypeAnnotation");

        case "symbol":
          return this.finishNode(node, "SymbolTypeAnnotation");

        default:
          this.checkNotUnderscore(id.name);
          return this.flowParseGenericType(startPos, startLoc, id);
      }
    }

    // The parsing of types roughly parallels the parsing of expressions, and
    // primary types are kind of like primary expressions...they're the
    // primitives with which other types are constructed.
    flowParsePrimaryType(): N.FlowTypeAnnotation {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      const node = this.startNode();
      let tmp;
      let type;
      let isGroupedType = false;
      const oldNoAnonFunctionType = this.state.noAnonFunctionType;

      switch (this.state.type) {
        case tt.braceL:
          return this.flowParseObjectType({
            allowStatic: false,
            allowExact: false,
            allowSpread: true,
            allowProto: false,
            allowInexact: true,
          });

        case tt.braceBarL:
          return this.flowParseObjectType({
            allowStatic: false,
            allowExact: true,
            allowSpread: true,
            allowProto: false,
            allowInexact: false,
          });

        case tt.bracketL:
          this.state.noAnonFunctionType = false;
          type = this.flowParseTupleType();
          this.state.noAnonFunctionType = oldNoAnonFunctionType;
          return type;

        case tt.lt:
          node.typeParameters = this.flowParseTypeParameterDeclaration();
          this.expect(tt.parenL);
          tmp = this.flowParseFunctionTypeParams();
          node.params = tmp.params;
          node.rest = tmp.rest;
          node.this = tmp._this;
          this.expect(tt.parenR);

          this.expect(tt.arrow);

          node.returnType = this.flowParseType();

          return this.finishNode(node, "FunctionTypeAnnotation");

        case tt.parenL:
          this.next();

          // Check to see if this is actually a grouped type
          if (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
            if (tokenIsIdentifier(this.state.type) || this.match(tt._this)) {
              const token = this.lookahead().type;
              isGroupedType = token !== tt.question && token !== tt.colon;
            } else {
              isGroupedType = true;
            }
          }

          if (isGroupedType) {
            this.state.noAnonFunctionType = false;
            type = this.flowParseType();
            this.state.noAnonFunctionType = oldNoAnonFunctionType;

            // A `,` or a `) =>` means this is an anonymous function type
            if (
              this.state.noAnonFunctionType ||
              !(
                this.match(tt.comma) ||
                (this.match(tt.parenR) && this.lookahead().type === tt.arrow)
              )
            ) {
              this.expect(tt.parenR);
              return type;
            } else {
              // Eat a comma if there is one
              this.eat(tt.comma);
            }
          }

          if (type) {
            tmp = this.flowParseFunctionTypeParams([
              this.reinterpretTypeAsFunctionTypeParam(type),
            ]);
          } else {
            tmp = this.flowParseFunctionTypeParams();
          }

          node.params = tmp.params;
          node.rest = tmp.rest;
          node.this = tmp._this;

          this.expect(tt.parenR);

          this.expect(tt.arrow);

          node.returnType = this.flowParseType();

          node.typeParameters = null;

          return this.finishNode(node, "FunctionTypeAnnotation");

        case tt.string:
          return this.parseLiteral<N.StringLiteralTypeAnnotation>(
            this.state.value,
            "StringLiteralTypeAnnotation",
          );

        case tt._true:
        case tt._false:
          node.value = this.match(tt._true);
          this.next();
          return this.finishNode<N.BooleanLiteralTypeAnnotation>(
            node,
            "BooleanLiteralTypeAnnotation",
          );

        case tt.plusMin:
          if (this.state.value === "-") {
            this.next();
            if (this.match(tt.num)) {
              return this.parseLiteralAtNode<N.NumberLiteralTypeAnnotation>(
                -this.state.value,
                "NumberLiteralTypeAnnotation",
                node,
              );
            }

            if (this.match(tt.bigint)) {
              return this.parseLiteralAtNode<N.BigIntLiteralTypeAnnotation>(
                -this.state.value,
                "BigIntLiteralTypeAnnotation",
                node,
              );
            }

            throw this.raise(FlowErrors.UnexpectedSubtractionOperand, {
              at: this.state.startLoc,
            });
          }

          throw this.unexpected();
        case tt.num:
          return this.parseLiteral(
            this.state.value,
            "NumberLiteralTypeAnnotation",
          );

        case tt.bigint:
          return this.parseLiteral(
            this.state.value,
            "BigIntLiteralTypeAnnotation",
          );

        case tt._void:
          this.next();
          return this.finishNode(node, "VoidTypeAnnotation");

        case tt._null:
          this.next();
          return this.finishNode(node, "NullLiteralTypeAnnotation");

        case tt._this:
          this.next();
          return this.finishNode(node, "ThisTypeAnnotation");

        case tt.star:
          this.next();
          return this.finishNode(node, "ExistsTypeAnnotation");

        case tt._typeof:
          return this.flowParseTypeofType();

        default:
          if (tokenIsKeyword(this.state.type)) {
            const label = tokenLabelName(this.state.type);
            this.next();
            return super.createIdentifier(node, label);
          } else if (tokenIsIdentifier(this.state.type)) {
            if (this.isContextual(tt._interface)) {
              return this.flowParseInterfaceType();
            }

            return this.flowIdentToTypeAnnotation(
              startPos,
              startLoc,
              node,
              this.parseIdentifier(),
            );
          }
      }

      throw this.unexpected();
    }

    flowParsePostfixType(): N.FlowTypeAnnotation {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;
      let type = this.flowParsePrimaryType();
      let seenOptionalIndexedAccess = false;
      while (
        (this.match(tt.bracketL) || this.match(tt.questionDot)) &&
        !this.canInsertSemicolon()
      ) {
        const node = this.startNodeAt(startPos, startLoc);
        const optional = this.eat(tt.questionDot);
        seenOptionalIndexedAccess = seenOptionalIndexedAccess || optional;
        this.expect(tt.bracketL);
        if (!optional && this.match(tt.bracketR)) {
          node.elementType = type;
          this.next(); // eat `]`
          type = this.finishNode(node, "ArrayTypeAnnotation");
        } else {
          node.objectType = type;
          node.indexType = this.flowParseType();
          this.expect(tt.bracketR);
          if (seenOptionalIndexedAccess) {
            node.optional = optional;
            type = this.finishNode<N.FlowOptionalIndexedAccessType>(
              node,
              "OptionalIndexedAccessType",
            );
          } else {
            type = this.finishNode<N.FlowIndexedAccessType>(
              node,
              "IndexedAccessType",
            );
          }
        }
      }
      return type;
    }

    flowParsePrefixType(): N.FlowTypeAnnotation {
      const node = this.startNode();
      if (this.eat(tt.question)) {
        node.typeAnnotation = this.flowParsePrefixType();
        return this.finishNode(node, "NullableTypeAnnotation");
      } else {
        return this.flowParsePostfixType();
      }
    }

    flowParseAnonFunctionWithoutParens(): N.FlowTypeAnnotation {
      const param = this.flowParsePrefixType();
      if (!this.state.noAnonFunctionType && this.eat(tt.arrow)) {
        // TODO: This should be a type error. Passing in a SourceLocation, and it expects a Position.
        const node = this.startNodeAt(param.start, param.loc.start);
        node.params = [this.reinterpretTypeAsFunctionTypeParam(param)];
        node.rest = null;
        node.this = null;
        node.returnType = this.flowParseType();
        node.typeParameters = null;
        return this.finishNode(node, "FunctionTypeAnnotation");
      }
      return param;
    }

    flowParseIntersectionType(): N.FlowTypeAnnotation {
      const node = this.startNode();
      this.eat(tt.bitwiseAND);
      const type = this.flowParseAnonFunctionWithoutParens();
      node.types = [type];
      while (this.eat(tt.bitwiseAND)) {
        node.types.push(this.flowParseAnonFunctionWithoutParens());
      }
      return node.types.length === 1
        ? type
        : this.finishNode(node, "IntersectionTypeAnnotation");
    }

    flowParseUnionType(): N.FlowTypeAnnotation {
      const node = this.startNode();
      this.eat(tt.bitwiseOR);
      const type = this.flowParseIntersectionType();
      node.types = [type];
      while (this.eat(tt.bitwiseOR)) {
        node.types.push(this.flowParseIntersectionType());
      }
      return node.types.length === 1
        ? type
        : this.finishNode(node, "UnionTypeAnnotation");
    }

    flowParseType(): N.FlowTypeAnnotation {
      const oldInType = this.state.inType;
      this.state.inType = true;
      const type = this.flowParseUnionType();
      this.state.inType = oldInType;
      return type;
    }

    flowParseTypeOrImplicitInstantiation(): N.FlowTypeAnnotation {
      if (this.state.type === tt.name && this.state.value === "_") {
        const startPos = this.state.start;
        const startLoc = this.state.startLoc;
        const node = this.parseIdentifier();
        return this.flowParseGenericType(startPos, startLoc, node);
      } else {
        return this.flowParseType();
      }
    }

    flowParseTypeAnnotation(): N.FlowTypeAnnotation {
      const node = this.startNode();
      node.typeAnnotation = this.flowParseTypeInitialiser();
      return this.finishNode(node, "TypeAnnotation");
    }

    flowParseTypeAnnotatableIdentifier(
      allowPrimitiveOverride?: boolean,
    ): N.Identifier {
      const ident = allowPrimitiveOverride
        ? this.parseIdentifier()
        : this.flowParseRestrictedIdentifier();
      if (this.match(tt.colon)) {
        ident.typeAnnotation = this.flowParseTypeAnnotation();
        this.resetEndLocation(ident);
      }
      return ident;
    }

    typeCastToParameter(node: N.Node): N.Node {
      node.expression.typeAnnotation = node.typeAnnotation;

      this.resetEndLocation(node.expression, node.typeAnnotation.loc.end);

      return node.expression;
    }

    flowParseVariance(): ?N.FlowVariance {
      let variance = null;
      if (this.match(tt.plusMin)) {
        variance = this.startNode();
        if (this.state.value === "+") {
          variance.kind = "plus";
        } else {
          variance.kind = "minus";
        }
        this.next();
        this.finishNode(variance, "Variance");
      }
      return variance;
    }

    // ==================================
    // Overrides
    // ==================================

    parseFunctionBody(
      node: N.Function,
      allowExpressionBody: ?boolean,
      isMethod?: boolean = false,
    ): void {
      if (allowExpressionBody) {
        return this.forwardNoArrowParamsConversionAt(node, () =>
          super.parseFunctionBody(node, true, isMethod),
        );
      }

      return super.parseFunctionBody(node, false, isMethod);
    }

    parseFunctionBodyAndFinish(
      node: N.BodilessFunctionOrMethodBase,
      type: string,
      isMethod?: boolean = false,
    ): void {
      if (this.match(tt.colon)) {
        const typeNode = this.startNode();

        [
          // $FlowFixMe (destructuring not supported yet)
          typeNode.typeAnnotation,
          // $FlowFixMe (destructuring not supported yet)
          node.predicate,
        ] = this.flowParseTypeAndPredicateInitialiser();

        node.returnType = typeNode.typeAnnotation
          ? this.finishNode(typeNode, "TypeAnnotation")
          : null;
      }

      super.parseFunctionBodyAndFinish(node, type, isMethod);
    }

    // interfaces and enums
    parseStatement(context: ?string, topLevel?: boolean): N.Statement {
      // strict mode handling of `interface` since it's a reserved word
      if (this.state.strict && this.isContextual(tt._interface)) {
        const lookahead = this.lookahead();
        if (tokenIsKeywordOrIdentifier(lookahead.type)) {
          const node = this.startNode();
          this.next();
          return this.flowParseInterface(node);
        }
      } else if (this.shouldParseEnums() && this.isContextual(tt._enum)) {
        const node = this.startNode();
        this.next();
        return this.flowParseEnumDeclaration(node);
      }
      const stmt = super.parseStatement(context, topLevel);
      // We will parse a flow pragma in any comment before the first statement.
      if (this.flowPragma === undefined && !this.isValidDirective(stmt)) {
        this.flowPragma = null;
      }
      return stmt;
    }

    // declares, interfaces and type aliases
    parseExpressionStatement(
      node: N.ExpressionStatement,
      expr: N.Expression,
    ): N.ExpressionStatement {
      if (expr.type === "Identifier") {
        if (expr.name === "declare") {
          if (
            this.match(tt._class) ||
            tokenIsIdentifier(this.state.type) ||
            this.match(tt._function) ||
            this.match(tt._var) ||
            this.match(tt._export)
          ) {
            return this.flowParseDeclare(node);
          }
        } else if (tokenIsIdentifier(this.state.type)) {
          if (expr.name === "interface") {
            return this.flowParseInterface(node);
          } else if (expr.name === "type") {
            return this.flowParseTypeAlias(node);
          } else if (expr.name === "opaque") {
            return this.flowParseOpaqueType(node, false);
          }
        }
      }

      return super.parseExpressionStatement(node, expr);
    }

    // export type
    shouldParseExportDeclaration(): boolean {
      const { type } = this.state;
      if (
        tokenIsFlowInterfaceOrTypeOrOpaque(type) ||
        (this.shouldParseEnums() && type === tt._enum)
      ) {
        return !this.state.containsEsc;
      }
      return super.shouldParseExportDeclaration();
    }

    isExportDefaultSpecifier(): boolean {
      const { type } = this.state;
      if (
        tokenIsFlowInterfaceOrTypeOrOpaque(type) ||
        (this.shouldParseEnums() && type === tt._enum)
      ) {
        return this.state.containsEsc;
      }

      return super.isExportDefaultSpecifier();
    }

    parseExportDefaultExpression(): N.Expression | N.Declaration {
      if (this.shouldParseEnums() && this.isContextual(tt._enum)) {
        const node = this.startNode();
        this.next();
        return this.flowParseEnumDeclaration(node);
      }
      return super.parseExportDefaultExpression();
    }

    parseConditional(
      expr: N.Expression,
      startPos: number,
      startLoc: Position,
      refExpressionErrors?: ?ExpressionErrors,
    ): N.Expression {
      if (!this.match(tt.question)) return expr;

      if (this.state.maybeInArrowParameters) {
        const nextCh = this.lookaheadCharCode();
        // These tokens cannot start an expression, so if one of them follows
        // ? then we are probably in an arrow function parameters list and we
        // don't parse the conditional expression.
        if (
          nextCh === charCodes.comma || // (a?, b) => c
          nextCh === charCodes.equalsTo || // (a? = b) => c
          nextCh === charCodes.colon || // (a?: b) => c
          nextCh === charCodes.rightParenthesis // (a?) => c
        ) {
          /*:: invariant(refExpressionErrors != null) */
          this.setOptionalParametersError(refExpressionErrors);
          return expr;
        }
      }

      this.expect(tt.question);
      const state = this.state.clone();
      const originalNoArrowAt = this.state.noArrowAt;
      const node = this.startNodeAt(startPos, startLoc);
      let { consequent, failed } = this.tryParseConditionalConsequent();
      let [valid, invalid] = this.getArrowLikeExpressions(consequent);

      if (failed || invalid.length > 0) {
        const noArrowAt = [...originalNoArrowAt];

        if (invalid.length > 0) {
          this.state = state;
          this.state.noArrowAt = noArrowAt;

          for (let i = 0; i < invalid.length; i++) {
            noArrowAt.push(invalid[i].start);
          }

          ({ consequent, failed } = this.tryParseConditionalConsequent());
          [valid, invalid] = this.getArrowLikeExpressions(consequent);
        }

        if (failed && valid.length > 1) {
          // if there are two or more possible correct ways of parsing, throw an
          // error.
          // e.g.   Source: a ? (b): c => (d): e => f
          //      Result 1: a ? b : (c => ((d): e => f))
          //      Result 2: a ? ((b): c => d) : (e => f)
          this.raise(FlowErrors.AmbiguousConditionalArrow, {
            at: state.startLoc,
          });
        }

        if (failed && valid.length === 1) {
          this.state = state;
          noArrowAt.push(valid[0].start);
          this.state.noArrowAt = noArrowAt;
          ({ consequent, failed } = this.tryParseConditionalConsequent());
        }
      }

      this.getArrowLikeExpressions(consequent, true);

      this.state.noArrowAt = originalNoArrowAt;
      this.expect(tt.colon);

      node.test = expr;
      node.consequent = consequent;
      node.alternate = this.forwardNoArrowParamsConversionAt(node, () =>
        this.parseMaybeAssign(undefined, undefined),
      );

      return this.finishNode(node, "ConditionalExpression");
    }

    tryParseConditionalConsequent(): {
      consequent: N.Expression,
      failed: boolean,
    } {
      this.state.noArrowParamsConversionAt.push(this.state.start);

      const consequent = this.parseMaybeAssignAllowIn();
      const failed = !this.match(tt.colon);

      this.state.noArrowParamsConversionAt.pop();

      return { consequent, failed };
    }

    // Given an expression, walks through out its arrow functions whose body is
    // an expression and through out conditional expressions. It returns every
    // function which has been parsed with a return type but could have been
    // parenthesized expressions.
    // These functions are separated into two arrays: one containing the ones
    // whose parameters can be converted to assignable lists, one containing the
    // others.
    getArrowLikeExpressions(
      node: N.Expression,
      disallowInvalid?: boolean,
    ): [N.ArrowFunctionExpression[], N.ArrowFunctionExpression[]] {
      const stack = [node];
      const arrows: N.ArrowFunctionExpression[] = [];

      while (stack.length !== 0) {
        const node = stack.pop();
        if (node.type === "ArrowFunctionExpression") {
          if (node.typeParameters || !node.returnType) {
            // This is an arrow expression without ambiguity, so check its parameters
            this.finishArrowValidation(node);
          } else {
            arrows.push(node);
          }
          stack.push(node.body);
        } else if (node.type === "ConditionalExpression") {
          stack.push(node.consequent);
          stack.push(node.alternate);
        }
      }

      if (disallowInvalid) {
        arrows.forEach(node => this.finishArrowValidation(node));
        return [arrows, []];
      }

      return partition(arrows, node =>
        node.params.every(param => this.isAssignable(param, true)),
      );
    }

    finishArrowValidation(node: N.ArrowFunctionExpression) {
      this.toAssignableList(
        // node.params is Expression[] instead of $ReadOnlyArray<Pattern> because it
        // has not been converted yet.
        ((node.params: any): N.Expression[]),
        node.extra?.trailingCommaLoc,
        /* isLHS */ false,
      );
      // Enter scope, as checkParams defines bindings
      this.scope.enter(SCOPE_FUNCTION | SCOPE_ARROW);
      // Use super's method to force the parameters to be checked
      super.checkParams(node, false, true);
      this.scope.exit();
    }

    forwardNoArrowParamsConversionAt<T>(node: N.Node, parse: () => T): T {
      let result: T;
      if (this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
        this.state.noArrowParamsConversionAt.push(this.state.start);
        result = parse();
        this.state.noArrowParamsConversionAt.pop();
      } else {
        result = parse();
      }

      return result;
    }

    parseParenItem(
      node: N.Expression,
      startPos: number,
      startLoc: Position,
    ): N.Expression {
      node = super.parseParenItem(node, startPos, startLoc);
      if (this.eat(tt.question)) {
        node.optional = true;
        // Include questionmark in location of node
        // Don't use this.finishNode() as otherwise we might process comments twice and
        // include already consumed parens
        this.resetEndLocation(node);
      }

      if (this.match(tt.colon)) {
        const typeCastNode = this.startNodeAt(startPos, startLoc);
        typeCastNode.expression = node;
        typeCastNode.typeAnnotation = this.flowParseTypeAnnotation();

        return this.finishNode(typeCastNode, "TypeCastExpression");
      }

      return node;
    }

    assertModuleNodeAllowed(node: N.Node) {
      if (
        (node.type === "ImportDeclaration" &&
          (node.importKind === "type" || node.importKind === "typeof")) ||
        (node.type === "ExportNamedDeclaration" &&
          node.exportKind === "type") ||
        (node.type === "ExportAllDeclaration" && node.exportKind === "type")
      ) {
        // Allow Flowtype imports and exports in all conditions because
        // Flow itself does not care about 'sourceType'.
        return;
      }

      super.assertModuleNodeAllowed(node);
    }

    parseExport(node: N.Node): N.AnyExport {
      const decl = super.parseExport(node);
      if (
        decl.type === "ExportNamedDeclaration" ||
        decl.type === "ExportAllDeclaration"
      ) {
        decl.exportKind = decl.exportKind || "value";
      }
      return decl;
    }

    parseExportDeclaration(node: N.ExportNamedDeclaration): ?N.Declaration {
      if (this.isContextual(tt._type)) {
        node.exportKind = "type";

        const declarationNode = this.startNode();
        this.next();

        if (this.match(tt.braceL)) {
          // export type { foo, bar };
          node.specifiers = this.parseExportSpecifiers(
            /* isInTypeExport */ true,
          );
          this.parseExportFrom(node);
          return null;
        } else {
          // export type Foo = Bar;
          return this.flowParseTypeAlias(declarationNode);
        }
      } else if (this.isContextual(tt._opaque)) {
        node.exportKind = "type";

        const declarationNode = this.startNode();
        this.next();
        // export opaque type Foo = Bar;
        return this.flowParseOpaqueType(declarationNode, false);
      } else if (this.isContextual(tt._interface)) {
        node.exportKind = "type";
        const declarationNode = this.startNode();
        this.next();
        return this.flowParseInterface(declarationNode);
      } else if (this.shouldParseEnums() && this.isContextual(tt._enum)) {
        node.exportKind = "value";
        const declarationNode = this.startNode();
        this.next();
        return this.flowParseEnumDeclaration(declarationNode);
      } else {
        return super.parseExportDeclaration(node);
      }
    }

    eatExportStar(node: N.Node): boolean {
      if (super.eatExportStar(...arguments)) return true;

      if (this.isContextual(tt._type) && this.lookahead().type === tt.star) {
        node.exportKind = "type";
        this.next();
        this.next();
        return true;
      }

      return false;
    }

    maybeParseExportNamespaceSpecifier(node: N.Node): boolean {
      const { startLoc } = this.state;
      const hasNamespace = super.maybeParseExportNamespaceSpecifier(node);
      if (hasNamespace && node.exportKind === "type") {
        this.unexpected(startLoc);
      }
      return hasNamespace;
    }

    parseClassId(node: N.Class, isStatement: boolean, optionalId: ?boolean) {
      super.parseClassId(node, isStatement, optionalId);
      if (this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
    }

    parseClassMember(
      classBody: N.ClassBody,
      member: any,
      state: N.ParseClassMemberState,
    ): void {
      const { startLoc } = this.state;
      if (this.isContextual(tt._declare)) {
        if (this.parseClassMemberFromModifier(classBody, member)) {
          // 'declare' is a class element name
          return;
        }

        member.declare = true;
      }

      super.parseClassMember(classBody, member, state);

      if (member.declare) {
        if (
          member.type !== "ClassProperty" &&
          member.type !== "ClassPrivateProperty" &&
          member.type !== "PropertyDefinition" // Used by estree plugin
        ) {
          this.raise(FlowErrors.DeclareClassElement, { at: startLoc });
        } else if (member.value) {
          this.raise(FlowErrors.DeclareClassFieldInitializer, {
            at: member.value,
          });
        }
      }
    }

    isIterator(word: string): boolean {
      return word === "iterator" || word === "asyncIterator";
    }

    readIterator(): void {
      const word = super.readWord1();
      const fullWord = "@@" + word;

      // Allow @@iterator and @@asyncIterator as a identifier only inside type
      if (!this.isIterator(word) || !this.state.inType) {
        this.raise(Errors.InvalidIdentifier, {
          at: this.state.curPosition(),
          identifier: fullWord,
        });
      }

      this.finishToken(tt.name, fullWord);
    }

    // ensure that inside flow types, we bypass the jsx parser plugin
    getTokenFromCode(code: number): void {
      const next = this.input.charCodeAt(this.state.pos + 1);
      if (code === charCodes.leftCurlyBrace && next === charCodes.verticalBar) {
        return this.finishOp(tt.braceBarL, 2);
      } else if (
        this.state.inType &&
        (code === charCodes.greaterThan || code === charCodes.lessThan)
      ) {
        return this.finishOp(code === charCodes.greaterThan ? tt.gt : tt.lt, 1);
      } else if (this.state.inType && code === charCodes.questionMark) {
        if (next === charCodes.dot) {
          return this.finishOp(tt.questionDot, 2);
        }
        // allow double nullable types in Flow: ??string
        return this.finishOp(tt.question, 1);
      } else if (
        isIteratorStart(code, next, this.input.charCodeAt(this.state.pos + 2))
      ) {
        this.state.pos += 2; // eat "@@"
        return this.readIterator();
      } else {
        return super.getTokenFromCode(code);
      }
    }

    isAssignable(node: N.Node, isBinding?: boolean): boolean {
      if (node.type === "TypeCastExpression") {
        return this.isAssignable(node.expression, isBinding);
      } else {
        return super.isAssignable(node, isBinding);
      }
    }

    toAssignable(node: N.Node, isLHS: boolean = false): N.Node {
      if (node.type === "TypeCastExpression") {
        return super.toAssignable(this.typeCastToParameter(node), isLHS);
      } else {
        return super.toAssignable(node, isLHS);
      }
    }

    // turn type casts that we found in function parameter head into type annotated params
    toAssignableList(
      exprList: N.Expression[],
      trailingCommaLoc?: ?Position,
      isLHS: boolean,
    ): $ReadOnlyArray<N.Pattern> {
      for (let i = 0; i < exprList.length; i++) {
        const expr = exprList[i];
        if (expr?.type === "TypeCastExpression") {
          exprList[i] = this.typeCastToParameter(expr);
        }
      }
      return super.toAssignableList(exprList, trailingCommaLoc, isLHS);
    }

    // this is a list of nodes, from something like a call expression, we need to filter the
    // type casts that we've found that are illegal in this context
    toReferencedList(
      exprList: $ReadOnlyArray<?N.Expression>,
      isParenthesizedExpr?: boolean,
    ): $ReadOnlyArray<?N.Expression> {
      for (let i = 0; i < exprList.length; i++) {
        const expr = exprList[i];
        if (
          expr &&
          expr.type === "TypeCastExpression" &&
          !expr.extra?.parenthesized &&
          (exprList.length > 1 || !isParenthesizedExpr)
        ) {
          this.raise(FlowErrors.TypeCastInPattern, {
            at: expr.typeAnnotation,
          });
        }
      }

      return exprList;
    }

    parseArrayLike(
      close: TokenType,
      canBePattern: boolean,
      isTuple: boolean,
      refExpressionErrors: ?ExpressionErrors,
    ): N.ArrayExpression | N.TupleExpression {
      const node = super.parseArrayLike(
        close,
        canBePattern,
        isTuple,
        refExpressionErrors,
      );

      // This could be an array pattern:
      //   ([a: string, b: string]) => {}
      // In this case, we don't have to call toReferencedList. We will
      // call it, if needed, when we are sure that it is a parenthesized
      // expression by calling toReferencedListDeep.
      if (canBePattern && !this.state.maybeInArrowParameters) {
        this.toReferencedList(node.elements);
      }

      return node;
    }

    isValidLVal(type: string, ...rest) {
      return (
        { TypeCastExpression: true }[type] || super.isValidLVal(type, ...rest)
      );
    }

    // parse class property type annotations
    parseClassProperty(node: N.ClassProperty): N.ClassProperty {
      if (this.match(tt.colon)) {
        node.typeAnnotation = this.flowParseTypeAnnotation();
      }
      return super.parseClassProperty(node);
    }

    parseClassPrivateProperty(
      node: N.ClassPrivateProperty,
    ): N.ClassPrivateProperty {
      if (this.match(tt.colon)) {
        node.typeAnnotation = this.flowParseTypeAnnotation();
      }
      return super.parseClassPrivateProperty(node);
    }

    // determine whether or not we're currently in the position where a class method would appear
    isClassMethod(): boolean {
      return this.match(tt.lt) || super.isClassMethod();
    }

    // determine whether or not we're currently in the position where a class property would appear
    isClassProperty(): boolean {
      return this.match(tt.colon) || super.isClassProperty();
    }

    isNonstaticConstructor(method: N.ClassMethod | N.ClassProperty): boolean {
      return !this.match(tt.colon) && super.isNonstaticConstructor(method);
    }

    // parse type parameters for class methods
    pushClassMethod(
      classBody: N.ClassBody,
      method: N.ClassMethod,
      isGenerator: boolean,
      isAsync: boolean,
      isConstructor: boolean,
      allowsDirectSuper: boolean,
    ): void {
      if ((method: $FlowFixMe).variance) {
        this.unexpected((method: $FlowFixMe).variance.loc.start);
      }
      delete (method: $FlowFixMe).variance;
      if (this.match(tt.lt)) {
        method.typeParameters = this.flowParseTypeParameterDeclaration();
      }

      super.pushClassMethod(
        classBody,
        method,
        isGenerator,
        isAsync,
        isConstructor,
        allowsDirectSuper,
      );

      if (method.params && isConstructor) {
        const params = method.params;
        if (params.length > 0 && this.isThisParam(params[0])) {
          this.raise(FlowErrors.ThisParamBannedInConstructor, { at: method });
        }
        // estree support
      } else if (
        // $FlowFixMe flow does not know about the face that estree can replace ClassMethod with MethodDefinition
        method.type === "MethodDefinition" &&
        isConstructor &&
        method.value.params
      ) {
        const params = method.value.params;
        if (params.length > 0 && this.isThisParam(params[0])) {
          this.raise(FlowErrors.ThisParamBannedInConstructor, { at: method });
        }
      }
    }

    pushClassPrivateMethod(
      classBody: N.ClassBody,
      method: N.ClassPrivateMethod,
      isGenerator: boolean,
      isAsync: boolean,
    ): void {
      if ((method: $FlowFixMe).variance) {
        this.unexpected((method: $FlowFixMe).variance.loc.start);
      }
      delete (method: $FlowFixMe).variance;
      if (this.match(tt.lt)) {
        method.typeParameters = this.flowParseTypeParameterDeclaration();
      }

      super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
    }

    // parse a the super class type parameters and implements
    parseClassSuper(node: N.Class): void {
      super.parseClassSuper(node);
      if (node.superClass && this.match(tt.lt)) {
        node.superTypeParameters = this.flowParseTypeParameterInstantiation();
      }
      if (this.isContextual(tt._implements)) {
        this.next();
        const implemented: N.FlowClassImplements[] = (node.implements = []);
        do {
          const node = this.startNode();
          node.id = this.flowParseRestrictedIdentifier(/*liberal*/ true);
          if (this.match(tt.lt)) {
            node.typeParameters = this.flowParseTypeParameterInstantiation();
          } else {
            node.typeParameters = null;
          }
          implemented.push(this.finishNode(node, "ClassImplements"));
        } while (this.eat(tt.comma));
      }
    }

    checkGetterSetterParams(method: N.ObjectMethod | N.ClassMethod): void {
      super.checkGetterSetterParams(method);
      const params = this.getObjectOrClassMethodParams(method);
      if (params.length > 0) {
        const param = params[0];
        if (this.isThisParam(param) && method.kind === "get") {
          this.raise(FlowErrors.GetterMayNotHaveThisParam, { at: param });
        } else if (this.isThisParam(param)) {
          this.raise(FlowErrors.SetterMayNotHaveThisParam, { at: param });
        }
      }
    }

    parsePropertyNamePrefixOperator(
      node: N.ObjectOrClassMember | N.ClassMember,
    ): void {
      node.variance = this.flowParseVariance();
    }

    // parse type parameters for object method shorthand
    parseObjPropValue(
      prop: N.ObjectMember,
      startPos: ?number,
      startLoc: ?Position,
      isGenerator: boolean,
      isAsync: boolean,
      isPattern: boolean,
      isAccessor: boolean,
      refExpressionErrors: ?ExpressionErrors,
    ): void {
      if ((prop: $FlowFixMe).variance) {
        this.unexpected((prop: $FlowFixMe).variance.loc.start);
      }
      delete (prop: $FlowFixMe).variance;

      let typeParameters;

      // method shorthand
      if (this.match(tt.lt) && !isAccessor) {
        typeParameters = this.flowParseTypeParameterDeclaration();
        if (!this.match(tt.parenL)) this.unexpected();
      }

      super.parseObjPropValue(
        prop,
        startPos,
        startLoc,
        isGenerator,
        isAsync,
        isPattern,
        isAccessor,
        refExpressionErrors,
      );

      // add typeParameters if we found them
      if (typeParameters) {
        (prop.value || prop).typeParameters = typeParameters;
      }
    }

    parseAssignableListItemTypes(param: N.Pattern): N.Pattern {
      if (this.eat(tt.question)) {
        if (param.type !== "Identifier") {
          this.raise(FlowErrors.PatternIsOptional, { at: param });
        }
        if (this.isThisParam(param)) {
          this.raise(FlowErrors.ThisParamMayNotBeOptional, { at: param });
        }

        ((param: any): N.Identifier).optional = true;
      }
      if (this.match(tt.colon)) {
        param.typeAnnotation = this.flowParseTypeAnnotation();
      } else if (this.isThisParam(param)) {
        this.raise(FlowErrors.ThisParamAnnotationRequired, { at: param });
      }

      if (this.match(tt.eq) && this.isThisParam(param)) {
        this.raise(FlowErrors.ThisParamNoDefault, { at: param });
      }

      this.resetEndLocation(param);
      return param;
    }

    parseMaybeDefault(
      startPos?: ?number,
      startLoc?: ?Position,
      left?: ?N.Pattern,
    ): N.Pattern {
      const node = super.parseMaybeDefault(startPos, startLoc, left);

      if (
        node.type === "AssignmentPattern" &&
        node.typeAnnotation &&
        node.right.start < node.typeAnnotation.start
      ) {
        this.raise(FlowErrors.TypeBeforeInitializer, {
          at: node.typeAnnotation,
        });
      }

      return node;
    }

    shouldParseDefaultImport(node: N.ImportDeclaration): boolean {
      if (!hasTypeImportKind(node)) {
        return super.shouldParseDefaultImport(node);
      }

      return isMaybeDefaultImport(this.state.type);
    }

    parseImportSpecifierLocal(
      node: N.ImportDeclaration,
      specifier: N.Node,
      type: string,
    ): void {
      specifier.local = hasTypeImportKind(node)
        ? this.flowParseRestrictedIdentifier(
            /* liberal */ true,
            /* declaration */ true,
          )
        : this.parseIdentifier();

      node.specifiers.push(this.finishImportSpecifier(specifier, type));
    }

    // parse typeof and type imports
    maybeParseDefaultImportSpecifier(node: N.ImportDeclaration): boolean {
      node.importKind = "value";

      let kind = null;
      if (this.match(tt._typeof)) {
        kind = "typeof";
      } else if (this.isContextual(tt._type)) {
        kind = "type";
      }
      if (kind) {
        const lh = this.lookahead();
        const { type } = lh;

        // import type * is not allowed
        if (kind === "type" && type === tt.star) {
          // FIXME: lh.start?
          this.unexpected(null, lh.type);
        }

        if (
          isMaybeDefaultImport(type) ||
          type === tt.braceL ||
          type === tt.star
        ) {
          this.next();
          node.importKind = kind;
        }
      }

      return super.maybeParseDefaultImportSpecifier(node);
    }

    // parse import-type/typeof shorthand
    parseImportSpecifier(
      specifier: any,
      importedIsString: boolean,
      isInTypeOnlyImport: boolean,
      // eslint-disable-next-line no-unused-vars
      isMaybeTypeOnly: boolean,
    ): N.ImportSpecifier {
      const firstIdent = specifier.imported;

      let specifierTypeKind = null;
      if (firstIdent.type === "Identifier") {
        if (firstIdent.name === "type") {
          specifierTypeKind = "type";
        } else if (firstIdent.name === "typeof") {
          specifierTypeKind = "typeof";
        }
      }

      let isBinding = false;
      if (this.isContextual(tt._as) && !this.isLookaheadContextual("as")) {
        const as_ident = this.parseIdentifier(true);
        if (
          specifierTypeKind !== null &&
          !tokenIsKeywordOrIdentifier(this.state.type)
        ) {
          // `import {type as ,` or `import {type as }`
          specifier.imported = as_ident;
          specifier.importKind = specifierTypeKind;
          specifier.local = cloneIdentifier(as_ident);
        } else {
          // `import {type as foo`
          specifier.imported = firstIdent;
          specifier.importKind = null;
          specifier.local = this.parseIdentifier();
        }
      } else {
        if (
          specifierTypeKind !== null &&
          tokenIsKeywordOrIdentifier(this.state.type)
        ) {
          // `import {type foo`
          specifier.imported = this.parseIdentifier(true);
          specifier.importKind = specifierTypeKind;
        } else {
          if (importedIsString) {
            /*:: invariant(firstIdent instanceof N.StringLiteral) */
            throw this.raise(Errors.ImportBindingIsString, {
              at: specifier,
              importedBinding: firstIdent.value,
            });
          }
          /*:: invariant(firstIdent instanceof N.Node) */
          specifier.imported = firstIdent;
          specifier.importKind = null;
        }

        if (this.eatContextual(tt._as)) {
          specifier.local = this.parseIdentifier();
        } else {
          isBinding = true;
          specifier.local = cloneIdentifier(specifier.imported);
        }
      }

      const specifierIsTypeImport = hasTypeImportKind(specifier);

      if (isInTypeOnlyImport && specifierIsTypeImport) {
        this.raise(FlowErrors.ImportTypeShorthandOnlyInPureImport, {
          at: specifier,
        });
      }

      if (isInTypeOnlyImport || specifierIsTypeImport) {
        this.checkReservedType(
          specifier.local.name,
          specifier.local.loc.start,
          /* declaration */ true,
        );
      }

      if (isBinding && !isInTypeOnlyImport && !specifierIsTypeImport) {
        this.checkReservedWord(
          specifier.local.name,
          specifier.loc.start,
          true,
          true,
        );
      }

      return this.finishImportSpecifier(specifier, "ImportSpecifier");
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

    // parse function type parameters - function foo<T>() {}
    parseFunctionParams(node: N.Function, allowModifiers?: boolean): void {
      // $FlowFixMe
      const kind = node.kind;
      if (kind !== "get" && kind !== "set" && this.match(tt.lt)) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
      super.parseFunctionParams(node, allowModifiers);
    }

    // parse flow type annotations on variable declarator heads - let foo: string = bar
    parseVarId(
      decl: N.VariableDeclarator,
      kind: "var" | "let" | "const",
    ): void {
      super.parseVarId(decl, kind);
      if (this.match(tt.colon)) {
        decl.id.typeAnnotation = this.flowParseTypeAnnotation();
        this.resetEndLocation(decl.id); // set end position to end of type
      }
    }

    // parse the return type of an async arrow function - let foo = (async (): number => {});
    parseAsyncArrowFromCallExpression(
      node: N.ArrowFunctionExpression,
      call: N.CallExpression,
    ): N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        const oldNoAnonFunctionType = this.state.noAnonFunctionType;
        this.state.noAnonFunctionType = true;
        node.returnType = this.flowParseTypeAnnotation();
        this.state.noAnonFunctionType = oldNoAnonFunctionType;
      }

      return super.parseAsyncArrowFromCallExpression(node, call);
    }

    // todo description
    shouldParseAsyncArrow(): boolean {
      return this.match(tt.colon) || super.shouldParseAsyncArrow();
    }

    // We need to support type parameter declarations for arrow functions. This
    // is tricky. There are three situations we need to handle
    //
    // 1. This is either JSX or an arrow function. We'll try JSX first. If that
    //    fails, we'll try an arrow function. If that fails, we'll throw the JSX
    //    error.
    // 2. This is an arrow function. We'll parse the type parameter declaration,
    //    parse the rest, make sure the rest is an arrow function, and go from
    //    there
    // 3. This is neither. Just call the super method
    parseMaybeAssign(
      refExpressionErrors?: ?ExpressionErrors,
      afterLeftParse?: Function,
    ): N.Expression {
      let state = null;

      let jsx;

      if (
        this.hasPlugin("jsx") &&
        (this.match(tt.jsxTagStart) || this.match(tt.lt))
      ) {
        state = this.state.clone();

        jsx = this.tryParse(
          () => super.parseMaybeAssign(refExpressionErrors, afterLeftParse),
          state,
        );

        /*:: invariant(!jsx.aborted) */
        /*:: invariant(jsx.node != null) */
        if (!jsx.error) return jsx.node;

        // Remove `tc.j_expr` and `tc.j_oTag` from context added
        // by parsing `jsxTagStart` to stop the JSX plugin from
        // messing with the tokens
        const { context } = this.state;
        const currentContext = context[context.length - 1];
        if (currentContext === tc.j_oTag || currentContext === tc.j_expr) {
          context.pop();
        }
      }

      if (jsx?.error || this.match(tt.lt)) {
        state = state || this.state.clone();

        let typeParameters;

        const arrow = this.tryParse(abort => {
          typeParameters = this.flowParseTypeParameterDeclaration();

          const arrowExpression = this.forwardNoArrowParamsConversionAt(
            typeParameters,
            () => {
              const result = super.parseMaybeAssign(
                refExpressionErrors,
                afterLeftParse,
              );

              this.resetStartLocationFromNode(result, typeParameters);

              return result;
            },
          );

          // <T>(() => {});
          // <T>(() => {}: any);
          if (arrowExpression.extra?.parenthesized) abort();

          // The above can return a TypeCastExpression when the arrow
          // expression is not wrapped in parens. See also `this.parseParenItem`.
          // (<T>() => {}: any);
          const expr = this.maybeUnwrapTypeCastExpression(arrowExpression);

          if (expr.type !== "ArrowFunctionExpression") abort();

          expr.typeParameters = typeParameters;
          this.resetStartLocationFromNode(expr, typeParameters);

          return arrowExpression;
        }, state);

        let arrowExpression: ?(
          | N.ArrowFunctionExpression
          | N.TypeCastExpression
        ) = null;

        if (
          arrow.node &&
          this.maybeUnwrapTypeCastExpression(arrow.node).type ===
            "ArrowFunctionExpression"
        ) {
          if (!arrow.error && !arrow.aborted) {
            // <T> async () => {}
            if (arrow.node.async) {
              /*:: invariant(typeParameters) */
              this.raise(
                FlowErrors.UnexpectedTypeParameterBeforeAsyncArrowFunction,
                { at: typeParameters },
              );
            }

            return arrow.node;
          }

          arrowExpression = arrow.node;
        }

        // If we are here, both JSX and Flow parsing attempts failed.
        // Give the precedence to the JSX error, except if JSX had an
        // unrecoverable error while Flow didn't.
        // If the error is recoverable, we can only re-report it if there is
        // a node we can return.

        if (jsx?.node) {
          /*:: invariant(jsx.failState) */
          this.state = jsx.failState;
          return jsx.node;
        }

        if (arrowExpression) {
          /*:: invariant(arrow.failState) */
          this.state = arrow.failState;
          return arrowExpression;
        }

        if (jsx?.thrown) throw jsx.error;
        if (arrow.thrown) throw arrow.error;

        /*:: invariant(typeParameters) */
        throw this.raise(FlowErrors.UnexpectedTokenAfterTypeParameter, {
          at: typeParameters,
        });
      }

      return super.parseMaybeAssign(refExpressionErrors, afterLeftParse);
    }

    // handle return types for arrow functions
    parseArrow(node: N.ArrowFunctionExpression): ?N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        const result = this.tryParse(() => {
          const oldNoAnonFunctionType = this.state.noAnonFunctionType;
          this.state.noAnonFunctionType = true;

          const typeNode = this.startNode();

          [
            // $FlowFixMe (destructuring not supported yet)
            typeNode.typeAnnotation,
            // $FlowFixMe (destructuring not supported yet)
            node.predicate,
          ] = this.flowParseTypeAndPredicateInitialiser();

          this.state.noAnonFunctionType = oldNoAnonFunctionType;

          if (this.canInsertSemicolon()) this.unexpected();
          if (!this.match(tt.arrow)) this.unexpected();

          return typeNode;
        });

        if (result.thrown) return null;
        /*:: invariant(result.node) */

        if (result.error) this.state = result.failState;

        // assign after it is clear it is an arrow
        node.returnType = result.node.typeAnnotation
          ? this.finishNode(result.node, "TypeAnnotation")
          : null;
      }

      return super.parseArrow(node);
    }

    shouldParseArrow(params: Array<N.Node>): boolean {
      return this.match(tt.colon) || super.shouldParseArrow(params);
    }

    setArrowFunctionParameters(
      node: N.ArrowFunctionExpression,
      params: N.Expression[],
    ): void {
      if (this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
        node.params = params;
      } else {
        super.setArrowFunctionParameters(node, params);
      }
    }

    checkParams(
      node: N.Function,
      allowDuplicates: boolean,
      isArrowFunction: ?boolean,
    ): void {
      if (
        isArrowFunction &&
        this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1
      ) {
        return;
      }

      // ensure the `this` param is first, if it exists
      for (let i = 0; i < node.params.length; i++) {
        if (this.isThisParam(node.params[i]) && i > 0) {
          this.raise(FlowErrors.ThisParamMustBeFirst, { at: node.params[i] });
        }
      }

      return super.checkParams(...arguments);
    }

    parseParenAndDistinguishExpression(canBeArrow: boolean): N.Expression {
      return super.parseParenAndDistinguishExpression(
        canBeArrow && this.state.noArrowAt.indexOf(this.state.start) === -1,
      );
    }

    parseSubscripts(
      base: N.Expression,
      startPos: number,
      startLoc: Position,
      noCalls?: ?boolean,
    ): N.Expression {
      if (
        base.type === "Identifier" &&
        base.name === "async" &&
        this.state.noArrowAt.indexOf(startPos) !== -1
      ) {
        this.next();

        const node = this.startNodeAt(startPos, startLoc);
        node.callee = base;
        node.arguments = this.parseCallExpressionArguments(tt.parenR, false);
        base = this.finishNode(node, "CallExpression");
      } else if (
        base.type === "Identifier" &&
        base.name === "async" &&
        this.match(tt.lt)
      ) {
        const state = this.state.clone();
        const arrow = this.tryParse(
          abort =>
            this.parseAsyncArrowWithTypeParameters(startPos, startLoc) ||
            abort(),
          state,
        );

        /*:: invariant(arrow.node != null) */
        if (!arrow.error && !arrow.aborted) return arrow.node;

        const result = this.tryParse(
          () => super.parseSubscripts(base, startPos, startLoc, noCalls),
          state,
        );

        if (result.node && !result.error) return result.node;

        if (arrow.node) {
          this.state = arrow.failState;
          return arrow.node;
        }

        if (result.node) {
          this.state = result.failState;
          return result.node;
        }

        throw arrow.error || result.error;
      }

      return super.parseSubscripts(base, startPos, startLoc, noCalls);
    }

    parseSubscript(
      base: N.Expression,
      startPos: number,
      startLoc: Position,
      noCalls: ?boolean,
      subscriptState: N.ParseSubscriptState,
    ): N.Expression {
      if (this.match(tt.questionDot) && this.isLookaheadToken_lt()) {
        subscriptState.optionalChainMember = true;
        if (noCalls) {
          subscriptState.stop = true;
          return base;
        }
        this.next();
        const node: N.OptionalCallExpression = this.startNodeAt(
          startPos,
          startLoc,
        );
        node.callee = base;
        node.typeArguments = this.flowParseTypeParameterInstantiation();
        this.expect(tt.parenL);
        // $FlowFixMe
        node.arguments = this.parseCallExpressionArguments(tt.parenR, false);
        node.optional = true;
        return this.finishCallExpression(node, /* optional */ true);
      } else if (!noCalls && this.shouldParseTypes() && this.match(tt.lt)) {
        const node = this.startNodeAt(startPos, startLoc);
        node.callee = base;

        const result = this.tryParse(() => {
          node.typeArguments =
            this.flowParseTypeParameterInstantiationCallOrNew();
          this.expect(tt.parenL);
          node.arguments = this.parseCallExpressionArguments(tt.parenR, false);
          if (subscriptState.optionalChainMember) node.optional = false;
          return this.finishCallExpression(
            node,
            subscriptState.optionalChainMember,
          );
        });

        if (result.node) {
          if (result.error) this.state = result.failState;
          return result.node;
        }
      }

      return super.parseSubscript(
        base,
        startPos,
        startLoc,
        noCalls,
        subscriptState,
      );
    }

    parseNewArguments(node: N.NewExpression): void {
      let targs = null;
      if (this.shouldParseTypes() && this.match(tt.lt)) {
        targs = this.tryParse(() =>
          this.flowParseTypeParameterInstantiationCallOrNew(),
        ).node;
      }
      node.typeArguments = targs;

      super.parseNewArguments(node);
    }

    parseAsyncArrowWithTypeParameters(
      startPos: number,
      startLoc: Position,
    ): ?N.ArrowFunctionExpression {
      const node = this.startNodeAt(startPos, startLoc);
      this.parseFunctionParams(node);
      if (!this.parseArrow(node)) return;
      return this.parseArrowExpression(
        node,
        /* params */ undefined,
        /* isAsync */ true,
      );
    }

    readToken_mult_modulo(code: number): void {
      const next = this.input.charCodeAt(this.state.pos + 1);
      if (
        code === charCodes.asterisk &&
        next === charCodes.slash &&
        this.state.hasFlowComment
      ) {
        this.state.hasFlowComment = false;
        this.state.pos += 2;
        this.nextToken();
        return;
      }

      super.readToken_mult_modulo(code);
    }

    readToken_pipe_amp(code: number): void {
      const next = this.input.charCodeAt(this.state.pos + 1);
      if (
        code === charCodes.verticalBar &&
        next === charCodes.rightCurlyBrace
      ) {
        // '|}'
        this.finishOp(tt.braceBarR, 2);
        return;
      }

      super.readToken_pipe_amp(code);
    }

    parseTopLevel(file: N.File, program: N.Program): N.File {
      const fileNode = super.parseTopLevel(file, program);
      if (this.state.hasFlowComment) {
        this.raise(FlowErrors.UnterminatedFlowComment, {
          at: this.state.curPosition(),
        });
      }
      return fileNode;
    }

    skipBlockComment(): N.CommentBlock | void {
      if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
        if (this.state.hasFlowComment) {
          throw this.raise(FlowErrors.NestedFlowComment, {
            at: this.state.startLoc,
          });
        }
        this.hasFlowCommentCompletion();
        this.state.pos += this.skipFlowComment();
        this.state.hasFlowComment = true;
        return;
      }

      if (this.state.hasFlowComment) {
        const end = this.input.indexOf("*-/", this.state.pos + 2);
        if (end === -1) {
          throw this.raise(Errors.UnterminatedComment, {
            at: this.state.curPosition(),
          });
        }
        this.state.pos = end + 2 + 3;
        return;
      }

      return super.skipBlockComment();
    }

    skipFlowComment(): number | boolean {
      const { pos } = this.state;
      let shiftToFirstNonWhiteSpace = 2;
      while (
        [charCodes.space, charCodes.tab].includes(
          this.input.charCodeAt(pos + shiftToFirstNonWhiteSpace),
        )
      ) {
        shiftToFirstNonWhiteSpace++;
      }

      const ch2 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos);
      const ch3 = this.input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);

      if (ch2 === charCodes.colon && ch3 === charCodes.colon) {
        return shiftToFirstNonWhiteSpace + 2; // check for /*::
      }
      if (
        this.input.slice(
          shiftToFirstNonWhiteSpace + pos,
          shiftToFirstNonWhiteSpace + pos + 12,
        ) === "flow-include"
      ) {
        return shiftToFirstNonWhiteSpace + 12; // check for /*flow-include
      }
      if (ch2 === charCodes.colon && ch3 !== charCodes.colon) {
        return shiftToFirstNonWhiteSpace; // check for /*:, advance up to :
      }
      return false;
    }

    hasFlowCommentCompletion(): void {
      const end = this.input.indexOf("*/", this.state.pos);
      if (end === -1) {
        throw this.raise(Errors.UnterminatedComment, {
          at: this.state.curPosition(),
        });
      }
    }

    // Flow enum parsing

    flowEnumErrorBooleanMemberNotInitialized(
      loc: Position,
      { enumName, memberName }: { enumName: string, memberName: string },
    ): void {
      this.raise(FlowErrors.EnumBooleanMemberNotInitialized, {
        at: loc,
        memberName,
        enumName,
      });
    }

    flowEnumErrorInvalidMemberInitializer(
      loc: Position,
      { enumName, explicitType, memberName }: EnumContext,
    ) {
      return this.raise(
        /^(boolean|number|string)$/.test(explicitType || "")
          ? FlowErrors.EnumInvalidMemberInitializerPrimaryType
          : explicitType === "symbol"
          ? FlowErrors.EnumInvalidMemberInitializerSymbolType
          : FlowErrors.EnumInvalidMemberInitializerUnknownType,
        {
          at: loc,
          enumName,
          memberName,
          // FIXME: Handle this being missing better.
          explicitType: explicitType || "unknown",
        },
      );
    }

    flowEnumErrorNumberMemberNotInitialized(
      loc: Position,
      { enumName, memberName }: { enumName: string, memberName: string },
    ): void {
      this.raise(FlowErrors.EnumNumberMemberNotInitialized, {
        at: loc,
        enumName,
        memberName,
      });
    }

    flowEnumErrorStringMemberInconsistentlyInitailized(
      node: N.Node,
      { enumName }: { enumName: string },
    ): void {
      this.raise(FlowErrors.EnumStringMemberInconsistentlyInitailized, {
        at: node,
        enumName,
      });
    }

    flowEnumMemberInit(): EnumMemberInit {
      const startLoc = this.state.startLoc;
      const endOfInit = () => this.match(tt.comma) || this.match(tt.braceR);
      switch (this.state.type) {
        case tt.num: {
          const literal = this.parseNumericLiteral(this.state.value);
          if (endOfInit()) {
            return { type: "number", loc: literal.loc.start, value: literal };
          }
          return { type: "invalid", loc: startLoc };
        }
        case tt.string: {
          const literal = this.parseStringLiteral(this.state.value);
          if (endOfInit()) {
            return { type: "string", loc: literal.loc.start, value: literal };
          }
          return { type: "invalid", loc: startLoc };
        }
        case tt._true:
        case tt._false: {
          const literal = this.parseBooleanLiteral(this.match(tt._true));
          if (endOfInit()) {
            return {
              type: "boolean",
              loc: literal.loc.start,
              value: literal,
            };
          }
          return { type: "invalid", loc: startLoc };
        }
        default:
          return { type: "invalid", loc: startLoc };
      }
    }

    flowEnumMemberRaw(): { id: N.Node, init: EnumMemberInit } {
      const loc = this.state.startLoc;
      const id = this.parseIdentifier(true);
      const init = this.eat(tt.eq)
        ? this.flowEnumMemberInit()
        : { type: "none", loc };
      return { id, init };
    }

    flowEnumCheckExplicitTypeMismatch(
      loc: Position,
      context: EnumContext,
      expectedType: EnumExplicitType,
    ): void {
      const { explicitType } = context;
      if (explicitType === null) {
        return;
      }
      if (explicitType !== expectedType) {
        this.flowEnumErrorInvalidMemberInitializer(loc, context);
      }
    }

    flowEnumMembers({
      enumName,
      explicitType,
    }: {
      enumName: string,
      explicitType: EnumExplicitType,
    }): {|
      members: {|
        booleanMembers: Array<N.Node>,
        numberMembers: Array<N.Node>,
        stringMembers: Array<N.Node>,
        defaultedMembers: Array<N.Node>,
      |},
      hasUnknownMembers: boolean,
    |} {
      const seenNames = new Set();
      const members = {
        booleanMembers: [],
        numberMembers: [],
        stringMembers: [],
        defaultedMembers: [],
      };
      let hasUnknownMembers = false;
      while (!this.match(tt.braceR)) {
        if (this.eat(tt.ellipsis)) {
          hasUnknownMembers = true;
          break;
        }
        const memberNode = this.startNode();
        const { id, init } = this.flowEnumMemberRaw();
        const memberName = id.name;
        if (memberName === "") {
          continue;
        }
        if (/^[a-z]/.test(memberName)) {
          this.raise(FlowErrors.EnumInvalidMemberName, {
            at: id,
            memberName,
            suggestion: memberName[0].toUpperCase() + memberName.slice(1),
            enumName,
          });
        }
        if (seenNames.has(memberName)) {
          this.raise(FlowErrors.EnumDuplicateMemberName, {
            at: id,
            memberName,
            enumName,
          });
        }
        seenNames.add(memberName);
        const context = { enumName, explicitType, memberName };
        memberNode.id = id;
        switch (init.type) {
          case "boolean": {
            this.flowEnumCheckExplicitTypeMismatch(
              init.loc,
              context,
              "boolean",
            );
            memberNode.init = init.value;
            members.booleanMembers.push(
              this.finishNode(memberNode, "EnumBooleanMember"),
            );
            break;
          }
          case "number": {
            this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "number");
            memberNode.init = init.value;
            members.numberMembers.push(
              this.finishNode(memberNode, "EnumNumberMember"),
            );
            break;
          }
          case "string": {
            this.flowEnumCheckExplicitTypeMismatch(init.loc, context, "string");
            memberNode.init = init.value;
            members.stringMembers.push(
              this.finishNode(memberNode, "EnumStringMember"),
            );
            break;
          }
          case "invalid": {
            throw this.flowEnumErrorInvalidMemberInitializer(init.loc, context);
          }
          case "none": {
            switch (explicitType) {
              case "boolean":
                this.flowEnumErrorBooleanMemberNotInitialized(
                  init.loc,
                  context,
                );
                break;
              case "number":
                this.flowEnumErrorNumberMemberNotInitialized(init.loc, context);
                break;
              default:
                members.defaultedMembers.push(
                  this.finishNode(memberNode, "EnumDefaultedMember"),
                );
            }
          }
        }

        if (!this.match(tt.braceR)) {
          this.expect(tt.comma);
        }
      }
      return { members, hasUnknownMembers };
    }

    flowEnumStringMembers(
      initializedMembers: Array<N.Node>,
      defaultedMembers: Array<N.Node>,
      { enumName }: { enumName: string },
    ): Array<N.Node> {
      if (initializedMembers.length === 0) {
        return defaultedMembers;
      } else if (defaultedMembers.length === 0) {
        return initializedMembers;
      } else if (defaultedMembers.length > initializedMembers.length) {
        for (const member of initializedMembers) {
          this.flowEnumErrorStringMemberInconsistentlyInitailized(member, {
            enumName,
          });
        }
        return defaultedMembers;
      } else {
        for (const member of defaultedMembers) {
          this.flowEnumErrorStringMemberInconsistentlyInitailized(member, {
            enumName,
          });
        }
        return initializedMembers;
      }
    }

    flowEnumParseExplicitType({
      enumName,
    }: {
      enumName: string,
    }): EnumExplicitType {
      if (!this.eatContextual(tt._of)) return null;

      if (!tokenIsIdentifier(this.state.type)) {
        throw this.raise(FlowErrors.EnumInvalidExplicitTypeUnknownSupplied, {
          at: this.state.startLoc,
          enumName,
        });
      }

      const { value } = this.state;
      this.next();

      if (
        value !== "boolean" &&
        value !== "number" &&
        value !== "string" &&
        value !== "symbol"
      ) {
        this.raise(FlowErrors.EnumInvalidExplicitType, {
          at: this.state.startLoc,
          enumName,
          invalidEnumType: value,
        });
      }

      return value;
    }

    flowEnumBody(node: N.Node, id: N.Node): N.Node {
      const enumName = id.name;
      const nameLoc = id.loc.start;
      const explicitType = this.flowEnumParseExplicitType({ enumName });
      this.expect(tt.braceL);
      const { members, hasUnknownMembers } = this.flowEnumMembers({
        enumName,
        explicitType,
      });
      node.hasUnknownMembers = hasUnknownMembers;

      switch (explicitType) {
        case "boolean":
          node.explicitType = true;
          node.members = members.booleanMembers;
          this.expect(tt.braceR);
          return this.finishNode(node, "EnumBooleanBody");
        case "number":
          node.explicitType = true;
          node.members = members.numberMembers;
          this.expect(tt.braceR);
          return this.finishNode(node, "EnumNumberBody");
        case "string":
          node.explicitType = true;
          node.members = this.flowEnumStringMembers(
            members.stringMembers,
            members.defaultedMembers,
            { enumName },
          );
          this.expect(tt.braceR);
          return this.finishNode(node, "EnumStringBody");
        case "symbol":
          node.members = members.defaultedMembers;
          this.expect(tt.braceR);
          return this.finishNode(node, "EnumSymbolBody");
        default: {
          // `explicitType` is `null`
          const empty = () => {
            node.members = [];
            this.expect(tt.braceR);
            return this.finishNode(node, "EnumStringBody");
          };
          node.explicitType = false;

          const boolsLen = members.booleanMembers.length;
          const numsLen = members.numberMembers.length;
          const strsLen = members.stringMembers.length;
          const defaultedLen = members.defaultedMembers.length;

          if (!boolsLen && !numsLen && !strsLen && !defaultedLen) {
            return empty();
          } else if (!boolsLen && !numsLen) {
            node.members = this.flowEnumStringMembers(
              members.stringMembers,
              members.defaultedMembers,
              { enumName },
            );
            this.expect(tt.braceR);
            return this.finishNode(node, "EnumStringBody");
          } else if (!numsLen && !strsLen && boolsLen >= defaultedLen) {
            for (const member of members.defaultedMembers) {
              this.flowEnumErrorBooleanMemberNotInitialized(member.loc.start, {
                enumName,
                memberName: member.id.name,
              });
            }
            node.members = members.booleanMembers;
            this.expect(tt.braceR);
            return this.finishNode(node, "EnumBooleanBody");
          } else if (!boolsLen && !strsLen && numsLen >= defaultedLen) {
            for (const member of members.defaultedMembers) {
              this.flowEnumErrorNumberMemberNotInitialized(member.loc.start, {
                enumName,
                memberName: member.id.name,
              });
            }
            node.members = members.numberMembers;
            this.expect(tt.braceR);
            return this.finishNode(node, "EnumNumberBody");
          } else {
            this.raise(FlowErrors.EnumInconsistentMemberValues, {
              at: nameLoc,
              enumName,
            });
            return empty();
          }
        }
      }
    }

    flowParseEnumDeclaration(node: N.Node): N.Node {
      const id = this.parseIdentifier();
      node.id = id;
      node.body = this.flowEnumBody(this.startNode(), id);
      return this.finishNode(node, "EnumDeclaration");
    }

    // check if the next token is a tt.lt
    isLookaheadToken_lt(): boolean {
      const next = this.nextTokenStart();
      if (this.input.charCodeAt(next) === charCodes.lessThan) {
        const afterNext = this.input.charCodeAt(next + 1);
        return (
          afterNext !== charCodes.lessThan && afterNext !== charCodes.equalsTo
        );
      }
      return false;
    }

    maybeUnwrapTypeCastExpression(node: N.Node) {
      return node.type === "TypeCastExpression" ? node.expression : node;
    }
  };
