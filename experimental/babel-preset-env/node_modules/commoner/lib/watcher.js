var assert = require("assert");
var path = require("path");
var fs = require("graceful-fs");
var spawn = require("child_process").spawn;
var Q = require("q");
var EventEmitter = require("events").EventEmitter;
var ReadFileCache = require("./cache").ReadFileCache;
var util = require("./util");
var hasOwn = Object.prototype.hasOwnProperty;

function Watcher(readFileCache, persistent) {
    assert.ok(this instanceof Watcher);
    assert.ok(this instanceof EventEmitter);
    assert.ok(readFileCache instanceof ReadFileCache);

    // During tests (and only during tests), persistent === false so that
    // the test suite can actually finish and exit.
    if (typeof persistent === "undefined") {
        persistent = true;
    }

    EventEmitter.call(this);

    var self = this;
    var sourceDir = readFileCache.sourceDir;
    var dirWatcher = new DirWatcher(sourceDir, persistent);

    Object.defineProperties(self, {
        sourceDir: { value: sourceDir },
        readFileCache: { value: readFileCache },
        dirWatcher: { value: dirWatcher }
    });

    // Watch everything the readFileCache already knows about, and any new
    // files added in the future.
    readFileCache.subscribe(function(relativePath) {
        self.watch(relativePath);
    });

    readFileCache.on("changed", function(relativePath) {
        self.emit("changed", relativePath);
    });

    function handleDirEvent(event, relativePath) {
        if (self.dirWatcher.ready) {
            self.getFileHandler(relativePath)(event);
        }
    }

    dirWatcher.on("added", function(relativePath) {
        handleDirEvent("added", relativePath);
    }).on("deleted", function(relativePath) {
        handleDirEvent("deleted", relativePath);
    }).on("changed", function(relativePath) {
        handleDirEvent("changed", relativePath);
    });
}

util.inherits(Watcher, EventEmitter);
var Wp = Watcher.prototype;

Wp.watch = function(relativePath) {
    this.dirWatcher.add(path.dirname(path.join(
        this.sourceDir, relativePath)));
};

Wp.readFileP = function(relativePath) {
    return this.readFileCache.readFileP(relativePath);
};

Wp.noCacheReadFileP = function(relativePath) {
    return this.readFileCache.noCacheReadFileP(relativePath);
};

Wp.getFileHandler = util.cachedMethod(function(relativePath) {
    var self = this;
    return function handler(event) {
        self.readFileCache.reportPossiblyChanged(relativePath);
    };
});

function orNull(err) {
    return null;
}

Wp.close = function() {
    this.dirWatcher.close();
};

/**
 * DirWatcher code adapted from Jeffrey Lin's original implementation:
 * https://github.com/jeffreylin/jsx_transformer_fun/blob/master/dirWatcher.js
 *
 * Invariant: this only watches the dir inode, not the actual path.
 * That means the dir can't be renamed and swapped with another dir.
 */
function DirWatcher(inputPath, persistent) {
    assert.ok(this instanceof DirWatcher);

    var self = this;
    var absPath = path.resolve(inputPath);

    if (!fs.statSync(absPath).isDirectory()) {
        throw new Error(inputPath + "is not a directory!");
    }

    EventEmitter.call(self);

    self.ready = false;
    self.on("ready", function(){
        self.ready = true;
    });

    Object.defineProperties(self, {
        // Map of absDirPaths to fs.FSWatcher objects from fs.watch().
        watchers: { value: {} },
        dirContents: { value: {} },
        rootPath: { value: absPath },
        persistent: { value: !!persistent }
    });

    process.nextTick(function() {
        self.add(absPath);
        self.emit("ready");
    });
}

util.inherits(DirWatcher, EventEmitter);
var DWp = DirWatcher.prototype;

DWp.add = function(absDirPath) {
    var self = this;
    if (hasOwn.call(self.watchers, absDirPath)) {
        return;
    }

    self.watchers[absDirPath] = fs.watch(absDirPath, {
        persistent: this.persistent
    }).on("change", function(event, filename) {
        self.updateDirContents(absDirPath, event, filename);
    });

    // Update internal dir contents.
    self.updateDirContents(absDirPath);

    // Since we've never seen this path before, recursively add child
    // directories of this path.  TODO: Don't do fs.readdirSync on the
    // same dir twice in a row.  We already do an fs.statSync in
    // this.updateDirContents() and we're just going to do another one
    // here...
    fs.readdirSync(absDirPath).forEach(function(filename) {
        var filepath = path.join(absDirPath, filename);

        // Look for directories.
        if (fs.statSync(filepath).isDirectory()) {
            self.add(filepath);
        }
    });
};

DWp.updateDirContents = function(absDirPath, event, fsWatchReportedFilename) {
    var self = this;

    if (!hasOwn.call(self.dirContents, absDirPath)) {
        self.dirContents[absDirPath] = [];
    }

    var oldContents = self.dirContents[absDirPath];
    var newContents = fs.readdirSync(absDirPath);

    var deleted = {};
    var added = {};

    oldContents.forEach(function(filename) {
        deleted[filename] = true;
    });

    newContents.forEach(function(filename) {
        if (hasOwn.call(deleted, filename)) {
            delete deleted[filename];
        } else {
            added[filename] = true;
        }
    });

    var deletedNames = Object.keys(deleted);
    deletedNames.forEach(function(filename) {
        self.emit(
            "deleted",
            path.relative(
                self.rootPath,
                path.join(absDirPath, filename)
            )
        );
    });

    var addedNames = Object.keys(added);
    addedNames.forEach(function(filename) {
        self.emit(
            "added",
            path.relative(
                self.rootPath,
                path.join(absDirPath, filename)
            )
        );
    });

    // So changed is not deleted or added?
    if (fsWatchReportedFilename &&
        !hasOwn.call(deleted, fsWatchReportedFilename) &&
        !hasOwn.call(added, fsWatchReportedFilename))
    {
        self.emit(
            "changed",
            path.relative(
                self.rootPath,
                path.join(absDirPath, fsWatchReportedFilename)
            )
        );
    }

    // If any of the things removed were directories, remove their watchers.
    // If a dir was moved, hopefully two changed events fired?
    //  1) event in dir where it was removed
    //  2) event in dir where it was moved to (added)
    deletedNames.forEach(function(filename) {
        var filepath = path.join(absDirPath, filename);
        delete self.dirContents[filepath];
        delete self.watchers[filepath];
    });

    // if any of the things added were directories, recursively deal with them
    addedNames.forEach(function(filename) {
        var filepath = path.join(absDirPath, filename);
        if (fs.existsSync(filepath) &&
            fs.statSync(filepath).isDirectory())
        {
            self.add(filepath);
            // mighttttttt need a self.updateDirContents() here in case
            // we're somehow adding a path that replaces another one...?
        }
    });

    // Update state of internal dir contents.
    self.dirContents[absDirPath] = newContents;
};

DWp.close = function() {
    var watchers = this.watchers;
    Object.keys(watchers).forEach(function(filename) {
        watchers[filename].close();
    });
};

exports.Watcher = Watcher;
