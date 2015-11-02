/* @flow */
/* global BabelParserOptions */
/* global BabelFileMetadata */
/* global BabelFileResult */

import getHelper from "babel-helpers";
import * as metadataVisitor from "./metadata";
import convertSourceMap from "convert-source-map";
import OptionManager from "./options/option-manager";
import type Pipeline from "../pipeline";
import type Plugin from "../plugin";
import PluginPass from "../plugin-pass";
import shebangRegex from "shebang-regex";
import { NodePath, Hub, Scope } from "babel-traverse";
import sourceMap from "source-map";
import generate from "babel-generator";
import codeFrame from "babel-code-frame";
import defaults from "lodash/object/defaults";
import traverse from "babel-traverse";
import Logger from "./logger";
import Store from "../../store";
import { parse } from "babylon";
import * as util from  "../../util";
import path from "path";
import * as t from "babel-types";

import blockHoistPlugin from "../internal-plugins/block-hoist";
import shadowFunctionsPlugin from "../internal-plugins/shadow-functions";

const INTERNAL_PLUGINS = [
  [blockHoistPlugin],
  [shadowFunctionsPlugin]
];

let errorVisitor = {
  enter(path, state) {
    let loc = path.node.loc;
    if (loc) {
      state.loc = loc;
      path.stop();
    }
  }
};

export default class File extends Store {
  constructor(opts: Object = {}, pipeline: Pipeline) {
    super();

    this.pipeline = pipeline;

    this.log  = new Logger(this, opts.filename || "unknown");
    this.opts = this.initOptions(opts);

    this.parserOpts = {
      highlightCode: this.opts.highlightCode,
      nonStandard:   this.opts.nonStandard,
      sourceType:    this.opts.sourceType,
      filename:      this.opts.filename,
      plugins:       []
    };

    this.pluginVisitors = [];
    this.pluginPasses = [];
    this.pluginStack = [];
    this.buildPlugins();

    this.metadata = {
      usedHelpers: [],
      marked: [],
      modules: {
        imports: [],
        exports: {
          exported: [],
          specifiers: []
        }
      }
    };

    this.dynamicImportTypes = {};
    this.dynamicImportIds   = {};
    this.dynamicImports     = [];
    this.declarations       = {};
    this.usedHelpers        = {};

    this.path = null;
    this.ast  = {};

    this.code    = "";
    this.shebang = "";

    this.hub = new Hub(this);
  }

  static helpers: Array<string>;

  pluginVisitors: Array<Object>;
  pluginPasses: Array<PluginPass>;
  pluginStack: Array<Plugin>;
  pipeline: Pipeline;
  parserOpts: BabelParserOptions;
  log: Logger;
  opts: Object;
  dynamicImportTypes: Object;
  dynamicImportIds: Object;
  dynamicImports: Array<Object>;
  declarations: Object;
  usedHelpers: Object;
  path: NodePath;
  ast: Object;
  scope: Scope;
  metadata: BabelFileMetadata;
  hub: Hub;
  code: string;
  shebang: string;

  getMetadata() {
    let has = false;
    for (let node of (this.ast.program.body: Array<Object>)) {
      if (t.isModuleDeclaration(node)) {
        has = true;
        break;
      }
    }
    if (has) {
      this.path.traverse(metadataVisitor, this);
    }
  }

  initOptions(opts) {
    opts = new OptionManager(this.log, this.pipeline).init(opts);

    if (opts.inputSourceMap) {
      opts.sourceMaps = true;
    }

    if (opts.moduleId) {
      opts.moduleIds = true;
    }

    opts.basename = path.basename(opts.filename, path.extname(opts.filename));

    opts.ignore = util.arrayify(opts.ignore, util.regexify);

    if (opts.only) opts.only = util.arrayify(opts.only, util.regexify);

    defaults(opts, {
      moduleRoot: opts.sourceRoot
    });

    defaults(opts, {
      sourceRoot: opts.moduleRoot
    });

    defaults(opts, {
      filenameRelative: opts.filename
    });

    let basenameRelative = path.basename(opts.filenameRelative);

    defaults(opts, {
      sourceFileName:   basenameRelative,
      sourceMapTarget:  basenameRelative
    });

    return opts;
  }

  buildPlugins() {
    let plugins: Array<[PluginPass, Object]> = this.opts.plugins.concat(INTERNAL_PLUGINS);

    // init plugins!
    for (let ref of plugins) {
      let [plugin, pluginOpts] = ref; // todo: fix - can't embed in loop head because of flow bug

      this.pluginStack.push(plugin);
      this.pluginVisitors.push(plugin.visitor);
      this.pluginPasses.push(new PluginPass(this, plugin, pluginOpts));

      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(this.opts, this.parserOpts, this);
      }
    }
  }

  getModuleName(): ?string {
    let opts = this.opts;
    if (!opts.moduleIds) {
      return null;
    }

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

    // remove extension
    filenameRelative = filenameRelative.replace(/\.(\w*?)$/, "");

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

  resolveModuleSource(source: string): string {
    let resolveModuleSource = this.opts.resolveModuleSource;
    if (resolveModuleSource) source = resolveModuleSource(source, this.opts.filename);
    return source;
  }

  addImport(source: string, imported: string, name?: string = imported): Object {
    let alias = `${source}:${imported}`;
    let id = this.dynamicImportIds[alias];

    if (!id) {
      source = this.resolveModuleSource(source);
      id = this.dynamicImportIds[alias] = this.scope.generateUidIdentifier(name);

      let specifiers = [];

      if (imported === "*") {
        specifiers.push(t.importNamespaceSpecifier(id));
      } else if (imported === "default") {
        specifiers.push(t.importDefaultSpecifier(id));
      } else {
        specifiers.push(t.importSpecifier(id, t.identifier(imported)));
      }

      let declar = t.importDeclaration(specifiers, t.stringLiteral(source));
      declar._blockHoist = 3;

      this.path.unshiftContainer("body", declar);
    }

    return id;
  }

  addHelper(name: string): Object {
    let declar = this.declarations[name];
    if (declar) return declar;

    if (!this.usedHelpers[name]) {
      this.metadata.usedHelpers.push(name);
      this.usedHelpers[name] = true;
    }

    let generator = this.get("helperGenerator");
    let runtime   = this.get("helpersNamespace");
    if (generator) {
      let res = generator(name);
      if (res) return res;
    } else if (runtime) {
      let id = t.identifier(t.toIdentifier(name));
      return t.memberExpression(runtime, id);
    }

    let ref = getHelper(name);
    let uid = this.declarations[name] = this.scope.generateUidIdentifier(name);

    if (t.isFunctionExpression(ref) && !ref.id) {
      ref.body._compact = true;
      ref._generated = true;
      ref.id = uid;
      ref.type = "FunctionDeclaration";
      this.path.unshiftContainer("body", ref);
    } else {
      ref._compact = true;
      this.scope.push({
        id: uid,
        init: ref,
        unique: true
      });
    }

    return uid;
  }

  addTemplateObject(
    helperName: string,
    strings: Array<Object>,
    raw: Object,
  ): Object {
    // Generate a unique name based on the string literals so we dedupe
    // identical strings used in the program.
    let stringIds = raw.elements.map(function(string) {
      return string.value;
    });
    let name = `${helperName}_${raw.elements.length}_${stringIds.join(",")}`;

    let declar = this.declarations[name];
    if (declar) return declar;

    let uid = this.declarations[name] = this.scope.generateUidIdentifier("templateObject");

    let helperId = this.addHelper(helperName);
    let init = t.callExpression(helperId, [strings, raw]);
    init._compact = true;
    this.scope.push({
      id: uid,
      init: init,
      _blockHoist: 1.9    // This ensures that we don't fail if not using function expression helpers
    });
    return uid;
  }

  buildCodeFrameError(node: Object, msg: string, Error: typeof Error = SyntaxError): Error {
    let loc = node && (node.loc || node._loc);

    let err = new Error(msg);

    if (loc) {
      err.loc = loc.start;
    } else {
      traverse(node, errorVisitor, this.scope, err);

      err.message += " (This is an error on an internal node. Probably an internal error";

      if (err.loc) {
        err.message += ". Location has been estimated.";
      }

      err.message += ")";
    }

    return err
  }

  mergeSourceMap(map: Object) {
    let inputMap = this.opts.inputSourceMap;

    if (inputMap) {
      let inputMapConsumer   = new sourceMap.SourceMapConsumer(inputMap);
      let outputMapConsumer  = new sourceMap.SourceMapConsumer(map);
      let outputMapGenerator = sourceMap.SourceMapGenerator.fromSourceMap(outputMapConsumer);
      outputMapGenerator.applySourceMap(inputMapConsumer);

      let mergedMap = outputMapGenerator.toJSON();
      mergedMap.sources = inputMap.sources;
      mergedMap.file    = inputMap.file;
      return mergedMap;
    } else {
      return map;
    }
  }

  parse(code: string) {
    this.log.debug("Parse start");
    let ast = parse(code, this.parserOpts);
    this.log.debug("Parse stop");
    return ast;
  }

  _addAst(ast) {
    this.path = NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: ast,
      container: ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
    this.ast   = ast;
    this.getMetadata();
  }

  addAst(ast) {
    this.log.debug("Start set AST");
    this._addAst(ast);
    this.log.debug("End set AST");
  }

  transform(): BabelFileResult {
    this.call("pre");
    this.log.debug(`Start transform traverse`);
    traverse(this.ast, traverse.visitors.merge(this.pluginVisitors, this.pluginPasses), this.scope);
    this.log.debug(`End transform traverse`);
    this.call("post");
    return this.generate();
  }

  wrap(code: string, callback: Function): BabelFileResult {
    code = code + "";

    try {
      if (this.shouldIgnore()) {
        return this.makeResult({ code, ignored: true });
      } else {
        return callback();
      }
    } catch (err) {
      if (err._babel) {
        throw err;
      } else {
        err._babel = true;
      }

      let message = err.message = `${this.opts.filename}: ${err.message}`;

      let loc = err.loc;
      if (loc) {
        err.codeFrame = codeFrame(code, loc.line, loc.column + 1, this.opts);
        message += "\n" + err.codeFrame;
      }

      if (process.browser) {
        // chrome has it's own pretty stringifier which doesn't use the stack property
        // https://github.com/babel/babel/issues/2175
        err.message = message;
      }

      if (err.stack) {
        let newStack = err.stack.replace(err.message, message);
        try {
          err.stack = newStack;
        } catch (e) {
          // `err.stack` may be a readonly property in some environments
        }
      }

      throw err;
    }
  }

  addCode(code: string) {
    code = (code || "") + "";
    code = this.parseInputSourceMap(code);
    this.code = code;
  }

  parseCode() {
    this.parseShebang();
    let ast = this.parse(this.code);
    this.addAst(ast);
  }

  shouldIgnore() {
    let opts = this.opts;
    return util.shouldIgnore(opts.filename, opts.ignore, opts.only);
  }

  call(key: "pre" | "post") {
    for (let pass of (this.pluginPasses: Array<PluginPass>)) {
      let plugin = pass.plugin;
      let fn = plugin[key];
      if (fn) fn.call(pass, this, pass);
    }
  }

  parseInputSourceMap(code: string): string {
    let opts = this.opts;

    if (opts.inputSourceMap !== false) {
      let inputMap = convertSourceMap.fromSource(code);
      if (inputMap) {
        opts.inputSourceMap = inputMap.toObject();
        code = convertSourceMap.removeComments(code);
      }
    }

    return code;
  }

  parseShebang() {
    let shebangMatch = shebangRegex.exec(this.code);
    if (shebangMatch) {
      this.shebang = shebangMatch[0];
      this.code = this.code.replace(shebangRegex, "");
    }
  }

  makeResult({ code, map, ast, ignored }: BabelFileResult): BabelFileResult {
    let result = {
      metadata: null,
      options:  this.opts,
      ignored:  !!ignored,
      code:     null,
      ast:      null,
      map:      map || null
    };

    if (this.opts.code) {
      result.code = code;
    }

    if (this.opts.ast) {
      result.ast = ast;
    }

    if (this.opts.metadata) {
      result.metadata = this.metadata;
    }

    return result;
  }

  generate(): BabelFileResult {
    let opts = this.opts;
    let ast  = this.ast;

    let result: BabelFileResult = { ast };
    if (!opts.code) return this.makeResult(result);

    this.log.debug("Generation start");

    let _result = generate(ast, opts, this.code);
    result.code = _result.code;
    result.map  = _result.map;

    this.log.debug("Generation end");

    if (this.shebang) {
      // add back shebang
      result.code = `${this.shebang}\n${result.code}`;
    }

    if (result.map) {
      result.map = this.mergeSourceMap(result.map);
    }

    if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
      result.code += "\n" + convertSourceMap.fromObject(result.map).toComment();
    }

    if (opts.sourceMaps === "inline") {
      result.map = null;
    }

    return this.makeResult(result);
  }
}

export { File };
