"use strict";
const inheritFrom = require("../utils").inheritFrom;
const NODE_TYPE = require("../living/node-type");

module.exports = function (core) {
  // TODO: constructor should not take ownerDocument
  core.Comment = function Comment(ownerDocument, data) {
    core.CharacterData.call(this, ownerDocument, data);
  };

  inheritFrom(core.CharacterData, core.Comment, {
    nodeType: NODE_TYPE.COMMENT_NODE // TODO should be on prototype, not here
  });
};
