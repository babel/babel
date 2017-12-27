import assert from "assert";
import * as t from "@babel/types";

/**
 * A class to track and accumulate mutations to the AST that will eventually
 * output a new require/import statement list.
 */
export default class ImportBuilder {
  _statements = [];
  _resultName = null;

  _scope = null;
  _file = null;

  constructor(importedSource, scope, file) {
    this._scope = scope;
    this._file = file;
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
      t.importDeclaration([], t.stringLiteral(this._importedSource)),
    );
    return this;
  }

  require() {
    this._statements.push(
      t.expressionStatement(
        t.callExpression(t.identifier("require"), [
          t.stringLiteral(this._importedSource),
        ]),
      ),
    );
    return this;
  }

  namespace(name = "namespace") {
    name = this._scope.generateUidIdentifier(name);

    const statement = this._statements[this._statements.length - 1];
    assert(statement.type === "ImportDeclaration");
    assert(statement.specifiers.length === 0);
    statement.specifiers = [t.importNamespaceSpecifier(name)];
    this._resultName = t.clone(name);
    return this;
  }
  default(name) {
    name = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    assert(statement.type === "ImportDeclaration");
    assert(statement.specifiers.length === 0);
    statement.specifiers = [t.importDefaultSpecifier(name)];
    this._resultName = t.clone(name);
    return this;
  }
  named(name, importName) {
    if (importName === "default") return this.default(name);

    name = this._scope.generateUidIdentifier(name);
    const statement = this._statements[this._statements.length - 1];
    assert(statement.type === "ImportDeclaration");
    assert(statement.specifiers.length === 0);
    statement.specifiers = [t.importSpecifier(name, t.identifier(importName))];
    this._resultName = t.clone(name);
    return this;
  }

  var(name) {
    name = this._scope.generateUidIdentifier(name);
    let statement = this._statements[this._statements.length - 1];
    if (statement.type !== "ExpressionStatement") {
      assert(this._resultName);
      statement = t.expressionStatement(this._resultName);
      this._statements.push(statement);
    }
    this._statements[this._statements.length - 1] = t.variableDeclaration(
      "var",
      [t.variableDeclarator(name, statement.expression)],
    );
    this._resultName = t.clone(name);
    return this;
  }

  defaultInterop() {
    return this._interop(this._file.addHelper("interopRequireDefault"));
  }
  wildcardInterop() {
    return this._interop(this._file.addHelper("interopRequireWildcard"));
  }

  _interop(callee) {
    const statement = this._statements[this._statements.length - 1];
    if (statement.type === "ExpressionStatement") {
      statement.expression = t.callExpression(callee, [statement.expression]);
    } else if (statement.type === "VariableDeclaration") {
      assert(statement.declarations.length === 1);
      statement.declarations[0].init = t.callExpression(callee, [
        statement.declarations[0].init,
      ]);
    } else {
      assert.fail("Unexpected type.");
    }
    return this;
  }

  prop(name) {
    const statement = this._statements[this._statements.length - 1];
    if (statement.type === "ExpressionStatement") {
      statement.expression = t.memberExpression(
        statement.expression,
        t.identifier(name),
      );
    } else if (statement.type === "VariableDeclaration") {
      assert(statement.declarations.length === 1);
      statement.declarations[0].init = t.memberExpression(
        statement.declarations[0].init,
        t.identifier(name),
      );
    } else {
      assert.fail("Unexpected type:" + statement.type);
    }
    return this;
  }

  read(name) {
    this._resultName = t.memberExpression(this._resultName, t.identifier(name));
  }
}
