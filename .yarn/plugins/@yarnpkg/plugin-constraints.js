/* eslint-disable*/
module.exports = {
  name: "@yarnpkg/plugin-constraints",
  factory: function (require) {
                          var plugin =
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const query_1 = __importDefault(__webpack_require__(2));

  const source_1 = __importDefault(__webpack_require__(68));

  const constraints_1 = __importDefault(__webpack_require__(69));

  const plugin = {
    configuration: {
      constraintsPath: {
        description: `The path of the constraints file.`,
        type: core_1.SettingsType.ABSOLUTE_PATH,
        default: `./constraints.pro`
      }
    },
    commands: [query_1.default, source_1.default, constraints_1.default]
  }; // eslint-disable-next-line arca/no-default-export

  exports.default = plugin;

  /***/ }),
  /* 1 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/core");

  /***/ }),
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var __asyncValues = this && this.__asyncValues || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);

    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }

    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({
          value: v,
          done: d
        });
      }, reject);
    }
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const cli_1 = __webpack_require__(3);

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  const clipanion_1 = __webpack_require__(4);

  const Constraints_1 = __webpack_require__(5); // eslint-disable-next-line arca/no-default-export


  class ConstraintsQueryCommand extends cli_1.BaseCommand {
    constructor() {
      super(...arguments);
      this.json = false;
    }

    async execute() {
      const configuration = await core_1.Configuration.find(this.context.cwd, this.context.plugins);
      const {
        project
      } = await core_1.Project.find(configuration, this.context.cwd);
      const constraints = await Constraints_1.Constraints.find(project);
      let query = this.query;
      if (!query.endsWith(`.`)) query = `${query}.`;
      const report = await core_2.StreamReport.start({
        configuration,
        json: this.json,
        stdout: this.context.stdout
      }, async report => {
        var e_1, _a;

        try {
          for (var _b = __asyncValues(constraints.query(query)), _c; _c = await _b.next(), !_c.done;) {
            const result = _c.value;
            const lines = Array.from(Object.entries(result));
            const lineCount = lines.length;
            const maxVariableNameLength = lines.reduce((max, [variableName]) => Math.max(max, variableName.length), 0);

            for (let i = 0; i < lineCount; i++) {
              const [variableName, value] = lines[i];
              report.reportInfo(null, `${getLinePrefix(i, lineCount)}${variableName.padEnd(maxVariableNameLength, ` `)} = ${valueToString(value)}`);
            }

            report.reportJson(result);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      });
      return report.exitCode();
    }

  }

  ConstraintsQueryCommand.usage = clipanion_1.Command.Usage({
    category: `Constraints-related commands`,
    description: `query the constraints fact database`,
    details: `
        This command will output all matches to the given prolog query.

        If the \`--json\` flag is set the output will follow a JSON-stream output also known as NDJSON (https://github.com/ndjson/ndjson-spec).
      `,
    examples: [[`List all dependencies throughout the workspace`, `yarn constraints query 'workspace_has_dependency(_, DependencyName, _, _).'`]]
  });

  __decorate([clipanion_1.Command.Boolean(`--json`)], ConstraintsQueryCommand.prototype, "json", void 0);

  __decorate([clipanion_1.Command.String()], ConstraintsQueryCommand.prototype, "query", void 0);

  __decorate([clipanion_1.Command.Path(`constraints`, `query`)], ConstraintsQueryCommand.prototype, "execute", null);

  exports.default = ConstraintsQueryCommand;

  function valueToString(value) {
    if (typeof value !== `string`) return `${value}`;
    if (value.match(/^[a-zA-Z][a-zA-Z0-9_]+$/)) return value;
    return `'${value}'`;
  }

  function getLinePrefix(index, count) {
    const isFirst = index === 0;
    const isLast = index === count - 1;
    if (isFirst && isLast) return ``;
    if (isFirst) return `┌ `;
    if (isLast) return `└ `;
    return `│ `;
  }

  /***/ }),
  /* 3 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/cli");

  /***/ }),
  /* 4 */
  /***/ (function(module, exports) {

  module.exports = require("clipanion");

  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
   /// <reference path="./tauProlog.d.ts"/>

  var __await = this && this.__await || function (v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };

  var __asyncGenerator = this && this.__asyncGenerator || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i;

    function verb(n) {
      if (g[n]) i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
    }

    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }

    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }

    function fulfill(value) {
      resume("next", value);
    }

    function reject(value) {
      resume("throw", value);
    }

    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  };

  var __asyncValues = this && this.__asyncValues || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);

    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }

    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({
          value: v,
          done: d
        });
      }, reject);
    }
  };

  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  const fslib_1 = __webpack_require__(6);

  const tau_prolog_1 = __importDefault(__webpack_require__(7));

  const tauModule_1 = __webpack_require__(14);

  var DependencyType;

  (function (DependencyType) {
    DependencyType["Dependencies"] = "dependencies";
    DependencyType["DevDependencies"] = "devDependencies";
    DependencyType["PeerDependencies"] = "peerDependencies";
  })(DependencyType = exports.DependencyType || (exports.DependencyType = {}));

  const DEPENDENCY_TYPES = [DependencyType.Dependencies, DependencyType.DevDependencies, DependencyType.PeerDependencies];

  function extractErrorImpl(value) {
    if (value instanceof tau_prolog_1.default.type.Num) return value.value;

    if (value instanceof tau_prolog_1.default.type.Term) {
      if (value.args.length === 0) return value.id;

      switch (value.indicator) {
        case `throw/1`:
          return extractErrorImpl(value.args[0]);

        case `error/1`:
          return extractErrorImpl(value.args[0]);

        case `error/2`:
          return Object.assign(extractErrorImpl(value.args[0]), ...extractErrorImpl(value.args[1]));

        case `syntax_error/1`:
          return new core_1.ReportError(core_1.MessageName.PROLOG_SYNTAX_ERROR, `Syntax error: ${extractErrorImpl(value.args[0])}`);

        case `existence_error/2`:
          return new core_1.ReportError(core_1.MessageName.PROLOG_EXISTENCE_ERROR, `Existence error: ${extractErrorImpl(value.args[0])} ${extractErrorImpl(value.args[1])} not found`);

        case `line/1`:
          return {
            line: extractErrorImpl(value.args[0])
          };

        case `column/1`:
          return {
            column: extractErrorImpl(value.args[0])
          };

        case `found/1`:
          return {
            found: extractErrorImpl(value.args[0])
          };

        case `./2`:
          return [extractErrorImpl(value.args[0])].concat(extractErrorImpl(value.args[1]));

        case `//2`:
          return `${extractErrorImpl(value.args[0])}/${extractErrorImpl(value.args[1])}`;
      }
    }

    throw `couldn't pretty print because of unsupported node ${value}`;
  }

  function extractError(val) {
    let err;

    try {
      err = extractErrorImpl(val);
    } catch (caught) {
      if (typeof caught === `string`) {
        throw new core_1.ReportError(core_1.MessageName.PROLOG_UNKNOWN_ERROR, `Unknown error: ${val} (note: ${caught})`);
      } else {
        throw caught;
      }
    }

    if (typeof err.line !== `undefined` && typeof err.column !== `undefined`) err.message += ` at line ${err.line}, column ${err.column}`;
    return err;
  } // Node 8 doesn't have Symbol.asyncIterator
  // https://github.com/Microsoft/TypeScript/issues/14151#issuecomment-280812617


  if (Symbol.asyncIterator == null) Symbol.asyncIterator = Symbol.for('Symbol.asyncIterator');

  class Session {
    constructor(project, source) {
      this.session = tau_prolog_1.default.create();
      tauModule_1.linkProjectToSession(this.session, project);
      this.session.consult(source);
    }

    fetchNextAnswer() {
      return new Promise(resolve => {
        this.session.answer(result => {
          resolve(result);
        });
      });
    }

    makeQuery(query) {
      return __asyncGenerator(this, arguments, function* makeQuery_1() {
        const parsed = this.session.query(query);
        if (parsed !== true) throw extractError(parsed);

        while (true) {
          const answer = yield __await(this.fetchNextAnswer());
          if (!answer) break;
          if (answer.id === `throw`) throw extractError(answer);
          yield yield __await(answer);
        }
      });
    }

  }

  function parseLink(link) {
    if (link.id === `null`) {
      return null;
    } else {
      return `${link.toJavaScript()}`;
    }
  }

  function parseLinkToJson(link) {
    if (link.id === `null`) {
      return null;
    } else {
      const val = link.toJavaScript();
      if (typeof val !== `string`) return JSON.stringify(val);

      try {
        return JSON.stringify(JSON.parse(val));
      } catch (_a) {
        return JSON.stringify(val);
      }
    }
  }

  class Constraints {
    constructor(project) {
      this.source = ``;
      this.project = project;
      const constraintsPath = project.configuration.get(`constraintsPath`);

      if (fslib_1.xfs.existsSync(constraintsPath)) {
        this.source = fslib_1.xfs.readFileSync(constraintsPath, `utf8`);
      }
    }

    static async find(project) {
      return new Constraints(project);
    }

    getProjectDatabase() {
      let database = ``;

      for (const dependencyType of DEPENDENCY_TYPES) database += `dependency_type(${dependencyType}).\n`;

      for (const workspace of this.project.workspacesByCwd.values()) {
        const relativeCwd = workspace.relativeCwd;
        database += `workspace(${escape(relativeCwd)}).\n`;
        database += `workspace_ident(${escape(relativeCwd)}, ${escape(core_2.structUtils.stringifyIdent(workspace.locator))}).\n`;
        database += `workspace_version(${escape(relativeCwd)}, ${escape(workspace.manifest.version)}).\n`;

        for (const dependencyType of DEPENDENCY_TYPES) {
          for (const dependency of workspace.manifest[dependencyType].values()) {
            database += `workspace_has_dependency(${escape(relativeCwd)}, ${escape(core_2.structUtils.stringifyIdent(dependency))}, ${escape(dependency.range)}, ${dependencyType}).\n`;
          }
        }
      } // Add default never matching predicates to prevent prolog instantiation errors
      // when constraints run in an empty workspace


      database += `workspace(_) :- false.\n`;
      database += `workspace_ident(_, _) :- false.\n`;
      database += `workspace_version(_, _) :- false.\n`; // Add a default never matching predicate to prevent prolog instantiation errors
      // when constraints run in a workspace without dependencies

      database += `workspace_has_dependency(_, _, _, _) :- false.\n`;
      return database;
    }

    getDeclarations() {
      let declarations = ``; // (Cwd, DependencyIdent, DependencyRange, DependencyType)

      declarations += `gen_enforced_dependency(_, _, _, _) :- false.\n`; // (Cwd, Path, Value)

      declarations += `gen_enforced_field(_, _, _) :- false.\n`;
      return declarations;
    }

    get fullSource() {
      return `${this.getProjectDatabase()}\n${this.source}\n${this.getDeclarations()}`;
    }

    createSession() {
      return new Session(this.project, this.fullSource);
    }

    async process() {
      const session = this.createSession();
      return {
        enforcedDependencies: await this.genEnforcedDependencies(session),
        enforcedFields: await this.genEnforcedFields(session)
      };
    }

    async genEnforcedDependencies(session) {
      var e_1, _a;

      let enforcedDependencies = [];

      try {
        for (var _b = __asyncValues(session.makeQuery(`workspace(WorkspaceCwd), dependency_type(DependencyType), gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType).`)), _c; _c = await _b.next(), !_c.done;) {
          const answer = _c.value;
          const workspaceCwd = fslib_1.ppath.resolve(this.project.cwd, parseLink(answer.links.WorkspaceCwd));
          const dependencyRawIdent = parseLink(answer.links.DependencyIdent);
          const dependencyRange = parseLink(answer.links.DependencyRange);
          const dependencyType = parseLink(answer.links.DependencyType);
          if (workspaceCwd === null || dependencyRawIdent === null) throw new Error(`Invalid rule`);
          const workspace = this.project.getWorkspaceByCwd(workspaceCwd);
          const dependencyIdent = core_2.structUtils.parseIdent(dependencyRawIdent);
          enforcedDependencies.push({
            workspace,
            dependencyIdent,
            dependencyRange,
            dependencyType
          });
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      return core_2.miscUtils.sortMap(enforcedDependencies, [({
        dependencyRange
      }) => dependencyRange !== null ? `0` : `1`, ({
        workspace
      }) => core_2.structUtils.stringifyIdent(workspace.locator), ({
        dependencyIdent
      }) => core_2.structUtils.stringifyIdent(dependencyIdent)]);
    }

    async genEnforcedFields(session) {
      var e_2, _a;

      let enforcedFields = [];

      try {
        for (var _b = __asyncValues(session.makeQuery(`workspace(WorkspaceCwd), gen_enforced_field(WorkspaceCwd, FieldPath, FieldValue).`)), _c; _c = await _b.next(), !_c.done;) {
          const answer = _c.value;
          const workspaceCwd = fslib_1.ppath.resolve(this.project.cwd, parseLink(answer.links.WorkspaceCwd));
          const fieldPath = parseLink(answer.links.FieldPath);
          let fieldValue = parseLinkToJson(answer.links.FieldValue);
          if (workspaceCwd === null || fieldPath === null) throw new Error(`Invalid rule`);
          const workspace = this.project.getWorkspaceByCwd(workspaceCwd);
          enforcedFields.push({
            workspace,
            fieldPath,
            fieldValue
          });
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }

      return core_2.miscUtils.sortMap(enforcedFields, [({
        workspace
      }) => core_2.structUtils.stringifyIdent(workspace.locator), ({
        fieldPath
      }) => fieldPath]);
    }

    query(query) {
      return __asyncGenerator(this, arguments, function* query_1() {
        var e_3, _a;

        const session = this.createSession();

        try {
          for (var _b = __asyncValues(session.makeQuery(query)), _c; _c = yield __await(_b.next()), !_c.done;) {
            const answer = _c.value;
            const parsedLinks = {};

            for (const [variable, value] of Object.entries(answer.links)) {
              if (variable !== `_`) {
                parsedLinks[variable] = parseLink(value);
              }
            }

            yield yield __await(parsedLinks);
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
          } finally {
            if (e_3) throw e_3.error;
          }
        }
      });
    }

  }

  exports.Constraints = Constraints;

  function escape(what) {
    if (typeof what === `string`) {
      return `'${what}'`;
    } else {
      return `[]`;
    }
  }

  /***/ }),
  /* 6 */
  /***/ (function(module, exports) {

  module.exports = require("@yarnpkg/fslib");

  /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {

  (function() {
  	
  	// VERSION
  	var version = { major: 0, minor: 2, patch: 66, status: "beta" };
  
  
  
  	// IO FILE SYSTEM
  
  	// Virtual file system for browser
  	tau_file_system = {
  		// Current files
  		files: {},
  		// Open file
  		open: function( path, type, mode ) {
  			var file = tau_file_system.files[path];
  			if( !file ) {
  				if( mode === "read" )
  					return null;
  				file = {
  					path: path,
  					text: "",
  					type: type,
  					get: function( length, position ) {
  						if( position === this.text.length ) {
  							return "end_of_file";
  						} else if( position > this.text.length ) {
  							return "end_of_file";
  						} else {
  							return this.text.substring( position, position+length );
  						}
  					},
  					put: function( text, position ) {
  						if( position === "end_of_file" ) {
  							this.text += text;
  							return true;
  						} else if( position === "past_end_of_file" ) {
  							return null;
  						} else {
  							this.text = this.text.substring(0, position) + text + this.text.substring(position+text.length);
  							return true;
  						}
  					},
  					get_byte: function( position ) {
  						if( position === "end_of_stream" )
  							return -1;
  						var index = Math.floor(position/2);
  						if( this.text.length <= index )
  							return -1;
  						var code = codePointAt( this.text[Math.floor(position/2)], 0 );
  						if( position % 2 === 0 )
  							return code & 0xff;
  						else
  							return code / 256 >>> 0;
  					},
  					put_byte: function( byte, position ) {
  						var index = position === "end_of_stream" ? this.text.length : Math.floor(position/2);
  						if( this.text.length < index )
  							return null;
  						var code = this.text.length === index ? -1 : codePointAt( this.text[Math.floor(position/2)], 0 );
  						if( position % 2 === 0 ) {
  							code = code / 256 >>> 0;
  							code = ((code & 0xff) << 8) | (byte & 0xff);
  						} else {
  							code = code & 0xff;
  							code = ((byte & 0xff) << 8) | (code & 0xff);
  						}
  						if( this.text.length === index )
  							this.text += fromCodePoint( code );
  						else 
  							this.text = this.text.substring( 0, index ) + fromCodePoint( code ) + this.text.substring( index+1 );
  						return true;
  					},
  					flush: function() {
  						return true;
  					},
  					close: function() {
  						var file = tau_file_system.files[this.path];
  						if( !file ) {
  							return null;
  						} else {
  							return true;
  						}
  					}
  				};
  				tau_file_system.files[path] = file;
  			}
  			if( mode === "write" )
  				file.text = "";
  			return file;
  		},
  	};
  
  	// User input for browser
  	tau_user_input = {
  		buffer: "",
  		get: function( length, _ ) {
  			var text;
  			while( tau_user_input.buffer.length < length ) {
  				text = window.prompt();
  				if( text ) {
  					tau_user_input.buffer += text;
  				}
  			}
  			text = tau_user_input.buffer.substr( 0, length );
  			tau_user_input.buffer = tau_user_input.buffer.substr( length );
  			return text;
  		}
  	};
  
  	// User output for browser
  	tau_user_output = {
  		put: function( text, _ ) {
  			console.log( text );
  			return true;
  		},
  		flush: function() {
  			return true;
  		} 
  	};
  
  	// Virtual file system for Node.js
  	nodejs_file_system = {
  		// Open file
  		open: function( path, type, mode ) {
  			var fs = __webpack_require__(8);
  			var fd = fs.openSync( path, mode[0] );
  			if( mode === "read" && !fs.existsSync( path ) )
  				return null;
  			return {
  				get: function( length, position ) {
  					var buffer = new Buffer( length );
  					fs.readSync( fd, buffer, 0, length, position );
  					return buffer.toString();
  				},
  				put: function( text, position ) {
  					var buffer = Buffer.from( text );
  					if( position === "end_of_file" )
  						fs.writeSync( fd, buffer );
  					else if( position === "past_end_of_file" )
  						return null;
  					else
  						fs.writeSync( fd, buffer, 0, buffer.length, position );
  					return true;
  				},
  				get_byte: function( position ) {
  					return null;
  				},
  				put_byte: function( byte, position ) {
  					return null;
  				},
  				flush: function() {
  					return true;
  				},
  				close: function() {
  					fs.closeSync( fd );
  					return true;
  				}
  			};
  		}
  	};
  
  	// User input for Node.js
  	nodejs_user_input = {
  		buffer: "",
  		get: function( length, _ ) {
  			var text;
  			var readlineSync = __webpack_require__(9);
  			while( nodejs_user_input.buffer.length < length )
  				nodejs_user_input.buffer += readlineSync.question();
  			text = nodejs_user_input.buffer.substr( 0, length );
  			nodejs_user_input.buffer = nodejs_user_input.buffer.substr( length );
  			return text;
  		}
  	};
  
  	// User output for Node.js
  	nodejs_user_output = {
  		put: function( text, _ ) {
  			process.stdout.write( text );
  			return true;
  		},
  		flush: function() {
  			return true;
  		}
  	};
  	
  	
  	
  	// PARSER
  	
  	var indexOf;
  	if(!Array.prototype.indexOf) {
  		indexOf = function(array, elem) {
  			var len = array.length;
  			for(var i = 0; i < len; i++) {
  				if(elem === array[i]) return i;
  			}
  			return -1;
  		};
  	} else {
  		indexOf = function(array, elem) {
  			return array.indexOf(elem);
  		};
  	}
  
  	var reduce = function(array, fn) {
  		if(array.length === 0) return undefined;
  		var elem = array[0];
  		var len = array.length;
  		for(var i = 1; i < len; i++) {
  			elem = fn(elem, array[i]);
  		}
  		return elem;
  	};
  
  	var map;
  	if(!Array.prototype.map) {
  		map = function(array, fn) {
  			var a = [];
  			var len = array.length;
  			for(var i = 0; i < len; i++) {
  				a.push( fn(array[i]) );
  			}
  			return a;
  		};
  	} else {
  		map = function(array, fn) {
  			return array.map(fn);
  		};
  	}
  	
  	var filter;
  	if(!Array.prototype.filter) {
  		filter = function(array, fn) {
  			var a = [];
  			var len = array.length;
  			for(var i = 0; i < len; i++) {
  				if(fn(array[i]))
  					a.push( array[i] );
  			}
  			return a;
  		};
  	} else {
  		filter = function(array, fn) {
  			return array.filter(fn);
  		};
  	}
  	
  	var codePointAt;
  	if(!String.prototype.codePointAt) {
  		codePointAt = function(str, i) {
  			return str.charCodeAt(i);
  		};
  	} else {
  		codePointAt = function(str, i) {
  			return str.codePointAt(i);
  		};
  	}
  	
  	var fromCodePoint;
  	if(!String.fromCodePoint) {
  		fromCodePoint = function() {
  			return String.fromCharCode.apply(null, arguments);
  		};
  	} else {
  		fromCodePoint = function() {
  			return String.fromCodePoint.apply(null, arguments);
  		};
  	}
  
  
  
  	var ERROR = 0;
  	var SUCCESS = 1;
  
  	var regex_escape = /(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)|\\x([0-9a-fA-F]+)\\|\\([0-7]+)\\|(\\\\)|(\\')|('')|(\\")|(\\`)|(\\.)|(.)/g;
  	var escape_map = {"\\a": 7, "\\b": 8, "\\f": 12, "\\n": 10, "\\r": 13, "\\t": 9, "\\v": 11};
  	function escape(str) {
  		var s = [];
  		var _error = false;
  		str.replace(regex_escape, function(match, a, b, f, n, r, t, v, hex, octal, back, single, dsingle, double, backquote, error, char) {
  			switch(true) {
  				case hex !== undefined:
  					s.push( parseInt(hex, 16) );
  					return "";
  				case octal !== undefined:
  					s.push( parseInt(octal, 8) );
  					return "";
  				case back !== undefined:
  				case single !== undefined:
  				case dsingle !== undefined:
  				case double !== undefined:
  				case backquote !== undefined:
  					s.push( codePointAt(match.substr(1),0) );
  					return "";
  				case char !== undefined:
  					s.push( codePointAt(char,0) );
  					return "";
  				case error !== undefined:
  					_error = true;
  				default:
  					s.push(escape_map[match]);
  					return "";
  			}
  		});
  		if(_error)
  			return null;
  		return s;
  	}
  
  	// Escape atoms
  	function escapeAtom(str, quote) {
  		var atom = '';
  		if( str.length < 2 ) return str;
  		try {
  			str = str.replace(/\\([0-7]+)\\/g, function(match, g1) {
  				return fromCodePoint(parseInt(g1, 8));
  			});
  			str = str.replace(/\\x([0-9a-fA-F]+)\\/g, function(match, g1) {
  				return fromCodePoint(parseInt(g1, 16));
  			});
  		} catch(error) {
  			return null;
  		}
  		for( var i = 0; i < str.length; i++) {
  			var a = str.charAt(i);
  			var b = str.charAt(i+1);
  			if( a === quote && b === quote ) {
  				i++;
  				atom += quote;
  			} else if( a === '\\' ) {
  				if( ['a','b','f','n','r','t','v',"'",'"','\\','\a','\b','\f','\n','\r','\t','\v'].indexOf(b) !== -1 ) {
  					i += 1;
  					switch( b ) {
  						case 'a': atom += '\a'; break;
  						case 'b': atom += '\b'; break;
  						case 'f': atom += '\f'; break;
  						case 'n': atom += '\n'; break;
  						case 'r': atom += '\r'; break;
  						case 't': atom += '\t'; break;
  						case 'v': atom += '\v'; break;
  						case "'": atom += "'"; break;
  						case '"': atom += '"'; break;
  						case '\\': atom += '\\'; break;
  					}
  				} else {
  					return null;
  				}
  			} else {
  				atom += a;
  			}
  		}
  		return atom;
  	}
  	
  	// Redo escape
  	function redoEscape(str) {
  		var atom = '';
  		for( var i = 0; i < str.length; i++) {
  			switch( str.charAt(i) ) {
  				case "'": atom += "\\'"; break;
  				case '\\': atom += '\\\\'; break;
  				//case '\a': atom += '\\a'; break;
  				case '\b': atom += '\\b'; break;
  				case '\f': atom += '\\f'; break;
  				case '\n': atom += '\\n'; break;
  				case '\r': atom += '\\r'; break;
  				case '\t': atom += '\\t'; break;
  				case '\v': atom += '\\v'; break;
  				default: atom += str.charAt(i); break;
  			}
  		}
  		return atom;
  	}
  
  	// String to num
  	function convertNum(num) {
  		var n = num.substr(2);
  		switch(num.substr(0,2).toLowerCase()) {
  			case "0x":
  				return parseInt(n, 16);
  			case "0b":
  				return parseInt(n, 2);
  			case "0o":
  				return parseInt(n, 8);
  			case "0'":
  				return escape(n)[0];
  			default:
  				return parseFloat(num);
  		}
  	}
  
  	// Regular expressions for tokens
  	var rules = {
  		whitespace: /^\s*(?:(?:%.*)|(?:\/\*(?:\n|\r|.)*?\*\/)|(?:\s+))\s*/,
  		variable: /^(?:[A-Z_][a-zA-Z0-9_]*)/,
  		atom: /^(\!|,|;|[a-z][0-9a-zA-Z_]*|[#\$\&\*\+\-\.\/\:\<\=\>\?\@\^\~\\]+|'(?:[^']*?(?:\\(?:x?\d+)?\\)*(?:'')*(?:\\')*)*')/,
  		number: /^(?:0o[0-7]+|0x[0-9a-fA-F]+|0b[01]+|0'(?:''|\\[abfnrtv\\'"`]|\\x?\d+\\|[^\\])|\d+(?:\.\d+(?:[eE][+-]?\d+)?)?)/,
  		string: /^(?:"([^"]|""|\\")*"|`([^`]|``|\\`)*`)/,
  		l_brace: /^(?:\[)/,
  		r_brace: /^(?:\])/,
  		l_bracket: /^(?:\{)/,
  		r_bracket: /^(?:\})/,
  		bar: /^(?:\|)/,
  		l_paren: /^(?:\()/,
  		r_paren: /^(?:\))/
  	};
  
  	// Replace chars of char_conversion session
  	function replace( thread, text ) {
  		if( thread.get_flag( "char_conversion" ).id === "on" ) {
  			return text.replace(/./g, function(char) {
  				return thread.get_char_conversion( char );
  			});
  		}
  		return text;
  	}
  
  	// Tokenize strings
  	function Tokenizer(thread) {
  		this.thread = thread;
  		this.text = ""; // Current text to be analized
  		this.tokens = []; // Consumed tokens
  	}
  
  	Tokenizer.prototype.set_last_tokens = function(tokens) {
  		return this.tokens = tokens;
  	};
  
  	Tokenizer.prototype.new_text = function(text) {
  		this.text = text;
  		this.tokens = [];
  	};
  
  	Tokenizer.prototype.get_tokens = function(init) {
  		var text;
  		var len = 0; // Total length respect to text
  		var line = 0;
  		var start = 0;
  		var tokens = [];
  		var last_in_blank = false;
  
  		if(init) {
  			var token = this.tokens[init-1];
  			len = token.len;
  			text = replace( this.thread, this.text.substr(token.len) );
  			line = token.line;
  			start = token.start;
  		}
  		else
  			text = this.text;
  
  
  		// If there is nothing to be analized, return null
  		if(/^\s*$/.test(text))
  			return null;
  
  		while(text !== "") {
  			var matches = [];
  			var last_is_blank = false;
  
  			if(/^\n/.exec(text) !== null) {
  				line++;
  				start = 0;
  				len++;
  				text = text.replace(/\n/, "");
  				last_in_blank = true;
  				continue;
  			}
  
  			for(var rule in rules) {
  				if(rules.hasOwnProperty(rule)) {
  					var matchs = rules[rule].exec( text );
  					if(matchs) {
  						matches.push({
  							value: matchs[0],
  							name: rule,
  							matches: matchs
  						});
  					}
  				}
  			}
  
  			// Lexical error
  			if(!matches.length)
  				return this.set_last_tokens( [{ value: text, matches: [], name: "lexical", line: line, start: start }] );
  
  			var token = reduce( matches, function(a, b) {
  				return a.value.length >= b.value.length ? a : b;
  			} );
  
  			token.start = start;
  			token.line = line;
  
  			text = text.replace(token.value, "");
  			start += token.value.length;
  			len += token.value.length;
  
  			switch(token.name) {
  				case "atom":
  					token.raw = token.value;
  					if(token.value.charAt(0) === "'") {
  						token.value = escapeAtom( token.value.substr(1, token.value.length - 2), "'" );
  						if( token.value === null ) {
  							token.name = "lexical";
  							token.value = "unknown escape sequence";
  						}
  					}
  					break;
  				case "number":
  					token.float = token.value.substring(0,2) !== "0x" && token.value.match(/[.eE]/) !== null && token.value !== "0'.";
  					token.value = convertNum( token.value );
  					token.blank = last_is_blank;
  					break;
  				case "string":
  					var del = token.value.charAt(0);
  					token.value = escapeAtom( token.value.substr(1, token.value.length - 2), del );
  					if( token.value === null ) {
  						token.name = "lexical";
  						token.value = "unknown escape sequence";
  					}
  					break;
  				case "whitespace":
  					var last = tokens[tokens.length-1];
  					if(last) last.space = true;
  					last_is_blank = true;
  					continue;
  				case "r_bracket":
  					if( tokens.length > 0 && tokens[tokens.length-1].name === "l_bracket" ) {
  						token = tokens.pop();
  						token.name = "atom";
  						token.value = "{}";
  						token.raw = "{}";
  						token.space = false;
  					}
  					break;
  				case "r_brace":
  					if( tokens.length > 0 && tokens[tokens.length-1].name === "l_brace" ) {
  						token = tokens.pop();
  						token.name = "atom";
  						token.value = "[]";
  						token.raw = "[]";
  						token.space = false;
  					}
  					break;
  			}
  			token.len = len;
  			tokens.push( token );
  			last_is_blank = false;
  		}
  
  		var t = this.set_last_tokens( tokens );
  		return t.length === 0 ? null : t;
  	};
  
  	// Parse an expression
  	function parseExpr(thread, tokens, start, priority, toplevel) {
  		if(!tokens[start]) return {type: ERROR, value: pl.error.syntax(tokens[start-1], "expression expected", true)};
  		var error;
  
  		if(priority === "0") {
  			var token = tokens[start];
  			switch(token.name) {
  				case "number":
  					return {type: SUCCESS, len: start+1, value: new pl.type.Num(token.value, token.float)};
  				case "variable":
  					return {type: SUCCESS, len: start+1, value: new pl.type.Var(token.value)};
  				case "string":
  					var str;
  					switch( thread.get_flag( "double_quotes" ).id ) {
  						case "atom":;
  							str = new Term( token.value, [] );
  							break;
  						case "codes":
  							str = new Term( "[]", [] );
  							for(var i = token.value.length-1; i >= 0; i-- )
  								str = new Term( ".", [new pl.type.Num( codePointAt(token.value,i), false ), str] );
  							break;
  						case "chars":
  							str = new Term( "[]", [] );
  							for(var i = token.value.length-1; i >= 0; i-- )
  								str = new Term( ".", [new pl.type.Term( token.value.charAt(i), [] ), str] );
  							break;
  					}
  					return {type: SUCCESS, len: start+1, value: str};
  				case "l_paren":
  					var expr = parseExpr(thread, tokens, start+1, thread.__get_max_priority(), true);
  					if(expr.type !== SUCCESS) return expr;
  					if(tokens[expr.len] && tokens[expr.len].name === "r_paren") {
  						expr.len++;
  						return expr;
  					}
  					return {type: ERROR, derived: true, value: pl.error.syntax(tokens[expr.len] ? tokens[expr.len] : tokens[expr.len-1], ") or operator expected", !tokens[expr.len])}
  				case "l_bracket":
  					var expr = parseExpr(thread, tokens, start+1, thread.__get_max_priority(), true);
  					if(expr.type !== SUCCESS) return expr;
  					if(tokens[expr.len] && tokens[expr.len].name === "r_bracket") {
  						expr.len++;
  						expr.value = new Term( "{}", [expr.value] );
  						return expr;
  					}
  					return {type: ERROR, derived: true, value: pl.error.syntax(tokens[expr.len] ? tokens[expr.len] : tokens[expr.len-1], "} or operator expected", !tokens[expr.len])}
  			}
  			// Compound term
  			var result = parseTerm(thread, tokens, start, toplevel);
  			if(result.type === SUCCESS || result.derived)
  				return result;
  			// List
  			result = parseList(thread, tokens, start);
  			if(result.type === SUCCESS || result.derived)
  				return result;
  			// Unexpected
  			return {type: ERROR, derived: false, value: pl.error.syntax(tokens[start], "unexpected token")};
  		}
  
  		var max_priority = thread.__get_max_priority();
  		var next_priority = thread.__get_next_priority(priority);
  		var aux_start = start;
  		
  		// Prefix operators
  		if(tokens[start].name === "atom" && tokens[start+1] && (tokens[start].space || tokens[start+1].name !== "l_paren")) {
  			var token = tokens[start++];
  			var classes = thread.__lookup_operator_classes(priority, token.value);
  			
  			// Associative prefix operator
  			if(classes && classes.indexOf("fy") > -1) {
  				var expr = parseExpr(thread, tokens, start, priority, toplevel);
  				if(expr.type !== ERROR) {
  					if( token.value === "-" && !token.space && pl.type.is_number( expr.value ) ) {
  						return {
  							value: new pl.type.Num(-expr.value.value, expr.value.is_float),
  							len: expr.len,
  							type: SUCCESS
  						};
  					} else {
  						return {
  							value: new pl.type.Term(token.value, [expr.value]),
  							len: expr.len,
  							type: SUCCESS
  						};
  					}
  				} else {
  					error = expr;
  				}
  			// Non-associative prefix operator
  			} else if(classes && classes.indexOf("fx") > -1) {
  				var expr = parseExpr(thread, tokens, start, next_priority, toplevel);
  				if(expr.type !== ERROR) {
  					return {
  						value: new pl.type.Term(token.value, [expr.value]),
  						len: expr.len,
  						type: SUCCESS
  					};
  				} else {
  					error = expr;
  				}
  			}
  		}
  
  		start = aux_start;
  		var expr = parseExpr(thread, tokens, start, next_priority, toplevel);
  		if(expr.type === SUCCESS) {
  			start = expr.len;
  			var token = tokens[start];
  			if(tokens[start] && (
  				tokens[start].name === "atom" && thread.__lookup_operator_classes(priority, token.value) ||
  				tokens[start].name === "bar" && thread.__lookup_operator_classes(priority, "|")
  			) ) {
  				var next_priority_lt = next_priority;
  				var next_priority_eq = priority;
  				var classes = thread.__lookup_operator_classes(priority, token.value);
  
  				if(classes.indexOf("xf") > -1) {
  					return {
  						value: new pl.type.Term(token.value, [expr.value]),
  						len: ++expr.len,
  						type: SUCCESS
  					};
  				} else if(classes.indexOf("xfx") > -1) {
  					var expr2 = parseExpr(thread, tokens, start + 1, next_priority_lt, toplevel);
  					if(expr2.type === SUCCESS) {
  						return {
  							value: new pl.type.Term(token.value, [expr.value, expr2.value]),
  							len: expr2.len,
  							type: SUCCESS
  						};
  					} else {
  						expr2.derived = true;
  						return expr2;
  					}
  				} else if(classes.indexOf("xfy") > -1) {
  					var expr2 = parseExpr(thread, tokens, start + 1, next_priority_eq, toplevel);
  					if(expr2.type === SUCCESS) {
  						return {
  							value: new pl.type.Term(token.value, [expr.value, expr2.value]),
  							len: expr2.len,
  							type: SUCCESS
  						};
  					} else {
  						expr2.derived = true;
  						return expr2;
  					}
  				} else if(expr.type !== ERROR) {
  					while(true) {
  						start = expr.len;
  						var token = tokens[start];
  						if(token && token.name === "atom" && thread.__lookup_operator_classes(priority, token.value)) {
  							var classes = thread.__lookup_operator_classes(priority, token.value);
  							if( classes.indexOf("yf") > -1 ) {
  								expr = {
  									value: new pl.type.Term(token.value, [expr.value]),
  									len: ++start,
  									type: SUCCESS
  								};
  							} else if( classes.indexOf("yfx") > -1 ) {
  								var expr2 = parseExpr(thread, tokens, ++start, next_priority_lt, toplevel);
  								if(expr2.type === ERROR) {
  									expr2.derived = true;
  									return expr2;
  								}
  								start = expr2.len;
  								expr = {
  									value: new pl.type.Term(token.value, [expr.value, expr2.value]),
  									len: start,
  									type: SUCCESS
  								};
  							} else { break; }
  						} else { break; }
  					}
  				}
  			} else {
  				error = {type: ERROR, value: pl.error.syntax(tokens[expr.len-1], "operator expected")};
  			}
  			return expr;
  		}
  		return expr;
  	}
  
  	// Parse a compound term
  	function parseTerm(thread, tokens, start, toplevel) {
  		if(!tokens[start] || (tokens[start].name === "atom" && tokens[start].raw === "." && !toplevel && (tokens[start].space || !tokens[start+1] || tokens[start+1].name !== "l_paren")))
  			return {type: ERROR, derived: false, value: pl.error.syntax(tokens[start-1], "unfounded token")};
  		var atom = tokens[start];
  		var exprs = [];
  		if(tokens[start].name === "atom" && tokens[start].raw !== ",") {
  			start++;
  			if(tokens[start-1].space) return {type: SUCCESS, len: start, value: new pl.type.Term(atom.value, exprs)};
  			if(tokens[start] && tokens[start].name === "l_paren") {
  				if(tokens[start+1] && tokens[start+1].name === "r_paren") 
  					return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start+1], "argument expected")};
  				var expr = parseExpr(thread, tokens, ++start, "999", true);
  				if(expr.type === ERROR) {
  					if( expr.derived )
  						return expr;
  					else
  						return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start] ? tokens[start] : tokens[start-1], "argument expected", !tokens[start])};
  				}
  				exprs.push(expr.value);
  				start = expr.len;
  				while(tokens[start] && tokens[start].name === "atom" && tokens[start].value === ",") {
  					expr = parseExpr(thread, tokens, start+1, "999", true);
  					if(expr.type === ERROR) {
  						if( expr.derived )
  							return expr;
  						else
  							return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start+1] ? tokens[start+1] : tokens[start], "argument expected", !tokens[start+1])};
  					}
  					exprs.push(expr.value);
  					start = expr.len;
  				}
  				if(tokens[start] && tokens[start].name === "r_paren") start++;
  				else return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start] ? tokens[start] : tokens[start-1], ", or ) expected", !tokens[start])};
  			}
  			return {type: SUCCESS, len: start, value: new pl.type.Term(atom.value, exprs)};
  		}
  		return {type: ERROR, derived: false, value: pl.error.syntax(tokens[start], "term expected")};
  	}
  
  	// Parse a list
  	function parseList(thread, tokens, start) {
  		if(!tokens[start]) 
  			return {type: ERROR, derived: false, value: pl.error.syntax(tokens[start-1], "[ expected")};
  		if(tokens[start] && tokens[start].name === "l_brace") {
  			var expr = parseExpr(thread, tokens, ++start, "999", true);
  			var exprs = [expr.value];
  			var cons = undefined;
  
  			if(expr.type === ERROR) {
  				if(tokens[start] && tokens[start].name === "r_brace") {
  					return {type: SUCCESS, len: start+1, value: new pl.type.Term("[]", [])};
  				}
  				return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start], "] expected")};
  			}
  			
  			start = expr.len;
  
  			while(tokens[start] && tokens[start].name === "atom" && tokens[start].value === ",") {
  				expr = parseExpr(thread, tokens, start+1, "999", true);
  				if(expr.type === ERROR) {
  					if( expr.derived )
  						return expr;
  					else
  						return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start+1] ? tokens[start+1] : tokens[start], "argument expected", !tokens[start+1])};
  				}
  				exprs.push(expr.value);
  				start = expr.len;
  			}
  			var bar = false
  			if(tokens[start] && tokens[start].name === "bar") {
  				bar = true;
  				expr = parseExpr(thread, tokens, start+1, "999", true);
  				if(expr.type === ERROR) {
  					if( expr.derived )
  						return expr;
  					else
  						return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start+1] ? tokens[start+1] : tokens[start], "argument expected", !tokens[start+1])};
  				}
  				cons = expr.value;
  				start = expr.len;
  			}
  			if(tokens[start] && tokens[start].name === "r_brace")
  				return {type: SUCCESS, len: start+1, value: arrayToList(exprs, cons) };
  			else
  				return {type: ERROR, derived: true, value: pl.error.syntax(tokens[start] ? tokens[start] : tokens[start-1], bar ? "] expected" : ", or | or ] expected", !tokens[start])};
  		}
  		return {type: ERROR, derived: false, value: pl.error.syntax(tokens[start], "list expected")};
  	}
  
  	// Parse a rule
  	function parseRule(thread, tokens, start) {
  		var line = tokens[start].line;
  		var expr = parseExpr(thread, tokens, start, thread.__get_max_priority(), false);
  		var rule = null;
  		var obj;
  		if(expr.type !== ERROR) {
  			start = expr.len;
  			if(tokens[start] && tokens[start].name === "atom" && tokens[start].raw === ".") {
  				start++;
  				if( pl.type.is_term(expr.value) ) {
  					if(expr.value.indicator === ":-/2") {
  						rule = new pl.type.Rule(expr.value.args[0], body_conversion(expr.value.args[1]))
  						obj = {
  							value: rule,
  							len: start,
  							type: SUCCESS
  						};
  					} else if(expr.value.indicator === "-->/2") {
  						rule = rule_to_dcg(new pl.type.Rule(expr.value.args[0], expr.value.args[1]), thread);
  						rule.body = body_conversion( rule.body );
  						obj = {
  							value: rule,
  							len: start,
  							type: pl.type.is_rule( rule ) ? SUCCESS : ERROR
  						};
  					} else {
  						rule = new pl.type.Rule(expr.value, null);
  						obj = {
  							value: rule,
  							len: start,
  							type: SUCCESS
  						};
  					}
  					if( rule ) {
  						var singleton = rule.singleton_variables();
  						if( singleton.length > 0 )
  							thread.throw_warning( pl.warning.singleton( singleton, rule.head.indicator, line ) );
  					}
  					return obj;
  				} else {
  					return { type: ERROR, value: pl.error.syntax(tokens[start], "callable expected") };
  				}
  			} else {
  				return { type: ERROR, value: pl.error.syntax(tokens[start] ? tokens[start] : tokens[start-1], ". or operator expected") };
  			}
  		}
  		return expr;
  	}
  
  	// Parse a program
  	function parseProgram(thread, string, options) {
  		options = options ? options : {};
  		options.from = options.from ? options.from : "$tau-js";
  		options.reconsult = options.reconsult !== undefined ? options.reconsult : true;
  		var tokenizer = new Tokenizer( thread );
  		var reconsulted = {};
  		var indicator;
  		tokenizer.new_text( string );
  		var n = 0;
  		var tokens = tokenizer.get_tokens( n );
  		do {
  			if( tokens === null || !tokens[n] ) break;
  			var expr = parseRule(thread, tokens, n);
  			if( expr.type === ERROR ) {
  				return new Term("throw", [expr.value]);
  			} else if(expr.value.body === null && expr.value.head.indicator === "?-/1") {
  				var n_thread = new Thread( thread.session );
  				n_thread.add_goal( expr.value.head.args[0] );
  				n_thread.answer( function( answer ) {
  					if( pl.type.is_error( answer ) ) {
  						thread.throw_warning( answer.args[0] );
  					} else if( answer === false || answer === null ) {
  						thread.throw_warning( pl.warning.failed_goal( expr.value.head.args[0], expr.len ) );
  					}
  				} );
  				n = expr.len;
  				var result = true;
  			} else if(expr.value.body === null && expr.value.head.indicator === ":-/1") {
  				var result = thread.run_directive(expr.value.head.args[0]);
  				n = expr.len;
  				if(expr.value.head.args[0].indicator === "char_conversion/2") {
  					tokens = tokenizer.get_tokens( n );
  					n = 0;
  				}
  			} else {
  				indicator = expr.value.head.indicator;
  				if( options.reconsult !== false && reconsulted[indicator] !== true && !thread.is_multifile_predicate( indicator ) ) {
  					thread.session.rules[indicator] = filter( thread.session.rules[indicator] || [], function( rule ) { return rule.dynamic; } );
  					reconsulted[indicator] = true;
  				}
  				var result = thread.add_rule(expr.value, options);
  				n = expr.len;
  			}
  			if(!result) {
  				return result;
  			}
  		} while( true );
  		return true;
  	}
  	
  	// Parse a query
  	function parseQuery(thread, string) {
  		var tokenizer = new Tokenizer( thread );
  		tokenizer.new_text( string );
  		var n = 0;
  		do {
  			var tokens = tokenizer.get_tokens( n );
  			if( tokens === null ) break;
  			var expr = parseExpr(thread, tokens, 0, thread.__get_max_priority(), false);
  			if(expr.type !== ERROR) {
  				var expr_position = expr.len;
  				var tokens_pos = expr_position;
  				if(tokens[expr_position] && tokens[expr_position].name === "atom" && tokens[expr_position].raw === ".") {
  					thread.add_goal( body_conversion(expr.value) );
  				} else {
  					var token = tokens[expr_position];
  					return new Term("throw", [pl.error.syntax(token ? token : tokens[expr_position-1], ". or operator expected", !token)] );
  				}
  				
  				n = expr.len + 1;
  			} else {
  				return new Term("throw", [expr.value]);
  			}
  		} while( true );
  		return true;
  	}
  
  
  	
  	// UTILS
  
  	// Rule to DCG
  	function rule_to_dcg(rule, thread) {
  		rule = rule.rename( thread );
  		var begin = thread.next_free_variable();
  		var dcg = body_to_dcg( rule.body, begin, thread );
  		if( dcg.error ) return dcg.value;
  		rule.body = dcg.value;
  		rule.head.args = rule.head.args.concat([begin,dcg.variable]);
  		rule.head = new Term(rule.head.id, rule.head.args);
  		return rule;
  	}
  
  	// Body to DCG
  	function body_to_dcg(expr, last, thread) {
  		var free;
  		if( pl.type.is_term( expr ) && expr.indicator === "!/0" ) {
  			return {
  				value: expr,
  				variable: last,
  				error: false
  			};
  		} else if( pl.type.is_term( expr ) && expr.indicator === ",/2" ) {
  			var left = body_to_dcg(expr.args[0], last, thread);
  			if( left.error ) return left;
  			var right = body_to_dcg(expr.args[1], left.variable, thread);
  			if( right.error ) return right;
  			return {
  				value: new Term(',', [left.value, right.value]),
  				variable: right.variable,
  				error: false
  			};
  		} else if( pl.type.is_term( expr ) && expr.indicator === "{}/1" ) {
  			return {
  				value: expr.args[0],
  				variable: last,
  				error: false
  			};
  		} else if( pl.type.is_empty_list( expr ) ) {
  			return {
  				value: new Term("true", []),
  				variable: last,
  				error: false
  			};
  		} else if( pl.type.is_list( expr ) ) {
  			free = thread.next_free_variable();
  			var pointer = expr;
  			var prev;
  			while( pointer.indicator === "./2" ) {
  				prev = pointer;
  				pointer = pointer.args[1];
  			}
  			if( pl.type.is_variable( pointer ) ) {
  				return {
  					value: pl.error.instantiation("DCG"),
  					variable: last,
  					error: true
  				};
  			} else if( !pl.type.is_empty_list( pointer ) ) {
  				return {
  					value: pl.error.type("list", expr, "DCG"),
  					variable: last,
  					error: true
  				};
  			} else {
  				prev.args[1] = free;
  				return {
  					value: new Term("=", [last, expr]),
  					variable: free,
  					error: false
  				};
  			}
  		} else if( pl.type.is_callable( expr ) ) {
  			free = thread.next_free_variable();
  			expr.args = expr.args.concat([last,free]);
  			expr = new Term( expr.id, expr.args );
  			return {
  				value: expr,
  				variable: free,
  				error: false
  			};
  		} else {
  			return {
  				value: pl.error.type( "callable", expr, "DCG" ),
  				variable: last,
  				error: true
  			};
  		}
  	}
  	
  	// Body conversion
  	function body_conversion( expr ) {
  		if( pl.type.is_variable( expr ) )
  			return new Term( "call", [expr] );
  		else if( pl.type.is_term( expr ) && [",/2", ";/2", "->/2"].indexOf(expr.indicator) !== -1 )
  			return new Term( expr.id, [body_conversion( expr.args[0] ), body_conversion( expr.args[1] )] );
  		return expr;
  	}
  	
  	// List to Prolog list
  	function arrayToList( array, cons ) {
  		var list = cons ? cons : new pl.type.Term( "[]", [] );
  		for(var i = array.length-1; i >= 0; i-- )
  			list = new pl.type.Term( ".", [array[i], list] );
  		return list;
  	}
  	
  	// Remove element from array
  	function remove( array, element ) {
  		for( var i = array.length - 1; i >= 0; i-- ) {
  			if( array[i] === element ) {
  				array.splice(i, 1);
  			}
  		}
  	}
  	
  	// Remove duplicate elements
  	function nub( array ) {
  		var seen = {};
  		var unique = [];
  		for( var i = 0; i < array.length; i++ ) {
  			if( !(array[i] in seen) ) {
  				unique.push( array[i] );
  				seen[array[i]] = true;
  			}
  		}
  		return unique;
  	}
  	
  	// Retract a rule
  	function retract( thread, point, indicator, rule ) {
  		if( thread.session.rules[indicator] !== null ) {
  			for( var i = 0; i < thread.session.rules[indicator].length; i++ ) {
  				if( thread.session.rules[indicator][i] === rule ) {
  					thread.session.rules[indicator].splice( i, 1 );
  					thread.success( point );
  					break;
  				}
  			}
  		}
  	}
  	
  	// call/n
  	function callN( n ) {
  		return function ( thread, point, atom ) {
  			var closure = atom.args[0], args = atom.args.slice(1, n);
  			if( pl.type.is_variable( closure ) ) {
  				thread.throw_error( pl.error.instantiation( thread.level ) );
  			} else if( !pl.type.is_callable( closure ) ) {
  				thread.throw_error( pl.error.type( "callable", closure, thread.level ) );
  			} else {
  				var goal = new Term( closure.id, closure.args.concat( args ) );
  				thread.prepend( [new State( point.goal.replace( goal ), point.substitution, point )] );
  			}
  		};
  	}
  	
  	// String to indicator
  	function str_indicator( str ) {
  		for( var i = str.length - 1; i >= 0; i-- )
  			if( str.charAt(i) === "/" )
  				return new Term( "/", [new Term( str.substring(0, i) ), new Num( parseInt(str.substring(i+1)), false )] );
  	}
  	
  	
  
  	// PROLOG OBJECTS
  	
  	// Variables
  	function Var( id ) {
  		this.id = id;
  	}
  	
  	// Numbers
  	function Num( value, is_float ) {
  		this.is_float = is_float !== undefined ? is_float : parseInt( value ) !== value;
  		this.value = this.is_float ? value : parseInt( value );
  	}
  	
  	// Terms
  	var term_ref = 0;
  	function Term( id, args, ref ) {
  		this.ref = ref || ++term_ref;
  		this.id = id;
  		this.args = args || [];
  		this.indicator = id + "/" + this.args.length;
  	}
  
  	// Streams
  	var stream_ref = 0;
  	function Stream( stream, mode, alias, type, reposition, eof_action ) {
  		this.id = stream_ref++;
  		this.stream = stream;
  		this.mode = mode; // "read" or "write" or "append"
  		this.alias = alias;
  		this.type = type !== undefined ? type : "text"; // "text" or "binary"
  		this.reposition = reposition !== undefined ? reposition : true; // true or false
  		this.eof_action = eof_action !== undefined ? eof_action : "eof_code"; // "error" or "eof_code" or "reset"
  		this.position = this.mode === "append" ? "end_of_stream" : 0;
  		this.output = this.mode === "write" || this.mode === "append";
  		this.input = this.mode === "read";
  	}
  	
  	// Substitutions
  	function Substitution( links ) {
  		links = links || {};
  		this.links = links;
  	}
  	
  	// States
  	function State( goal, subs, parent ) {
  		subs = subs || new Substitution();
  		parent = parent || null;
  		this.goal = goal;
  		this.substitution = subs;
  		this.parent = parent;
  	}
  	
  	// Rules
  	function Rule( head, body, dynamic ) {
  		this.head = head;
  		this.body = body;
  		this.dynamic = dynamic ? dynamic : false;
  	}
  
  	// Session
  	function Session( limit ) {
  		limit = limit === undefined || limit <= 0 ? 1000 : limit;
  		this.rules = {};
  		this.src_predicates = {};
  		this.rename = 0;
  		this.modules = [];
  		this.thread = new Thread( this );
  		this.total_threads = 1;
  		this.renamed_variables = {};
  		this.public_predicates = {};
  		this.multifile_predicates = {};
  		this.limit = limit;
  		this.streams = {
  			"user_input": new Stream(
  				 true && module.exports ? nodejs_user_input : tau_user_input,
  				"read", "user_input", "text", false, "reset" ),
  			"user_output": new Stream(
  				 true && module.exports ? nodejs_user_output : tau_user_output,
  				"write", "user_output", "text", false, "eof_code" )
  		};
  		this.file_system =  true && module.exports ? nodejs_file_system : tau_file_system;
  		this.standard_input = this.streams["user_input"];
  		this.standard_output = this.streams["user_output"];
  		this.current_input = this.streams["user_input"];
  		this.current_output = this.streams["user_output"];
  		this.format_success = function( state ) { return state.substitution; };
  		this.format_error = function( state ) { return state.goal; };
  		this.flag = {	
  			bounded: pl.flag.bounded.value,
  			max_integer: pl.flag.max_integer.value,
  			min_integer: pl.flag.min_integer.value,
  			integer_rounding_function: pl.flag.integer_rounding_function.value,
  			char_conversion: pl.flag.char_conversion.value,
  			debug: pl.flag.debug.value,
  			max_arity: pl.flag.max_arity.value,
  			unknown: pl.flag.unknown.value,
  			double_quotes: pl.flag.double_quotes.value,
  			occurs_check: pl.flag.occurs_check.value,
  			dialect: pl.flag.dialect.value,
  			version_data: pl.flag.version_data.value,
  			nodejs: pl.flag.nodejs.value
  		};
  		this.__loaded_modules = [];
  		this.__char_conversion = {};
  		this.__operators = {
  			1200: { ":-": ["fx", "xfx"],  "-->": ["xfx"], "?-": ["fx"] },
  			1100: { ";": ["xfy"] },
  			1050: { "->": ["xfy"] },
  			1000: { ",": ["xfy"] },
  			900: { "\\+": ["fy"] },
  			700: {
  				"=": ["xfx"], "\\=": ["xfx"], "==": ["xfx"], "\\==": ["xfx"],
  				"@<": ["xfx"], "@=<": ["xfx"], "@>": ["xfx"], "@>=": ["xfx"],
  				"=..": ["xfx"], "is": ["xfx"], "=:=": ["xfx"], "=\\=": ["xfx"],
  				"<": ["xfx"], "=<": ["xfx"], ">": ["xfx"], ">=": ["xfx"]
  			},
  			600: { ":": ["xfy"] },
  			500: { "+": ["yfx"], "-": ["yfx"], "/\\": ["yfx"], "\\/": ["yfx"] },
  			400: {
  				"*": ["yfx"], "/": ["yfx"], "//": ["yfx"], "rem": ["yfx"],
  				"mod": ["yfx"], "<<": ["yfx"], ">>": ["yfx"]
  			},
  			200: { "**": ["xfx"], "^": ["xfy"], "-": ["fy"], "+": ["fy"], "\\": ["fy"] }
  		};
  	}
  	
  	// Threads
  	function Thread( session ) {
  		this.epoch = Date.now();
  		this.session = session;
  		this.session.total_threads++;
  		this.total_steps = 0;
  		this.cpu_time = 0;
  		this.cpu_time_last = 0;
  		this.points = [];
  		this.debugger = false;
  		this.debugger_states = [];
  		this.level = "top_level/0";
  		this.__calls = [];
  		this.current_limit = this.session.limit;
  		this.warnings = [];
  	}
  	
  	// Modules
  	function Module( id, rules, exports ) {
  		this.id = id;
  		this.rules = rules;
  		this.exports = exports;
  		pl.module[id] = this;
  	}
  	
  	Module.prototype.exports_predicate = function( indicator ) {
  		return this.exports.indexOf( indicator ) !== -1;
  	};
  
  
  
  	// UNIFY PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.unify = function( obj, occurs_check ) {
  		if( occurs_check && indexOf( obj.variables(), this.id ) !== -1 && !pl.type.is_variable( obj ) ) {
  			return null;
  		}
  		var links = {};
  		links[this.id] = obj;
  		return new Substitution( links );
  	};
  	
  	// Numbers
  	Num.prototype.unify = function( obj, _ ) {
  		if( pl.type.is_number( obj ) && this.value === obj.value && this.is_float === obj.is_float ) {
  			return new Substitution();
  		}
  		return null;
  	};
  	
  	// Terms
  	Term.prototype.unify = function( obj, occurs_check ) {
  		if( pl.type.is_term( obj ) && this.indicator === obj.indicator ) {
  			var subs = new Substitution();
  			for( var i = 0; i < this.args.length; i++ ) {
  				var mgu = pl.unify( this.args[i].apply( subs ), obj.args[i].apply( subs ), occurs_check );
  				if( mgu === null )
  					return null;
  				for( var x in mgu.links )
  					subs.links[x] = mgu.links[x];
  				subs = subs.apply( mgu );
  			}
  			return subs;
  		}
  		return null;
  	};
  
  	// Streams
  	Stream.prototype.unify = function( obj, occurs_check ) {
  		if( pl.type.is_stream( obj ) && this.id === obj.id ) {
  			return new Substitution();
  		}
  		return null;
  	};
  	
  	
  
  	// PROLOG OBJECTS TO STRING
  	
  	// Variables
  	Var.prototype.toString = function( _ ) {
  		return this.id;
  	};
  	
  	// Numbers
  	Num.prototype.toString = function( _ ) {
  		return this.is_float && indexOf(this.value.toString(), ".") === -1 ? this.value + ".0" : this.value.toString();
  	};
  	
  	// Terms
  	Term.prototype.toString = function( options, priority, from ) {
  		options = !options ? {} : options;
  		options.quoted = options.quoted === undefined ? true: options.quoted;
  		options.ignore_ops = options.ignore_ops === undefined ? false : options.ignore_ops;
  		options.numbervars = options.numbervars === undefined ? false : options.numbervars;
  		priority = priority === undefined ? 1200 : priority;
  		from = from === undefined ? "" : from;
  		if( options.numbervars && this.indicator === "$VAR/1" && pl.type.is_integer( this.args[0] ) && this.args[0].value >= 0 ) {
  			var i = this.args[0].value;
  			var number = Math.floor( i/26 );
  			var letter =  i % 26;
  			return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[letter] + (number !== 0 ? number : "");
  		}
  		switch( this.indicator ){
  			case "[]/0":
  			case "{}/0":
  			case "!/0":
  				return this.id;
  			case "{}/1":
  				return "{" + this.args[0].toString( options ) + "}";
  			case "./2":
  				var list = "[" + this.args[0].toString( options );
  				var pointer = this.args[1];
  				while( pointer.indicator === "./2" ) {
  					list += ", " + pointer.args[0].toString( options );
  					pointer = pointer.args[1];
  				}
  				if( pointer.indicator !== "[]/0" ) {
  					list += "|" + pointer.toString( options );
  				}
  				list += "]";
  				return list;
  			case ",/2":
  				return "(" + this.args[0].toString( options ) + ", " + this.args[1].toString( options ) + ")";
  			default:
  				var id = this.id;
  				var operator = options.session ? options.session.lookup_operator( this.id, this.args.length ) : null;
  				if( options.session === undefined || options.ignore_ops || operator === null ) {
  					if( options.quoted && ! /^(!|,|;|[a-z][0-9a-zA-Z_]*)$/.test( id ) && id !== "{}" && id !== "[]" )
  						id = "'" + redoEscape(id) + "'";
  					return id + (this.args.length ? "(" + map( this.args,
  						function(x) { return x.toString( options); }
  					).join(", ") + ")" : "");
  				} else {
  					var cond = operator.priority > priority.priority || operator.priority === priority.priority && (
  						operator.class === "xfy" && this.indicator !== priority.indicator ||
  						operator.class === "yfx" && this.indicator !== priority.indicator ||
  						this.indicator === priority.indicator && operator.class === "yfx" && from === "right" ||
  						this.indicator === priority.indicator && operator.class === "xfy" && from === "left");
  					operator.indicator = this.indicator;
  					var lpar = cond ? "(" : "";
  					var rpar = cond ? ")" : "";
  					if( this.args.length === 0 ) {
  						return "(" + this.id + ")";
  					} else if( ["fy","fx"].indexOf( operator.class) !== -1 ) {
  						return lpar + id + " " + this.args[0].toString( options, operator ) + rpar;
  					} else if( ["yf","xf"].indexOf( operator.class) !== -1 ) {
  						return lpar + this.args[0].toString( options, operator ) + " " + id + rpar;
  					} else {
  						return lpar + this.args[0].toString( options, operator, "left" ) + " " + this.id + " " + this.args[1].toString( options, operator, "right" ) +  rpar;
  					}
  				}
  		}
  	};
  
  	// Streams
  	Stream.prototype.toString = function( _ ) {
  		return "<stream>(" + this.id + ")";
  	};
  	
  	// Substitutions
  	Substitution.prototype.toString = function( options ) {
  		var str = "{";
  		for( var link in this.links ) {
  			if(!this.links.hasOwnProperty(link)) continue;
  			if( str !== "{" ) {
  				str += ", ";
  			}
  			str += link + "/" + this.links[link].toString( options );
  		}
  		str += "}";
  		return str;
  	};
  	
  	// States
  	State.prototype.toString = function( options ) {
  		if( this.goal === null ) {
  			return "<" + this.substitution.toString( options ) + ">";
  		} else {
  			return "<" + this.goal.toString( options ) + ", " + this.substitution.toString( options ) + ">";
  		}
  	};
  	
  	// Rules
  	Rule.prototype.toString = function( options ) {
  		if( !this.body ) {
  			return this.head.toString( options ) + ".";
  		} else {
  			return this.head.toString( options ) + " :- " + this.body.toString( options ) + ".";
  		}
  	};
  	
  	// Session
  	Session.prototype.toString = function( options ) {
  		var str = "";
  		for(var i = 0; i < this.modules.length; i++) {
  			str += ":- use_module(library(" + this.modules[i] + ")).\n";
  		}
  		str += "\n";
  		for(key in this.rules) {
  			for(i = 0; i < this.rules[key].length; i++) {
  				str += this.rules[key][i].toString( options );
  				str += "\n";
  			}
  		}
  		return str;
  	};
  	
  	
  	
  	// CLONE PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.clone = function() {
  		return new Var( this.id );
  	};
  	
  	// Numbers
  	Num.prototype.clone = function() {
  		return new Num( this.value, this.is_float );
  	};
  	
  	// Terms
  	Term.prototype.clone = function() {
  		return new Term( this.id, map( this.args, function( arg ) {
  			return arg.clone();
  		} ) );
  	};
  
  	// Streams
  	Stream.prototype.clone = function() {
  		return new Stram( this.stream, this.mode, this.alias, this.type, this.reposition, this.eof_action );
  	};
  	
  	// Substitutions
  	Substitution.prototype.clone = function() {
  		var links = {};
  		for( var link in this.links ) {
  			if(!this.links.hasOwnProperty(link)) continue;
  			links[link] = this.links[link].clone();
  		}
  		return new Substitution( links );
  	};
  	
  	// States
  	State.prototype.clone = function() {
  		return new State( this.goal.clone(), this.substitution.clone(), this.parent );
  	};
  	
  	// Rules
  	Rule.prototype.clone = function() {
  		return new Rule( this.head.clone(), this.body !== null ? this.body.clone() : null );
  	};
  	
  	
  	
  	// COMPARE PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.equals = function( obj ) {
  		return pl.type.is_variable( obj ) && this.id === obj.id;
  	};
  	
  	// Numbers
  	Num.prototype.equals = function( obj ) {
  		return pl.type.is_number( obj ) && this.value === obj.value && this.is_float === obj.is_float;
  	};
  	
  	// Terms
  	Term.prototype.equals = function( obj ) {
  		if( !pl.type.is_term( obj ) || this.indicator !== obj.indicator ) {
  			return false;
  		}
  		for( var i = 0; i < this.args.length; i++ ) {
  			if( !this.args[i].equals( obj.args[i] ) ) {
  				return false;
  			}
  		}
  		return true;
  	};
  
  	// Streams
  	Stream.prototype.equals = function( obj ) {
  		return pl.type.is_stream( obj ) && this.id === obj.id;
  	};
  	
  	// Substitutions
  	Substitution.prototype.equals = function( obj ) {
  	var link;
  		if( !pl.type.is_substitution( obj ) ) {
  			return false;
  		}
  		for( link in this.links ) {
  			if(!this.links.hasOwnProperty(link)) continue;
  			if( !obj.links[link] || !this.links[link].equals( obj.links[link] ) ) {
  				return false;
  			}
  		}
  		for( link in obj.links ) {
  			if(!obj.links.hasOwnProperty(link)) continue;
  			if( !this.links[link] ) {
  				return false;
  			}
  		}
  		return true;
  	};
  	
  	// States
  	State.prototype.equals = function( obj ) {
  		return pl.type.is_state( obj ) && this.goal.equals( obj.goal ) && this.substitution.equals( obj.substitution ) && this.parent === obj.parent;
  	};
  	
  	// Rules
  	Rule.prototype.equals = function( obj ) {
  		return pl.type.is_rule( obj ) && this.head.equals( obj.head ) && (this.body === null && obj.body === null || this.body !== null && this.body.equals( obj.body ));
  	};
  	
  	
  	
  	// RENAME VARIABLES OF PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.rename = function( thread ) {
  		return thread.get_free_variable( this );
  	};
  	
  	// Numbers
  	Num.prototype.rename = function( _ ) {
  		return this;
  	};
  	
  	// Terms
  	Term.prototype.rename = function( thread ) {
  		return new Term( this.id, map( this.args, function( arg ) {
  			return arg.rename( thread );
  		} ) );
  	};
  
  	// Streams
  	Stream.prototype.rename = function( thread ) {
  		return this;
  	};
  	
  	// Rules
  	Rule.prototype.rename = function( thread ) {
  		return new Rule( this.head.rename( thread ), this.body !== null ? this.body.rename( thread ) : null );
  	};
  	
  	
  	
  	// GET VARIABLES FROM PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.variables = function() {
  		return [this.id];
  	};
  	
  	// Numbers
  	Num.prototype.variables = function() {
  		return [];
  	};
  	
  	// Terms
  	Term.prototype.variables = function() {
  		return [].concat.apply( [], map( this.args, function( arg ) {
  			return arg.variables();
  		} ) );
  	};
  
  	// Streams
  	Stream.prototype.variables = function() {
  		return [];
  	};
  	
  	// Rules
  	Rule.prototype.variables = function() {
  		if( this.body === null ) {
  			return this.head.variables();
  		} else {
  			return this.head.variables().concat( this.body.variables() );
  		}
  	};
  	
  	
  	
  	// APPLY SUBSTITUTIONS TO PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.apply = function( subs ) {
  		if( subs.lookup( this.id ) ) {
  			return subs.lookup( this.id );
  		}
  		return this;
  	};
  	
  	// Numbers
  	Num.prototype.apply = function( _ ) {
  		return this;
  	};
  	
  	// Terms
  	Term.prototype.apply = function( subs ) {
  		if( this.indicator === "./2" ) {
  			var arr = [];
  			var pointer = this;
  			while( pointer.indicator === "./2" ) {
  				arr.push( pointer.args[0].apply( subs ) );
  				pointer = pointer.args[1];
  			}
  			var list = pointer.apply( subs );
  			for(var i = arr.length-1; i >= 0; i--) {
  				list = new Term( ".", [arr[i], list] );
  			}
  			return list;
  		}
  		return new Term( this.id, map( this.args, function( arg ) {
  			return arg.apply( subs );
  		} ), this.ref );
  	};
  
  	// Streams
  	Stream.prototype.apply = function( _ ) {
  		return this;
  	};
  	
  	// Rules
  	Rule.prototype.apply = function( subs ) {
  		return new Rule( this.head.apply( subs ), this.body !== null ? this.body.apply( subs ) : null );
  	};
  	
  	// Substitutions
  	Substitution.prototype.apply = function( subs ) {
  		var link, links = {};
  		for( link in this.links ) {
  			if(!this.links.hasOwnProperty(link)) continue;
  			links[link] = this.links[link].apply(subs);
  		}
  		return new Substitution( links );
  	};
  	
  	
  	
  	// SELECTION FUNCTION
  	
  	// Select term
  	Term.prototype.select = function() {
  		var pointer = this;
  		while( pointer.indicator === ",/2" )
  			pointer = pointer.args[0];
  		return pointer;
  	};
  	
  	// Replace term
  	Term.prototype.replace = function( expr ) {
  		if( this.indicator === ",/2" ) {
  			if( this.args[0].indicator === ",/2" ) {
  				return new Term( ",", [this.args[0].replace( expr ), this.args[1]] );
  			} else {
  				return expr === null ? this.args[1] : new Term( ",", [expr, this.args[1]] );
  			}
  		} else {
  			return expr;
  		}
  	};
  
  	// Search term
  	Term.prototype.search = function( expr ) {
  		if( pl.type.is_term( expr ) && expr.ref !== undefined && this.ref === expr.ref )
  			return true;
  		for( var i = 0; i < this.args.length; i++ )
  			if( pl.type.is_term( this.args[i] ) && this.args[i].search( expr ) )
  				return true;
  		return false;
  	};
  	
  	
  	
  	// PROLOG SESSIONS AND THREADS
  
  	// Get current input
  	Session.prototype.get_current_input = function() {
  		return this.current_input;
  	};
  	Thread.prototype.get_current_input = function() {
  		return this.session.get_current_input();
  	};
  
  	// Get current output
  	Session.prototype.get_current_output = function() {
  		return this.current_output;
  	};
  	Thread.prototype.get_current_output = function() {
  		return this.session.get_current_output();
  	};
  
  	// Set current input
  	Session.prototype.set_current_input = function( input ) {
  		this.current_input = input;
  	};
  	Thread.prototype.set_current_input = function( input ) {
  		return this.session.set_current_input( input );
  	};
  
  	// Set current output
  	Session.prototype.set_current_output = function( output ) {
  		this.current_input = output;
  	};
  	Thread.prototype.set_current_output = function( output ) {
  		return this.session.set_current_output( output);
  	};
  
  	// Get stream by alias
  	Session.prototype.get_stream_by_alias = function( alias ) {
  		return this.streams[alias];
  	};
  	Thread.prototype.get_stream_by_alias = function( alias ) {
  		return this.session.get_stream_by_alias( alias );
  	};
  
  	// Open file
  	Session.prototype.file_system_open = function( path, type, mode ) {
  		return this.file_system.open( path, type, mode );
  	};
  	Thread.prototype.file_system_open = function( path, type, mode ) {
  		return this.session.file_system_open( path, type, mode );
  	};
  
  	// Get conversion of the char
  	Session.prototype.get_char_conversion = function( char ) {
  		return this.__char_conversion[char] || char;
  	};
  	Thread.prototype.get_char_conversion = function( char ) {
  		return this.session.get_char_conversion( char );
  	};
  	
  	// Parse an expression
  	Session.prototype.parse = function( string ) {
  		return this.thread.parse( string );
  	};
  	Thread.prototype.parse = function( string ) {
  		var tokenizer = new Tokenizer( this );
  		tokenizer.new_text( string );
  		var tokens = tokenizer.get_tokens();
  		if( tokens === null )
  			return false;
  		var expr = parseExpr(this, tokens, 0, this.__get_max_priority(), false);
  		if( expr.len !== tokens.length )
  			return false;
  		return { value: expr.value, expr: expr, tokens: tokens };
  	};
  	
  	// Get flag value
  	Session.prototype.get_flag = function( flag ) {
  		return this.flag[flag];
  	};
  	Thread.prototype.get_flag = function( flag ) {
  		return this.session.get_flag( flag );
  	};
  
  	// Add a rule
  	Session.prototype.add_rule = function( rule, options ) {
  		options = options ? options : {};
  		options.from = options.from ? options.from : "$tau-js";
  		this.src_predicates[rule.head.indicator] = options.from;
  		if(!this.rules[rule.head.indicator]) {
  			this.rules[rule.head.indicator] = [];
  		}
  		this.rules[rule.head.indicator].push(rule);
  		if( !this.public_predicates.hasOwnProperty( rule.head.indicator ) )
  			this.public_predicates[rule.head.indicator] = false;
  		return true;
  	};
  	Thread.prototype.add_rule = function( rule, options ) {
  		return this.session.add_rule( rule, options );
  	};
  
  	// Run a directive
  	Session.prototype.run_directive = function( directive ) {
  		this.thread.run_directive( directive );
  	};
  	Thread.prototype.run_directive = function( directive ) {
  		if( pl.type.is_directive( directive ) ) {
  			pl.directive[directive.indicator]( this, directive );
  			return true;
  		}
  		return false;
  	};
  	
  	// Get maximum priority of the operators
  	Session.prototype.__get_max_priority = function() {
  		return "1200";
  	};
  	Thread.prototype.__get_max_priority = function() {
  		return this.session.__get_max_priority();
  	};
  	
  	// Get next priority of the operators
  	Session.prototype.__get_next_priority = function( priority ) {
  		var max = 0;
  		priority = parseInt( priority );
  		for( var key in this.__operators ) {
  			if( !this.__operators.hasOwnProperty(key) ) continue;
  			var n = parseInt(key);
  			if( n > max && n < priority ) max = n;
  		}
  		return max.toString();
  	};
  	Thread.prototype.__get_next_priority = function( priority ) {
  		return this.session.__get_next_priority( priority );
  	};
  	
  	// Get classes of an operator
  	Session.prototype.__lookup_operator_classes = function( priority, operator ) {
  		if( this.__operators.hasOwnProperty( priority ) && this.__operators[priority][operator] instanceof Array ) {
  			return this.__operators[priority][operator]  || false;
  		}
  		return false;
  	};
  	Thread.prototype.__lookup_operator_classes = function( priority, operator ) {
  		return this.session.__lookup_operator_classes( priority, operator );
  	};
  
  	// Get operator
  	Session.prototype.lookup_operator = function( name, arity ) {
  		for(var p in this.__operators)
  			if(this.__operators[p][name])
  				for(var i = 0; i < this.__operators[p][name].length; i++)
  					if( arity === 0 || this.__operators[p][name][i].length === arity+1 )
  						return {priority: p, class: this.__operators[p][name][i]};
  		return null;
  	}
  	Thread.prototype.lookup_operator = function( name, arity ) {
  		return this.session.lookup_operator( name, arity );
  	}
  	
  	// Throw a warning
  	Session.prototype.throw_warning = function( warning ) {
  		this.thread.throw_warning( warning );
  	};
  	Thread.prototype.throw_warning = function( warning ) {
  		this.warnings.push( warning );
  	};
  	
  	// Get warnings
  	Session.prototype.get_warnings = function() {
  		return this.thread.get_warnings();
  	};
  	Thread.prototype.get_warnings = function() {
  		return this.warnings;
  	};
  
  	// Add a goal
  	Session.prototype.add_goal = function( goal, unique ) {
  		this.thread.add_goal( goal, unique );
  	};
  	Thread.prototype.add_goal = function( goal, unique, parent ) {
  		parent = parent ? parent : null;
  		if( unique === true )
  			this.points = [];
  		var vars = goal.variables();
  		var links = {};
  		for( var i = 0; i < vars.length; i++ )
  			links[vars[i]] = new Var(vars[i]);
  		this.points.push( new State( goal, new Substitution(links), parent ) );
  	};
  
  	// Consult a program from a string
  	Session.prototype.consult = function( program, options ) {
  		return this.thread.consult( program, options );
  	};
  	Thread.prototype.consult = function( program, options ) {
  		var string = "";
  		if( typeof program === "string" ) {
  			string = program;
  			var len = string.length;
  			if( string.substring( len-3, len ) === ".pl" && document.getElementById( string ) ) {
  				var script = document.getElementById( string );
  				var type = script.getAttribute( "type" );
  				if( type !== null && type.replace( / /g, "" ).toLowerCase() === "text/prolog" ) {
  					string = script.text;
  				}
  			}
  		} else if( program.nodeName ) {
  			switch( program.nodeName.toLowerCase() ) {
  				case "input":
  				case "textarea":
  					string = program.value;
  					break;
  				default:
  					string = program.innerHTML;
  					break;
  			}
  		} else {
  			return false;
  		}
  		this.warnings = [];
  		return parseProgram( this, string, options );
  	};
  
  	// Query goal from a string (without ?-)
  	Session.prototype.query = function( string ) {
  		return this.thread.query( string );
  	};
  	Thread.prototype.query = function( string ) {
  		this.points = [];
  		this.debugger_points = [];
  		return parseQuery( this, string );
  	};
  	
  	// Get first choice point
  	Session.prototype.head_point = function() {
  		return this.thread.head_point();
  	};
  	Thread.prototype.head_point = function() {
  		return this.points[this.points.length-1];
  	};
  	
  	// Get free variable
  	Session.prototype.get_free_variable = function( variable ) {
  		return this.thread.get_free_variable( variable );
  	};
  	Thread.prototype.get_free_variable = function( variable ) {
  		var variables = [];
  		if( variable.id === "_" || this.session.renamed_variables[variable.id] === undefined ) {
  			this.session.rename++;
  			if( this.points.length > 0 )
  				variables = this.head_point().substitution.domain();
  			while( indexOf( variables, pl.format_variable( this.session.rename ) ) !== -1 ) {
  				this.session.rename++;
  			}
  			if( variable.id === "_" ) {
  				return new Var( pl.format_variable( this.session.rename ) );
  			} else {
  				this.session.renamed_variables[variable.id] = pl.format_variable( this.session.rename );
  			}
  		}
  		return new Var( this.session.renamed_variables[variable.id] );
  	};
  	
  	// Get next free variable
  	Session.prototype.next_free_variable = function() {
  		return this.thread.next_free_variable();
  	};
  	Thread.prototype.next_free_variable = function() {
  		this.session.rename++;
  		var variables = [];
  		if( this.points.length > 0 )
  			variables = this.head_point().substitution.domain();
  		while( indexOf( variables, pl.format_variable( this.session.rename ) ) !== -1 ) {
  			this.session.rename++;
  		}
  		return new Var( pl.format_variable( this.session.rename ) );
  	};
  	
  	// Check if a predicate is public
  	Session.prototype.is_public_predicate = function( indicator ) {
  		return !this.public_predicates.hasOwnProperty( indicator ) || this.public_predicates[indicator] === true;
  	};
  	Thread.prototype.is_public_predicate = function( indicator ) {
  		return this.session.is_public_predicate( indicator );
  	};
  	
  	// Check if a predicate is multifile
  	Session.prototype.is_multifile_predicate = function( indicator ) {
  		return this.multifile_predicates.hasOwnProperty( indicator ) && this.multifile_predicates[indicator] === true;
  	};
  	Thread.prototype.is_multifile_predicate = function( indicator ) {
  		return this.session.is_multifile_predicate( indicator );
  	};
  	
  	// Insert states at the beginning
  	Session.prototype.prepend = function( states ) {
  		return this.thread.prepend( states );
  	};
  	Thread.prototype.prepend = function( states ) {
  		for(var i = states.length-1; i >= 0; i--)
  			this.points.push( states[i] );
  	};
  	
  	// Remove the selected term and prepend the current state
  	Session.prototype.success = function( point, parent ) {
  		return this.thread.success( point, parent );
  	}
  	Thread.prototype.success = function( point, parent ) {
  		var parent = typeof parent === "undefined" ? point : parent;
  		this.prepend( [new State( point.goal.replace( null ), point.substitution, parent ) ] );
  	};
  	
  	// Throw error
  	Session.prototype.throw_error = function( error ) {
  		return this.thread.throw_error( error );
  	};
  	Thread.prototype.throw_error = function( error ) {
  		this.prepend( [new State( new Term( "throw", [error] ), new Substitution(), null, null )] );
  	};
  	
  	// Selection rule
  	Session.prototype.step_rule = function( mod, atom ) {
  		return this.thread.step_rule( mod, atom );
  	}
  	Thread.prototype.step_rule = function( mod, atom ) {
  		var name = atom.indicator;
  		if( mod === "user" )
  			mod = null;
  		if( mod === null && this.session.rules.hasOwnProperty(name) )
  			return this.session.rules[name];
  		var modules = mod === null ? this.session.modules : (indexOf(this.session.modules, mod) === -1 ? [] : [mod]);
  		for( var i = 0; i < modules.length; i++ ) {
  			var module = pl.module[modules[i]];
  			if( module.rules.hasOwnProperty(name) && (module.rules.hasOwnProperty(this.level) || module.exports_predicate(name)) )
  				return pl.module[modules[i]].rules[name];
  		}
  		return null;
  	};
  	
  	// Resolution step
  	Session.prototype.step = function() {
  		return this.thread.step();
  	}
  	Thread.prototype.step = function() {
  		if( this.points.length === 0 ) {
  			return;
  		}
  		var asyn = false;
  		var point = this.points.pop();
  		
  		if( this.debugger )
  			this.debugger_states.push( point );
  		
  		if( pl.type.is_term( point.goal ) ) {
  			
  			var atom = point.goal.select();
  			var mod = null;
  			var states = [];
  			if( atom !== null ) {
  
  				this.total_steps++;
  				var level = point;
  				while( level.parent !== null && level.parent.goal.search( atom ) )
  					level = level.parent;
  				this.level = level.parent === null ? "top_level/0" : level.parent.goal.select().indicator;
  				
  				if( pl.type.is_term( atom ) && atom.indicator === ":/2" ) {
  					mod = atom.args[0].id;
  					atom = atom.args[1];
  				}
  
  				if( mod === null && pl.type.is_builtin( atom ) ) {
  					this.__call_indicator = atom.indicator;
  					asyn = pl.predicate[atom.indicator]( this, point, atom );
  				} else {
  					var srule = this.step_rule(mod, atom);
  					if( srule === null ) {
  						if( !this.session.rules.hasOwnProperty( atom.indicator ) ) {
  							if( this.get_flag( "unknown" ).id === "error" ) {
  								this.throw_error( pl.error.existence( "procedure", atom.indicator, this.level ) );
  							} else if( this.get_flag( "unknown" ).id === "warning" ) {
  								this.throw_warning( "unknown procedure " + atom.indicator + " (from " + this.level + ")" );
  							}
  						}
  					} else if( srule instanceof Function ) {
  						asyn = srule( this, point, atom );
  					} else {
  						for( var _rule in srule ) {
  							if(!srule.hasOwnProperty(_rule)) continue;
  							var rule = srule[_rule];
  							this.session.renamed_variables = {};
  							rule = rule.rename( this );
  							var occurs_check = this.get_flag( "occurs_check" ).indicator === "true/0";
  							var state = new State();
  							var mgu = pl.unify( atom, rule.head, occurs_check );
  							if( mgu !== null ) {
  								state.goal = point.goal.replace( rule.body );
  								if( state.goal !== null ) {
  									state.goal = state.goal.apply( mgu );
  								}
  								state.substitution = point.substitution.apply( mgu );
  								state.parent = point;
  								states.push( state );
  							}
  						}
  						this.prepend( states );
  					}
  				}
  			}
  		} else if( pl.type.is_variable( point.goal ) ) {
  			this.throw_error( pl.error.instantiation( this.level ) );
  		} else {
  			this.throw_error( pl.error.type( "callable", point.goal, this.level ) );
  		}
  		return asyn;
  	};
  	
  	// Find next computed answer
  	Session.prototype.answer = function( success ) {
  		return this.thread.answer( success );
  	}
  	Thread.prototype.answer = function( success ) {
  		success = success || function( _ ) { };
  		this.__calls.push( success );
  		if( this.__calls.length > 1 ) {
  			return;
  		}
  		this.again();
  	};
  	
  	// Find all computed answers
  	Session.prototype.answers = function( callback, max, after ) {
  		return this.thread.answers( callback, max, after );
  	}
  	Thread.prototype.answers = function( callback, max, after ) {
  		var answers = max || 1000;
  		var thread = this;
  		if( max <= 0 ) {
  			if(after)
  				after();
  			return;
  		}
  		this.answer( function( answer ) {
  			callback( answer );
  			if( answer !== false ) {
  				setTimeout( function() {
  					thread.answers( callback, max-1, after );
  				}, 1 );
  			} else if(after) {
  				after();
  			}
  		} );
  	};
  
  	// Again finding next computed answer
  	Session.prototype.again = function( reset_limit ) {
  		return this.thread.again( reset_limit );
  	};
  	Thread.prototype.again = function( reset_limit ) {
  		var answer;
  		var t0 = Date.now();
  		while( this.__calls.length > 0 ) {
  			this.warnings = [];
  			if( reset_limit !== false )
  				this.current_limit = this.session.limit;
  			while( this.current_limit > 0 && this.points.length > 0 && this.head_point().goal !== null && !pl.type.is_error( this.head_point().goal ) ) {
  				this.current_limit--;
  				if( this.step() === true ) {
  					return;
  				}
  			}
  			var t1 = Date.now();
  			this.cpu_time_last = t1-t0;
  			this.cpu_time += this.cpu_time_last;
  			var success = this.__calls.shift();
  			if( this.current_limit <= 0 ) {
  				success( null );
  			} else if( this.points.length === 0 ) {
  				success( false );
  			} else if( pl.type.is_error( this.head_point().goal ) ) {
  				answer = this.session.format_error( this.points.pop() );
  				this.points = [];
  				success( answer );
  			} else {
  				if( this.debugger )
  					this.debugger_states.push( this.head_point() );
  				answer = this.session.format_success( this.points.pop() );
  				success( answer );
  			}
  		}
  	};
  	
  	// Unfolding transformation
  	Session.prototype.unfold = function( rule ) {
  		if(rule.body === null)
  			return false;
  		var head = rule.head;
  		var body = rule.body;
  		var atom = body.select();
  		var thread = new Thread( this );
  		var unfolded = [];
  		thread.add_goal( atom );
  		thread.step();
  		for( var i = thread.points.length-1; i >= 0; i-- ) {
  			var point = thread.points[i];
  			var head2 = head.apply( point.substitution );
  			var body2 = body.replace( point.goal );
  			if( body2 !== null )
  				body2 = body2.apply( point.substitution );
  			unfolded.push( new Rule( head2, body2 ) );
  		}
  		var rules = this.rules[head.indicator];
  		var index = indexOf( rules, rule );
  		if( unfolded.length > 0 && index !== -1 ) {
  			rules.splice.apply( rules, [index, 1].concat(unfolded) );
  			return true;
  		}
  		return false;
  	};
  	Thread.prototype.unfold = function(rule) {
  		return this.session.unfold(rule);
  	};
  
  	
  	
  	// INTERPRET EXPRESSIONS
  	
  	// Variables
  	Var.prototype.interpret = function( thread ) {
  		return pl.error.instantiation( thread.level );
  	};
  	
  	// Numbers
  	Num.prototype.interpret = function( thread ) {
  		return this;
  	};
  	
  	// Terms
  	Term.prototype.interpret = function( thread ) {
  		if( pl.type.is_unitary_list( this ) ) {
  			return this.args[0].interpret( thread );
  		} else {
  			return pl.operate( thread, this );
  		}
  	};
  	
  	
  	
  	// COMPARE PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.compare = function( obj ) {
  		if( this.id < obj.id ) {
  			return -1;
  		} else if( this.id > obj.id ) {
  			return 1;
  		} else {
  			return 0;
  		}
  	};
  	
  	// Numbers
  	Num.prototype.compare = function( obj ) {
  		if( this.value === obj.value && this.is_float === obj.is_float ) {
  			return 0;
  		} else if( this.value < obj.value || this.value === obj.value && this.is_float && !obj.is_float ) {
  			return -1;
  		} else if( this.value > obj.value ) {
  			return 1;
  		}
  	};
  	
  	// Terms
  	Term.prototype.compare = function( obj ) {
  		if( this.args.length < obj.args.length || this.args.length === obj.args.length && this.id < obj.id ) {
  			return -1;
  		} else if( this.args.length > obj.args.length || this.args.length === obj.args.length && this.id > obj.id ) {
  			return 1;
  		} else {
  			for( var i = 0; i < this.args.length; i++ ) {
  				var arg = pl.compare( this.args[i], obj.args[i] );
  				if( arg !== 0 ) {
  					return arg;
  				}
  			}
  			return 0;
  		}
  	};
  	
  
  	
  	// SUBSTITUTIONS
  	
  	// Lookup variable
  	Substitution.prototype.lookup = function( variable ) {
  		if( this.links[variable] ) {
  			return this.links[variable];
  		} else {
  			return null;
  		}
  	};
  	
  	// Filter variables
  	Substitution.prototype.filter = function( predicate ) {
  		var links = {};
  		for( var id in this.links ) {
  			if(!this.links.hasOwnProperty(id)) continue;
  			var value = this.links[id];
  			if( predicate( id, value ) ) {
  				links[id] = value;
  			}
  		}
  		return new Substitution( links );
  	};
  	
  	// Exclude variables
  	Substitution.prototype.exclude = function( variables ) {
  		var links = {};
  		for( var variable in this.links ) {
  			if(!this.links.hasOwnProperty(variable)) continue;
  			if( indexOf( variables, variable ) === -1 ) {
  				links[variable] = this.links[variable];
  			}
  		}
  		return new Substitution( links );
  	};
  	
  	// Add link
  	Substitution.prototype.add = function( variable, value ) {
  		this.links[variable] = value;
  	};
  	
  	// Get domain
  	Substitution.prototype.domain = function( plain ) {
  		var f = plain === true ? function(x){return x;} : function(x){return new Var(x);};
  		var vars = [];
  		for( var x in this.links )
  			vars.push( f(x) );
  		return vars;
  	};
  	
  	
  	
  	// GENERATE JAVASCRIPT CODE FROM PROLOG OBJECTS
  	
  	// Variables
  	Var.prototype.compile = function() {
  		return 'new pl.type.Var("' + this.id.toString() + '")';
  	};
  	
  	// Numbers
  	Num.prototype.compile = function() {
  		return 'new pl.type.Num(' + this.value.toString() + ', ' + this.is_float.toString() + ')';
  	};
  	
  	// Terms
  	Term.prototype.compile = function() {
  		return 'new pl.type.Term("' + this.id.replace(/"/g, '\\"') + '", [' + map( this.args, function( arg ) {
  			return arg.compile();
  		} ) + '])';
  	};
  	
  	// Rules
  	Rule.prototype.compile = function() {
  		return 'new pl.type.Rule(' + this.head.compile() + ', ' + (this.body === null ? 'null' : this.body.compile()) + ')';
  	};
  	
  	// Sessions
  	Session.prototype.compile = function() {
  		var str, obj = [], rules;
  		for( var _indicator in this.rules ) {
  			if(!this.rules.hasOwnProperty(_indicator)) continue;
  			var indicator = this.rules[_indicator];
  			rules = [];
  			str = "\"" + _indicator + "\": [";
  			for( var i = 0; i < indicator.length; i++ ) {
  				rules.push( indicator[i].compile() );
  			}
  			str += rules.join();
  			str += "]";
  			obj.push( str );
  		}
  		return "{" + obj.join() + "};";
  	};
  	
  	
  	
  	// PROLOG TO JAVASCRIPT
  	Var.prototype.toJavaScript = function() {
  		return undefined;
  	};
  	
  	// Numbers
  	Num.prototype.toJavaScript = function() {
  		return this.value;
  	};
  	
  	// Terms
  	Term.prototype.toJavaScript = function() {
  		if( this.args.length === 0 && this.indicator !== "[]/0" ) {
  			return this.id;
  		} else if( pl.type.is_list( this ) ) {
  			var arr = [];
  			var pointer = this;
  			var value;
  			while( pointer.indicator === "./2" ) {
  				value = pointer.args[0].toJavaScript();
  				if( value === undefined )
  					return undefined;
  				arr.push( value );
  				pointer = pointer.args[1];
  			}
  			if( pointer.indicator === "[]/0" )
  				return arr;
  		}
  		return undefined;
  	};
  	
  	
  	
  	// RULES
  	
  	// Return singleton variables in the session
  	Rule.prototype.singleton_variables = function() {
  		var variables = this.head.variables();
  		var count = {};
  		var singleton = [];
  		if( this.body !== null )
  			variables = variables.concat( this.body.variables() );
  		for( var i = 0; i < variables.length; i++ ) {
  			if( count[variables[i]] === undefined )
  				count[variables[i]] = 0;
  			count[variables[i]]++;
  		}
  		for( var key in count )
  			if( key !== "_" && count[key] === 1 )
  				singleton.push( key );
  		return singleton;
  	};
  	
  	
  	
  	// PROLOG
  
  	var pl = {
  		
  		// Environment
  		__env:  true && module.exports ? global : window,
  		
  		// Modules
  		module: {},
  		
  		// Version
  		version: version,
  		
  		// Parser
  		parser: {
  			tokenizer: Tokenizer,
  			expression: parseExpr
  		},
  		
  		// Utils
  		utils: {
  			
  			// String to indicator
  			str_indicator: str_indicator,
  			// Code point at
  			codePointAt: codePointAt,
  			// From code point
  			fromCodePoint: fromCodePoint
  			
  		},
  		
  		// Statistics
  		statistics: {
  			
  			// Number of created terms
  			getCountTerms: function() {
  				return term_ref;
  			}
  			
  		},
  		
  		// JavaScript to Prolog
  		fromJavaScript: {
  			
  			// Type testing
  			test: {
  				
  				// Boolean
  				boolean: function( obj ) {
  					return obj === true || obj === false;
  				},
  				
  				// Number
  				number: function( obj ) {
  					return typeof obj === "number";
  				},
  				
  				// String
  				string: function( obj ) {
  					return typeof obj === "string";
  				},
  				
  				// List
  				list: function( obj ) {
  					return obj instanceof Array;
  				},
  				
  				// Variable
  				variable: function( obj ) {
  					return obj === undefined;
  				},
  				
  				// Any
  				any: function( _ ) {
  					return true;
  				}
  				
  			},
  			
  			// Function conversion
  			conversion: {
  				
  				// Bolean
  				boolean: function( obj ) {
  					return new Term( obj ? "true" : "false", [] );
  				},
  				
  				// Number
  				number: function( obj ) {
  					return new Num( obj, obj % 1 !== 0 );
  				},
  				
  				// String
  				string: function( obj ) {
  					return new Term( obj, [] );
  				},
  				
  				// List
  				list: function( obj ) {
  					var arr = [];
  					var elem;
  					for( var i = 0; i < obj.length; i++ ) {
  						elem = pl.fromJavaScript.apply( obj[i] );
  						if( elem === undefined )
  							return undefined;
  						arr.push( elem );
  					}
  					return arrayToList( arr );
  				},
  				
  				// Variable
  				variable: function( obj ) {
  					return new Var( "_" );
  				},
  				
  				// Any
  				any: function( obj ) {
  					return undefined;
  				}
  				
  			},
  			
  			// Transform object
  			apply: function( obj ) {
  				for( var i in pl.fromJavaScript.test )
  					if( i !== "any" && pl.fromJavaScript.test[i]( obj ) )
  						return pl.fromJavaScript.conversion[i]( obj );
  				return pl.fromJavaScript.conversion.any( obj );
  			}
  		},
  		
  		// Types
  		type: {
  			
  			// Objects
  			Var: Var,
  			Num: Num,
  			Term: Term,
  			Rule: Rule,
  			State: State,
  			Stream: Stream,
  			Module: Module,
  			Thread: Thread,
  			Session: Session,
  			Substitution: Substitution,
  			
  			// Order
  			order: [Var, Num, Term, Stream],
  			
  			// Compare types
  			compare: function( x, y ) {
  				var ord_x = indexOf( pl.type.order, x.constructor );
  				var ord_y = indexOf( pl.type.order, y.constructor );
  				if( ord_x < ord_y ) {
  					return -1;
  				} else if( ord_x > ord_y ) {
  					return 1;
  				} else {
  					if( x.constructor === Num )
  						if( x.is_float && y.is_float )
  							return 0;
  						else if( x.is_float )
  							return -1;
  						else if( y.is_float )
  							return 1;
  					return 0;
  				}
  			},
  			
  			// Is a substitution
  			is_substitution: function( obj ) {
  				return obj instanceof Substitution;
  			},
  			
  			// Is a state
  			is_state: function( obj ) {
  				return obj instanceof State;
  			},
  			
  			// Is a rule
  			is_rule: function( obj ) {
  				return obj instanceof Rule;
  			},
  			
  			// Is a variable
  			is_variable: function( obj ) {
  				return obj instanceof Var;
  			},
  
  			// Is a stream
  			is_stream: function( obj ) {
  				return obj instanceof Stream;
  			},
  			
  			// Is an anonymous variable
  			is_anonymous_var: function( obj ) {
  				return obj instanceof Var && obj.id === "_";
  			},
  			
  			// Is a callable term
  			is_callable: function( obj ) {
  				return obj instanceof Term;
  			},
  			
  			// Is a number
  			is_number: function( obj ) {
  				return obj instanceof Num;
  			},
  			
  			// Is an integer
  			is_integer: function( obj ) {
  				return obj instanceof Num && !obj.is_float;
  			},
  			
  			// Is a float
  			is_float: function( obj ) {
  				return obj instanceof Num && obj.is_float;
  			},
  			
  			// Is a term
  			is_term: function( obj ) {
  				return obj instanceof Term;
  			},
  			
  			// Is an atom
  			is_atom: function( obj ) {
  				return obj instanceof Term && obj.args.length === 0;
  			},
  			
  			// Is a ground term
  			is_ground: function( obj ) {
  				if( obj instanceof Var ) return false;
  				if( obj instanceof Term )
  					for( var i = 0; i < obj.args.length; i++ )
  						if( !pl.type.is_ground( obj.args[i] ) )
  							return false;
  				return true;
  			},
  			
  			// Is atomic
  			is_atomic: function( obj ) {
  				return obj instanceof Term && obj.args.length === 0 || obj instanceof Num;
  			},
  			
  			// Is compound
  			is_compound: function( obj ) {
  				return obj instanceof Term && obj.args.length > 0;
  			},
  			
  			// Is a list
  			is_list: function( obj ) {
  				return obj instanceof Term && (obj.indicator === "[]/0" || obj.indicator === "./2");
  			},
  			
  			// Is an empty list
  			is_empty_list: function( obj ) {
  				return obj instanceof Term && obj.indicator === "[]/0";
  			},
  			
  			// Is a non empty list
  			is_non_empty_list: function( obj ) {
  				return obj instanceof Term && obj.indicator === "./2";
  			},
  			
  			// Is a fully list
  			is_fully_list: function( obj ) {
  				while( obj instanceof Term && obj.indicator === "./2" ) {
  					obj = obj.args[1];
  				}
  				return obj instanceof Var || obj instanceof Term && obj.indicator === "[]/0";
  			},
  			
  			// Is a instantiated list
  			is_instantiated_list: function( obj ) {
  				while( obj instanceof Term && obj.indicator === "./2" ) {
  					obj = obj.args[1];
  				}
  				return obj instanceof Term && obj.indicator === "[]/0";
  			},
  			
  			// Is an unitary list
  			is_unitary_list: function( obj ) {
  				return obj instanceof Term && obj.indicator === "./2" && obj.args[1] instanceof Term && obj.args[1].indicator === "[]/0";
  			},
  			
  			// Is a character
  			is_character: function( obj ) {
  				return obj instanceof Term && (obj.id.length === 1 || obj.id.length > 0 && obj.id.length <= 2 && codePointAt( obj.id, 0 ) >= 65536);
  			},
  			
  			// Is a character
  			is_character_code: function( obj ) {
  				return obj instanceof Num && !obj.is_float && obj.value >= 0 && obj.value <= 1114111;
  			},
  
  			// Is a byte
  			is_byte: function( obj ) {
  				return obj instanceof Num && !obj.is_float && obj.value >= 0 && obj.value <= 255;
  			},
  			
  			// Is an operator
  			is_operator: function( obj ) {
  				return obj instanceof Term && pl.arithmetic.evaluation[obj.indicator];
  			},
  			
  			// Is a directive
  			is_directive: function( obj ) {
  				return obj instanceof Term && pl.directive[obj.indicator] !== undefined;
  			},
  			
  			// Is a built-in predicate
  			is_builtin: function( obj ) {
  				return obj instanceof Term && pl.predicate[obj.indicator] !== undefined;
  			},
  			
  			// Is an error
  			is_error: function( obj ) {
  				return obj instanceof Term && obj.indicator === "throw/1";
  			},
  			
  			// Is a predicate indicator
  			is_predicate_indicator: function( obj ) {
  				return obj instanceof Term && obj.indicator === "//2" && obj.args[0] instanceof Term && obj.args[0].args.length === 0 && obj.args[1] instanceof Num && obj.args[1].is_float === false;
  			},
  			
  			// Is a flag
  			is_flag: function( obj ) {
  				return obj instanceof Term && obj.args.length === 0 && pl.flag[obj.id] !== undefined;
  			},
  			
  			// Is a valid value for a flag
  			is_value_flag: function( flag, obj ) {
  				if( !pl.type.is_flag( flag ) ) return false;
  				for( var value in pl.flag[flag.id].allowed ) {
  					if(!pl.flag[flag.id].allowed.hasOwnProperty(value)) continue;
  					if( pl.flag[flag.id].allowed[value].equals( obj ) ) return true;
  				}
  				return false;
  			},
  
  			// Is a io mode
  			is_io_mode: function( obj ) {
  				return pl.type.is_atom( obj ) && ["read","write","append"].indexOf( obj.id ) !== -1;
  			},
  
  			// Is a stream option
  			is_stream_option: function( obj ) {
  				return pl.type.is_term( obj ) && (
  					obj.indicator === "alias/1" && pl.type.is_atom(obj.args[0]) ||
  					obj.indicator === "reposition/1" && pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "true" || obj.args[0].id === "false") ||
  					obj.indicator === "type/1" && pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "text" || obj.args[0].id === "binary") ||
  					obj.indicator === "eof_action/1" && pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "error" || obj.args[0].id === "eof_code" || obj.args[0].id === "reset")
  				);
  			},
  
  			// Is a stream position
  			is_stream_position: function( obj ) {
  				return pl.type.is_integer( obj ) && obj.value >= 0 || pl.type.is_atom( obj ) && (obj.id === "end_of_stream" || obj.id === "past_end_of_stream");
  			},
  
  			// Is a stream property
  			is_stream_property: function( obj ) {
  				return pl.type.is_term( obj ) && (
  					obj.indicator === "input/0" || 
  					obj.indicator === "output/0" || 
  					obj.indicator === "alias/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom( obj.args[0] )) ||
  					obj.indicator === "file_name/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom( obj.args[0] )) ||
  					obj.indicator === "position/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_stream_position( obj.args[0] )) ||
  					obj.indicator === "reposition/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "true" || obj.args[0].id === "false")) ||
  					obj.indicator === "type/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "text" || obj.args[0].id === "binary")) ||
  					obj.indicator === "mode/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "read" || obj.args[0].id === "write" || obj.args[0].id === "append")) ||
  					obj.indicator === "eof_action/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "error" || obj.args[0].id === "eof_code" || obj.args[0].id === "reset")) ||
  					obj.indicator === "end_of_stream/1" && (pl.type.is_variable( obj.args[0] ) || pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "at" || obj.args[0].id === "past" || obj.args[0].id === "not"))
  				);
  			},
  
  			// Is a streamable term
  			is_streamable: function( obj ) {
  				return obj.__proto__.stream !== undefined;
  			},
  
  			// Is a read option
  			is_read_option: function( obj ) {
  				return pl.type.is_term( obj ) && ["variables/1","variable_names/1","singletons/1"].indexOf( obj.indicator ) !== -1;
  			},
  
  			// Is a write option
  			is_write_option: function( obj ) {
  				return pl.type.is_term( obj ) && (
  					obj.indicator === "quoted/1" && pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "true" || obj.args[0].id === "false") ||
  					obj.indicator === "ignore_ops/1" && pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "true" || obj.args[0].id === "false") ||
  					obj.indicator === "numbervars/1" && pl.type.is_atom(obj.args[0]) && (obj.args[0].id === "true" || obj.args[0].id === "false")
  				);
  			},
  
  			// Is a close option
  			is_close_option: function( obj ) {
  				return pl.type.is_term( obj ) &&
  					obj.indicator === "force/1" &&
  					pl.type.is_atom(obj.args[0]) &&
  					(obj.args[0].id === "true" || obj.args[0].id === "false");
  			},
  			
  			// Is a modifiable flag
  			is_modifiable_flag: function( obj ) {
  				return pl.type.is_flag( obj ) && pl.flag[obj.id].changeable;
  			},
  			
  			// Is an existing module
  			is_module: function( obj ) {
  				return obj instanceof Term && obj.indicator === "library/1" && obj.args[0] instanceof Term && obj.args[0].args.length === 0 && pl.module[obj.args[0].id] !== undefined;
  			}
  			
  		},
  
  		// Arithmetic functions
  		arithmetic: {
  			
  			// Evaluation
  			evaluation: {
  				"e/0": {
  					type_args: null,
  					type_result: true,
  					fn: function( _ ) { return Math.E; }
  				},
  				"pi/0": {
  					type_args: null,
  					type_result: true,
  					fn: function( _ ) { return Math.PI; }
  				},
  				"tau/0": {
  					type_args: null,
  					type_result: true,
  					fn: function( _ ) { return 2*Math.PI; }
  				},
  				"epsilon/0": {
  					type_args: null,
  					type_result: true,
  					fn: function( _ ) { return Number.EPSILON; }
  				},
  				"+/1": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, _ ) { return x; }
  				},
  				"-/1": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, _ ) { return -x; }
  				},
  				"\\/1": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, _ ) { return ~x; }
  				},
  				"abs/1": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, _ ) { return Math.abs( x ); }
  				},
  				"sign/1": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, _ ) { return Math.sign( x ); }
  				},
  				"float_integer_part/1": {
  					type_args: true,
  					type_result: false,
  					fn: function( x, _ ) { return parseInt( x ); }
  				},
  				"float_fractional_part/1": {
  					type_args: true,
  					type_result: true,
  					fn: function( x, _ ) { return x - parseInt( x ); }
  				},
  				"float/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return parseFloat( x ); }
  				},
  				"floor/1": {
  					type_args: true,
  					type_result: false,
  					fn: function( x, _ ) { return Math.floor( x ); }
  				},
  				"truncate/1": {
  					type_args: true,
  					type_result: false,
  					fn: function( x, _ ) { return parseInt( x ); }
  				},
  				"round/1": {
  					type_args: true,
  					type_result: false,
  					fn: function( x, _ ) { return Math.round( x ); }
  				},
  				"ceiling/1": {
  					type_args: true,
  					type_result: false,
  					fn: function( x, _ ) { return Math.ceil( x ); }
  				},
  				"sin/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.sin( x ); }
  				},
  				"cos/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.cos( x ); }
  				},
  				"tan/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.tan( x ); }
  				},
  				"asin/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.asin( x ); }
  				},
  				"acos/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.acos( x ); }
  				},
  				"atan/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.atan( x ); }
  				},
  				"atan2/2": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, y, _ ) { return Math.atan2( x, y ); }
  				},
  				"exp/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.exp( x ); }
  				},
  				"sqrt/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, _ ) { return Math.sqrt( x ); }
  				},
  				"log/1": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, thread ) { return x > 0 ? Math.log( x ) : pl.error.evaluation( "undefined", thread.__call_indicator ); }
  				},
  				"+/2": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, y, _ ) { return x + y; }
  				},
  				"-/2": {
  					type_args: null,
  					type_result: null,
  					fn:  function( x, y, _ ) { return x - y; }
  				},
  				"*/2": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, y, _ ) { return x * y; }
  				},
  				"//2": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, y, thread ) { return y ? x / y : pl.error.evaluation( "zero_division", thread.__call_indicator ); }
  				},
  				"///2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, thread ) { return y ? parseInt( x / y ) : pl.error.evaluation( "zero_division", thread.__call_indicator ); }
  				},
  				"**/2": {
  					type_args: null,
  					type_result: true,
  					fn: function( x, y, _ ) { return Math.pow(x, y); }
  				},
  				"^/2": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, y, _ ) { return Math.pow(x, y); }
  				},
  				"<</2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, _ ) { return x << y; }
  				},
  				">>/2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, _ ) { return x >> y; }
  				},
  				"/\\/2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, _ ) { return x & y; }
  				},
  				"\\//2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, _ ) { return x | y; }
  				},
  				"xor/2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, _ ) { return x ^ y; }
  				},
  				"rem/2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, thread ) { return y ? x % y : pl.error.evaluation( "zero_division", thread.__call_indicator ); }
  				},
  				"mod/2": {
  					type_args: false,
  					type_result: false,
  					fn: function( x, y, thread ) { return y ? x - parseInt( x / y ) * y : pl.error.evaluation( "zero_division", thread.__call_indicator ); }
  				},
  				"max/2": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, y, _ ) { return Math.max( x, y ); }
  				},
  				"min/2": {
  					type_args: null,
  					type_result: null,
  					fn: function( x, y, _ ) { return Math.min( x, y ); }
  				}
  				
  			}
  			
  		},
  		
  		// Directives
  		directive: {
  			
  			// dynamic/1
  			"dynamic/1": function( thread, atom ) {
  				var indicator = atom.args[0];
  				if( pl.type.is_variable( indicator ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_compound( indicator ) || indicator.indicator !== "//2" ) {
  					thread.throw_error( pl.error.type( "predicate_indicator", indicator, atom.indicator ) );
  				} else if( pl.type.is_variable( indicator.args[0] ) || pl.type.is_variable( indicator.args[1] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( indicator.args[0] ) ) {
  					thread.throw_error( pl.error.type( "atom", indicator.args[0], atom.indicator ) );
  				} else if( !pl.type.is_integer( indicator.args[1] ) ) {
  					thread.throw_error( pl.error.type( "integer", indicator.args[1], atom.indicator ) );
  				} else {
  					var key = atom.args[0].args[0].id + "/" + atom.args[0].args[1].value;
  					thread.session.public_predicates[key] = true;
  					if( !thread.session.rules[key] )
  						thread.session.rules[key] = [];
  				}
  			},
  			
  			// multifile/1
  			"multifile/1": function( thread, atom ) {
  				var indicator = atom.args[0];
  				if( pl.type.is_variable( indicator ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_compound( indicator ) || indicator.indicator !== "//2" ) {
  					thread.throw_error( pl.error.type( "predicate_indicator", indicator, atom.indicator ) );
  				} else if( pl.type.is_variable( indicator.args[0] ) || pl.type.is_variable( indicator.args[1] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( indicator.args[0] ) ) {
  					thread.throw_error( pl.error.type( "atom", indicator.args[0], atom.indicator ) );
  				} else if( !pl.type.is_integer( indicator.args[1] ) ) {
  					thread.throw_error( pl.error.type( "integer", indicator.args[1], atom.indicator ) );
  				} else {
  					thread.session.multifile_predicates[atom.args[0].args[0].id + "/" + atom.args[0].args[1].value] = true;
  				}
  			},
  			
  			// set_prolog_flag
  			"set_prolog_flag/2": function( thread, atom ) {
  				var flag = atom.args[0], value = atom.args[1];
  				if( pl.type.is_variable( flag ) || pl.type.is_variable( value ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( flag ) ) {
  					thread.throw_error( pl.error.type( "atom", flag, atom.indicator ) );
  				} else if( !pl.type.is_flag( flag ) ) {
  					thread.throw_error( pl.error.domain( "prolog_flag", flag, atom.indicator ) );
  				} else if( !pl.type.is_value_flag( flag, value ) ) {
  					thread.throw_error( pl.error.domain( "flag_value", new Term( "+", [flag, value] ), atom.indicator ) );
  				} else if( !pl.type.is_modifiable_flag( flag ) ) {
  					thread.throw_error( pl.error.permission( "modify", "flag", flag ) );
  				} else {
  					thread.session.flag[flag.id] = value;
  				}
  			},
  			
  			// use_module/1
  			"use_module/1": function( thread, atom ) {
  				var module = atom.args[0];
  				if( pl.type.is_variable( module ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_term( module ) ) {
  					thread.throw_error( pl.error.type( "term", module, atom.indicator ) );
  				} else {
  					if( pl.type.is_module( module ) ) {
  						var name = module.args[0].id;
  						if( indexOf(thread.session.modules, name) === -1 )
  							thread.session.modules.push( name );
  					} else {
  						// TODO
  						// error no existe modulo
  					}
  				}
  			},
  			
  			// char_conversion/2
  			"char_conversion/2": function( thread, atom ) {
  				var inchar = atom.args[0], outchar = atom.args[1];
  				if( pl.type.is_variable( inchar ) || pl.type.is_variable( outchar ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_character( inchar ) ) {
  					thread.throw_error( pl.error.type( "character", inchar, atom.indicator ) );
  				} else if( !pl.type.is_character( outchar ) ) {
  					thread.throw_error( pl.error.type( "character", outchar, atom.indicator ) );
  				} else {
  					if( inchar.id === outchar.id ) {
  						delete thread.session.__char_conversion[inchar.id];
  					} else {
  						thread.session.__char_conversion[inchar.id] = outchar.id;
  					}
  				}
  			},
  			
  			// op/3
  			"op/3": function( thread, atom ) {
  				var priority = atom.args[0], type = atom.args[1], operator = atom.args[2];
  				if( pl.type.is_variable( priority ) || pl.type.is_variable( type ) || pl.type.is_variable( operator ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_integer( priority ) ) {
  					thread.throw_error( pl.error.type( "integer", priority, atom.indicator ) );
  				} else if( !pl.type.is_atom( type ) ) {
  					thread.throw_error( pl.error.type( "atom", type, atom.indicator ) );
  				} else if( !pl.type.is_atom( operator ) ) {
  					thread.throw_error( pl.error.type( "atom", operator, atom.indicator ) );
  				} else if( priority.value < 0 || priority.value > 1200 ) {
  					thread.throw_error( pl.error.domain( "operator_priority", priority, atom.indicator ) );
  				} else if( operator.id === "," ) {
  					thread.throw_error( pl.error.permission( "modify", "operator", operator, atom.indicator ) );
  				} else if( operator.id === "|" && (priority.value < 1001 || type.id.length !== 3 ) ) {
  					thread.throw_error( pl.error.permission( "modify", "operator", operator, atom.indicator ) );
  				} else if( ["fy", "fx", "yf", "xf", "xfx", "yfx", "xfy"].indexOf( type.id ) === -1 ) {
  					thread.throw_error( pl.error.domain( "operator_specifier", type, atom.indicator ) );
  				} else {
  					var fix = { prefix: null, infix: null, postfix: null };
  					for( var p in thread.session.__operators ) {
  						if(!thread.session.__operators.hasOwnProperty(p)) continue;
  						var classes = thread.session.__operators[p][operator.id];
  						if( classes ) {
  							if( indexOf( classes, "fx" ) !== -1 ) { fix.prefix = { priority: p, type: "fx" }; }
  							if( indexOf( classes, "fy" ) !== -1 ) { fix.prefix = { priority: p, type: "fy" }; }
  							if( indexOf( classes, "xf" ) !== -1 ) { fix.postfix = { priority: p, type: "xf" }; }
  							if( indexOf( classes, "yf" ) !== -1 ) { fix.postfix = { priority: p, type: "yf" }; }
  							if( indexOf( classes, "xfx" ) !== -1 ) { fix.infix = { priority: p, type: "xfx" }; }
  							if( indexOf( classes, "xfy" ) !== -1 ) { fix.infix = { priority: p, type: "xfy" }; }
  							if( indexOf( classes, "yfx" ) !== -1 ) { fix.infix = { priority: p, type: "yfx" }; }
  						}
  					}
  					var current_class;
  					switch( type.id ) {
  						case "fy": case "fx": current_class = "prefix"; break;
  						case "yf": case "xf": current_class = "postfix"; break;
  						default: current_class = "infix"; break;
  					}
  					if( ((fix.prefix && current_class === "prefix" || fix.postfix && current_class === "postfix" || fix.infix && current_class === "infix")
  						&& fix[current_class].type !== type.id || fix.infix && current_class === "postfix" || fix.postfix && current_class === "infix") && priority.value !== 0 ) {
  						thread.throw_error( pl.error.permission( "create", "operator", operator, atom.indicator ) );
  					} else {
  						if( fix[current_class] ) {
  							remove( thread.session.__operators[fix[current_class].priority][operator.id], type.id );
  							if( thread.session.__operators[fix[current_class].priority][operator.id].length === 0 ) {
  								delete thread.session.__operators[fix[current_class].priority][operator.id];
  							}
  						}
  						if( priority.value > 0 ) {
  							if( !thread.session.__operators[priority.value] ) thread.session.__operators[priority.value.toString()] = {};
  							if( !thread.session.__operators[priority.value][operator.id] ) thread.session.__operators[priority.value][operator.id] = [];
  							thread.session.__operators[priority.value][operator.id].push( type.id );
  						}
  						return true;
  					}
  				}
  			}
  			
  		},
  		
  		// Built-in predicates
  		predicate: {
  			
  			// INPUT AND OUTPUT
  			
  			// op/3
  			"op/3": function( thread, point, atom ) {
  				if( pl.directive["op/3"]( thread, atom ) )
  					thread.success( point );
  			},
  			
  			// current_op/3
  			"current_op/3": function( thread, point, atom ) {
  				var priority = atom.args[0], specifier = atom.args[1], operator = atom.args[2];
  				var points = [];
  				for( var p in thread.session.__operators )
  					for( var o in thread.session.__operators[p] )
  						for( var i = 0; i < thread.session.__operators[p][o].length; i++ )
  							points.push( new State(
  								point.goal.replace(
  									new Term( ",", [
  										new Term( "=", [new Num( p, false ), priority] ),
  										new Term( ",", [
  											new Term( "=", [new Term( thread.session.__operators[p][o][i], [] ), specifier] ),
  											new Term( "=", [new Term( o, [] ), operator] )
  										] )
  									] )
  								),
  								point.substitution,
  								point
  							) );
  				thread.prepend( points );
  			},
  		
  			// LOGIC AND CONTROL STRUCTURES
  		
  			// ;/2 (disjunction)
  			";/2": function( thread, point, atom ) {
  				if( pl.type.is_term( atom.args[0] ) && atom.args[0].indicator === "->/2" ) {
  					var points = thread.points;
  					var format_success = thread.session.format_success;
  					var format_error = thread.session.format_error;
  					thread.session.format_success = function(x) { return x.substitution; };
  					thread.session.format_error = function(x) { return x.goal; };
  					thread.points = [new State( atom.args[0].args[0], point.substitution, point )];
  					var callback = function( answer ) {
  						thread.points = points;
  						thread.session.format_success = format_success;
  						thread.session.format_error = format_error;
  						if( answer === false ) {
  							thread.prepend( [new State( point.goal.replace( atom.args[1] ), point.substitution, point )] );
  						} else if( pl.type.is_error( answer ) )
  							thread.throw_error( answer.args[0] );
  						else if( answer === null ) {
  							thread.prepend( [point] );
  							thread.__calls.shift()( null );
  						} else {
  							thread.prepend( [new State( point.goal.replace( atom.args[0].args[1] ).apply( answer ), point.substitution.apply( answer ), point )] );
  						}
  					};
  					thread.__calls.unshift( callback );
  				} else {
  					var left = new State( point.goal.replace( atom.args[0] ), point.substitution, point );
  					var right = new State( point.goal.replace( atom.args[1] ), point.substitution, point );
  					thread.prepend( [left, right] );
  				}
  			},
  			
  			// !/0 (cut)
  			"!/0": function( thread, point, atom ) {
  				var parent_cut, last_cut, states = [];
  				parent_cut = point;
  				last_cut = null;
  				while( parent_cut.parent !== null && parent_cut.parent.goal.search( atom ) ) {
  					last_cut = parent_cut;
  					parent_cut = parent_cut.parent;
  					if(parent_cut.goal !== null) {
  						var selected = parent_cut.goal.select();
  						if( selected && selected.id === "call" && selected.search(atom) ) {
  							parent_cut = last_cut;
  							break;
  						}
  					}
  				}
  				for( var i = thread.points.length-1; i >= 0; i-- ) {
  					var state = thread.points[i];
  					var node = state.parent;
  					while( node !== null && node !== parent_cut.parent ) {
  						node = node.parent;
  					}
  					if( node === null && node !== parent_cut.parent )
  						states.push( state );
  				}
  				thread.points = states.reverse();
  				thread.success( point );
  			},
  			
  			// \+ (negation)
  			"\\+/1": function( thread, point, atom ) {
  				var goal = atom.args[0];
  				if( pl.type.is_variable( goal ) ) {
  					thread.throw_error( pl.error.instantiation( thread.level ) );
  				} else if( !pl.type.is_callable( goal ) ) {
  					thread.throw_error( pl.error.type( "callable", goal, thread.level ) );
  				} else {
  					// TRANSPARENT VERSION OF THE NEGATION
  					/*var neg_thread;
  					if(point.negation_thread) {
  						neg_thread = point.negation_thread;
  					} else {
  						neg_thread = new Thread( thread.session );
  						neg_thread.add_goal( goal );
  						point.negation_thread = neg_thread;
  					}
  					neg_thread.answer( function( answer ) {
  						if(answer === false) {
  							thread.success( point );
  						} else if(pl.type.is_error( answer )) {
  							thread.throw_error( answer.args[0] );
  						} else if(answer === null) {
  							thread.prepend( [point] );
  							thread.current_limit = 0;
  						}
  						thread.again( answer !== null );
  					} );
  					return true;*/
  					
  					// '\+'(X) :- call(X), !, fail.
  					// '\+'(_).
  					thread.prepend( [
  						new State( point.goal.replace( new Term( ",", [new Term( ",", [ new Term( "call", [goal] ), new Term( "!", [] ) ] ), new Term( "fail", [] ) ] ) ), point.substitution, point ),
  						new State( point.goal.replace( null ), point.substitution, point )
  					] );
  				}
  			},
  			
  			// ->/2 (implication)
  			"->/2": function( thread, point, atom ) {
  				var goal = point.goal.replace( new Term( ",", [atom.args[0], new Term( ",", [new Term( "!" ), atom.args[1]] )] ) );
  				thread.prepend( [new State( goal, point.substitution, point )] );
  			},
  			
  			// fail/0
  			"fail/0": function( _1, _2, _3 ) {},
  			
  			// false/0
  			"false/0": function( _1, _2, _3 ) {},
  			
  			// true/0
  			"true/0": function( thread, point, _ ) {
  				thread.success( point );
  			},
  			
  			// call/1..8
  			"call/1": callN(1),
  			"call/2": callN(2),
  			"call/3": callN(3),
  			"call/4": callN(4),
  			"call/5": callN(5),
  			"call/6": callN(6),
  			"call/7": callN(7),
  			"call/8": callN(8),
  			
  			// once/1
  			"once/1": function( thread, point, atom ) {
  				var goal = atom.args[0];
  				thread.prepend( [new State( point.goal.replace( new Term( ",", [new Term( "call", [goal] ), new Term( "!", [] )] ) ), point.substitution, point )] );
  			},
  			
  			// forall/2
  			"forall/2": function( thread, point, atom ) {
  				var generate = atom.args[0], test = atom.args[1];
  				thread.prepend( [new State( point.goal.replace( new Term( "\\+", [new Term( ",", [new Term( "call", [generate] ), new Term( "\\+", [new Term( "call", [test] )] )] )] ) ), point.substitution, point )] );
  			},
  			
  			// repeat/0
  			"repeat/0": function( thread, point, _ ) {
  				thread.prepend( [new State( point.goal.replace( null ), point.substitution, point ), point] );
  			},
  			
  			// EXCEPTIONS
  			
  			// throw/1
  			"throw/1": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.instantiation( thread.level ) );
  				} else {
  					thread.throw_error( atom.args[0] );
  				}
  			},
  			
  			// catch/3
  			"catch/3": function( thread, point, atom ) {
  				var points = thread.points;
  				thread.points = [];
  				thread.prepend( [new State( atom.args[0], point.substitution, point )] );
  				var format_success = thread.session.format_success;
  				var format_error = thread.session.format_error;
  				thread.session.format_success = function(x) { return x.substitution; };
  				thread.session.format_error = function(x) { return x.goal; };
  				var callback = function( answer ) {
  					var call_points = thread.points;
  					thread.points = points;
  					thread.session.format_success = format_success;
  					thread.session.format_error = format_error;
  					if( pl.type.is_error( answer ) ) {
  						var states = [];
  						for( var i = thread.points.length-1 ; i >= 0; i-- ) {
  							var state = thread.points[i];
  							var node = state.parent;
  							while( node !== null && node !== point.parent ) {
  								node = node.parent;
  							}
  							if( node === null && node !== point.parent )
  								states.push( state );
  						}
  						thread.points = states;
  						var occurs_check = thread.get_flag( "occurs_check" ).indicator === "true/0";
  						var state = new State();
  						var mgu = pl.unify( answer.args[0], atom.args[1], occurs_check );
  						if( mgu !== null ) {
  							state.substitution = point.substitution.apply( mgu );
  							state.goal = point.goal.replace( atom.args[2] ).apply( mgu );
  							state.parent = point;
  							thread.prepend( [state] );
  						} else {
  							thread.throw_error( answer.args[0] );
  						}
  					} else if( answer !== false ) {
  						var answer_state = answer === null ? [] : [new State(
  							point.goal.apply( answer ).replace( null ),
  							point.substitution.apply( answer ),
  							point
  						)];
  						var filter_points = [];
  						for( var i = call_points.length-1; i >= 0; i-- ) {
  							filter_points.push( call_points[i] );
  							var selected = call_points[i].goal !== null ? call_points[i].goal.select() : null;
  							if( pl.type.is_term( selected ) && selected.indicator === "!/0" )
  								break;
  						}
  						var catch_points = map( filter_points, function( state ) {
  							if( state.goal === null )
  								state.goal = new Term( "true", [] );
  							state = new State(
  								point.goal.replace( new Term( "catch", [state.goal, atom.args[1], atom.args[2]] ) ),
  								point.substitution.apply( state.substitution ),
  								state.parent
  							);
  							state.exclude = atom.args[0].variables();
  							return state;
  						} ).reverse();
  						thread.prepend( catch_points );
  						thread.prepend( answer_state );
  						if( answer === null ) {
  							this.current_limit = 0;
  							thread.__calls.shift()( null );
  						}
  					}
  				};
  				thread.__calls.unshift( callback );
  			},
  			
  			// UNIFICATION
  			
  			// =/2 (unification)
  			"=/2": function( thread, point, atom ) {
  				var occurs_check = thread.get_flag( "occurs_check" ).indicator === "true/0";
  				var state = new State();
  				var mgu = pl.unify( atom.args[0], atom.args[1], occurs_check );
  				if( mgu !== null ) {
  					state.goal = point.goal.apply( mgu ).replace( null );
  					state.substitution = point.substitution.apply( mgu );
  					state.parent = point;
  					thread.prepend( [state] );
  				}
  			},
  			
  			// unify_with_occurs_check/2
  			"unify_with_occurs_check/2": function( thread, point, atom ) {
  				var state = new State();
  				var mgu = pl.unify( atom.args[0], atom.args[1], true );
  				if( mgu !== null ) {
  					state.goal = point.goal.apply( mgu ).replace( null );
  					state.substitution = point.substitution.apply( mgu );
  					state.parent = point;
  					thread.prepend( [state] );
  				}
  			},
  			
  			// \=/2
  			"\\=/2": function( thread, point, atom ) {
  				var occurs_check = thread.get_flag( "occurs_check" ).indicator === "true/0";
  				var mgu = pl.unify( atom.args[0], atom.args[1], occurs_check );
  				if( mgu === null ) {
  					thread.success( point );
  				}
  			},
  			
  			// subsumes_term/2
  			"subsumes_term/2": function( thread, point, atom ) {
  				var occurs_check = thread.get_flag( "occurs_check" ).indicator === "true/0";
  				var mgu = pl.unify( atom.args[1], atom.args[0], occurs_check );
  				if( mgu !== null && atom.args[1].apply( mgu ).equals( atom.args[1] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// ALL SOLUTIONS
  			
  			// findall/3
  			"findall/3": function( thread, point, atom ) {
  				var template = atom.args[0], goal = atom.args[1], instances = atom.args[2];
  				if( pl.type.is_variable( goal ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( goal ) ) {
  					thread.throw_error( pl.error.type( "callable", goal, atom.indicator ) );
  				} else if( !pl.type.is_variable( instances ) && !pl.type.is_list( instances ) ) {
  					thread.throw_error( pl.error.type( "list", instances, atom.indicator ) );
  				} else {
  					var variable = thread.next_free_variable();
  					var newGoal = new Term( ",", [goal, new Term( "=", [variable, template] )] );
  					var points = thread.points;
  					var limit = thread.session.limit;
  					var format_success = thread.session.format_success;
  					thread.session.format_success = function(x) { return x.substitution; };
  					thread.add_goal( newGoal, true, point );
  					var answers = [];
  					var callback = function( answer ) {
  						if( answer !== false && answer !== null && !pl.type.is_error( answer ) ) {
  							thread.__calls.unshift( callback );
  							answers.push( answer.links[variable.id] );
  							thread.session.limit = thread.current_limit;
  						} else {
  							thread.points = points;
  							thread.session.limit = limit;
  							thread.session.format_success = format_success;
  							if( pl.type.is_error( answer ) ) {
  								thread.throw_error( answer.args[0] );
  							} else if( thread.current_limit > 0 ) {
  								var list = new Term( "[]" );
  								for( var i = answers.length - 1; i >= 0; i-- ) {
  									list = new Term( ".", [answers[i], list] );
  								}
  								thread.prepend( [new State( point.goal.replace( new Term( "=", [instances, list] ) ), point.substitution, point )] );
  							}
  						}
  					};
  					thread.__calls.unshift( callback );
  				}
  			},
  			
  			// bagof/3
  			"bagof/3": function( thread, point, atom ) {
  				var answer, template = atom.args[0], goal = atom.args[1], instances = atom.args[2];
  				if( pl.type.is_variable( goal ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( goal ) ) {
  					thread.throw_error( pl.error.type( "callable", goal, atom.indicator ) );
  				} else if( !pl.type.is_variable( instances ) && !pl.type.is_list( instances ) ) {
  					thread.throw_error( pl.error.type( "list", instances, atom.indicator ) );
  				} else {
  					var variable = thread.next_free_variable();
  					var template_vars;
  					if( goal.indicator === "^/2" ) {
  						template_vars = goal.args[0].variables();
  						goal = goal.args[1];
  					} else {
  						template_vars = [];
  					}
  					template_vars = template_vars.concat( template.variables() );
  					var free_vars = goal.variables().filter( function( v ){
  						return indexOf( template_vars, v ) === -1;
  					} );
  					var list_vars = new Term( "[]" );
  					for( var i = free_vars.length - 1; i >= 0; i-- ) {
  						list_vars = new Term( ".", [ new Var( free_vars[i] ), list_vars ] );
  					}
  					var newGoal = new Term( ",", [goal, new Term( "=", [variable, new Term( ",", [list_vars, template] )] )] );
  					var points = thread.points;
  					var limit = thread.session.limit;
  					var format_success = thread.session.format_success;
  					thread.session.format_success = function(x) { return x.substitution; };
  					thread.add_goal( newGoal, true, point );
  					var answers = [];
  					var callback = function( answer ) {
  						if( answer !== false && answer !== null && !pl.type.is_error( answer ) ) {
  							thread.__calls.unshift( callback );
  							var match = false;
  							var arg_vars = answer.links[variable.id].args[0];
  							var arg_template = answer.links[variable.id].args[1];
  							for( var _elem in answers ) {
  								if(!answers.hasOwnProperty(_elem)) continue;
  								var elem = answers[_elem];
  								if( elem.variables.equals( arg_vars ) ) {
  									elem.answers.push( arg_template );
  									match = true;
  									break;
  								}
  							}
  							if( !match ) {
  								answers.push( {variables: arg_vars, answers: [arg_template]} );
  							}
  							thread.session.limit = thread.current_limit;
  						} else {
  							thread.points = points;
  							thread.session.limit = limit;
  							thread.session.format_success = format_success;
  							if( pl.type.is_error( answer ) ) {
  								thread.throw_error( answer.args[0] );
  							} else if( thread.current_limit > 0 ) {
  								var states = [];
  								for( var i = 0; i < answers.length; i++ ) {
  									answer = answers[i].answers;
  									var list = new Term( "[]" );
  									for( var j = answer.length - 1; j >= 0; j-- ) {
  										list = new Term( ".", [answer[j], list] );
  									}
  									states.push( new State(
  										point.goal.replace( new Term( ",", [new Term( "=", [list_vars, answers[i].variables] ), new Term( "=", [instances, list] )] ) ),
  										point.substitution, point
  									) );
  								}
  								thread.prepend( states );
  							}
  						}
  					};
  					thread.__calls.unshift( callback );
  				}
  			},
  	
  			// setof/3
  			"setof/3": function( thread, point, atom ) {
  				var answer, template = atom.args[0], goal = atom.args[1], instances = atom.args[2];
  				if( pl.type.is_variable( goal ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( goal ) ) {
  					thread.throw_error( pl.error.type( "callable", goal, atom.indicator ) );
  				} else if( !pl.type.is_variable( instances ) && !pl.type.is_list( instances ) ) {
  					thread.throw_error( pl.error.type( "list", instances, atom.indicator ) );
  				} else {
  					var variable = thread.next_free_variable();
  					var template_vars;
  					if( goal.indicator === "^/2" ) {
  						template_vars = goal.args[0].variables();
  						goal = goal.args[1];
  					} else {
  						template_vars = [];
  					}
  					template_vars = template_vars.concat( template.variables() );
  					var free_vars = goal.variables().filter( function( v ){
  						return indexOf( template_vars, v ) === -1;
  					} );
  					var list_vars = new Term( "[]" );
  					for( var i = free_vars.length - 1; i >= 0; i-- ) {
  						list_vars = new Term( ".", [ new Var( free_vars[i] ), list_vars ] );
  					}
  					var newGoal = new Term( ",", [goal, new Term( "=", [variable, new Term( ",", [list_vars, template] )] )] );
  					var points = thread.points;
  					var limit = thread.session.limit;
  					var format_success = thread.session.format_success;
  					thread.session.format_success = function(x) { return x.substitution; };
  					thread.add_goal( newGoal, true, point );
  					var answers = [];
  					var callback = function( answer ) {
  						if( answer !== false && answer !== null && !pl.type.is_error( answer ) ) {
  							thread.__calls.unshift( callback );
  							var match = false;
  							var arg_vars = answer.links[variable.id].args[0];
  							var arg_template = answer.links[variable.id].args[1];
  							for( var _elem in answers ) {
  								if(!answers.hasOwnProperty(_elem)) continue;
  								var elem = answers[_elem];
  								if( elem.variables.equals( arg_vars ) ) {
  									elem.answers.push( arg_template );
  									match = true;
  									break;
  								}
  							}
  							if( !match ) {
  								answers.push( {variables: arg_vars, answers: [arg_template]} );
  							}
  							thread.session.limit = thread.current_limit;
  						} else {
  							thread.points = points;
  							thread.session.limit = limit;
  							thread.session.format_success = format_success;
  							if( pl.type.is_error( answer ) ) {
  								thread.throw_error( answer.args[0] );
  							} else if( thread.current_limit > 0 ) {
  								var states = [];
  								for( var i = 0; i < answers.length; i++ ) {
  									answer = answers[i].answers.sort( pl.compare );
  									var list = new Term( "[]" );
  									for( var j = answer.length - 1; j >= 0; j-- ) {
  										list = new Term( ".", [answer[j], list] );
  									}
  									states.push( new State(
  										point.goal.replace( new Term( ",", [new Term( "=", [list_vars, answers[i].variables] ), new Term( "=", [instances, list] )] ) ),
  										point.substitution, point
  									) );
  								}
  								thread.prepend( states );
  							}
  						}
  					};
  					thread.__calls.unshift( callback );
  				}
  			},
  			
  			// TERM CREATION AND DECOMPOSITION
  			
  			// functor/3
  			"functor/3": function( thread, point, atom ) {
  				var subs;
  				var term = atom.args[0], name = atom.args[1], arity = atom.args[2];
  				if( pl.type.is_variable( term ) && (pl.type.is_variable( name ) || pl.type.is_variable( arity )) ) {
  					thread.throw_error( pl.error.instantiation( "functor/3" ) );
  				} else if( !pl.type.is_variable( arity ) && !pl.type.is_integer( arity ) ) {
  					thread.throw_error( pl.error.type( "integer", atom.args[2], "functor/3" ) );
  				} else if( !pl.type.is_variable( name ) && !pl.type.is_atomic( name ) ) {
  					thread.throw_error( pl.error.type( "atomic", atom.args[1], "functor/3" ) );
  				} else if( pl.type.is_integer( name ) && pl.type.is_integer( arity ) && arity.value !== 0 ) {
  					thread.throw_error( pl.error.type( "atom", atom.args[1], "functor/3" ) );
  				} else if( pl.type.is_variable( term ) ) {
  					if( atom.args[2].value >= 0 ) {
  						var args = [];
  						for( var i = 0; i < arity.value; i++ )
  							args.push( thread.next_free_variable() );
  						var functor = pl.type.is_integer( name ) ? name : new Term( name.id, args );
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [term, functor] ) ), point.substitution, point )] );
  					}
  				} else {
  					var id = pl.type.is_integer( term ) ? term : new Term( term.id, [] );
  					var length = pl.type.is_integer( term ) ? new Num( 0, false ) : new Num( term.args.length, false );
  					var goal = new Term( ",", [new Term( "=", [id, name] ), new Term( "=", [length, arity] )] );
  					thread.prepend( [new State( point.goal.replace( goal ), point.substitution, point )] );
  				}
  			},
  			
  			// arg/3
  			"arg/3": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) || pl.type.is_variable( atom.args[1] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( atom.args[0].value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", atom.args[0], atom.indicator ) );
  				} else if( !pl.type.is_compound( atom.args[1] ) ) {
  					thread.throw_error( pl.error.type( "compound", atom.args[1], atom.indicator ) );
  				} else {
  					var n = atom.args[0].value;
  					if( n > 0 && n <= atom.args[1].args.length ) {
  						var goal = new Term( "=", [atom.args[1].args[n-1], atom.args[2]] );
  						thread.prepend( [new State( point.goal.replace( goal ), point.substitution, point )] );
  					}
  				}
  			},
  			
  			// =../2 (univ)
  			"=../2": function( thread, point, atom ) {
  				var list;
  				if( pl.type.is_variable( atom.args[0] ) && (pl.type.is_variable( atom.args[1] )
  				|| pl.type.is_non_empty_list( atom.args[1] ) && pl.type.is_variable( atom.args[1].args[0] )) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_fully_list( atom.args[1] ) ) {
  					thread.throw_error( pl.error.type( "list", atom.args[1], atom.indicator ) );
  				} else if( !pl.type.is_variable( atom.args[0] ) ) {
  					if( pl.type.is_atomic( atom.args[0] ) ) {
  						list = new Term( ".", [atom.args[0], new Term( "[]" )] );
  					} else {
  						list = new Term( "[]" );
  						for( var i = atom.args[0].args.length - 1; i >= 0; i-- ) {
  							list = new Term( ".", [atom.args[0].args[i], list] );
  						}
  						list = new Term( ".", [new Term( atom.args[0].id ), list] );
  					}
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [list, atom.args[1]] ) ), point.substitution, point )] );
  				} else if( !pl.type.is_variable( atom.args[1] ) ) {
  					var args = [];
  					list = atom.args[1].args[1];
  					while( list.indicator === "./2" ) {
  						args.push( list.args[0] );
  						list = list.args[1];
  					}
  					if( pl.type.is_variable( atom.args[0] ) && pl.type.is_variable( list ) ) {
  						thread.throw_error( pl.error.instantiation( atom.indicator ) );
  					} else if( args.length === 0 && pl.type.is_compound( atom.args[1].args[0] ) ) {
  						thread.throw_error( pl.error.type( "atomic", atom.args[1].args[0], atom.indicator ) );
  					} else if( args.length > 0 && (pl.type.is_compound( atom.args[1].args[0] ) || pl.type.is_number( atom.args[1].args[0] )) ) {
  						thread.throw_error( pl.error.type( "atom", atom.args[1].args[0], atom.indicator ) );
  					} else {
  						if( args.length === 0 ) {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [atom.args[1].args[0], atom.args[0]], point ) ), point.substitution, point )] );
  						} else {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [new Term( atom.args[1].args[0].id, args ), atom.args[0]] ) ), point.substitution, point )] );
  						}
  					}
  				}
  			},
  			
  			// copy_term/2
  			"copy_term/2": function( thread, point, atom ) {
  				var renamed = atom.args[0].rename( thread );
  				thread.prepend( [new State( point.goal.replace( new Term( "=", [renamed, atom.args[1]] ) ), point.substitution, point.parent )] );
  			},
  			
  			// term_variables/2
  			"term_variables/2": function( thread, point, atom ) {
  				var term = atom.args[0], vars = atom.args[1];
  				if( !pl.type.is_fully_list( vars ) ) {
  					thread.throw_error( pl.error.type( "list", vars, atom.indicator ) );
  				} else {
  					var list = arrayToList( map( nub( term.variables() ), function(v) {
  						return new Var(v);
  					} ) );
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [vars, list] ) ), point.substitution, point )] );
  				}
  			},
  			
  			// CLAUSE RETRIEVAL AND INFORMATION
  			
  			// clause/2
  			"clause/2": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.type( "callable", atom.args[0], atom.indicator ) );
  				} else if( !pl.type.is_variable( atom.args[1] ) && !pl.type.is_callable( atom.args[1] ) ) {
  					thread.throw_error( pl.error.type( "callable", atom.args[1], atom.indicator ) );
  				} else if( thread.session.rules[atom.args[0].indicator] !== undefined ) {
  					if( thread.is_public_predicate( atom.args[0].indicator ) ) {
  						var states = [];
  						for( var _rule in thread.session.rules[atom.args[0].indicator] ) {
  							if(!thread.session.rules[atom.args[0].indicator].hasOwnProperty(_rule)) continue;
  							var rule = thread.session.rules[atom.args[0].indicator][_rule];
  							thread.session.renamed_variables = {};
  							rule = rule.rename( thread );
  							if( rule.body === null ) {
  								rule.body = new Term( "true" );
  							}
  							var goal = new Term( ",", [new Term( "=", [rule.head, atom.args[0]] ), new Term( "=", [rule.body, atom.args[1]] )] );
  							states.push( new State( point.goal.replace( goal ), point.substitution, point ) );
  						}
  						thread.prepend( states );
  					} else {
  						thread.throw_error( pl.error.permission( "access", "private_procedure", atom.args[0].indicator, atom.indicator ) );
  					}
  				}
  			},
  			
  			// current_predicate/1
  			"current_predicate/1": function( thread, point, atom ) {
  				var indicator = atom.args[0];
  				if( !pl.type.is_variable( indicator ) && (!pl.type.is_compound( indicator ) || indicator.indicator !== "//2") ) {
  					thread.throw_error( pl.error.type( "predicate_indicator", indicator, atom.indicator ) );
  				} else if( !pl.type.is_variable( indicator ) && !pl.type.is_variable( indicator.args[0] ) && !pl.type.is_atom( indicator.args[0] ) ) {
  					thread.throw_error( pl.error.type( "atom", indicator.args[0], atom.indicator ) );
  				} else if( !pl.type.is_variable( indicator ) && !pl.type.is_variable( indicator.args[1] ) && !pl.type.is_integer( indicator.args[1] ) ) {
  					thread.throw_error( pl.error.type( "integer", indicator.args[1], atom.indicator ) );
  				} else {
  					var states = [];
  					for( var i in thread.session.rules ) {
  						if(!thread.session.rules.hasOwnProperty(i)) continue;
  						var index = i.lastIndexOf( "/" );
  						var name = i.substr( 0, index );
  						var arity = parseInt( i.substr( index+1, i.length-(index+1) ) );
  						var predicate = new Term( "/", [new Term( name ), new Num( arity, false )] );
  						var goal = new Term( "=", [predicate, indicator] );
  						states.push( new State( point.goal.replace( goal ), point.substitution, point ) );
  					}
  					thread.prepend( states );
  				}
  			},
  			
  			// CLAUSE CREATION AND DESTRUCTION
  			
  			// asserta/1
  			"asserta/1": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.type( "callable", atom.args[0], atom.indicator ) );
  				} else {
  					var head, body;
  					if( atom.args[0].indicator === ":-/2" ) {
  						head = atom.args[0].args[0];
  						body = body_conversion( atom.args[0].args[1] );
  					} else {
  						head = atom.args[0];
  						body = null;
  					}
  					if( !pl.type.is_callable( head ) ) {
  						thread.throw_error( pl.error.type( "callable", head, atom.indicator ) );
  					} else if( body !== null && !pl.type.is_callable( body ) ) {
  						thread.throw_error( pl.error.type( "callable", body, atom.indicator ) );
  					} else if( thread.is_public_predicate( head.indicator ) ) {
  						if( thread.session.rules[head.indicator] === undefined ) {
  							thread.session.rules[head.indicator] = [];
  						}
  						thread.session.public_predicates[head.indicator] = true;
  						thread.session.rules[head.indicator] = [new Rule( head, body, true )].concat( thread.session.rules[head.indicator] );
  						thread.success( point );
  					} else {
  						thread.throw_error( pl.error.permission( "modify", "static_procedure", head.indicator, atom.indicator ) );
  					}
  				}
  			},
  			
  			// assertz/1
  			"assertz/1": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.type( "callable", atom.args[0], atom.indicator ) );
  				} else {
  					var head, body;
  					if( atom.args[0].indicator === ":-/2" ) {
  						head = atom.args[0].args[0];
  						body = body_conversion( atom.args[0].args[1] );
  					} else {
  						head = atom.args[0];
  						body = null;
  					}
  					if( !pl.type.is_callable( head ) ) {
  						thread.throw_error( pl.error.type( "callable", head, atom.indicator ) );
  					} else if( body !== null && !pl.type.is_callable( body ) ) {
  						thread.throw_error( pl.error.type( "callable", body, atom.indicator ) );
  					} else if( thread.is_public_predicate( head.indicator ) ) {
  						if( thread.session.rules[head.indicator] === undefined ) {
  							thread.session.rules[head.indicator] = [];
  						}
  						thread.session.public_predicates[head.indicator] = true;
  						thread.session.rules[head.indicator].push( new Rule( head, body, true ) );
  						thread.success( point );
  					} else {
  						thread.throw_error( pl.error.permission( "modify", "static_procedure", head.indicator, atom.indicator ) );
  					}
  				}
  			},
  			
  			// retract/1
  			"retract/1": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.type( "callable", atom.args[0], atom.indicator ) );
  				} else {
  					var head, body;
  					if( atom.args[0].indicator === ":-/2" ) {
  						head = atom.args[0].args[0];
  						body = atom.args[0].args[1];
  					} else {
  						head = atom.args[0];
  						body = new Term( "true" );
  					}
  					if( typeof point.retract === "undefined" ) {
  						if( thread.is_public_predicate( head.indicator ) ) {
  							if( thread.session.rules[head.indicator] !== undefined ) {
  								var states = [];
  								for( var i = 0; i < thread.session.rules[head.indicator].length; i++ ) {
  									thread.session.renamed_variables = {};
  									var orule = thread.session.rules[head.indicator][i];
  									var rule = orule.rename( thread );
  									if( rule.body === null )
  										rule.body = new Term( "true", [] );
  									var occurs_check = thread.get_flag( "occurs_check" ).indicator === "true/0";
  									var mgu = pl.unify( new Term( ",", [head, body] ), new Term( ",", [rule.head, rule.body] ), occurs_check );
  									if( mgu !== null ) {
  										var state = new State( point.goal.replace( new Term(",", [
  											new Term( "retract", [ new Term( ":-", [head, body] ) ] ),
  											new Term( ",", [
  												new Term( "=", [head, rule.head] ),
  												new Term( "=", [body, rule.body] )
  											] )
  										] ) ), point.substitution, point );
  										state.retract = orule;
  										states.push( state );
  									}
  								}
  								thread.prepend( states );
  							}
  						} else {
  							thread.throw_error( pl.error.permission( "modify", "static_procedure", head.indicator, atom.indicator ) );
  						}
  					} else {
  						retract( thread, point, head.indicator, point.retract );
  					}
  				}
  			},
  			
  			// retractall/1
  			"retractall/1": function( thread, point, atom ) {
  				var head = atom.args[0];
  				if( pl.type.is_variable( head ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_callable( head ) ) {
  					thread.throw_error( pl.error.type( "callable", head, atom.indicator ) );
  				} else {
  				thread.prepend( [
  						new State( point.goal.replace( new Term( ",", [
  							new Term( "retract", [new pl.type.Term( ":-", [head, new Var( "_" )] )] ),
  							new Term( "fail", [] )
  						] ) ), point.substitution, point ),
  						new State( point.goal.replace( null ), point.substitution, point )
  					] );
  				}
  			},
  
  			// abolish/1
  			"abolish/1": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) || pl.type.is_term( atom.args[0] ) && atom.args[0].indicator === "//2"
  				&& (pl.type.is_variable( atom.args[0].args[0] ) || pl.type.is_variable( atom.args[0].args[1] )) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_term( atom.args[0] ) || atom.args[0].indicator !== "//2" ) {
  					thread.throw_error( pl.error.type( "predicate_indicator", atom.args[0], atom.indicator ) );
  				} else if( !pl.type.is_atom( atom.args[0].args[0] ) ) {
  					thread.throw_error( pl.error.type( "atom", atom.args[0].args[0], atom.indicator ) );
  				} else if( !pl.type.is_integer( atom.args[0].args[1] ) ) {
  					thread.throw_error( pl.error.type( "integer", atom.args[0].args[1], atom.indicator ) );
  				} else if( atom.args[0].args[1].value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", atom.args[0].args[1], atom.indicator ) );
  				} else if( pl.type.is_number(thread.get_flag( "max_arity" )) && atom.args[0].args[1].value > thread.get_flag( "max_arity" ).value ) {
  					thread.throw_error( pl.error.representation( "max_arity", atom.indicator ) );
  				} else {
  					var indicator = atom.args[0].args[0].id + "/" + atom.args[0].args[1].value;
  					if( thread.is_public_predicate( indicator ) ) {
  						delete thread.session.rules[indicator];
  						thread.success( point );
  					} else {
  						thread.throw_error( pl.error.permission( "modify", "static_procedure", indicator, atom.indicator ) );
  					}
  				}
  			},
  			
  			// ATOM PROCESSING
  			
  			// atom_length/2
  			"atom_length/2": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( atom.args[0] ) ) {
  					thread.throw_error( pl.error.type( "atom", atom.args[0], atom.indicator ) );
  				} else if( !pl.type.is_variable( atom.args[1] ) && !pl.type.is_integer( atom.args[1] ) ) {
  					thread.throw_error( pl.error.type( "integer", atom.args[1], atom.indicator ) );
  				} else if( pl.type.is_integer( atom.args[1] ) && atom.args[1].value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", atom.args[1], atom.indicator ) );
  				} else {
  					var length = new Num( atom.args[0].id.length, false );
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [length, atom.args[1]] ) ), point.substitution, point )] );
  				}
  			},
  			
  			// atom_concat/3
  			"atom_concat/3": function( thread, point, atom ) {
  				var str, goal, start = atom.args[0], end = atom.args[1], whole = atom.args[2];
  				if( pl.type.is_variable( whole ) && (pl.type.is_variable( start ) || pl.type.is_variable( end )) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( start ) && !pl.type.is_atom( start ) ) {
  					thread.throw_error( pl.error.type( "atom", start, atom.indicator ) );
  				} else if( !pl.type.is_variable( end ) && !pl.type.is_atom( end ) ) {
  					thread.throw_error( pl.error.type( "atom", end, atom.indicator ) );
  				} else if( !pl.type.is_variable( whole ) && !pl.type.is_atom( whole ) ) {
  					thread.throw_error( pl.error.type( "atom", whole, atom.indicator ) );
  				} else {
  					var v1 = pl.type.is_variable( start );
  					var v2 = pl.type.is_variable( end );
  					//var v3 = pl.type.is_variable( whole );
  					if( !v1 && !v2 ) {
  						goal = new Term( "=", [whole, new Term( start.id + end.id )] );
  						thread.prepend( [new State( point.goal.replace( goal ), point.substitution, point )] );
  					} else if( v1 && !v2 ) {
  						str = whole.id.substr( 0, whole.id.length - end.id.length );
  						if( str + end.id === whole.id ) {
  							goal = new Term( "=", [start, new Term( str )] );
  							thread.prepend( [new State( point.goal.replace( goal ), point.substitution, point )] );
  						}
  					} else if( v2 && !v1 ) {
  						str = whole.id.substr( start.id.length );
  						if( start.id + str === whole.id ) {
  							goal = new Term( "=", [end, new Term( str )] );
  							thread.prepend( [new State( point.goal.replace( goal ), point.substitution, point )] );
  						}
  					} else {
  						var states = [];
  						for( var i = 0; i <= whole.id.length; i++ ) {
  							var atom1 = new Term( whole.id.substr( 0, i ) );
  							var atom2 = new Term( whole.id.substr( i ) );
  							goal = new Term( ",", [new Term( "=", [atom1, start] ), new Term( "=", [atom2, end] )] );
  							states.push( new State( point.goal.replace( goal ), point.substitution, point ) );
  						}
  						thread.prepend( states );
  					}
  				}
  			},
  			
  			// sub_atom/5
  			"sub_atom/5": function( thread, point, atom ) {
  				var i, atom1 = atom.args[0], before = atom.args[1], length = atom.args[2], after = atom.args[3], subatom = atom.args[4];
  				if( pl.type.is_variable( atom1 ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( before ) && !pl.type.is_integer( before ) ) {
  					thread.throw_error( pl.error.type( "integer", before, atom.indicator ) );
  				} else if( !pl.type.is_variable( length ) && !pl.type.is_integer( length ) ) {
  					thread.throw_error( pl.error.type( "integer", length, atom.indicator ) );
  				} else if( !pl.type.is_variable( after ) && !pl.type.is_integer( after ) ) {
  					thread.throw_error( pl.error.type( "integer", after, atom.indicator ) );
  				} else if( pl.type.is_integer( before ) && before.value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", before, atom.indicator ) );
  				} else if( pl.type.is_integer( length ) && length.value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", length, atom.indicator ) );
  				} else if( pl.type.is_integer( after ) && after.value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", after, atom.indicator ) );
  				} else {
  					var bs = [], ls = [], as = [];
  					if( pl.type.is_variable( before ) ) {
  						for( i = 0; i <= atom1.id.length; i++ ) {
  							bs.push( i );
  						}
  					} else {
  						bs.push( before.value );
  					}
  					if( pl.type.is_variable( length ) ) {
  						for( i = 0; i <= atom1.id.length; i++ ) {
  							ls.push( i );
  						}
  					} else {
  						ls.push( length.value );
  					}
  					if( pl.type.is_variable( after ) ) {
  						for( i = 0; i <= atom1.id.length; i++ ) {
  							as.push( i );
  						}
  					} else {
  						as.push( after.value );
  					}
  					var states = [];
  					for( var _i in bs ) {
  						if(!bs.hasOwnProperty(_i)) continue;
  						i = bs[_i];
  						for( var _j in ls ) {
  							if(!ls.hasOwnProperty(_j)) continue;
  							var j = ls[_j];
  							var k = atom1.id.length - i - j;
  							if( indexOf( as, k ) !== -1 ) {
  							if( i+j+k === atom1.id.length ) {
  									var str = atom1.id.substr( i, j );
  									if( atom1.id === atom1.id.substr( 0, i ) + str + atom1.id.substr( i+j, k ) ) {
  										var pl1 = new Term( "=", [new Term( str ), subatom] );
  										var pl2 = new Term( "=", [before, new Num( i )] );
  										var pl3 = new Term( "=", [length, new Num( j )] );
  										var pl4 = new Term( "=", [after, new Num( k )] );
  										var goal = new Term( ",", [ new Term( ",", [ new Term( ",", [pl2, pl3] ), pl4] ), pl1] );
  										states.push( new State( point.goal.replace( goal ), point.substitution, point ) );
  									}
  								}
  							}
  						}
  					}
  					thread.prepend( states );
  				}
  			},
  			
  			// atom_chars/2
  			"atom_chars/2": function( thread, point, atom ) {
  				var atom1 = atom.args[0], list = atom.args[1];
  				if( pl.type.is_variable( atom1 ) && pl.type.is_variable( list ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( atom1 ) && !pl.type.is_atom( atom1 ) ) {
  					thread.throw_error( pl.error.type( "atom", atom1, atom.indicator ) );
  				} else {
  					if( !pl.type.is_variable( atom1 ) ) {
  						var list1 = new Term( "[]" );
  						for( var i = atom1.id.length-1; i >= 0; i-- ) {
  							list1 = new Term( ".", [new Term( atom1.id.charAt( i ) ), list1] );
  						}
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [list, list1] ) ), point.substitution, point )] );
  					} else {			
  						var pointer = list;
  						var v = pl.type.is_variable( atom1 );
  						var str = "";
  						while( pointer.indicator === "./2" ) {
  							if( !pl.type.is_character( pointer.args[0] ) ) {
  								if( pl.type.is_variable( pointer.args[0] ) && v ) {
  									thread.throw_error( pl.error.instantiation( atom.indicator ) );
  									return;
  								} else if( !pl.type.is_variable( pointer.args[0] ) ) {
  									thread.throw_error( pl.error.type( "character", pointer.args[0], atom.indicator ) );
  									return;
  								}
  							} else {
  								str += pointer.args[0].id;
  							}
  							pointer = pointer.args[1];
  						}
  						if( pl.type.is_variable( pointer ) && v ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						} else if( !pl.type.is_empty_list( pointer ) && !pl.type.is_variable( pointer ) ) {
  							thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  						} else {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [new Term( str ), atom1] ) ), point.substitution, point )] );
  						}
  					}
  				}
  			},
  			
  			// atom_codes/2
  			"atom_codes/2": function( thread, point, atom ) {
  				var atom1 = atom.args[0], list = atom.args[1];
  				if( pl.type.is_variable( atom1 ) && pl.type.is_variable( list ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( atom1 ) && !pl.type.is_atom( atom1 ) ) {
  					thread.throw_error( pl.error.type( "atom", atom1, atom.indicator ) );
  				} else {
  					if( !pl.type.is_variable( atom1 ) ) {
  						var list1 = new Term( "[]" );
  						for( var i = atom1.id.length-1; i >= 0; i-- ) {
  							list1 = new Term( ".", [new Num( codePointAt(atom1.id,i), false ), list1] );
  						}
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [list, list1] ) ), point.substitution, point )] );
  					} else {			
  						var pointer = list;
  						var v = pl.type.is_variable( atom1 );
  						var str = "";
  						while( pointer.indicator === "./2" ) {
  							if( !pl.type.is_character_code( pointer.args[0] ) ) {
  								if( pl.type.is_variable( pointer.args[0] ) && v ) {
  									thread.throw_error( pl.error.instantiation( atom.indicator ) );
  									return;
  								} else if( !pl.type.is_variable( pointer.args[0] ) ) {
  									thread.throw_error( pl.error.representation( "character_code", atom.indicator ) );
  									return;
  								}
  							} else {
  								str += fromCodePoint( pointer.args[0].value );
  							}
  							pointer = pointer.args[1];
  						}
  						if( pl.type.is_variable( pointer ) && v ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						} else if( !pl.type.is_empty_list( pointer ) && !pl.type.is_variable( pointer ) ) {
  							thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  						} else {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [new Term( str ), atom1] ) ), point.substitution, point )] );
  						}
  					}
  				}
  			},
  			
  			// char_code/2
  			"char_code/2": function( thread, point, atom ) {
  				var char = atom.args[0], code = atom.args[1];
  				if( pl.type.is_variable( char ) && pl.type.is_variable( code ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( char ) && !pl.type.is_character( char ) ) {
  					thread.throw_error( pl.error.type( "character", char, atom.indicator ) );
  				} else if( !pl.type.is_variable( code ) && !pl.type.is_integer( code ) ) {
  					thread.throw_error( pl.error.type( "integer", code, atom.indicator ) );
  				} else if( !pl.type.is_variable( code ) && !pl.type.is_character_code( code ) ) {
  					thread.throw_error( pl.error.representation( "character_code", atom.indicator ) );
  				} else {
  					if( pl.type.is_variable( code ) ) {
  						var code1 = new Num( codePointAt(char.id,0 ), false );
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [code1, code] ) ), point.substitution, point )] );
  					} else {
  						var char1 = new Term( fromCodePoint( code.value ) );
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [char1, char] ) ), point.substitution, point )] );
  					}
  				}
  			},
  			
  			// number_chars/2
  			"number_chars/2": function( thread, point, atom ) {
  				var str, num = atom.args[0], list = atom.args[1];
  				if( pl.type.is_variable( num ) && pl.type.is_variable( list ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( num ) && !pl.type.is_number( num ) ) {
  					thread.throw_error( pl.error.type( "number", num, atom.indicator ) );
  				} else if( !pl.type.is_variable( list ) && !pl.type.is_list( list ) ) {
  					thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  				} else {
  					var isvar = pl.type.is_variable( num );
  					if( !pl.type.is_variable( list ) ) {	
  						var pointer = list;
  						var total = true;
  						str = "";
  						while( pointer.indicator === "./2" ) {
  							if( !pl.type.is_character( pointer.args[0] ) ) {
  								if( pl.type.is_variable( pointer.args[0] ) ) {
  									total = false;
  								} else if( !pl.type.is_variable( pointer.args[0] ) ) {
  									thread.throw_error( pl.error.type( "character", pointer.args[0], atom.indicator ) );
  									return;
  								}
  							} else {
  								str += pointer.args[0].id;
  							}
  							pointer = pointer.args[1];
  						}
  						total = total && pl.type.is_empty_list( pointer );
  						if( !pl.type.is_empty_list( pointer ) && !pl.type.is_variable( pointer ) ) {
  							thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  							return;
  						}
  						if( !total && isvar ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  							return;
  						} else if( total ) {
  							if( pl.type.is_variable( pointer ) && isvar ) {
  								thread.throw_error( pl.error.instantiation( atom.indicator ) );
  								return;
  							} else {
  								var expr = thread.parse( str );
  								var num2 = expr.value;
  								if( !pl.type.is_number( num2 ) || expr.tokens[expr.tokens.length-1].space ) {
  									thread.throw_error( pl.error.syntax_by_predicate( "parseable_number", atom.indicator ) );
  								} else {
  									thread.prepend( [new State( point.goal.replace( new Term( "=", [num, num2] ) ), point.substitution, point )] );
  								}
  								return;
  							}
  						}
  					}
  					if( !isvar ) {
  						str = num.toString();
  						var list2 = new Term( "[]" );
  						for( var i = str.length - 1; i >= 0; i-- ) {
  							list2 = new Term( ".", [ new Term( str.charAt( i ) ), list2 ] );
  						}
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [list, list2] ) ), point.substitution, point )] );
  					}
  				}
  			},
  			
  			// number_codes/2
  			"number_codes/2": function( thread, point, atom ) {
  				var str, num = atom.args[0], list = atom.args[1];
  				if( pl.type.is_variable( num ) && pl.type.is_variable( list ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( num ) && !pl.type.is_number( num ) ) {
  					thread.throw_error( pl.error.type( "number", num, atom.indicator ) );
  				} else if( !pl.type.is_variable( list ) && !pl.type.is_list( list ) ) {
  					thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  				} else {
  					var isvar = pl.type.is_variable( num );
  					if( !pl.type.is_variable( list ) ) {	
  						var pointer = list;
  						var total = true;
  						str = "";
  						while( pointer.indicator === "./2" ) {
  							if( !pl.type.is_character_code( pointer.args[0] ) ) {
  								if( pl.type.is_variable( pointer.args[0] ) ) {
  									total = false;
  								} else if( !pl.type.is_variable( pointer.args[0] ) ) {
  									thread.throw_error( pl.error.type( "character_code", pointer.args[0], atom.indicator ) );
  									return;
  								}
  							} else {
  								str += fromCodePoint( pointer.args[0].value );
  							}
  							pointer = pointer.args[1];
  						}
  						total = total && pl.type.is_empty_list( pointer );
  						if( !pl.type.is_empty_list( pointer ) && !pl.type.is_variable( pointer ) ) {
  							thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  							return;
  						}
  						if( !total && isvar ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  							return;
  						} else if( total ) {
  							if( pl.type.is_variable( pointer ) && isvar ) {
  								thread.throw_error( pl.error.instantiation( atom.indicator ) );
  								return;
  							} else {
  								var expr = thread.parse( str );
  								var num2 = expr.value;
  								if( !pl.type.is_number( num2 ) || expr.tokens[expr.tokens.length-1].space ) {
  									thread.throw_error( pl.error.syntax_by_predicate( "parseable_number", atom.indicator ) );
  								} else {
  									thread.prepend( [new State( point.goal.replace( new Term( "=", [num, num2] ) ), point.substitution, point )] );
  								}
  								return;
  							}
  						}
  					}
  					if( !isvar ) {
  						str = num.toString();
  						var list2 = new Term( "[]" );
  						for( var i = str.length - 1; i >= 0; i-- ) {
  							list2 = new Term( ".", [ new Num( codePointAt(str,i), false ), list2 ] );
  						}
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [list, list2] ) ), point.substitution, point )] );
  					}
  				}
  			},
  			
  			// upcase_atom/2
  			"upcase_atom/2": function( thread, point, atom ) {
  				var original = atom.args[0], upcase = atom.args[1];
  				if( pl.type.is_variable( original ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( original ) ) {
  					thread.throw_error( pl.error.type( "atom", original, atom.indicator ) );
  				} else if( !pl.type.is_variable( upcase ) && !pl.type.is_atom( upcase ) ) {
  					thread.throw_error( pl.error.type( "atom", upcase, atom.indicator ) );
  				} else {
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [upcase, new Term( original.id.toUpperCase(), [] )] ) ), point.substitution, point )] );
  				}
  			},
  			
  			// downcase_atom/2
  			"downcase_atom/2": function( thread, point, atom ) {
  				var original = atom.args[0], downcase = atom.args[1];
  				if( pl.type.is_variable( original ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( original ) ) {
  					thread.throw_error( pl.error.type( "atom", original, atom.indicator ) );
  				} else if( !pl.type.is_variable( downcase ) && !pl.type.is_atom( downcase ) ) {
  					thread.throw_error( pl.error.type( "atom", downcase, atom.indicator ) );
  				} else {
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [downcase, new Term( original.id.toLowerCase(), [] )] ) ), point.substitution, point )] );
  				}
  			},
  			
  			// atomic_list_concat/2
  			"atomic_list_concat/2": function( thread, point, atom ) {
  				var list = atom.args[0], concat = atom.args[1];
  				thread.prepend( [new State( point.goal.replace( new Term( "atomic_list_concat", [list, new Term( "", [] ), concat] ) ), point.substitution, point )] );
  			},
  			
  			// atomic_list_concat/3
  			"atomic_list_concat/3": function( thread, point, atom ) {
  				var list = atom.args[0], separator = atom.args[1], concat = atom.args[2];
  				if( pl.type.is_variable( separator ) || pl.type.is_variable( list ) && pl.type.is_variable( concat ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( list ) && !pl.type.is_list( list ) ) {
  					thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  				} else if( !pl.type.is_variable( concat ) && !pl.type.is_atom( concat ) ) {
  					thread.throw_error( pl.error.type( "atom", concat, atom.indicator ) );
  				} else {
  					if( !pl.type.is_variable( concat ) ) {
  						var atomic = arrayToList( map(
  							concat.id.split( separator.id ),
  							function( id ) {
  								return new Term( id, [] );
  							}
  						) );
  						thread.prepend( [new State( point.goal.replace( new Term( "=", [atomic, list] ) ), point.substitution, point )] );
  					} else {
  						var id = "";
  						var pointer = list;
  						while( pl.type.is_term( pointer ) && pointer.indicator === "./2" ) {
  							if( !pl.type.is_atom( pointer.args[0] ) && !pl.type.is_number( pointer.args[0] ) ) {
  								thread.throw_error( pl.error.type( "atomic", pointer.args[0], atom.indicator ) );
  								return;
  							}
  							if( id !== "" )
  								id += separator.id;
  							if( pl.type.is_atom( pointer.args[0] ) )
  								id += pointer.args[0].id;
  							else
  								id += "" + pointer.args[0].value;
  							pointer = pointer.args[1];
  						}
  						id = new Term( id, [] );
  						if( pl.type.is_variable( pointer ) ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						} else if( !pl.type.is_term( pointer ) || pointer.indicator !== "[]/0" ) {
  							thread.throw_error( pl.error.type( "list", list, atom.indicator ) );
  						} else {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [id, concat] ) ), point.substitution, point )] );
  						}
  					}
  				}
  			},
  			
  			// TERM COMPARISON
  			
  			"@=</2": function( thread, point, atom ) {
  				if( pl.compare( atom.args[0], atom.args[1] ) <= 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			"==/2": function( thread, point, atom ) {
  				if( pl.compare( atom.args[0], atom.args[1] ) === 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			"\\==/2": function( thread, point, atom ) {
  				if( pl.compare( atom.args[0], atom.args[1] ) !== 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			"@</2": function( thread, point, atom ) {
  				if( pl.compare( atom.args[0], atom.args[1] ) < 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			"@>/2": function( thread, point, atom ) {
  				if( pl.compare( atom.args[0], atom.args[1] ) > 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			"@>=/2": function( thread, point, atom ) {
  				if( pl.compare( atom.args[0], atom.args[1] ) >= 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			"compare/3": function( thread, point, atom ) {
  				var order = atom.args[0], left = atom.args[1], right = atom.args[2];
  				if( !pl.type.is_variable( order ) && !pl.type.is_atom( order ) ) {
  					thread.throw_error( pl.error.type( "atom", order, atom.indicator ) );
  				} else if( pl.type.is_atom( order ) && ["<", ">", "="].indexOf( order.id ) === -1 ) {
  					thread.throw_error( pl.type.domain( "order", order, atom.indicator ) );
  				} else {
  					var compare = pl.compare( left, right );
  					compare = compare === 0 ? "=" : (compare === -1 ? "<" : ">");
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [order, new Term( compare, [] )] ) ), point.substitution, point )] );
  				}
  			},
  			
  			// EVALUATION
  			
  			// is/2
  			"is/2": function( thread, point, atom ) {
  				var op = atom.args[1].interpret( thread );
  				if( !pl.type.is_number( op ) ) {
  					thread.throw_error( op );
  				} else {
  					thread.prepend( [new State( point.goal.replace( new Term( "=", [atom.args[0], op], thread.level ) ), point.substitution, point )] );
  				}
  			},
  			
  			// between/3
  			"between/3": function( thread, point, atom ) {
  				var lower = atom.args[0], upper = atom.args[1], bet = atom.args[2];
  				if( pl.type.is_variable( lower ) || pl.type.is_variable( upper ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_integer( lower ) ) {
  					thread.throw_error( pl.error.type( "integer", lower, atom.indicator ) );
  				} else if( !pl.type.is_integer( upper ) ) {
  					thread.throw_error( pl.error.type( "integer", upper, atom.indicator ) );
  				} else if( !pl.type.is_variable( bet ) && !pl.type.is_integer( bet ) ) {
  					thread.throw_error( pl.error.type( "integer", bet, atom.indicator ) );
  				} else {
  					if( pl.type.is_variable( bet ) ) {
  						var states = [new State( point.goal.replace( new Term( "=", [bet, lower] ) ), point.substitution, point )];
  						if( lower.value < upper.value )
  							states.push( new State( point.goal.replace( new Term( "between", [new Num( lower.value+1, false ), upper, bet] ) ), point.substitution, point ) );
  						thread.prepend( states );
  					} else if( lower.value <= bet.value && upper.value >= bet.value ) {
  						thread.success( point );
  					}
  				}
  			},
  			
  			// succ/2
  			"succ/2": function( thread, point, atom ) {
  				var n = atom.args[0], m = atom.args[1];
  				if( pl.type.is_variable( n ) && pl.type.is_variable( m ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( n ) && !pl.type.is_integer( n ) ) {
  					thread.throw_error( pl.error.type( "integer", n, atom.indicator ) );
  				} else if( !pl.type.is_variable( m ) && !pl.type.is_integer( m ) ) {
  					thread.throw_error( pl.error.type( "integer", m, atom.indicator ) );
  				} else if( !pl.type.is_variable( n ) && n.value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", n, atom.indicator ) );
  				} else if( !pl.type.is_variable( m ) && m.value < 0 ) {
  					thread.throw_error( pl.error.domain( "not_less_than_zero", m, atom.indicator ) );
  				} else {
  					if( pl.type.is_variable( m ) || m.value > 0 ) {
  						if( pl.type.is_variable( n ) ) {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [n, new Num( m.value-1, false )] ) ), point.substitution, point )] );
  						} else {
  							thread.prepend( [new State( point.goal.replace( new Term( "=", [m, new Num( n.value+1, false )] ) ), point.substitution, point )] );
  						}
  					}
  				}
  			},
  			
  			// =:=/2
  			"=:=/2": function( thread, point, atom ) {
  				var cmp = pl.arithmetic_compare( thread, atom.args[0], atom.args[1] );
  				if( pl.type.is_term( cmp ) ) {
  					thread.throw_error( cmp );
  				} else if( cmp === 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// =\=/2
  			"=\\=/2": function( thread, point, atom ) {
  				var cmp = pl.arithmetic_compare( thread, atom.args[0], atom.args[1] );
  				if( pl.type.is_term( cmp ) ) {
  					thread.throw_error( cmp );
  				} else if( cmp !== 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// </2
  			"</2": function( thread, point, atom ) {
  				var cmp = pl.arithmetic_compare( thread, atom.args[0], atom.args[1] );
  				if( pl.type.is_term( cmp ) ) {
  					thread.throw_error( cmp );
  				} else if( cmp < 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// =</2
  			"=</2": function( thread, point, atom ) {
  				var cmp = pl.arithmetic_compare( thread, atom.args[0], atom.args[1] );
  				if( pl.type.is_term( cmp ) ) {
  					thread.throw_error( cmp );
  				} else if( cmp <= 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// >/2
  			">/2": function( thread, point, atom ) {
  				var cmp = pl.arithmetic_compare( thread, atom.args[0], atom.args[1] );
  				if( pl.type.is_term( cmp ) ) {
  					thread.throw_error( cmp );
  				} else if( cmp > 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// >=/2
  			">=/2": function( thread, point, atom ) {
  				var cmp = pl.arithmetic_compare( thread, atom.args[0], atom.args[1] );
  				if( pl.type.is_term( cmp ) ) {
  					thread.throw_error( cmp );
  				} else if( cmp >= 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// TYPE TEST
  			
  			// var/1
  			"var/1": function( thread, point, atom ) {
  				if( pl.type.is_variable( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// atom/1
  			"atom/1": function( thread, point, atom ) {
  				if( pl.type.is_atom( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// atomic/1
  			"atomic/1": function( thread, point, atom ) {
  				if( pl.type.is_atomic( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// compound/1
  			"compound/1": function( thread, point, atom ) {
  				if( pl.type.is_compound( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// integer/1
  			"integer/1": function( thread, point, atom ) {
  				if( pl.type.is_integer( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// float/1
  			"float/1": function( thread, point, atom ) {
  				if( pl.type.is_float( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// number/1
  			"number/1": function( thread, point, atom ) {
  				if( pl.type.is_number( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// nonvar/1
  			"nonvar/1": function( thread, point, atom ) {
  				if( !pl.type.is_variable( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  			
  			// ground/1
  			"ground/1": function( thread, point, atom ) {
  				if( atom.variables().length === 0 ) {
  					thread.success( point );
  				}
  			},
  			
  			// acyclic_term/1
  			"acyclic_term/1": function( thread, point, atom ) {
  				var test = point.substitution.apply( point.substitution );
  				var variables = atom.args[0].variables();
  				for( var i = 0; i < variables.length; i++ )
  					if( point.substitution.links[variables[i]] !== undefined && !point.substitution.links[variables[i]].equals( test.links[variables[i]] ) )
  						return;
  				thread.success( point );
  			},
  			
  			// callable/1
  			"callable/1": function( thread, point, atom ) {
  				if( pl.type.is_callable( atom.args[0] ) ) {
  					thread.success( point );
  				}
  			},
  
  			// is_list/1
  			"is_list/1": function( thread, point, atom ) {
  				var list = atom.args[0];
  				while( pl.type.is_term( list ) && list.indicator === "./2" )
  					list = list.args[1];
  				if( pl.type.is_term( list ) && list.indicator === "[]/0" )
  					thread.success( point );
  			},
  
  
  
  			// STREAM SELECTION AND CONTROL
  
  			// current_input/1
  			"current_input/1": function( thread, point, atom ) {
  				var stream = atom.args[0];
  				if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain("stream", stream, atom.indicator) );
  				} else {
  					if( pl.type.is_atom( stream ) && thread.get_stream_by_alias( stream.id ) )
  						stream = thread.get_stream_by_alias( stream.id );
  					thread.prepend( [new State(
  						point.goal.replace(new Term("=", [stream, thread.get_current_input()])),
  						point.substitution,
  						point)
  					] );
  				}
  			},
  
  			// current_output/1
  			"current_output/1": function( thread, point, atom ) {
  				var stream = atom.args[0];
  				if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain("stream_or_alias", stream, atom.indicator) );
  				} else {
  					if( pl.type.is_atom( stream ) && thread.get_stream_by_alias( stream.id ) )
  						stream = thread.get_stream_by_alias( stream.id );
  					thread.prepend( [new State(
  						point.goal.replace(new Term("=", [stream, thread.get_current_output()])),
  						point.substitution,
  						point)
  					] );
  				}
  			},
  
  			// set_input/1
  			"set_input/1": function( thread, point, atom ) {
  				var input = atom.args[0];
  				var stream = pl.type.is_stream( input ) ? input : thread.get_stream_by_alias( input.id );
  				if( pl.type.is_variable( input ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( input ) && !pl.type.is_stream( input ) && !pl.type.is_atom( input ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", input, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) ) {
  					thread.throw_error( pl.error.existence( "stream", input, atom.indicator ) );
  				} else if( stream.output === true ) {
  					thread.throw_error( pl.error.permission( "input", "stream", input, atom.indicator ) );
  				} else {
  					thread.set_current_input( stream );
  					thread.success( point );
  				}
  			},
  
  			// set_output/1
  			"set_output/1": function( thread, point, atom ) {
  				var output = atom.args[0];
  				var stream = pl.type.is_stream( output ) ? output : thread.get_stream_by_alias( output.id );
  				if( pl.type.is_variable( output ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( output ) && !pl.type.is_stream( output ) && !pl.type.is_atom( output ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", output, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) ) {
  					thread.throw_error( pl.error.existence( "stream", output, atom.indicator ) );
  				} else if( stream.input === true ) {
  					thread.throw_error( pl.error.permission( "output", "stream", output, atom.indicator ) );
  				} else {
  					thread.set_current_output( stream );
  					thread.success( point );
  				}
  			},
  
  			// open/3
  			"open/3": function( thread, point, atom ) {
  				var dest = atom.args[0], mode = atom.args[1], stream = atom.args[2];
  				thread.prepend( [new State(
  					point.goal.replace(new Term("open", [dest, mode, stream, new Term("[]", [])])),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// open/4
  			"open/4": function( thread, point, atom ) {
  				var dest = atom.args[0], mode = atom.args[1], stream = atom.args[2], options = atom.args[3];
  				if( pl.type.is_variable( dest ) || pl.type.is_variable( mode ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( mode ) && !pl.type.is_atom( mode ) ) {
  					thread.throw_error( pl.error.type( "atom", mode, atom.indicator ) );
  				} else if( !pl.type.is_list( options ) ) {
  					thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.type( "variable", stream, atom.indicator ) );
  				} else if( !pl.type.is_atom( dest ) && !pl.type.is_streamable( dest ) ) {
  					thread.throw_error( pl.error.domain( "source_sink", dest, atom.indicator ) );
  				} else if( !pl.type.is_io_mode( mode ) ) {
  					thread.throw_error( pl.error.domain( "io_mode", mode, atom.indicator ) );
  				} else {
  					var obj_options = {};
  					var pointer = options;
  					var property;
  					while( pl.type.is_term(pointer) && pointer.indicator === "./2" ) {
  						property = pointer.args[0];
  						if( pl.type.is_variable( property ) ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  							return;
  						} else if( !pl.type.is_stream_option( property ) ) {
  							thread.throw_error( pl.error.domain( "stream_option", property, atom.indicator ) );
  							return;
  						}
  						obj_options[property.id] = property.args[0].id;
  						pointer = pointer.args[1];
  					}
  					if( pointer.indicator !== "[]/0" ) {
  						if( pl.type.is_variable( pointer ) )
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						else
  							thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  						return;
  					} else {
  						var alias = obj_options["alias"];
  						if( alias && thread.get_stream_by_alias(alias) ) {
  							thread.throw_error( pl.error.permission( "open", "source_sink", new Term("alias", [new Term(alias, [])]), atom.indicator ) );
  							return;
  						}
  						if( !obj_options["type"] )
  							obj_options["type"] = "text";
  						var file;
  						if( pl.type.is_atom( dest ) )
  							file = thread.file_system_open( dest.id, obj_options["type"], mode.id );
  						else
  							file = dest.stream( obj_options["type"], mode.id );
  						if( file === false ) {
  							thread.throw_error( pl.error.permission( "open", "source_sink", dest, atom.indicator ) );
  							return;
  						} else if( file === null ) {
  							thread.throw_error( pl.error.existence( "source_sink", dest, atom.indicator ) );
  							return;
  						}
  						var newstream = new Stream(
  							file, mode.id,
  							obj_options["alias"],
  							obj_options["type"],
  							obj_options["reposition"] === "true",
  							obj_options["eof_action"] );
  						if( alias )
  							thread.session.streams[alias] = newstream;
  						else
  							thread.session.streams[newstream.id] = newstream;
  						thread.prepend( [new State(
  							point.goal.replace( new Term( "=", [stream, newstream] ) ),
  							point.substitution,
  							point
  						)] );
  					}
  				}
  			},
  
  			// close/1
  			"close/1": function( thread, point, atom ) {
  				var stream = atom.args[0];
  				thread.prepend( [new State(
  					point.goal.replace(new Term("close", [stream, new Term("[]", [])])),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// close/2
  			"close/2": function( thread, point, atom ) {
  				var stream = atom.args[0], options = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( options ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_list( options ) ) {
  					thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else {
  					// Get options
  					var obj_options = {};
  					var pointer = options;
  					var property;
  					while( pl.type.is_term(pointer) && pointer.indicator === "./2" ) {
  						property = pointer.args[0];
  						if( pl.type.is_variable( property ) ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  							return;
  						} else if( !pl.type.is_close_option( property ) ) {
  							thread.throw_error( pl.error.domain( "close_option", property, atom.indicator ) );
  							return;
  						}
  						obj_options[property.id] = property.args[0].id === "true";
  						pointer = pointer.args[1];
  					}
  					if( pointer.indicator !== "[]/0" ) {
  						if( pl.type.is_variable( pointer ) )
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						else
  							thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  						return;
  					} else {
  						if( stream2 === thread.session.standard_input || stream2 === thread.session.standard_output ) {
  							thread.success( point );
  							return;
  						} else if( stream2 === thread.session.current_input ) {
  							thread.session.current_input = thread.session.standard_input;
  						} else if( stream2 === thread.session.current_output ) {
  							thread.session.current_output = thread.session.current_output;
  						}
  						if( stream2.alias !== null )
  							delete thread.session.streams[stream2.alias];
  						else
  							delete thread.session.streams[stream2.id];
  						if( stream2.output )
  							stream2.stream.flush();
  						var closed = stream2.stream.close();
  						stream2.stream = null;
  						if( obj_options.force === true || closed === true ) {
  							thread.success( point );
  						}
  					}
  				}
  			},
  
  			// flush_output/0
  			"flush_output/0": function( thread, point, atom ) {
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("flush_output", [new Var("S")])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// flush_output/1
  			"flush_output/1": function( thread, point, atom ) {
  				var stream = atom.args[0];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream.input === true ) {
  					thread.throw_error( pl.error.permission( "output", "stream", output, atom.indicator ) );
  				} else {
  					stream2.stream.flush();
  					thread.success( point );
  				}
  			},
  
  			// stream_property/2
  			"stream_property/2": function( thread, point, atom ) {
  				var stream = atom.args[0], property = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) && (!pl.type.is_stream( stream2 ) || stream2.stream === null) ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( !pl.type.is_variable( property ) && !pl.type.is_stream_property( property ) ) {
  					thread.throw_error( pl.error.domain( "stream_property", property, atom.indicator ) );
  				} else {
  					var streams = [];
  					var states = [];
  					if( !pl.type.is_variable( stream ) )
  						streams.push( stream2 );
  					else
  						for( var key in thread.session.streams )
  							streams.push( thread.session.streams[key] );
  					for( var i = 0; i < streams.length; i++ ) {
  						var properties = [];
  						if( streams[i].filename )
  							properties.push( new Term( "file_name", [new Term(streams[i].file_name, [])] ) );
  						properties.push( new Term( "mode", [new Term(streams[i].mode, [])] ) );
  						properties.push( new Term( streams[i].input ? "input" : "output", [] ) );
  						if( streams[i].alias )
  							properties.push( new Term( "alias", [new Term(streams[i].alias, [])] ) );
  						properties.push( new Term( "position", [
  							typeof streams[i].position === "number" ?
  								new Num( streams[i].position, false ) :
  								new Term( streams[i].position, [] )
  						] ) );
  						properties.push( new Term( "end_of_stream", [new Term(
  							streams[i].position === "end_of_stream" ? "at" :
  							streams[i].position === "past_end_of_stream" ? "past" :
  							"not", [])] ) );
  						properties.push( new Term( "eof_action", [new Term(streams[i].eof_action, [])] ) );
  						properties.push( new Term( "reposition", [new Term(streams[i].reposition ? "true" : "false", [])] ) );
  						properties.push( new Term( "type", [new Term(streams[i].type, [])] ) );
  						for( var j = 0; j < properties.length; j++ ) {
  							states.push( new State(
  								point.goal.replace( new Term( ",", [
  									new Term("=", [pl.type.is_variable( stream ) ? stream : stream2, streams[i]]),
  									new Term("=", [property, properties[j]])]) ),
  								point.substitution,
  								point
  							) );
  						}
  					}
  					thread.prepend( states );
  				}
  			},
  
  			// at_end_of_stream/0
  			"at_end_of_stream/0": function( thread, point, atom ) {
  				thread.prepend( [new State(
  					point.goal.replace(
  						new Term(",", [new Term("current_input", [new Var("S")]),new Term(",", [
  							new Term("stream_property", [new Var("S"),new Term("end_of_stream", [new Var("E")])]),
  							new Term(",", [new Term("!", []),new Term(";", [new Term("=", [new Var("E"),
  							new Term("at", [])]),new Term("=", [new Var("E"),new Term("past", [])])])])])])
  					),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// at_end_of_stream/1
  			"at_end_of_stream/1": function( thread, point, atom ) {
  				var stream = atom.args[0];
  				thread.prepend( [new State(
  					point.goal.replace(
  						new Term(",", [new Term("stream_property", [stream,new Term("end_of_stream", [new Var("E")])]),
  						new Term(",", [new Term("!", []),new Term(";", [new Term("=", [new Var("E"),new Term("at", [])]),
  						new Term("=", [new Var("E"),new Term("past", [])])])])])
  					),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// set_stream_position/2
  			"set_stream_position/2": function( thread, point, atom ) {
  				var stream = atom.args[0], position = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( position ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream_position( position ) ) {
  					thread.throw_error( pl.error.domain( "stream_position", position, atom.indicator ) );
  				} else if( stream2.reposition === false ) {
  					thread.throw_error( pl.error.permission( "reposition", "stream", stream, atom.indicator ) );
  				} else {
  					if( pl.type.is_integer( position ) )
  						stream2.position = position.value;
  					else
  						stream2.position = position.id;
  					thread.success( point );
  				}
  			},
  
  
  
  			//  CHARACTER INPUT OUTPUT
  			
  			// get_char/1
  			"get_char/1": function( thread, point, atom ) {
  				var char = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("get_char", [new Var("S"),char])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// get_char/2
  			"get_char/2": function( thread, point, atom ) {
  				var stream = atom.args[0], char = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( char ) && !pl.type.is_character( char ) ) {
  					thread.throw_error( pl.error.type( "in_character", char, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "input", "binary_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					var stream_char;
  					if( stream2.position === "end_of_stream" ) {
  						stream_char = "end_of_file";
  						stream2.position = "past_end_of_stream";
  					} else {
  						stream_char = stream2.stream.get( 1, stream2.position );
  						if( stream_char === null ) {
  							thread.throw_error( pl.error.representation( "character", atom.indicator ) );
  							return;
  						}
  						stream2.position++;
  					}
  					thread.prepend( [new State(
  						point.goal.replace( new Term( "=", [new Term(stream_char,[]), char] ) ),
  						point.substitution,
  						point
  					)] );
  				}
  			},
  
  			// get_code/1
  			"get_code/1": function( thread, point, atom ) {
  				var code = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("get_code", [new Var("S"),code])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// get_code/2
  			"get_code/2": function( thread, point, atom ) {
  				var stream = atom.args[0], code = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( code ) && !pl.type.is_integer( code ) ) {
  					thread.throw_error( pl.error.type( "integer", char, atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "input", "binary_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					var stream_code;
  					if( stream2.position === "end_of_stream" ) {
  						stream_code = -1;
  						stream2.position = "past_end_of_stream";
  					} else {
  						stream_code = stream2.stream.get( 1, stream2.position );
  						if( stream_code === null ) {
  							thread.throw_error( pl.error.representation( "character", atom.indicator ) );
  							return;
  						}
  						stream_code = codePointAt( stream_code, 0 );
  						stream2.position++;
  					}
  					thread.prepend( [new State(
  						point.goal.replace( new Term( "=", [new Num(stream_code, false), code] ) ),
  						point.substitution,
  						point
  					)] );
  				}
  			},
  
  			// peek_char/1
  			"peek_char/1": function( thread, point, atom ) {
  				var char = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("peek_char", [new Var("S"),char])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// peek_char/2
  			"peek_char/2": function( thread, point, atom ) {
  				var stream = atom.args[0], char = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( char ) && !pl.type.is_character( char ) ) {
  					thread.throw_error( pl.error.type( "in_character", char, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "input", "binary_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					var stream_char;
  					if( stream2.position === "end_of_stream" ) {
  						stream_char = "end_of_file";
  						stream2.position = "past_end_of_stream";
  					} else {
  						stream_char = stream2.stream.get( 1, stream2.position );
  						if( stream_char === null ) {
  							thread.throw_error( pl.error.representation( "character", atom.indicator ) );
  							return;
  						}
  					}
  					thread.prepend( [new State(
  						point.goal.replace( new Term( "=", [new Term(stream_char,[]), char] ) ),
  						point.substitution,
  						point
  					)] );
  				}
  			},
  
  			// peek_code/1
  			"peek_code/1": function( thread, point, atom ) {
  				var code = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("peek_code", [new Var("S"),code])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// peek_code/2
  			"peek_code/2": function( thread, point, atom ) {
  				var stream = atom.args[0], code = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( code ) && !pl.type.is_integer( code ) ) {
  					thread.throw_error( pl.error.type( "integer", char, atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "input", "binary_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					var stream_code;
  					if( stream2.position === "end_of_stream" ) {
  						stream_code = -1;
  						stream2.position = "past_end_of_stream";
  					} else {
  						stream_code = stream2.stream.get( 1, stream2.position );
  						if( stream_code === null ) {
  							thread.throw_error( pl.error.representation( "character", atom.indicator ) );
  							return;
  						}
  						stream_code = codePointAt( stream_code, 0 );
  					}
  					thread.prepend( [new State(
  						point.goal.replace( new Term( "=", [new Num(stream_code, false), code] ) ),
  						point.substitution,
  						point
  					)] );
  				}
  			},
  
  			// put_char/1
  			"put_char/1": function( thread, point, atom ) {
  				var char = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("put_char", [new Var("S"),char])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// put_char/2
  			"put_char/2": function( thread, point, atom ) {
  				var stream = atom.args[0], char = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( char ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_character( char ) ) {
  					thread.throw_error( pl.error.type( "character", char, atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.input ) {
  					thread.throw_error( pl.error.permission( "output", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "output", "binary_stream", stream, atom.indicator ) );
  				} else {
  					if( stream2.stream.put( char.id, stream2.position ) ) {
  						if(typeof stream2.position === "number")
  							stream2.position++;
  						thread.success( point );
  					}
  				}
  			},
  
  			// put_code/1
  			"put_code/1": function( thread, point, atom ) {
  				var code = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("put_code", [new Var("S"),code])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// put_code/2
  			"put_code/2": function( thread, point, atom ) {
  				var stream = atom.args[0], code = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( code ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_integer( code ) ) {
  					thread.throw_error( pl.error.type( "integer", code, atom.indicator ) );
  				} else if( !pl.type.is_character_code( code ) ) {
  					thread.throw_error( pl.error.representation( "character_code", atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.input ) {
  					thread.throw_error( pl.error.permission( "output", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "output", "binary_stream", stream, atom.indicator ) );
  				} else {
  					if( stream2.stream.put_char( fromCodePoint( code.value ), stream2.position ) ) {
  						if(typeof stream2.position === "number")
  							stream2.position++;
  						thread.success( point );
  					}
  				}
  			},
  
  			// nl/0
  			"nl/0": function( thread, point, atom ) {
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("put_char", [new Var("S"), new Term("\n", [])])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// nl/1
  			"nl/1": function( thread, point, atom ) {
  				var stream = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term("put_char", [stream, new Term("\n", [])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  
  
  			// BYTE INPUT/OUTPUT
  
  			// get_byte/1
  			"get_byte/1": function( thread, point, atom ) {
  				var byte = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("get_byte", [new Var("S"),byte])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// get_byte/2
  			"get_byte/2": function( thread, point, atom ) {
  				var stream = atom.args[0], byte = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( byte ) && !pl.type.is_byte( byte ) ) {
  					thread.throw_error( pl.error.type( "in_byte", char, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "text" ) {
  					thread.throw_error( pl.error.permission( "input", "text_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					var stream_byte;
  					if( stream2.position === "end_of_stream" ) {
  						stream_byte = "end_of_file";
  						stream2.position = "past_end_of_stream";
  					} else {
  						stream_byte = stream2.stream.get_byte( stream2.position );
  						if( stream_byte === null ) {
  							thread.throw_error( pl.error.representation( "byte", atom.indicator ) );
  							return;
  						}
  						stream2.position++;
  					}
  					thread.prepend( [new State(
  						point.goal.replace( new Term( "=", [new Num(stream_byte,false), byte] ) ),
  						point.substitution,
  						point
  					)] );
  				}
  			},
  			
  			// peek_byte/1
  			"peek_byte/1": function( thread, point, atom ) {
  				var byte = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("peek_byte", [new Var("S"),byte])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// peek_byte/2
  			"peek_byte/2": function( thread, point, atom ) {
  				var stream = atom.args[0], byte = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_variable( byte ) && !pl.type.is_byte( byte ) ) {
  					thread.throw_error( pl.error.type( "in_byte", char, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "text" ) {
  					thread.throw_error( pl.error.permission( "input", "text_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					var stream_byte;
  					if( stream2.position === "end_of_stream" ) {
  						stream_byte = "end_of_file";
  						stream2.position = "past_end_of_stream";
  					} else {
  						stream_byte = stream2.stream.get_byte( stream2.position );
  						if( stream_byte === null ) {
  							thread.throw_error( pl.error.representation( "byte", atom.indicator ) );
  							return;
  						}
  					}
  					thread.prepend( [new State(
  						point.goal.replace( new Term( "=", [new Num(stream_byte,false), byte] ) ),
  						point.substitution,
  						point
  					)] );
  				}
  			},
  
  			// put_byte/1
  			"put_byte/1": function( thread, point, atom ) {
  				var byte = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("put_byte", [new Var("S"),byte])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// put_byte/2
  			"put_byte/2": function( thread, point, atom ) {
  				var stream = atom.args[0], byte = atom.args[1];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( byte ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_byte( byte ) ) {
  					thread.throw_error( pl.error.type( "byte", byte, atom.indicator ) );
  				} else if( !pl.type.is_variable( stream ) && !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.input ) {
  					thread.throw_error( pl.error.permission( "output", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "text" ) {
  					thread.throw_error( pl.error.permission( "output", "text_stream", stream, atom.indicator ) );
  				} else {
  					if( stream2.stream.put_byte( byte.value, stream2.position ) ) {
  						if(typeof stream2.position === "number")
  							stream2.position++;
  						thread.success( point );
  					}
  				}
  			},
  
  
  
  			// TERM INPUT/OUTPUT
  
  			// read/1
  			"read/1": function( thread, point, atom ) {
  				var term = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("read_term", [new Var("S"),term,new Term("[]",[])])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// read/2
  			"read/2": function( thread, point, atom ) {
  				var stream = atom.args[0], term = atom.args[1];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term("read_term", [stream,term,new Term("[]",[])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// read_term/2
  			"read_term/2": function( thread, point, atom ) {
  				var term = atom.args[0], options = atom.args[1];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_input", [new Var("S")]),new Term("read_term", [new Var("S"),term,options])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// read_term/3
  			"read_term/3": function( thread, point, atom ) {
  				var stream = atom.args[0], term = atom.args[1], options = atom.args[2];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( options ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_list( options ) ) {
  					thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.output ) {
  					thread.throw_error( pl.error.permission( "input", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "input", "binary_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "input", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					// Get options
  					var obj_options = {};
  					var pointer = options;
  					var property;
  					while( pl.type.is_term(pointer) && pointer.indicator === "./2" ) {
  						property = pointer.args[0];
  						if( pl.type.is_variable( property ) ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  							return;
  						} else if( !pl.type.is_read_option( property ) ) {
  							thread.throw_error( pl.error.domain( "read_option", property, atom.indicator ) );
  							return;
  						}
  						obj_options[property.id] = property.args[0];
  						pointer = pointer.args[1];
  					}
  					if( pointer.indicator !== "[]/0" ) {
  						if( pl.type.is_variable( pointer ) )
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						else
  							thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  						return;
  					} else {
  						var char, tokenizer, expr;
  						var text = "";
  						var tokens = [];
  						var last_token = null;
  						// Get term
  						while( last_token === null || last_token.name !== "atom" || last_token.value !== "." ||
  							(expr.type === ERROR && pl.flatten_error(new Term("throw",[expr.value])).found === "token_not_found") ) {
  							char = stream2.stream.get( 1, stream2.position );
  							if( char === null ) {
  								thread.throw_error( pl.error.representation( "character", atom.indicator ) );
  								return;
  							}
  							if( char === "end_of_file" || char === "past_end_of_file" ) {
  								if( expr )
  									thread.throw_error( pl.error.syntax( tokens[expr.len-1], ". or expression expected", false ) );
  								else
  									thread.throw_error( pl.error.syntax( null, "token not found", true ) );
  								return;
  							}
  							stream2.position++;
  							text += char;
  							tokenizer = new Tokenizer( thread );
  							tokenizer.new_text( text );
  							tokens = tokenizer.get_tokens();
  							last_token = tokens !== null && tokens.length > 0 ? tokens[tokens.length-1] : null;
  							if( tokens === null )
  								continue;
  							expr = parseExpr(thread, tokens, 0, thread.__get_max_priority(), false);
  						}
  						// Succeed analyzing term
  						if( expr.type === SUCCESS && expr.len === tokens.length-1 && last_token.value === "." ) {
  							expr = expr.value.rename( thread );
  							var eq = new Term( "=", [term, expr] );
  							// Variables
  							if( obj_options.variables ) {
  								var vars = arrayToList( map( nub( expr.variables() ), function(v) { return new Var(v); } ) );
  								eq = new Term( ",", [eq, new Term( "=", [obj_options.variables, vars] )] )
  							}
  							// Variable names
  							if( obj_options.variable_names ) {
  								var vars = arrayToList( map( nub( expr.variables() ), function(v) {
  									var prop;
  									for( prop in thread.session.renamed_variables ) {
  										if( thread.session.renamed_variables.hasOwnProperty( prop ) ) {
  											if( thread.session.renamed_variables[ prop ] === v )
  												break;
  										}
  									}
  									return new Term( "=", [new Term( prop, []), new Var(v)] );
  								} ) );
  								eq = new Term( ",", [eq, new Term( "=", [obj_options.variable_names, vars] )] )
  							}
  							// Singletons
  							if( obj_options.singletons ) {
  								var vars = arrayToList( map( new Rule( expr, null ).singleton_variables(), function(v) {
  									var prop;
  									for( prop in thread.session.renamed_variables ) {
  										if( thread.session.renamed_variables.hasOwnProperty( prop ) ) {
  											if( thread.session.renamed_variables[ prop ] === v )
  												break;
  										}
  									}
  									return new Term( "=", [new Term( prop, []), new Var(v)] );
  								} ) );
  								eq = new Term( ",", [eq, new Term( "=", [obj_options.singletons, vars] )] )
  							}
  							thread.prepend( [new State( point.goal.replace( eq ), point.substitution, point )] );
  						// Failed analyzing term
  						} else {
  							if( expr.type === SUCCESS )
  								thread.throw_error( pl.error.syntax( tokens[expr.len], "unexpected token", false ) );
  							else
  								thread.throw_error( expr.value );
  						}
  					}
  				}
  			},
  
  			// write/1
  			"write/1": function( thread, point, atom ) {
  				var term = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("write", [new Var("S"),term])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  			
  			// write/2
  			"write/2": function( thread, point, atom ) {
  				var stream = atom.args[0], term = atom.args[1];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term("write_term", [stream, term,
  						new Term(".", [new Term("quoted", [new Term("false", [])]),
  							new Term(".", [new Term("ignore_ops", [new Term("false")]),
  								new Term(".", [new Term("numbervars", [new Term("true")]), new Term("[]",[])])])])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  			
  			// writeq/1
  			"writeq/1": function( thread, point, atom ) {
  				var term = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("writeq", [new Var("S"),term])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  			
  			// writeq/2
  			"writeq/2": function( thread, point, atom ) {
  				var stream = atom.args[0], term = atom.args[1];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term("write_term", [stream, term,
  						new Term(".", [new Term("quoted", [new Term("true", [])]),
  							new Term(".", [new Term("ignore_ops", [new Term("false")]),
  								new Term(".", [new Term("numbervars", [new Term("true")]), new Term("[]",[])])])])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  			
  			// write_canonical/1
  			"write_canonical/1": function( thread, point, atom ) {
  				var term = atom.args[0];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("write_canonical", [new Var("S"),term])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  			
  			// write_canonical/2
  			"write_canonical/2": function( thread, point, atom ) {
  				var stream = atom.args[0], term = atom.args[1];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term("write_term", [stream, term,
  						new Term(".", [new Term("quoted", [new Term("true", [])]),
  							new Term(".", [new Term("ignore_ops", [new Term("true")]),
  								new Term(".", [new Term("numbervars", [new Term("false")]), new Term("[]",[])])])])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  
  			// write_term/2
  			"write_term/2": function( thread, point, atom ) {
  				var term = atom.args[0], options = atom.args[1];
  				thread.prepend( [new State( 
  					point.goal.replace( new Term(",", [new Term("current_output", [new Var("S")]),new Term("write_term", [new Var("S"),term,options])]) ),
  					point.substitution,
  					point
  				)] );
  			},
  			
  			// write_term/3
  			"write_term/3": function( thread, point, atom ) {
  				var stream = atom.args[0], term = atom.args[1], options = atom.args[2];
  				var stream2 = pl.type.is_stream( stream ) ? stream : thread.get_stream_by_alias( stream.id );
  				if( pl.type.is_variable( stream ) || pl.type.is_variable( options ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_list( options ) ) {
  					thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream ) && !pl.type.is_atom( stream ) ) {
  					thread.throw_error( pl.error.domain( "stream_or_alias", stream, atom.indicator ) );
  				} else if( !pl.type.is_stream( stream2 ) || stream2.stream === null ) {
  					thread.throw_error( pl.error.existence( "stream", stream, atom.indicator ) );
  				} else if( stream2.input ) {
  					thread.throw_error( pl.error.permission( "output", "stream", stream, atom.indicator ) );
  				} else if( stream2.type === "binary" ) {
  					thread.throw_error( pl.error.permission( "output", "binary_stream", stream, atom.indicator ) );
  				} else if( stream2.position === "past_end_of_stream" && stream2.eof_action === "error" ) {
  					thread.throw_error( pl.error.permission( "output", "past_end_of_stream", stream, atom.indicator ) );
  				} else {
  					// Get options
  					var obj_options = {};
  					var pointer = options;
  					var property;
  					while( pl.type.is_term(pointer) && pointer.indicator === "./2" ) {
  						property = pointer.args[0];
  						if( pl.type.is_variable( property ) ) {
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  							return;
  						} else if( !pl.type.is_write_option( property ) ) {
  							thread.throw_error( pl.error.domain( "write_option", property, atom.indicator ) );
  							return;
  						}
  						obj_options[property.id] = property.args[0].id === "true";
  						pointer = pointer.args[1];
  					}
  					if( pointer.indicator !== "[]/0" ) {
  						if( pl.type.is_variable( pointer ) )
  							thread.throw_error( pl.error.instantiation( atom.indicator ) );
  						else
  							thread.throw_error( pl.error.type( "list", options, atom.indicator ) );
  						return;
  					} else {
  						obj_options.session = thread.session;
  						var text = term.toString( obj_options );
  						stream2.stream.put( text, stream2.position );
  						if( typeof stream2.position === "number" )
  							stream2.position += text.length;
  						thread.success( point );
  					}
  				}
  			},
  
  
  			
  			// IMPLEMENTATION DEFINED HOOKS
  			
  			// halt/0
  			"halt/0": function( thread, point, _ ) {
  				thread.points = [];
  			},
  			
  			// halt/1
  			"halt/1": function( thread, point, atom ) {
  				var int = atom.args[0];
  				if( pl.type.is_variable( int ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_integer( int ) ) {
  					thread.throw_error( pl.error.type( "integer", int, atom.indicator ) );
  				} else {
  					thread.points = [];
  				}
  			},
  			
  			// current_prolog_flag/2
  			"current_prolog_flag/2": function( thread, point, atom ) {
  				var flag = atom.args[0], value = atom.args[1];
  				if( !pl.type.is_variable( flag ) && !pl.type.is_atom( flag ) ) {
  					thread.throw_error( pl.error.type( "atom", flag, atom.indicator ) );
  				} else if( !pl.type.is_variable( flag ) && !pl.type.is_flag( flag ) ) {
  					thread.throw_error( pl.error.domain( "prolog_flag", flag, atom.indicator ) );
  				} else {
  					var states = [];
  					for( var name in pl.flag ) {
  						if(!pl.flag.hasOwnProperty(name)) continue;
  						var goal = new Term( ",", [new Term( "=", [new Term( name ), flag] ), new Term( "=", [thread.get_flag(name), value] )] );
  						states.push( new State( point.goal.replace( goal ), point.substitution, point ) );
  					}
  					thread.prepend( states );
  				}
  			},
  			
  			// set_prolog_flag/2
  			"set_prolog_flag/2": function( thread, point, atom ) {
  				var flag = atom.args[0], value = atom.args[1];
  				if( pl.type.is_variable( flag ) || pl.type.is_variable( value ) ) {
  					thread.throw_error( pl.error.instantiation( atom.indicator ) );
  				} else if( !pl.type.is_atom( flag ) ) {
  					thread.throw_error( pl.error.type( "atom", flag, atom.indicator ) );
  				} else if( !pl.type.is_flag( flag ) ) {
  					thread.throw_error( pl.error.domain( "prolog_flag", flag, atom.indicator ) );
  				} else if( !pl.type.is_value_flag( flag, value ) ) {
  					thread.throw_error( pl.error.domain( "flag_value", new Term( "+", [flag, value] ), atom.indicator ) );
  				} else if( !pl.type.is_modifiable_flag( flag ) ) {
  					thread.throw_error( pl.error.permission( "modify", "flag", flag ) );
  				} else {
  					thread.session.flag[flag.id] = value;
  					thread.success( point );
  				}
  			}
  
  		},
  		
  		// Flags
  		flag: {
  			
  			// Bounded numbers
  			bounded: {
  				allowed: [new Term( "true" ), new Term( "false" )],
  				value: new Term( "true" ),
  				changeable: false
  			},
  			
  			// Maximum integer
  			max_integer: {
  				allowed: [new Num( Number.MAX_SAFE_INTEGER )],
  				value: new Num( Number.MAX_SAFE_INTEGER ),
  				changeable: false
  			},
  			
  			// Minimum integer
  			min_integer: {
  				allowed: [new Num( Number.MIN_SAFE_INTEGER )],
  				value: new Num( Number.MIN_SAFE_INTEGER ),
  				changeable: false
  			},
  			
  			// Rounding function
  			integer_rounding_function: {
  				allowed: [new Term( "down" ), new Term( "toward_zero" )],
  				value: new Term( "toward_zero" ),
  				changeable: false
  			},
  			
  			// Character conversion
  			char_conversion : {
  				allowed: [new Term( "on" ), new Term( "off" )],
  				value: new Term( "on" ),
  				changeable: true
  			},
  			
  			// Debugger
  			debug: {
  				allowed: [new Term( "on" ), new Term( "off" )],
  				value: new Term( "off" ),
  				changeable: true
  			},
  			
  			// Maximum arity of predicates
  			max_arity: {
  				allowed: [new Term( "unbounded" )],
  				value: new Term( "unbounded" ),
  				changeable: false
  			},
  			
  			// Unkwnow predicates behavior
  			unknown: {
  				allowed: [new Term( "error" ), new Term( "fail" ), new Term( "warning" )],
  				value: new Term( "error" ),
  				changeable: true
  			},
  			
  			// Double quotes behavior
  			double_quotes: {
  				allowed: [new Term( "chars" ), new Term( "codes" ), new Term( "atom" )],
  				value: new Term( "codes" ),
  				changeable: true
  			},
  			
  			// Occurs check behavior
  			occurs_check: {
  				allowed: [new Term( "false" ), new Term( "true" )],
  				value: new Term( "false" ),
  				changeable: true
  			},
  			
  			// Dialect
  			dialect: {
  				allowed: [new Term( "tau" )],
  				value: new Term( "tau" ),
  				changeable: false
  			},
  			
  			// Version
  			version_data: {
  				allowed: [new Term( "tau", [new Num(version.major,false), new Num(version.minor,false), new Num(version.patch,false), new Term(version.status)] )],
  				value: new Term( "tau", [new Num(version.major,false), new Num(version.minor,false), new Num(version.patch,false), new Term(version.status)] ),
  				changeable: false
  			},
  			
  			// NodeJS
  			nodejs: {
  				allowed: [new Term( "yes" ), new Term( "no" )],
  				value: new Term(  true && module.exports ? "yes" : "no" ),
  				changeable: false
  			}
  			
  		},
  		
  		// Unify
  		unify: function( s, t, occurs_check ) {
  			occurs_check = occurs_check === undefined ? false : occurs_check;
  			var G = [{left: s, right: t}], links = {};
  			while( G.length !== 0 ) {
  				var eq = G.pop();
  				s = eq.left;
  				t = eq.right;
  				if( pl.type.is_term(s) && pl.type.is_term(t) ) {
  					if( s.indicator !== t.indicator )
  						return null;
  					for( var i = 0; i < s.args.length; i++ )
  						G.push( {left: s.args[i], right: t.args[i]} );
  				} else if( pl.type.is_number(s) && pl.type.is_number(t) ) {
  					if( s.value !== t.value || s.is_float !== t.is_float )
  						return null;
  				} else if( pl.type.is_variable(s) ) {
  					// X = X
  					if( pl.type.is_variable(t) && s.id === t.id )
  						continue;
  					// Occurs check
  					if( occurs_check === true && t.variables().indexOf( s.id ) !== -1 )
  						return null;
  					if( s.id !== "_" ) {
  						var subs = new Substitution();
  						subs.add( s.id, t );
  						for( var i = 0; i < G.length; i++ ) {
  							G[i].left = G[i].left.apply( subs );
  							G[i].right = G[i].right.apply( subs );
  						}
  						for( var i in links )
  							links[i] = links[i].apply( subs );
  						links[s.id] = t;
  					}
  				} else if( pl.type.is_variable(t) ) {
  					G.push( {left: t, right: s} );
  				} else if( s.unify !== undefined ) {
  					if( !s.unify(t) )
  						return null;
  				} else {
  					return null;
  				}
  			}
  			return new Substitution( links );
  		},
  		
  		
  		// Compare
  		compare: function( obj1, obj2 ) {
  			var type = pl.type.compare( obj1, obj2 );
  			return type !== 0 ? type : obj1.compare( obj2 );
  		},
  		
  		// Arithmetic comparison
  		arithmetic_compare: function( thread, obj1, obj2 ) {
  			var expr1 = obj1.interpret( thread );
  			if( !pl.type.is_number( expr1 ) ) {
  				return expr1;
  			} else {
  				var expr2 = obj2.interpret( thread );
  				if( !pl.type.is_number( expr2 ) ) {
  					return expr2;
  				} else {
  					return expr1.value < expr2.value ? -1 : (expr1.value > expr2.value ? 1 : 0);
  				}
  			}
  		},
  		
  		// Operate
  		operate: function( thread, obj ) {
  			if( pl.type.is_operator( obj ) ) {
  				var op = pl.type.is_operator( obj );
  				var args = [], value;
  				var type = false;
  				for( var i = 0; i < obj.args.length; i++ ) {
  					value = obj.args[i].interpret( thread );
  					if( !pl.type.is_number( value ) ) {
  						return value;
  					} else if( op.type_args !== null && value.is_float !== op.type_args ) {
  						return pl.error.type( op.type_args ? "float" : "integer", value, thread.__call_indicator );
  					} else {
  						args.push( value.value );
  					}
  					type = type || value.is_float;
  				}
  				args.push( thread );
  				value = pl.arithmetic.evaluation[obj.indicator].fn.apply( this, args );
  				type = op.type_result === null ? type : op.type_result;
  				if( pl.type.is_term( value ) ) {
  					return value;
  				} else if( value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY ) {
  					return pl.error.evaluation( "overflow", thread.__call_indicator );
  				} else if( type === false && thread.get_flag( "bounded" ).id === "true" && (value > thread.get_flag( "max_integer" ).value || value < thread.get_flag( "min_integer" ).value) ) {
  					return pl.error.evaluation( "int_overflow", thread.__call_indicator );
  				} else {
  					return new Num( value, type );
  				}
  			} else {
  				return pl.error.type( "evaluable", obj.indicator, thread.__call_indicator );
  			}
  		},
  		
  		// Errors
  		error: {
  			
  			// Existence error
  			existence: function( type, object, indicator ) {
  				if( typeof object === "string" )
  					object = str_indicator( object );
  				return new Term( "error", [new Term( "existence_error", [new Term( type ), object] ), str_indicator( indicator )] );
  			},
  			
  			// Type error
  			type: function( expected, found, indicator ) {
  				return new Term( "error", [new Term( "type_error", [new Term( expected ), found] ), str_indicator( indicator )] );
  			},
  			
  			// Instantation error
  			instantiation: function( indicator ) {
  				return new Term( "error", [new Term( "instantiation_error" ), str_indicator( indicator )] );
  			},
  			
  			// Domain error
  			domain: function( expected, found, indicator ) {
  				return new Term( "error", [new Term( "domain_error", [new Term( expected ), found]), str_indicator( indicator )] );
  			},
  			
  			// Representation error
  			representation: function( flag, indicator ) {
  				return new Term( "error", [new Term( "representation_error", [new Term( flag )] ), str_indicator( indicator )] );
  			},
  			
  			// Permission error
  			permission: function( operation, type, found, indicator ) {
  				return new Term( "error", [new Term( "permission_error", [new Term( operation ), new Term( type ), found] ), str_indicator( indicator )] );
  			},
  			
  			// Evaluation error
  			evaluation: function( error, indicator ) {
  				return new Term( "error", [new Term( "evaluation_error", [new Term( error )] ), str_indicator( indicator )] );
  			},
  			
  			// Syntax error
  			syntax: function( token, expected, last ) {
  				token = token || {value: "", line: 0, column: 0, matches: [""], start: 0};
  				var position = last && token.matches.length > 0 ? token.start + token.matches[0].length : token.start;
  				var found = last ? new Term("token_not_found") : new Term("found", [new Term(token.value.toString())]);
  				var info = new Term( ".", [new Term( "line", [new Num(token.line+1)] ), new Term( ".", [new Term( "column", [new Num(position+1)] ), new Term( ".", [found, new Term( "[]", [] )] )] )] );
  				return new Term( "error", [new Term( "syntax_error", [new Term( expected )] ), info] );
  			},
  			
  			// Syntax error by predicate
  			syntax_by_predicate: function( expected, indicator ) {
  				return new Term( "error", [new Term( "syntax_error", [new Term( expected ) ] ), str_indicator( indicator )] );
  			}
  			
  		},
  		
  		// Warnings
  		warning: {
  			
  			// Singleton variables
  			singleton: function( variables, rule, line ) {
  				var list = new Term( "[]" );
  				for( var i = variables.length-1; i >= 0; i-- )
  					list = new Term( ".", [new Var(variables[i]), list] );
  				return new Term( "warning", [new Term( "singleton_variables", [list, str_indicator(rule)]), new Term(".",[new Term( "line", [ new Num( line, false ) ]), new Term("[]")])] );
  			},
  			
  			// Failed goal
  			failed_goal: function( goal, line ) {
  				return new Term( "warning", [new Term( "failed_goal", [goal]), new Term(".",[new Term( "line", [ new Num( line, false ) ]), new Term("[]")])] );
  			}
  
  		},
  		
  		// Format of renamed variables
  		format_variable: function( variable ) {
  			return "_" + variable;
  		},
  		
  		// Format of computed answers
  		format_answer: function( answer, thread, options ) {
  			if( thread instanceof Session )
  				thread = thread.thread;
  			var options = options ? options : {};
  			options.session = thread ? thread.session : undefined;
  			if( pl.type.is_error( answer ) ) {
  				return "uncaught exception: " + answer.args[0].toString();
  			} else if( answer === false ) {
  				return "false.";
  			} else if( answer === null ) {
  				return "limit exceeded ;";
  			} else {
  				var i = 0;
  				var str = "";
  				if( pl.type.is_substitution( answer ) ) {
  					var dom = answer.domain( true );
  					answer = answer.filter( function( id, value ) {
  						return !pl.type.is_variable( value ) || dom.indexOf( value.id ) !== -1 && id !== value.id;
  					} );
  				}
  				for( var link in answer.links ) {
  					if(!answer.links.hasOwnProperty(link)) continue;
  					i++;
  					if( str !== "" ) {
  						str += ", ";
  					}
  					str += link.toString( options ) + " = " + answer.links[link].toString( options );
  				}
  				var delimiter = typeof thread === "undefined" || thread.points.length > 0 ? " ;" : "."; 
  				if( i === 0 ) {
  					return "true" + delimiter;
  				} else {
  					return str + delimiter;
  				}
  			}
  		},
  		
  		// Flatten default errors
  		flatten_error: function( error ) {
  			if( !pl.type.is_error( error ) ) return null;
  			error = error.args[0];
  			var obj = {};
  			obj.type = error.args[0].id;
  			obj.thrown = obj.type === "syntax_error" ? null : error.args[1].id;
  			obj.expected = null;
  			obj.found = null;
  			obj.representation = null;
  			obj.existence = null;
  			obj.existence_type = null;
  			obj.line = null;
  			obj.column = null;
  			obj.permission_operation = null;
  			obj.permission_type = null;
  			obj.evaluation_type = null;
  			if( obj.type === "type_error" || obj.type === "domain_error" ) {
  				obj.expected = error.args[0].args[0].id;
  				obj.found = error.args[0].args[1].toString();
  			} else if( obj.type === "syntax_error" ) {
  				if( error.args[1].indicator === "./2" ) {
  					obj.expected = error.args[0].args[0].id;
  					obj.found = error.args[1].args[1].args[1].args[0];
  					obj.found = obj.found.id === "token_not_found" ? obj.found.id : obj.found.args[0].id;
  					obj.line = error.args[1].args[0].args[0].value;
  					obj.column = error.args[1].args[1].args[0].args[0].value;
  				} else {
  					obj.thrown = error.args[1].id;
  				}
  			} else if( obj.type === "permission_error" ) {
  				obj.found = error.args[0].args[2].toString();
  				obj.permission_operation = error.args[0].args[0].id;
  				obj.permission_type = error.args[0].args[1].id;
  			} else if( obj.type === "evaluation_error" ) {
  				obj.evaluation_type = error.args[0].args[0].id;
  			} else if( obj.type === "representation_error" ) {
  				obj.representation = error.args[0].args[0].id;
  			} else if( obj.type === "existence_error" ) {
  				obj.existence = error.args[0].args[1].toString();
  				obj.existence_type = error.args[0].args[0].id;
  			}
  			return obj;
  		},
  		
  		// Create new session
  		create: function( limit ) {
  			return new pl.type.Session( limit );
  		}
  		
  	};
  
  	if( true ) {
  		module.exports = pl;
  	} else {}
  	
  })();


  /***/ }),
  /* 8 */
  /***/ (function(module, exports) {

  module.exports = require("fs");

  /***/ }),
  /* 9 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
  /*
   * readlineSync
   * https://github.com/anseki/readline-sync
   *
   * Copyright (c) 2018 anseki
   * Licensed under the MIT license.
   */



  var
    IS_WIN = process.platform === 'win32',

    ALGORITHM_CIPHER = 'aes-256-cbc',
    ALGORITHM_HASH = 'sha256',
    DEFAULT_ERR_MSG = 'The current environment doesn\'t support interactive reading from TTY.',

    fs = __webpack_require__(8),
    TTY = process.binding('tty_wrap').TTY,
    childProc = __webpack_require__(10),
    pathUtil = __webpack_require__(11),

    defaultOptions = {
      /* eslint-disable key-spacing */
      prompt:             '> ',
      hideEchoBack:       false,
      mask:               '*',
      limit:              [],
      limitMessage:       'Input another, please.$<( [)limit(])>',
      defaultInput:       '',
      trueValue:          [],
      falseValue:         [],
      caseSensitive:      false,
      keepWhitespace:     false,
      encoding:           'utf8',
      bufferSize:         1024,
      print:              void 0,
      history:            true,
      cd:                 false,
      phContent:          void 0,
      preCheck:           void 0
      /* eslint-enable key-spacing */
    },

    fdR = 'none', fdW, ttyR, isRawMode = false,
    extHostPath, extHostArgs, tempdir, salt = 0,
    lastInput = '', inputHistory = [], rawInput,
    _DBG_useExt = false, _DBG_checkOptions = false, _DBG_checkMethod = false;

  function getHostArgs(options) {
    // Send any text to crazy Windows shell safely.
    function encodeArg(arg) {
      return arg.replace(/[^\w\u0080-\uFFFF]/g, function(chr) {
        return '#' + chr.charCodeAt(0) + ';';
      });
    }

    return extHostArgs.concat((function(conf) {
      var args = [];
      Object.keys(conf).forEach(function(optionName) {
        if (conf[optionName] === 'boolean') {
          if (options[optionName]) { args.push('--' + optionName); }
        } else if (conf[optionName] === 'string') {
          if (options[optionName]) {
            args.push('--' + optionName, encodeArg(options[optionName]));
          }
        }
      });
      return args;
    })({
      /* eslint-disable key-spacing */
      display:        'string',
      displayOnly:    'boolean',
      keyIn:          'boolean',
      hideEchoBack:   'boolean',
      mask:           'string',
      limit:          'string',
      caseSensitive:  'boolean'
      /* eslint-enable key-spacing */
    }));
  }

  // piping via files (for Node.js v0.10-)
  function _execFileSync(options, execOptions) {

    function getTempfile(name) {
      var filepath, suffix = '', fd;
      tempdir = tempdir || __webpack_require__(12).tmpdir();

      while (true) {
        filepath = pathUtil.join(tempdir, name + suffix);
        try {
          fd = fs.openSync(filepath, 'wx');
        } catch (e) {
          if (e.code === 'EEXIST') {
            suffix++;
            continue;
          } else {
            throw e;
          }
        }
        fs.closeSync(fd);
        break;
      }
      return filepath;
    }

    var hostArgs, shellPath, shellArgs, res = {}, exitCode, extMessage,
      pathStdout = getTempfile('readline-sync.stdout'),
      pathStderr = getTempfile('readline-sync.stderr'),
      pathExit = getTempfile('readline-sync.exit'),
      pathDone = getTempfile('readline-sync.done'),
      crypto = __webpack_require__(13), shasum, decipher, password;

    shasum = crypto.createHash(ALGORITHM_HASH);
    shasum.update('' + process.pid + (salt++) + Math.random());
    password = shasum.digest('hex');
    decipher = crypto.createDecipher(ALGORITHM_CIPHER, password);

    hostArgs = getHostArgs(options);
    if (IS_WIN) {
      shellPath = process.env.ComSpec || 'cmd.exe';
      process.env.Q = '"'; // The quote (") that isn't escaped.
      // `()` for ignore space by echo
      shellArgs = ['/V:ON', '/S', '/C',
        '(%Q%' + shellPath + '%Q% /V:ON /S /C %Q%' + /* ESLint bug? */ // eslint-disable-line no-path-concat
          '%Q%' + extHostPath + '%Q%' +
            hostArgs.map(function(arg) { return ' %Q%' + arg + '%Q%'; }).join('') +
          ' & (echo !ERRORLEVEL!)>%Q%' + pathExit + '%Q%%Q%) 2>%Q%' + pathStderr + '%Q%' +
        ' |%Q%' + process.execPath + '%Q% %Q%' + __dirname + '\\encrypt.js%Q%' +
          ' %Q%' + ALGORITHM_CIPHER + '%Q% %Q%' + password + '%Q%' +
          ' >%Q%' + pathStdout + '%Q%' +
        ' & (echo 1)>%Q%' + pathDone + '%Q%'];
    } else {
      shellPath = '/bin/sh';
      shellArgs = ['-c',
        // Use `()`, not `{}` for `-c` (text param)
        '("' + extHostPath + '"' + /* ESLint bug? */ // eslint-disable-line no-path-concat
            hostArgs.map(function(arg) { return " '" + arg.replace(/'/g, "'\\''") + "'"; }).join('') +
          '; echo $?>"' + pathExit + '") 2>"' + pathStderr + '"' +
        ' |"' + process.execPath + '" "' + __dirname + '/encrypt.js"' +
          ' "' + ALGORITHM_CIPHER + '" "' + password + '"' +
          ' >"' + pathStdout + '"' +
        '; echo 1 >"' + pathDone + '"'];
    }
    if (_DBG_checkMethod) { _DBG_checkMethod('_execFileSync', hostArgs); }
    try {
      childProc.spawn(shellPath, shellArgs, execOptions);
    } catch (e) {
      res.error = new Error(e.message);
      res.error.method = '_execFileSync - spawn';
      res.error.program = shellPath;
      res.error.args = shellArgs;
    }

    while (fs.readFileSync(pathDone, {encoding: options.encoding}).trim() !== '1') {} // eslint-disable-line no-empty
    if ((exitCode =
        fs.readFileSync(pathExit, {encoding: options.encoding}).trim()) === '0') {
      res.input =
        decipher.update(fs.readFileSync(pathStdout, {encoding: 'binary'}),
          'hex', options.encoding) +
        decipher.final(options.encoding);
    } else {
      extMessage = fs.readFileSync(pathStderr, {encoding: options.encoding}).trim();
      res.error = new Error(DEFAULT_ERR_MSG + (extMessage ? '\n' + extMessage : ''));
      res.error.method = '_execFileSync';
      res.error.program = shellPath;
      res.error.args = shellArgs;
      res.error.extMessage = extMessage;
      res.error.exitCode = +exitCode;
    }

    fs.unlinkSync(pathStdout);
    fs.unlinkSync(pathStderr);
    fs.unlinkSync(pathExit);
    fs.unlinkSync(pathDone);

    return res;
  }

  function readlineExt(options) {
    var hostArgs, res = {}, extMessage,
      execOptions = {env: process.env, encoding: options.encoding};

    if (!extHostPath) {
      if (IS_WIN) {
        if (process.env.PSModulePath) { // Windows PowerShell
          extHostPath = 'powershell.exe';
          extHostArgs = ['-ExecutionPolicy', 'Bypass', '-File', __dirname + '\\read.ps1']; // eslint-disable-line no-path-concat
        } else {                        // Windows Script Host
          extHostPath = 'cscript.exe';
          extHostArgs = ['//nologo', __dirname + '\\read.cs.js']; // eslint-disable-line no-path-concat
        }
      } else {
        extHostPath = '/bin/sh';
        extHostArgs = [__dirname + '/read.sh']; // eslint-disable-line no-path-concat
      }
    }
    if (IS_WIN && !process.env.PSModulePath) { // Windows Script Host
      // ScriptPW (Win XP and Server2003) needs TTY stream as STDIN.
      // In this case, If STDIN isn't TTY, an error is thrown.
      execOptions.stdio = [process.stdin];
    }

    if (childProc.execFileSync) {
      hostArgs = getHostArgs(options);
      if (_DBG_checkMethod) { _DBG_checkMethod('execFileSync', hostArgs); }
      try {
        res.input = childProc.execFileSync(extHostPath, hostArgs, execOptions);
      } catch (e) { // non-zero exit code
        extMessage = e.stderr ? (e.stderr + '').trim() : '';
        res.error = new Error(DEFAULT_ERR_MSG + (extMessage ? '\n' + extMessage : ''));
        res.error.method = 'execFileSync';
        res.error.program = extHostPath;
        res.error.args = hostArgs;
        res.error.extMessage = extMessage;
        res.error.exitCode = e.status;
        res.error.code = e.code;
        res.error.signal = e.signal;
      }
    } else {
      res = _execFileSync(options, execOptions);
    }
    if (!res.error) {
      res.input = res.input.replace(/^\s*'|'\s*$/g, '');
      options.display = '';
    }

    return res;
  }

  /*
    display:            string
    displayOnly:        boolean
    keyIn:              boolean
    hideEchoBack:       boolean
    mask:               string
    limit:              string (pattern)
    caseSensitive:      boolean
    keepWhitespace:     boolean
    encoding, bufferSize, print
  */
  function _readlineSync(options) {
    var input = '', displaySave = options.display,
      silent = !options.display &&
        options.keyIn && options.hideEchoBack && !options.mask;

    function tryExt() {
      var res = readlineExt(options);
      if (res.error) { throw res.error; }
      return res.input;
    }

    if (_DBG_checkOptions) { _DBG_checkOptions(options); }

    (function() { // open TTY
      var fsB, constants, verNum;

      function getFsB() {
        if (!fsB) {
          fsB = process.binding('fs'); // For raw device path
          constants = process.binding('constants');
        }
        return fsB;
      }

      if (typeof fdR !== 'string') { return; }
      fdR = null;

      if (IS_WIN) {
        // iojs-v2.3.2+ input stream can't read first line. (#18)
        // ** Don't get process.stdin before check! **
        // Fixed v5.1.0
        // Fixed v4.2.4
        // It regressed again in v5.6.0, it is fixed in v6.2.0.
        verNum = (function(ver) { // getVerNum
          var nums = ver.replace(/^\D+/, '').split('.');
          var verNum = 0;
          if ((nums[0] = +nums[0])) { verNum += nums[0] * 10000; }
          if ((nums[1] = +nums[1])) { verNum += nums[1] * 100; }
          if ((nums[2] = +nums[2])) { verNum += nums[2]; }
          return verNum;
        })(process.version);
        if (!(verNum >= 20302 && verNum < 40204 || verNum >= 50000 && verNum < 50100 || verNum >= 50600 && verNum < 60200) &&
            process.stdin.isTTY) {
          process.stdin.pause();
          fdR = process.stdin.fd;
          ttyR = process.stdin._handle;
        } else {
          try {
            // The stream by fs.openSync('\\\\.\\CON', 'r') can't switch to raw mode.
            // 'CONIN$' might fail on XP, 2000, 7 (x86).
            fdR = getFsB().open('CONIN$', constants.O_RDWR, parseInt('0666', 8));
            ttyR = new TTY(fdR, true);
          } catch (e) { /* ignore */ }
        }

        if (process.stdout.isTTY) {
          fdW = process.stdout.fd;
        } else {
          try {
            fdW = fs.openSync('\\\\.\\CON', 'w');
          } catch (e) { /* ignore */ }
          if (typeof fdW !== 'number') { // Retry
            try {
              fdW = getFsB().open('CONOUT$', constants.O_RDWR, parseInt('0666', 8));
            } catch (e) { /* ignore */ }
          }
        }

      } else {
        if (process.stdin.isTTY) {
          process.stdin.pause();
          try {
            fdR = fs.openSync('/dev/tty', 'r'); // device file, not process.stdin
            ttyR = process.stdin._handle;
          } catch (e) { /* ignore */ }
        } else {
          // Node.js v0.12 read() fails.
          try {
            fdR = fs.openSync('/dev/tty', 'r');
            ttyR = new TTY(fdR, false);
          } catch (e) { /* ignore */ }
        }

        if (process.stdout.isTTY) {
          fdW = process.stdout.fd;
        } else {
          try {
            fdW = fs.openSync('/dev/tty', 'w');
          } catch (e) { /* ignore */ }
        }
      }
    })();

    (function() { // try read
      var atEol, limit,
        isCooked = !options.hideEchoBack && !options.keyIn,
        buffer, reqSize, readSize, chunk, line;
      rawInput = '';

      // Node.js v0.10- returns an error if same mode is set.
      function setRawMode(mode) {
        if (mode === isRawMode) { return true; }
        if (ttyR.setRawMode(mode) !== 0) { return false; }
        isRawMode = mode;
        return true;
      }

      if (_DBG_useExt || !ttyR ||
          typeof fdW !== 'number' && (options.display || !isCooked)) {
        input = tryExt();
        return;
      }

      if (options.display) {
        fs.writeSync(fdW, options.display);
        options.display = '';
      }
      if (options.displayOnly) { return; }

      if (!setRawMode(!isCooked)) {
        input = tryExt();
        return;
      }

      reqSize = options.keyIn ? 1 : options.bufferSize;
      // Check `allocUnsafe` to make sure of the new API.
      buffer = Buffer.allocUnsafe && Buffer.alloc ? Buffer.alloc(reqSize) : new Buffer(reqSize);

      if (options.keyIn && options.limit) {
        limit = new RegExp('[^' + options.limit + ']',
          'g' + (options.caseSensitive ? '' : 'i'));
      }

      while (true) {
        readSize = 0;
        try {
          readSize = fs.readSync(fdR, buffer, 0, reqSize);
        } catch (e) {
          if (e.code !== 'EOF') {
            setRawMode(false);
            input += tryExt();
            return;
          }
        }
        if (readSize > 0) {
          chunk = buffer.toString(options.encoding, 0, readSize);
          rawInput += chunk;
        } else {
          chunk = '\n';
          rawInput += String.fromCharCode(0);
        }

        if (chunk && typeof (line = (chunk.match(/^(.*?)[\r\n]/) || [])[1]) === 'string') {
          chunk = line;
          atEol = true;
        }

        // other ctrl-chars
        // eslint-disable-next-line no-control-regex
        if (chunk) { chunk = chunk.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ''); }
        if (chunk && limit) { chunk = chunk.replace(limit, ''); }

        if (chunk) {
          if (!isCooked) {
            if (!options.hideEchoBack) {
              fs.writeSync(fdW, chunk);
            } else if (options.mask) {
              fs.writeSync(fdW, (new Array(chunk.length + 1)).join(options.mask));
            }
          }
          input += chunk;
        }

        if (!options.keyIn && atEol ||
          options.keyIn && input.length >= reqSize) { break; }
      }

      if (!isCooked && !silent) { fs.writeSync(fdW, '\n'); }
      setRawMode(false);
    })();

    if (options.print && !silent) {
      options.print(displaySave + (options.displayOnly ? '' :
          (options.hideEchoBack ? (new Array(input.length + 1)).join(options.mask)
            : input) + '\n'), // must at least write '\n'
        options.encoding);
    }

    return options.displayOnly ? '' :
      (lastInput = options.keepWhitespace || options.keyIn ? input : input.trim());
  }

  function flattenArray(array, validator) {
    var flatArray = [];
    function _flattenArray(array) {
      if (array == null) {
        return;
      } else if (Array.isArray(array)) {
        array.forEach(_flattenArray);
      } else if (!validator || validator(array)) {
        flatArray.push(array);
      }
    }
    _flattenArray(array);
    return flatArray;
  }

  function escapePattern(pattern) {
    return pattern.replace(/[\x00-\x7f]/g, // eslint-disable-line no-control-regex
      function(s) { return '\\x' + ('00' + s.charCodeAt().toString(16)).substr(-2); });
  }

  // margeOptions(options1, options2 ... )
  // margeOptions(true, options1, options2 ... )
  //    arg1=true : Start from defaultOptions and pick elements of that.
  function margeOptions() {
    var optionsList = Array.prototype.slice.call(arguments),
      optionNames, fromDefault;

    if (optionsList.length && typeof optionsList[0] === 'boolean') {
      fromDefault = optionsList.shift();
      if (fromDefault) {
        optionNames = Object.keys(defaultOptions);
        optionsList.unshift(defaultOptions);
      }
    }

    return optionsList.reduce(function(options, optionsPart) {
      if (optionsPart == null) { return options; }

      // ======== DEPRECATED ========
      if (optionsPart.hasOwnProperty('noEchoBack') &&
          !optionsPart.hasOwnProperty('hideEchoBack')) {
        optionsPart.hideEchoBack = optionsPart.noEchoBack;
        delete optionsPart.noEchoBack;
      }
      if (optionsPart.hasOwnProperty('noTrim') &&
          !optionsPart.hasOwnProperty('keepWhitespace')) {
        optionsPart.keepWhitespace = optionsPart.noTrim;
        delete optionsPart.noTrim;
      }
      // ======== /DEPRECATED ========

      if (!fromDefault) { optionNames = Object.keys(optionsPart); }
      optionNames.forEach(function(optionName) {
        var value;
        if (!optionsPart.hasOwnProperty(optionName)) { return; }
        value = optionsPart[optionName];
        switch (optionName) {
                             // _readlineSync <- *    * -> defaultOptions
          // ================ string
          case 'mask':                        // *    *
          case 'limitMessage':                //      *
          case 'defaultInput':                //      *
          case 'encoding':                    // *    *
            value = value != null ? value + '' : '';
            if (value && optionName !== 'limitMessage') { value = value.replace(/[\r\n]/g, ''); }
            options[optionName] = value;
            break;
          // ================ number(int)
          case 'bufferSize':                  // *    *
            if (!isNaN(value = parseInt(value, 10)) && typeof value === 'number') {
              options[optionName] = value; // limited updating (number is needed)
            }
            break;
          // ================ boolean
          case 'displayOnly':                 // *
          case 'keyIn':                       // *
          case 'hideEchoBack':                // *    *
          case 'caseSensitive':               // *    *
          case 'keepWhitespace':              // *    *
          case 'history':                     //      *
          case 'cd':                          //      *
            options[optionName] = !!value;
            break;
          // ================ array
          case 'limit':                       // *    *     to string for readlineExt
          case 'trueValue':                   //      *
          case 'falseValue':                  //      *
            options[optionName] = flattenArray(value, function(value) {
              var type = typeof value;
              return type === 'string' || type === 'number' ||
                type === 'function' || value instanceof RegExp;
            }).map(function(value) {
              return typeof value === 'string' ? value.replace(/[\r\n]/g, '') : value;
            });
            break;
          // ================ function
          case 'print':                       // *    *
          case 'phContent':                   //      *
          case 'preCheck':                    //      *
            options[optionName] = typeof value === 'function' ? value : void 0;
            break;
          // ================ other
          case 'prompt':                      //      *
          case 'display':                     // *
            options[optionName] = value != null ? value : '';
            break;
          // no default
        }
      });
      return options;
    }, {});
  }

  function isMatched(res, comps, caseSensitive) {
    return comps.some(function(comp) {
      var type = typeof comp;
      return type === 'string' ?
          (caseSensitive ? res === comp : res.toLowerCase() === comp.toLowerCase()) :
        type === 'number' ? parseFloat(res) === comp :
        type === 'function' ? comp(res) :
        comp instanceof RegExp ? comp.test(res) : false;
    });
  }

  function replaceHomePath(path, expand) {
    var homePath = pathUtil.normalize(
      IS_WIN ? (process.env.HOMEDRIVE || '') + (process.env.HOMEPATH || '') :
      process.env.HOME || '').replace(/[\/\\]+$/, '');
    path = pathUtil.normalize(path);
    return expand ? path.replace(/^~(?=\/|\\|$)/, homePath) :
      path.replace(new RegExp('^' + escapePattern(homePath) +
        '(?=\\/|\\\\|$)', IS_WIN ? 'i' : ''), '~');
  }

  function replacePlaceholder(text, generator) {
    var PTN_INNER = '(?:\\(([\\s\\S]*?)\\))?(\\w+|.-.)(?:\\(([\\s\\S]*?)\\))?',
      rePlaceholder = new RegExp('(\\$)?(\\$<' + PTN_INNER + '>)', 'g'),
      rePlaceholderCompat = new RegExp('(\\$)?(\\$\\{' + PTN_INNER + '\\})', 'g');

    function getPlaceholderText(s, escape, placeholder, pre, param, post) {
      var text;
      return escape || typeof (text = generator(param)) !== 'string' ? placeholder :
        text ? (pre || '') + text + (post || '') : '';
    }

    return text.replace(rePlaceholder, getPlaceholderText)
      .replace(rePlaceholderCompat, getPlaceholderText);
  }

  function array2charlist(array, caseSensitive, collectSymbols) {
    var values, group = [], groupClass = -1, charCode = 0, symbols = '', suppressed;
    function addGroup(groups, group) {
      if (group.length > 3) { // ellipsis
        groups.push(group[0] + '...' + group[group.length - 1]);
        suppressed = true;
      } else if (group.length) {
        groups = groups.concat(group);
      }
      return groups;
    }

    values = array.reduce(
        function(chars, value) { return chars.concat((value + '').split('')); }, [])
      .reduce(function(groups, curChar) {
        var curGroupClass, curCharCode;
        if (!caseSensitive) { curChar = curChar.toLowerCase(); }
        curGroupClass = /^\d$/.test(curChar) ? 1 :
          /^[A-Z]$/.test(curChar) ? 2 : /^[a-z]$/.test(curChar) ? 3 : 0;
        if (collectSymbols && curGroupClass === 0) {
          symbols += curChar;
        } else {
          curCharCode = curChar.charCodeAt(0);
          if (curGroupClass && curGroupClass === groupClass &&
              curCharCode === charCode + 1) {
            group.push(curChar);
          } else {
            groups = addGroup(groups, group);
            group = [curChar];
            groupClass = curGroupClass;
          }
          charCode = curCharCode;
        }
        return groups;
      }, []);
    values = addGroup(values, group); // last group
    if (symbols) { values.push(symbols); suppressed = true; }
    return {values: values, suppressed: suppressed};
  }

  function joinChunks(chunks, suppressed) {
    return chunks.join(chunks.length > 2 ? ', ' : suppressed ? ' / ' : '/');
  }

  function getPhContent(param, options) {
    var text, values, resCharlist = {}, arg;
    if (options.phContent) {
      text = options.phContent(param, options);
    }
    if (typeof text !== 'string') {
      switch (param) {
        case 'hideEchoBack':
        case 'mask':
        case 'defaultInput':
        case 'caseSensitive':
        case 'keepWhitespace':
        case 'encoding':
        case 'bufferSize':
        case 'history':
        case 'cd':
          text = !options.hasOwnProperty(param) ? '' :
            typeof options[param] === 'boolean' ? (options[param] ? 'on' : 'off') :
            options[param] + '';
          break;
        // case 'prompt':
        // case 'query':
        // case 'display':
        //   text = options.hasOwnProperty('displaySrc') ? options.displaySrc + '' : '';
        //   break;
        case 'limit':
        case 'trueValue':
        case 'falseValue':
          values = options[options.hasOwnProperty(param + 'Src') ? param + 'Src' : param];
          if (options.keyIn) { // suppress
            resCharlist = array2charlist(values, options.caseSensitive);
            values = resCharlist.values;
          } else {
            values = values.filter(function(value) {
              var type = typeof value;
              return type === 'string' || type === 'number';
            });
          }
          text = joinChunks(values, resCharlist.suppressed);
          break;
        case 'limitCount':
        case 'limitCountNotZero':
          text = options[options.hasOwnProperty('limitSrc') ?
            'limitSrc' : 'limit'].length;
          text = text || param !== 'limitCountNotZero' ? text + '' : '';
          break;
        case 'lastInput':
          text = lastInput;
          break;
        case 'cwd':
        case 'CWD':
        case 'cwdHome':
          text = process.cwd();
          if (param === 'CWD') {
            text = pathUtil.basename(text);
          } else if (param === 'cwdHome') {
            text = replaceHomePath(text);
          }
          break;
        case 'date':
        case 'time':
        case 'localeDate':
        case 'localeTime':
          text = (new Date())['to' +
            param.replace(/^./, function(str) { return str.toUpperCase(); }) +
            'String']();
          break;
        default: // with arg
          if (typeof (arg = (param.match(/^history_m(\d+)$/) || [])[1]) === 'string') {
            text = inputHistory[inputHistory.length - arg] || '';
          }
      }
    }
    return text;
  }

  function getPhCharlist(param) {
    var matches = /^(.)-(.)$/.exec(param), text = '', from, to, code, step;
    if (!matches) { return null; }
    from = matches[1].charCodeAt(0);
    to = matches[2].charCodeAt(0);
    step = from < to ? 1 : -1;
    for (code = from; code !== to + step; code += step) { text += String.fromCharCode(code); }
    return text;
  }

  // cmd "arg" " a r g " "" 'a"r"g' "a""rg" "arg
  function parseCl(cl) {
    var reToken = new RegExp(/(\s*)(?:("|')(.*?)(?:\2|$)|(\S+))/g), matches,
      taken = '', args = [], part;
    cl = cl.trim();
    while ((matches = reToken.exec(cl))) {
      part = matches[3] || matches[4] || '';
      if (matches[1]) {
        args.push(taken);
        taken = '';
      }
      taken += part;
    }
    if (taken) { args.push(taken); }
    return args;
  }

  function toBool(res, options) {
    return (
      (options.trueValue.length &&
        isMatched(res, options.trueValue, options.caseSensitive)) ? true :
      (options.falseValue.length &&
        isMatched(res, options.falseValue, options.caseSensitive)) ? false : res);
  }

  function getValidLine(options) {
    var res, forceNext, limitMessage,
      matches, histInput, args, resCheck;

    function _getPhContent(param) { return getPhContent(param, options); }
    function addDisplay(text) { options.display += (/[^\r\n]$/.test(options.display) ? '\n' : '') + text; }

    options.limitSrc = options.limit;
    options.displaySrc = options.display;
    options.limit = ''; // for readlineExt
    options.display = replacePlaceholder(options.display + '', _getPhContent);

    while (true) {
      res = _readlineSync(options);
      forceNext = false;
      limitMessage = '';

      if (options.defaultInput && !res) { res = options.defaultInput; }

      if (options.history) {
        if ((matches = /^\s*\!(?:\!|-1)(:p)?\s*$/.exec(res))) { // `!!` `!-1` +`:p`
          histInput = inputHistory[0] || '';
          if (matches[1]) { // only display
            forceNext = true;
          } else { // replace input
            res = histInput;
          }
          // Show it even if it is empty (NL only).
          addDisplay(histInput + '\n');
          if (!forceNext) { // Loop may break
            options.displayOnly = true;
            _readlineSync(options);
            options.displayOnly = false;
          }
        } else if (res && res !== inputHistory[inputHistory.length - 1]) {
          inputHistory = [res];
        }
      }

      if (!forceNext && options.cd && res) {
        args = parseCl(res);
        switch (args[0].toLowerCase()) {
          case 'cd':
            if (args[1]) {
              try {
                process.chdir(replaceHomePath(args[1], true));
              } catch (e) {
                addDisplay(e + '');
              }
            }
            forceNext = true;
            break;
          case 'pwd':
            addDisplay(process.cwd());
            forceNext = true;
            break;
          // no default
        }
      }

      if (!forceNext && options.preCheck) {
        resCheck = options.preCheck(res, options);
        res = resCheck.res;
        if (resCheck.forceNext) { forceNext = true; } // Don't switch to false.
      }

      if (!forceNext) {
        if (!options.limitSrc.length ||
          isMatched(res, options.limitSrc, options.caseSensitive)) { break; }
        if (options.limitMessage) {
          limitMessage = replacePlaceholder(options.limitMessage, _getPhContent);
        }
      }

      addDisplay((limitMessage ? limitMessage + '\n' : '') +
        replacePlaceholder(options.displaySrc + '', _getPhContent));
    }
    return toBool(res, options);
  }

  // for dev
  exports._DBG_set_useExt = function(val) { _DBG_useExt = val; };
  exports._DBG_set_checkOptions = function(val) { _DBG_checkOptions = val; };
  exports._DBG_set_checkMethod = function(val) { _DBG_checkMethod = val; };
  exports._DBG_clearHistory = function() { lastInput = ''; inputHistory = []; };

  // ------------------------------------

  exports.setDefaultOptions = function(options) {
    defaultOptions = margeOptions(true, options);
    return margeOptions(true); // copy
  };

  exports.question = function(query, options) {
    /* eslint-disable key-spacing */
    return getValidLine(margeOptions(margeOptions(true, options), {
      display:            query
    }));
    /* eslint-enable key-spacing */
  };

  exports.prompt = function(options) {
    var readOptions = margeOptions(true, options);
    readOptions.display = readOptions.prompt;
    return getValidLine(readOptions);
  };

  exports.keyIn = function(query, options) {
    /* eslint-disable key-spacing */
    var readOptions = margeOptions(margeOptions(true, options), {
      display:            query,
      keyIn:              true,
      keepWhitespace:     true
    });
    /* eslint-enable key-spacing */

    // char list
    readOptions.limitSrc = readOptions.limit.filter(function(value) {
      var type = typeof value;
      return type === 'string' || type === 'number';
    })
    .map(function(text) { return replacePlaceholder(text + '', getPhCharlist); });
    // pattern
    readOptions.limit = escapePattern(readOptions.limitSrc.join(''));

    ['trueValue', 'falseValue'].forEach(function(optionName) {
      readOptions[optionName] = readOptions[optionName].reduce(function(comps, comp) {
        var type = typeof comp;
        if (type === 'string' || type === 'number') {
          comps = comps.concat((comp + '').split(''));
        } else { comps.push(comp); }
        return comps;
      }, []);
    });

    readOptions.display = replacePlaceholder(readOptions.display + '',
      function(param) { return getPhContent(param, readOptions); });

    return toBool(_readlineSync(readOptions), readOptions);
  };

  // ------------------------------------

  exports.questionEMail = function(query, options) {
    if (query == null) { query = 'Input e-mail address: '; }
    /* eslint-disable key-spacing */
    return exports.question(query, margeOptions({
      // -------- default
      hideEchoBack:       false,
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
      limit:              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      limitMessage:       'Input valid e-mail address, please.',
      trueValue:          null,
      falseValue:         null
    }, options, {
      // -------- forced
      keepWhitespace:     false,
      cd:                 false
    }));
    /* eslint-enable key-spacing */
  };

  exports.questionNewPassword = function(query, options) {
    /* eslint-disable key-spacing */
    var resCharlist, min, max,
      readOptions = margeOptions({
        // -------- default
        hideEchoBack:       true,
        mask:               '*',
        limitMessage:       'It can include: $<charlist>\n' +
                              'And the length must be: $<length>',
        trueValue:          null,
        falseValue:         null,
        caseSensitive:      true
      }, options, {
        // -------- forced
        history:            false,
        cd:                 false,
        // limit (by charlist etc.),
        phContent: function(param) {
          return param === 'charlist' ? resCharlist.text :
            param === 'length' ? min + '...' + max : null;
        }
      }),
      // added:     charlist, min, max, confirmMessage, unmatchMessage
      charlist, confirmMessage, unmatchMessage,
      limit, limitMessage, res1, res2;
    /* eslint-enable key-spacing */
    options = options || {};

    charlist = replacePlaceholder(
      options.charlist ? options.charlist + '' : '$<!-~>', getPhCharlist);
    if (isNaN(min = parseInt(options.min, 10)) || typeof min !== 'number') { min = 12; }
    if (isNaN(max = parseInt(options.max, 10)) || typeof max !== 'number') { max = 24; }
    limit = new RegExp('^[' + escapePattern(charlist) +
      ']{' + min + ',' + max + '}$');
    resCharlist = array2charlist([charlist], readOptions.caseSensitive, true);
    resCharlist.text = joinChunks(resCharlist.values, resCharlist.suppressed);

    confirmMessage = options.confirmMessage != null ? options.confirmMessage :
      'Reinput a same one to confirm it: ';
    unmatchMessage = options.unmatchMessage != null ? options.unmatchMessage :
      'It differs from first one.' +
        ' Hit only the Enter key if you want to retry from first one.';

    if (query == null) { query = 'Input new password: '; }

    limitMessage = readOptions.limitMessage;
    while (!res2) {
      readOptions.limit = limit;
      readOptions.limitMessage = limitMessage;
      res1 = exports.question(query, readOptions);

      readOptions.limit = [res1, ''];
      readOptions.limitMessage = unmatchMessage;
      res2 = exports.question(confirmMessage, readOptions);
    }

    return res1;
  };

  function _questionNum(query, options, parser) {
    var validValue;
    function getValidValue(value) {
      validValue = parser(value);
      return !isNaN(validValue) && typeof validValue === 'number';
    }
    /* eslint-disable key-spacing */
    exports.question(query, margeOptions({
      // -------- default
      limitMessage:       'Input valid number, please.'
    }, options, {
      // -------- forced
      limit:              getValidValue,
      cd:                 false
      // trueValue, falseValue, caseSensitive, keepWhitespace don't work.
    }));
    /* eslint-enable key-spacing */
    return validValue;
  }
  exports.questionInt = function(query, options) {
    return _questionNum(query, options, function(value) { return parseInt(value, 10); });
  };
  exports.questionFloat = function(query, options) {
    return _questionNum(query, options, parseFloat);
  };

  exports.questionPath = function(query, options) {
    /* eslint-disable key-spacing */
    var validPath, error = '',
      readOptions = margeOptions({
        // -------- default
        hideEchoBack:       false,
        limitMessage:       '$<error(\n)>Input valid path, please.' +
                              '$<( Min:)min>$<( Max:)max>',
        history:            true,
        cd:                 true
      }, options, {
        // -------- forced
        keepWhitespace:     false,
        limit: function(value) {
          var exists, stat, res;
          value = replaceHomePath(value, true);
          error = ''; // for validate
          // mkdir -p
          function mkdirParents(dirPath) {
            dirPath.split(/\/|\\/).reduce(function(parents, dir) {
              var path = pathUtil.resolve((parents += dir + pathUtil.sep));
              if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
              } else if (!fs.statSync(path).isDirectory()) {
                throw new Error('Non directory already exists: ' + path);
              }
              return parents;
            }, '');
          }

          try {
            exists = fs.existsSync(value);
            validPath = exists ? fs.realpathSync(value) : pathUtil.resolve(value);
            // options.exists default: true, not-bool: no-check
            if (!options.hasOwnProperty('exists') && !exists ||
                typeof options.exists === 'boolean' && options.exists !== exists) {
              error = (exists ? 'Already exists' : 'No such file or directory') +
                ': ' + validPath;
              return false;
            }
            if (!exists && options.create) {
              if (options.isDirectory) {
                mkdirParents(validPath);
              } else {
                mkdirParents(pathUtil.dirname(validPath));
                fs.closeSync(fs.openSync(validPath, 'w')); // touch
              }
              validPath = fs.realpathSync(validPath);
            }
            if (exists && (options.min || options.max ||
                options.isFile || options.isDirectory)) {
              stat = fs.statSync(validPath);
              // type check first (directory has zero size)
              if (options.isFile && !stat.isFile()) {
                error = 'Not file: ' + validPath;
                return false;
              } else if (options.isDirectory && !stat.isDirectory()) {
                error = 'Not directory: ' + validPath;
                return false;
              } else if (options.min && stat.size < +options.min ||
                  options.max && stat.size > +options.max) {
                error = 'Size ' + stat.size + ' is out of range: ' + validPath;
                return false;
              }
            }
            if (typeof options.validate === 'function' &&
                (res = options.validate(validPath)) !== true) {
              if (typeof res === 'string') { error = res; }
              return false;
            }
          } catch (e) {
            error = e + '';
            return false;
          }
          return true;
        },
        // trueValue, falseValue, caseSensitive don't work.
        phContent: function(param) {
          return param === 'error' ? error :
            param !== 'min' && param !== 'max' ? null :
            options.hasOwnProperty(param) ? options[param] + '' : '';
        }
      });
      // added:     exists, create, min, max, isFile, isDirectory, validate
    /* eslint-enable key-spacing */
    options = options || {};

    if (query == null) { query = 'Input path (you can "cd" and "pwd"): '; }

    exports.question(query, readOptions);
    return validPath;
  };

  // props: preCheck, args, hRes, limit
  function getClHandler(commandHandler, options) {
    var clHandler = {}, hIndex = {};
    if (typeof commandHandler === 'object') {
      Object.keys(commandHandler).forEach(function(cmd) {
        if (typeof commandHandler[cmd] === 'function') {
          hIndex[options.caseSensitive ? cmd : cmd.toLowerCase()] = commandHandler[cmd];
        }
      });
      clHandler.preCheck = function(res) {
        var cmdKey;
        clHandler.args = parseCl(res);
        cmdKey = clHandler.args[0] || '';
        if (!options.caseSensitive) { cmdKey = cmdKey.toLowerCase(); }
        clHandler.hRes =
          cmdKey !== '_' && hIndex.hasOwnProperty(cmdKey) ?
            hIndex[cmdKey].apply(res, clHandler.args.slice(1)) :
          hIndex.hasOwnProperty('_') ? hIndex._.apply(res, clHandler.args) : null;
        return {res: res, forceNext: false};
      };
      if (!hIndex.hasOwnProperty('_')) {
        clHandler.limit = function() { // It's called after preCheck.
          var cmdKey = clHandler.args[0] || '';
          if (!options.caseSensitive) { cmdKey = cmdKey.toLowerCase(); }
          return hIndex.hasOwnProperty(cmdKey);
        };
      }
    } else {
      clHandler.preCheck = function(res) {
        clHandler.args = parseCl(res);
        clHandler.hRes = typeof commandHandler === 'function' ?
          commandHandler.apply(res, clHandler.args) : true; // true for break loop
        return {res: res, forceNext: false};
      };
    }
    return clHandler;
  }

  exports.promptCL = function(commandHandler, options) {
    /* eslint-disable key-spacing */
    var readOptions = margeOptions({
        // -------- default
        hideEchoBack:       false,
        limitMessage:       'Requested command is not available.',
        caseSensitive:      false,
        history:            true
      }, options),
        // -------- forced
        // trueValue, falseValue, keepWhitespace don't work.
        // preCheck, limit (by clHandler)
      clHandler = getClHandler(commandHandler, readOptions);
    /* eslint-enable key-spacing */
    readOptions.limit = clHandler.limit;
    readOptions.preCheck = clHandler.preCheck;
    exports.prompt(readOptions);
    return clHandler.args;
  };

  exports.promptLoop = function(inputHandler, options) {
    /* eslint-disable key-spacing */
    var readOptions = margeOptions({
      // -------- default
      hideEchoBack:       false,
      trueValue:          null,
      falseValue:         null,
      caseSensitive:      false,
      history:            true
    }, options);
    /* eslint-enable key-spacing */
    while (true) { if (inputHandler(exports.prompt(readOptions))) { break; } }
    return;
  };

  exports.promptCLLoop = function(commandHandler, options) {
    /* eslint-disable key-spacing */
    var readOptions = margeOptions({
        // -------- default
        hideEchoBack:       false,
        limitMessage:       'Requested command is not available.',
        caseSensitive:      false,
        history:            true
      }, options),
        // -------- forced
        // trueValue, falseValue, keepWhitespace don't work.
        // preCheck, limit (by clHandler)
      clHandler = getClHandler(commandHandler, readOptions);
    /* eslint-enable key-spacing */
    readOptions.limit = clHandler.limit;
    readOptions.preCheck = clHandler.preCheck;
    while (true) {
      exports.prompt(readOptions);
      if (clHandler.hRes) { break; }
    }
    return;
  };

  exports.promptSimShell = function(options) {
    /* eslint-disable key-spacing */
    return exports.prompt(margeOptions({
      // -------- default
      hideEchoBack:       false,
      history:            true
    }, options, {
      // -------- forced
      prompt:             (function() {
        return IS_WIN ?
          '$<cwd>>' :
          // 'user@host:cwd$ '
          (process.env.USER || '') +
          (process.env.HOSTNAME ?
            '@' + process.env.HOSTNAME.replace(/\..*$/, '') : '') +
          ':$<cwdHome>$ ';
      })()
    }));
    /* eslint-enable key-spacing */
  };

  function _keyInYN(query, options, limit) {
    var res;
    if (query == null) { query = 'Are you sure? '; }
    if ((!options || options.guide !== false) && (query += '')) {
      query = query.replace(/\s*:?\s*$/, '') + ' [y/n]: ';
    }
    /* eslint-disable key-spacing */
    res = exports.keyIn(query, margeOptions(options, {
      // -------- forced
      hideEchoBack:       false,
      limit:              limit,
      trueValue:          'y',
      falseValue:         'n',
      caseSensitive:      false
      // mask doesn't work.
    }));
    // added:     guide
    /* eslint-enable key-spacing */
    return typeof res === 'boolean' ? res : '';
  }
  exports.keyInYN = function(query, options) { return _keyInYN(query, options); };
  exports.keyInYNStrict = function(query, options) { return _keyInYN(query, options, 'yn'); };

  exports.keyInPause = function(query, options) {
    if (query == null) { query = 'Continue...'; }
    if ((!options || options.guide !== false) && (query += '')) {
      query = query.replace(/\s+$/, '') + ' (Hit any key)';
    }
    /* eslint-disable key-spacing */
    exports.keyIn(query, margeOptions({
      // -------- default
      limit:              null
    }, options, {
      // -------- forced
      hideEchoBack:       true,
      mask:               ''
    }));
    // added:     guide
    /* eslint-enable key-spacing */
    return;
  };

  exports.keyInSelect = function(items, query, options) {
    /* eslint-disable key-spacing */
    var readOptions = margeOptions({
        // -------- default
        hideEchoBack:       false
      }, options, {
        // -------- forced
        trueValue:          null,
        falseValue:         null,
        caseSensitive:      false,
        // limit (by items),
        phContent: function(param) {
          return param === 'itemsCount' ? items.length + '' :
            param === 'firstItem' ? (items[0] + '').trim() :
            param === 'lastItem' ? (items[items.length - 1] + '').trim() : null;
        }
      }),
      // added:     guide, cancel
      keylist = '', key2i = {}, charCode = 49 /* '1' */, display = '\n';
    /* eslint-enable key-spacing */
    if (!Array.isArray(items) || !items.length || items.length > 35) {
      throw '`items` must be Array (max length: 35).';
    }

    items.forEach(function(item, i) {
      var key = String.fromCharCode(charCode);
      keylist += key;
      key2i[key] = i;
      display += '[' + key + '] ' + (item + '').trim() + '\n';
      charCode = charCode === 57 /* '9' */ ? 97 /* 'a' */ : charCode + 1;
    });
    if (!options || options.cancel !== false) {
      keylist += '0';
      key2i['0'] = -1;
      display += '[0] ' +
        (options && options.cancel != null && typeof options.cancel !== 'boolean' ?
          (options.cancel + '').trim() : 'CANCEL') + '\n';
    }
    readOptions.limit = keylist;
    display += '\n';

    if (query == null) { query = 'Choose one from list: '; }
    if ((query += '')) {
      if (!options || options.guide !== false) {
        query = query.replace(/\s*:?\s*$/, '') + ' [$<limit>]: ';
      }
      display += query;
    }

    return key2i[exports.keyIn(display, readOptions).toLowerCase()];
  };

  exports.getRawInput = function() { return rawInput; };

  // ======== DEPRECATED ========
  function _setOption(optionName, args) {
    var options;
    if (args.length) { options = {}; options[optionName] = args[0]; }
    return exports.setDefaultOptions(options)[optionName];
  }
  exports.setPrint = function() { return _setOption('print', arguments); };
  exports.setPrompt = function() { return _setOption('prompt', arguments); };
  exports.setEncoding = function() { return _setOption('encoding', arguments); };
  exports.setMask = function() { return _setOption('mask', arguments); };
  exports.setBufferSize = function() { return _setOption('bufferSize', arguments); };


  /***/ }),
  /* 10 */
  /***/ (function(module, exports) {

  module.exports = require("child_process");

  /***/ }),
  /* 11 */
  /***/ (function(module, exports) {

  module.exports = require("path");

  /***/ }),
  /* 12 */
  /***/ (function(module, exports) {

  module.exports = require("os");

  /***/ }),
  /* 13 */
  /***/ (function(module, exports) {

  module.exports = require("crypto");

  /***/ }),
  /* 14 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";
   /// <reference path="./tauProlog.d.ts"/>

  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const core_1 = __webpack_require__(1);

  const get_1 = __importDefault(__webpack_require__(15));

  const tau_prolog_1 = __importDefault(__webpack_require__(7));

  const vm_1 = __importDefault(__webpack_require__(67)); // eslint-disable-next-line @typescript-eslint/camelcase


  const {
    is_atom: isAtom,
    is_variable: isVariable,
    is_instantiated_list: isInstantiatedList
  } = tau_prolog_1.default.type;

  function prependGoals(thread, point, goals) {
    thread.prepend(goals.map(goal => new tau_prolog_1.default.type.State(point.goal.replace(goal), point.substitution, point)));
  }

  const projects = new WeakMap();

  function getProject(thread) {
    const project = projects.get(thread.session);
    if (project == null) throw new Error(`Assertion failed: A project should have been registered for the active session`);
    return project;
  }

  const tauModule = new tau_prolog_1.default.type.Module(`constraints`, {
    [`project_workspaces_by_descriptor/3`]: (thread, point, atom) => {
      const [descriptorIdent, descriptorRange, workspaceCwd] = atom.args;

      if (!isAtom(descriptorIdent) || !isAtom(descriptorRange)) {
        thread.throwError(tau_prolog_1.default.error.instantiation(atom.indicator));
        return;
      }

      const ident = core_1.structUtils.parseIdent(descriptorIdent.id);
      const descriptor = core_1.structUtils.makeDescriptor(ident, descriptorRange.id);
      const project = getProject(thread);
      const workspace = project.tryWorkspaceByDescriptor(descriptor);

      if (isVariable(workspaceCwd)) {
        if (workspace !== null) {
          prependGoals(thread, point, [new tau_prolog_1.default.type.Term(`=`, [workspaceCwd, new tau_prolog_1.default.type.Term(String(workspace.relativeCwd))])]);
        }
      }

      if (isAtom(workspaceCwd)) {
        if (workspace !== null && workspace.relativeCwd === workspaceCwd.id) {
          thread.success(point);
        }
      }
    },
    [`workspace_field/3`]: (thread, point, atom) => {
      const [workspaceCwd, fieldName, fieldValue] = atom.args;

      if (!isAtom(workspaceCwd) || !isAtom(fieldName)) {
        thread.throwError(tau_prolog_1.default.error.instantiation(atom.indicator));
        return;
      }

      const project = getProject(thread);
      const workspace = project.tryWorkspaceByCwd(workspaceCwd.id); // Workspace not found => this predicate can never match
      // We might want to throw here? We can be pretty sure the user did
      // something wrong at this point

      if (workspace == null) return;
      const value = get_1.default(workspace.manifest.raw, fieldName.id); // Field is not present => this predicate can never match

      if (typeof value === `undefined`) return;
      prependGoals(thread, point, [new tau_prolog_1.default.type.Term(`=`, [fieldValue, new tau_prolog_1.default.type.Term(String(value))])]);
    },
    [`workspace_field_test/3`]: (thread, point, atom) => {
      const [workspaceCwd, fieldName, checkCode] = atom.args;
      thread.prepend([new tau_prolog_1.default.type.State(point.goal.replace(new tau_prolog_1.default.type.Term(`workspace_field_test`, [workspaceCwd, fieldName, checkCode, new tau_prolog_1.default.type.Term(`[]`, [])])), point.substitution, point)]);
    },
    [`workspace_field_test/4`]: (thread, point, atom) => {
      const [workspaceCwd, fieldName, checkCode, checkArgv] = atom.args;

      if (!isAtom(workspaceCwd) || !isAtom(fieldName) || !isAtom(checkCode) || !isInstantiatedList(checkArgv)) {
        thread.throwError(tau_prolog_1.default.error.instantiation(atom.indicator));
        return;
      }

      const project = getProject(thread);
      const workspace = project.tryWorkspaceByCwd(workspaceCwd.id); // Workspace not found => this predicate can never match
      // We might want to throw here? We can be pretty sure the user did
      // something wrong at this point

      if (workspace == null) return;
      const value = get_1.default(workspace.manifest.raw, fieldName.id); // Field is not present => this predicate can never match

      if (typeof value === `undefined`) return; // Inject the variables into a sandbox

      const vars = {
        $$: value
      };

      for (const [index, value] of checkArgv.toJavaScript().entries()) vars[`$${index}`] = value;

      const result = vm_1.default.runInNewContext(checkCode.id, vars);

      if (result) {
        thread.success(point);
      }
    }
  }, [`project_workspaces_by_descriptor/3`, `workspace_field/3`, `workspace_field_test/3`, `workspace_field_test/4`]);

  function linkProjectToSession(session, project) {
    projects.set(session, project);
    session.consult(`:- use_module(library(${tauModule.id})).`);
  }

  exports.linkProjectToSession = linkProjectToSession;

  /***/ }),
  /* 15 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseGet = __webpack_require__(16);

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  module.exports = get;


  /***/ }),
  /* 16 */
  /***/ (function(module, exports, __webpack_require__) {

  var castPath = __webpack_require__(17),
      toKey = __webpack_require__(66);

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  module.exports = baseGet;


  /***/ }),
  /* 17 */
  /***/ (function(module, exports, __webpack_require__) {

  var isArray = __webpack_require__(18),
      isKey = __webpack_require__(19),
      stringToPath = __webpack_require__(28),
      toString = __webpack_require__(63);

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }

  module.exports = castPath;


  /***/ }),
  /* 18 */
  /***/ (function(module, exports) {

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  module.exports = isArray;


  /***/ }),
  /* 19 */
  /***/ (function(module, exports, __webpack_require__) {

  var isArray = __webpack_require__(18),
      isSymbol = __webpack_require__(20);

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  module.exports = isKey;


  /***/ }),
  /* 20 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseGetTag = __webpack_require__(21),
      isObjectLike = __webpack_require__(27);

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  module.exports = isSymbol;


  /***/ }),
  /* 21 */
  /***/ (function(module, exports, __webpack_require__) {

  var Symbol = __webpack_require__(22),
      getRawTag = __webpack_require__(25),
      objectToString = __webpack_require__(26);

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  module.exports = baseGetTag;


  /***/ }),
  /* 22 */
  /***/ (function(module, exports, __webpack_require__) {

  var root = __webpack_require__(23);

  /** Built-in value references. */
  var Symbol = root.Symbol;

  module.exports = Symbol;


  /***/ }),
  /* 23 */
  /***/ (function(module, exports, __webpack_require__) {

  var freeGlobal = __webpack_require__(24);

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  module.exports = root;


  /***/ }),
  /* 24 */
  /***/ (function(module, exports) {

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  module.exports = freeGlobal;


  /***/ }),
  /* 25 */
  /***/ (function(module, exports, __webpack_require__) {

  var Symbol = __webpack_require__(22);

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  module.exports = getRawTag;


  /***/ }),
  /* 26 */
  /***/ (function(module, exports) {

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  module.exports = objectToString;


  /***/ }),
  /* 27 */
  /***/ (function(module, exports) {

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  module.exports = isObjectLike;


  /***/ }),
  /* 28 */
  /***/ (function(module, exports, __webpack_require__) {

  var memoizeCapped = __webpack_require__(29);

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  module.exports = stringToPath;


  /***/ }),
  /* 29 */
  /***/ (function(module, exports, __webpack_require__) {

  var memoize = __webpack_require__(30);

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  module.exports = memoizeCapped;


  /***/ }),
  /* 30 */
  /***/ (function(module, exports, __webpack_require__) {

  var MapCache = __webpack_require__(31);

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache;

  module.exports = memoize;


  /***/ }),
  /* 31 */
  /***/ (function(module, exports, __webpack_require__) {

  var mapCacheClear = __webpack_require__(32),
      mapCacheDelete = __webpack_require__(57),
      mapCacheGet = __webpack_require__(60),
      mapCacheHas = __webpack_require__(61),
      mapCacheSet = __webpack_require__(62);

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  module.exports = MapCache;


  /***/ }),
  /* 32 */
  /***/ (function(module, exports, __webpack_require__) {

  var Hash = __webpack_require__(33),
      ListCache = __webpack_require__(48),
      Map = __webpack_require__(56);

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map || ListCache),
      'string': new Hash
    };
  }

  module.exports = mapCacheClear;


  /***/ }),
  /* 33 */
  /***/ (function(module, exports, __webpack_require__) {

  var hashClear = __webpack_require__(34),
      hashDelete = __webpack_require__(44),
      hashGet = __webpack_require__(45),
      hashHas = __webpack_require__(46),
      hashSet = __webpack_require__(47);

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  module.exports = Hash;


  /***/ }),
  /* 34 */
  /***/ (function(module, exports, __webpack_require__) {

  var nativeCreate = __webpack_require__(35);

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

  module.exports = hashClear;


  /***/ }),
  /* 35 */
  /***/ (function(module, exports, __webpack_require__) {

  var getNative = __webpack_require__(36);

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  module.exports = nativeCreate;


  /***/ }),
  /* 36 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseIsNative = __webpack_require__(37),
      getValue = __webpack_require__(43);

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  module.exports = getNative;


  /***/ }),
  /* 37 */
  /***/ (function(module, exports, __webpack_require__) {

  var isFunction = __webpack_require__(38),
      isMasked = __webpack_require__(40),
      isObject = __webpack_require__(39),
      toSource = __webpack_require__(42);

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  module.exports = baseIsNative;


  /***/ }),
  /* 38 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseGetTag = __webpack_require__(21),
      isObject = __webpack_require__(39);

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  module.exports = isFunction;


  /***/ }),
  /* 39 */
  /***/ (function(module, exports) {

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  module.exports = isObject;


  /***/ }),
  /* 40 */
  /***/ (function(module, exports, __webpack_require__) {

  var coreJsData = __webpack_require__(41);

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  module.exports = isMasked;


  /***/ }),
  /* 41 */
  /***/ (function(module, exports, __webpack_require__) {

  var root = __webpack_require__(23);

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  module.exports = coreJsData;


  /***/ }),
  /* 42 */
  /***/ (function(module, exports) {

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  module.exports = toSource;


  /***/ }),
  /* 43 */
  /***/ (function(module, exports) {

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  module.exports = getValue;


  /***/ }),
  /* 44 */
  /***/ (function(module, exports) {

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  module.exports = hashDelete;


  /***/ }),
  /* 45 */
  /***/ (function(module, exports, __webpack_require__) {

  var nativeCreate = __webpack_require__(35);

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  module.exports = hashGet;


  /***/ }),
  /* 46 */
  /***/ (function(module, exports, __webpack_require__) {

  var nativeCreate = __webpack_require__(35);

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
  }

  module.exports = hashHas;


  /***/ }),
  /* 47 */
  /***/ (function(module, exports, __webpack_require__) {

  var nativeCreate = __webpack_require__(35);

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  module.exports = hashSet;


  /***/ }),
  /* 48 */
  /***/ (function(module, exports, __webpack_require__) {

  var listCacheClear = __webpack_require__(49),
      listCacheDelete = __webpack_require__(50),
      listCacheGet = __webpack_require__(53),
      listCacheHas = __webpack_require__(54),
      listCacheSet = __webpack_require__(55);

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  module.exports = ListCache;


  /***/ }),
  /* 49 */
  /***/ (function(module, exports) {

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  module.exports = listCacheClear;


  /***/ }),
  /* 50 */
  /***/ (function(module, exports, __webpack_require__) {

  var assocIndexOf = __webpack_require__(51);

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  module.exports = listCacheDelete;


  /***/ }),
  /* 51 */
  /***/ (function(module, exports, __webpack_require__) {

  var eq = __webpack_require__(52);

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  module.exports = assocIndexOf;


  /***/ }),
  /* 52 */
  /***/ (function(module, exports) {

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  module.exports = eq;


  /***/ }),
  /* 53 */
  /***/ (function(module, exports, __webpack_require__) {

  var assocIndexOf = __webpack_require__(51);

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  module.exports = listCacheGet;


  /***/ }),
  /* 54 */
  /***/ (function(module, exports, __webpack_require__) {

  var assocIndexOf = __webpack_require__(51);

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  module.exports = listCacheHas;


  /***/ }),
  /* 55 */
  /***/ (function(module, exports, __webpack_require__) {

  var assocIndexOf = __webpack_require__(51);

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  module.exports = listCacheSet;


  /***/ }),
  /* 56 */
  /***/ (function(module, exports, __webpack_require__) {

  var getNative = __webpack_require__(36),
      root = __webpack_require__(23);

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root, 'Map');

  module.exports = Map;


  /***/ }),
  /* 57 */
  /***/ (function(module, exports, __webpack_require__) {

  var getMapData = __webpack_require__(58);

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  module.exports = mapCacheDelete;


  /***/ }),
  /* 58 */
  /***/ (function(module, exports, __webpack_require__) {

  var isKeyable = __webpack_require__(59);

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  module.exports = getMapData;


  /***/ }),
  /* 59 */
  /***/ (function(module, exports) {

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  module.exports = isKeyable;


  /***/ }),
  /* 60 */
  /***/ (function(module, exports, __webpack_require__) {

  var getMapData = __webpack_require__(58);

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  module.exports = mapCacheGet;


  /***/ }),
  /* 61 */
  /***/ (function(module, exports, __webpack_require__) {

  var getMapData = __webpack_require__(58);

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  module.exports = mapCacheHas;


  /***/ }),
  /* 62 */
  /***/ (function(module, exports, __webpack_require__) {

  var getMapData = __webpack_require__(58);

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  module.exports = mapCacheSet;


  /***/ }),
  /* 63 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseToString = __webpack_require__(64);

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  module.exports = toString;


  /***/ }),
  /* 64 */
  /***/ (function(module, exports, __webpack_require__) {

  var Symbol = __webpack_require__(22),
      arrayMap = __webpack_require__(65),
      isArray = __webpack_require__(18),
      isSymbol = __webpack_require__(20);

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  module.exports = baseToString;


  /***/ }),
  /* 65 */
  /***/ (function(module, exports) {

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  module.exports = arrayMap;


  /***/ }),
  /* 66 */
  /***/ (function(module, exports, __webpack_require__) {

  var isSymbol = __webpack_require__(20);

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  module.exports = toKey;


  /***/ }),
  /* 67 */
  /***/ (function(module, exports) {

  module.exports = require("vm");

  /***/ }),
  /* 68 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const cli_1 = __webpack_require__(3);

  const core_1 = __webpack_require__(1);

  const clipanion_1 = __webpack_require__(4);

  const Constraints_1 = __webpack_require__(5); // eslint-disable-next-line arca/no-default-export


  class ConstraintsSourceCommand extends cli_1.BaseCommand {
    constructor() {
      super(...arguments);
      this.verbose = false;
    }

    async execute() {
      const configuration = await core_1.Configuration.find(this.context.cwd, this.context.plugins);
      const {
        project
      } = await core_1.Project.find(configuration, this.context.cwd);
      const constraints = await Constraints_1.Constraints.find(project);
      this.context.stdout.write(this.verbose ? constraints.fullSource : constraints.source);
    }

  }

  ConstraintsSourceCommand.usage = clipanion_1.Command.Usage({
    category: `Constraints-related commands`,
    description: `print the source code for the constraints`,
    details: `
        This command will print the Prolog source code used by the constraints engine. Adding the \`-v,--verbose\` flag will print the *full* source code, including the fact database automatically compiled from your workspaces manifests.
      `,
    examples: [[`Prints the source code`, `yarn constraints source`], [`Print the source code and the fact database`, `yarn constraints source -v`]]
  });

  __decorate([clipanion_1.Command.Boolean(`-v,--verbose`)], ConstraintsSourceCommand.prototype, "verbose", void 0);

  __decorate([clipanion_1.Command.Path(`constraints`, `source`)], ConstraintsSourceCommand.prototype, "execute", null);

  exports.default = ConstraintsSourceCommand;

  /***/ }),
  /* 69 */
  /***/ (function(module, exports, __webpack_require__) {

  "use strict";


  var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const cli_1 = __webpack_require__(3);

  const core_1 = __webpack_require__(1);

  const core_2 = __webpack_require__(1);

  const core_3 = __webpack_require__(1);

  const clipanion_1 = __webpack_require__(4);

  const get_1 = __importDefault(__webpack_require__(15));

  const set_1 = __importDefault(__webpack_require__(70));

  const unset_1 = __importDefault(__webpack_require__(76));

  const Constraints_1 = __webpack_require__(5); // eslint-disable-next-line arca/no-default-export


  class ConstraintsCheckCommand extends cli_1.BaseCommand {
    constructor() {
      super(...arguments);
      this.fix = false;
    }

    async execute() {
      for (let t = 0; t < 10; ++t) {
        const configuration = await core_1.Configuration.find(this.context.cwd, this.context.plugins);
        const {
          project
        } = await core_1.Project.find(configuration, this.context.cwd);
        const constraints = await Constraints_1.Constraints.find(project);
        const toSave = new Set();
        const report = await core_2.StreamReport.start({
          configuration,
          stdout: this.context.stdout
        }, async report => {
          const result = await constraints.process();
          await processDependencyConstraints(toSave, result.enforcedDependencies, {
            fix: this.fix,
            configuration,
            report
          });
          await processFieldConstraints(toSave, result.enforcedFields, {
            fix: this.fix,
            configuration,
            report
          });

          for (const workspace of toSave) {
            workspace.persistManifest();
          }
        });
        if (report.hasErrors()) return report.exitCode();

        if (!this.fix || toSave.size > 0) {
          return 0;
        }
      }

      return 1;
    }

  }

  ConstraintsCheckCommand.usage = clipanion_1.Command.Usage({
    category: `Constraints-related commands`,
    description: `check that the project constraints are met`,
    details: `
        This command will run constraints on your project and emit errors for each one that is found but isn't met. If any error is emitted the process will exit with a non-zero exit code.

        If the \`--fix\` flag is used, Yarn will attempt to automatically fix the issues the best it can, following a multi-pass process (with a maximum of 10 iterations). Some ambiguous patterns cannot be autofixed, in which case you'll have to manually specify the right resolution.

        For more information as to how to write constraints, please consult our dedicated page on our website: https://yarnpkg.com/features/constraints.
      `,
    examples: [[`Check that all constraints are satisfied`, `yarn constraints`], [`Autofix all unmet constraints`, `yarn constraints --fix`]]
  });

  __decorate([clipanion_1.Command.Boolean(`--fix`)], ConstraintsCheckCommand.prototype, "fix", void 0);

  __decorate([clipanion_1.Command.Path(`constraints`)], ConstraintsCheckCommand.prototype, "execute", null);

  exports.default = ConstraintsCheckCommand;

  async function processDependencyConstraints(toSave, enforcedDependencies, {
    configuration,
    fix,
    report
  }) {
    let hasFixes = false;
    const allIdents = new Map();
    const byWorkspaces = new Map();

    for (const {
      workspace,
      dependencyIdent,
      dependencyRange,
      dependencyType
    } of enforcedDependencies) {
      let byWorkspacesStore = byWorkspaces.get(workspace);
      if (typeof byWorkspacesStore === `undefined`) byWorkspaces.set(workspace, byWorkspacesStore = new Map());
      let byIdentStore = byWorkspacesStore.get(dependencyIdent.identHash);
      if (typeof byIdentStore === `undefined`) byWorkspacesStore.set(dependencyIdent.identHash, byIdentStore = new Map());
      let byDependencyTypeStore = byIdentStore.get(dependencyType);
      if (typeof byDependencyTypeStore === `undefined`) byIdentStore.set(dependencyType, byDependencyTypeStore = new Set());
      allIdents.set(dependencyIdent.identHash, dependencyIdent);
      byDependencyTypeStore.add(dependencyRange);
    }

    for (const [workspace, byWorkspacesStore] of byWorkspaces) {
      for (const [identHash, byIdentStore] of byWorkspacesStore) {
        const dependencyIdent = allIdents.get(identHash);
        if (typeof dependencyIdent === `undefined`) throw new Error(`Assertion failed: The ident should have been registered`);

        for (const [dependencyType, byDependencyTypeStore] of byIdentStore) {
          const expectedRanges = [...byDependencyTypeStore];

          if (expectedRanges.length > 2) {
            report.reportError(core_2.MessageName.CONSTRAINTS_AMBIGUITY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must depend on ${core_3.structUtils.prettyIdent(configuration, dependencyIdent)} via conflicting ranges ${expectedRanges.slice(0, -1).map(expectedRange => core_3.structUtils.prettyRange(configuration, String(expectedRange))).join(`, `)}, and ${core_3.structUtils.prettyRange(configuration, String(expectedRanges[expectedRanges.length - 1]))} (in ${dependencyType})`);
          } else if (expectedRanges.length > 1) {
            report.reportError(core_2.MessageName.CONSTRAINTS_AMBIGUITY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must depend on ${core_3.structUtils.prettyIdent(configuration, dependencyIdent)} via conflicting ranges ${core_3.structUtils.prettyRange(configuration, String(expectedRanges[0]))} and ${core_3.structUtils.prettyRange(configuration, String(expectedRanges[1]))} (in ${dependencyType})`);
          } else {
            const dependencyDescriptor = workspace.manifest[dependencyType].get(dependencyIdent.identHash);
            const [expectedRange] = expectedRanges;

            if (expectedRange !== null) {
              if (!dependencyDescriptor) {
                if (fix) {
                  workspace.manifest[dependencyType].set(dependencyIdent.identHash, core_3.structUtils.makeDescriptor(dependencyIdent, expectedRange));
                  toSave.add(workspace);
                  hasFixes = true;
                } else {
                  report.reportError(core_2.MessageName.CONSTRAINTS_MISSING_DEPENDENCY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must depend on ${core_3.structUtils.prettyIdent(configuration, dependencyIdent)} (via ${core_3.structUtils.prettyRange(configuration, expectedRange)}), but doesn't (in ${dependencyType})`);
                }
              } else if (dependencyDescriptor.range !== expectedRange) {
                if (fix) {
                  workspace.manifest[dependencyType].set(dependencyIdent.identHash, core_3.structUtils.makeDescriptor(dependencyIdent, expectedRange));
                  toSave.add(workspace);
                  hasFixes = true;
                } else {
                  report.reportError(core_2.MessageName.CONSTRAINTS_INCOMPATIBLE_DEPENDENCY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must depend on ${core_3.structUtils.prettyIdent(configuration, dependencyIdent)} via ${core_3.structUtils.prettyRange(configuration, expectedRange)}, but uses ${core_3.structUtils.prettyRange(configuration, dependencyDescriptor.range)} instead (in ${dependencyType})`);
                }
              }
            } else {
              if (dependencyDescriptor) {
                if (fix) {
                  workspace.manifest[dependencyType].delete(dependencyIdent.identHash);
                  toSave.add(workspace);
                  hasFixes = true;
                } else {
                  report.reportError(core_2.MessageName.CONSTRAINTS_EXTRANEOUS_DEPENDENCY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} has an extraneous dependency on ${core_3.structUtils.prettyIdent(configuration, dependencyIdent)} (in ${dependencyType})`);
                }
              }
            }
          }
        }
      }
    }

    return hasFixes;
  }

  async function processFieldConstraints(toSave, enforcedFields, {
    configuration,
    fix,
    report
  }) {
    let hasFixes = false;
    const byWorkspaces = new Map();

    for (const {
      workspace,
      fieldPath,
      fieldValue
    } of enforcedFields) {
      const byWorkspacesStore = core_1.miscUtils.getMapWithDefault(byWorkspaces, workspace);
      const byPathStore = core_1.miscUtils.getSetWithDefault(byWorkspacesStore, fieldPath);
      byPathStore.add(fieldValue);
    }

    for (const [workspace, byWorkspacesStore] of byWorkspaces) {
      for (const [fieldPath, byPathStore] of byWorkspacesStore) {
        const expectedValues = [...byPathStore];

        if (expectedValues.length > 2) {
          report.reportError(core_2.MessageName.CONSTRAINTS_AMBIGUITY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must have a field ${configuration.format(fieldPath, `cyan`)} set to conflicting values ${expectedValues.slice(0, -1).map(expectedValue => configuration.format(String(expectedValue), `magenta`)).join(`, `)}, or ${configuration.format(String(expectedValues[expectedValues.length - 1]), `magenta`)}`);
        } else if (expectedValues.length > 1) {
          report.reportError(core_2.MessageName.CONSTRAINTS_AMBIGUITY, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must have a field ${configuration.format(fieldPath, `cyan`)} set to conflicting values ${configuration.format(String(expectedValues[0]), `magenta`)} or ${configuration.format(String(expectedValues[1]), `magenta`)}`);
        } else {
          const actualValue = get_1.default(workspace.manifest.raw, fieldPath);
          const [expectedValue] = expectedValues;

          if (expectedValue !== null) {
            if (actualValue === undefined) {
              if (fix) {
                await setWorkspaceField(workspace, fieldPath, expectedValue);
                toSave.add(workspace);
                hasFixes = true;
              } else {
                report.reportError(core_2.MessageName.CONSTRAINTS_MISSING_FIELD, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must have a field ${configuration.format(fieldPath, `cyan`)} set to ${configuration.format(String(expectedValue), `magenta`)}, but doesn't`);
              }
            } else if (JSON.stringify(actualValue) !== expectedValue) {
              if (fix) {
                await setWorkspaceField(workspace, fieldPath, expectedValue);
                toSave.add(workspace);
                hasFixes = true;
              } else {
                report.reportError(core_2.MessageName.CONSTRAINTS_INCOMPATIBLE_FIELD, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} must have a field ${configuration.format(fieldPath, `cyan`)} set to ${configuration.format(String(expectedValue), `magenta`)}, but is set to ${configuration.format(JSON.stringify(actualValue), `magenta`)} instead`);
              }
            }
          } else {
            if (actualValue !== undefined && actualValue !== null) {
              if (fix) {
                await setWorkspaceField(workspace, fieldPath, null);
                toSave.add(workspace);
                hasFixes = true;
              } else {
                report.reportError(core_2.MessageName.CONSTRAINTS_EXTRANEOUS_FIELD, `${core_3.structUtils.prettyWorkspace(configuration, workspace)} has an extraneous field ${configuration.format(fieldPath, `cyan`)} set to ${configuration.format(String(expectedValue), `magenta`)}`);
              }
            }
          }
        }
      }
    }

    return hasFixes;
  }

  async function setWorkspaceField(workspace, fieldPath, value) {
    if (value === null) {
      unset_1.default(workspace.manifest.raw, fieldPath);
    } else {
      set_1.default(workspace.manifest.raw, fieldPath, JSON.parse(value));
    }
  }

  /***/ }),
  /* 70 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseSet = __webpack_require__(71);

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
  }

  module.exports = set;


  /***/ }),
  /* 71 */
  /***/ (function(module, exports, __webpack_require__) {

  var assignValue = __webpack_require__(72),
      castPath = __webpack_require__(17),
      isIndex = __webpack_require__(75),
      isObject = __webpack_require__(39),
      toKey = __webpack_require__(66);

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
          newValue = value;

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {});
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  module.exports = baseSet;


  /***/ }),
  /* 72 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseAssignValue = __webpack_require__(73),
      eq = __webpack_require__(52);

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  module.exports = assignValue;


  /***/ }),
  /* 73 */
  /***/ (function(module, exports, __webpack_require__) {

  var defineProperty = __webpack_require__(74);

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  module.exports = baseAssignValue;


  /***/ }),
  /* 74 */
  /***/ (function(module, exports, __webpack_require__) {

  var getNative = __webpack_require__(36);

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  module.exports = defineProperty;


  /***/ }),
  /* 75 */
  /***/ (function(module, exports) {

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  module.exports = isIndex;


  /***/ }),
  /* 76 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseUnset = __webpack_require__(77);

  /**
   * Removes the property at `path` of `object`.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 7 } }] };
   * _.unset(object, 'a[0].b.c');
   * // => true
   *
   * console.log(object);
   * // => { 'a': [{ 'b': {} }] };
   *
   * _.unset(object, ['a', '0', 'b', 'c']);
   * // => true
   *
   * console.log(object);
   * // => { 'a': [{ 'b': {} }] };
   */
  function unset(object, path) {
    return object == null ? true : baseUnset(object, path);
  }

  module.exports = unset;


  /***/ }),
  /* 77 */
  /***/ (function(module, exports, __webpack_require__) {

  var castPath = __webpack_require__(17),
      last = __webpack_require__(78),
      parent = __webpack_require__(79),
      toKey = __webpack_require__(66);

  /**
   * The base implementation of `_.unset`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The property path to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   */
  function baseUnset(object, path) {
    path = castPath(path, object);
    object = parent(object, path);
    return object == null || delete object[toKey(last(path))];
  }

  module.exports = baseUnset;


  /***/ }),
  /* 78 */
  /***/ (function(module, exports) {

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  module.exports = last;


  /***/ }),
  /* 79 */
  /***/ (function(module, exports, __webpack_require__) {

  var baseGet = __webpack_require__(16),
      baseSlice = __webpack_require__(80);

  /**
   * Gets the parent value at `path` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path to get the parent value of.
   * @returns {*} Returns the parent value.
   */
  function parent(object, path) {
    return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
  }

  module.exports = parent;


  /***/ }),
  /* 80 */
  /***/ (function(module, exports) {

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  module.exports = baseSlice;


  /***/ })
  /******/ ]);
    return plugin;
  },
};
