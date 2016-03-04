import Parser from "../../parser";
import { Token } from "../../tokenizer";
import { posToLoc } from "./utilities";

const pp = Parser.prototype;
const MediaQueryEntryPoint = "@media ";
const keyframesEntryPoint = [
  "@keyframes",
  "@-webkit-keyframes",
  "@-moz-keyframes",
  "@-o-keyframes"
];

pp.cssxIsMediaQuery = function () {
  if (this.state.value.toString().indexOf(MediaQueryEntryPoint) === 0) {
    return true;
  }
  return false;
};

pp.cssxIsKeyFramesEntryPoint = function () {
  let value = this.state.value.toString().split(" ")[0];
  if (keyframesEntryPoint.indexOf(value) >= 0) {
    return true;
  }
  return false;
};

pp.cssxGetPreviousToken = function (steps=0) {
  return this.state.tokens[this.state.tokens.length - (steps+1)];
};

pp.cssxMatchPreviousToken = function (type, step) {
  let previous = this.cssxGetPreviousToken(step);

  if (previous && previous.type === type) return true;
  return false;
};

pp.cssxMatchNextToken = function () {
  let next, nextA, nextB, old;

  if (arguments.length === 1) {
    next = this.lookahead();
    if (next && next.type === arguments[0]) return true;
    return false;
  } else if (arguments.length === 2) {
    old = this.state;
    this.state = old.clone(true);

    this.isLookahead = true;
    this.next();
    nextA = this.state.clone(true);
    this.next();
    nextB = this.state.clone(true);
    this.isLookahead = false;
    this.state = old;
    if (
      nextA && nextA.type === arguments[0] &&
      nextB && nextB.type === arguments[1]
    ) {
      return true;
    }
    return false;
  }
};

pp.cssxLookahead = function (numOfTokens=2) {
  let old = this.state;
  let stack = [];

  this.state = old.clone(true);

  this.isLookahead = true;
  while (numOfTokens > 0) {
    try {
      this.next();
      stack.push(this.state.clone(true));
    } catch (e) {
      // The next token cannot be parsed.
      // We still put something in the stack though so we 
      // don"t break the logic that uses the result of
      // this function
      stack.push({ type: null });
    }
    --numOfTokens;
  }
  this.isLookahead = false;
  this.state = old;

  return {
    stack,
    last: stack[stack.length-1],
    first: stack[0]
  };  
};

pp.cssxClonePosition = function (loc) {
  return {
    line: loc.line,
    column: loc.column
  };
};

pp.cssxDebugComments = function (comments) {
  if (!comments || comments.length === 0) return null;
  return JSON.stringify(comments.map(function (c) {
    return { type: c.type, value: c.value };
  }));
};

pp.cssxClearSpaceAtTheEnd = function (value) {
  if (value.charAt(value.length-1) === " ") {
    --this.state.pos;
    return value.substr(0, value.length-1);
  }
  return value;
};

pp.cssxFinishTokenAt = function (type, val, pos, loc) {
  this.state.end = pos;
  this.state.endLoc = loc;
  let prevType = this.state.type;
  this.state.type = type;
  this.state.value = val;

  this.updateContext(prevType);
};

pp.replaceCurrentTokenType = function (type) {
  this.state.type = type;
};

pp.cssxStoreNextCharAsToken = function (type) {
  let curContext = this.curContext();

  ++this.state.pos;
  this.finishToken(type);
  
  this.state.tokens.push(new Token(this.state));
  if (!curContext || !curContext.preserveSpace) this.skipSpace();
  this.cssxSyncLocPropsToCurPos();
};

pp.cssxStoreCurrentToken = function () {
  this.state.tokens.push(new Token(this.state));
  this.cssxSyncLocPropsToCurPos();
};

pp.cssxSyncLocPropsToCurPos = function (p) {
  let pos = typeof p === "undefined" ? this.state.pos : p;

  this.state.start = this.state.end = pos;
  this.state.startLoc = this.state.endLoc = posToLoc(pos, this.state.input);
};

pp.cssxSyncEndTokenStateToCurPos = function () {
  let meta = posToLoc(this.state.pos, this.state.input, true);

  this.state.endLoc.line = meta.line;
  this.state.endLoc.column = meta.column;
  this.state.lineStart = meta.lineStart;
  this.state.curLine = meta.curLine;
};