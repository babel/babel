"use strict";

const formDataSymbols = require("./form-data-symbols");

module.exports = function (core) {
  const Blob = core.Blob;
  const File = core.File;

  class FormData {
    constructor(form) {
      if (!(this instanceof FormData)) {
        throw new TypeError("DOM object constructor cannot be called as a function.");
      }
      const entries = this[formDataSymbols.entries] = [];
      if (form && form.elements) {
        for (let i = 0; i < form.elements.length; i++) {
          const el = form.elements[i];
          if (el.type === "file") {
            for (let j = 0; j < el.files.length; j++) {
              entries.push({ name: el.name, value: el.files.item(j) });
            }
          } else {
            entries.push({ name: el.name, value: el.value });
          }
        }
      }
    }
    append(name, value, filename) {
      if (value instanceof Blob) {
        value = new File(
          [value],
          filename || value.name || "blob",
          { type: value.type, lastModified: value.lastModified }
        );
      } else {
        value = String(value);
      }
      const entries = this[formDataSymbols.entries];
      entries.push({ name, value });
    }
    delete(name) {
      this[formDataSymbols.entries] = this[formDataSymbols.entries].filter(entry => entry.name !== name);
    }
    get(name) {
      return this[formDataSymbols.entries].find(entry => entry.name === name) || null;
    }
    getAll(name) {
      return this[formDataSymbols.entries].filter(entry => entry.name === name).map(entry => entry.value);
    }
    has(name) {
      return this[formDataSymbols.entries].findIndex(entry => entry.name === name) !== -1;
    }
    set(name, value, filename) {
      if (value instanceof Blob) {
        value = new File(
          [value],
          filename || value.name || "blob",
          { type: value.type, lastModified: value.lastModified }
        );
      } else {
        value = String(value);
      }
      const newEntry = { name, value };
      const entries = this[formDataSymbols.entries];
      const existing = entries.findIndex(entry => entry.name === name);
      if (existing !== -1) {
        entries[existing] = newEntry;
        this[formDataSymbols.entries] = entries.filter((entry, index) => entry.name !== name || index === existing);
      } else {
        entries.push(newEntry);
      }
    }
    toString() {
      return "[object FormData]";
    }
  }

  core.FormData = FormData;
};
