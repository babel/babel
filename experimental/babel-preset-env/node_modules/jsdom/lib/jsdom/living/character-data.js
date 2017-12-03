"use strict";
const inheritFrom = require("../utils").inheritFrom;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;

module.exports = function (core) {
  core.CharacterData = function CharacterData(ownerDocument, data) {
    core.Node.call(this, ownerDocument);

    this._data = data;
  };

  inheritFrom(core.Node, core.CharacterData, {
    get data() {
      return this._data;
    },
    set data(data) {
      if (data === null) {
        data = "";
      }
      data = String(data);

      this._setData(data);
    },

    get length() {
      return this._data.length;
    },

    substringData(offset, count) {
      if (arguments.length < 2) {
        throw new TypeError("Not enough arguments to CharacterData.prototype.substringData");
      }
      offset >>>= 0;
      count >>>= 0;

      const length = this.length;

      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }

      if (offset + count > length) {
        return this._data.substring(offset);
      }

      return this._data.substring(offset, offset + count);
    },

    appendData(data) {
      if (arguments.length < 1) {
        throw new TypeError("Not enough arguments to CharacterData.prototype.appendData");
      }

      this.replaceData(this.length, 0, data);
    },

    insertData(offset, data) {
      if (arguments.length < 2) {
        throw new TypeError("Not enough arguments to CharacterData.prototype.insertData");
      }

      this.replaceData(offset, 0, data);
    },

    deleteData(offset, count) {
      if (arguments.length < 2) {
        throw new TypeError("Not enough arguments to CharacterData.prototype.deleteData");
      }

      this.replaceData(offset, count, "");
    },

    replaceData(offset, count, data) {
      if (arguments.length < 3) {
        throw new TypeError("Not enough arguments to CharacterData.prototype.replaceData");
      }
      offset >>>= 0;
      count >>>= 0;
      data = String(data);

      const length = this.length;

      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }

      if (offset + count > length) {
        count = length - offset;
      }

      const start = this._data.substring(0, offset);
      const end = this._data.substring(offset + count);

      this._setData(start + data + end);

      // TODO: range stuff
    },

    _setData(newData) {
      // TODO: remove this once we no longer rely on mutation events internally, since they are nonstandard
      const oldData = this._data;
      this._data = newData;

      if (this._ownerDocument &&
          domSymbolTree.parent(this) &&
          this._ownerDocument.implementation._hasFeature("MutationEvents")) {
        const ev = this._ownerDocument.createEvent("MutationEvents");
        ev.initMutationEvent("DOMCharacterDataModified", true, false, this, oldData, newData, null, null);
        this.dispatchEvent(ev);
      }
    }
  });
};
