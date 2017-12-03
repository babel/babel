"use strict";

exports.__esModule = true;

var _babelPluginTransformEs2015TemplateLiterals = require("babel-plugin-transform-es2015-template-literals");

var _babelPluginTransformEs2015TemplateLiterals2 = _interopRequireDefault(_babelPluginTransformEs2015TemplateLiterals);

var _babelPluginTransformEs2015Literals = require("babel-plugin-transform-es2015-literals");

var _babelPluginTransformEs2015Literals2 = _interopRequireDefault(_babelPluginTransformEs2015Literals);

var _babelPluginTransformEs2015FunctionName = require("babel-plugin-transform-es2015-function-name");

var _babelPluginTransformEs2015FunctionName2 = _interopRequireDefault(_babelPluginTransformEs2015FunctionName);

var _babelPluginTransformEs2015ArrowFunctions = require("babel-plugin-transform-es2015-arrow-functions");

var _babelPluginTransformEs2015ArrowFunctions2 = _interopRequireDefault(_babelPluginTransformEs2015ArrowFunctions);

var _babelPluginTransformEs2015BlockScopedFunctions = require("babel-plugin-transform-es2015-block-scoped-functions");

var _babelPluginTransformEs2015BlockScopedFunctions2 = _interopRequireDefault(_babelPluginTransformEs2015BlockScopedFunctions);

var _babelPluginTransformEs2015Classes = require("babel-plugin-transform-es2015-classes");

var _babelPluginTransformEs2015Classes2 = _interopRequireDefault(_babelPluginTransformEs2015Classes);

var _babelPluginTransformEs2015ObjectSuper = require("babel-plugin-transform-es2015-object-super");

var _babelPluginTransformEs2015ObjectSuper2 = _interopRequireDefault(_babelPluginTransformEs2015ObjectSuper);

var _babelPluginTransformEs2015ShorthandProperties = require("babel-plugin-transform-es2015-shorthand-properties");

var _babelPluginTransformEs2015ShorthandProperties2 = _interopRequireDefault(_babelPluginTransformEs2015ShorthandProperties);

var _babelPluginTransformEs2015DuplicateKeys = require("babel-plugin-transform-es2015-duplicate-keys");

var _babelPluginTransformEs2015DuplicateKeys2 = _interopRequireDefault(_babelPluginTransformEs2015DuplicateKeys);

var _babelPluginTransformEs2015ComputedProperties = require("babel-plugin-transform-es2015-computed-properties");

var _babelPluginTransformEs2015ComputedProperties2 = _interopRequireDefault(_babelPluginTransformEs2015ComputedProperties);

var _babelPluginTransformEs2015ForOf = require("babel-plugin-transform-es2015-for-of");

var _babelPluginTransformEs2015ForOf2 = _interopRequireDefault(_babelPluginTransformEs2015ForOf);

var _babelPluginTransformEs2015StickyRegex = require("babel-plugin-transform-es2015-sticky-regex");

var _babelPluginTransformEs2015StickyRegex2 = _interopRequireDefault(_babelPluginTransformEs2015StickyRegex);

var _babelPluginTransformEs2015UnicodeRegex = require("babel-plugin-transform-es2015-unicode-regex");

var _babelPluginTransformEs2015UnicodeRegex2 = _interopRequireDefault(_babelPluginTransformEs2015UnicodeRegex);

var _babelPluginCheckEs2015Constants = require("babel-plugin-check-es2015-constants");

var _babelPluginCheckEs2015Constants2 = _interopRequireDefault(_babelPluginCheckEs2015Constants);

var _babelPluginTransformEs2015Spread = require("babel-plugin-transform-es2015-spread");

var _babelPluginTransformEs2015Spread2 = _interopRequireDefault(_babelPluginTransformEs2015Spread);

var _babelPluginTransformEs2015Parameters = require("babel-plugin-transform-es2015-parameters");

var _babelPluginTransformEs2015Parameters2 = _interopRequireDefault(_babelPluginTransformEs2015Parameters);

var _babelPluginTransformEs2015Destructuring = require("babel-plugin-transform-es2015-destructuring");

var _babelPluginTransformEs2015Destructuring2 = _interopRequireDefault(_babelPluginTransformEs2015Destructuring);

var _babelPluginTransformEs2015BlockScoping = require("babel-plugin-transform-es2015-block-scoping");

var _babelPluginTransformEs2015BlockScoping2 = _interopRequireDefault(_babelPluginTransformEs2015BlockScoping);

var _babelPluginTransformEs2015TypeofSymbol = require("babel-plugin-transform-es2015-typeof-symbol");

var _babelPluginTransformEs2015TypeofSymbol2 = _interopRequireDefault(_babelPluginTransformEs2015TypeofSymbol);

var _babelPluginTransformEs2015ModulesCommonjs = require("babel-plugin-transform-es2015-modules-commonjs");

var _babelPluginTransformEs2015ModulesCommonjs2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesCommonjs);

var _babelPluginTransformEs2015ModulesSystemjs = require("babel-plugin-transform-es2015-modules-systemjs");

var _babelPluginTransformEs2015ModulesSystemjs2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesSystemjs);

var _babelPluginTransformEs2015ModulesAmd = require("babel-plugin-transform-es2015-modules-amd");

var _babelPluginTransformEs2015ModulesAmd2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesAmd);

var _babelPluginTransformEs2015ModulesUmd = require("babel-plugin-transform-es2015-modules-umd");

var _babelPluginTransformEs2015ModulesUmd2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesUmd);

var _babelPluginTransformRegenerator = require("babel-plugin-transform-regenerator");

var _babelPluginTransformRegenerator2 = _interopRequireDefault(_babelPluginTransformRegenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preset(context) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var moduleTypes = ["commonjs", "amd", "umd", "systemjs"];
  var loose = false;
  var modules = "commonjs";
  var spec = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.modules !== undefined) modules = opts.modules;
    if (opts.spec !== undefined) spec = opts.spec;
  }

  if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
  if (typeof spec !== "boolean") throw new Error("Preset es2015 'spec' option must be a boolean.");
  if (modules !== false && moduleTypes.indexOf(modules) === -1) {
    throw new Error("Preset es2015 'modules' option must be 'false' to indicate no modules\n" + "or a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");
  }

  var optsLoose = { loose: loose };

  return {
    plugins: [[_babelPluginTransformEs2015TemplateLiterals2.default, { loose: loose, spec: spec }], _babelPluginTransformEs2015Literals2.default, _babelPluginTransformEs2015FunctionName2.default, [_babelPluginTransformEs2015ArrowFunctions2.default, { spec: spec }], _babelPluginTransformEs2015BlockScopedFunctions2.default, [_babelPluginTransformEs2015Classes2.default, optsLoose], _babelPluginTransformEs2015ObjectSuper2.default, _babelPluginTransformEs2015ShorthandProperties2.default, _babelPluginTransformEs2015DuplicateKeys2.default, [_babelPluginTransformEs2015ComputedProperties2.default, optsLoose], [_babelPluginTransformEs2015ForOf2.default, optsLoose], _babelPluginTransformEs2015StickyRegex2.default, _babelPluginTransformEs2015UnicodeRegex2.default, _babelPluginCheckEs2015Constants2.default, [_babelPluginTransformEs2015Spread2.default, optsLoose], _babelPluginTransformEs2015Parameters2.default, [_babelPluginTransformEs2015Destructuring2.default, optsLoose], _babelPluginTransformEs2015BlockScoping2.default, _babelPluginTransformEs2015TypeofSymbol2.default, modules === "commonjs" && [_babelPluginTransformEs2015ModulesCommonjs2.default, optsLoose], modules === "systemjs" && [_babelPluginTransformEs2015ModulesSystemjs2.default, optsLoose], modules === "amd" && [_babelPluginTransformEs2015ModulesAmd2.default, optsLoose], modules === "umd" && [_babelPluginTransformEs2015ModulesUmd2.default, optsLoose], [_babelPluginTransformRegenerator2.default, { async: false, asyncGenerators: false }]].filter(Boolean) };
}

var oldConfig = preset({});

exports.default = oldConfig;

Object.defineProperty(oldConfig, "buildPreset", {
  configurable: true,
  writable: true,

  enumerable: false,
  value: preset
});
module.exports = exports["default"];