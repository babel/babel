import { TokenType, types as tt } from "../../tokenizer/types";
import { stringToCode } from './utilities';

const CSSXElementStartAssumption = [
  tt.name,
  tt.star,
  tt.dot,
  tt.relational,
  tt.colon,
  tt.bracketL,
  tt.bracketR,
  tt.eq,
  tt.string,
  tt.prefix,
  tt.assign,
  tt.plusMin,
  tt.parenL,
  tt.parenR,
  tt._class
];
const CSSXPropertyAllowedCodes = [
  '-'
].map(stringToCode);

const CSSXValueAllowedCodes = [
  ' ' , '\n', '\t', '#', '.', '-', '(', ')', '[', ']', '\'', '"', '%', ',', ':', '/', '\\'
].map(stringToCode);

const CSSXSelectorAllowedCodes = [
  ' ', '*', '>', '+', '~', '.', ':', '(', ')', '=', '[', ']', '"', '-',
  '!', '?', '@', '#', '$', '%', '^', '&', '\'', '|'
].map(stringToCode);

export default {
  CSSXElementStartAssumption,
  CSSXPropertyAllowedCodes,
  CSSXValueAllowedCodes,
  CSSXSelectorAllowedCodes
};