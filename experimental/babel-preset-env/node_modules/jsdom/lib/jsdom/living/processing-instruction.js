"use strict";
const inheritFrom = require("../utils").inheritFrom;
const NODE_TYPE = require("../living/node-type");

module.exports = function (core) {
  core.ProcessingInstruction = function ProcessingInstruction(ownerDocument, target, data) {
    core.CharacterData.call(this, ownerDocument, data);

    this._target = target;
  };

  inheritFrom(core.CharacterData, core.ProcessingInstruction, {
    nodeType: NODE_TYPE.PROCESSING_INSTRUCTION_NODE, // TODO should be on prototype, not here
    get target() {
      return this._target;
    }
  });
};
