"use strict";
const EventEmitter = require("events").EventEmitter;

module.exports = class VirtualConsole extends EventEmitter {
  constructor() {
    super();

    // If "error" event has no listeners,
    // EventEmitter throws an exception
    this.on("error", () => { });
  }

  sendTo(anyConsole, options) {
    if (options === undefined) {
      options = {};
    }

    for (const method of Object.keys(anyConsole)) {
      if (typeof anyConsole[method] === "function") {
        function onMethodCall() {
          anyConsole[method].apply(anyConsole, arguments);
        }
        this.on(method, onMethodCall);
      }
    }

    if (!options.omitJsdomErrors) {
      this.on("jsdomError", e => anyConsole.error(e.stack, e.detail));
    }

    return this;
  }
};
