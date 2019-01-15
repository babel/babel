// @flow

import { types as tt, type TokenType } from "../tokenizer/types";
import type {
  TSParameterProperty,
  Decorator,
  Expression,
  Identifier,
  Node,
  ObjectExpression,
  ObjectPattern,
  Pattern,
  RestElement,
  SpreadElement,
} from "../types";
import type { Pos, Position } from "../util/location";
import { NodeUtils } from "./node";

export default class LValParser extends NodeUtils {
  // Forward-declaration: defined in expression.js
  +checkReservedWord: (
    word: string,
    startLoc: number,
    checkKeywords: boolean,
    isBinding: boolean,
  ) => void;
  +parseIdentifier: (liberal?: boolean) => Identifier;
  +parseMaybeAssign: (
    noIn?: ?boolean,
    refShorthandDefaultPos?: ?Pos,
    afterLeftParse?: Function,
    refNeedsArrowPos?: ?Pos,
  ) => Expression;
  +parseObj: <T: ObjectPattern | ObjectExpression>(
    isPattern: boolean,
    refShorthandDefaultPos?: ?Pos,
  ) => T;
  // Forward-declaration: defined in statement.js
  +parseDecorator: () => Decorator;

  // Convert existing expression atom to assignable pattern
  // if possible.

  toAssignable(
    node: Node,
    isBinding: ?boolean,
    contextDescription: string,
  ): Node {
    if (node) {
      switch (node.type) {
        case "Identifier":
        case "ObjectPattern":
        case "ArrayPattern":
        case "AssignmentPattern":
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
            this.toAssignableObjectExpressionProp(prop, isBinding, isLast);
          }
          break;

        case "ObjectProperty":
          this.toAssignable(node.value, isBinding, contextDescription);
          break;

        case "SpreadElement": {
          this.checkToRestConversion(node);

          node.type = "RestElement";
          const arg = node.argument;
          this.toAssignable(arg, isBinding, contextDescription);
          break;
        }

        case "ArrayExpression":
          node.type = "ArrayPattern";
          this.toAssignableList(node.elements, isBinding, contextDescription);
          break;

        case "AssignmentExpression":
          if (node.operator === "=") {
            node.type = "AssignmentPattern";
            delete node.operator;
          } else {
            this.raise(
              node.left.end,
              "Only '=' operator can be used for specifying default value.",
            );
          }
          break;

        case "MemberExpression":
          if (!isBinding) break;

        default: {
          const message =
            "Invalid left-hand side" +
            (contextDescription
              ? " in " + contextDescription
              : /* istanbul ignore next */ "expression");
          this.raise(node.start, message);
        }
      }
    }
    return node;
  }

  toAssignableObjectExpressionProp(
    prop: Node,
    isBinding: ?boolean,
    isLast: boolean,
  ) {
    if (prop.type === "ObjectMethod") {
      const error =
        prop.kind === "get" || prop.kind === "set"
          ? "Object pattern can't contain getter or setter"
          : "Object pattern can't contain methods";

      this.raise(prop.key.start, error);
    } else if (prop.type === "SpreadElement" && !isLast) {
      this.raiseRestNotLast(prop.start, "property");
    } else {
      this.toAssignable(prop, isBinding, "object destructuring pattern");
    }
  }

  // Convert list of expression atoms to binding list.

  toAssignableList(
    exprList: Expression[],
    isBinding: ?boolean,
    contextDescription: string,
  ): $ReadOnlyArray<Pattern> {
    let end = exprList.length;
    if (end) {
      const last = exprList[end - 1];
      if (last && last.type === "RestElement") {
        --end;
      } else if (last && last.type === "SpreadElement") {
        last.type = "RestElement";
        const arg = last.argument;
        this.toAssignable(arg, isBinding, contextDescription);
        if (
          arg.type !== "Identifier" &&
          arg.type !== "MemberExpression" &&
          arg.type !== "ArrayPattern" &&
          arg.type !== "ObjectPattern"
        ) {
          this.unexpected(arg.start);
        }
        --end;
      }
    }
    for (let i = 0; i < end; i++) {
      const elt = exprList[i];
      if (elt) {
        this.toAssignable(elt, isBinding, contextDescription);
        if (elt.type === "RestElement") {
          this.raiseRestNotLast(elt.start, "element");
        }
      }
    }
    return exprList;
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
  ): $ReadOnlyArray<?Expression> {
    this.toReferencedList(exprList, isParenthesizedExpr);

    for (const expr of exprList) {
      if (expr && expr.type === "ArrayExpression") {
        this.toReferencedListDeep(expr.elements);
      }
    }

    return exprList;
  }

  // Parses spread element.

  parseSpread(
    refShorthandDefaultPos: ?Pos,
    refNeedsArrowPos?: ?Pos,
  ): SpreadElement {
    const node = this.startNode();
    this.next();
    node.argument = this.parseMaybeAssign(
      false,
      refShorthandDefaultPos,
      undefined,
      refNeedsArrowPos,
    );

    if (this.state.commaAfterSpreadAt === -1 && this.match(tt.comma)) {
      this.state.commaAfterSpreadAt = this.state.start;
    }

    return this.finishNode(node, "SpreadElement");
  }

  parseRest(): RestElement {
    const node = this.startNode();
    this.next();
    node.argument = this.parseBindingAtom();
    return this.finishNode(node, "RestElement");
  }

  shouldAllowYieldIdentifier(): boolean {
    return (
      this.match(tt._yield) && !this.state.strict && !this.state.inGenerator
    );
  }

  parseBindingIdentifier(): Identifier {
    return this.parseIdentifier(this.shouldAllowYieldIdentifier());
  }

  // Parses lvalue (assignable) atom.
  parseBindingAtom(): Pattern {
    switch (this.state.type) {
      case tt._yield:
      case tt.name:
        return this.parseBindingIdentifier();

      case tt.bracketL: {
        const node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(tt.bracketR, true);
        return this.finishNode(node, "ArrayPattern");
      }

      case tt.braceL:
        return this.parseObj(true);

      default:
        throw this.unexpected();
    }
  }

  parseBindingList(
    close: TokenType,
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
        elts.push(this.parseAssignableListItemTypes(this.parseRest()));
        this.checkCommaAfterRest(
          close,
          this.state.inFunction && this.state.inParameters
            ? "parameter"
            : "element",
        );
        this.expect(close);
        break;
      } else {
        const decorators = [];
        if (this.match(tt.at) && this.hasPlugin("decorators")) {
          this.raise(
            this.state.start,
            "Stage 2 decorators cannot be used to decorate parameters",
          );
        }
        while (this.match(tt.at)) {
          decorators.push(this.parseDecorator());
        }
        elts.push(this.parseAssignableListItem(allowModifiers, decorators));
      }
    }
    return elts;
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

  parseAssignableListItemTypes(param: Pattern): Pattern {
    return param;
  }

  // Parses assignment pattern around given atom if possible.

  parseMaybeDefault(
    startPos?: ?number,
    startLoc?: ?Position,
    left?: ?Pattern,
  ): Pattern {
    startLoc = startLoc || this.state.startLoc;
    startPos = startPos || this.state.start;
    left = left || this.parseBindingAtom();
    if (!this.eat(tt.eq)) return left;

    const node = this.startNodeAt(startPos, startLoc);
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, "AssignmentPattern");
  }

  // Verify that a node is an lval — something that can be assigned
  // to.

  checkLVal(
    expr: Expression,
    isBinding: ?boolean,
    checkClashes: ?{ [key: string]: boolean },
    contextDescription: string,
  ): void {
    switch (expr.type) {
      case "Identifier":
        this.checkReservedWord(expr.name, expr.start, false, true);

        if (checkClashes) {
          // we need to prefix this with an underscore for the cases where we have a key of
          // `__proto__`. there's a bug in old V8 where the following wouldn't work:
          //
          //   > var obj = Object.create(null);
          //   undefined
          //   > obj.__proto__
          //   null
          //   > obj.__proto__ = true;
          //   true
          //   > obj.__proto__
          //   null
          const key = `_${expr.name}`;

          if (checkClashes[key]) {
            this.raise(expr.start, "Argument name clash in strict mode");
          } else {
            checkClashes[key] = true;
          }
        }
        break;

      case "MemberExpression":
        if (isBinding) this.raise(expr.start, "Binding member expression");
        break;

      case "ObjectPattern":
        for (let prop of expr.properties) {
          if (prop.type === "ObjectProperty") prop = prop.value;
          this.checkLVal(
            prop,
            isBinding,
            checkClashes,
            "object destructuring pattern",
          );
        }
        break;

      case "ArrayPattern":
        for (const elem of expr.elements) {
          if (elem) {
            this.checkLVal(
              elem,
              isBinding,
              checkClashes,
              "array destructuring pattern",
            );
          }
        }
        break;

      case "AssignmentPattern":
        this.checkLVal(
          expr.left,
          isBinding,
          checkClashes,
          "assignment pattern",
        );
        break;

      case "RestElement":
        this.checkLVal(expr.argument, isBinding, checkClashes, "rest element");
        break;

      default: {
        const message =
          (isBinding
            ? /* istanbul ignore next */ "Binding invalid"
            : "Invalid") +
          " left-hand side" +
          (contextDescription
            ? " in " + contextDescription
            : /* istanbul ignore next */ "expression");
        this.raise(expr.start, message);
      }
    }
  }

  checkToRestConversion(node: SpreadElement): void {
    if (
      node.argument.type !== "Identifier" &&
      node.argument.type !== "MemberExpression"
    ) {
      this.raise(node.argument.start, "Invalid rest operator's argument");
    }
  }

  checkCommaAfterRest(close: TokenType, kind: string): void {
    if (this.match(tt.comma)) {
      if (this.lookahead().type === close) {
        this.raiseCommaAfterRest(this.state.start, kind);
      } else {
        this.raiseRestNotLast(this.state.start, kind);
      }
    }
  }

  checkCommaAfterRestFromSpread(kind: string): void {
    if (this.state.commaAfterSpreadAt > -1) {
      this.raiseCommaAfterRest(this.state.commaAfterSpreadAt, kind);
    }
  }

  raiseCommaAfterRest(pos: number, kind: string) {
    this.raise(pos, `A trailing comma is not permitted after the rest ${kind}`);
  }

  raiseRestNotLast(pos: number, kind: string) {
    this.raise(pos, `The rest ${kind} must be the last ${kind}`);
  }
}
