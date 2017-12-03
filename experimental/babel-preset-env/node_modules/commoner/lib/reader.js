var assert = require("assert");
var path = require("path");
var fs = require("fs");
var Q = require("q");
var iconv = require("iconv-lite");
var createHash = require("crypto").createHash;
var detective = require("detective");
var util = require("./util");
var BuildContext = require("./context").BuildContext;
var slice = Array.prototype.slice;

function getRequiredIDs(id, source) {
    var ids = {};
    detective(source).forEach(function (dep) {
        ids[path.normalize(path.join(id, "..", dep))] = true;
    });
    return Object.keys(ids);
}

function ModuleReader(context, resolvers, processors) {
    var self = this;
    assert.ok(self instanceof ModuleReader);
    assert.ok(context instanceof BuildContext);
    assert.ok(resolvers instanceof Array);
    assert.ok(processors instanceof Array);

    var hash = createHash("sha1").update(context.optionsHash + "\0");

    function hashCallbacks(salt) {
        hash.update(salt + "\0");

        var cbs = util.flatten(slice.call(arguments, 1));

        cbs.forEach(function(cb) {
            assert.strictEqual(typeof cb, "function");
            hash.update(cb + "\0");
        });

        return cbs;
    }

    resolvers = hashCallbacks("resolvers", resolvers, warnMissingModule);

    var procArgs = [processors];
    if (context.relativize && !context.ignoreDependencies)
        procArgs.push(require("./relative").getProcessor(self));
    processors = hashCallbacks("processors", procArgs);

    Object.defineProperties(self, {
        context: { value: context },
        idToHash: { value: {} },
        resolvers: { value: resolvers },
        processors: { value: processors },
        salt: { value: hash.digest("hex") }
    });
}

ModuleReader.prototype = {
    getSourceP: util.cachedMethod(function(id) {
        var context = this.context;
        var copy = this.resolvers.slice(0).reverse();
        assert.ok(copy.length > 0, "no source resolvers registered");

        function tryNextResolverP() {
            var resolve = copy.pop();

            try {
                var promise = Q(resolve && resolve.call(context, id));
            } catch (e) {
                promise = Q.reject(e);
            }

            return resolve ? promise.then(function(result) {
                if (typeof result === "string")
                    return result;
                return tryNextResolverP();
            }, tryNextResolverP) : promise;
        }

        return tryNextResolverP();
    }),

    getCanonicalIdP: util.cachedMethod(function(id) {
        var reader = this;
        if (reader.context.useProvidesModule) {
            return reader.getSourceP(id).then(function(source) {
                return reader.context.getProvidedId(source) || id;
            });
        } else {
          return Q(id);
        }
    }),

    readModuleP: util.cachedMethod(function(id) {
        var reader = this;

        return reader.getSourceP(id).then(function(source) {
            if (reader.context.useProvidesModule) {
                // If the source contains a @providesModule declaration, treat
                // that declaration as canonical. Note that the Module object
                // returned by readModuleP might have an .id property whose
                // value differs from the original id parameter.
                id = reader.context.getProvidedId(source) || id;
            }

            assert.strictEqual(typeof source, "string");

            var hash = createHash("sha1")
                .update("module\0")
                .update(id + "\0")
                .update(reader.salt + "\0")
                .update(source.length + "\0" + source)
                .digest("hex");

            if (reader.idToHash.hasOwnProperty(id)) {
                // Ensure that the same module identifier is not
                // provided by distinct modules.
                assert.strictEqual(
                    reader.idToHash[id], hash,
                    "more than one module named " +
                        JSON.stringify(id));
            } else {
                reader.idToHash[id] = hash;
            }

            return reader.buildModuleP(id, hash, source);
        });
    }),

    buildModuleP: util.cachedMethod(function(id, hash, source) {
        var reader = this;
        return reader.processOutputP(
            id, hash, source
        ).then(function(output) {
            return new Module(reader, id, hash, output);
        });
    }, function(id, hash, source) {
        return hash;
    }),

    processOutputP: function(id, hash, source) {
        var reader = this;
        var cacheDir = reader.context.cacheDir;
        var manifestDir = cacheDir && path.join(cacheDir, "manifest");
        var charset = reader.context.options.outputCharset;

        function buildP() {
            var promise = Q(source);

            reader.processors.forEach(function(build) {
                promise = promise.then(function(input) {
                    return util.waitForValuesP(
                        build.call(reader.context, id, input)
                    );
                });
            });

            return promise.then(function(output) {
                if (typeof output === "string") {
                    output = { ".js": output };
                } else {
                    assert.strictEqual(typeof output, "object");
                }

                return util.waitForValuesP(output);

            }).then(function(output) {
                util.log.err(
                    "built Module(" + JSON.stringify(id) + ")",
                    "cyan"
                );

                return output;

            }).catch(function(err) {
                // Provide additional context for uncaught build errors.
                util.log.err("Error while reading module " + id + ":");
                throw err;
            });
        }

        if (manifestDir) {
            return util.mkdirP(manifestDir).then(function(manifestDir) {
                var manifestFile = path.join(manifestDir, hash + ".json");

                return util.readJsonFileP(manifestFile).then(function(manifest) {
                    Object.keys(manifest).forEach(function(key) {
                        var cacheFile = path.join(cacheDir, manifest[key]);
                        manifest[key] = util.readFileP(cacheFile);
                    });

                    return util.waitForValuesP(manifest, true);

                }).catch(function(err) {
                    return buildP().then(function(output) {
                        var manifest = {};

                        Object.keys(output).forEach(function(key) {
                            var cacheFile = manifest[key] = hash + key;
                            var fullPath = path.join(cacheDir, cacheFile);

                            if (charset) {
                                fs.writeFileSync(fullPath, iconv.encode(output[key], charset))
                            } else {
                                fs.writeFileSync(fullPath, output[key], "utf8");
                            }
                        });

                        fs.writeFileSync(
                            manifestFile,
                            JSON.stringify(manifest),
                            "utf8"
                        );

                        return output;
                    });
                });
            });
        }

        return buildP();
    },

    readMultiP: function(ids) {
        var reader = this;

        return Q(ids).all().then(function(ids) {
            if (ids.length === 0)
                return ids; // Shortcut.

            var modulePs = ids.map(reader.readModuleP, reader);
            return Q(modulePs).all().then(function(modules) {
                var seen = {};
                var result = [];

                modules.forEach(function(module) {
                    if (!seen.hasOwnProperty(module.id)) {
                        seen[module.id] = true;
                        result.push(module);
                    }
                });

                return result;
            });
        });
    }
};

exports.ModuleReader = ModuleReader;

function warnMissingModule(id) {
    // A missing module may be a false positive and therefore does not warrant
    // a fatal error, but a warning is certainly in order.
    util.log.err(
        "unable to resolve module " + JSON.stringify(id) + "; false positive?",
        "yellow");

    // Missing modules are installed as if they existed, but it's a run-time
    // error if one is ever actually required.
    var message = "nonexistent module required: " + id;
    return "throw new Error(" + JSON.stringify(message) + ");";
}

function Module(reader, id, hash, output) {
    assert.ok(this instanceof Module);
    assert.ok(reader instanceof ModuleReader);
    assert.strictEqual(typeof output, "object");

    var source = output[".js"];
    assert.strictEqual(typeof source, "string");

    Object.defineProperties(this, {
        reader: { value: reader },
        id: { value: id },
        hash: { value: hash }, // TODO Remove?
        deps: { value: getRequiredIDs(id, source) },
        source: { value: source },
        output: { value: output }
    });
}

Module.prototype = {
    getRequiredP: function() {
        return this.reader.readMultiP(this.deps);
    },

    writeVersionP: function(outputDir) {
        var id = this.id;
        var hash = this.hash;
        var output = this.output;
        var cacheDir = this.reader.context.cacheDir;
        var charset = this.reader.context.options.outputCharset;

        return Q.all(Object.keys(output).map(function(key) {
            var outputFile = path.join(outputDir, id + key);

            function writeCopy() {
                if (charset) {
                    fs.writeFileSync(outputFile, iconv.encode(output[key], charset));
                } else {
                    fs.writeFileSync(outputFile, output[key], "utf8");
                }
                return outputFile;
            }

            if (cacheDir) {
                var cacheFile = path.join(cacheDir, hash + key);
                return util.linkP(cacheFile, outputFile)
                    // If the hard linking fails, the cache directory
                    // might be on a different device, so fall back to
                    // writing a copy of the file (slightly slower).
                    .catch(writeCopy);
            }

            return util.mkdirP(path.dirname(outputFile)).then(writeCopy);
        }));
    },

    toString: function() {
        return "Module(" + JSON.stringify(this.id) + ")";
    },

    resolveId: function(id) {
        return util.absolutize(this.id, id);
    }
};
