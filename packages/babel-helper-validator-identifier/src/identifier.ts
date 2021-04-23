const fromCodePoint = String.fromCodePoint;
/* eslint-disable no-misleading-character-class */
const isIDStart = /[$_\p{ID_Start}\u08BE-\u08C7\u0D04\u31BB-\u31BF\u4DB6-\u4DBF\u9FF0-\u9FFC\uA7C7-\uA7CA\uA7F5\uA7F6\uAB68\uAB69\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10FB0}-\u{10FC4}\u{11147}\u{11460}\u{11461}\u{11900}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{11FB0}\u{18AF3}-\u{18CD5}\u{18D00}-\u{18D08}\u{2A6D7}-\u{2A6DD}\u{30000}-\u{3134A}]/u;
const isIDContinue = /[\p{ID_Continue}\u08BE-\u08C7\u0B55\u0D04\u0D81\u1ABF\u1AC0\u200C\u200D\u31BB-\u31BF\u4DB6-\u4DBF\u9FF0-\u9FFC\uA7C7-\uA7CA\uA7F5\uA7F6\uA82C\uAB68\uAB69\u{10E80}-\u{10EA9}\u{10EAB}\u{10EAC}\u{10EB0}\u{10EB1}\u{10FB0}-\u{10FC4}\u{11147}\u{111CE}\u{111CF}\u{11460}\u{11461}\u{11900}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{11935}\u{11937}\u{11938}\u{1193B}-\u{11943}\u{11950}-\u{11959}\u{11FB0}\u{16FE4}\u{16FF0}\u{16FF1}\u{18AF3}-\u{18CD5}\u{18D00}-\u{18D08}\u{1FBF0}-\u{1FBF9}\u{2A6D7}-\u{2A6DD}\u{30000}-\u{3134A}]/u;
const isID = /^[$_\p{ID_Start}\u08BE-\u08C7\u0D04\u31BB-\u31BF\u4DB6-\u4DBF\u9FF0-\u9FFC\uA7C7-\uA7CA\uA7F5\uA7F6\uAB68\uAB69\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10FB0}-\u{10FC4}\u{11147}\u{11460}\u{11461}\u{11900}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{11FB0}\u{18AF3}-\u{18CD5}\u{18D00}-\u{18D08}\u{2A6D7}-\u{2A6DD}\u{30000}-\u{3134A}][\p{ID_Continue}\u08BE-\u08C7\u0B55\u0D04\u0D81\u1ABF\u1AC0\u200C\u200D\u31BB-\u31BF\u4DB6-\u4DBF\u9FF0-\u9FFC\uA7C7-\uA7CA\uA7F5\uA7F6\uA82C\uAB68\uAB69\u{10E80}-\u{10EA9}\u{10EAB}\u{10EAC}\u{10EB0}\u{10EB1}\u{10FB0}-\u{10FC4}\u{11147}\u{111CE}\u{111CF}\u{11460}\u{11461}\u{11900}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{11935}\u{11937}\u{11938}\u{1193B}-\u{11943}\u{11950}-\u{11959}\u{11FB0}\u{16FE4}\u{16FF0}\u{16FF1}\u{18AF3}-\u{18CD5}\u{18D00}-\u{18D08}\u{1FBF0}-\u{1FBF9}\u{2A6D7}-\u{2A6DD}\u{30000}-\u{3134A}]*$/u;
/* eslint-enable no-misleading-character-class */

// Test whether a given character code starts an identifier.

export function isIdentifierStart(code: number): boolean {
  return !isNaN(code) && isIDStart.test(fromCodePoint(code));
}

// Test whether a given character is part of an identifier.

export function isIdentifierChar(code: number): boolean {
  return !isNaN(code) && isIDContinue.test(fromCodePoint(code));
}

// Test whether a given string is a valid identifier name

export function isIdentifierName(name: string): boolean {
  return isID.test(name);
}
