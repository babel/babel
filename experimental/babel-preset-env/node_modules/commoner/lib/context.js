var assert = require("assert");
var path = require("path");
var Q = require("q");
var util = require("./util");
var spawn = require("child_process").spawn;
var ReadFileCache = require("./cache").ReadFileCache;
var grepP = require("./grep");
var glob = require("glob");
var env = process.env;

function BuildContext(options, readFileCache) {
    var self = this;
    assert.ok(self instanceof BuildContext);
    assert.ok(readFileCache instanceof ReadFileCache);

    if (options) {
        assert.strictEqual(typeof options, "object");
    } else {
        options = {};
    }

    Object.freeze(options);

    Object.defineProperties(self, {
        readFileCache: { value: readFileCache },
        config: { value: options.config },
        options: { value: options },
        optionsHash: { value: util.deepHash(options) }
    });
}

var BCp = BuildContext.prototype;

BCp.makePromise = function(callback, context) {
    return util.makePromise(callback, context);
};

BCp.spawnP = function(command, args, kwargs) {
    args = args || [];
    kwargs = kwargs || {};

    var deferred = Q.defer();

    var outs = [];
    var errs = [];

    var options = {
        stdio: "pipe",
        env: env
    };

    if (kwargs.cwd) {
        options.cwd = kwargs.cwd;
    }

    var child = spawn(command, args, options);

    child.stdout.on("data", function(data) {
        outs.push(data);
    });

    child.stderr.on("data", function(data) {
        errs.push(data);
    });

    child.on("close", function(code) {
        if (errs.length > 0 || code !== 0) {
            var err = {
                code: code,
                text: errs.join("")
            };
        }

        deferred.resolve([err, outs.join("")]);
    });

    var stdin = kwargs && kwargs.stdin;
    if (stdin) {
        child.stdin.end(stdin);
    }

    return deferred.promise;
};

BCp.setIgnoreDependencies = function(value) {
    Object.defineProperty(this, "ignoreDependencies", {
        value: !!value
    });
};

// This default can be overridden by individual BuildContext instances.
BCp.setIgnoreDependencies(false);

BCp.setRelativize = function(value) {
    Object.defineProperty(this, "relativize", {
        value: !!value
    });
};

// This default can be overridden by individual BuildContext instances.
BCp.setRelativize(false);

BCp.setUseProvidesModule = function(value) {
    Object.defineProperty(this, "useProvidesModule", {
        value: !!value
    });
};

// This default can be overridden by individual BuildContext instances.
BCp.setUseProvidesModule(false);

BCp.setCacheDirectory = function(dir) {
    if (!dir) {
        // Disable the cache directory.
    } else {
        assert.strictEqual(typeof dir, "string");
    }

    Object.defineProperty(this, "cacheDir", {
        value: dir || null
    });
};

// This default can be overridden by individual BuildContext instances.
BCp.setCacheDirectory(null);

function PreferredFileExtension(ext) {
    assert.strictEqual(typeof ext, "string");
    assert.ok(this instanceof PreferredFileExtension);
    Object.defineProperty(this, "extension", {
        value: ext.toLowerCase()
    });
}

var PFEp = PreferredFileExtension.prototype;

PFEp.check = function(file) {
    return file.split(".").pop().toLowerCase() === this.extension;
};

PFEp.trim = function(file) {
    if (this.check(file)) {
        var len = file.length;
        var extLen = 1 + this.extension.length;
        file = file.slice(0, len - extLen);
    }
    return file;
};

PFEp.glob = function() {
    return "**/*." + this.extension;
};

exports.PreferredFileExtension = PreferredFileExtension;

BCp.setPreferredFileExtension = function(pfe) {
    assert.ok(pfe instanceof PreferredFileExtension);
    Object.defineProperty(this, "preferredFileExtension", { value: pfe });
};

BCp.setPreferredFileExtension(new PreferredFileExtension("js"));

BCp.expandIdsOrGlobsP = function(idsOrGlobs) {
    var context = this;

    return Q.all(
        idsOrGlobs.map(this.expandSingleIdOrGlobP, this)
    ).then(function(listOfListsOfIDs) {
        var result = [];
        var seen = {};

        util.flatten(listOfListsOfIDs).forEach(function(id) {
            if (!seen.hasOwnProperty(id)) {
                seen[id] = true;
                if (util.isValidModuleId(id))
                    result.push(id);
            }
        });

        return result;
    });
};

BCp.expandSingleIdOrGlobP = function(idOrGlob) {
    var context = this;

    return util.makePromise(function(callback) {
        // If idOrGlob already looks like an acceptable identifier, don't
        // try to expand it.
        if (util.isValidModuleId(idOrGlob)) {
            callback(null, [idOrGlob]);
            return;
        }

        glob(idOrGlob, {
            cwd: context.readFileCache.sourceDir
        }, function(err, files) {
            if (err) {
                callback(err);
            } else {
                callback(null, files.filter(function(file) {
                    return !context.isHiddenFile(file);
                }).map(function(file) {
                    return context.preferredFileExtension.trim(file);
                }));
            }
        });
    });
};

BCp.readModuleP = function(id) {
    return this.readFileCache.readFileP(
        id + "." + this.preferredFileExtension.extension
    );
};

BCp.readFileP = function(file) {
    return this.readFileCache.readFileP(file);
};

// Text editors such as VIM and Emacs often create temporary swap files
// that should be ignored.
var hiddenExp = /^\.|~$/;
BCp.isHiddenFile = function(file) {
    return hiddenExp.test(path.basename(file));
};

BCp.getProvidedP = util.cachedMethod(function() {
    var context = this;
    var pattern = "@providesModule\\s+\\S+";

    return grepP(
        pattern,
        context.readFileCache.sourceDir
    ).then(function(pathToMatch) {
        var idToPath = {};

        Object.keys(pathToMatch).sort().forEach(function(path) {
            if (context.isHiddenFile(path))
                return;

            var id = pathToMatch[path].split(/\s+/).pop();

            // If we're about to overwrite an existing module identifier,
            // make sure the corresponding path ends with the preferred
            // file extension. This allows @providesModule directives in
            // .coffee files, for example, but prevents .js~ temporary
            // files from taking precedence over actual .js files.
            if (!idToPath.hasOwnProperty(id) ||
                context.preferredFileExtension.check(path))
                idToPath[id] = path;
        });

        return idToPath;
    });
});

var providesExp = /@providesModule[ ]+(\S+)/;

BCp.getProvidedId = function(source) {
    var match = providesExp.exec(source);
    return match && match[1];
};

exports.BuildContext = BuildContext;
