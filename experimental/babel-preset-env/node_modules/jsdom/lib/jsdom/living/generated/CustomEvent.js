"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");
const Impl = require("../events/CustomEvent-impl.js");

const Event = require("./Event.js");
const impl = utils.implSymbol;
const convertCustomEventInit = require("./CustomEventInit").convert;

function CustomEvent(type) {
  if (!this || this[impl] || !(this instanceof CustomEvent)) {
    throw new TypeError("Failed to construct 'CustomEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'CustomEvent': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["DOMString"](args[0]);
  args[1] = convertCustomEventInit(args[1]);

  module.exports.setup(this, args);
}
CustomEvent.prototype = Object.create(Event.interface.prototype);
CustomEvent.prototype.constructor = CustomEvent;

CustomEvent.prototype.initCustomEvent = function initCustomEvent(type, bubbles, cancelable, detail) {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  if (arguments.length < 4) {
    throw new TypeError("Failed to execute 'initCustomEvent' on 'CustomEvent': 4 arguments required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 4; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["DOMString"](args[0]);
  args[1] = conversions["boolean"](args[1]);
  args[2] = conversions["boolean"](args[2]);
  return this[impl].initCustomEvent.apply(this[impl], args);
};
Object.defineProperty(CustomEvent.prototype, "detail", {
  get() {
    return this[impl].detail;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(CustomEvent.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: CustomEvent,
  expose: {
    Window: { CustomEvent: CustomEvent },
    Worker: { CustomEvent: CustomEvent }
  }
};

