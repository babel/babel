// @flow

import * as helpers from "@babel/helpers";
import { NodePath, Scope, type HubInterface } from "@babel/traverse";
import { codeFrameColumns } from "@babel/code-frame";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import semver from "semver";

import type { NormalizedFile } from "../normalize-file";

const errorVisitor = {
  enter(path, state) {
    const loc = path.node.loc;
    if (loc) {
      state.loc = loc;
      path.stop();
    }
  },
};

export default class File {
  _map: Map<any, any> = new Map();
  opts: Object;
  declarations: Object = {};
  path: NodePath = null;
  ast: Object = {};
  scope: Scope;
  metadata: {} = {};
  code: string = "";
  inputMap: Object | null = null;

  hub: HubInterface = {
    // keep it for the usage in babel-core, ex: path.hub.file.opts.filename
    file: this,
    getCode: () => this.code,
    getScope: () => this.scope,
    addHelper: this.addHelper.bind(this),
    buildError: this.buildCodeFrameError.bind(this),
  };

  constructor(options: {}, { code, ast, inputMap }: NormalizedFile) {
    this.opts = options;
    this.code = code;
    this.ast = ast;
    this.inputMap = inputMap;

    this.path = NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: this.ast,
      container: this.ast,
      key: "program",
    }).setContext();
    this.scope = this.path.scope;
  }

  /**
   * Provide backward-compatible access to the interpreter directive handling
   * in Babel 6.x. If you are writing a plugin for Babel 7.x, it would be
   * best to use 'program.interpreter' directly.
   */
  get shebang(): string {
    const { interpreter } = this.path.node;
    return interpreter ? interpreter.value : "";
  }
  set shebang(value: string): void {
    if (value) {
      this.path.get("interpreter").replaceWith(t.interpreterDirective(value));
    } else {
      this.path.get("interpreter").remove();
    }
  }

  set(key: mixed, val: mixed) {
    if (key === "helpersNamespace") {
      throw new Error(
        "Babel 7.0.0-beta.56 has dropped support for the 'helpersNamespace' utility." +
          "If you are using @babel/plugin-external-helpers you will need to use a newer " +
          "version than the one you currently have installed. " +
          "If you have your own implementation, you'll want to explore using 'helperGenerator' " +
          "alongside 'file.availableHelper()'.",
      );
    }

    this._map.set(key, val);
  }

  get(key: mixed): any {
    return this._map.get(key);
  }

  has(key: mixed): boolean {
    return this._map.has(key);
  }

  getModuleName(): ?string {
    const {
      filename,
      filenameRelative = filename,

      moduleId,
      moduleIds = !!moduleId,

      getModuleId,

      sourceRoot: sourceRootTmp,
      moduleRoot = sourceRootTmp,
      sourceRoot = moduleRoot,
    } = this.opts;

    if (!moduleIds) return null;

    // moduleId is n/a if a `getModuleId()` is provided
    if (moduleId != null && !getModuleId) {
      return moduleId;
    }

    let moduleName = moduleRoot != null ? moduleRoot + "/" : "";

    if (filenameRelative) {
      const sourceRootReplacer =
        sourceRoot != null ? new RegExp("^" + sourceRoot + "/?") : "";

      moduleName += filenameRelative
        // remove sourceRoot from filename
        .replace(sourceRootReplacer, "")
        // remove extension
        .replace(/\.(\w*?)$/, "");
    }

    // normalize path separators
    moduleName = moduleName.replace(/\\/g, "/");

    if (getModuleId) {
      // If return is falsy, assume they want us to use our generated default name
      return getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  }

  addImport() {
    throw new Error(
      "This API has been removed. If you're looking for this " +
        "functionality in Babel 7, you should import the " +
        "'@babel/helper-module-imports' module and use the functions exposed " +
        " from that module, such as 'addNamed' or 'addDefault'.",
    );
  }

  /**
   * Check if a given helper is available in @babel/core's helper list.
   *
   * This _also_ allows you to pass a Babel version specifically. If the
   * helper exists, but was not available for the full given range, it will be
   * considered unavailable.
   */
  availableHelper(name: string, versionRange: ?string) {
    let minVersion;
    try {
      minVersion = helpers.minVersion(name);
    } catch (err) {
      if (err.code !== "BABEL_HELPER_UNKNOWN") throw err;

      return false;
    }

    // semver.intersects() has some surprising behavior with comparing ranges
    // with preprelease versions. We add '^' to ensure that we are always
    // comparing ranges with ranges, which sidesteps this logic.
    // For example:
    //
    //   semver.intersects(`<7.0.1`, "7.0.0-beta.0") // false - surprising
    //   semver.intersects(`<7.0.1`, "^7.0.0-beta.0") // true - expected
    //
    // This is because the first falls back to
    //
    //   semver.satisfies("7.0.0-beta.0", `<7.0.1`) // false - surprising
    //
    // and this fails because a prerelease version can only satisfy a range
    // if it is a prerelease within the same major/minor/patch range.
    if (semver.valid(versionRange)) versionRange = `^${versionRange}`;

    return (
      typeof versionRange !== "string" ||
      (!semver.intersects(`<${minVersion}`, versionRange) &&
        !semver.intersects(`>=8.0.0`, versionRange))
    );
  }

  addHelper(name: string): Object {
    const declar = this.declarations[name];
    if (declar) return t.cloneNode(declar);

    const generator = this.get("helperGenerator");
    if (generator) {
      const res = generator(name);
      if (res) return res;
    }

    const uid = (this.declarations[name] = this.scope.generateUidIdentifier(
      name,
    ));

    const dependencies = {};
    for (const dep of helpers.getDependencies(name)) {
      dependencies[dep] = this.addHelper(dep);
    }

    const { nodes, globals } = helpers.get(
      name,
      dep => dependencies[dep],
      uid,
      Object.keys(this.scope.getAllBindings()),
    );

    globals.forEach(name => {
      if (this.path.scope.hasBinding(name, true /* noGlobals */)) {
        this.path.scope.rename(name);
      }
    });

    nodes.forEach(node => {
      node._compact = true;
    });

    this.path.unshiftContainer("body", nodes);
    // TODO: NodePath#unshiftContainer should automatically register new
    // bindings.
    this.path.get("body").forEach(path => {
      if (nodes.indexOf(path.node) === -1) return;
      if (path.isVariableDeclaration()) this.scope.registerDeclaration(path);
    });

    return uid;
  }

  addTemplateObject() {
    throw new Error(
      "This function has been moved into the template literal transform itself.",
    );
  }

  buildCodeFrameError(
    node: ?{
      loc?: { start: { line: number, column: number } },
      _loc?: { start: { line: number, column: number } },
    },
    msg: string,
    Error: typeof Error = SyntaxError,
  ): Error {
    let loc = node && (node.loc || node._loc);

    msg = `${this.opts.filename}: ${msg}`;

    if (!loc && node) {
      const state = {
        loc: null,
      };
      traverse(node, errorVisitor, this.scope, state);
      loc = state.loc;

      let txt =
        "This is an error on an internal node. Probably an internal error.";
      if (loc) txt += " Location has been estimated.";

      msg += ` (${txt})`;
    }

    if (loc) {
      const { highlightCode = true } = this.opts;

      msg +=
        "\n" +
        codeFrameColumns(
          this.code,
          {
            start: {
              line: loc.start.line,
              column: loc.start.column + 1,
            },
          },
          { highlightCode },
        );
    }

    return new Error(msg);
  }
}
