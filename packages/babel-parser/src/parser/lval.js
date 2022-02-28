// @flow

/*:: declare var invariant; */
import * as charCodes from "charcodes";
import { tt, type TokenType } from "../tokenizer/types";
import type {
  TSParameterProperty,
  Decorator,
  Expression,
  Identifier,
  Node,
  Pattern,
  RestElement,
  SpreadElement,
  /*:: ObjectOrClassMember, */
  /*:: ClassMember, */
  ObjectMember,
  /*:: TsNamedTypeElementBase, */
  /*:: PrivateName, */
  /*:: ObjectExpression, */
  /*:: ObjectPattern, */
} from "../types";
import type { Pos, Position } from "../util/location";
import {
  isStrictBindOnlyReservedWord,
  isStrictBindReservedWord,
} from "../util/identifier";
import { NodeUtils } from "./node";
import {
  type BindingTypes,
  BIND_NONE,
  BIND_SCOPE_LEXICAL,
} from "../util/scopeflags";
import { ExpressionErrors } from "./util";
import { Errors, type LValAncestor } from "../parse-error";

const unwrapParenthesizedExpression = (node: Node): Node => {
  return node.type === "ParenthesizedExpression"
    ? unwrapParenthesizedExpression(node.expression)
    : node;
};

export default class LValParser extends NodeUtils {
  // Forward-declaration: defined in expression.js
  /*::
  +parseIdentifier: (liberal?: boolean) => Identifier;
  +parseMaybeAssignAllowIn: (
    refExpressionErrors?: ?ExpressionErrors,
    afterLeftParse?: Function,
    refNeedsArrowPos?: ?Pos,
  ) => Expression;
  +parseObjectLike: <T: ObjectPattern | ObjectExpression>(
    close: TokenType,
    isPattern: boolean,
    isRecord?: ?boolean,
    refExpressionErrors?: ?ExpressionErrors,
  ) => T;
  +parseObjPropValue: (
    prop: any,
    startPos: ?number,
    startLoc: ?Position,
    isGenerator: boolean,
    isAsync: boolean,
    isPattern: boolean,
    isAccessor: boolean,
    refExpressionErrors?: ?ExpressionErrors,
  ) => void;
  +parsePropertyName: (
    prop: ObjectOrClassMember | ClassMember | TsNamedTypeElementBase,
  ) => Expression | Identifier;
  +parsePrivateName: () => PrivateName
  */
  // Forward-declaration: defined in statement.js
  /*::
  +parseDecorator: () => Decorator;
  */

  /**
   * Convert existing expression atom to assignable pattern
   * if possible. Also checks invalid destructuring targets:

   - Parenthesized Destructuring patterns
   - RestElement is not the last element
   - Missing `=` in assignment pattern

   NOTE: There is a corresponding "isAssignable" method.
   When this one is updated, please check if also that one needs to be updated.

   * @param {Node} node The expression atom
   * @param {boolean} [isLHS=false] Whether we are parsing a LeftHandSideExpression. If isLHS is `true`, the following cases are allowed:
                                    `[(a)] = [0]`, `[(a.b)] = [0]`

   * @returns {Node} The converted assignable pattern
   * @memberof LValParser
   */
  toAssignable(node: Node, isLHS: boolean = false): Node {
    let parenthesized = undefined;
    if (node.type === "ParenthesizedExpression" || node.extra?.parenthesized) {
      parenthesized = unwrapParenthesizedExpression(node);
      if (isLHS) {
        // an LHS can be reinterpreted to a binding pattern but not vice versa.
        // therefore a parenthesized identifier is ambiguous until we are sure it is an assignment expression
        // i.e. `([(a) = []] = []) => {}`
        // see also `recordParenthesizedIdentifierError` signature in packages/babel-parser/src/util/expression-scope.js
        if (parenthesized.type === "Identifier") {
          this.expressionScope.recordParenthesizedIdentifierError({ at: node });
        } else if (parenthesized.type !== "MemberExpression") {
          // A parenthesized member expression can be in LHS but not in pattern.
          // If the LHS is later interpreted as a pattern, `checkLVal` will throw for member expression binding
          // i.e. `([(a.b) = []] = []) => {}`
          this.raise(Errors.InvalidParenthesizedAssignment, { at: node });
        }
      } else {
        this.raise(Errors.InvalidParenthesizedAssignment, { at: node });
      }
    }

    switch (node.type) {
      case "Identifier":
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;

      case "ObjectExpression":
        node.type = "ObjectPattern";
        for (
          let i = 0, length = node.properties.length, last = length - 1;
          i < length;
          i++
        ) {
          const prop = node.properties[i];
          const isLast = i === last;
          this.toAssignableObjectExpressionProp(prop, isLast, isLHS);

          if (
            isLast &&
            prop.type === "RestElement" &&
            node.extra?.trailingCommaLoc
          ) {
            this.raise(Errors.RestTrailingComma, {
              at: node.extra.trailingCommaLoc,
            });
          }
        }
        break;

      case "ObjectProperty": {
        const { key, value } = node;
        if (this.isPrivateName(key)) {
          this.classScope.usePrivateName(
            this.getPrivateNameSV(key),
            key.loc.start,
          );
        }
        this.toAssignable(value, isLHS);
        break;
      }

      case "SpreadElement": {
        this.checkToRestConversion(node);

        node.type = "RestElement";
        const arg = node.argument;
        this.toAssignable(arg, isLHS);
        break;
      }

      case "ArrayExpression":
        node.type = "ArrayPattern";
        this.toAssignableList(
          node.elements,
          node.extra?.trailingCommaLoc,
          isLHS,
        );
        break;

      case "AssignmentExpression":
        if (node.operator !== "=") {
          this.raise(Errors.MissingEqInAssignment, { at: node.left.loc.end });
        }

        node.type = "AssignmentPattern";
        delete node.operator;
        this.toAssignable(node.left, isLHS);
        break;

      case "ParenthesizedExpression":
        /*::invariant (parenthesized !== undefined) */
        this.toAssignable(parenthesized, isLHS);
        break;

      default:
      // We don't know how to deal with this node. It will
      // be reported by a later call to checkLVal
    }
    return node;
  }

  toAssignableObjectExpressionProp(
    prop: Node,
    isLast: boolean,
    isLHS: boolean,
  ) {
    if (prop.type === "ObjectMethod") {
      this.raise(
        prop.kind === "get" || prop.kind === "set"
          ? Errors.PatternHasAccessor
          : Errors.PatternHasMethod,
        { at: prop.key },
      );
    } else if (prop.type === "SpreadElement" && !isLast) {
      this.raise(Errors.RestTrailingComma, { at: prop });
    } else {
      this.toAssignable(prop, isLHS);
    }
  }

  // Convert list of expression atoms to binding list.

  toAssignableList(
    exprList: Expression[],
    trailingCommaLoc?: ?Position,
    isLHS: boolean,
  ): $ReadOnlyArray<Pattern> {
    let end = exprList.length;
    if (end) {
      const last = exprList[end - 1];
      if (last?.type === "RestElement") {
        --end;
      } else if (last?.type === "SpreadElement") {
        last.type = "RestElement";
        let arg = last.argument;
        this.toAssignable(arg, isLHS);
        arg = unwrapParenthesizedExpression(arg);
        if (
          arg.type !== "Identifier" &&
          arg.type !== "MemberExpression" &&
          arg.type !== "ArrayPattern" &&
          arg.type !== "ObjectPattern"
        ) {
          this.unexpected(arg.start);
        }

        if (trailingCommaLoc) {
          this.raise(Errors.RestTrailingComma, { at: trailingCommaLoc });
        }

        --end;
      }
    }
    for (let i = 0; i < end; i++) {
      const elt = exprList[i];
      if (elt) {
        this.toAssignable(elt, isLHS);
        if (elt.type === "RestElement") {
          this.raise(Errors.RestTrailingComma, { at: elt });
        }
      }
    }
    return exprList;
  }

  isAssignable(node: Node, isBinding?: boolean): boolean {
    switch (node.type) {
      case "Identifier":
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        return true;

      case "ObjectExpression": {
        const last = node.properties.length - 1;
        return node.properties.every((prop, i) => {
          return (
            prop.type !== "ObjectMethod" &&
            (i === last || prop.type !== "SpreadElement") &&
            this.isAssignable(prop)
          );
        });
      }

      case "ObjectProperty":
        return this.isAssignable(node.value);

      case "SpreadElement":
        return this.isAssignable(node.argument);

      case "ArrayExpression":
        return node.elements.every(
          element => element === null || this.isAssignable(element),
        );

      case "AssignmentExpression":
        return node.operator === "=";

      case "ParenthesizedExpression":
        return this.isAssignable(node.expression);

      case "MemberExpression":
      case "OptionalMemberExpression":
        return !isBinding;

      default:
        return false;
    }
  }

  // Convert list of expression atoms to a list of

  toReferencedList(
    exprList: $ReadOnlyArray<?Expression>,
    isParenthesizedExpr?: boolean, // eslint-disable-line no-unused-vars
  ): $ReadOnlyArray<?Expression> {
    return exprList;
  }

  toReferencedListDeep(
    exprList: $ReadOnlyArray<?Expression>,
    isParenthesizedExpr?: boolean,
  ): void {
    this.toReferencedList(exprList, isParenthesizedExpr);

    for (const expr of exprList) {
      if (expr?.type === "ArrayExpression") {
        this.toReferencedListDeep(expr.elements);
      }
    }
  }

  // Parses spread element.

  parseSpread(
    refExpressionErrors: ?ExpressionErrors,
    refNeedsArrowPos?: ?Pos,
  ): SpreadElement {
    const node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssignAllowIn(
      refExpressionErrors,
      undefined,
      refNeedsArrowPos,
    );
    return this.finishNode(node, "SpreadElement");
  }

  // https://tc39.es/ecma262/#prod-BindingRestProperty
  // https://tc39.es/ecma262/#prod-BindingRestElement
  parseRestBinding(): RestElement {
    const node = this.startNode();
    this.next(); // eat `...`
    node.argument = this.parseBindingAtom();
    return this.finishNode(node, "RestElement");
  }

  // Parses lvalue (assignable) atom.
  parseBindingAtom(): Pattern {
    // https://tc39.es/ecma262/#prod-BindingPattern
    switch (this.state.type) {
      case tt.bracketL: {
        const node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(
          tt.bracketR,
          charCodes.rightSquareBracket,
          true,
        );
        return this.finishNode(node, "ArrayPattern");
      }

      case tt.braceL:
        return this.parseObjectLike(tt.braceR, true);
    }

    // https://tc39.es/ecma262/#prod-BindingIdentifier
    return this.parseIdentifier();
  }

  // https://tc39.es/ecma262/#prod-BindingElementList
  parseBindingList(
    close: TokenType,
    closeCharCode: $Values<typeof charCodes>,
    allowEmpty?: boolean,
    allowModifiers?: boolean,
  ): $ReadOnlyArray<Pattern | TSParameterProperty> {
    const elts: Array<Pattern | TSParameterProperty> = [];
    let first = true;
    while (!this.eat(close)) {
      if (first) {
        first = false;
      } else {
        this.expect(tt.comma);
      }
      if (allowEmpty && this.match(tt.comma)) {
        // $FlowFixMe This method returns `$ReadOnlyArray<?Pattern>` if `allowEmpty` is set.
        elts.push(null);
      } else if (this.eat(close)) {
        break;
      } else if (this.match(tt.ellipsis)) {
        elts.push(this.parseAssignableListItemTypes(this.parseRestBinding()));
        if (!this.checkCommaAfterRest(closeCharCode)) {
          this.expect(close);
          break;
        }
      } else {
        const decorators = [];
        if (this.match(tt.at) && this.hasPlugin("decorators")) {
          this.raise(Errors.UnsupportedParameterDecorator, {
            at: this.state.startLoc,
          });
        }
        // invariant: hasPlugin("decorators-legacy")
        while (this.match(tt.at)) {
          decorators.push(this.parseDecorator());
        }
        elts.push(this.parseAssignableListItem(allowModifiers, decorators));
      }
    }
    return elts;
  }

  // https://tc39.es/ecma262/#prod-BindingRestProperty
  parseBindingRestProperty(prop: RestElement): RestElement {
    this.next(); // eat '...'
    // Don't use parseRestBinding() as we only allow Identifier here.
    prop.argument = this.parseIdentifier();
    this.checkCommaAfterRest(charCodes.rightCurlyBrace);
    return this.finishNode(prop, "RestElement");
  }

  // https://tc39.es/ecma262/#prod-BindingProperty
  parseBindingProperty(): ObjectMember | RestElement {
    const prop = this.startNode();
    const { type, start: startPos, startLoc } = this.state;
    if (type === tt.ellipsis) {
      return this.parseBindingRestProperty(prop);
    } else if (type === tt.privateName) {
      this.expectPlugin("destructuringPrivate", startLoc);
      this.classScope.usePrivateName(this.state.value, startLoc);
      prop.key = this.parsePrivateName();
    } else {
      this.parsePropertyName(prop);
    }
    prop.method = false;
    this.parseObjPropValue(
      prop,
      startPos,
      startLoc,
      false /* isGenerator */,
      false /* isAsync */,
      true /* isPattern */,
      false /* isAccessor */,
    );

    return prop;
  }

  parseAssignableListItem(
    allowModifiers: ?boolean,
    decorators: Decorator[],
  ): Pattern | TSParameterProperty {
    const left = this.parseMaybeDefault();
    this.parseAssignableListItemTypes(left);
    const elt = this.parseMaybeDefault(left.start, left.loc.start, left);
    if (decorators.length) {
      left.decorators = decorators;
    }
    return elt;
  }

  // Used by flow/typescript plugin to add type annotations to binding elements
  parseAssignableListItemTypes(param: Pattern): Pattern {
    return param;
  }

  // Parses assignment pattern around given atom if possible.
  // https://tc39.es/ecma262/#prod-BindingElement
  parseMaybeDefault(
    startPos?: ?number,
    startLoc?: ?Position,
    left?: ?Pattern,
  ): Pattern {
    startLoc = startLoc ?? this.state.startLoc;
    startPos = startPos ?? this.state.start;
    // $FlowIgnore
    left = left ?? this.parseBindingAtom();
    if (!this.eat(tt.eq)) return left;

    const node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssignAllowIn();
    return this.finishNode(node, "AssignmentPattern");
  }

  // eslint-disable-next-line no-unused-vars
  isValidLVal(type: string, isParenthesized: boolean, binding: BindingTypes) {
    return (
      {
        AssignmentPattern: "left",
        RestElement: "argument",
        ObjectProperty: "value",
        ParenthesizedExpression: "expression",
        ArrayPattern: "elements",
        ObjectPattern: "properties",
      }[type] || false
    );
  }

  /**
   * Verify that if a node is an lval - something that can be assigned to.
   *
   * @param {Expression} expr The given node
   * @param {string} contextDescription The auxiliary context information printed when error is thrown
   * @param {BindingTypes} [bindingType=BIND_NONE] The desired binding type. If the given node is an identifier and `bindingType` is not
                                                   BIND_NONE, `checkLVal` will register binding to the parser scope
                                                   See also src/util/scopeflags.js
   * @param {?Set<string>} checkClashes An optional string set to check if an identifier name is included. `checkLVal` will add checked
                                        identifier name to `checkClashes` It is used in tracking duplicates in function parameter lists. If
                                        it is nullish, `checkLVal` will skip duplicate checks
   * @param {boolean} [disallowLetBinding] Whether an identifier named "let" should be disallowed
   * @param {boolean} [strictModeChanged=false] Whether an identifier has been parsed in a sloppy context but should be reinterpreted as
                                                strict-mode. e.g. `(arguments) => { "use strict "}`
   * @memberof LValParser
   */

  checkLVal(
    expression: Expression | ObjectMember | RestElement,
    {
      in: ancestor,
      binding = BIND_NONE,
      checkClashes = false,
      strictModeChanged = false,
      allowingSloppyLetBinding = !(binding & BIND_SCOPE_LEXICAL),
      hasParenthesizedAncestor = false,
    }: {
      in: LValAncestor,
      binding?: BindingTypes,
      checkClashes?: Set<string> | false,
      strictModeChanged?: boolean,
      allowingSloppyLetBinding?: boolean,
      hasParenthesizedAncestor?: boolean,
    },
  ): void {
    const type = expression.type;

    // If we find here an ObjectMethod, it's because this was originally
    // an ObjectExpression which has then been converted.
    // toAssignable already reported this error with a nicer message.
    if (this.isObjectMethod(expression)) return;

    if (type === "MemberExpression") {
      if (binding !== BIND_NONE) {
        this.raise(Errors.InvalidPropertyBindingPattern, { at: expression });
      }
      return;
    }

    if (expression.type === "Identifier") {
      this.checkIdentifier(
        expression,
        binding,
        strictModeChanged,
        allowingSloppyLetBinding,
      );

      const { name } = expression;

      if (checkClashes) {
        if (checkClashes.has(name)) {
          this.raise(Errors.ParamDupe, { at: expression });
        } else {
          checkClashes.add(name);
        }
      }

      return;
    }

    const validity = this.isValidLVal(
      expression.type,
      hasParenthesizedAncestor || expression.extra?.parenthesized,
      binding,
    );

    if (validity === true) return;

    if (validity === false) {
      const ParseErrorClass =
        binding === BIND_NONE ? Errors.InvalidLhs : Errors.InvalidLhsBinding;

      this.raise(ParseErrorClass, {
        at: expression,
        ancestor:
          ancestor.type === "UpdateExpression"
            ? { type: "UpdateExpression", prefix: ancestor.prefix }
            : { type: ancestor.type },
      });
      return;
    }

    const isParenthesizedExpression =
      type === "ParenthesizedExpression" || Array.isArray(validity);
    const key = Array.isArray(validity) ? validity[1] : validity;
    const nextAncestor =
      expression.type === "ArrayPattern" ||
      expression.type === "ObjectPattern" ||
      expression.type === "ParenthesizedExpression"
        ? expression
        : ancestor;

    for (const child of [].concat(expression[key])) {
      if (child) {
        this.checkLVal(child, {
          in: nextAncestor,
          binding,
          checkClashes,
          allowingSloppyLetBinding,
          strictModeChanged,
          hasParenthesizedAncestor: isParenthesizedExpression,
        });
      }
    }
  }

  checkIdentifier(
    at: Identifier,
    bindingType: BindingTypes,
    strictModeChanged: boolean = false,
    allowLetBinding: boolean = !(bindingType & BIND_SCOPE_LEXICAL),
  ) {
    if (
      this.state.strict &&
      (strictModeChanged
        ? isStrictBindReservedWord(at.name, this.inModule)
        : isStrictBindOnlyReservedWord(at.name))
    ) {
      if (bindingType === BIND_NONE) {
        this.raise(Errors.StrictEvalArguments, { at, referenceName: at.name });
      } else {
        this.raise(Errors.StrictEvalArgumentsBinding, {
          at,
          bindingName: at.name,
        });
      }
    }

    if (!allowLetBinding && at.name === "let") {
      this.raise(Errors.LetInLexicalBinding, { at });
    }

    if (!(bindingType & BIND_NONE)) {
      this.declareNameFromIdentifier(at, bindingType);
    }
  }

  declareNameFromIdentifier(identifier: Identifier, binding: BindingTypes) {
    this.scope.declareName(identifier.name, binding, identifier.loc.start);
  }

  checkToRestConversion(node: SpreadElement): void {
    if (
      node.argument.type !== "Identifier" &&
      node.argument.type !== "MemberExpression"
    ) {
      this.raise(Errors.InvalidRestAssignmentPattern, {
        at: node.argument,
      });
    }
  }

  checkCommaAfterRest(close: $Values<typeof charCodes>): boolean {
    if (!this.match(tt.comma)) {
      return false;
    }

    this.raise(
      this.lookaheadCharCode() === close
        ? Errors.RestTrailingComma
        : Errors.ElementAfterRest,
      { at: this.state.startLoc },
    );

    return true;
  }
}
