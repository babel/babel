import * as metadataVisitor from "./lib/metadata";
import * as messages from "babel-messages";
import Remaps from "./lib/remaps";
import * as util from  "../../util";
import * as t from "babel-types";

export default class DefaultFormatter {
  constructor(file) {
    // object containg all module sources with the scope that they're contained in
    this.sourceScopes = Object.create(null);

    // ids for use in module ids
    this.defaultIds = Object.create(null);
    this.ids        = Object.create(null);

    // contains reference aliases for live bindings
    this.remaps = new Remaps(file, this);

    this.scope = file.scope;
    this.file  = file;

    this.hasNonDefaultExports = false;

    this.hasLocalExports = false;
    this.hasLocalImports = false;

    this.localExports = Object.create(null);
    this.localImports = Object.create(null);

    this.metadata = file.metadata.modules;
    this.getMetadata();
  }

  addScope(path) {
    let source = path.node.source && path.node.source.value;
    if (!source) return;

    let existingScope = this.sourceScopes[source];
    if (existingScope && existingScope !== path.scope) {
      throw path.buildCodeFrameError(messages.get("modulesDuplicateDeclarations"));
    }

    this.sourceScopes[source] = path.scope;
  }

  isModuleType(node, type) {
    let modules = this.file.dynamicImportTypes[type];
    return modules && modules.indexOf(node) >= 0;
  }

  transform() {
    this.remapAssignments();
  }

  doDefaultExportInterop(node) {
    return (t.isExportDefaultDeclaration(node) || t.isSpecifierDefault(node)) && !this.noInteropRequireExport && !this.hasNonDefaultExports;
  }

  getMetadata() {
    let has = false;
    for (let node of (this.file.ast.program.body: Array)) {
      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }
    if (has || this.isLoose()) {
      this.file.path.traverse(metadataVisitor, this);
    }
  }

  remapAssignments() {
    if (this.hasLocalExports || this.hasLocalImports) {
      this.remaps.run();
    }
  }

  remapExportAssignment(node, exported) {
    let assign = node;

    for (let i = 0; i < exported.length; i++) {
      assign = t.assignmentExpression(
        "=",
        t.memberExpression(t.identifier("exports"), exported[i]),
        assign
      );
    }

    return assign;
  }

  _addExport(name, exported) {
    let info = this.localExports[name] = this.localExports[name] || {
      binding: this.scope.getBindingIdentifier(name),
      exported: []
    };
    info.exported.push(exported);
  }

  getExport(node, scope) {
    if (!t.isIdentifier(node)) return;

    let local = this.localExports[node.name];
    if (local && local.binding === scope.getBindingIdentifier(node.name)) {
      return local.exported;
    }
  }

  getModuleName() {
    let opts = this.file.opts;
    // moduleId is n/a if a `getModuleId()` is provided
    if (opts.moduleId != null && !opts.getModuleId) {
      return opts.moduleId;
    }

    let filenameRelative = opts.filenameRelative;
    let moduleName = "";

    if (opts.moduleRoot != null) {
      moduleName = opts.moduleRoot + "/";
    }

    if (!opts.filenameRelative) {
      return moduleName + opts.filename.replace(/^\//, "");
    }

    if (opts.sourceRoot != null) {
      // remove sourceRoot from filename
      let sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
      filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
    }

    if (!opts.keepModuleIdExtensions) {
      // remove extension
      filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");
    }

    moduleName += filenameRelative;

    // normalize path separators
    moduleName = moduleName.replace(/\\/g, "/");

    if (opts.getModuleId) {
      // If return is falsy, assume they want us to use our generated default name
      return opts.getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  }

  _pushStatement(ref, nodes) {
    if (t.isClass(ref) || t.isFunction(ref)) {
      if (ref.id) {
        nodes.push(t.toStatement(ref));
        ref = ref.id;
      }
    }

    return ref;
  }

  _hoistExport(declar, assign, priority) {
    if (t.isFunctionDeclaration(declar)) {
      assign._blockHoist = priority || 2;
    }

    return assign;
  }

  getExternalReference(node, nodes) {
    let ids = this.ids;
    let id = node.source.value;

    if (ids[id]) {
      return ids[id];
    } else {
      return this.ids[id] = this._getExternalReference(node, nodes);
    }
  }

  checkExportIdentifier(node) {
    if (t.isIdentifier(node, { name: "__esModule" })) {
      throw this.file.buildCodeFrameError(node, messages.get("modulesIllegalExportName", node.name));
    }
  }

  exportAllDeclaration(node, nodes) {
    let ref = this.getExternalReference(node, nodes);
    nodes.push(this.buildExportsWildcard(ref, node));
  }

  isLoose() {
    return this.file.isLoose("es6.modules");
  }

  exportSpecifier(specifier, node, nodes) {
    if (node.source) {
      let ref = this.getExternalReference(node, nodes);

      if (specifier.local.name === "default" && !this.noInteropRequireExport) {
        // importing a default so we need to normalize it
        ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
      } else {
        ref = t.memberExpression(ref, specifier.local);

        if (!this.isLoose()) {
          nodes.push(this.buildExportsFromAssignment(specifier.exported, ref, node));
          return;
        }
      }

      // export { foo } from "test";
      nodes.push(this.buildExportsAssignment(specifier.exported, ref, node));
    } else {
      // export { foo };
      nodes.push(this.buildExportsAssignment(specifier.exported, specifier.local, node));
    }
  }

  buildExportsWildcard(objectIdentifier) {
    return t.expressionStatement(t.callExpression(this.file.addHelper("defaults"), [
      t.identifier("exports"),
      t.callExpression(this.file.addHelper("interop-export-wildcard"), [
        objectIdentifier,
        this.file.addHelper("defaults")
      ])
    ]));
  }

  buildExportsFromAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-from-assign", {
      INIT: init,
      ID:   t.stringLiteral(id.name)
    }, true);
  }

  buildExportsAssignment(id, init) {
    this.checkExportIdentifier(id);
    return util.template("exports-assign", {
      VALUE: init,
      KEY:   id
    }, true);
  }

  exportDeclaration(node, nodes) {
    let declar = node.declaration;

    let id = declar.id;

    if (t.isExportDefaultDeclaration(node)) {
      id = t.identifier("default");
    }

    let assign;

    if (t.isVariableDeclaration(declar)) {
      for (let i = 0; i < declar.declarations.length; i++) {
        let decl = declar.declarations[i];

        decl.init = this.buildExportsAssignment(decl.id, decl.init, node).expression;

        let newDeclar = t.variableDeclaration(declar.kind, [decl]);
        if (i === 0) t.inherits(newDeclar, declar);
        nodes.push(newDeclar);
      }
    } else {
      let ref = declar;

      if (t.isFunctionDeclaration(declar) || t.isClassDeclaration(declar)) {
        ref = declar.id;
        nodes.push(declar);
      }

      assign = this.buildExportsAssignment(id, ref, node);

      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  }
}
