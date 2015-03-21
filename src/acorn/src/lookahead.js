import {Parser} from "./state"

const pp = Parser.prototype

var STATE_KEYS = [
  "lastTokStartLoc",
  "lastTokEndLoc",
  "lastTokStart",
  "lastTokEnd",
  "lineStart",
  "startLoc",
  "endLoc",
  "start",
  "pos",
  "end",
  "type",
  "value"
];

pp.getState = function () {
  var state = {};
  for (var i = 0; i < STATE_KEYS.length; i++) {
    var key = STATE_KEYS[i];
    state[key] = this[key];
  }
  return state;
};

pp.lookahead = function() {
  var old = this.getState();
  this.next();
  var curr = this.getState();
  for (var key in old) this[key] = old[key];
  return curr;
};
