"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../elements/HTMLTemplateElement-impl.js");

const HTMLElement = require("./HTMLElement.js");
const impl = utils.implSymbol;

function HTMLTemplateElement() {
  throw new TypeError("Illegal constructor");
}
HTMLTemplateElement.prototype = Object.create(HTMLElement.interface.prototype);
HTMLTemplateElement.prototype.constructor = HTMLTemplateElement;
Object.defineProperty(HTMLTemplateElement.prototype, "content", {
  get() {
    return this[impl].content;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(HTMLTemplateElement.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: HTMLTemplateElement,
  expose: {
    Window: { HTMLTemplateElement: HTMLTemplateElement }
  }
};

