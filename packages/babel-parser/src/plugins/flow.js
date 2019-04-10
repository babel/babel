// @flow

import * as N from "../types";
import type { Pos, Position } from "../util/location";
import type State from "../util/state";
import * as charCodes from "charcodes";
import { isIteratorStart } from "../util/identifier";
import {
  functionFlags,
  type BindingTypes,
  BIND_NONE,
  BIND_LEXICAL,
  SCOPE_ARROW,
  SCOPE_OTHER,
} from "../util/scopeflags";
import { types as tt, type TokenType } from "../util/token-types";

import { original } from "::build-tool::";
import {
  ct as tc,
  match,
  eat,
  next,
  lookahead,
  finishOp,
  readWord,
  nextToken,
} from "::build-tool::bindings/tokenizer";

import {
  hasPlugin,
  resetState,
  state,
  scope,
  input,
  length,
  getPluginOption,
  raise,
  unexpected,
  expectPlugin,
  expect,
  expectContextual,
  expectRelational,
  isContextual,
  isRelational,
  isLookaheadContextual,
  isLookaheadRelational,
  eatContextual,
  semicolon,
  canInsertSemicolon,
  startNode,
  startNodeAt,
  finishNode,
  finishNodeAt,
  resetStartLocationFromNode,
  parseExpression,
  parseIdentifier,
  parseLiteral,
  parseExprAtom,
  parseArrowExpression,
  parseImport,
  parseExportSpecifiers,
  parseExportFrom,
  isLet,
  isValidDirective,
  createIdentifier,
  checkReservedWord,
  parseCallExpressionArguments,
} from "::build-tool::bindings/parser";

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

function shouldParseTypes(): boolean {
  return getPluginOption("flow", "all") || state.flowPragma === "flow";
}

export function addComment(comment: N.Comment): void {
  if (state.flowPragma === undefined) {
    // Try to parse a flow pragma.
    const matches = FLOW_PRAGMA_REGEX.exec(comment.value);
    if (!matches) {
      state.flowPragma = null;
    } else if (matches[1] === "flow") {
      state.flowPragma = "flow";
    } else if (matches[1] === "noflow") {
      state.flowPragma = "noflow";
    } else {
      throw new Error("Unexpected flow pragma");
    }
  }
  return original(addComment)(comment);
}

function flowParseTypeInitialiser(tok?: TokenType): N.FlowType {
  const oldInType = state.inType;
  state.inType = true;
  expect(tok || tt.colon);

  const type = flowParseType();
  state.inType = oldInType;
  return type;
}

function flowParsePredicate(): N.FlowType {
  const node = startNode();
  const moduloLoc = state.startLoc;
  const moduloPos = state.start;
  expect(tt.modulo);
  const checksLoc = state.startLoc;
  expectContextual("checks");
  // Force '%' and 'checks' to be adjacent
  if (
    moduloLoc.line !== checksLoc.line ||
    moduloLoc.column !== checksLoc.column - 1
  ) {
    raise(moduloPos, "Spaces between ´%´ and ´checks´ are not allowed here.");
  }
  if (eat(tt.parenL)) {
    node.value = parseExpression();
    expect(tt.parenR);
    return finishNode(node, "DeclaredPredicate");
  } else {
    return finishNode(node, "InferredPredicate");
  }
}

function flowParseTypeAndPredicateInitialiser(): [
  ?N.FlowType,
  ?N.FlowPredicate,
] {
  const oldInType = state.inType;
  state.inType = true;
  expect(tt.colon);
  let type = null;
  let predicate = null;
  if (match(tt.modulo)) {
    state.inType = oldInType;
    predicate = flowParsePredicate();
  } else {
    type = flowParseType();
    state.inType = oldInType;
    if (match(tt.modulo)) {
      predicate = flowParsePredicate();
    }
  }
  return [type, predicate];
}

function flowParseDeclareClass(node: N.FlowDeclareClass): N.FlowDeclareClass {
  next();
  flowParseInterfaceish(node, /*isClass*/ true);
  return finishNode(node, "DeclareClass");
}

function flowParseDeclareFunction(
  node: N.FlowDeclareFunction,
): N.FlowDeclareFunction {
  next();

  const id = (node.id = parseIdentifier());

  const typeNode = startNode();
  const typeContainer = startNode();

  if (isRelational("<")) {
    typeNode.typeParameters = flowParseTypeParameterDeclaration();
  } else {
    typeNode.typeParameters = null;
  }

  expect(tt.parenL);
  const tmp = flowParseFunctionTypeParams();
  typeNode.params = tmp.params;
  typeNode.rest = tmp.rest;
  expect(tt.parenR);

  [
    // $FlowFixMe (destructuring not supported yet)
    typeNode.returnType,
    // $FlowFixMe (destructuring not supported yet)
    node.predicate,
  ] = flowParseTypeAndPredicateInitialiser();

  typeContainer.typeAnnotation = finishNode(typeNode, "FunctionTypeAnnotation");

  id.typeAnnotation = finishNode(typeContainer, "TypeAnnotation");

  finishNode(id, id.type);

  semicolon();

  return finishNode(node, "DeclareFunction");
}

function flowParseDeclare(
  node: N.FlowDeclare,
  insideModule?: boolean,
): N.FlowDeclare {
  if (match(tt._class)) {
    return flowParseDeclareClass(node);
  } else if (match(tt._function)) {
    return flowParseDeclareFunction(node);
  } else if (match(tt._var)) {
    return flowParseDeclareVariable(node);
  } else if (isContextual("module")) {
    if (lookahead().type === tt.dot) {
      return flowParseDeclareModuleExports(node);
    } else {
      if (insideModule) {
        unexpected(
          null,
          "`declare module` cannot be used inside another `declare module`",
        );
      }
      return flowParseDeclareModule(node);
    }
  } else if (isContextual("type")) {
    return flowParseDeclareTypeAlias(node);
  } else if (isContextual("opaque")) {
    return flowParseDeclareOpaqueType(node);
  } else if (isContextual("interface")) {
    return flowParseDeclareInterface(node);
  } else if (match(tt._export)) {
    return flowParseDeclareExportDeclaration(node, insideModule);
  } else {
    throw unexpected();
  }
}

function flowParseDeclareVariable(
  node: N.FlowDeclareVariable,
): N.FlowDeclareVariable {
  next();
  node.id = flowParseTypeAnnotatableIdentifier(/*allowPrimitiveOverride*/ true);
  semicolon();
  return finishNode(node, "DeclareVariable");
}

function flowParseDeclareModule(
  node: N.FlowDeclareModule,
): N.FlowDeclareModule {
  next();

  scope.enter(SCOPE_OTHER);

  if (match(tt.string)) {
    node.id = parseExprAtom();
  } else {
    node.id = parseIdentifier();
  }

  const bodyNode = (node.body = startNode());
  const body = (bodyNode.body = []);
  expect(tt.braceL);
  while (!match(tt.braceR)) {
    let bodyNode = startNode();

    if (match(tt._import)) {
      const token = lookahead();
      if (token.value !== "type" && token.value !== "typeof") {
        unexpected(
          null,
          "Imports within a `declare module` body must always be `import type` or `import typeof`",
        );
      }
      next();
      parseImport(bodyNode);
    } else {
      expectContextual(
        "declare",
        "Only declares and type imports are allowed inside declare module",
      );

      bodyNode = flowParseDeclare(bodyNode, true);
    }

    body.push(bodyNode);
  }

  scope.exit();

  expect(tt.braceR);

  finishNode(bodyNode, "BlockStatement");

  let kind = null;
  let hasModuleExport = false;
  const errorMessage =
    "Found both `declare module.exports` and `declare export` in the same module. " +
    "Modules can only have 1 since they are either an ES module or they are a CommonJS module";
  body.forEach(bodyElement => {
    if (isEsModuleType(bodyElement)) {
      if (kind === "CommonJS") {
        unexpected(bodyElement.start, errorMessage);
      }
      kind = "ES";
    } else if (bodyElement.type === "DeclareModuleExports") {
      if (hasModuleExport) {
        unexpected(
          bodyElement.start,
          "Duplicate `declare module.exports` statement",
        );
      }
      if (kind === "ES") unexpected(bodyElement.start, errorMessage);
      kind = "CommonJS";
      hasModuleExport = true;
    }
  });

  node.kind = kind || "CommonJS";
  return finishNode(node, "DeclareModule");
}

function flowParseDeclareExportDeclaration(
  node: N.FlowDeclareExportDeclaration,
  insideModule: ?boolean,
): N.FlowDeclareExportDeclaration {
  expect(tt._export);

  if (eat(tt._default)) {
    if (match(tt._function) || match(tt._class)) {
      // declare export default class ...
      // declare export default function ...
      node.declaration = flowParseDeclare(startNode());
    } else {
      // declare export default [type];
      node.declaration = flowParseType();
      semicolon();
    }
    node.default = true;

    return finishNode(node, "DeclareExportDeclaration");
  } else {
    if (
      match(tt._const) ||
      isLet() ||
      ((isContextual("type") || isContextual("interface")) && !insideModule)
    ) {
      const label = state.value;
      const suggestion = exportSuggestions[label];
      unexpected(
        state.start,
        `\`declare export ${label}\` is not supported. Use \`${suggestion}\` instead`,
      );
    }

    if (
      match(tt._var) || // declare export var ...
      match(tt._function) || // declare export function ...
      match(tt._class) || // declare export class ...
      isContextual("opaque") // declare export opaque ..
    ) {
      node.declaration = flowParseDeclare(startNode());
      node.default = false;

      return finishNode(node, "DeclareExportDeclaration");
    } else if (
      match(tt.star) || // declare export * from ''
      match(tt.braceL) || // declare export {} ...
      isContextual("interface") || // declare export interface ...
      isContextual("type") || // declare export type ...
      isContextual("opaque") // declare export opaque type ...
    ) {
      node = parseExport(node);
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

  throw unexpected();
}

function flowParseDeclareModuleExports(
  node: N.FlowDeclareModuleExports,
): N.FlowDeclareModuleExports {
  expectContextual("module");
  expect(tt.dot);
  expectContextual("exports");
  node.typeAnnotation = flowParseTypeAnnotation();
  semicolon();

  return finishNode(node, "DeclareModuleExports");
}

function flowParseDeclareTypeAlias(
  node: N.FlowDeclareTypeAlias,
): N.FlowDeclareTypeAlias {
  next();
  flowParseTypeAlias(node);
  return finishNode(node, "DeclareTypeAlias");
}

function flowParseDeclareOpaqueType(
  node: N.FlowDeclareOpaqueType,
): N.FlowDeclareOpaqueType {
  next();
  flowParseOpaqueType(node, true);
  return finishNode(node, "DeclareOpaqueType");
}

function flowParseDeclareInterface(
  node: N.FlowDeclareInterface,
): N.FlowDeclareInterface {
  next();
  flowParseInterfaceish(node);
  return finishNode(node, "DeclareInterface");
}

// Interfaces

function flowParseInterfaceish(
  node: N.FlowDeclare,
  isClass?: boolean = false,
): void {
  node.id = flowParseRestrictedIdentifier(/*liberal*/ !isClass);

  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.extends = [];
  node.implements = [];
  node.mixins = [];

  if (eat(tt._extends)) {
    do {
      node.extends.push(flowParseInterfaceExtends());
    } while (!isClass && eat(tt.comma));
  }

  if (isContextual("mixins")) {
    next();
    do {
      node.mixins.push(flowParseInterfaceExtends());
    } while (eat(tt.comma));
  }

  if (isContextual("implements")) {
    next();
    do {
      node.implements.push(flowParseInterfaceExtends());
    } while (eat(tt.comma));
  }

  node.body = flowParseObjectType({
    allowStatic: isClass,
    allowExact: false,
    allowSpread: false,
    allowProto: isClass,
    allowInexact: false,
  });
}

function flowParseInterfaceExtends(): N.FlowInterfaceExtends {
  const node = startNode();

  node.id = flowParseQualifiedTypeIdentifier();
  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterInstantiation();
  } else {
    node.typeParameters = null;
  }

  return finishNode(node, "InterfaceExtends");
}

function flowParseInterface(node: N.FlowInterface): N.FlowInterface {
  flowParseInterfaceish(node);
  return finishNode(node, "InterfaceDeclaration");
}

function checkNotUnderscore(word: string) {
  if (word === "_") {
    throw unexpected(
      null,
      "`_` is only allowed as a type argument to call or new",
    );
  }
}

function checkReservedType(word: string, startLoc: number) {
  if (reservedTypes.indexOf(word) > -1) {
    raise(startLoc, `Cannot overwrite reserved type ${word}`);
  }
}

function flowParseRestrictedIdentifier(liberal?: boolean): N.Identifier {
  checkReservedType(state.value, state.start);
  return parseIdentifier(liberal);
}

// Type aliases

function flowParseTypeAlias(node: N.FlowTypeAlias): N.FlowTypeAlias {
  node.id = flowParseRestrictedIdentifier();
  scope.declareName(node.id.name, BIND_LEXICAL, node.id.start);

  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  node.right = flowParseTypeInitialiser(tt.eq);
  semicolon();

  return finishNode(node, "TypeAlias");
}

function flowParseOpaqueType(
  node: N.FlowOpaqueType,
  declare: boolean,
): N.FlowOpaqueType {
  expectContextual("type");
  node.id = flowParseRestrictedIdentifier(/*liberal*/ true);
  scope.declareName(node.id.name, BIND_LEXICAL, node.id.start);

  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterDeclaration();
  } else {
    node.typeParameters = null;
  }

  // Parse the supertype
  node.supertype = null;
  if (match(tt.colon)) {
    node.supertype = flowParseTypeInitialiser(tt.colon);
  }

  node.impltype = null;
  if (!declare) {
    node.impltype = flowParseTypeInitialiser(tt.eq);
  }
  semicolon();

  return finishNode(node, "OpaqueType");
}

// Type annotations

function flowParseTypeParameter(
  allowDefault?: boolean = true,
  requireDefault?: boolean = false,
): N.TypeParameter {
  if (!allowDefault && requireDefault) {
    throw new Error(
      "Cannot disallow a default value (`allowDefault`) while also requiring it (`requireDefault`).",
    );
  }

  const nodeStart = state.start;

  const node = startNode();

  const variance = flowParseVariance();

  const ident = flowParseTypeAnnotatableIdentifier();
  node.name = ident.name;
  node.variance = variance;
  node.bound = ident.typeAnnotation;

  if (match(tt.eq)) {
    if (allowDefault) {
      eat(tt.eq);
      node.default = flowParseType();
    } else {
      unexpected();
    }
  } else {
    if (requireDefault) {
      unexpected(
        nodeStart,
        // eslint-disable-next-line max-len
        "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.",
      );
    }
  }

  return finishNode(node, "TypeParameter");
}

function flowParseTypeParameterDeclaration(
  allowDefault?: boolean = true,
): N.TypeParameterDeclaration {
  const oldInType = state.inType;
  const node = startNode();
  node.params = [];

  state.inType = true;

  // istanbul ignore else: this condition is already checked at all call sites
  if (isRelational("<") || match(tt.jsxTagStart)) {
    next();
  } else {
    unexpected();
  }

  let defaultRequired = false;

  do {
    const typeParameter = flowParseTypeParameter(allowDefault, defaultRequired);

    node.params.push(typeParameter);

    if (typeParameter.default) {
      defaultRequired = true;
    }

    if (!isRelational(">")) {
      expect(tt.comma);
    }
  } while (!isRelational(">"));
  expectRelational(">");

  state.inType = oldInType;

  return finishNode(node, "TypeParameterDeclaration");
}

function flowParseTypeParameterInstantiation(): N.TypeParameterInstantiation {
  const node = startNode();
  const oldInType = state.inType;
  node.params = [];

  state.inType = true;

  expectRelational("<");
  const oldNoAnonFunctionType = state.noAnonFunctionType;
  state.noAnonFunctionType = false;
  while (!isRelational(">")) {
    node.params.push(flowParseType());
    if (!isRelational(">")) {
      expect(tt.comma);
    }
  }
  state.noAnonFunctionType = oldNoAnonFunctionType;
  expectRelational(">");

  state.inType = oldInType;

  return finishNode(node, "TypeParameterInstantiation");
}

function flowParseTypeParameterInstantiationCallOrNew(): N.TypeParameterInstantiation {
  const node = startNode();
  const oldInType = state.inType;
  node.params = [];

  state.inType = true;

  expectRelational("<");
  while (!isRelational(">")) {
    node.params.push(flowParseTypeOrImplicitInstantiation());
    if (!isRelational(">")) {
      expect(tt.comma);
    }
  }
  expectRelational(">");

  state.inType = oldInType;

  return finishNode(node, "TypeParameterInstantiation");
}

function flowParseInterfaceType(): N.FlowInterfaceType {
  const node = startNode();
  expectContextual("interface");

  node.extends = [];
  if (eat(tt._extends)) {
    do {
      node.extends.push(flowParseInterfaceExtends());
    } while (eat(tt.comma));
  }

  node.body = flowParseObjectType({
    allowStatic: false,
    allowExact: false,
    allowSpread: false,
    allowProto: false,
    allowInexact: false,
  });

  return finishNode(node, "InterfaceTypeAnnotation");
}

function flowParseObjectPropertyKey(): N.Expression {
  return match(tt.num) || match(tt.string)
    ? parseExprAtom()
    : parseIdentifier(true);
}

function flowParseObjectTypeIndexer(
  node: N.FlowObjectTypeIndexer,
  isStatic: boolean,
  variance: ?N.FlowVariance,
): N.FlowObjectTypeIndexer {
  node.static = isStatic;

  // Note: bracketL has already been consumed
  if (lookahead().type === tt.colon) {
    node.id = flowParseObjectPropertyKey();
    node.key = flowParseTypeInitialiser();
  } else {
    node.id = null;
    node.key = flowParseType();
  }
  expect(tt.bracketR);
  node.value = flowParseTypeInitialiser();
  node.variance = variance;

  return finishNode(node, "ObjectTypeIndexer");
}

function flowParseObjectTypeInternalSlot(
  node: N.FlowObjectTypeInternalSlot,
  isStatic: boolean,
): N.FlowObjectTypeInternalSlot {
  node.static = isStatic;
  // Note: both bracketL have already been consumed
  node.id = flowParseObjectPropertyKey();
  expect(tt.bracketR);
  expect(tt.bracketR);
  if (isRelational("<") || match(tt.parenL)) {
    node.method = true;
    node.optional = false;
    node.value = flowParseObjectTypeMethodish(
      startNodeAt(node.start, node.loc.start),
    );
  } else {
    node.method = false;
    if (eat(tt.question)) {
      node.optional = true;
    }
    node.value = flowParseTypeInitialiser();
  }
  return finishNode(node, "ObjectTypeInternalSlot");
}

function flowParseObjectTypeMethodish(
  node: N.FlowFunctionTypeAnnotation,
): N.FlowFunctionTypeAnnotation {
  node.params = [];
  node.rest = null;
  node.typeParameters = null;

  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterDeclaration(
      /* allowDefault */ false,
    );
  }

  expect(tt.parenL);
  while (!match(tt.parenR) && !match(tt.ellipsis)) {
    node.params.push(flowParseFunctionTypeParam());
    if (!match(tt.parenR)) {
      expect(tt.comma);
    }
  }

  if (eat(tt.ellipsis)) {
    node.rest = flowParseFunctionTypeParam();
  }
  expect(tt.parenR);
  node.returnType = flowParseTypeInitialiser();

  return finishNode(node, "FunctionTypeAnnotation");
}

function flowParseObjectTypeCallProperty(
  node: N.FlowObjectTypeCallProperty,
  isStatic: boolean,
): N.FlowObjectTypeCallProperty {
  const valueNode = startNode();
  node.static = isStatic;
  node.value = flowParseObjectTypeMethodish(valueNode);
  return finishNode(node, "ObjectTypeCallProperty");
}

function flowParseObjectType({
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
  const oldInType = state.inType;
  state.inType = true;

  const nodeStart = startNode();

  nodeStart.callProperties = [];
  nodeStart.properties = [];
  nodeStart.indexers = [];
  nodeStart.internalSlots = [];

  let endDelim;
  let exact;
  let inexact = false;
  if (allowExact && match(tt.braceBarL)) {
    expect(tt.braceBarL);
    endDelim = tt.braceBarR;
    exact = true;
  } else {
    expect(tt.braceL);
    endDelim = tt.braceR;
    exact = false;
  }

  nodeStart.exact = exact;

  while (!match(endDelim)) {
    let isStatic = false;
    let protoStart: ?number = null;
    const node = startNode();

    if (allowProto && isContextual("proto")) {
      const token = lookahead();

      if (token.type !== tt.colon && token.type !== tt.question) {
        next();
        protoStart = state.start;
        allowStatic = false;
      }
    }

    if (allowStatic && isContextual("static")) {
      const token = lookahead();

      // static is a valid identifier name
      if (token.type !== tt.colon && token.type !== tt.question) {
        next();
        isStatic = true;
      }
    }

    const variance = flowParseVariance();

    if (eat(tt.bracketL)) {
      if (protoStart != null) {
        unexpected(protoStart);
      }
      if (eat(tt.bracketL)) {
        if (variance) {
          unexpected(variance.start);
        }
        nodeStart.internalSlots.push(
          flowParseObjectTypeInternalSlot(node, isStatic),
        );
      } else {
        nodeStart.indexers.push(
          flowParseObjectTypeIndexer(node, isStatic, variance),
        );
      }
    } else if (match(tt.parenL) || isRelational("<")) {
      if (protoStart != null) {
        unexpected(protoStart);
      }
      if (variance) {
        unexpected(variance.start);
      }
      nodeStart.callProperties.push(
        flowParseObjectTypeCallProperty(node, isStatic),
      );
    } else {
      let kind = "init";

      if (isContextual("get") || isContextual("set")) {
        const token = lookahead();
        if (
          token.type === tt.name ||
          token.type === tt.string ||
          token.type === tt.num
        ) {
          kind = state.value;
          next();
        }
      }

      const propOrInexact = flowParseObjectTypeProperty(
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

    flowObjectTypeSemicolon();
  }

  expect(endDelim);

  /* The inexact flag should only be added on ObjectTypeAnnotations that
   * are not the body of an interface, declare interface, or declare class.
   * Since spreads are only allowed in objec types, checking that is
   * sufficient here.
   */
  if (allowSpread) {
    nodeStart.inexact = inexact;
  }

  const out = finishNode(nodeStart, "ObjectTypeAnnotation");

  state.inType = oldInType;

  return out;
}

function flowParseObjectTypeProperty(
  node: N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty,
  isStatic: boolean,
  protoStart: ?number,
  variance: ?N.FlowVariance,
  kind: string,
  allowSpread: boolean,
  allowInexact: boolean,
): (N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty) | null {
  if (match(tt.ellipsis)) {
    if (!allowSpread) {
      unexpected(
        null,
        "Spread operator cannot appear in class or interface definitions",
      );
    }
    if (protoStart != null) {
      unexpected(protoStart);
    }
    if (variance) {
      unexpected(variance.start, "Spread properties cannot have variance");
    }
    expect(tt.ellipsis);
    const isInexactToken = eat(tt.comma) || eat(tt.semi);

    if (match(tt.braceR)) {
      if (allowInexact) return null;
      unexpected(
        null,
        "Explicit inexact syntax is only allowed inside inexact objects",
      );
    }

    if (match(tt.braceBarR)) {
      unexpected(
        null,
        "Explicit inexact syntax cannot appear inside an explicit exact object type",
      );
    }

    if (isInexactToken) {
      unexpected(
        null,
        "Explicit inexact syntax must appear at the end of an inexact object",
      );
    }
    node.argument = flowParseType();
    return finishNode(node, "ObjectTypeSpreadProperty");
  } else {
    node.key = flowParseObjectPropertyKey();
    node.static = isStatic;
    node.proto = protoStart != null;
    node.kind = kind;

    let optional = false;
    if (isRelational("<") || match(tt.parenL)) {
      // This is a method property
      node.method = true;

      if (protoStart != null) {
        unexpected(protoStart);
      }
      if (variance) {
        unexpected(variance.start);
      }

      node.value = flowParseObjectTypeMethodish(
        startNodeAt(node.start, node.loc.start),
      );
      if (kind === "get" || kind === "set") {
        flowCheckGetterSetterParams(node);
      }
    } else {
      if (kind !== "init") unexpected();

      node.method = false;

      if (eat(tt.question)) {
        optional = true;
      }
      node.value = flowParseTypeInitialiser();
      node.variance = variance;
    }

    node.optional = optional;

    return finishNode(node, "ObjectTypeProperty");
  }
}

// This is similar to checkGetterSetterParams, but as
// @babel/parser uses non estree properties we cannot reuse it here
function flowCheckGetterSetterParams(
  property: N.FlowObjectTypeProperty | N.FlowObjectTypeSpreadProperty,
): void {
  const paramCount = property.kind === "get" ? 0 : 1;
  const start = property.start;
  const length = property.value.params.length + (property.value.rest ? 1 : 0);
  if (length !== paramCount) {
    if (property.kind === "get") {
      raise(start, "getter must not have any formal parameters");
    } else {
      raise(start, "setter must have exactly one formal parameter");
    }
  }

  if (property.kind === "set" && property.value.rest) {
    raise(start, "setter function argument must not be a rest parameter");
  }
}

function flowObjectTypeSemicolon(): void {
  if (
    !eat(tt.semi) &&
    !eat(tt.comma) &&
    !match(tt.braceR) &&
    !match(tt.braceBarR)
  ) {
    unexpected();
  }
}

function flowParseQualifiedTypeIdentifier(
  startPos?: number,
  startLoc?: Position,
  id?: N.Identifier,
): N.FlowQualifiedTypeIdentifier {
  startPos = startPos || state.start;
  startLoc = startLoc || state.startLoc;
  let node = id || parseIdentifier();

  while (eat(tt.dot)) {
    const node2 = startNodeAt(startPos, startLoc);
    node2.qualification = node;
    node2.id = parseIdentifier();
    node = finishNode(node2, "QualifiedTypeIdentifier");
  }

  return node;
}

function flowParseGenericType(
  startPos: number,
  startLoc: Position,
  id: N.Identifier,
): N.FlowGenericTypeAnnotation {
  const node = startNodeAt(startPos, startLoc);

  node.typeParameters = null;
  node.id = flowParseQualifiedTypeIdentifier(startPos, startLoc, id);

  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterInstantiation();
  }

  return finishNode(node, "GenericTypeAnnotation");
}

function flowParseTypeofType(): N.FlowTypeofTypeAnnotation {
  const node = startNode();
  expect(tt._typeof);
  node.argument = flowParsePrimaryType();
  return finishNode(node, "TypeofTypeAnnotation");
}

function flowParseTupleType(): N.FlowTupleTypeAnnotation {
  const node = startNode();
  node.types = [];
  expect(tt.bracketL);
  // We allow trailing commas
  while (state.pos < length && !match(tt.bracketR)) {
    node.types.push(flowParseType());
    if (match(tt.bracketR)) break;
    expect(tt.comma);
  }
  expect(tt.bracketR);
  return finishNode(node, "TupleTypeAnnotation");
}

function flowParseFunctionTypeParam(): N.FlowFunctionTypeParam {
  let name = null;
  let optional = false;
  let typeAnnotation = null;
  const node = startNode();
  const lh = lookahead();
  if (lh.type === tt.colon || lh.type === tt.question) {
    name = parseIdentifier();
    if (eat(tt.question)) {
      optional = true;
    }
    typeAnnotation = flowParseTypeInitialiser();
  } else {
    typeAnnotation = flowParseType();
  }
  node.name = name;
  node.optional = optional;
  node.typeAnnotation = typeAnnotation;
  return finishNode(node, "FunctionTypeParam");
}

function reinterpretTypeAsFunctionTypeParam(
  type: N.FlowType,
): N.FlowFunctionTypeParam {
  const node = startNodeAt(type.start, type.loc.start);
  node.name = null;
  node.optional = false;
  node.typeAnnotation = type;
  return finishNode(node, "FunctionTypeParam");
}

function flowParseFunctionTypeParams(
  params: N.FlowFunctionTypeParam[] = [],
): { params: N.FlowFunctionTypeParam[], rest: ?N.FlowFunctionTypeParam } {
  let rest: ?N.FlowFunctionTypeParam = null;
  while (!match(tt.parenR) && !match(tt.ellipsis)) {
    params.push(flowParseFunctionTypeParam());
    if (!match(tt.parenR)) {
      expect(tt.comma);
    }
  }
  if (eat(tt.ellipsis)) {
    rest = flowParseFunctionTypeParam();
  }
  return { params, rest };
}

function flowIdentToTypeAnnotation(
  startPos: number,
  startLoc: Position,
  node: N.FlowTypeAnnotation,
  id: N.Identifier,
): N.FlowTypeAnnotation {
  switch (id.name) {
    case "any":
      return finishNode(node, "AnyTypeAnnotation");

    case "bool":
    case "boolean":
      return finishNode(node, "BooleanTypeAnnotation");

    case "mixed":
      return finishNode(node, "MixedTypeAnnotation");

    case "empty":
      return finishNode(node, "EmptyTypeAnnotation");

    case "number":
      return finishNode(node, "NumberTypeAnnotation");

    case "string":
      return finishNode(node, "StringTypeAnnotation");

    default:
      checkNotUnderscore(id.name);
      return flowParseGenericType(startPos, startLoc, id);
  }
}

// The parsing of types roughly parallels the parsing of expressions, and
// primary types are kind of like primary expressions...they're the
// primitives with which other types are constructed.
function flowParsePrimaryType(): N.FlowTypeAnnotation {
  const startPos = state.start;
  const startLoc = state.startLoc;
  const node = startNode();
  let tmp;
  let type;
  let isGroupedType = false;
  const oldNoAnonFunctionType = state.noAnonFunctionType;

  switch (state.type) {
    case tt.name:
      if (isContextual("interface")) {
        return flowParseInterfaceType();
      }

      return flowIdentToTypeAnnotation(
        startPos,
        startLoc,
        node,
        parseIdentifier(),
      );

    case tt.braceL:
      return flowParseObjectType({
        allowStatic: false,
        allowExact: false,
        allowSpread: true,
        allowProto: false,
        allowInexact: true,
      });

    case tt.braceBarL:
      return flowParseObjectType({
        allowStatic: false,
        allowExact: true,
        allowSpread: true,
        allowProto: false,
        allowInexact: false,
      });

    case tt.bracketL:
      return flowParseTupleType();

    case tt.relational:
      if (state.value === "<") {
        node.typeParameters = flowParseTypeParameterDeclaration(
          /* allowDefault */ false,
        );
        expect(tt.parenL);
        tmp = flowParseFunctionTypeParams();
        node.params = tmp.params;
        node.rest = tmp.rest;
        expect(tt.parenR);

        expect(tt.arrow);

        node.returnType = flowParseType();

        return finishNode(node, "FunctionTypeAnnotation");
      }
      break;

    case tt.parenL:
      next();

      // Check to see if this is actually a grouped type
      if (!match(tt.parenR) && !match(tt.ellipsis)) {
        if (match(tt.name)) {
          const token = lookahead().type;
          isGroupedType = token !== tt.question && token !== tt.colon;
        } else {
          isGroupedType = true;
        }
      }

      if (isGroupedType) {
        state.noAnonFunctionType = false;
        type = flowParseType();
        state.noAnonFunctionType = oldNoAnonFunctionType;

        // A `,` or a `) =>` means this is an anonymous function type
        if (
          state.noAnonFunctionType ||
          !(
            match(tt.comma) ||
            (match(tt.parenR) && lookahead().type === tt.arrow)
          )
        ) {
          expect(tt.parenR);
          return type;
        } else {
          // Eat a comma if there is one
          eat(tt.comma);
        }
      }

      if (type) {
        tmp = flowParseFunctionTypeParams([
          reinterpretTypeAsFunctionTypeParam(type),
        ]);
      } else {
        tmp = flowParseFunctionTypeParams();
      }

      node.params = tmp.params;
      node.rest = tmp.rest;

      expect(tt.parenR);

      expect(tt.arrow);

      node.returnType = flowParseType();

      node.typeParameters = null;

      return finishNode(node, "FunctionTypeAnnotation");

    case tt.string:
      return parseLiteral(state.value, "StringLiteralTypeAnnotation");

    case tt._true:
    case tt._false:
      node.value = match(tt._true);
      next();
      return finishNode(node, "BooleanLiteralTypeAnnotation");

    case tt.plusMin:
      if (state.value === "-") {
        next();
        if (!match(tt.num)) {
          unexpected(null, `Unexpected token, expected "number"`);
        }

        return parseLiteral(
          -state.value,
          "NumberLiteralTypeAnnotation",
          node.start,
          node.loc.start,
        );
      }

      unexpected();
    case tt.num:
      return parseLiteral(state.value, "NumberLiteralTypeAnnotation");

    case tt._void:
      next();
      return finishNode(node, "VoidTypeAnnotation");

    case tt._null:
      next();
      return finishNode(node, "NullLiteralTypeAnnotation");

    case tt._this:
      next();
      return finishNode(node, "ThisTypeAnnotation");

    case tt.star:
      next();
      return finishNode(node, "ExistsTypeAnnotation");

    default:
      if (state.type.keyword === "typeof") {
        return flowParseTypeofType();
      } else if (state.type.keyword) {
        const label = state.type.label;
        next();
        return createIdentifier(node, label);
      }
  }

  throw unexpected();
}

function flowParsePostfixType(): N.FlowTypeAnnotation {
  const startPos = state.start,
    startLoc = state.startLoc;
  let type = flowParsePrimaryType();
  while (match(tt.bracketL) && !canInsertSemicolon()) {
    const node = startNodeAt(startPos, startLoc);
    node.elementType = type;
    expect(tt.bracketL);
    expect(tt.bracketR);
    type = finishNode(node, "ArrayTypeAnnotation");
  }
  return type;
}

function flowParsePrefixType(): N.FlowTypeAnnotation {
  const node = startNode();
  if (eat(tt.question)) {
    node.typeAnnotation = flowParsePrefixType();
    return finishNode(node, "NullableTypeAnnotation");
  } else {
    return flowParsePostfixType();
  }
}

function flowParseAnonFunctionWithoutParens(): N.FlowTypeAnnotation {
  const param = flowParsePrefixType();
  if (!state.noAnonFunctionType && eat(tt.arrow)) {
    // TODO: This should be a type error. Passing in a SourceLocation, and it expects a Position.
    const node = startNodeAt(param.start, param.loc.start);
    node.params = [reinterpretTypeAsFunctionTypeParam(param)];
    node.rest = null;
    node.returnType = flowParseType();
    node.typeParameters = null;
    return finishNode(node, "FunctionTypeAnnotation");
  }
  return param;
}

function flowParseIntersectionType(): N.FlowTypeAnnotation {
  const node = startNode();
  eat(tt.bitwiseAND);
  const type = flowParseAnonFunctionWithoutParens();
  node.types = [type];
  while (eat(tt.bitwiseAND)) {
    node.types.push(flowParseAnonFunctionWithoutParens());
  }
  return node.types.length === 1
    ? type
    : finishNode(node, "IntersectionTypeAnnotation");
}

function flowParseUnionType(): N.FlowTypeAnnotation {
  const node = startNode();
  eat(tt.bitwiseOR);
  const type = flowParseIntersectionType();
  node.types = [type];
  while (eat(tt.bitwiseOR)) {
    node.types.push(flowParseIntersectionType());
  }
  return node.types.length === 1
    ? type
    : finishNode(node, "UnionTypeAnnotation");
}

function flowParseType(): N.FlowTypeAnnotation {
  const oldInType = state.inType;
  state.inType = true;
  const type = flowParseUnionType();
  state.inType = oldInType;
  // Ensure that a brace after a function generic type annotation is a
  // statement, except in arrow functions (noAnonFunctionType)
  state.exprAllowed = state.exprAllowed || state.noAnonFunctionType;
  return type;
}

function flowParseTypeOrImplicitInstantiation(): N.FlowTypeAnnotation {
  if (state.type === tt.name && state.value === "_") {
    const startPos = state.start;
    const startLoc = state.startLoc;
    const node = parseIdentifier();
    return flowParseGenericType(startPos, startLoc, node);
  } else {
    return flowParseType();
  }
}

function flowParseTypeAnnotation(): N.FlowTypeAnnotation {
  const node = startNode();
  node.typeAnnotation = flowParseTypeInitialiser();
  return finishNode(node, "TypeAnnotation");
}

function flowParseTypeAnnotatableIdentifier(
  allowPrimitiveOverride?: boolean,
): N.Identifier {
  const ident = allowPrimitiveOverride
    ? parseIdentifier()
    : flowParseRestrictedIdentifier();
  if (match(tt.colon)) {
    ident.typeAnnotation = flowParseTypeAnnotation();
    finishNode(ident, ident.type);
  }
  return ident;
}

function typeCastToParameter(node: N.Node): N.Node {
  node.expression.typeAnnotation = node.typeAnnotation;

  return finishNodeAt(
    node.expression,
    node.expression.type,
    node.typeAnnotation.end,
    node.typeAnnotation.loc.end,
  );
}

function flowParseVariance(): ?N.FlowVariance {
  let variance = null;
  if (match(tt.plusMin)) {
    variance = startNode();
    if (state.value === "+") {
      variance.kind = "plus";
    } else {
      variance.kind = "minus";
    }
    next();
    finishNode(variance, "Variance");
  }
  return variance;
}

// ==================================
// Overrides
// ==================================

export function parseFunctionBody(
  node: N.Function,
  allowExpressionBody: ?boolean,
  isMethod?: boolean = false,
): void {
  if (allowExpressionBody) {
    return forwardNoArrowParamsConversionAt(node, () =>
      original(parseFunctionBody)(node, true, isMethod),
    );
  }

  return original(parseFunctionBody)(node, false, isMethod);
}

export function parseFunctionBodyAndFinish(
  node: N.BodilessFunctionOrMethodBase,
  type: string,
  isMethod?: boolean = false,
): void {
  if (match(tt.colon)) {
    const typeNode = startNode();

    [
      // $FlowFixMe (destructuring not supported yet)
      typeNode.typeAnnotation,
      // $FlowFixMe (destructuring not supported yet)
      node.predicate,
    ] = flowParseTypeAndPredicateInitialiser();

    node.returnType = typeNode.typeAnnotation
      ? finishNode(typeNode, "TypeAnnotation")
      : null;
  }

  original(parseFunctionBodyAndFinish)(node, type, isMethod);
}

// interfaces
export function parseStatement(
  context: ?string,
  topLevel?: boolean,
): N.Statement {
  // strict mode handling of `interface` since it's a reserved word
  if (state.strict && match(tt.name) && state.value === "interface") {
    const node = startNode();
    next();
    return flowParseInterface(node);
  } else {
    const stmt = original(parseStatement)(context, topLevel);
    // We will parse a flow pragma in any comment before the first statement.
    if (state.flowPragma === undefined && !isValidDirective(stmt)) {
      state.flowPragma = null;
    }
    return stmt;
  }
}

// declares, interfaces and type aliases
export function parseExpressionStatement(
  node: N.ExpressionStatement,
  expr: N.Expression,
): N.ExpressionStatement {
  if (expr.type === "Identifier") {
    if (expr.name === "declare") {
      if (
        match(tt._class) ||
        match(tt.name) ||
        match(tt._function) ||
        match(tt._var) ||
        match(tt._export)
      ) {
        return flowParseDeclare(node);
      }
    } else if (match(tt.name)) {
      if (expr.name === "interface") {
        return flowParseInterface(node);
      } else if (expr.name === "type") {
        return flowParseTypeAlias(node);
      } else if (expr.name === "opaque") {
        return flowParseOpaqueType(node, false);
      }
    }
  }

  return original(parseExpressionStatement)(node, expr);
}

// export type
export function shouldParseExportDeclaration(): boolean {
  return (
    isContextual("type") ||
    isContextual("interface") ||
    isContextual("opaque") ||
    original(shouldParseExportDeclaration)()
  );
}

export function isExportDefaultSpecifier(): boolean {
  if (
    match(tt.name) &&
    (state.value === "type" ||
      state.value === "interface" ||
      state.value === "opaque")
  ) {
    return false;
  }

  return original(isExportDefaultSpecifier)();
}

export function parseConditional(
  expr: N.Expression,
  noIn: ?boolean,
  startPos: number,
  startLoc: Position,
  refNeedsArrowPos?: ?Pos,
): N.Expression {
  if (!match(tt.question)) return expr;

  // only do the expensive clone if there is a question mark
  // and if we come from inside parens
  if (refNeedsArrowPos) {
    const oldState = state.clone();
    try {
      return original(parseConditional)(expr, noIn, startPos, startLoc);
    } catch (err) {
      if (err instanceof SyntaxError) {
        resetState(oldState);
        refNeedsArrowPos.start = err.pos || state.start;
        return expr;
      } else {
        // istanbul ignore next: no such error is expected
        throw err;
      }
    }
  }
  expect(tt.question);
  const oldState = state.clone();
  const originalNoArrowAt = state.noArrowAt;
  const node = startNodeAt(startPos, startLoc);
  let { consequent, failed } = tryParseConditionalConsequent();
  let [valid, invalid] = getArrowLikeExpressions(consequent);

  if (failed || invalid.length > 0) {
    const noArrowAt = [...originalNoArrowAt];

    if (invalid.length > 0) {
      resetState(oldState);
      state.noArrowAt = noArrowAt;

      for (let i = 0; i < invalid.length; i++) {
        noArrowAt.push(invalid[i].start);
      }

      ({ consequent, failed } = tryParseConditionalConsequent());
      [valid, invalid] = getArrowLikeExpressions(consequent);
    }

    if (failed && valid.length > 1) {
      // if there are two or more possible correct ways of parsing, throw an
      // error.
      // e.g.   Source: a ? (b): c => (d): e => f
      //      Result 1: a ? b : (c => ((d): e => f))
      //      Result 2: a ? ((b): c => d) : (e => f)
      raise(
        oldState.start,
        "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.",
      );
    }

    if (failed && valid.length === 1) {
      resetState(oldState);
      state.noArrowAt = noArrowAt.concat(valid[0].start);
      ({ consequent, failed } = tryParseConditionalConsequent());
    }

    getArrowLikeExpressions(consequent, true);
  }

  state.noArrowAt = originalNoArrowAt;
  expect(tt.colon);

  node.test = expr;
  node.consequent = consequent;
  node.alternate = forwardNoArrowParamsConversionAt(node, () =>
    parseMaybeAssign(noIn, undefined, undefined, undefined),
  );

  return finishNode(node, "ConditionalExpression");
}

function tryParseConditionalConsequent(): {
  consequent: N.Expression,
  failed: boolean,
} {
  state.noArrowParamsConversionAt.push(state.start);

  const consequent = parseMaybeAssign();
  const failed = !match(tt.colon);

  state.noArrowParamsConversionAt.pop();

  return { consequent, failed };
}

// Given an expression, walks through out its arrow functions whose body is
// an expression and through out conditional expressions. It returns every
// function which has been parsed with a return type but could have been
// parenthesized expressions.
// These functions are separated into two arrays: one containing the ones
// whose parameters can be converted to assignable lists, one containing the
// others.
function getArrowLikeExpressions(
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
        toAssignableList(
          // node.params is Expression[] instead of $ReadOnlyArray<Pattern> because it
          // has not been converted yet.
          ((node.params: any): N.Expression[]),
          true,
          "arrow function parameters",
        );
        // Enter scope, as checkParams defines bindings
        scope.enter(functionFlags(false, false) | SCOPE_ARROW);
        // Use super's method to force the parameters to be checked
        original(checkParams)(node, false, true);
        scope.exit();
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
      toAssignableList(
        ((node.params: any): N.Expression[]),
        true,
        "arrow function parameters",
      );
    }
    return [arrows, []];
  }

  return partition(arrows, node => {
    try {
      toAssignableList(
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

function forwardNoArrowParamsConversionAt<T>(node: N.Node, parse: () => T): T {
  let result: T;
  if (state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
    state.noArrowParamsConversionAt.push(state.start);
    result = parse();
    state.noArrowParamsConversionAt.pop();
  } else {
    result = parse();
  }

  return result;
}

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
    const typeCastNode = startNodeAt(startPos, startLoc);
    typeCastNode.expression = node;
    typeCastNode.typeAnnotation = flowParseTypeAnnotation();

    return finishNode(typeCastNode, "TypeCastExpression");
  }

  return node;
}

export function assertModuleNodeAllowed(node: N.Node) {
  if (
    (node.type === "ImportDeclaration" &&
      (node.importKind === "type" || node.importKind === "typeof")) ||
    (node.type === "ExportNamedDeclaration" && node.exportKind === "type") ||
    (node.type === "ExportAllDeclaration" && node.exportKind === "type")
  ) {
    // Allow Flowtype imports and exports in all conditions because
    // Flow itself does not care about 'sourceType'.
    return;
  }

  original(assertModuleNodeAllowed)(node);
}

export function parseExport(node: N.Node): N.AnyExport {
  const decl = original(parseExport)(node);
  if (
    decl.type === "ExportNamedDeclaration" ||
    decl.type === "ExportAllDeclaration"
  ) {
    decl.exportKind = decl.exportKind || "value";
  }
  return decl;
}

export function parseExportDeclaration(
  node: N.ExportNamedDeclaration,
): ?N.Declaration {
  if (isContextual("type")) {
    node.exportKind = "type";

    const declarationNode = startNode();
    next();

    if (match(tt.braceL)) {
      // export type { foo, bar };
      node.specifiers = parseExportSpecifiers();
      parseExportFrom(node);
      return null;
    } else {
      // export type Foo = Bar;
      return flowParseTypeAlias(declarationNode);
    }
  } else if (isContextual("opaque")) {
    node.exportKind = "type";

    const declarationNode = startNode();
    next();
    // export opaque type Foo = Bar;
    return flowParseOpaqueType(declarationNode, false);
  } else if (isContextual("interface")) {
    node.exportKind = "type";
    const declarationNode = startNode();
    next();
    return flowParseInterface(declarationNode);
  } else {
    return original(parseExportDeclaration)(node);
  }
}

export function eatExportStar(node: N.Node): boolean {
  if (original(eatExportStar)(...arguments)) return true;

  if (isContextual("type") && lookahead().type === tt.star) {
    node.exportKind = "type";
    next();
    next();
    return true;
  }

  return false;
}

export function maybeParseExportNamespaceSpecifier(node: N.Node): boolean {
  const pos = state.start;
  const hasNamespace = original(maybeParseExportNamespaceSpecifier)(node);
  if (hasNamespace && node.exportKind === "type") {
    unexpected(pos);
  }
  return hasNamespace;
}

export function parseClassId(
  node: N.Class,
  isStatement: boolean,
  optionalId: ?boolean,
) {
  original(parseClassId)(node, isStatement, optionalId);
  if (isRelational("<")) {
    node.typeParameters = flowParseTypeParameterDeclaration();
  }
}

// ensure that inside flow types, we bypass the jsx parser plugin
export function getTokenFromCode(code: number): void {
  const next = input.charCodeAt(state.pos + 1);
  if (code === charCodes.leftCurlyBrace && next === charCodes.verticalBar) {
    return finishOp(tt.braceBarL, 2);
  } else if (
    state.inType &&
    (code === charCodes.greaterThan || code === charCodes.lessThan)
  ) {
    return finishOp(tt.relational, 1);
  } else if (isIteratorStart(code, next)) {
    state.isIterator = true;
    return readWord();
  } else {
    return original(getTokenFromCode)(code);
  }
}

export function toAssignable(
  node: N.Node,
  isBinding: ?boolean,
  contextDescription: string,
): N.Node {
  if (node.type === "TypeCastExpression") {
    return original(toAssignable)(
      typeCastToParameter(node),
      isBinding,
      contextDescription,
    );
  } else {
    return original(toAssignable)(node, isBinding, contextDescription);
  }
}

// turn type casts that we found in function parameter head into type annotated params
export function toAssignableList(
  exprList: N.Expression[],
  isBinding: ?boolean,
  contextDescription: string,
): $ReadOnlyArray<N.Pattern> {
  for (let i = 0; i < exprList.length; i++) {
    const expr = exprList[i];
    if (expr && expr.type === "TypeCastExpression") {
      exprList[i] = typeCastToParameter(expr);
    }
  }
  return original(toAssignableList)(exprList, isBinding, contextDescription);
}

// this is a list of nodes, from something like a call expression, we need to filter the
// type casts that we've found that are illegal in this context
export function toReferencedList(
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
      raise(
        expr.typeAnnotation.start,
        "The type cast expression is expected to be wrapped with parenthesis",
      );
    }
  }

  return exprList;
}

export function checkLVal(
  expr: N.Expression,
  bindingType: ?BindingTypes = BIND_NONE,
  checkClashes: ?{ [key: string]: boolean },
  contextDescription: string,
): void {
  if (expr.type !== "TypeCastExpression") {
    return original(checkLVal)(
      expr,
      bindingType,
      checkClashes,
      contextDescription,
    );
  }
}

// parse class property type annotations
export function parseClassProperty(node: N.ClassProperty): N.ClassProperty {
  if (match(tt.colon)) {
    node.typeAnnotation = flowParseTypeAnnotation();
  }
  return original(parseClassProperty)(node);
}

export function parseClassPrivateProperty(
  node: N.ClassPrivateProperty,
): N.ClassPrivateProperty {
  if (match(tt.colon)) {
    node.typeAnnotation = flowParseTypeAnnotation();
  }
  return original(parseClassPrivateProperty)(node);
}

// determine whether or not we're currently in the position where a class method would appear
export function isClassMethod(): boolean {
  return isRelational("<") || original(isClassMethod)();
}

// determine whether or not we're currently in the position where a class property would appear
export function isClassProperty(): boolean {
  return match(tt.colon) || original(isClassProperty)();
}

export function isNonstaticConstructor(
  method: N.ClassMethod | N.ClassProperty,
): boolean {
  return !match(tt.colon) && original(isNonstaticConstructor)(method);
}

// parse type parameters for class methods
export function pushClassMethod(
  classBody: N.ClassBody,
  method: N.ClassMethod,
  isGenerator: boolean,
  isAsync: boolean,
  isConstructor: boolean,
  allowsDirectSuper: boolean,
): void {
  if ((method: $FlowFixMe).variance) {
    unexpected((method: $FlowFixMe).variance.start);
  }
  delete (method: $FlowFixMe).variance;
  if (isRelational("<")) {
    method.typeParameters = flowParseTypeParameterDeclaration(
      /* allowDefault */ false,
    );
  }

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
  if ((method: $FlowFixMe).variance) {
    unexpected((method: $FlowFixMe).variance.start);
  }
  delete (method: $FlowFixMe).variance;
  if (isRelational("<")) {
    method.typeParameters = flowParseTypeParameterDeclaration();
  }

  original(pushClassPrivateMethod)(classBody, method, isGenerator, isAsync);
}

// parse a the super class type parameters and implements
export function parseClassSuper(node: N.Class): void {
  original(parseClassSuper)(node);
  if (node.superClass && isRelational("<")) {
    node.superTypeParameters = flowParseTypeParameterInstantiation();
  }
  if (isContextual("implements")) {
    next();
    const implemented: N.FlowClassImplements[] = (node.implements = []);
    do {
      const node = startNode();
      node.id = flowParseRestrictedIdentifier(/*liberal*/ true);
      if (isRelational("<")) {
        node.typeParameters = flowParseTypeParameterInstantiation();
      } else {
        node.typeParameters = null;
      }
      implemented.push(finishNode(node, "ClassImplements"));
    } while (eat(tt.comma));
  }
}

export function parsePropertyName(
  node: N.ObjectOrClassMember | N.ClassMember | N.TsNamedTypeElementBase,
): N.Identifier {
  const variance = flowParseVariance();
  const key = original(parsePropertyName)(node);
  // $FlowIgnore ("variance" not defined on TsNamedTypeElementBase)
  node.variance = variance;
  return key;
}

// parse type parameters for object method shorthand
export function parseObjPropValue(
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
    unexpected((prop: $FlowFixMe).variance.start);
  }
  delete (prop: $FlowFixMe).variance;

  let typeParameters;

  // method shorthand
  if (isRelational("<")) {
    typeParameters = flowParseTypeParameterDeclaration(
      /* allowDefault */ false,
    );
    if (!match(tt.parenL)) unexpected();
  }

  original(parseObjPropValue)(
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

export function parseAssignableListItemTypes(param: N.Pattern): N.Pattern {
  if (eat(tt.question)) {
    if (param.type !== "Identifier") {
      throw raise(
        param.start,
        "A binding pattern parameter cannot be optional in an implementation signature.",
      );
    }

    param.optional = true;
  }
  if (match(tt.colon)) {
    param.typeAnnotation = flowParseTypeAnnotation();
  }
  finishNode(param, param.type);
  return param;
}

export function parseMaybeDefault(
  startPos?: ?number,
  startLoc?: ?Position,
  left?: ?N.Pattern,
): N.Pattern {
  const node = original(parseMaybeDefault)(startPos, startLoc, left);

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

export function shouldParseDefaultImport(node: N.ImportDeclaration): boolean {
  if (!hasTypeImportKind(node)) {
    return original(shouldParseDefaultImport)(node);
  }

  return isMaybeDefaultImport(state);
}

export function parseImportSpecifierLocal(
  node: N.ImportDeclaration,
  specifier: N.Node,
  type: string,
  contextDescription: string,
): void {
  specifier.local = hasTypeImportKind(node)
    ? flowParseRestrictedIdentifier(true)
    : parseIdentifier();

  checkLVal(specifier.local, BIND_LEXICAL, undefined, contextDescription);
  node.specifiers.push(finishNode(specifier, type));
}

// parse typeof and type imports
export function maybeParseDefaultImportSpecifier(
  node: N.ImportDeclaration,
): boolean {
  node.importKind = "value";

  let kind = null;
  if (match(tt._typeof)) {
    kind = "typeof";
  } else if (isContextual("type")) {
    kind = "type";
  }
  if (kind) {
    const lh = lookahead();

    // import type * is not allowed
    if (kind === "type" && lh.type === tt.star) {
      unexpected(lh.start);
    }

    if (
      isMaybeDefaultImport(lh) ||
      lh.type === tt.braceL ||
      lh.type === tt.star
    ) {
      next();
      node.importKind = kind;
    }
  }

  return original(maybeParseDefaultImportSpecifier)(node);
}

// parse import-type/typeof shorthand
export function parseImportSpecifier(node: N.ImportDeclaration): void {
  const specifier = startNode();
  const firstIdentLoc = state.start;
  const firstIdent = parseIdentifier(true);

  let specifierTypeKind = null;
  if (firstIdent.name === "type") {
    specifierTypeKind = "type";
  } else if (firstIdent.name === "typeof") {
    specifierTypeKind = "typeof";
  }

  let isBinding = false;
  if (isContextual("as") && !isLookaheadContextual("as")) {
    const as_ident = parseIdentifier(true);
    if (specifierTypeKind !== null && !match(tt.name) && !state.type.keyword) {
      // `import {type as ,` or `import {type as }`
      specifier.imported = as_ident;
      specifier.importKind = specifierTypeKind;
      specifier.local = as_ident.__clone();
    } else {
      // `import {type as foo`
      specifier.imported = firstIdent;
      specifier.importKind = null;
      specifier.local = parseIdentifier();
    }
  } else if (
    specifierTypeKind !== null &&
    (match(tt.name) || state.type.keyword)
  ) {
    // `import {type foo`
    specifier.imported = parseIdentifier(true);
    specifier.importKind = specifierTypeKind;
    if (eatContextual("as")) {
      specifier.local = parseIdentifier();
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
    raise(
      firstIdentLoc,
      "The `type` and `typeof` keywords on named imports can only be used on regular " +
        "`import` statements. It cannot be used with `import type` or `import typeof` statements",
    );
  }

  if (nodeIsTypeImport || specifierIsTypeImport) {
    checkReservedType(specifier.local.name, specifier.local.start);
  }

  if (isBinding && !nodeIsTypeImport && !specifierIsTypeImport) {
    checkReservedWord(specifier.local.name, specifier.start, true, true);
  }

  checkLVal(specifier.local, BIND_LEXICAL, undefined, "import specifier");
  node.specifiers.push(finishNode(specifier, "ImportSpecifier"));
}

// parse function type parameters - function foo<T>() {}
export function parseFunctionParams(
  node: N.Function,
  allowModifiers?: boolean,
): void {
  // $FlowFixMe
  const kind = node.kind;
  if (kind !== "get" && kind !== "set" && isRelational("<")) {
    node.typeParameters = flowParseTypeParameterDeclaration(
      /* allowDefault */ false,
    );
  }
  original(parseFunctionParams)(node, allowModifiers);
}

// parse flow type annotations on variable declarator heads - let foo: string = bar
export function parseVarId(
  decl: N.VariableDeclarator,
  kind: "var" | "let" | "const",
): void {
  original(parseVarId)(decl, kind);
  if (match(tt.colon)) {
    decl.id.typeAnnotation = flowParseTypeAnnotation();
    finishNode(decl.id, decl.id.type);
  }
}

// parse the return type of an async arrow function - let foo = (async (): number => {});
export function parseAsyncArrowFromCallExpression(
  node: N.ArrowFunctionExpression,
  call: N.CallExpression,
): N.ArrowFunctionExpression {
  if (match(tt.colon)) {
    const oldNoAnonFunctionType = state.noAnonFunctionType;
    state.noAnonFunctionType = true;
    node.returnType = flowParseTypeAnnotation();
    state.noAnonFunctionType = oldNoAnonFunctionType;
  }

  return original(parseAsyncArrowFromCallExpression)(node, call);
}

// todo description
export function shouldParseAsyncArrow(): boolean {
  return match(tt.colon) || original(shouldParseAsyncArrow)();
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
export function parseMaybeAssign(
  noIn?: ?boolean,
  refShorthandDefaultPos?: ?Pos,
  afterLeftParse?: Function,
  refNeedsArrowPos?: ?Pos,
): N.Expression {
  let jsxError = null;
  if (hasPlugin("jsx") && (match(tt.jsxTagStart) || isRelational("<"))) {
    const oldState = state.clone();
    try {
      return original(parseMaybeAssign)(
        noIn,
        refShorthandDefaultPos,
        afterLeftParse,
        refNeedsArrowPos,
      );
    } catch (err) {
      if (err instanceof SyntaxError) {
        resetState(oldState);

        // Remove `tc.j_expr` and `tc.j_oTag` from context added
        // by parsing `jsxTagStart` to stop the JSX plugin from
        // messing with the tokens
        const cLength = state.context.length;
        if (state.context[cLength - 1] === tc.j_oTag) {
          state.context.length -= 2;
        }

        jsxError = err;
      } else {
        // istanbul ignore next: no such error is expected
        throw err;
      }
    }
  }

  if (jsxError != null || isRelational("<")) {
    let arrowExpression;
    let typeParameters;
    try {
      typeParameters = flowParseTypeParameterDeclaration();
      arrowExpression = forwardNoArrowParamsConversionAt(typeParameters, () =>
        original(parseMaybeAssign)(
          noIn,
          refShorthandDefaultPos,
          afterLeftParse,
          refNeedsArrowPos,
        ),
      );
      arrowExpression.typeParameters = typeParameters;
      resetStartLocationFromNode(arrowExpression, typeParameters);
    } catch (err) {
      throw jsxError || err;
    }

    if (arrowExpression.type === "ArrowFunctionExpression") {
      return arrowExpression;
    } else if (jsxError != null) {
      throw jsxError;
    } else {
      raise(
        typeParameters.start,
        "Expected an arrow function after this type parameter declaration",
      );
    }
  }

  return original(parseMaybeAssign)(
    noIn,
    refShorthandDefaultPos,
    afterLeftParse,
    refNeedsArrowPos,
  );
}

// handle return types for arrow functions
export function parseArrow(
  node: N.ArrowFunctionExpression,
): ?N.ArrowFunctionExpression {
  if (match(tt.colon)) {
    const oldState = state.clone();
    try {
      const oldNoAnonFunctionType = state.noAnonFunctionType;
      state.noAnonFunctionType = true;

      const typeNode = startNode();

      [
        // $FlowFixMe (destructuring not supported yet)
        typeNode.typeAnnotation,
        // $FlowFixMe (destructuring not supported yet)
        node.predicate,
      ] = flowParseTypeAndPredicateInitialiser();

      state.noAnonFunctionType = oldNoAnonFunctionType;

      if (canInsertSemicolon()) unexpected();
      if (!match(tt.arrow)) unexpected();

      // assign after it is clear it is an arrow
      node.returnType = typeNode.typeAnnotation
        ? finishNode(typeNode, "TypeAnnotation")
        : null;
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

export function shouldParseArrow(): boolean {
  return match(tt.colon) || original(shouldParseArrow)();
}

export function setArrowFunctionParameters(
  node: N.ArrowFunctionExpression,
  params: N.Expression[],
): void {
  if (state.noArrowParamsConversionAt.indexOf(node.start) !== -1) {
    node.params = params;
  } else {
    original(setArrowFunctionParameters)(node, params);
  }
}

export function checkParams(
  node: N.Function,
  allowDuplicates: boolean,
  isArrowFunction: ?boolean,
): void {
  if (
    isArrowFunction &&
    state.noArrowParamsConversionAt.indexOf(node.start) !== -1
  ) {
    return;
  }

  return original(checkParams)(node, allowDuplicates, isArrowFunction);
}

export function parseParenAndDistinguishExpression(
  canBeArrow: boolean,
): N.Expression {
  return original(parseParenAndDistinguishExpression)(
    canBeArrow && state.noArrowAt.indexOf(state.start) === -1,
  );
}

export function parseSubscripts(
  base: N.Expression,
  startPos: number,
  startLoc: Position,
  noCalls?: ?boolean,
): N.Expression {
  if (
    base.type === "Identifier" &&
    base.name === "async" &&
    state.noArrowAt.indexOf(startPos) !== -1
  ) {
    next();

    const node = startNodeAt(startPos, startLoc);
    node.callee = base;
    node.arguments = parseCallExpressionArguments(tt.parenR, false);
    base = finishNode(node, "CallExpression");
  } else if (
    base.type === "Identifier" &&
    base.name === "async" &&
    isRelational("<")
  ) {
    const oldState = state.clone();
    let error;
    try {
      const node = parseAsyncArrowWithTypeParameters(startPos, startLoc);
      if (node) return node;
    } catch (e) {
      error = e;
    }

    resetState(oldState);
    try {
      return original(parseSubscripts)(base, startPos, startLoc, noCalls);
    } catch (e) {
      throw error || e;
    }
  }

  return original(parseSubscripts)(base, startPos, startLoc, noCalls);
}

export function parseSubscript(
  base: N.Expression,
  startPos: number,
  startLoc: Position,
  noCalls: ?boolean,
  subscriptState: N.ParseSubscriptState,
  maybeAsyncArrow: boolean,
): N.Expression {
  if (match(tt.questionDot) && isLookaheadRelational("<")) {
    expectPlugin("optionalChaining");
    subscriptState.optionalChainMember = true;
    if (noCalls) {
      subscriptState.stop = true;
      return base;
    }
    next();
    const node: N.OptionalCallExpression = startNodeAt(startPos, startLoc);
    node.callee = base;
    node.typeArguments = flowParseTypeParameterInstantiation();
    expect(tt.parenL);
    // $FlowIgnore - read-only array type [1] is incompatible with array type [2].
    node.arguments = parseCallExpressionArguments(tt.parenR, false);
    node.optional = true;
    return finishNode(node, "OptionalCallExpression");
  } else if (!noCalls && shouldParseTypes() && isRelational("<")) {
    const node = startNodeAt(startPos, startLoc);
    node.callee = base;
    const oldState = state.clone();
    try {
      node.typeArguments = flowParseTypeParameterInstantiationCallOrNew();
      expect(tt.parenL);
      node.arguments = parseCallExpressionArguments(tt.parenR, false);
      if (subscriptState.optionalChainMember) {
        node.optional = false;
        return finishNode(node, "OptionalCallExpression");
      }
      return finishNode(node, "CallExpression");
    } catch (e) {
      if (e instanceof SyntaxError) {
        resetState(oldState);
      } else {
        throw e;
      }
    }
  }

  return original(parseSubscript)(
    base,
    startPos,
    startLoc,
    noCalls,
    subscriptState,
    maybeAsyncArrow,
  );
}

export function parseNewArguments(node: N.NewExpression): void {
  let targs = null;
  if (shouldParseTypes() && isRelational("<")) {
    const oldState = state.clone();
    try {
      targs = flowParseTypeParameterInstantiationCallOrNew();
    } catch (e) {
      if (e instanceof SyntaxError) {
        resetState(oldState);
      } else {
        throw e;
      }
    }
  }
  node.typeArguments = targs;

  original(parseNewArguments)(node);
}

function parseAsyncArrowWithTypeParameters(
  startPos: number,
  startLoc: Position,
): ?N.ArrowFunctionExpression {
  const node = startNodeAt(startPos, startLoc);
  parseFunctionParams(node);
  if (!parseArrow(node)) return;
  return parseArrowExpression(node, /* params */ undefined, /* isAsync */ true);
}

export function readToken_mult_modulo(code: number): void {
  const next = input.charCodeAt(state.pos + 1);
  if (
    code === charCodes.asterisk &&
    next === charCodes.slash &&
    state.hasFlowComment
  ) {
    state.hasFlowComment = false;
    state.pos += 2;
    nextToken();
    return;
  }

  original(readToken_mult_modulo)(code);
}

export function readToken_pipe_amp(code: number): void {
  const next = input.charCodeAt(state.pos + 1);
  if (code === charCodes.verticalBar && next === charCodes.rightCurlyBrace) {
    // '|}'
    finishOp(tt.braceBarR, 2);
    return;
  }

  original(readToken_pipe_amp)(code);
}

export function parseTopLevel(file: N.File, program: N.Program): N.File {
  const fileNode = original(parseTopLevel)(file, program);
  if (state.hasFlowComment) {
    unexpected(null, "Unterminated flow-comment");
  }
  return fileNode;
}

export function skipBlockComment(): void {
  if (hasPlugin("flowComments") && skipFlowComment()) {
    if (state.hasFlowComment) {
      unexpected(
        null,
        "Cannot have a flow comment inside another flow comment",
      );
    }
    hasFlowCommentCompletion();
    state.pos += skipFlowComment();
    state.hasFlowComment = true;
    return;
  }

  if (state.hasFlowComment) {
    const end = input.indexOf("*-/", (state.pos += 2));
    if (end === -1) raise(state.pos - 2, "Unterminated comment");
    state.pos = end + 3;
    return;
  }

  original(skipBlockComment)();
}

function skipFlowComment(): number | boolean {
  const { pos } = state;
  let shiftToFirstNonWhiteSpace = 2;
  while (
    [charCodes.space, charCodes.tab].includes(
      input.charCodeAt(pos + shiftToFirstNonWhiteSpace),
    )
  ) {
    shiftToFirstNonWhiteSpace++;
  }

  const ch2 = input.charCodeAt(shiftToFirstNonWhiteSpace + pos);
  const ch3 = input.charCodeAt(shiftToFirstNonWhiteSpace + pos + 1);

  if (ch2 === charCodes.colon && ch3 === charCodes.colon) {
    return shiftToFirstNonWhiteSpace + 2; // check for /*::
  }
  if (
    input.slice(
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

function hasFlowCommentCompletion(): void {
  const end = input.indexOf("*/", state.pos);
  if (end === -1) {
    raise(state.pos, "Unterminated comment");
  }
}
