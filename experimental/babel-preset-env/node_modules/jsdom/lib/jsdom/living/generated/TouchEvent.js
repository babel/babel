"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/TouchEvent-impl.js");

const UIEvent = require("./UIEvent.js");
const impl = utils.implSymbol;

function TouchEvent() {
  throw new TypeError("Illegal constructor");
}
TouchEvent.prototype = Object.create(UIEvent.interface.prototype);
TouchEvent.prototype.constructor = TouchEvent;
Object.defineProperty(TouchEvent.prototype, "touches", {
  get() {
    return this[impl].touches;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(TouchEvent.prototype, "targetTouches", {
  get() {
    return this[impl].targetTouches;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(TouchEvent.prototype, "changedTouches", {
  get() {
    return this[impl].changedTouches;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(TouchEvent.prototype, "altKey", {
  get() {
    return this[impl].altKey;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(TouchEvent.prototype, "metaKey", {
  get() {
    return this[impl].metaKey;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(TouchEvent.prototype, "ctrlKey", {
  get() {
    return this[impl].ctrlKey;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(TouchEvent.prototype, "shiftKey", {
  get() {
    return this[impl].shiftKey;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(TouchEvent.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: TouchEvent,
  expose: {
    Window: { TouchEvent: TouchEvent }
  }
};

