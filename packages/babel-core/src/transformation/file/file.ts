import * as helpers from "@babel/helpers";
import { NodePath } from "@babel/traverse";
import type { HubInterface, Visitor, Scope } from "@babel/traverse";
import { codeFrameColumns } from "@babel/code-frame";
import traverse from "@babel/traverse";
import { cloneNode, interpreterDirective } from "@babel/types";
import type * as t from "@babel/types";
import semver from "semver";

import type { NormalizedFile } from "../normalize-file.ts";

// @ts-expect-error This file is `any`
import babel7 from "./babel-7-helpers.cjs" with { if: "!process.env.BABEL_8_BREAKING && (!USE_ESM || IS_STANDALONE)" };

const errorVisitor: Visitor<{ loc: t.SourceLocation | null }> = {
  enter(path, state) {
    const loc = path.node.loc;
    if (loc) {
      state.loc = loc;
      path.stop();
    }
  },
};

export default class File {
  _map: Map<unknown, unknown> = new Map();
  opts: { [key: string]: any };
  declarations: { [key: string]: t.Identifier } = {};
  path: NodePath<t.Program>;
  ast: t.File;
  scope: Scope;
  metadata: { [key: string]: any } = {};
  code: string = "";
  inputMap: any;

  hub: HubInterface & { file: File } = {
    // keep it for the usage in babel-core, ex: path.hub.file.opts.filename
    file: this,
    getCode: () => this.code,
    getScope: () => this.scope,
    addHelper: this.addHelper.bind(this),
    buildError: this.buildCodeFrameError.bind(this),
  };

  constructor(options: any, { code, ast, inputMap }: NormalizedFile) {
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
    }).setContext() as NodePath<t.Program>;
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
  set shebang(value: string) {
    if (value) {
      this.path.get("interpreter").replaceWith(interpreterDirective(value));
    } else {
      this.path.get("interpreter").remove();
    }
  }

  set(key: unknown, val: unknown) {
    if (!process.env.BABEL_8_BREAKING) {
      if (key === "helpersNamespace") {
        throw new Error(
          "Babel 7.0.0-beta.56 has dropped support for the 'helpersNamespace' utility." +
            "If you are using @babel/plugin-external-helpers you will need to use a newer " +
            "version than the one you currently have installed. " +
            "If you have your own implementation, you'll want to explore using 'helperGenerator' " +
            "alongside 'file.availableHelper()'.",
        );
      }
    }

    this._map.set(key, val);
  }

  get(key: unknown): any {
    return this._map.get(key);
  }

  has(key: unknown): boolean {
    return this._map.has(key);
  }

  /**
   * Check if a given helper is available in @babel/core's helper list.
   *
   * This _also_ allows you to pass a Babel version specifically. If the
   * helper exists, but was not available for the full given range, it will be
   * considered unavailable.
   */
  availableHelper(name: string, versionRange?: string | null): boolean {
    let minVersion;
    try {
      minVersion = helpers.minVersion(name);
    } catch (err) {
      if (err.code !== "BABEL_HELPER_UNKNOWN") throw err;

      return false;
    }

    if (typeof versionRange !== "string") return true;

    // semver.intersects() has some surprising behavior with comparing ranges
    // with pre-release versions. We add '^' to ensure that we are always
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
    //
    // Note: If this is found to have issues, please also revisit the logic in
    // transform-runtime's definitions.js file.
    if (semver.valid(versionRange)) versionRange = `^${versionRange}`;

    if (process.env.BABEL_8_BREAKING) {
      return (
        !semver.intersects(`<${minVersion}`, versionRange) &&
        !semver.intersects(`>=9.0.0`, versionRange)
      );
    } else {
      return (
        !semver.intersects(`<${minVersion}`, versionRange) &&
        !semver.intersects(`>=8.0.0`, versionRange)
      );
    }
  }

  addHelper(name: string): t.Identifier {
    const declar = this.declarations[name];
    if (declar) return cloneNode(declar);

    const generator = this.get("helperGenerator");
    if (generator) {
      const res = generator(name);
      if (res) return res;
    }

    // make sure that the helper exists
    helpers.minVersion(name);

    const uid = (this.declarations[name] =
      this.scope.generateUidIdentifier(name));

    const dependencies: { [key: string]: t.Identifier } = {};
    for (const dep of helpers.getDependencies(name)) {
      dependencies[dep] = this.addHelper(dep);
    }

    const { nodes, globals } = helpers.get(
      name,
      dep => dependencies[dep],
      uid.name,
      Object.keys(this.scope.getAllBindings()),
    );

    globals.forEach(name => {
      if (this.path.scope.hasBinding(name, true /* noGlobals */)) {
        this.path.scope.rename(name);
      }
    });

    nodes.forEach(node => {
      // @ts-expect-error Fixme: document _compact node property
      node._compact = true;
    });

    const added = this.path.unshiftContainer("body", nodes);
    // TODO: NodePath#unshiftContainer should automatically register new
    // bindings.
    for (const path of added) {
      if (path.isVariableDeclaration()) this.scope.registerDeclaration(path);
    }

    return uid;
  }

  buildCodeFrameError(
    node: t.Node | undefined | null,
    msg: string,
    _Error: typeof Error = SyntaxError,
  ): Error {
    let loc = node?.loc;

    if (!loc && node) {
      const state: { loc?: t.SourceLocation | null } = {
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
            end:
              loc.end && loc.start.line === loc.end.line
                ? {
                    line: loc.end.line,
                    column: loc.end.column + 1,
                  }
                : undefined,
          },
          { highlightCode },
        );
    }

    return new _Error(msg);
  }
}

if (!process.env.BABEL_8_BREAKING) {
  // @ts-expect-error Babel 7
  File.prototype.addImport = function addImport() {
    throw new Error(
      "This API has been removed. If you're looking for this " +
        "functionality in Babel 7, you should import the " +
        "'@babel/helper-module-imports' module and use the functions exposed " +
        " from that module, such as 'addNamed' or 'addDefault'.",
    );
  };
  // @ts-expect-error Babel 7
  File.prototype.addTemplateObject = function addTemplateObject() {
    throw new Error(
      "This function has been moved into the template literal transform itself.",
    );
  };

  if (!USE_ESM || IS_STANDALONE) {
    // @ts-expect-error Babel 7
    File.prototype.getModuleName = function getModuleName() {
      return babel7.getModuleName()(this.opts, this.opts);
    };
  }
}
