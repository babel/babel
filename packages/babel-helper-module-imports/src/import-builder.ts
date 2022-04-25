import assert from "assert";
import {
  callExpression,
  cloneNode,
  expressionStatement,
  identifier,
  isImportDeclaration,
  isImportSpecifier,
  isImportDefaultSpecifier,
  isImportNamespaceSpecifier,
  importDeclaration,
  importDefaultSpecifier,
  importNamespaceSpecifier,
  importSpecifier,
  memberExpression,
  stringLiteral,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";

/**
 * A class to track and accumulate mutations to the AST that will eventually
 * output a new require/import statement list.
 */
export default class ImportBuilder {
  _body = null;
  _statements = [];
  _statement = null;
  _resultName = null;
  _plainUids = false;

  _scope = null;
  _hub = null;
  private _importedSource: any;

  constructor(importedSource, { scope, hub, body, plainUids }) {
    this._importedSource = importedSource;
    this._scope = scope;
    this._hub = hub;
    this._body = body;
    this._plainUids = plainUids;
  }

  done() {
    return {
      statements: this._statements,
      resultName: this._resultName,
    };
  }

  generateIdentifier(name, generated) {
    return this._scope.generateUidIdentifier(
      name,
      !generated && this._plainUids
        ? i => (i > 1 ? `${name}_${i}` : name)
        : undefined,
    );
  }

  import() {
    const source = this._importedSource;
    const existingStatement = this._body.find(
      decl => isImportDeclaration(decl) && decl.source?.value === source,
    );

    if (existingStatement) {
      this._statement = existingStatement;
    } else {
      this._statement = importDeclaration([], stringLiteral(source));
      this._statements.push(this._statement);
    }
    return this;
  }

  require() {
    this._statement = expressionStatement(
      callExpression(identifier("require"), [
        stringLiteral(this._importedSource),
      ]),
    );
    this._statements.push(this._statement);
    return this;
  }

  namespace(name = "namespace", generated = true) {
    const statement = this._statement;
    const { type, specifiers } = statement;

    assert(type === "ImportDeclaration");

    const existingSpecifier = specifiers.find(isImportNamespaceSpecifier);
    const local = existingSpecifier
      ? existingSpecifier.local
      : this.generateIdentifier(name, generated);

    if (specifiers.length > Number(!!existingSpecifier)) {
      // There's no such syntax as `import * as ns, { name } from ''`
      // If there were any specifiers other than a namespace, derive them from the namespace
      for (const specifier of specifiers) {
        if (specifier !== existingSpecifier) {
          this._resultName = cloneNode(local);
          this.var(specifier.local.name);
        }
      }
    }

    specifiers.length = 0;
    specifiers.push(existingSpecifier || importNamespaceSpecifier(local));

    this._resultName = cloneNode(local);

    return this;
  }

  default(name, generated = true) {
    const statement = this._statement;
    const { type, specifiers } = statement;

    assert(type === "ImportDeclaration");

    const nsSpecifier = specifiers.find(isImportNamespaceSpecifier);
    if (nsSpecifier) {
      this._resultName = cloneNode(nsSpecifier.local);
      this.var(name);
      this.prop("default");
    } else {
      let local;
      const existingSpecifier = specifiers.find(isImportDefaultSpecifier);
      if (existingSpecifier) {
        ({ local } = existingSpecifier);
      } else {
        local = this.generateIdentifier(name, generated);
        specifiers.unshift(importDefaultSpecifier(local));
      }

      this._resultName = cloneNode(local);
    }
    return this;
  }

  named(name, importedName) {
    if (importedName === "default") return this.default(name);

    const statement = this._statement;
    const { type, specifiers } = statement;

    assert(type === "ImportDeclaration");

    const nsSpecifier = specifiers.find(isImportNamespaceSpecifier);
    if (nsSpecifier) {
      this._resultName = cloneNode(nsSpecifier.local);
      this.var(name);
      this.prop(importedName);
    } else {
      let local;
      const existingSpecifier = specifiers.find(
        spec => isImportSpecifier(spec) && spec.local.name === name,
      );
      if (existingSpecifier) {
        ({ local } = existingSpecifier);
      } else {
        local = this.generateIdentifier(name, false);
        specifiers.push(importSpecifier(local, identifier(importedName)));
      }

      this._resultName = cloneNode(local);
    }
    return this;
  }

  var(name) {
    name = this.generateIdentifier(name, true);
    let statement = this._statement;
    if (statement.type !== "ExpressionStatement") {
      assert(this._resultName);
      statement = expressionStatement(this._resultName);
      this._statements.push(statement);
    }
    this._statement = variableDeclaration("var", [
      variableDeclarator(name, statement.expression),
    ]);
    this._statements[this._statements.length - 1] = this._statement;
    this._resultName = cloneNode(name);
    return this;
  }

  defaultInterop() {
    return this._interop(this._hub.addHelper("interopRequireDefault"));
  }

  wildcardInterop() {
    return this._interop(this._hub.addHelper("interopRequireWildcard"));
  }

  _interop(callee) {
    const statement = this._statement;
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

  prop(name) {
    const statement = this._statement;
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

  read(name) {
    this._resultName = memberExpression(this._resultName, identifier(name));
  }
}
