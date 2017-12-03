// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


function enumerableOnlyObject(obj) {
  let result = Object.create(null);
  Object.keys(obj).forEach(function(key) {
    Object.defineProperty(result, key, {enumerable: true, value: obj[key]});
  });
  return result;
}

// Traceur sets these default options and no others for v 0.1.*
export const optionsV01 = enumerableOnlyObject({
  annotations: false,
  arrayComprehension: false,
  arrowFunctions: true,
  asyncFunctions: false,
  asyncGenerators: false,
  blockBinding: true,
  classes: true,
  commentCallback: false,
  computedPropertyNames: true,
  debug: false,
  debugNames: false,
  defaultParameters: true,
  destructuring: true,
  exponentiation: false,
  exportFromExtended: false,
  forOf: true,
  forOn: false,
  freeVariableChecker: false,
  generatorComprehension: false,
  generators: true,
  importRuntime: false,
  inputSourceMap: false,
  jsx: false,
  lowResolutionSourceMap: false,
  memberVariables: false,
  moduleName: 'default',
  modules: 'bootstrap',
  numericLiterals: true,
  outputLanguage: 'es5',
  properTailCalls: false,
  propertyMethods: true,
  propertyNameShorthand: true,
  referrer: '',
  require: false,
  restParameters: true,
  script: false,
  sourceMaps: false,
  sourceRoot: false,
  spread: true,
  spreadProperties: false,
  symbols: true,
  templateLiterals: true,
  types: false,
  unicodeEscapeSequences: true,
  unicodeExpressions: true,
  validate: false,
});

export const versionLockedOptions = optionsV01;

// Options are just a plain old object. There are two read only views on this
// object, parseOptions and transformOptions.
//
// To set an option you do `options.classes = true`.
//
// An option value is either true, false or a string. If the value is set to
// the string "parse" then the transformOption for that option
// will return false. For example:
//
//   options.destructuring = 'parse';
//   options.parseOptions.destructuring === true;
//   options.transformOptions.destructuring === false;
//
// This allows you to parse certain features without transforming them, leaving
// the syntax intact in the output.

let defaultValues = Object.create(null);
let featureOptions = Object.create(null);
let experimentalOptions = Object.create(null);
let moduleOptions =
    ['amd', 'commonjs', 'closure', 'instantiate', 'inline', 'bootstrap', 'parse'];

const EXPERIMENTAL = 0;
const ON_BY_DEFAULT = 1;

/**
 * Adds a feature option. Feature options can be tested with parseOptions
 * and transformOptions.
 */
function addFeatureOption(name, kind) {
  featureOptions[name] = true;

  if (kind === EXPERIMENTAL)
    experimentalOptions[name] = true;

  let defaultValue = kind === ON_BY_DEFAULT;
  defaultValues[name] = defaultValue;
}

/**
 * Adds a simple boolean option.
 */
function addBoolOption(name) {
  defaultValues[name] = false;
}

// ON_BY_DEFAULT
addFeatureOption('arrowFunctions', ON_BY_DEFAULT);     // 13.2
addFeatureOption('blockBinding', ON_BY_DEFAULT);       // 12.1
addFeatureOption('classes', ON_BY_DEFAULT);            // 13.5
addFeatureOption('computedPropertyNames', ON_BY_DEFAULT);  // 11.1.5
addFeatureOption('defaultParameters', ON_BY_DEFAULT);  // Cant find in the spec
addFeatureOption('destructuring', ON_BY_DEFAULT);      // 11.13.1
addFeatureOption('forOf', ON_BY_DEFAULT);              // 12.6.4
addFeatureOption('generators', ON_BY_DEFAULT); // 13.4
addFeatureOption('modules', 'SPECIAL');    // 14
addFeatureOption('numericLiterals', ON_BY_DEFAULT);
addFeatureOption('propertyMethods', ON_BY_DEFAULT);    // 13.3
addFeatureOption('propertyNameShorthand', ON_BY_DEFAULT);
addFeatureOption('restParameters', ON_BY_DEFAULT);     // 13.1
addFeatureOption('sourceMaps', 'SPECIAL');
addFeatureOption('spread', ON_BY_DEFAULT);             // 11.1.4, 11.2.5
addFeatureOption('symbols', ON_BY_DEFAULT);
addFeatureOption('templateLiterals', ON_BY_DEFAULT);   // 7.6.8
addFeatureOption('unicodeEscapeSequences', ON_BY_DEFAULT);  // 11.8.4
addFeatureOption('unicodeExpressions', ON_BY_DEFAULT);

// EXPERIMENTAL due to performance impact although properly part of ES6
addFeatureOption('properTailCalls', EXPERIMENTAL);

// EXPERIMENTAL
addFeatureOption('annotations', EXPERIMENTAL);
addFeatureOption('arrayComprehension', EXPERIMENTAL); // 11.4.1.2
addFeatureOption('asyncFunctions', EXPERIMENTAL);
addFeatureOption('asyncGenerators', EXPERIMENTAL);
addFeatureOption('exponentiation', EXPERIMENTAL);
addFeatureOption('exportFromExtended', EXPERIMENTAL);
addFeatureOption('forOn', EXPERIMENTAL);
addFeatureOption('generatorComprehension', EXPERIMENTAL);
addFeatureOption('importRuntime', EXPERIMENTAL);
addFeatureOption('jsx', EXPERIMENTAL);
addFeatureOption('memberVariables', EXPERIMENTAL);
addFeatureOption('require', EXPERIMENTAL);
addFeatureOption('spreadProperties', EXPERIMENTAL);
addFeatureOption('types', EXPERIMENTAL);

let transformOptionsPrototype = {};

Object.keys(featureOptions).forEach((name) => {
  Object.defineProperty(transformOptionsPrototype, name, {
    get: function() {
      let v = this.proxiedOptions_[name];
      if (v === 'parse')
        return false;
      return v;
    },
    enumerable: true
  });
});

let parseOptionsPrototype = {};

Object.keys(featureOptions).forEach((name) => {
  Object.defineProperty(parseOptionsPrototype, name, {
    get: function() {
      return !!this.proxiedOptions_[name];
    },
    enumerable: true
  });
});


addBoolOption('commentCallback');
addBoolOption('debug');
addBoolOption('debugNames');
addBoolOption('freeVariableChecker');
addBoolOption('script');
addBoolOption('validate');

export class Options {

  constructor(options = Object.create(null)) {
    this.reset();

    // Make sure non option fields are non enumerable.
    Object.defineProperties(this, {
      modules_: {
        value: versionLockedOptions.modules,
        writable: true,
        enumerable: false
      },
      sourceMaps_: {
        value: versionLockedOptions.sourceMaps,
        writable: true,
        enumerable: false
      },
      sourceRoot_: {
        value: versionLockedOptions.sourceRoot,
        writable: true,
        enumerable: false
      },
      transformOptions: {
        value: Object.create(transformOptionsPrototype, {
          proxiedOptions_: {
            value: this,
            enumerable: false
          }}),
        enumerable: false
      },
      parseOptions: {
        value: Object.create(parseOptionsPrototype, {
          proxiedOptions_: {
            value: this,
            enumerable: false
          }}),
        enumerable: false
      }
    });

    this.setFromObject(options);
  }

  /**
   * Meta option. Sets all options that are of Kind.experimental
   * When getting this will return null if not all options of this kind
   * have the same value.
   * @type {boolean|string|null}
   */
  set experimental(v) {
    v = coerceOptionValue(v);
    Object.keys(experimentalOptions).forEach((name) => {
      this[name] = v;
    });
  }

  get experimental() {
    let value;
    Object.keys(experimentalOptions).every((name) => {
      let currentValue = this[name];
      if (value === undefined) {
        value = currentValue;
        return true;
      }
      if (currentValue !== value) {
        value = null;
        return false;
      }
      return true;
    });
    return value;
  }

  /**
   * @return {Options} with every experimental option set true.
   */
  static experimental() {
    return new Options(experimentalOptions);
  }

  get atscript() {
    return this.types && this.annotations && this.memberVariables;
  }

  set atscript(value) {
    this.types = value;
    this.annotations = value;
    this.memberVariables = value;
  }

  /**
   * @return {Options} with every atScript option set true.
   */
  static atscript() {
    return new Options({types: true, annotations: true, memberVariables: true});
  }

  get modules() {
    return this.modules_;
  }

  set modules(value) {
    if (typeof value === 'boolean' && !value)
      value = 'bootstrap';
    if (moduleOptions.indexOf(value) === -1) {
      throw new Error('Invalid \'modules\' option \'' + value + '\', not in ' +
        moduleOptions.join(', '));
    }
    this.modules_ = value;
  }

  get sourceMaps() {
    return this.sourceMaps_;
  }

  set sourceMaps(value) {
    if (value === null || typeof value === 'boolean') {
      this.sourceMaps_ = value ? 'file' : false;
      return;
    }
    if (value === 'file' || value === 'inline' || value === 'memory') {
      this.sourceMaps_ = value;
    } else {
      throw new Error('Option sourceMaps should be ' +
          '[false|inline|file|memory], not ' + value);
    }
  }

  /**
   * Resets all options to the default value or to false if |allOff| is
   * true.
   * @param {boolean=} allOff
   */
  reset(allOff = undefined) {
    let useDefault = allOff === undefined;
    Object.keys(defaultValues).forEach((name) => {
      this[name] = useDefault && defaultValues[name];
    });
    this.setDefaults();
  }
  /**
   * Set values for non-boolean options.  Some non-boolean options allow
   * boolean values.
   */
  setDefaults() {
    this.modules = 'bootstrap';
    this.moduleName = 'default';
    this.outputLanguage = 'es5';
    this.referrer = '';
    this.sourceMaps = false;
    this.sourceRoot = false;
    this.lowResolutionSourceMap = false;
    this.inputSourceMap = false;
  }

  static listUnknownOptions(obj) {
    let unknowns = [];
    Object.keys(obj).forEach((propName) => {
      if (!(propName in optionsV01)) {
        unknowns.push(propName);
      }
    });
    return unknowns;
  }
  /**
   * Sets the options based on an object.
   */
  setFromObject(object) {
    Object.keys(this).forEach((name) => {
      if (name in object)
        this.setOption(name, object[name]);
    });
    this.modules = object.modules || this.modules;
    if (typeof object.sourceMaps === 'boolean' ||
        typeof object.sourceMaps === 'string') {
      this.sourceMaps = object.sourceMaps;
    }
    if (object.sourceRoot !== undefined)
      this.sourceRoot = object.sourceRoot;
    return this;
  }

  setOption(name, value) {
    name = toCamelCase(name);
    if (name in this) {
      this[name] = value;
    } else {
      throw Error('Unknown option: ' + name);
    }
  }

  diff(ref) {
    let mismatches = [];
    Object.keys(this).forEach((key) => {
      if (this[key] !== ref[key]) {
        mismatches.push({
          key: key,
          now: $traceurRuntime.options[key],
          v01: ref[key]
        });
      }
    });
    return mismatches;
  }

};


// TODO: Refactor this so that we can keep all of these in one place.
let descriptions = {
  experimental: 'Turns on all experimental features',
  require: 'Generate require function argument for node when modules=register',
  sourceMaps: 'Generate source map and (\'file\') write to .map' +
      ' or (\'inline\') append data URL',
};

export class CommandOptions extends Options {

  /**
   * Takes a string and parses it and sets the options based on that
   * string.
   */
  static fromString(s) {
    return CommandOptions.fromArgv(s.split(/\s+/));
  }

  /**
   * Takes an array of command line params and sets the options based on that.
   */
  static fromArgv(args) {
    let options = new CommandOptions();
    args.forEach((arg) => options.parseCommand(arg));
    return options;
  }
  /**
   * Parses a part of a command line and sets the respective option.
   * The following patterns are supported.
   *
   *   --spread, --spread=true
   *   --spread=parse
   *   --spread=false
   *   --arrowFunctions --arrow-functions
   *   --modules=amd
   */
  parseCommand(s) {
    let re = /--([^=]+)(?:=(.+))?/;
    let m = re.exec(s);

    if (m)
      this.setOptionCoerced(m[1], m[2]);
  }

  setOptionCoerced(name, value) {
    // commander.js give value = null if no argument follows --option-name
    if (typeof value !== 'undefined' && value !== null)
      value = coerceOptionValue(value);
    else
      value = true;

    this.setOption(name,  value);
  }

}

function coerceOptionValue(v) {
  switch (v) {
    case 'false':
      return false;
    case 'true':
    case true:
      return true;
    default:
      // Falsey values will be false.
      return !!v && String(v);
  }
}

/**
 * Converts a string from aaa-bbb-ccc to aaaBbbCcc.
 */
function toCamelCase(s) {
  return s.replace(/-\w/g, function(ch) {
    return ch[1].toUpperCase();
  });
}

/**
 * Converts a string from aaaBbbCcc to aaa-bbb-ccc.
 */
export function toDashCase(s) {
  return s.replace(/[A-Z]/g, function(ch) {
    return '-' + ch.toLowerCase();
  });
}

/**
 * TODO(jjb): move to src/node
 * This is called by build.js to add options to the commander command line
 * library.
 * @param {Commander} flags The commander object.
 */
export function addOptions(flags, commandOptions) {
  // Start with the non-boolean options.
  flags.option('--referrer <name>',
      'Bracket output code with System.referrerName=<name>',
      (name) => {
        commandOptions.setOption('referrer', name);
        System.map = System.semverMap(name);
        return name;
      });
  flags.option('--modules <' + moduleOptions.join(', ') + '>',
      'select the output format for modules',
      (moduleFormat) => {
        commandOptions.modules = moduleFormat;
      });
  flags.option('--moduleName [true|false|default]',
    'true for named, false for anonymous modules; default depends on --modules',
    (moduleName) => {
      if (moduleName === 'true')
        moduleName = true;
      else if (moduleName === 'false')
        moduleName = false;
      else
        moduleName = 'default';
      commandOptions.moduleName = moduleName;
    });
  flags.option('--outputLanguage <es6|es5>',
    'compilation target language',
    (outputLanguage) => {
      if (outputLanguage === 'es6' || outputLanguage === 'es5')
        commandOptions.outputLanguage = outputLanguage;
      else
        throw new Error('outputLanguage must be one of es5, es6');
  });
  flags.option('--source-maps [file|inline|memory]',
    'sourceMaps generated to file or inline with data: URL',
    (to) => { return commandOptions.sourceMaps = to; }
  );
  flags.option('--source-root <true|false|string>',
    'sourcemap sourceRoot value. false to omit, ' +
        'true for directory of output file.',
    (to) => {
      if (to === 'false')
        to = false;
      else if (to === 'true')
        to = true;
      return commandOptions.sourceRoot = to;
    }
  );
  flags.option('--low-resolution-source-maps',
    'Lower sourceMaps granularity to one mapping per output line',
    () => { return commandOptions.lowResolutionSourceMap = true; }
  );
  flags.option('--experimental',
    'Turns on all experimental features',
    () => { commandOptions.experimental = true; }
  );

  flags.option('--atscript',
    'Turns on all AtScript features',
    () => { commandOptions.atscript = true; }
  );

  Object.keys(commandOptions).forEach(function(name) {
    let dashedName = toDashCase(name);
    if (flags.optionFor('--' + name) || flags.optionFor('--' + dashedName)) {
      return;   // non-boolean already in flags.
    } else if (name in featureOptions) {
      flags.option('--' + dashedName + ' [true|false|parse]',
                   descriptions[name]);
      flags.on(dashedName, (value) =>
        commandOptions.setOptionCoerced(dashedName, value));
    } else if (commandOptions[name] !== null) {
      flags.option('--' + dashedName, descriptions[name]);
      flags.on(dashedName, () => commandOptions.setOption(dashedName, true));
    } else {
      throw new Error('Unexpected null commandOption ' + name);
    }
  });
  // After we've processed the commandOptions, set defaults for commandOptions.
  commandOptions.setDefaults();
}
