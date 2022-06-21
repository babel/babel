import assert from "assert";
import {
  callExpression,
  cloneNode,
  expressionStatement,
  identifier,
  importDeclaration,
  importDefaultSpecifier,
  importNamespaceSpecifier,
  importSpecifier,
  memberExpression,
  stringLiteral,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type * as t from "@babel/types";
import type { Scope } from "@babel/traverse";
import type { File } from "@babel/core";

/**
 * A class to track and accumulate mutations to the AST that will eventually
 * output a new require/import statement list.
 */
export default class ImportBuilder {
  private _statements: t.Statement[] = [];
  private _resultName: t.Identifier | t.MemberExpression = null;

  declare _scope: Scope;
  declare _hub: File["hub"];
  private _importedSource: string;

  constructor(importedSource: string, scope: Scope, hub: File["hub"]) {
    this._scope = scope;
    this._hub = hub;
    this._importedSource = importedSource;
  }

  done() {
    return {
      statements: this._statements,
      resultName: this._resultName,
    };
  }

  import() {
    this._statements.push(
      importDeclaration([], stringLiteral(this._importedSource)),
    );
    return this;
  }

  require() {
    this._statements.push(
      expressionStatement(
        callExpression(identifier("require"), [
          stringLiteral(this._importedSource),
        ]),
      ),
    );
    return this;
  }

  namespace(name = "namespace") {
    const local = this._scope.generateUidIdentifier(name);

    const statement = this._statements[this._statements.length - 1];
    assert(statement.type === "ImportDeclaration");
    assert(statement.specifiers.length === 0);
    statement.specifiers = [importNamespaceSpecifier(local)];
    this._resultName = cloneNode(local);
    return this;
  }
  default(name: string) {
    const id = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    assert(statement.type === "ImportDeclaration");
    assert(statement.specifiers.length === 0);
    statement.specifiers = [importDefaultSpecifier(id)];
    this._resultName = cloneNode(id);
    return this;
  }
  named(name: string, importName: string) {
    if (importName === "default") return this.default(name);

    const id = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    assert(statement.type === "ImportDeclaration");
    assert(statement.specifiers.length === 0);
    statement.specifiers = [importSpecifier(id, identifier(importName))];
    this._resultName = cloneNode(id);
    return this;
  }

  var(name: string) {
    const id = this._scope.generateUidIdentifier(name);
    let statement = this._statements[this._statements.length - 1];
    if (statement.type !== "ExpressionStatement") {
      assert(this._resultName);
      statement = expressionStatement(this._resultName);
      this._statements.push(statement);
    }
    this._statements[this._statements.length - 1] = variableDeclaration("var", [
      variableDeclarator(id, statement.expression),
    ]);
    this._resultName = cloneNode(id);
    return this;
  }

  defaultInterop() {
    return this._interop(this._hub.addHelper("interopRequireDefault"));
  }
  wildcardInterop() {
    return this._interop(this._hub.addHelper("interopRequireWildcard"));
  }

  _interop(callee: t.Expression) {
    const statement = this._statements[this._statements.length - 1];
    if (statement.type === "ExpressionStatement") {
      statement.expression = callExpression(callee, [statement.expression]);
    } else if (statement.type === "VariableDeclaration") {
      assert(statement.declarations.length === 1);
      statement.declarations[0].init = callExpression(callee, [
        statement.declarations[0].init,
      ]);
    } else {
      assert.fail("Unexpected type.");
    }
    return this;
  }

  prop(name: string) {
    const statement = this._statements[this._statements.length - 1];
    if (statement.type === "ExpressionStatement") {
      statement.expression = memberExpression(
        statement.expression,
        identifier(name),
      );
    } else if (statement.type === "VariableDeclaration") {
      assert(statement.declarations.length === 1);
      statement.declarations[0].init = memberExpression(
        statement.declarations[0].init,
        identifier(name),
      );
    } else {
      assert.fail("Unexpected type:" + statement.type);
    }
    return this;
  }

  read(name: string) {
    this._resultName = memberExpression(this._resultName, identifier(name));
  }
}
