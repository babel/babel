import { types as tt } from "../tokenizer/types";
import Parser from "../parser";

const pp = Parser.prototype;

pp.estreeParseRegExpLiteral = function ({ pattern, flags }) {
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
};

pp.estreeParseLiteral = function (value) {
  const node = this.parseLiteral(value, "Literal");
  node.raw = node.extra.raw;
  delete node.extra;

  return node;
};

pp.directiveToStmt = function (directive) {
  const directiveLiteral = directive.value;

  const stmt = this.startNodeAt(directive.start, directive.loc.start);
  const expression = this.startNodeAt(directiveLiteral.start, directiveLiteral.loc.start);

  expression.value = directiveLiteral.value;
  expression.raw = directiveLiteral.extra.raw;

  stmt.expression = this.finishNodeAt(expression, "Literal", directiveLiteral.end, directiveLiteral.loc.end);
  stmt.directive = directiveLiteral.extra.raw.slice(1, -1);

  return this.finishNodeAt(stmt, "ExpressionStatement", directive.end, directive.loc.end);
};

function isSimpleProperty(node) {
  return node &&
    node.type === "Property" &&
    node.kind === "init" &&
    node.method === false;
}

export default function (instance) {
  instance.extend("checkDeclaration", function(inner) {
    return function (node) {
      if (isSimpleProperty(node)) {
        this.checkDeclaration(node.value);
      } else {
        inner.call(this, node);
      }
    };
  });

  instance.extend("checkGetterSetterParamCount", function() {
    return function (prop) {
      const paramCount = prop.kind === "get" ? 0 : 1;
      if (prop.value.params.length !== paramCount) {
        const start = prop.start;
        if (prop.kind === "get") {
          this.raise(start, "getter should have no params");
        } else {
          this.raise(start, "setter should have exactly one param");
        }
      }
    };
  });

  instance.extend("checkLVal", function(inner) {
    return function (expr, isBinding, checkClashes, ...args) {
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
          inner.call(this, expr, isBinding, checkClashes, ...args);
      }
    };
  });

  instance.extend("checkPropClash", function () {
    return function (prop, propHash) {
      if (prop.computed || !isSimpleProperty(prop)) return;

      const key = prop.key;
      // It is either an Identifier or a String/NumericLiteral
      const name = key.type === "Identifier" ? key.name : String(key.value);

      if (name === "__proto__") {
        if (propHash.proto) this.raise(key.start, "Redefinition of __proto__ property");
        propHash.proto = true;
      }
    };
  });

  instance.extend("isStrictBody", function () {
    return function (node, isExpression) {
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
    };
  });

  instance.extend("isValidDirective", function () {
    return function (stmt) {
      return stmt.type === "ExpressionStatement" &&
        stmt.expression.type === "Literal" &&
        typeof stmt.expression.value === "string" &&
        (!stmt.expression.extra || !stmt.expression.extra.parenthesized);
    };
  });

  instance.extend("parseBlockBody", function (inner) {
    return function (node, ...args) {
      inner.call(this, node, ...args);

      node.directives.reverse().forEach((directive) => {
        node.body.unshift(this.directiveToStmt(directive));
      });
      delete node.directives;
    };
  });

  instance.extend("parseClassMethod", function (inner) {
    return function (classBody, ...args) {
      inner.call(this, classBody, ...args);

      const body = classBody.body;
      body[body.length - 1].type = "MethodDefinition";
    };
  });

  instance.extend("parseExprAtom", function(inner) {
    return function (...args) {
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
          return inner.call(this, ...args);
      }
    };
  });

  instance.extend("parseMethod", function(inner) {
    return function (node, ...args) {
      let funcNode = this.startNode();
      funcNode.kind = node.kind; // provide kind, so inner method correctly sets state
      funcNode = inner.call(this, funcNode, ...args);
      delete funcNode.kind;
      node.value = this.finishNode(funcNode, "FunctionExpression");

      return node;
    };
  });

  instance.extend("parseObjectMethod", function(inner) {
    return function (...args) {
      const node = inner.call(this, ...args);

      if (node) {
        if (node.kind === "method") node.kind = "init";
        node.type = "Property";
      }

      return node;
    };
  });

  instance.extend("parseObjectProperty", function(inner) {
    return function (...args) {
      const node = inner.call(this, ...args);

      if (node) {
        node.kind = "init";
        node.type = "Property";
      }

      return node;
    };
  });

  instance.extend("toAssignable", function(inner) {
    return function (node, isBinding, ...args) {
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

      return inner.call(this, node, isBinding, ...args);
    };
  });
}
