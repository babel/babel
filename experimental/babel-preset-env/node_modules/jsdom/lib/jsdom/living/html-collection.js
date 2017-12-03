"use strict";
const lengthFromProperties = require("../utils").lengthFromProperties;
const getAttributeValue = require("./attributes").getAttributeValue;

const privates = Symbol("HTMLCollection internal slots");

class HTMLCollection {
  constructor(secret, element, query) {
    if (secret !== privates) {
      throw new TypeError("Invalid constructor");
    }

    this[privates] = { element, query, snapshot: undefined, keys: [], length: 0, version: -1 };
    updateHTMLCollection(this);
  }

  get length() {
    updateHTMLCollection(this);
    return this[privates].length;
  }

  item(index) {
    updateHTMLCollection(this);
    return this[index] || null;
  }

  namedItem(name) {
    updateHTMLCollection(this);

    if (Object.prototype.hasOwnProperty.call(this, name)) {
      return this[name];
    }
    return null;
  }
}

function updateHTMLCollection(collection) {
  if (collection[privates].version < collection[privates].element._version) {
    collection[privates].snapshot = collection[privates].query();
    resetHTMLCollectionTo(collection, collection[privates].snapshot);
    collection[privates].version = collection[privates].element._version;
  }
}

function resetHTMLCollectionTo(collection, els) {
  const startingLength = lengthFromProperties(collection);
  for (let i = 0; i < startingLength; ++i) {
    delete collection[i];
  }

  for (let i = 0; i < els.length; ++i) {
    collection[i] = els[i];
  }
  collection[privates].length = els.length;

  const keys = collection[privates].keys;
  for (let i = 0; i < keys.length; ++i) {
    delete collection[keys[i]];
  }
  keys.length = 0;

  for (let i = 0; i < els.length; ++i) {
    addIfAttrPresent(els[i], "name");
  }
  for (let i = 0; i < els.length; ++i) {
    addIfAttrPresent(els[i], "id");
  }

  function addIfAttrPresent(el, attr) {
    const value = getAttributeValue(el, attr);

    if (value === null || value === "") {
      return;
    }

    // Don't overwrite numeric indices with named ones.
    const valueAsNumber = Number(value);
    if (!Number.isNaN(valueAsNumber) && valueAsNumber >= 0) {
      return;
    }

    collection[value] = el;
    keys.push(value);
  }
}

module.exports = function (core) {
  core.HTMLCollection = HTMLCollection;
};

module.exports.create = function (element, query) {
  return new HTMLCollection(privates, element, query);
};

module.exports.update = updateHTMLCollection;
