import { Parser } from "./state";

const pp = Parser.prototype;

var STATE_KEYS = [
  "lastTokStartLoc",
  "lastTokEndLoc",
  "lastTokStart",
  "lastTokEnd",
  "lineStart",
  "startLoc",
  "curLine",
  "endLoc",
  "start",
  "pos",
  "end",
  "type",
  "value",
  "exprAllowed",
  "potentialArrowAt",
  "currLine",
  "input",
  "inType",
  "inFunction",
  "inGenerator",
  "labels",
  "tokens",
  "comments"
];

pp.getState = function () {
  var state = {};
  for (var i = 0; i < STATE_KEYS.length; i++) {
    var key = STATE_KEYS[i];
    state[key] = this[key];
  }
  state.comments = this.comments.slice();
  state.context  = this.context.slice();
  state.tokens   = this.tokens.slice();
  state.labels   = this.labels.slice();
  return state;
};

pp.setState = function (state) {
  for (var key in state) {
    this[key] = state[key];
  }
};

pp.lookahead = function () {
  var old = this.getState();

  this.isLookahead = true;
  this.next();
  this.isLookahead = false;

  var curr = this.getState();
  this.setState(old);
  return curr;
};
