"use strict";

const convertTemplateType = require("./convertTemplateType");
const convertToken = require("./convertToken");

module.exports = function(tokens, tt, code) {
  return convertTemplateType(tokens, tt)
    .filter(t => t.type !== "CommentLine" && t.type !== "CommentBlock")
    .map(t => convertToken(t, tt, code));
};
