/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var RawSource = require("./RawSource");
var OriginalSource = require("./OriginalSource");
var SourceMapSource = require("./SourceMapSource");
var LineToLineMappedSource = require("./LineToLineMappedSource");
var path = require("path"); // TODO refactor

var ModuleBuildError = require("./ModuleBuildError");
var ModuleError = require("./ModuleError");
var ModuleWarning = require("./ModuleWarning");

function utf8BufferToString(buf) {
	var str = buf.toString("utf-8");
	if(str.charCodeAt(0) === 0xFEFF) {
		return str.substr(1);
	} else {
		return str;
	}
}

function NormalModuleMixin(loaders, resource) {
	this.resource = resource;
	this.loaders = loaders;
	var resourcePath = this.splitQuery(this.resource)[0];
	this.context = resourcePath ? path.dirname(resourcePath) : null;
	this.fileDependencies = [];
	this.contextDependencies = [];
	this.warnings = [];
	this.errors = [];
	this.error = null;
	this._source = null;
}
module.exports = NormalModuleMixin;

NormalModuleMixin.mixin = function(pt) {
	for(var name in NormalModuleMixin.prototype)
		pt[name] = NormalModuleMixin.prototype[name];
};

NormalModuleMixin.prototype.splitQuery = function splitQuery(req) {
	var i = req.indexOf("?");
	if(i < 0) return [req, ""];
	return [req.substr(0, i), req.substr(i)];
};

NormalModuleMixin.prototype.doBuild = function doBuild(options, moduleContext, resolver, fs, callback) {
	var splitQuery = this.splitQuery.bind(this);
	var module = this;
	this.cacheable = true;

	// Prepare context
	var loaders = [];
	function addLoaderToList(loader) {
		var l = splitQuery(loader);
		loaders.push({
			request: loader,
			path: l[0],
			query: l[1],
			module: null
		});
	}
	this.loaders.forEach(addLoaderToList);
	var loaderContextCacheable;
	var loaderContext = {
		version: 1,
		context: this.context,
		loaders: loaders,
		loaderIndex: 0,
		resource: this.resource,
		resourcePath: splitQuery(this.resource)[0],
		resourceQuery: this.resource ? splitQuery(this.resource)[1] || null : undefined,
		emitWarning: function(warning) {
			this.warnings.push(new ModuleWarning(this, warning));
		}.bind(this),
		emitError: function(error) {
			this.errors.push(new ModuleError(this, error));
		}.bind(this),
		exec: function(code, filename) {
			if(typeof __webpack_modules__ === "undefined") {
				// TODO: check if in enhanced-require
				var Module = require("module");
				var m = new Module(filename, module);
				m.paths = Module._nodeModulePaths(loaderContext.context);
				m.filename = filename;
				m._compile(code, filename);
				return m.exports;
			} else {
				throw new Error("loaderContext.exec is not supported");
			}
		},
		resolve: function(context, request, callback) {
			resolver.resolve(context, request, callback);
		},
		resolveSync: function(context, request) {
			return resolver.resolveSync(context, request);
		},
		cacheable: function(flag) {
			loaderContextCacheable = flag !== false;
		},
		dependency: function(file) {
			this.fileDependencies.push(file);
		}.bind(this),
		addDependency: function(file) {
			this.fileDependencies.push(file);
		}.bind(this),
		addContextDependency: function(context) {
			this.contextDependencies.push(context);
		}.bind(this),
		clearDependencies: function() {
			this.fileDependencies.length = 0;
			this.contextDependencies.length = 0;
			module.cacheable = true;
		}.bind(this),
		inputValue: undefined,
		value: null,
		options: options,
		debug: options.debug
	};
	this.fillLoaderContext(loaderContext, options, moduleContext);
	if(options.loader) for(var key in options.loader)
		loaderContext[key] = options.loader[key];


	function runSyncOrAsync(fn, context, args, callback) {
		var isSync = true;
		var isDone = false;
		var isError = false; // internal error
		var reportedError = false;
		if(!context.async) context.async = function async() {
			if(isDone) {
				if(reportedError) return; // ignore
				throw new Error("async(): The callback was already called.");
			}
			isSync = false;
			return context.callback;
		};
		context.callback = function() {
			if(isDone) {
				if(reportedError) return; // ignore
				throw new Error("callback(): The callback was already called.");
			}
			isDone = true;
			isSync = false;
			try {
				callback.apply(null, arguments);
			} catch(e) {
				isError = true;
				throw e;
			}
		};
		try {
			var result = (function WEBPACK_CORE_LOADER_EXECUTION() { return fn.apply(context, args) }());
			if(isSync) {
				isDone = true;
				if(result === undefined)
					return callback();
				return callback(null, result);
			}
		} catch(e) {
			if(isError) throw e;
			if(isDone) {
				// loader is already "done", so we cannot use the callback function
				// for better debugging we print the error on the console
				if(typeof e === "object" && e.stack) console.error(e.stack);
				else console.error(e);
				return;
			}
			isDone = true;
			reportedError = true;
			callback(e);
		}

	}

	// Load and pitch loaders
	(function loadPitch() {
		var l = loaderContext.loaders[loaderContext.loaderIndex];
		if(!l) {
			return onLoadPitchDone.call(this);
		}
		if(l.module) {
			loaderContext.loaderIndex++;
			return loadPitch.call(this);
		}
		if(typeof __webpack_modules__ === "undefined") {
			if(require.supportQuery) {
				l.module = require(l.request);
			} else {
				try {
					l.module = require(l.path);
				} catch (e) {
					// it is possible for node to choke on a require if the FD descriptor
					// limit has been reached. give it a chance to recover.
					if (e instanceof Error && e.code === 'EMFILE') {
						if (typeof setImmediate === 'function') {
							// node >= 0.9.0
							return setImmediate(loadPitch.bind(this));
						} else  {
							// node < 0.9.0
							return process.nextTick(loadPitch.bind(this));
						}
					}
					return callback(e)
				}
			}
		} else if(typeof __webpack_require_loader__ === "function") {
			l.module = __webpack_require_loader__(l.request);
		} else {
			return callback(new Error("Cannot load loader, __webpack_require_loader__ not provided."));
		}
		if(typeof l.module !== "function")
			return callback(new Error("Loader " + l.request + " didn't return a function"));
		var pitchedLoaders = [];
		var remaining = [];
		for(var i = 0; i < loaderContext.loaderIndex; i++)
			pitchedLoaders.push(loaderContext.loaders[i].request);
		for(i = loaderContext.loaderIndex + 1; i < loaderContext.loaders.length; i++)
			remaining.push(loaderContext.loaders[i].request);
		remaining.push(loaderContext.resource);
		if(typeof l.module.pitch !== "function") return loadPitch.call(this);
		loaderContextCacheable = false;
		var privateLoaderContext = Object.create(loaderContext);
		privateLoaderContext.query = l.query;
		runSyncOrAsync(l.module.pitch, privateLoaderContext, [remaining.join("!"), pitchedLoaders.join("!"), l.data = {}], function(err) {
			if(err) return onModuleBuildFailed.call(this, err);
			if(!loaderContextCacheable) this.cacheable = false;
			var args = Array.prototype.slice.call(arguments, 1);
			loaderContext.resourcePath = privateLoaderContext.resourcePath;
			loaderContext.resourceQuery = privateLoaderContext.resourceQuery;
			loaderContext.resource = privateLoaderContext.resource;
			loaderContext.loaderIndex = privateLoaderContext.loaderIndex;
			if(args.length > 0) {
				nextLoader.apply(this, [null].concat(args));
			} else {
				loadPitch.call(this);
			}
		}.bind(this));
	}.call(this));

	var resourceBuffer;
	function onLoadPitchDone() {
		loaderContext.loaderIndex = loaderContext.loaders.length;
		var request = [];
		for(var i = 0; i < loaderContext.loaders.length; i++)
			request.push(loaderContext.loaders[i].request);
		request.push(loaderContext.resource);
		loaderContext.request = request.join("!");
		var resourcePath = loaderContext.resourcePath;
		loaderContextCacheable = true;
		if(resourcePath) {
			loaderContext.addDependency(resourcePath);
			fs.readFile(resourcePath, function(err, buffer) {
				if(err) return nextLoader(err);
				if(module.lineToLine)
					resourceBuffer = buffer;
				nextLoader(null, buffer);
			});
		} else
			nextLoader(null, null);
	}

	function nextLoader(err/*, paramBuffer1, param2, ...*/) {
		if(!loaderContextCacheable) module.cacheable = false;
		var args = Array.prototype.slice.call(arguments, 1);
		if(err) {
			// a loader emitted an error
			return onModuleBuildFailed.call(module, err);
		}
		if(loaderContext.loaderIndex === 0) {
			if(Buffer.isBuffer(args[0]))
				args[0] = utf8BufferToString(args[0]);
			return onModuleBuild.apply(module, args);
		}
		loaderContext.loaderIndex--;
		var l = loaderContext.loaders[loaderContext.loaderIndex];
		if(!l.module) return nextLoader.apply(null, [null].concat(args));
		var privateLoaderContext = Object.create(loaderContext);
		privateLoaderContext.data = l.data;
		privateLoaderContext.inputValue = loaderContext.inputValue;
		privateLoaderContext.query = l.query;
		if(!l.module.raw && Buffer.isBuffer(args[0])) {
			args[0] = utf8BufferToString(args[0]);
		} else if(l.module.raw && typeof args[0] === "string") {
			args[0] = new Buffer(args[0], "utf-8");
		}
		loaderContextCacheable = false;
		runSyncOrAsync(l.module, privateLoaderContext, args, function() {
			loaderContext.inputValue = privateLoaderContext.value;
			nextLoader.apply(null, arguments);
		});
	}


	function onModuleBuild(source, sourceMap) {
		if(!Buffer.isBuffer(source) && typeof source !== "string")
			return onModuleBuildFailed.call(this, new Error("Final loader didn't return a Buffer or String"));
		if(this.identifier && this.lineToLine && resourceBuffer) {
			this._source = new LineToLineMappedSource(source, this.identifier(),
				resourceBuffer.toString("utf-8"));
		} else if(this.identifier && this.useSourceMap && sourceMap) {
			this._source = new SourceMapSource(source, this.identifier(), sourceMap);
		} else if(this.identifier) {
			this._source = new OriginalSource(source, this.identifier());
		} else {
			this._source = new RawSource(source);
		}
		return callback();
	}

	function onModuleBuildFailed(err) {
		this.error = err;
		return callback(new ModuleBuildError(this, err));
	}
};

NormalModuleMixin.prototype.fillLoaderContext = function fillLoaderContext() {};
