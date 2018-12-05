// @flow

import { types as tt, TokenType } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";
import type { Pos, Position } from "../util/location";

function isSimpleProperty(node: N.Node): boolean {
  return (
    node != null &&
    node.type === "Property" &&
    node.kind === "init" &&
    node.method === false
  );
}

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    estreeParseRegExpLiteral({ pattern, flags }: N.RegExpLiteral): N.Node {
      let regex = null;
      try {
        regex = new RegExp(pattern, flags);
      } catch (e) {
        // In environments that don't support these flags value will
        // be null as the regex can't be represented natively.
      }
      const node = this.estreeParseLiteral(regex);
      node.regex = { pattern, flags };

      return node;
    }

    estreeParseLiteral(value: any): N.Node {
      return this.parseLiteral(value, "Literal");
    }

    directiveToStmt(directive: N.Directive): N.ExpressionStatement {
      const directiveLiteral = directive.value;

      const stmt = this.startNodeAt(directive.start, directive.loc.start);
      const expression = this.startNodeAt(
        directiveLiteral.start,
        directiveLiteral.loc.start,
      );

      expression.value = directiveLiteral.value;
      expression.raw = directiveLiteral.extra.raw;

      stmt.expression = this.finishNodeAt(
        expression,
        "Literal",
        directiveLiteral.end,
        directiveLiteral.loc.end,
      );
      stmt.directive = directiveLiteral.extra.raw.slice(1, -1);

      return this.finishNodeAt(
        stmt,
        "ExpressionStatement",
        directive.end,
        directive.loc.end,
      );
    }

    // ==================================
    // Overrides
    // ==================================

    initFunction(
      node: N.BodilessFunctionOrMethodBase,
      isAsync: ?boolean,
    ): void {
      super.initFunction(node, isAsync);
      node.expression = false;
    }

    checkDeclaration(node: N.Pattern | N.ObjectProperty): void {
      if (isSimpleProperty(node)) {
        this.checkDeclaration(((node: any): N.EstreeProperty).value);
      } else {
        super.checkDeclaration(node);
      }
    }

    checkGetterSetterParams(method: N.ObjectMethod | N.ClassMethod): void {
      const prop = ((method: any): N.EstreeProperty | N.EstreeMethodDefinition);
      const paramCount = prop.kind === "get" ? 0 : 1;
      const start = prop.start;
      if (prop.value.params.length !== paramCount) {
        if (prop.kind === "get") {
          this.raise(start, "getter must not have any formal parameters");
        } else {
          this.raise(start, "setter must have exactly one formal parameter");
        }
      }

      if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
        this.raise(
          start,
          "setter function argument must not be a rest parameter",
        );
      }
    }

    checkLVal(
      expr: N.Expression,
      isBinding: ?boolean,
      checkClashes: ?{ [key: string]: boolean },
      contextDescription: string,
    ): void {
      switch (expr.type) {
        case "ObjectPattern":
          expr.properties.forEach(prop => {
            this.checkLVal(
              prop.type === "Property" ? prop.value : prop,
              isBinding,
              checkClashes,
              "object destructuring pattern",
            );
          });
          break;
        default:
          super.checkLVal(expr, isBinding, checkClashes, contextDescription);
      }
    }

    checkPropClash(
      prop: N.ObjectMember,
      propHash: { [key: string]: boolean },
    ): void {
      if (prop.computed || !isSimpleProperty(prop)) return;

      const key = prop.key;
      // It is either an Identifier or a String/NumericLiteral
      const name = key.type === "Identifier" ? key.name : String(key.value);

      if (name === "__proto__") {
        if (propHash.proto) {
          this.raise(key.start, "Redefinition of __proto__ property");
        }
        propHash.proto = true;
      }
    }

    isStrictBody(node: { body: N.BlockStatement }): boolean {
      const isBlockStatement = node.body.type === "BlockStatement";

      if (isBlockStatement && node.body.body.length > 0) {
        for (const directive of node.body.body) {
          if (
            directive.type === "ExpressionStatement" &&
            directive.expression.type === "Literal"
          ) {
            if (directive.expression.value === "use strict") return true;
          } else {
            // Break for the first non literal expression
            break;
          }
        }
      }

      return false;
    }

    isValidDirective(stmt: N.Statement): boolean {
      return (
        stmt.type === "ExpressionStatement" &&
        stmt.expression.type === "Literal" &&
        typeof stmt.expression.value === "string" &&
        (!stmt.expression.extra || !stmt.expression.extra.parenthesized)
      );
    }

    stmtToDirective(stmt: N.Statement): N.Directive {
      const directive = super.stmtToDirective(stmt);
      const value = stmt.expression.value;

      // Reset value to the actual value as in estree mode we want
      // the stmt to have the real value and not the raw value
      directive.value.value = value;

      return directive;
    }

    parseBlockBody(
      node: N.BlockStatementLike,
      allowDirectives: ?boolean,
      topLevel: boolean,
      end: TokenType,
    ): void {
      super.parseBlockBody(node, allowDirectives, topLevel, end);

      const directiveStatements = node.directives.map(d =>
        this.directiveToStmt(d),
      );
      node.body = directiveStatements.concat(node.body);
      delete node.directives;
    }

    pushClassMethod(
      classBody: N.ClassBody,
      method: N.ClassMethod,
      isGenerator: boolean,
      isAsync: boolean,
      isConstructor: boolean,
    ): void {
      this.parseMethod(
        method,
        isGenerator,
        isAsync,
        isConstructor,
        "MethodDefinition",
      );
      if (method.typeParameters) {
        // $FlowIgnore
        method.value.typeParameters = method.typeParameters;
        delete method.typeParameters;
      }
      classBody.body.push(method);
    }

    parseExprAtom(refShorthandDefaultPos?: ?Pos): N.Expression {
      switch (this.state.type) {
        case tt.regexp:
          return this.estreeParseRegExpLiteral(this.state.value);

        case tt.num:
        case tt.string:
          return this.estreeParseLiteral(this.state.value);

        case tt._null:
          return this.estreeParseLiteral(null);

        case tt._true:
          return this.estreeParseLiteral(true);

        case tt._false:
          return this.estreeParseLiteral(false);

        default:
          return super.parseExprAtom(refShorthandDefaultPos);
      }
    }

    parseLiteral<T: N.Literal>(
      value: any,
      type: /*T["kind"]*/ string,
      startPos?: number,
      startLoc?: Position,
    ): T {
      const node = super.parseLiteral(value, type, startPos, startLoc);
      node.raw = node.extra.raw;
      delete node.extra;

      return node;
    }

    parseFunctionBody(node: N.Function, allowExpression: ?boolean): void {
      super.parseFunctionBody(node, allowExpression);
      node.expression = node.body.type !== "BlockStatement";
    }

    parseMethod<T: N.MethodLike>(
      node: T,
      isGenerator: boolean,
      isAsync: boolean,
      isConstructor: boolean,
      type: string,
    ): T {
      let funcNode = this.startNode();
      funcNode.kind = node.kind; // provide kind, so super method correctly sets state
      funcNode = super.parseMethod(
        funcNode,
        isGenerator,
        isAsync,
        isConstructor,
        "FunctionExpression",
      );
      delete funcNode.kind;
      // $FlowIgnore
      node.value = funcNode;

      return this.finishNode(node, type);
    }

    parseObjectMethod(
      prop: N.ObjectMethod,
      isGenerator: boolean,
      isAsync: boolean,
      isPattern: boolean,
      containsEsc: boolean,
    ): ?N.ObjectMethod {
      const node: N.EstreeProperty = (super.parseObjectMethod(
        prop,
        isGenerator,
        isAsync,
        isPattern,
        containsEsc,
      ): any);

      if (node) {
        node.type = "Property";
        if (((node: any): N.ClassMethod).kind === "method") node.kind = "init";
        node.shorthand = false;
      }

      return (node: any);
    }

    parseObjectProperty(
      prop: N.ObjectProperty,
      startPos: ?number,
      startLoc: ?Position,
      isPattern: boolean,
      refShorthandDefaultPos: ?Pos,
    ): ?N.ObjectProperty {
      const node: N.EstreeProperty = (super.parseObjectProperty(
        prop,
        startPos,
        startLoc,
        isPattern,
        refShorthandDefaultPos,
      ): any);

      if (node) {
        node.kind = "init";
        node.type = "Property";
      }

      return (node: any);
    }

    toAssignable(
      node: N.Node,
      isBinding: ?boolean,
      contextDescription: string,
    ): N.Node {
      if (isSimpleProperty(node)) {
        this.toAssignable(node.value, isBinding, contextDescription);

        return node;
      }

      return super.toAssignable(node, isBinding, contextDescription);
    }

    toAssignableObjectExpressionProp(
      prop: N.Node,
      isBinding: ?boolean,
      isLast: boolean,
    ) {
      if (prop.kind === "get" || prop.kind === "set") {
        this.raise(
          prop.key.start,
          "Object pattern can't contain getter or setter",
        );
      } else if (prop.method) {
        this.raise(prop.key.start, "Object pattern can't contain methods");
      } else {
        super.toAssignableObjectExpressionProp(prop, isBinding, isLast);
      }
    }
  };
