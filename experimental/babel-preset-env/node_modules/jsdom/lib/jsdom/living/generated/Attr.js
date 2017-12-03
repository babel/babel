"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../attributes/Attr-impl.js");

const impl = utils.implSymbol;

function Attr() {
  throw new TypeError("Illegal constructor");
}
Object.defineProperty(Attr.prototype, "namespaceURI", {
  get() {
    return this[impl].namespaceURI;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "prefix", {
  get() {
    return this[impl].prefix;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "localName", {
  get() {
    return this[impl].localName;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "name", {
  get() {
    return this[impl].name;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "value", {
  get() {
    return this[impl].value;
  },
  set(V) {
    V = conversions["DOMString"](V);
    this[impl].value = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "nodeValue", {
  get() {
    return this[impl].nodeValue;
  },
  set(V) {
    V = conversions["DOMString"](V, { treatNullAsEmptyString: true });
    this[impl].nodeValue = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "textContent", {
  get() {
    return this[impl].textContent;
  },
  set(V) {
    V = conversions["DOMString"](V, { treatNullAsEmptyString: true });
    this[impl].textContent = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "ownerElement", {
  get() {
    return this[impl].ownerElement;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(Attr.prototype, "specified", {
  get() {
    return this[impl].specified;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(Attr.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: Attr,
  expose: {
    Window: { Attr: Attr }
  }
};

