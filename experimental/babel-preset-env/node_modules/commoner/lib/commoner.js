var assert = require("assert");
var path = require("path");
var fs = require("fs");
var Q = require("q");
var iconv = require("iconv-lite");
var ReadFileCache = require("./cache").ReadFileCache;
var Watcher = require("./watcher").Watcher;
var contextModule = require("./context");
var BuildContext = contextModule.BuildContext;
var PreferredFileExtension = contextModule.PreferredFileExtension;
var ModuleReader = require("./reader").ModuleReader;
var output = require("./output");
var DirOutput = output.DirOutput;
var StdOutput = output.StdOutput;
var util = require("./util");
var log = util.log;
var Ap = Array.prototype;
var each = Ap.forEach;

// Better stack traces for promises.
Q.longStackSupport = true;

function Commoner() {
    var self = this;
    assert.ok(self instanceof Commoner);

    Object.defineProperties(self, {
        customVersion: { value: null, writable: true },
        customOptions: { value: [] },
        resolvers: { value: [] },
        processors: { value: [] }
    });
}

var Cp = Commoner.prototype;

Cp.version = function(version) {
    this.customVersion = version;
    return this; // For chaining.
};

// Add custom command line options
Cp.option = function() {
    this.customOptions.push(Ap.slice.call(arguments));
    return this; // For chaining.
};

// A resolver is a function that takes a module identifier and returns
// the unmodified source of the corresponding module, either as a string
// or as a promise for a string.
Cp.resolve = function() {
    each.call(arguments, function(resolver) {
        assert.strictEqual(typeof resolver, "function");
        this.resolvers.push(resolver);
    }, this);

    return this; // For chaining.
};

// A processor is a function that takes a module identifier and a string
// representing the source of the module and returns a modified version of
// the source, either as a string or as a promise for a string.
Cp.process = function(processor) {
    each.call(arguments, function(processor) {
        assert.strictEqual(typeof processor, "function");
        this.processors.push(processor);
    }, this);

    return this; // For chaining.
};

Cp.buildP = function(options, roots) {
    var self = this;
    var sourceDir = options.sourceDir;
    var outputDir = options.outputDir;
    var readFileCache = new ReadFileCache(sourceDir, options.sourceCharset);
    var waiting = 0;
    var output = outputDir
        ? new DirOutput(outputDir)
        : new StdOutput;

    if (self.watch) {
        new Watcher(readFileCache).on("changed", function(file) {
            log.err(file + " changed; rebuilding...", "yellow");
            rebuild();
        });
    }

    function outputModules(modules) {
        // Note that output.outputModules comes pre-bound.
        modules.forEach(output.outputModule);
        return modules;
    }

    function finish(result) {
        rebuild.ing = false;

        if (waiting > 0) {
            waiting = 0;
            process.nextTick(rebuild);
        }

        return result;
    }

    function rebuild() {
        if (rebuild.ing) {
            waiting += 1;
            return;
        }

        rebuild.ing = true;

        var context = new BuildContext(options, readFileCache);

        if (self.preferredFileExtension)
            context.setPreferredFileExtension(
                self.preferredFileExtension);

        context.setCacheDirectory(self.cacheDir);

        context.setIgnoreDependencies(self.ignoreDependencies);

        context.setRelativize(self.relativize);

        context.setUseProvidesModule(self.useProvidesModule);

        return new ModuleReader(
            context,
            self.resolvers,
            self.processors
        ).readMultiP(context.expandIdsOrGlobsP(roots))
            .then(context.ignoreDependencies ? pass : collectDepsP)
            .then(outputModules)
            .then(outputDir ? printModuleIds : pass)
            .then(finish, function(err) {
                log.err(err.stack);

                if (!self.watch) {
                    // If we're not building with --watch, throw the error
                    // so that cliBuildP can call process.exit(-1).
                    throw err;
                }

                finish();
            });
    }

    return (
      // If outputDir is falsy, we can't (and don't need to) mkdirP it.
      outputDir ? util.mkdirP : Q
    )(outputDir).then(rebuild);
};

function pass(modules) {
    return modules;
}

function collectDepsP(rootModules) {
    var modules = [];
    var seenIds = {};

    function traverse(module) {
        if (seenIds.hasOwnProperty(module.id))
            return Q(modules);
        seenIds[module.id] = true;

        return module.getRequiredP().then(function(reqs) {
            return Q.all(reqs.map(traverse));
        }).then(function() {
            modules.push(module);
            return modules;
        });
    }

    return Q.all(rootModules.map(traverse)).then(
        function() { return modules });
}

function printModuleIds(modules) {
    log.out(JSON.stringify(modules.map(function(module) {
        return module.id;
    })));

    return modules;
}

Cp.forceResolve = function(forceId, source) {
    this.resolvers.unshift(function(id) {
        if (id === forceId)
            return source;
    });
};

Cp.cliBuildP = function() {
    var version = this.customVersion || require("../package.json").version;
    return Q.spread([this, version], cliBuildP);
};

function cliBuildP(commoner, version) {
    var options = require("commander");
    var workingDir = process.cwd();
    var sourceDir = workingDir;
    var outputDir = null;
    var roots;

    options.version(version)
        .usage("[options] <source directory> <output directory> [<module ID> [<module ID> ...]]")
        .option("-c, --config [file]", "JSON configuration file (no file or - means STDIN)")
        .option("-w, --watch", "Continually rebuild")
        .option("-x, --extension <js | coffee | ...>",
                "File extension to assume when resolving module identifiers")
        .option("--relativize", "Rewrite all module identifiers to be relative")
        .option("--follow-requires", "Scan modules for required dependencies")
        .option("--use-provides-module", "Respect @providesModules pragma in files")
        .option("--cache-dir <directory>", "Alternate directory to use for disk cache")
        .option("--no-cache-dir", "Disable the disk cache")
        .option("--source-charset <utf8 | win1252 | ...>",
                "Charset of source (default: utf8)")
        .option("--output-charset <utf8 | win1252 | ...>",
                "Charset of output (default: utf8)");

    commoner.customOptions.forEach(function(customOption) {
        options.option.apply(options, customOption);
    });

    options.parse(process.argv.slice(0));

    var pfe = new PreferredFileExtension(options.extension || "js");

    // TODO Decide whether passing options to buildP via instance
    // variables is preferable to passing them as arguments.
    commoner.preferredFileExtension = pfe;
    commoner.watch = options.watch;
    commoner.ignoreDependencies = !options.followRequires;
    commoner.relativize = options.relativize;
    commoner.useProvidesModule = options.useProvidesModule;
    commoner.sourceCharset = normalizeCharset(options.sourceCharset);
    commoner.outputCharset = normalizeCharset(options.outputCharset);

    function fileToId(file) {
        file = absolutePath(workingDir, file);
        assert.ok(fs.statSync(file).isFile(), file);
        return pfe.trim(path.relative(sourceDir, file));
    }

    var args = options.args.slice(0);
    var argc = args.length;
    if (argc === 0) {
        if (options.config === true) {
            log.err("Cannot read --config from STDIN when reading " +
                    "source from STDIN");
            process.exit(-1);
        }

        sourceDir = workingDir;
        outputDir = null;
        roots = ["<stdin>"];
        commoner.forceResolve("<stdin>", util.readFromStdinP());

        // Ignore dependencies because we wouldn't know how to find them.
        commoner.ignoreDependencies = true;

    } else {
        var first = absolutePath(workingDir, args[0]);
        var stats = fs.statSync(first);

        if (argc === 1) {
            var firstId = fileToId(first);
            sourceDir = workingDir;
            outputDir = null;
            roots = [firstId];
            commoner.forceResolve(
                firstId,
                util.readFileP(first, commoner.sourceCharset)
            );

            // Ignore dependencies because we wouldn't know how to find them.
            commoner.ignoreDependencies = true;

        } else if (stats.isDirectory(first)) {
            sourceDir = first;
            outputDir = absolutePath(workingDir, args[1]);
            roots = args.slice(2);
            if (roots.length === 0)
                roots.push(commoner.preferredFileExtension.glob());

        } else {
            options.help();
            process.exit(-1);
        }
    }

    commoner.cacheDir = null;
    if (options.cacheDir === false) {
        // Received the --no-cache-dir option, so disable the disk cache.
    } else if (typeof options.cacheDir === "string") {
        commoner.cacheDir = absolutePath(workingDir, options.cacheDir);
    } else if (outputDir) {
        // The default cache directory lives inside the output directory.
        commoner.cacheDir = path.join(outputDir, ".module-cache");
    }

    var promise = getConfigP(
        workingDir,
        options.config
    ).then(function(config) {
        var cleanOptions = {};

        options.options.forEach(function(option) {
            var name = util.camelize(option.name());
            if (options.hasOwnProperty(name)) {
                cleanOptions[name] = options[name];
            }
        });

        cleanOptions.version = version;
        cleanOptions.config = config;
        cleanOptions.sourceDir = sourceDir;
        cleanOptions.outputDir = outputDir;
        cleanOptions.sourceCharset = commoner.sourceCharset;
        cleanOptions.outputCharset = commoner.outputCharset;

        return commoner.buildP(cleanOptions, roots);
    });

    if (!commoner.watch) {
        // If we're building from the command line without --watch, any
        // build errors should immediately terminate the process with a
        // non-zero error code.
        promise = promise.catch(function(err) {
            log.err(err.stack);
            process.exit(-1);
        });
    }

    return promise;
}

function normalizeCharset(charset) {
    charset = charset
        && charset.replace(/[- ]/g, "").toLowerCase()
        || "utf8";

    assert.ok(
        iconv.encodingExists(charset),
        "Unrecognized charset: " + charset
    );

    return charset;
}

function absolutePath(workingDir, pathToJoin) {
    if (pathToJoin) {
        workingDir = path.normalize(workingDir);
        pathToJoin = path.normalize(pathToJoin);
        // TODO: use path.isAbsolute when Node < 0.10 is unsupported
        if (path.resolve(pathToJoin) !== pathToJoin) {
            pathToJoin = path.join(workingDir, pathToJoin);
        }
    }
    return pathToJoin;
}

function getConfigP(workingDir, configFile) {
    if (typeof configFile === "undefined")
        return Q({}); // Empty config.

    if (configFile === true || // --config is present but has no argument
        configFile === "<stdin>" ||
        configFile === "-" ||
        configFile === path.sep + path.join("dev", "stdin")) {
        return util.readJsonFromStdinP(
            1000, // Time limit in milliseconds before warning displayed.
            "Expecting configuration from STDIN (pass --config <file> " +
                "if stuck here)...",
            "yellow"
        );
    }

    return util.readJsonFileP(absolutePath(workingDir, configFile));
}

exports.Commoner = Commoner;
