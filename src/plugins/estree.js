import { types as tt } from "../tokenizer/types";

function isSimpleProperty(node) {
  return node &&
    node.type === "Property" &&
    node.kind === "init" &&
    node.method === false;
}

export default (superClass) => class extends superClass {
  estreeParseRegExpLiteral({ pattern, flags }) {
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

  estreeParseLiteral(value) {
    return this.parseLiteral(value, "Literal");
  }

  directiveToStmt(directive) {
    const directiveLiteral = directive.value;

    const stmt = this.startNodeAt(directive.start, directive.loc.start);
    const expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);

    expression.value = directiveLiteral.value;
    expression.raw = directiveLiteral.extra.raw;

    stmt.expression = this.finishNodeAt(
      expression, "Literal", directiveLiteral.end, directiveLiteral.loc.end);
    stmt.directive = directiveLiteral.extra.raw.slice(1, -1);

    return this.finishNodeAt(stmt, "ExpressionStatement", directive.end, directive.loc.end);
  }

  // ==================================
  // Overrides
  // ==================================

  checkDeclaration(node) {
    if (isSimpleProperty(node)) {
      this.checkDeclaration(node.value);
    } else {
      super.checkDeclaration(node);
    }
  }

  checkGetterSetterParamCount(prop) {
    const paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      const start = prop.start;
      if (prop.kind === "get") {
        this.raise(start, "getter should have no params");
      } else {
        this.raise(start, "setter should have exactly one param");
      }
    }
  }

  checkLVal(expr, isBinding, checkClashes, ...args) {
    switch (expr.type) {
      case "ObjectPattern":
        expr.properties.forEach((prop) => {
          this.checkLVal(
            prop.type === "Property" ? prop.value : prop,
            isBinding,
            checkClashes,
            "object destructuring pattern"
          );
        });
        break;
      default:
        super.checkLVal(expr, isBinding, checkClashes, ...args);
    }
  }

  checkPropClash(prop, propHash) {
    if (prop.computed || !isSimpleProperty(prop)) return;

    const key = prop.key;
    // It is either an Identifier or a String/NumericLiteral
    const name = key.type === "Identifier" ? key.name : String(key.value);

    if (name === "__proto__") {
      if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
      propHash.proto = true;
    }
  }

  isStrictBody(node, isExpression) {
    if (!isExpression && node.body.body.length > 0) {
      for (const directive of (node.body.body: Array<Object>)) {
        if (directive.type === "ExpressionStatement" && directive.expression.type === "Literal") {
          if (directive.expression.value === "use strict") return true;
        } else {
          // Break for the first non literal expression
          break;
        }
      }
    }

    return false;
  }

  isValidDirective(stmt) {
    return stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "Literal" &&
      typeof stmt.expression.value === "string" &&
      (!stmt.expression.extra || !stmt.expression.extra.parenthesized);
  }

  parseBlockBody(node, ...args) {
    super.parseBlockBody(node, ...args);

    node.directives.reverse().forEach((directive) => {
      node.body.unshift(this.directiveToStmt(directive));
    });
    delete node.directives;
  }

  parseClassMethod(classBody, ...args) {
    super.parseClassMethod(classBody, ...args);

    const body = classBody.body;
    body[body.length - 1].type = "MethodDefinition";
  }

  parseExprAtom(...args) {
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
        return super.parseExprAtom(...args);
    }
  }

  parseLiteral(...args) {
    const node = super.parseLiteral(...args);
    node.raw = node.extra.raw;
    delete node.extra;

    return node;
  }

  parseMethod(node, ...args) {
    let funcNode = this.startNode();
    funcNode.kind = node.kind; // provide kind, so super method correctly sets state
    funcNode = super.parseMethod(funcNode, ...args);
    delete funcNode.kind;
    node.value = this.finishNode(funcNode, "FunctionExpression");

    return node;
  }

  parseObjectMethod(...args) {
    const node = super.parseObjectMethod(...args);

    if (node) {
      if (node.kind === "method") node.kind = "init";
      node.type = "Property";
    }

    return node;
  }

  parseObjectProperty(...args) {
    const node = super.parseObjectProperty(...args);

    if (node) {
      node.kind = "init";
      node.type = "Property";
    }

    return node;
  }

  toAssignable(node, isBinding, ...args) {
    if (isSimpleProperty(node)) {
      this.toAssignable(node.value, isBinding, ...args);

      return node;
    } else if (node.type === "ObjectExpression") {
      node.type = "ObjectPattern";
      for (const prop of (node.properties: Array<Object>)) {
        if (prop.kind === "get" || prop.kind === "set") {
          this.raise(prop.key.start, "Object pattern can't contain getter or setter");
        } else if (prop.method) {
          this.raise(prop.key.start, "Object pattern can't contain methods");
        } else {
          this.toAssignable(prop, isBinding, "object destructuring pattern");
        }
      }

      return node;
    }

    return super.toAssignable(node, isBinding, ...args);
  }
};
