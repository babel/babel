"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPresetChain = buildPresetChain;
exports.buildPresetChainWalker = void 0;
exports.buildRootChain = buildRootChain;
var _nodePath = babelHelpers.interopRequireDefault(require("node:path"));
var _debug = babelHelpers.interopRequireDefault(require("debug"));
var _options = require("./validation/options.ts");
var _patternToRegex = babelHelpers.interopRequireDefault(require("./pattern-to-regex.ts"));
var _printer = require("./printer.ts");
var _rewriteStackTrace = require("../errors/rewrite-stack-trace.ts");
var _configError = babelHelpers.interopRequireDefault(require("../errors/config-error.ts"));
var _index = require("./files/index.ts");
var _caching = require("./caching.ts");
var _configDescriptors = require("./config-descriptors.ts");
var _marked = /*#__PURE__*/babelHelpers.regenerator().m(buildPresetChain),
  _marked2 = /*#__PURE__*/babelHelpers.regenerator().m(buildRootChain),
  _marked3 = /*#__PURE__*/babelHelpers.regenerator().m(loadFileChain),
  _marked4 = /*#__PURE__*/babelHelpers.regenerator().m(mergeExtendsChain);
var debug = (0, _debug.default)("babel:config:config-chain");
/**
 * Build a config chain for a given preset.
 */
function buildPresetChain(arg, context) {
  var chain;
  return babelHelpers.regenerator().w(function (_context) {
    while (1) switch (_context.next) {
      case 0:
        return _context.delegateYield(buildPresetChainWalker(arg, context), 1);
      case 1:
        chain = _context.sent;
        if (chain) {
          _context.next = 2;
          break;
        }
        return _context.abrupt(2, null);
      case 2:
        return _context.abrupt(2, {
          plugins: dedupDescriptors(chain.plugins),
          presets: dedupDescriptors(chain.presets),
          options: chain.options.map(function (o) {
            return normalizeOptions(o);
          }),
          files: new Set()
        });
    }
  }, _marked);
}
var buildPresetChainWalker = exports.buildPresetChainWalker = makeChainWalker({
  root: function root(preset) {
    return loadPresetDescriptors(preset);
  },
  env: function env(preset, envName) {
    return loadPresetEnvDescriptors(preset)(envName);
  },
  overrides: function overrides(preset, index) {
    return loadPresetOverridesDescriptors(preset)(index);
  },
  overridesEnv: function overridesEnv(preset, index, envName) {
    return loadPresetOverridesEnvDescriptors(preset)(index)(envName);
  },
  createLogger: function createLogger() {
    return function () {};
  } // Currently we don't support logging how preset is expanded
});
var loadPresetDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return buildRootDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors);
});
var loadPresetEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return (0, _caching.makeStrongCacheSync)(function (envName) {
    return buildEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, envName);
  });
});
var loadPresetOverridesDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return buildOverrideDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index);
  });
});
var loadPresetOverridesEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return (0, _caching.makeStrongCacheSync)(function (envName) {
      return buildOverrideEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index, envName);
    });
  });
});
/**
 * Build a config chain for Babel's full root configuration.
 */
function buildRootChain(opts, context) {
  var configReport, babelRcReport, programmaticLogger, programmaticChain, programmaticReport, configFile, babelrc, babelrcRoots, babelrcRootsDirectory, configFileChain, configFileLogger, validatedFile, result, ignoreFile, babelrcFile, isIgnored, fileChain, pkgData, _yield$findRelativeCo, _validatedFile, babelrcLogger, _result, chain;
  return babelHelpers.regenerator().w(function (_context2) {
    while (1) switch (_context2.next) {
      case 0:
        programmaticLogger = new _printer.ConfigPrinter();
        return _context2.delegateYield(loadProgrammaticChain({
          options: opts,
          dirname: context.cwd
        }, context, undefined, programmaticLogger), 1);
      case 1:
        programmaticChain = _context2.sent;
        if (programmaticChain) {
          _context2.next = 2;
          break;
        }
        return _context2.abrupt(2, null);
      case 2:
        return _context2.delegateYield(programmaticLogger.output(), 3);
      case 3:
        programmaticReport = _context2.sent;
        if (!(typeof opts.configFile === "string")) {
          _context2.next = 5;
          break;
        }
        return _context2.delegateYield((0, _index.loadConfig)(opts.configFile, context.cwd, context.envName, context.caller), 4);
      case 4:
        configFile = _context2.sent;
        _context2.next = 7;
        break;
      case 5:
        if (!(opts.configFile !== false)) {
          _context2.next = 7;
          break;
        }
        return _context2.delegateYield((0, _index.findRootConfig)(context.root, context.envName, context.caller), 6);
      case 6:
        configFile = _context2.sent;
      case 7:
        babelrc = opts.babelrc, babelrcRoots = opts.babelrcRoots;
        babelrcRootsDirectory = context.cwd;
        configFileChain = emptyChain();
        configFileLogger = new _printer.ConfigPrinter();
        if (!configFile) {
          _context2.next = 11;
          break;
        }
        validatedFile = validateConfigFile(configFile);
        return _context2.delegateYield(loadFileChain(validatedFile, context, undefined, configFileLogger), 8);
      case 8:
        result = _context2.sent;
        if (result) {
          _context2.next = 9;
          break;
        }
        return _context2.abrupt(2, null);
      case 9:
        return _context2.delegateYield(configFileLogger.output(), 10);
      case 10:
        configReport = _context2.sent;
        // Allow config files to toggle `.babelrc` resolution on and off and
        // specify where the roots are.
        if (babelrc === undefined) {
          babelrc = validatedFile.options.babelrc;
        }
        if (babelrcRoots === undefined) {
          babelrcRootsDirectory = validatedFile.dirname;
          babelrcRoots = validatedFile.options.babelrcRoots;
        }
        mergeChain(configFileChain, result);
      case 11:
        isIgnored = false;
        fileChain = emptyChain(); // resolve all .babelrc files
        if (!((babelrc === true || babelrc === undefined) && typeof context.filename === "string")) {
          _context2.next = 18;
          break;
        }
        return _context2.delegateYield((0, _index.findPackageData)(context.filename), 12);
      case 12:
        pkgData = _context2.sent;
        if (!(pkgData && babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory))) {
          _context2.next = 18;
          break;
        }
        return _context2.delegateYield((0, _index.findRelativeConfig)(pkgData, context.envName, context.caller), 13);
      case 13:
        _yield$findRelativeCo = _context2.sent;
        ignoreFile = _yield$findRelativeCo.ignore;
        babelrcFile = _yield$findRelativeCo.config;
        if (ignoreFile) {
          fileChain.files.add(ignoreFile.filepath);
        }
        if (ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname)) {
          isIgnored = true;
        }
        if (!(babelrcFile && !isIgnored)) {
          _context2.next = 17;
          break;
        }
        _validatedFile = validateBabelrcFile(babelrcFile);
        babelrcLogger = new _printer.ConfigPrinter();
        return _context2.delegateYield(loadFileChain(_validatedFile, context, undefined, babelrcLogger), 14);
      case 14:
        _result = _context2.sent;
        if (_result) {
          _context2.next = 15;
          break;
        }
        isIgnored = true;
        _context2.next = 17;
        break;
      case 15:
        return _context2.delegateYield(babelrcLogger.output(), 16);
      case 16:
        babelRcReport = _context2.sent;
        mergeChain(fileChain, _result);
      case 17:
        if (babelrcFile && isIgnored) {
          fileChain.files.add(babelrcFile.filepath);
        }
      case 18:
        if (context.showConfig) {
          console.log(`Babel configs on "${context.filename}" (ascending priority):\n` +
          // print config by the order of ascending priority
          [configReport, babelRcReport, programmaticReport].filter(function (x) {
            return !!x;
          }).join("\n\n") + "\n-----End Babel configs-----");
        }
        // Insert file chain in front so programmatic options have priority
        // over configuration file chain items.
        chain = mergeChain(mergeChain(mergeChain(emptyChain(), configFileChain), fileChain), programmaticChain);
        return _context2.abrupt(2, {
          plugins: isIgnored ? [] : dedupDescriptors(chain.plugins),
          presets: isIgnored ? [] : dedupDescriptors(chain.presets),
          options: isIgnored ? [] : chain.options.map(function (o) {
            return normalizeOptions(o);
          }),
          fileHandling: isIgnored ? "ignored" : "transpile",
          ignore: ignoreFile || undefined,
          babelrc: babelrcFile || undefined,
          config: configFile || undefined,
          files: chain.files
        });
    }
  }, _marked2);
}
function babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
  if (typeof babelrcRoots === "boolean") return babelrcRoots;
  var absoluteRoot = context.root;

  // Fast path to avoid having to match patterns if the babelrc is just
  // loading in the standard root directory.
  if (babelrcRoots === undefined) {
    return pkgData.directories.includes(absoluteRoot);
  }
  var babelrcPatterns = babelrcRoots;
  if (!Array.isArray(babelrcPatterns)) {
    babelrcPatterns = [babelrcPatterns];
  }
  babelrcPatterns = babelrcPatterns.map(function (pat) {
    return typeof pat === "string" ? _nodePath.default.resolve(babelrcRootsDirectory, pat) : pat;
  });

  // Fast path to avoid having to match patterns if the babelrc is just
  // loading in the standard root directory.
  if (babelrcPatterns.length === 1 && babelrcPatterns[0] === absoluteRoot) {
    return pkgData.directories.includes(absoluteRoot);
  }
  return babelrcPatterns.some(function (pat) {
    if (typeof pat === "string") {
      pat = (0, _patternToRegex.default)(pat, babelrcRootsDirectory);
    }
    return pkgData.directories.some(function (directory) {
      return matchPattern(pat, babelrcRootsDirectory, directory, context);
    });
  });
}
var validateConfigFile = (0, _caching.makeWeakCacheSync)(function (file) {
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("configfile", file.options, file.filepath)
  };
});
var validateBabelrcFile = (0, _caching.makeWeakCacheSync)(function (file) {
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("babelrcfile", file.options, file.filepath)
  };
});
var validateExtendFile = (0, _caching.makeWeakCacheSync)(function (file) {
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("extendsfile", file.options, file.filepath)
  };
});

/**
 * Build a config chain for just the programmatic options passed into Babel.
 */
var loadProgrammaticChain = makeChainWalker({
  root: function root(input) {
    return buildRootDescriptors(input, "base", _configDescriptors.createCachedDescriptors);
  },
  env: function env(input, envName) {
    return buildEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, envName);
  },
  overrides: function overrides(input, index) {
    return buildOverrideDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index);
  },
  overridesEnv: function overridesEnv(input, index, envName) {
    return buildOverrideEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index, envName);
  },
  createLogger: function createLogger(input, context, baseLogger) {
    return buildProgrammaticLogger(input, context, baseLogger);
  }
});

/**
 * Build a config chain for a given file.
 */
var loadFileChainWalker = makeChainWalker({
  root: function root(file) {
    return loadFileDescriptors(file);
  },
  env: function env(file, envName) {
    return loadFileEnvDescriptors(file)(envName);
  },
  overrides: function overrides(file, index) {
    return loadFileOverridesDescriptors(file)(index);
  },
  overridesEnv: function overridesEnv(file, index, envName) {
    return loadFileOverridesEnvDescriptors(file)(index)(envName);
  },
  createLogger: function createLogger(file, context, baseLogger) {
    return buildFileLogger(file.filepath, context, baseLogger);
  }
});
function loadFileChain(input, context, files, baseLogger) {
  var chain;
  return babelHelpers.regenerator().w(function (_context3) {
    while (1) switch (_context3.next) {
      case 0:
        return _context3.delegateYield(loadFileChainWalker(input, context, files, baseLogger), 1);
      case 1:
        chain = _context3.sent;
        chain === null || chain === void 0 || chain.files.add(input.filepath);
        return _context3.abrupt(2, chain);
    }
  }, _marked3);
}
var loadFileDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return buildRootDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors);
});
var loadFileEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return (0, _caching.makeStrongCacheSync)(function (envName) {
    return buildEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, envName);
  });
});
var loadFileOverridesDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return buildOverrideDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index);
  });
});
var loadFileOverridesEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return (0, _caching.makeStrongCacheSync)(function (envName) {
      return buildOverrideEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index, envName);
    });
  });
});
function buildFileLogger(filepath, context, baseLogger) {
  if (!baseLogger) {
    return function () {};
  }
  return baseLogger.configure(context.showConfig, _printer.ChainFormatter.Config, {
    filepath
  });
}
function buildRootDescriptors(_ref, alias, descriptors) {
  var dirname = _ref.dirname,
    options = _ref.options;
  return descriptors(dirname, options, alias);
}
function buildProgrammaticLogger(_, context, baseLogger) {
  var _context$caller;
  if (!baseLogger) {
    return function () {};
  }
  return baseLogger.configure(context.showConfig, _printer.ChainFormatter.Programmatic, {
    callerName: (_context$caller = context.caller) === null || _context$caller === void 0 ? void 0 : _context$caller.name
  });
}
function buildEnvDescriptors(_ref2, alias, descriptors, envName) {
  var _options$env;
  var dirname = _ref2.dirname,
    options = _ref2.options;
  var opts = (_options$env = options.env) === null || _options$env === void 0 ? void 0 : _options$env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
}
function buildOverrideDescriptors(_ref3, alias, descriptors, index) {
  var _options$overrides;
  var dirname = _ref3.dirname,
    options = _ref3.options;
  var opts = (_options$overrides = options.overrides) === null || _options$overrides === void 0 ? void 0 : _options$overrides[index];
  if (!opts) throw new Error("Assertion failure - missing override");
  return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
}
function buildOverrideEnvDescriptors(_ref4, alias, descriptors, index, envName) {
  var _options$overrides2, _override$env;
  var dirname = _ref4.dirname,
    options = _ref4.options;
  var override = (_options$overrides2 = options.overrides) === null || _options$overrides2 === void 0 ? void 0 : _options$overrides2[index];
  if (!override) throw new Error("Assertion failure - missing override");
  var opts = (_override$env = override.env) === null || _override$env === void 0 ? void 0 : _override$env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.overrides[${index}].env["${envName}"]`) : null;
}
function makeChainWalker(_ref5) {
  var root = _ref5.root,
    env = _ref5.env,
    overrides = _ref5.overrides,
    overridesEnv = _ref5.overridesEnv,
    createLogger = _ref5.createLogger;
  return function chainWalker(input, context) {
    var files = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();
    var baseLogger = arguments.length > 3 ? arguments[3] : undefined;
    return /*#__PURE__*/babelHelpers.regenerator().m(function _callee() {
      var dirname, flattenedConfigs, rootOpts, envOpts, chain, logger, _i, _flattenedConfigs, _flattenedConfigs$_i, config, index, envName;
      return babelHelpers.regenerator().w(function (_context4) {
        while (1) switch (_context4.next) {
          case 0:
            dirname = input.dirname;
            flattenedConfigs = [];
            rootOpts = root(input);
            if (configIsApplicable(rootOpts, dirname, context, input.filepath)) {
              flattenedConfigs.push({
                config: rootOpts,
                envName: undefined,
                index: undefined
              });
              envOpts = env(input, context.envName);
              if (envOpts && configIsApplicable(envOpts, dirname, context, input.filepath)) {
                flattenedConfigs.push({
                  config: envOpts,
                  envName: context.envName,
                  index: undefined
                });
              }
              (rootOpts.options.overrides || []).forEach(function (_, index) {
                var overrideOps = overrides(input, index);
                if (configIsApplicable(overrideOps, dirname, context, input.filepath)) {
                  flattenedConfigs.push({
                    config: overrideOps,
                    index,
                    envName: undefined
                  });
                  var overrideEnvOpts = overridesEnv(input, index, context.envName);
                  if (overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context, input.filepath)) {
                    flattenedConfigs.push({
                      config: overrideEnvOpts,
                      index,
                      envName: context.envName
                    });
                  }
                }
              });
            }

            // Process 'ignore' and 'only' before 'extends' items are processed so
            // that we don't do extra work loading extended configs if a file is
            // ignored.
            if (!flattenedConfigs.some(function (_ref6) {
              var _ref6$config$options = _ref6.config.options,
                ignore = _ref6$config$options.ignore,
                only = _ref6$config$options.only;
              return shouldIgnore(context, ignore, only, dirname);
            })) {
              _context4.next = 1;
              break;
            }
            return _context4.abrupt(2, null);
          case 1:
            chain = emptyChain();
            logger = createLogger(input, context, baseLogger);
            _i = 0, _flattenedConfigs = flattenedConfigs;
          case 2:
            if (!(_i < _flattenedConfigs.length)) {
              _context4.next = 6;
              break;
            }
            _flattenedConfigs$_i = _flattenedConfigs[_i], config = _flattenedConfigs$_i.config, index = _flattenedConfigs$_i.index, envName = _flattenedConfigs$_i.envName;
            return _context4.delegateYield(mergeExtendsChain(chain, config.options, dirname, context, files, baseLogger), 3);
          case 3:
            if (_context4.sent) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt(2, null);
          case 4:
            logger(config, index, envName);
            return _context4.delegateYield(mergeChainOpts(chain, config), 5);
          case 5:
            _i++;
            _context4.next = 2;
            break;
          case 6:
            return _context4.abrupt(2, chain);
        }
      }, _callee);
    })();
  };
}
function mergeExtendsChain(chain, opts, dirname, context, files, baseLogger) {
  var file, fileChain;
  return babelHelpers.regenerator().w(function (_context5) {
    while (1) switch (_context5.next) {
      case 0:
        if (!(opts.extends === undefined)) {
          _context5.next = 1;
          break;
        }
        return _context5.abrupt(2, true);
      case 1:
        return _context5.delegateYield((0, _index.loadConfig)(opts.extends, dirname, context.envName, context.caller), 2);
      case 2:
        file = _context5.sent;
        if (!files.has(file)) {
          _context5.next = 3;
          break;
        }
        throw new Error(`Configuration cycle detected loading ${file.filepath}.\n` + `File already loaded following the config chain:\n` + Array.from(files, function (file) {
          return ` - ${file.filepath}`;
        }).join("\n"));
      case 3:
        files.add(file);
        return _context5.delegateYield(loadFileChain(validateExtendFile(file), context, files, baseLogger), 4);
      case 4:
        fileChain = _context5.sent;
        files.delete(file);
        if (fileChain) {
          _context5.next = 5;
          break;
        }
        return _context5.abrupt(2, false);
      case 5:
        mergeChain(chain, fileChain);
        return _context5.abrupt(2, true);
    }
  }, _marked4);
}
function mergeChain(target, source) {
  var _target$options, _target$plugins, _target$presets;
  (_target$options = target.options).push.apply(_target$options, babelHelpers.toConsumableArray(source.options));
  (_target$plugins = target.plugins).push.apply(_target$plugins, babelHelpers.toConsumableArray(source.plugins));
  (_target$presets = target.presets).push.apply(_target$presets, babelHelpers.toConsumableArray(source.presets));
  var _iterator = babelHelpers.createForOfIteratorHelper(source.files),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var file = _step.value;
      target.files.add(file);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return target;
}
function mergeChainOpts(target, _ref7) {
  var options = _ref7.options,
    plugins = _ref7.plugins,
    presets = _ref7.presets;
  return /*#__PURE__*/babelHelpers.regenerator().m(function _callee2(_target$plugins2, _target$presets2) {
    var _t, _t2, _t3, _t4, _t5, _t6, _t7, _t8, _t9, _t0;
    return babelHelpers.regenerator().w(function (_context6) {
      while (1) switch (_context6.next) {
        case 0:
          target.options.push(options);
          _t = (_target$plugins2 = target.plugins).push;
          _t2 = _target$plugins2;
          _t3 = babelHelpers;
          return _context6.delegateYield(plugins(), 1);
        case 1:
          _t4 = _context6.sent;
          _t5 = _t3.toConsumableArray.call(_t3, _t4);
          _t.apply.call(_t, _t2, _t5);
          _t6 = (_target$presets2 = target.presets).push;
          _t7 = _target$presets2;
          _t8 = babelHelpers;
          return _context6.delegateYield(presets(), 2);
        case 2:
          _t9 = _context6.sent;
          _t0 = _t8.toConsumableArray.call(_t8, _t9);
          _t6.apply.call(_t6, _t7, _t0);
          return _context6.abrupt(2, target);
      }
    }, _callee2);
  })();
}
function emptyChain() {
  return {
    options: [],
    presets: [],
    plugins: [],
    files: new Set()
  };
}
function normalizeOptions(opts) {
  var options = babelHelpers.objectSpread2({}, opts);
  delete options.extends;
  delete options.env;
  delete options.overrides;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;
  delete options.test;
  delete options.include;
  delete options.exclude;

  // "sourceMap" is just aliased to sourceMap, so copy it over as
  // we merge the options together.
  if (Object.hasOwn(options, "sourceMap")) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }
  return options;
}
function dedupDescriptors(items) {
  var map = new Map();
  var descriptors = [];
  var _iterator2 = babelHelpers.createForOfIteratorHelper(items),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      if (typeof item.value === "function") {
        var fnKey = item.value;
        var nameMap = map.get(fnKey);
        if (!nameMap) {
          nameMap = new Map();
          map.set(fnKey, nameMap);
        }
        var desc = nameMap.get(item.name);
        if (!desc) {
          desc = {
            value: item
          };
          descriptors.push(desc);

          // Treat passPerPreset presets as unique, skipping them
          // in the merge processing steps.
          if (!item.ownPass) nameMap.set(item.name, desc);
        } else {
          desc.value = item;
        }
      } else {
        descriptors.push({
          value: item
        });
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return descriptors.reduce(function (acc, desc) {
    acc.push(desc.value);
    return acc;
  }, []);
}
function configIsApplicable(_ref8, dirname, context, configName) {
  var options = _ref8.options;
  return (options.test === undefined || configFieldIsApplicable(context, options.test, dirname, configName)) && (options.include === undefined || configFieldIsApplicable(context, options.include, dirname, configName)) && (options.exclude === undefined || !configFieldIsApplicable(context, options.exclude, dirname, configName));
}
function configFieldIsApplicable(context, test, dirname, configName) {
  var patterns = Array.isArray(test) ? test : [test];
  return matchesPatterns(context, patterns, dirname, configName);
}

/**
 * Print the ignoreList-values in a more helpful way than the default.
 */
function ignoreListReplacer(_key, value) {
  if (value instanceof RegExp) {
    return String(value);
  }
  return value;
}

/**
 * Tests if a filename should be ignored based on "ignore" and "only" options.
 */
function shouldIgnore(context, ignore, only, dirname) {
  if (ignore && matchesPatterns(context, ignore, dirname)) {
    var _context$filename;
    var message = `No config is applied to "${(_context$filename = context.filename) !== null && _context$filename !== void 0 ? _context$filename : "(unknown)"}" because it matches one of \`ignore: ${JSON.stringify(ignore, ignoreListReplacer)}\` from "${dirname}"`;
    debug(message);
    if (context.showConfig) {
      console.log(message);
    }
    return true;
  }
  if (only && !matchesPatterns(context, only, dirname)) {
    var _context$filename2;
    var _message = `No config is applied to "${(_context$filename2 = context.filename) !== null && _context$filename2 !== void 0 ? _context$filename2 : "(unknown)"}" because it fails to match one of \`only: ${JSON.stringify(only, ignoreListReplacer)}\` from "${dirname}"`;
    debug(_message);
    if (context.showConfig) {
      console.log(_message);
    }
    return true;
  }
  return false;
}

/**
 * Returns result of calling function with filename if pattern is a function.
 * Otherwise returns result of matching pattern Regex with filename.
 */
function matchesPatterns(context, patterns, dirname, configName) {
  return patterns.some(function (pattern) {
    return matchPattern(pattern, dirname, context.filename, context, configName);
  });
}
function matchPattern(pattern, dirname, pathToTest, context, configName) {
  if (typeof pattern === "function") {
    return !!(0, _rewriteStackTrace.endHiddenCallStack)(pattern)(pathToTest, {
      dirname,
      envName: context.envName,
      caller: context.caller
    });
  }
  if (typeof pathToTest !== "string") {
    throw new _configError.default(`Configuration contains string/RegExp pattern, but no filename was passed to Babel`, configName);
  }
  if (typeof pattern === "string") {
    pattern = (0, _patternToRegex.default)(pattern, dirname);
  }
  return pattern.test(pathToTest);
}
