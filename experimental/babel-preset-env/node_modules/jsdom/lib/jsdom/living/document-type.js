"use strict";
const NODE_TYPE = require("../living/node-type");

const privates = Symbol("DocumentType internal slots");

module.exports = core => {
  core.DocumentType = class DocumentType extends core.Node {
    constructor(secret, ownerDocument, name, publicId, systemId) {
      if (secret !== privates) {
        throw new TypeError("Invalid constructor");
      }

      super(ownerDocument);
      this[privates] = { name, publicId, systemId };
    }

    get name() {
      return this[privates].name;
    }
    get publicId() {
      return this[privates].publicId;
    }
    get systemId() {
      return this[privates].systemId;
    }
  };

  core.DocumentType.prototype.nodeType = NODE_TYPE.DOCUMENT_TYPE_NODE; // TODO should be on Node, not here
};

module.exports.create = (core, ownerDocument, name, publicId, systemId) => {
  return new core.DocumentType(privates, ownerDocument, name, publicId, systemId);
};

module.exports.clone = (core, otherDoctype) => {
  return new core.DocumentType(
    privates,
    otherDoctype._ownerDocument,
    otherDoctype[privates].name,
    otherDoctype[privates].publicId,
    otherDoctype[privates].systemId
  );
};

module.exports.getPrivates = doctype => {
  return doctype[privates];
};
