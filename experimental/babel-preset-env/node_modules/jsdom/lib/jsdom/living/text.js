"use strict";
const inheritFrom = require("../utils").inheritFrom;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("../living/node-type");

module.exports = function (core) {
  // TODO: constructor should not take ownerDocument
  core.Text = function Text(ownerDocument, data) {
    core.CharacterData.call(this, ownerDocument, data);
  };

  inheritFrom(core.CharacterData, core.Text, {
    nodeType: NODE_TYPE.TEXT_NODE, // TODO should be on prototype, not here
    splitText(offset) {
      offset >>>= 0;

      const length = this.length;

      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }

      const count = length - offset;
      const newData = this.substringData(offset, count);

      const newNode = this._ownerDocument.createTextNode(newData);

      const parent = domSymbolTree.parent(this);

      if (parent !== null) {
        parent.insertBefore(newNode, this.nextSibling);
      }

      this.replaceData(offset, count, "");

      return newNode;

      // TODO: range stuff
    }

    // TODO: wholeText property
  });
};
