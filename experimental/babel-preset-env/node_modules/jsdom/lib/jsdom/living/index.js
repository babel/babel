"use strict";
const core = module.exports = require("../level1/core");

// These (because of how they were written) directly include level1/core and modify it.
// ORDER IS IMPORTANT
require("../level2/core");
require("../level2/events");
require("../level2/html");
require("../level2/style");
require("../level3/core");
require("../level3/ls");
require("../level3/xpath");

require("./document-type")(core);
require("./character-data")(core);
require("./processing-instruction")(core);
require("./comment")(core);
require("./text")(core);
require("./dom-implementation")(core);
require("./document")(core);
require("./element")(core);
require("./html-collection")(core);
require("./node-filter")(core);
require("./node-iterator")(core);
require("./node-list")(core);
require("./node")(core);
require("./selectors")(core);
require("./parent-node")(core);
require("./non-document-type-child-node")(core);
require("./url")(core);
require("./blob")(core);
require("./file")(core);
require("./filelist")(core);
require("./form-data")(core);
require("./xmlhttprequest-event-target")(core);
require("./xmlhttprequest-upload")(core);

core.Attr = require("./generated/Attr").interface;
core.DOMTokenList = require("./dom-token-list").DOMTokenList;
