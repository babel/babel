import { TokenType, types as tt } from "../../tokenizer/types";
import { stringToCode } from './utilities';

const CSSXPropertyAllowedCodes = [
  '-'
].map(stringToCode);

const CSSXValueAllowedCodes = [
  ' ' , '\n', '\t', '#', '.', '-', '(', ')', '[', ']', '\'', '"', '%', ',', ':', '/', '\\'
].map(stringToCode);

const CSSXSelectorAllowedCodes = [
  ' ', '*', '>', '+', '~', '.', ':', '(', ')', '=', '[', ']', '"', '-',
  '!', '?', '@', '#', '$', '%', '^', '&', '\'', '|', ','
].map(stringToCode);

export default {
  CSSXPropertyAllowedCodes,
  CSSXValueAllowedCodes,
  CSSXSelectorAllowedCodes
};