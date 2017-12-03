"use strict";

const filelistSymbols = require("./filelist-symbols");

module.exports = function (core) {
  class FileList {
    constructor() {
      if (!(this instanceof FileList)) {
        throw new TypeError("DOM object constructor cannot be called as a function.");
      }
      this[filelistSymbols.list] = [];
    }
    item(index) {
      return this[filelistSymbols.list][index] || null;
    }
    get length() {
      return this[filelistSymbols.list].length;
    }
  }
  core.FileList = FileList;
};
