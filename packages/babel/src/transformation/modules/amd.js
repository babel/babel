import DefaultFormatter from "./_default";
import CommonFormatter from "./common";
import includes from "lodash/collection/includes";
import values from "lodash/object/values";
import * as util from  "../../util";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

export default class AMDFormatter extends DefaultFormatter {

  /**
   * [Please add a description.]
   */

  setup() {
    CommonFormatter.prototype._setup.call(this, this.hasNonDefaultExports);
  }

  /**
   * [Please add a description.]
   */

  buildDependencyLiterals() {
    var names = [];
    for (var name in this.ids) {
      names.push(t.literal(name));
    }
    return names;
  }

  /**
   * Wrap the entire body in a `define` wrapper.
   */

  transform(program) {
    CommonFormatter.prototype.transform.apply(this, arguments);

    var body = program.body;

    // build an array of module names

    var names = [t.literal("exports")];
    if (this.passModuleArg) names.push(t.literal("module"));
    names = names.concat(this.buildDependencyLiterals());
    names = t.arrayExpression(names);

    // build up define container

    var params = values(this.ids);
    if (this.passModuleArg) params.unshift(t.identifier("module"));
    params.unshift(t.identifier("exports"));

    var container = t.functionExpression(null, params, t.blockStatement(body));

    var defineArgs = [names, container];
    var moduleName = this.getModuleName();
    if (moduleName) defineArgs.unshift(t.literal(moduleName));

    var call = t.callExpression(t.identifier("define"), defineArgs);

    program.body = [t.expressionStatement(call)];
  }

  /**
   * Get the AMD module name that we'll prepend to the wrapper
   * to define this module
   */

  getModuleName() {
    if (this.file.opts.moduleIds) {
      return DefaultFormatter.prototype.getModuleName.apply(this, arguments);
    } else {
      return null;
    }
  }

  /**
   * [Please add a description.]
   */

  _getExternalReference(node) {
    return this.scope.generateUidIdentifier(node.source.value);
  }

  /**
   * [Please add a description.]
   */

  importDeclaration(node) {
    this.getExternalReference(node);
  }

  /**
   * [Please add a description.]
   */

  importSpecifier(specifier, node, nodes, scope) {
    var key = node.source.value;
    var ref = this.getExternalReference(node);

    if (t.isImportNamespaceSpecifier(specifier) || t.isImportDefaultSpecifier(specifier)) {
      this.defaultIds[key] = specifier.local;
    }

    if (this.isModuleType(node, "absolute")) {
      // absolute module reference
    } else if (this.isModuleType(node, "absoluteDefault")) {
      // prevent unnecessary renaming of dynamic imports
      this.ids[node.source.value] = ref;
      ref = t.memberExpression(ref, t.identifier("default"));
    } else if (t.isImportNamespaceSpecifier(specifier)) {
      // import * as bar from "foo";
    } else if (!includes(this.file.dynamicImported, node) && t.isSpecifierDefault(specifier) && !this.noInteropRequireImport) {
      // import foo from "foo";
      var uid = scope.generateUidIdentifier(specifier.local.name);
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(uid, t.callExpression(this.file.addHelper("interop-require-default"), [ref]))
      ]));
      ref = t.memberExpression(uid, t.identifier("default"));
    } else {
      // import { foo } from "foo";
      var imported = specifier.imported;
      if (t.isSpecifierDefault(specifier)) imported = t.identifier("default");
      ref = t.memberExpression(ref, imported);
    }

    this.remaps.add(scope, specifier.local.name, ref);
  }

  /**
   * [Please add a description.]
   */

  exportSpecifier(specifier, node, nodes) {
    if (this.doDefaultExportInterop(specifier)) {
      this.passModuleArg = true;

      if (specifier.exported !== specifier.local && !node.source) {
        nodes.push(util.template("exports-default-assign", {
          VALUE: specifier.local
        }, true));
        return;
      }
    }

    CommonFormatter.prototype.exportSpecifier.apply(this, arguments);
  }

  /**
   * [Please add a description.]
   */

  exportDeclaration(node, nodes) {
    if (this.doDefaultExportInterop(node)) {
      this.passModuleArg = true;

      var declar = node.declaration;
      var assign = util.template("exports-default-assign", {
        VALUE: this._pushStatement(declar, nodes)
      }, true);

      if (t.isFunctionDeclaration(declar)) {
        // we can hoist this assignment to the top of the file
        assign._blockHoist = 3;
      }

      nodes.push(assign);
      return;
    }

    DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
  }
}
