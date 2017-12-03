var path = require("path");
var Commoner = require("./lib/commoner").Commoner;
exports.Commoner = Commoner;

function defCallback(name) {
    exports[name] = function() {
        var commoner = new Commoner;
        commoner[name].apply(commoner, arguments);
        commoner.cliBuildP();
        return commoner;
    };
}

defCallback("version");
defCallback("resolve");
defCallback("process");
