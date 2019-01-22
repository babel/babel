// @flow

import type Parser from "../parser";
import { types as tt, type TokenType } from "../tokenizer/types";
import * as N from "../types";
import type { Options } from "../options";
import type { Pos, Position } from "../util/location";
import type State from "../tokenizer/state";
import { types as tc } from "../tokenizer/context";
import * as charCodes from "charcodes";
import { isIteratorStart } from "../util/identifier";

const reservedTypes = [
  "any",
  "bool",
  "boolean",
  "empty",
  "false",
  "mixed",
  "null",
  "number",
  "static",
  "string",
  "true",
  "typeof",
  "void",
  "interface",
  "extends",
  "_",
];

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

function isMaybeDefaultImport(state: State): boolean {
  return (
    (state.type === tt.name || !!state.type.keyword) && state.value !== "from"
  );
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

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    // The value of the @flow/@noflow pragma. Initially undefined, transitions
    // to "@flow" or "@noflow" if we see a pragma. Transitions to null if we are
    // past the initial comment.
    flowPragma: void | null | "flow" | "noflow";

    constructor(options: ?Options, input: string) {
      super(options, input);
      this.flowPragma = undefined;
    }

    shouldParseTypes(): boolean {
      return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
    }

    addComment(comment: N.Comment): void {
      if (this.flowPragma === undefined) {
        // Try to parse a flow pragma.
        const matches = FLOW_PRAGMA_REGEX.exec(comment.value);
        if (!matches) {
          this.flowPragma = null;
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
      const moduloPos = this.state.start;
      this.expect(tt.modulo);
      const checksLoc = this.state.startLoc;
      this.expectContextual("checks");
      // Force '%' and 'checks' to be adjacent
      if (
        moduloLoc.line !== checksLoc.line ||
        moduloLoc.column !== checksLoc.column - 1
      ) {
        this.raise(
          moduloPos,
          "Spaces between ´%´ and ´checks´ are not allowed here.",
        );
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

      if (this.isRelational("<")) {
        typeNode.typeParameters = this.flowParseTypeParameterDeclaration();
      } else {
        typeNode.typeParameters = null;
      }

      this.expect(tt.parenL);
      const tmp = this.flowParseFunctionTypeParams();
      typeNode.params = tmp.params;
      typeNode.rest = tmp.rest;
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

      this.finishNode(id, id.type);

      this.semicolon();

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
      } else if (this.isContextual("module")) {
        if (this.lookahead().type === tt.dot) {
          return this.flowParseDeclareModuleExports(node);
        } else {
          if (insideModule) {
            this.unexpected(
              null,
              "`declare module` cannot be used inside another `declare module`",
            );
          }
          return this.flowParseDeclareModule(node);
        }
      } else if (this.isContextual("type")) {
        return this.flowParseDeclareTypeAlias(node);
      } else if (this.isContextual("opaque")) {
        return this.flowParseDeclareOpaqueType(node);
      } else if (this.isContextual("interface")) {
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
      this.semicolon();
      return this.finishNode(node, "DeclareVariable");
    }

    flowParseDeclareModule(node: N.FlowDeclareModule): N.FlowDeclareModule {
      this.next();

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
          const lookahead = this.lookahead();
          if (lookahead.value !== "type" && lookahead.value !== "typeof") {
            this.unexpected(
              null,
              "Imports within a `declare module` body must always be `import type` or `import typeof`",
            );
          }
          this.next();
          this.parseImport(bodyNode);
        } else {
          this.expectContextual(
            "declare",
            "Only declares and type imports are allowed inside declare module",
          );

          bodyNode = this.flowParseDeclare(bodyNode, true);
        }

        body.push(bodyNode);
      }
      this.expect(tt.braceR);

      this.finishNode(bodyNode, "BlockStatement");

      let kind = null;
      let hasModuleExport = false;
      const errorMessage =
        "Found both `declare module.exports` and `declare export` in the same module. " +
        "Modules can only have 1 since they are either an ES module or they are a CommonJS module";
      body.forEach(bodyElement => {
        if (isEsModuleType(bodyElement)) {
          if (kind === "CommonJS") {
            this.unexpected(bodyElement.start, errorMessage);
          }
          kind = "ES";
        } else if (bodyElement.type === "DeclareModuleExports") {
          if (hasModuleExport) {
            this.unexpected(
              bodyElement.start,
              "Duplicate `declare module.exports` statement",
            );
          }
          if (kind === "ES") this.unexpected(bodyElement.start, errorMessage);
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
          ((this.isContextual("type") || this.isContextual("interface")) &&
            !insideModule)
        ) {
          const label = this.state.value;
          const suggestion = exportSuggestions[label];
          this.unexpected(
            this.state.start,
            `\`declare export ${label}\` is not supported. Use \`${suggestion}\` instead`,
          );
        }

        if (
          this.match(tt._var) || // declare export var ...
          this.match(tt._function) || // declare export function ...
          this.match(tt._class) || // declare export class ...
          this.isContextual("opaque") // declare export opaque ..
        ) {
          node.declaration = this.flowParseDeclare(this.startNode());
          node.default = false;

          return this.finishNode(node, "DeclareExportDeclaration");
        } else if (
          this.match(tt.star) || // declare export * from ''
          this.match(tt.braceL) || // declare export {} ...
          this.isContextual("interface") || // declare export interface ...
          this.isContextual("type") || // declare export type ...
          this.isContextual("opaque") // declare export opaque type ...
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
      this.expectContextual("module");
      this.expect(tt.dot);
      this.expectContextual("exports");
      node.typeAnnotation = this.flowParseTypeAnnotation();
      this.semicolon();

      return this.finishNode(node, "DeclareModuleExports");
    }

    flowParseDeclareTypeAlias(
      node: N.FlowDeclareTypeAlias,
    ): N.FlowDeclareTypeAlias {
      this.next();
      this.flowParseTypeAlias(node);
      return this.finishNode(node, "DeclareTypeAlias");
    }

    flowParseDeclareOpaqueType(
      node: N.FlowDeclareOpaqueType,
    ): N.FlowDeclareOpaqueType {
      this.next();
      this.flowParseOpaqueType(node, true);
      return this.finishNode(node, "DeclareOpaqueType");
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
      node.id = this.flowParseRestrictedIdentifier(/*liberal*/ !isClass);

      if (this.isRelational("<")) {
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

      if (this.isContextual("mixins")) {
        this.next();
        do {
          node.mixins.push(this.flowParseInterfaceExtends());
        } while (this.eat(tt.comma));
      }

      if (this.isContextual("implements")) {
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
      if (this.isRelational("<")) {
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
        throw this.unexpected(
          null,
          "`_` is only allowed as a type argument to call or new",
        );
      }
    }

    checkReservedType(word: string, startLoc: number) {
      if (reservedTypes.indexOf(word) > -1) {
        this.raise(startLoc, `Cannot overwrite reserved type ${word}`);
      }
    }

    flowParseRestrictedIdentifier(liberal?: boolean): N.Identifier {
      this.checkReservedType(this.state.value, this.state.start);
      return this.parseIdentifier(liberal);
    }

    // Type aliases

    flowParseTypeAlias(node: N.FlowTypeAlias): N.FlowTypeAlias {
      node.id = this.flowParseRestrictedIdentifier();

      if (this.isRelational("<")) {
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
      this.expectContextual("type");
      node.id = this.flowParseRestrictedIdentifier(/*liberal*/ true);

      if (this.isRelational("<")) {
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

    flowParseTypeParameter(
      allowDefault?: boolean = true,
      requireDefault?: boolean = false,
    ): N.TypeParameter {
      if (!allowDefault && requireDefault) {
        throw new Error(
          "Cannot disallow a default value (`allowDefault`) while also requiring it (`requireDefault`).",
        );
      }

      const nodeStart = this.state.start;

      const node = this.startNode();

      const variance = this.flowParseVariance();

      const ident = this.flowParseTypeAnnotatableIdentifier();
      node.name = ident.name;
      node.variance = variance;
      node.bound = ident.typeAnnotation;

      if (this.match(tt.eq)) {
        if (allowDefault) {
          this.eat(tt.eq);
          node.default = this.flowParseType();
        } else {
          this.unexpected();
        }
      } else {
        if (requireDefault) {
          this.unexpected(
            nodeStart,
            // eslint-disable-next-line max-len
            "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
          );
        }
      }

      return this.finishNode(node, "TypeParameter");
    }

    flowParseTypeParameterDeclaration(
      allowDefault?: boolean = true,
    ): N.TypeParameterDeclaration {
      const oldInType = this.state.inType;
      const node = this.startNode();
      node.params = [];

      this.state.inType = true;

      // istanbul ignore else: this condition is already checked at all call sites
      if (this.isRelational("<") || this.match(tt.jsxTagStart)) {
        this.next();
      } else {
        this.unexpected();
      }

      let defaultRequired = false;

      do {
        const typeParameter = this.flowParseTypeParameter(
          allowDefault,
          defaultRequired,
        );

        node.params.push(typeParameter);

        if (typeParameter.default) {
          defaultRequired = true;
        }

        if (!this.isRelational(">")) {
          this.expect(tt.comma);
        }
      } while (!this.isRelational(">"));
      this.expectRelational(">");

      this.state.inType = oldInType;

      return this.finishNode(node, "TypeParameterDeclaration");
    }

    flowParseTypeParameterInstantiation(): N.TypeParameterInstantiation {
      const node = this.startNode();
      const oldInType = this.state.inType;
      node.params = [];

      this.state.inType = true;

      this.expectRelational("<");
      const oldNoAnonFunctionType = this.state.noAnonFunctionType;
      this.state.noAnonFunctionType = false;
      while (!this.isRelational(">")) {
        node.params.push(this.flowParseType());
        if (!this.isRelational(">")) {
          this.expect(tt.comma);
        }
      }
      this.state.noAnonFunctionType = oldNoAnonFunctionType;
      this.expectRelational(">");

      this.state.inType = oldInType;

      return this.finishNode(node, "TypeParameterInstantiation");
    }

    flowParseTypeParameterInstantiationCallOrNew(): N.TypeParameterInstantiation {
      const node = this.startNode();
      const oldInType = this.state.inType;
      node.params = [];

      this.state.inType = true;

      this.expectRelational("<");
      while (!this.isRelational(">")) {
        node.params.push(this.flowParseTypeOrImplicitInstantiation());
        if (!this.isRelational(">")) {
          this.expect(tt.comma);
        }
      }
      this.expectRelational(">");

      this.state.inType = oldInType;

      return this.finishNode(node, "TypeParameterInstantiation");
    }

    flowParseInterfaceType(): N.FlowInterfaceType {
      const node = this.startNode();
      this.expectContextual("interface");

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
      if (this.isRelational("<") || this.match(tt.parenL)) {
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

      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration(
          /* allowDefault */ false,
        );
      }

      this.expect(tt.parenL);
      while (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
        node.params.push(this.flowParseFunctionTypeParam());
        if (!this.match(tt.parenR)) {
          this.expect(tt.comma);
        }
      }

      if (this.eat(tt.ellipsis)) {
        node.rest = this.flowParseFunctionTypeParam();
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
        let protoStart: ?number = null;
        const node = this.startNode();

        if (allowProto && this.isContextual("proto")) {
          const lookahead = this.lookahead();

          if (lookahead.type !== tt.colon && lookahead.type !== tt.question) {
            this.next();
            protoStart = this.state.start;
            allowStatic = false;
          }
        }

        if (allowStatic && this.isContextual("static")) {
          const lookahead = this.lookahead();

          // static is a valid identifier name
          if (lookahead.type !== tt.colon && lookahead.type !== tt.question) {
            this.next();
            isStatic = true;
          }
        }

        const variance = this.flowParseVariance();

        if (this.eat(tt.bracketL)) {
          if (protoStart != null) {
            this.unexpected(protoStart);
          }
          if (this.eat(tt.bracketL)) {
            if (variance) {
              this.unexpected(variance.start);
            }
            nodeStart.internalSlots.push(
              this.flowParseObjectTypeInternalSlot(node, isStatic),
            );
          } else {
            nodeStart.indexers.push(
              this.flowParseObjectTypeIndexer(node, isStatic, variance),
            );
          }
        } else if (this.match(tt.parenL) || this.isRelational("<")) {
          if (protoStart != null) {
            this.unexpected(protoStart);
          }
          if (variance) {
            this.unexpected(variance.start);
          }
          nodeStart.callProperties.push(
            this.flowParseObjectTypeCallProperty(node, isStatic),
          );
        } else {
          let kind = "init";

          if (this.isContextual("get") || this.isContextual("set")) {
            const lookahead = this.lookahead();
            if (
              lookahead.type === tt.name ||
              lookahead.type === tt.string ||
              lookahead.type === tt.num
            ) {
              kind = this.state.value;
              this.next();
            }
          }

          const propOrInexact = this.flowParseObjectTypeProperty(
            node,
            isStatic,
            protoStart,
            variance,
            kind,
            allowSpread,
            allowInexact,
          );

          if (propOrInexact === null) {
            inexact = true;
          } else {
            nodeStart.properties.push(propOrInexact);
          }
        }

        this.flowObjectTypeSemicolon();
      }

      this.expect(endDelim);

      /* The inexact flag should only be added on ObjectTypeAnnotations that
       * are not the body of an interface, declare interface, or declare class.
       * Since spreads are only allowed in objec types, checking that is
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
      protoStart: ?number,
      variance: ?N.FlowVariance,
      kind: string,
      allowSpread: boolean,
      allowInexact: boolean,
    ): (N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty) | null {
      if (this.match(tt.ellipsis)) {
        if (!allowSpread) {
          this.unexpected(
            null,
            "Spread operator cannot appear in class or interface definitions",
          );
        }
        if (protoStart != null) {
          this.unexpected(protoStart);
        }
        if (variance) {
          this.unexpected(
            variance.start,
            "Spread properties cannot have variance",
          );
        }
        this.expect(tt.ellipsis);
        const isInexactToken = this.eat(tt.comma) || this.eat(tt.semi);

        if (this.match(tt.braceR)) {
          if (allowInexact) return null;
          this.unexpected(
            null,
            "Explicit inexact syntax is only allowed inside inexact objects",
          );
        }

        if (this.match(tt.braceBarR)) {
          this.unexpected(
            null,
            "Explicit inexact syntax cannot appear inside an explicit exact object type",
          );
        }

        if (isInexactToken) {
          this.unexpected(
            null,
            "Explicit inexact syntax must appear at the end of an inexact object",
          );
        }
        node.argument = this.flowParseType();
        return this.finishNode(node, "ObjectTypeSpreadProperty");
      } else {
        node.key = this.flowParseObjectPropertyKey();
        node.static = isStatic;
        node.proto = protoStart != null;
        node.kind = kind;

        let optional = false;
        if (this.isRelational("<") || this.match(tt.parenL)) {
          // This is a method property
          node.method = true;

          if (protoStart != null) {
            this.unexpected(protoStart);
          }
          if (variance) {
            this.unexpected(variance.start);
          }

          node.value = this.flowParseObjectTypeMethodish(
            this.startNodeAt(node.start, node.loc.start),
          );
          if (kind === "get" || kind === "set") {
            this.flowCheckGetterSetterParams(node);
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
      const start = property.start;
      const length =
        property.value.params.length + (property.value.rest ? 1 : 0);
      if (length !== paramCount) {
        if (property.kind === "get") {
          this.raise(start, "getter must not have any formal parameters");
        } else {
          this.raise(start, "setter must have exactly one formal parameter");
        }
      }

      if (property.kind === "set" && property.value.rest) {
        this.raise(
          start,
          "setter function argument must not be a rest parameter",
        );
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
      let node = id || this.parseIdentifier();

      while (this.eat(tt.dot)) {
        const node2 = this.startNodeAt(startPos, startLoc);
        node2.qualification = node;
        node2.id = this.parseIdentifier();
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

      if (this.isRelational("<")) {
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
      while (this.state.pos < this.state.length && !this.match(tt.bracketR)) {
        node.types.push(this.flowParseType());
        if (this.match(tt.bracketR)) break;
        this.expect(tt.comma);
      }
      this.expect(tt.bracketR);
      return this.finishNode(node, "TupleTypeAnnotation");
    }

    flowParseFunctionTypeParam(): N.FlowFunctionTypeParam {
      let name = null;
      let optional = false;
      let typeAnnotation = null;
      const node = this.startNode();
      const lh = this.lookahead();
      if (lh.type === tt.colon || lh.type === tt.question) {
        name = this.parseIdentifier();
        if (this.eat(tt.question)) {
          optional = true;
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

    flowParseFunctionTypeParams(
      params: N.FlowFunctionTypeParam[] = [],
    ): { params: N.FlowFunctionTypeParam[], rest: ?N.FlowFunctionTypeParam } {
      let rest: ?N.FlowFunctionTypeParam = null;
      while (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
        params.push(this.flowParseFunctionTypeParam());
        if (!this.match(tt.parenR)) {
          this.expect(tt.comma);
        }
      }
      if (this.eat(tt.ellipsis)) {
        rest = this.flowParseFunctionTypeParam();
      }
      return { params, rest };
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
        case tt.name:
          if (this.isContextual("interface")) {
            return this.flowParseInterfaceType();
          }

          return this.flowIdentToTypeAnnotation(
            startPos,
            startLoc,
            node,
            this.parseIdentifier(),
          );

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
          return this.flowParseTupleType();

        case tt.relational:
          if (this.state.value === "<") {
            node.typeParameters = this.flowParseTypeParameterDeclaration(
              /* allowDefault */ false,
            );
            this.expect(tt.parenL);
            tmp = this.flowParseFunctionTypeParams();
            node.params = tmp.params;
            node.rest = tmp.rest;
            this.expect(tt.parenR);

            this.expect(tt.arrow);

            node.returnType = this.flowParseType();

            return this.finishNode(node, "FunctionTypeAnnotation");
          }
          break;

        case tt.parenL:
          this.next();

          // Check to see if this is actually a grouped type
          if (!this.match(tt.parenR) && !this.match(tt.ellipsis)) {
            if (this.match(tt.name)) {
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

          this.expect(tt.parenR);

          this.expect(tt.arrow);

          node.returnType = this.flowParseType();

          node.typeParameters = null;

          return this.finishNode(node, "FunctionTypeAnnotation");

        case tt.string:
          return this.parseLiteral(
            this.state.value,
            "StringLiteralTypeAnnotation",
          );

        case tt._true:
        case tt._false:
          node.value = this.match(tt._true);
          this.next();
          return this.finishNode(node, "BooleanLiteralTypeAnnotation");

        case tt.plusMin:
          if (this.state.value === "-") {
            this.next();
            if (!this.match(tt.num)) {
              this.unexpected(null, `Unexpected token, expected "number"`);
            }

            return this.parseLiteral(
              -this.state.value,
              "NumberLiteralTypeAnnotation",
              node.start,
              node.loc.start,
            );
          }

          this.unexpected();
        case tt.num:
          return this.parseLiteral(
            this.state.value,
            "NumberLiteralTypeAnnotation",
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

        default:
          if (this.state.type.keyword === "typeof") {
            return this.flowParseTypeofType();
          } else if (this.state.type.keyword) {
            const label = this.state.type.label;
            this.next();
            return super.createIdentifier(node, label);
          }
      }

      throw this.unexpected();
    }

    flowParsePostfixType(): N.FlowTypeAnnotation {
      const startPos = this.state.start,
        startLoc = this.state.startLoc;
      let type = this.flowParsePrimaryType();
      while (this.match(tt.bracketL) && !this.canInsertSemicolon()) {
        const node = this.startNodeAt(startPos, startLoc);
        node.elementType = type;
        this.expect(tt.bracketL);
        this.expect(tt.bracketR);
        type = this.finishNode(node, "ArrayTypeAnnotation");
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
      // Ensure that a brace after a function generic type annotation is a
      // statement, except in arrow functions (noAnonFunctionType)
      this.state.exprAllowed =
        this.state.exprAllowed || this.state.noAnonFunctionType;
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
        this.finishNode(ident, ident.type);
      }
      return ident;
    }

    typeCastToParameter(node: N.Node): N.Node {
      node.expression.typeAnnotation = node.typeAnnotation;

      return this.finishNodeAt(
        node.expression,
        node.expression.type,
        node.typeAnnotation.end,
        node.typeAnnotation.loc.end,
      );
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

    parseFunctionBody(node: N.Function, allowExpressionBody: ?boolean): void {
      if (allowExpressionBody) {
        return this.forwardNoArrowParamsConversionAt(node, () =>
          super.parseFunctionBody(node, true),
        );
      }

      return super.parseFunctionBody(node, false);
    }

    parseFunctionBodyAndFinish(
      node: N.BodilessFunctionOrMethodBase,
      type: string,
      allowExpressionBody?: boolean,
    ): void {
      // For arrow functions, `parseArrow` handles the return type itself.
      if (!allowExpressionBody && this.match(tt.colon)) {
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

      super.parseFunctionBodyAndFinish(node, type, allowExpressionBody);
    }

    // interfaces
    parseStatement(declaration: boolean, topLevel?: boolean): N.Statement {
      // strict mode handling of `interface` since it's a reserved word
      if (
        this.state.strict &&
        this.match(tt.name) &&
        this.state.value === "interface"
      ) {
        const node = this.startNode();
        this.next();
        return this.flowParseInterface(node);
      } else {
        const stmt = super.parseStatement(declaration, topLevel);
        // We will parse a flow pragma in any comment before the first statement.
        if (this.flowPragma === undefined && !this.isValidDirective(stmt)) {
          this.flowPragma = null;
        }
        return stmt;
      }
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
            this.match(tt.name) ||
            this.match(tt._function) ||
            this.match(tt._var) ||
            this.match(tt._export)
          ) {
            return this.flowParseDeclare(node);
          }
        } else if (this.match(tt.name)) {
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
      return (
        this.isContextual("type") ||
        this.isContextual("interface") ||
        this.isContextual("opaque") ||
        super.shouldParseExportDeclaration()
      );
    }

    isExportDefaultSpecifier(): boolean {
      if (
        this.match(tt.name) &&
        (this.state.value === "type" ||
          this.state.value === "interface" ||
          this.state.value === "opaque")
      ) {
        return false;
      }

      return super.isExportDefaultSpecifier();
    }

    parseConditional(
      expr: N.Expression,
      noIn: ?boolean,
      startPos: number,
      startLoc: Position,
      refNeedsArrowPos?: ?Pos,
    ): N.Expression {
      if (!this.match(tt.question)) return expr;

      // only do the expensive clone if there is a question mark
      // and if we come from inside parens
      if (refNeedsArrowPos) {
        const state = this.state.clone();
        try {
          return super.parseConditional(expr, noIn, startPos, startLoc);
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;
            refNeedsArrowPos.start = err.pos || this.state.start;
            return expr;
          } else {
            // istanbul ignore next: no such error is expected
            throw err;
          }
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
          this.raise(
            state.start,
            "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
          );
        }

        if (failed && valid.length === 1) {
          this.state = state;
          this.state.noArrowAt = noArrowAt.concat(valid[0].start);
          ({ consequent, failed } = this.tryParseConditionalConsequent());
        }

        this.getArrowLikeExpressions(consequent, true);
      }

      this.state.noArrowAt = originalNoArrowAt;
      this.expect(tt.colon);

      node.test = expr;
      node.consequent = consequent;
      node.alternate = this.forwardNoArrowParamsConversionAt(node, () =>
        this.parseMaybeAssign(noIn, undefined, undefined, undefined),
      );

      return this.finishNode(node, "ConditionalExpression");
    }

    tryParseConditionalConsequent(): {
      consequent: N.Expression,
      failed: boolean,
    } {
      this.state.noArrowParamsConversionAt.push(this.state.start);

      const consequent = this.parseMaybeAssign();
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
            this.toAssignableList(
              // node.params is Expression[] instead of $ReadOnlyArray<Pattern> because it
              // has not been converted yet.
              ((node.params: any): N.Expression[]),
              true,
              "arrow function parameters",
            );
            // Use super's method to force the parameters to be checked
            super.checkFunctionNameAndParams(node, true);
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
        for (let i = 0; i < arrows.length; i++) {
          this.toAssignableList(
            ((node.params: any): N.Expression[]),
            true,
            "arrow function parameters",
          );
        }
        return [arrows, []];
      }

      return partition(arrows, node => {
        try {
          this.toAssignableList(
            ((node.params: any): N.Expression[]),
            true,
            "arrow function parameters",
          );
          return true;
        } catch (err) {
          return false;
        }
      });
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
      if (this.isContextual("type")) {
        node.exportKind = "type";

        const declarationNode = this.startNode();
        this.next();

        if (this.match(tt.braceL)) {
          // export type { foo, bar };
          node.specifiers = this.parseExportSpecifiers();
          this.parseExportFrom(node);
          return null;
        } else {
          // export type Foo = Bar;
          return this.flowParseTypeAlias(declarationNode);
        }
      } else if (this.isContextual("opaque")) {
        node.exportKind = "type";

        const declarationNode = this.startNode();
        this.next();
        // export opaque type Foo = Bar;
        return this.flowParseOpaqueType(declarationNode, false);
      } else if (this.isContextual("interface")) {
        node.exportKind = "type";
        const declarationNode = this.startNode();
        this.next();
        return this.flowParseInterface(declarationNode);
      } else {
        return super.parseExportDeclaration(node);
      }
    }

    eatExportStar(node: N.Node): boolean {
      if (super.eatExportStar(...arguments)) return true;

      if (this.isContextual("type") && this.lookahead().type === tt.star) {
        node.exportKind = "type";
        this.next();
        this.next();
        return true;
      }

      return false;
    }

    maybeParseExportNamespaceSpecifier(node: N.Node): boolean {
      const pos = this.state.start;
      const hasNamespace = super.maybeParseExportNamespaceSpecifier(node);
      if (hasNamespace && node.exportKind === "type") {
        this.unexpected(pos);
      }
      return hasNamespace;
    }

    parseClassId(node: N.Class, isStatement: boolean, optionalId: ?boolean) {
      super.parseClassId(node, isStatement, optionalId);
      if (this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration();
      }
    }

    // ensure that inside flow types, we bypass the jsx parser plugin
    getTokenFromCode(code: number): void {
      const next = this.state.input.charCodeAt(this.state.pos + 1);
      if (code === charCodes.leftCurlyBrace && next === charCodes.verticalBar) {
        return this.finishOp(tt.braceBarL, 2);
      } else if (
        this.state.inType &&
        (code === charCodes.greaterThan || code === charCodes.lessThan)
      ) {
        return this.finishOp(tt.relational, 1);
      } else if (isIteratorStart(code, next)) {
        this.state.isIterator = true;
        return super.readWord();
      } else {
        return super.getTokenFromCode(code);
      }
    }

    toAssignable(
      node: N.Node,
      isBinding: ?boolean,
      contextDescription: string,
    ): N.Node {
      if (node.type === "TypeCastExpression") {
        return super.toAssignable(
          this.typeCastToParameter(node),
          isBinding,
          contextDescription,
        );
      } else {
        return super.toAssignable(node, isBinding, contextDescription);
      }
    }

    // turn type casts that we found in function parameter head into type annotated params
    toAssignableList(
      exprList: N.Expression[],
      isBinding: ?boolean,
      contextDescription: string,
    ): $ReadOnlyArray<N.Pattern> {
      for (let i = 0; i < exprList.length; i++) {
        const expr = exprList[i];
        if (expr && expr.type === "TypeCastExpression") {
          exprList[i] = this.typeCastToParameter(expr);
        }
      }
      return super.toAssignableList(exprList, isBinding, contextDescription);
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
          (!expr.extra || !expr.extra.parenthesized) &&
          (exprList.length > 1 || !isParenthesizedExpr)
        ) {
          this.raise(
            expr.typeAnnotation.start,
            "The type cast expression is expected to be wrapped with parenthesis",
          );
        }
      }

      return exprList;
    }

    checkLVal(
      expr: N.Expression,
      isBinding: ?boolean,
      checkClashes: ?{ [key: string]: boolean },
      contextDescription: string,
    ): void {
      if (expr.type !== "TypeCastExpression") {
        return super.checkLVal(
          expr,
          isBinding,
          checkClashes,
          contextDescription,
        );
      }
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
      return this.isRelational("<") || super.isClassMethod();
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
    ): void {
      if ((method: $FlowFixMe).variance) {
        this.unexpected((method: $FlowFixMe).variance.start);
      }
      delete (method: $FlowFixMe).variance;
      if (this.isRelational("<")) {
        method.typeParameters = this.flowParseTypeParameterDeclaration(
          /* allowDefault */ false,
        );
      }

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
      if ((method: $FlowFixMe).variance) {
        this.unexpected((method: $FlowFixMe).variance.start);
      }
      delete (method: $FlowFixMe).variance;
      if (this.isRelational("<")) {
        method.typeParameters = this.flowParseTypeParameterDeclaration();
      }

      super.pushClassPrivateMethod(classBody, method, isGenerator, isAsync);
    }

    // parse a the super class type parameters and implements
    parseClassSuper(node: N.Class): void {
      super.parseClassSuper(node);
      if (node.superClass && this.isRelational("<")) {
        node.superTypeParameters = this.flowParseTypeParameterInstantiation();
      }
      if (this.isContextual("implements")) {
        this.next();
        const implemented: N.FlowClassImplements[] = (node.implements = []);
        do {
          const node = this.startNode();
          node.id = this.flowParseRestrictedIdentifier(/*liberal*/ true);
          if (this.isRelational("<")) {
            node.typeParameters = this.flowParseTypeParameterInstantiation();
          } else {
            node.typeParameters = null;
          }
          implemented.push(this.finishNode(node, "ClassImplements"));
        } while (this.eat(tt.comma));
      }
    }

    parsePropertyName(
      node: N.ObjectOrClassMember | N.ClassMember | N.TsNamedTypeElementBase,
    ): N.Identifier {
      const variance = this.flowParseVariance();
      const key = super.parsePropertyName(node);
      // $FlowIgnore ("variance" not defined on TsNamedTypeElementBase)
      node.variance = variance;
      return key;
    }

    // parse type parameters for object method shorthand
    parseObjPropValue(
      prop: N.ObjectMember,
      startPos: ?number,
      startLoc: ?Position,
      isGenerator: boolean,
      isAsync: boolean,
      isPattern: boolean,
      refShorthandDefaultPos: ?Pos,
      containsEsc: boolean,
    ): void {
      if ((prop: $FlowFixMe).variance) {
        this.unexpected((prop: $FlowFixMe).variance.start);
      }
      delete (prop: $FlowFixMe).variance;

      let typeParameters;

      // method shorthand
      if (this.isRelational("<")) {
        typeParameters = this.flowParseTypeParameterDeclaration(
          /* allowDefault */ false,
        );
        if (!this.match(tt.parenL)) this.unexpected();
      }

      super.parseObjPropValue(
        prop,
        startPos,
        startLoc,
        isGenerator,
        isAsync,
        isPattern,
        refShorthandDefaultPos,
        containsEsc,
      );

      // add typeParameters if we found them
      if (typeParameters) {
        (prop.value || prop).typeParameters = typeParameters;
      }
    }

    parseAssignableListItemTypes(param: N.Pattern): N.Pattern {
      if (this.eat(tt.question)) {
        if (param.type !== "Identifier") {
          throw this.raise(
            param.start,
            "A binding pattern parameter cannot be optional in an implementation signature.",
          );
        }

        param.optional = true;
      }
      if (this.match(tt.colon)) {
        param.typeAnnotation = this.flowParseTypeAnnotation();
      }
      this.finishNode(param, param.type);
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
        this.raise(
          node.typeAnnotation.start,
          "Type annotations must come before default assignments, " +
            "e.g. instead of `age = 25: number` use `age: number = 25`",
        );
      }

      return node;
    }

    shouldParseDefaultImport(node: N.ImportDeclaration): boolean {
      if (!hasTypeImportKind(node)) {
        return super.shouldParseDefaultImport(node);
      }

      return isMaybeDefaultImport(this.state);
    }

    parseImportSpecifierLocal(
      node: N.ImportDeclaration,
      specifier: N.Node,
      type: string,
      contextDescription: string,
    ): void {
      specifier.local = hasTypeImportKind(node)
        ? this.flowParseRestrictedIdentifier(true)
        : this.parseIdentifier();

      this.checkLVal(specifier.local, true, undefined, contextDescription);
      node.specifiers.push(this.finishNode(specifier, type));
    }

    // parse typeof and type imports
    maybeParseDefaultImportSpecifier(node: N.ImportDeclaration): boolean {
      node.importKind = "value";

      let kind = null;
      if (this.match(tt._typeof)) {
        kind = "typeof";
      } else if (this.isContextual("type")) {
        kind = "type";
      }
      if (kind) {
        const lh = this.lookahead();

        // import type * is not allowed
        if (kind === "type" && lh.type === tt.star) {
          this.unexpected(lh.start);
        }

        if (
          isMaybeDefaultImport(lh) ||
          lh.type === tt.braceL ||
          lh.type === tt.star
        ) {
          this.next();
          node.importKind = kind;
        }
      }

      return super.maybeParseDefaultImportSpecifier(node);
    }

    // parse import-type/typeof shorthand
    parseImportSpecifier(node: N.ImportDeclaration): void {
      const specifier = this.startNode();
      const firstIdentLoc = this.state.start;
      const firstIdent = this.parseIdentifier(true);

      let specifierTypeKind = null;
      if (firstIdent.name === "type") {
        specifierTypeKind = "type";
      } else if (firstIdent.name === "typeof") {
        specifierTypeKind = "typeof";
      }

      let isBinding = false;
      if (this.isContextual("as") && !this.isLookaheadContextual("as")) {
        const as_ident = this.parseIdentifier(true);
        if (
          specifierTypeKind !== null &&
          !this.match(tt.name) &&
          !this.state.type.keyword
        ) {
          // `import {type as ,` or `import {type as }`
          specifier.imported = as_ident;
          specifier.importKind = specifierTypeKind;
          specifier.local = as_ident.__clone();
        } else {
          // `import {type as foo`
          specifier.imported = firstIdent;
          specifier.importKind = null;
          specifier.local = this.parseIdentifier();
        }
      } else if (
        specifierTypeKind !== null &&
        (this.match(tt.name) || this.state.type.keyword)
      ) {
        // `import {type foo`
        specifier.imported = this.parseIdentifier(true);
        specifier.importKind = specifierTypeKind;
        if (this.eatContextual("as")) {
          specifier.local = this.parseIdentifier();
        } else {
          isBinding = true;
          specifier.local = specifier.imported.__clone();
        }
      } else {
        isBinding = true;
        specifier.imported = firstIdent;
        specifier.importKind = null;
        specifier.local = specifier.imported.__clone();
      }

      const nodeIsTypeImport = hasTypeImportKind(node);
      const specifierIsTypeImport = hasTypeImportKind(specifier);

      if (nodeIsTypeImport && specifierIsTypeImport) {
        this.raise(
          firstIdentLoc,
          "The `type` and `typeof` keywords on named imports can only be used on regular " +
            "`import` statements. It cannot be used with `import type` or `import typeof` statements",
        );
      }

      if (nodeIsTypeImport || specifierIsTypeImport) {
        this.checkReservedType(specifier.local.name, specifier.local.start);
      }

      if (isBinding && !nodeIsTypeImport && !specifierIsTypeImport) {
        this.checkReservedWord(
          specifier.local.name,
          specifier.start,
          true,
          true,
        );
      }

      this.checkLVal(specifier.local, true, undefined, "import specifier");
      node.specifiers.push(this.finishNode(specifier, "ImportSpecifier"));
    }

    // parse function type parameters - function foo<T>() {}
    parseFunctionParams(node: N.Function): void {
      // $FlowFixMe
      const kind = node.kind;
      if (kind !== "get" && kind !== "set" && this.isRelational("<")) {
        node.typeParameters = this.flowParseTypeParameterDeclaration(
          /* allowDefault */ false,
        );
      }
      super.parseFunctionParams(node);
    }

    // parse flow type annotations on variable declarator heads - let foo: string = bar
    parseVarHead(decl: N.VariableDeclarator): void {
      super.parseVarHead(decl);
      if (this.match(tt.colon)) {
        decl.id.typeAnnotation = this.flowParseTypeAnnotation();
        this.finishNode(decl.id, decl.id.type);
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
      noIn?: ?boolean,
      refShorthandDefaultPos?: ?Pos,
      afterLeftParse?: Function,
      refNeedsArrowPos?: ?Pos,
    ): N.Expression {
      let jsxError = null;
      if (
        this.hasPlugin("jsx") &&
        (this.match(tt.jsxTagStart) || this.isRelational("<"))
      ) {
        const state = this.state.clone();
        try {
          return super.parseMaybeAssign(
            noIn,
            refShorthandDefaultPos,
            afterLeftParse,
            refNeedsArrowPos,
          );
        } catch (err) {
          if (err instanceof SyntaxError) {
            this.state = state;

            // Remove `tc.j_expr` and `tc.j_oTag` from context added
            // by parsing `jsxTagStart` to stop the JSX plugin from
            // messing with the tokens
            const cLength = this.state.context.length;
            if (this.state.context[cLength - 1] === tc.j_oTag) {
              this.state.context.length -= 2;
            }

            jsxError = err;
          } else {
            // istanbul ignore next: no such error is expected
            throw err;
          }
        }
      }

      if (jsxError != null || this.isRelational("<")) {
        let arrowExpression;
        let typeParameters;
        try {
          typeParameters = this.flowParseTypeParameterDeclaration();
          arrowExpression = this.forwardNoArrowParamsConversionAt(
            typeParameters,
            () =>
              super.parseMaybeAssign(
                noIn,
                refShorthandDefaultPos,
                afterLeftParse,
                refNeedsArrowPos,
              ),
          );
          arrowExpression.typeParameters = typeParameters;
          this.resetStartLocationFromNode(arrowExpression, typeParameters);
        } catch (err) {
          throw jsxError || err;
        }

        if (arrowExpression.type === "ArrowFunctionExpression") {
          return arrowExpression;
        } else if (jsxError != null) {
          throw jsxError;
        } else {
          this.raise(
            typeParameters.start,
            "Expected an arrow function after this type parameter declaration",
          );
        }
      }

      return super.parseMaybeAssign(
        noIn,
        refShorthandDefaultPos,
        afterLeftParse,
        refNeedsArrowPos,
      );
    }

    // handle return types for arrow functions
    parseArrow(node: N.ArrowFunctionExpression): ?N.ArrowFunctionExpression {
      if (this.match(tt.colon)) {
        const state = this.state.clone();
        try {
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

          // assign after it is clear it is an arrow
          node.returnType = typeNode.typeAnnotation
            ? this.finishNode(typeNode, "TypeAnnotation")
            : null;
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

    shouldParseArrow(): boolean {
      return this.match(tt.colon) || super.shouldParseArrow();
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

    checkFunctionNameAndParams(
      node: N.Function,
      isArrowFunction: ?boolean,
    ): void {
      if (
        isArrowFunction &&
        this.state.noArrowParamsConversionAt.indexOf(node.start) !== -1
      ) {
        return;
      }

      return super.checkFunctionNameAndParams(node, isArrowFunction);
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
        this.isRelational("<")
      ) {
        const state = this.state.clone();
        let error;
        try {
          const node = this.parseAsyncArrowWithTypeParameters(
            startPos,
            startLoc,
          );
          if (node) return node;
        } catch (e) {
          error = e;
        }

        this.state = state;
        try {
          return super.parseSubscripts(base, startPos, startLoc, noCalls);
        } catch (e) {
          throw error || e;
        }
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
      if (this.match(tt.questionDot) && this.isLookaheadRelational("<")) {
        this.expectPlugin("optionalChaining");
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
        return this.finishNode(node, "OptionalCallExpression");
      } else if (
        !noCalls &&
        this.shouldParseTypes() &&
        this.isRelational("<")
      ) {
        const node = this.startNodeAt(startPos, startLoc);
        node.callee = base;
        const state = this.state.clone();
        try {
          node.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew();
          this.expect(tt.parenL);
          node.arguments = this.parseCallExpressionArguments(tt.parenR, false);
          if (subscriptState.optionalChainMember) {
            node.optional = false;
            return this.finishNode(node, "OptionalCallExpression");
          }
          return this.finishNode(node, "CallExpression");
        } catch (e) {
          if (e instanceof SyntaxError) {
            this.state = state;
          } else {
            throw e;
          }
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
      if (this.shouldParseTypes() && this.isRelational("<")) {
        const state = this.state.clone();
        try {
          targs = this.flowParseTypeParameterInstantiationCallOrNew();
        } catch (e) {
          if (e instanceof SyntaxError) {
            this.state = state;
          } else {
            throw e;
          }
        }
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
      const next = this.state.input.charCodeAt(this.state.pos + 1);
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
      const next = this.state.input.charCodeAt(this.state.pos + 1);
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
        this.unexpected(null, "Unterminated flow-comment");
      }
      return fileNode;
    }

    skipBlockComment(): void {
      if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
        if (this.state.hasFlowComment) {
          this.unexpected(
            null,
            "Cannot have a flow comment inside another flow comment",
          );
        }
        this.hasFlowCommentCompletion();
        this.state.pos += this.skipFlowComment();
        this.state.hasFlowComment = true;
        return;
      }

      if (this.state.hasFlowComment) {
        const end = this.state.input.indexOf("*-/", (this.state.pos += 2));
        if (end === -1) this.raise(this.state.pos - 2, "Unterminated comment");
        this.state.pos = end + 3;
        return;
      }

      super.skipBlockComment();
    }

    skipFlowComment(): number | boolean {
      const { pos } = this.state;
      let shiftToFirstNonWhiteSpace = 2;
      while (
        [charCodes.space, charCodes.tab].includes(
          this.state.input.charCodeAt(pos + shiftToFirstNonWhiteSpace),
        )
      ) {
        shiftToFirstNonWhiteSpace++;
      }

      const ch2 = this.state.input.charCodeAt(shiftToFirstNonWhiteSpace + pos);
      const ch3 = this.state.input.charCodeAt(
        shiftToFirstNonWhiteSpace + pos + 1,
      );

      if (ch2 === charCodes.colon && ch3 === charCodes.colon) {
        return shiftToFirstNonWhiteSpace + 2; // check for /*::
      }
      if (
        this.state.input.slice(
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
      const end = this.state.input.indexOf("*/", this.state.pos);
      if (end === -1) {
        this.raise(this.state.pos, "Unterminated comment");
      }
    }
  };
