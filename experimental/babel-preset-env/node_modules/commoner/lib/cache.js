var assert = require("assert");
var Q = require("q");
var fs = require("fs");
var path = require("path");
var util = require("./util");
var EventEmitter = require("events").EventEmitter;
var hasOwn = Object.prototype.hasOwnProperty;

/**
 * ReadFileCache is an EventEmitter subclass that caches file contents in
 * memory so that subsequent calls to readFileP return the same contents,
 * regardless of any changes in the underlying file.
 */
function ReadFileCache(sourceDir, charset) {
    assert.ok(this instanceof ReadFileCache);
    assert.strictEqual(typeof sourceDir, "string");

    this.charset = charset;

    EventEmitter.call(this);

    Object.defineProperties(this, {
        sourceDir: { value: sourceDir },
        sourceCache: { value: {} }
    });
}

util.inherits(ReadFileCache, EventEmitter);
var RFCp = ReadFileCache.prototype;

/**
 * Read a file from the cache if possible, else from disk.
 */
RFCp.readFileP = function(relativePath) {
    var cache = this.sourceCache;

    relativePath = path.normalize(relativePath);

    return hasOwn.call(cache, relativePath)
        ? cache[relativePath]
        : this.noCacheReadFileP(relativePath);
};

/**
 * Read (or re-read) a file without using the cache.
 *
 * The new contents are stored in the cache for any future calls to
 * readFileP.
 */
RFCp.noCacheReadFileP = function(relativePath) {
    relativePath = path.normalize(relativePath);

    var added = !hasOwn.call(this.sourceCache, relativePath);
    var promise = this.sourceCache[relativePath] = util.readFileP(
        path.join(this.sourceDir, relativePath), this.charset);

    if (added) {
        this.emit("added", relativePath);
    }

    return promise;
};

/**
 * If you have reason to believe the contents of a file have changed, call
 * this method to re-read the file and compare the new contents to the
 * cached contents.  If the new contents differ from the contents of the
 * cache, the "changed" event will be emitted.
 */
RFCp.reportPossiblyChanged = function(relativePath) {
    var self = this;
    var cached = self.readFileP(relativePath);
    var fresh = self.noCacheReadFileP(relativePath);

    Q.spread([
        cached.catch(orNull),
        fresh.catch(orNull)
    ], function(oldData, newData) {
        if (oldData !== newData) {
            self.emit("changed", relativePath);
        }
    }).done();
};

/**
 * Invoke the given callback for all files currently known to the
 * ReadFileCache, and invoke it in the future when any new files become
 * known to the cache.
 */
RFCp.subscribe = function(callback, context) {
    for (var relativePath in this.sourceCache) {
        if (hasOwn.call(this.sourceCache, relativePath)) {
            callback.call(context || null, relativePath);
        }
    }

    this.on("added", function(relativePath) {
        callback.call(context || null, relativePath);
    });
};

/**
 * Avoid memory leaks by removing listeners and emptying the cache.
 */
RFCp.clear = function() {
    this.removeAllListeners();

    for (var relativePath in this.sourceCache) {
        delete this.sourceCache[relativePath];
    }
};

function orNull(err) {
    return null;
}

exports.ReadFileCache = ReadFileCache;
