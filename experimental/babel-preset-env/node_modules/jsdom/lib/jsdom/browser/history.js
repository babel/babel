"use strict";
const whatwgURL = require("whatwg-url-compat");
const resolveHref = require("../utils").resolveHref;

function StateEntry(data, title, url) {
  this.data = data;
  this.title = title;
  this.url = url;
}

module.exports = History;

function History(window) {
  this._states = [new StateEntry(null, "", window._document._URL)];
  this._index = 0;
  this._window = window;
  this._location = window._document._location;
}

History.prototype = {
  constructor: History,

  get length() {
    return this._states.length;
  },

  get state() {
    const state = this._states[this._index];
    return state ? state.data : null;
  },

  back() {
    this.go(-1);
  },

  forward() {
    this.go(1);
  },

  go(delta) {
    if (typeof delta === "undefined" || delta === 0) {
      this._location.reload();
      return;
    }

    const newIndex = this._index + delta;

    if (newIndex < 0 || newIndex >= this.length) {
      return;
    }

    this._index = newIndex;

    const state = this._states[newIndex];

    this._applyState(state);
    this._signalPopstate(state);
  },

  pushState(data, title, url) {
    const state = new StateEntry(data, title, url);
    if (this._index + 1 !== this._states.length) {
      this._states = this._states.slice(0, this._index + 1);
    }
    this._states.push(state);
    this._applyState(state);
    this._index++;
  },

  replaceState(data, title, url) {
    const state = new StateEntry(data, title, url);
    this._states[this._index] = state;
    this._applyState(state);
  },

  _applyState(state) {
    whatwgURL.setTheInput(this._location, resolveHref(this._location.href, state.url));
  },

  _signalPopstate(state) {
    if (this._window.document) {
      const ev = this._window.document.createEvent("HTMLEvents");
      ev.initEvent("popstate", false, false);
      ev.state = state.data;
      process.nextTick(() => this._window.dispatchEvent(ev));
    }
  },

  toString() {
    return "[object History]";
  }
};
