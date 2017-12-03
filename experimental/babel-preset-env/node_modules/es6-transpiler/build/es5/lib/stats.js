var fmt = require("simple-fmt");
var is = require("simple-is");
var assert = require("assert");

function Stats() {
    this.lets = 0;
    this.consts = 0;
    this.renames = [];
}

Stats.prototype.declarator = function(kind) {
    assert(is.someof(kind, ["const", "let"]));
    if (kind === "const") {
        this.consts++;
    } else {
        this.lets++;
    }
};

Stats.prototype.rename = function(oldName, newName, line) {
    this.renames.push({
        oldName: oldName,
        newName: newName,
        line: line,
    });
};

Stats.prototype.toString = function() {
//    console.log("defs.js stats for file {0}:", filename)

    var renames = this.renames.map(function(r) {
        return r;
    }).sort(function(a, b) {
            return a.line - b.line;
        }); // sort a copy of renames

    var renameStr = renames.map(function(rename) {
        return fmt("\nline {0}: {1} => {2}", rename.line, rename.oldName, rename.newName);
    }).join("");

    var sum = this.consts + this.lets;
    var constlets = (sum === 0 ?
        "can't calculate const coverage (0 consts, 0 lets)" :
        fmt("{0}% const coverage ({1} consts, {2} lets)",
            Math.floor(100 * this.consts / sum), this.consts, this.lets));

    return constlets + renameStr + "\n";
};

module.exports = Stats;
