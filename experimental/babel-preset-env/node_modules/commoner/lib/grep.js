var assert = require("assert");
var path = require("path");
var Q = require("q");
var fs = require("graceful-fs");
var util = require("./util");
var readdir = Q.denodeify(fs.readdir);
var lstat = Q.denodeify(fs.lstat);

function processDirP(pattern, dir) {
    return readdir(dir).then(function(files) {
        return Q.all(files.map(function(file) {
            file = path.join(dir, file);
            return lstat(file).then(function(stat) {
                return stat.isDirectory()
                    ? processDirP(pattern, file)
                    : processFileP(pattern, file);
            });
        })).then(function(results) {
            return util.flatten(results);
        });
    });
}

function processFileP(pattern, file) {
    return util.readFileP(file).then(function(contents) {
        var result = new RegExp(pattern, 'g').exec(contents);
        return result ? [{
            path: file,
            match: result[0]
        }] : [];
    });
}

module.exports = function(pattern, sourceDir) {
    assert.strictEqual(typeof pattern, "string");

    return processDirP(pattern, sourceDir).then(function(results) {
        var pathToMatch = {};

        results.forEach(function(result) {
            pathToMatch[path.relative(
                sourceDir,
                result.path
            ).split("\\").join("/")] = result.match;
        });
        
        return pathToMatch;
    });
};
