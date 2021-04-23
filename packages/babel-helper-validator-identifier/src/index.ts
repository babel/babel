import * as identifierV7 from "./identifier-v7";
import * as identifier from "./identifier";

export const isIdentifierName =
  parseFloat(process.versions.node) >= 10
    ? identifier.isIdentifierName
    : identifierV7.isIdentifierName;
export const isIdentifierStart =
  parseFloat(process.versions.node) >= 10
    ? identifier.isIdentifierStart
    : identifierV7.isIdentifierStart;
export const isIdentifierChar =
  parseFloat(process.versions.node) >= 10
    ? identifier.isIdentifierChar
    : identifierV7.isIdentifierChar;

export {
  isReservedWord,
  isStrictBindOnlyReservedWord,
  isStrictBindReservedWord,
  isStrictReservedWord,
  isKeyword,
} from "./keyword";
