"use strict";
const whatwgURL = require("whatwg-url-compat");
const documentBaseURL = require("../living/helpers/document-base-url").documentBaseURL;
const notImplemented = require("./not-implemented");
const URL = whatwgURL.createURLConstructor();

module.exports = Location;

const document = Symbol("relevant document");
const oldParsedURL = Symbol("old parsed URL");

function Location(urlString, relevantDocument) {
  this[document] = relevantDocument;
  whatwgURL.setTheInput(this, urlString);

  try {
    this[oldParsedURL] = new URL(urlString);
  } catch (e) {
    this[oldParsedURL] = {};
  }
}

whatwgURL.mixinURLUtils(
  Location.prototype,
  function getTheBase() {
    return documentBaseURL(this[document]);
  },
  function updateSteps() {
    if (this[oldParsedURL].protocol !== this.protocol ||
        this[oldParsedURL].username !== this.username ||
        this[oldParsedURL].password !== this.password ||
        this[oldParsedURL].hostname !== this.hostname ||
        this[oldParsedURL].port !== this.port ||
        this[oldParsedURL].pathname !== this.pathname ||
        this[oldParsedURL].search !== this.search) {
      notImplemented("navigation via the location interface", this[document]._defaultView);
    } else if (this[oldParsedURL].hash !== this.hash) {
      const window = this[document].defaultView;
      const ev = new window.HashChangeEvent("hashchange", {
        bubbles: true,
        cancelable: false,
        oldURL: this[oldParsedURL].href,
        newURL: this.href
      });

      window.setTimeout(() => {
        window.dispatchEvent(ev);
      }, 0);
    }

    this[oldParsedURL] = new URL(this.href);
    this[document]._URL = this.href;
  }
);

Location.prototype.assign = function () {
  notImplemented("location.assign", this[document]._defaultView);
};

Location.prototype.replace = function (url) {
  // This is nowhere near spec compliant, but has worked so far.
  whatwgURL.setTheInput(this, url);
};

Location.prototype.reload = function () {
  notImplemented("location.reload", this[document]._defaultView);
};
