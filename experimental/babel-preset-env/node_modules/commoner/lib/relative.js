var assert = require("assert");
var Q = require("q");
var path = require("path");
var util = require("./util");
var recast = require("recast");
var n = recast.types.namedTypes;

function Relativizer(reader) {
    assert.ok(this instanceof Relativizer);
    assert.ok(reader === null ||
              reader instanceof require("./reader").ModuleReader);

    Object.defineProperties(this, {
        reader: { value: reader }
    });
}

var Rp = Relativizer.prototype;

exports.getProcessor = function(reader) {
    var relativizer = new Relativizer(reader);
    return function(id, input) {
        return relativizer.processSourceP(id, input);
    };
};

Rp.processSourceP = function(id, input) {
    var relativizer = this;
    var output = typeof input === "string" ? {
        ".js": input
    } : input;

    return Q(output[".js"]).then(function(source) {
        var promises = [];
        var ast = recast.parse(source);

        function fixRequireP(literal) {
            promises.push(relativizer.relativizeP(
                id, literal.value
            ).then(function(newValue) {
                return literal.value = newValue;
            }));
        }

        recast.visit(ast, {
            visitCallExpression: function(path) {
                var args = path.value.arguments;
                var callee = path.value.callee;

                if (n.Identifier.check(callee) &&
                    callee.name === "require" &&
                    args.length === 1) {
                    var arg = args[0];
                    if (n.Literal.check(arg) &&
                        typeof arg.value === "string") {
                        fixRequireP(arg);
                    }
                }

                this.traverse(path);
            }
        });

        return Q.all(promises).then(function() {
            output[".js"] = recast.print(ast).code;
            return output;
        });
    });
};

Rp.absolutizeP = function(moduleId, requiredId) {
    requiredId = util.absolutize(moduleId, requiredId);

    if (this.reader)
        return this.reader.getCanonicalIdP(requiredId);

    return Q(requiredId);
};

Rp.relativizeP = function(moduleId, requiredId) {
    return this.absolutizeP(
        moduleId,
        requiredId
    ).then(function(absoluteId) {
        return util.relativize(moduleId, absoluteId);
    });
};
