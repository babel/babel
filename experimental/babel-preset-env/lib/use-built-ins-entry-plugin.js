"use strict";

exports.__esModule = true;
exports.default = _default;

var _debug = require("./debug");

var _utils = require("./utils");

function _default(_ref) {
  var t = _ref.types;

  function createImports(polyfills, requireType, regenerator) {
    var items = Array.isArray(polyfills) ? new Set(polyfills) : polyfills;
    var imports = [];
    items.forEach(function (p) {
      return imports.push((0, _utils.createImport)(t, p, requireType));
    });

    if (regenerator) {
      imports.push((0, _utils.createImport)(t, "regenerator-runtime", requireType));
    }

    return imports;
  }

  var isPolyfillImport = {
    ImportDeclaration: function ImportDeclaration(path, state) {
      if (path.node.specifiers.length === 0 && (0, _utils.isPolyfillSource)(path.node.source.value)) {
        this.importPolyfillIncluded = true;
        path.replaceWithMultiple(createImports(state.opts.polyfills, "import", state.opts.regenerator));
      }
    },
    Program: function Program(path, state) {
      path.get("body").forEach(function (bodyPath) {
        if ((0, _utils.isRequire)(t, bodyPath)) {
          bodyPath.replaceWithMultiple(createImports(state.opts.polyfills, "require", state.opts.regenerator));
        }
      });
    }
  };
  return {
    name: "transform-polyfill-require",
    visitor: isPolyfillImport,
    pre: function pre() {
      this.numPolyfillImports = 0;
      this.importPolyfillIncluded = false;
    },
    post: function post() {
      var _opts = this.opts,
          debug = _opts.debug,
          onDebug = _opts.onDebug,
          polyfills = _opts.polyfills;

      if (debug) {
        (0, _debug.logEntryPolyfills)(this.importPolyfillIncluded, polyfills, this.file.opts.filename, onDebug);
      }
    }
  };
}