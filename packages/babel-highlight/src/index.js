import jsTokens, { matchToToken } from "js-tokens";
import esutils from "esutils";
import Chalk from "chalk";

/**
 * Chalk styles for token types.
 */
function getDefs(chalk) {
  return {
    keyword: chalk.cyan,
    capitalized: chalk.yellow,
    jsx_tag: chalk.yellow,
    punctuator: chalk.yellow,
    // bracket:  intentionally omitted.
    number: chalk.magenta,
    string: chalk.green,
    regex: chalk.magenta,
    comment: chalk.grey,
    invalid: chalk.white.bgRed.bold,
  };
}

/**
 * RegExp to test for newlines in terminal.
 */
const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

/**
 * RegExp to test for what seems to be a JSX tag name.
 */
const JSX_TAG = /^[a-z][\w-]*$/i;

/**
 * RegExp to test for the three types of brackets.
 */
const BRACKET = /^[()[\]{}]$/;

/**
 * Get the type of token, specifying punctuator type.
 */
function getTokenType(match) {
  const [offset, text] = match.slice(-2);
  const token = matchToToken(match);

  if (token.type === "name") {
    if (esutils.keyword.isReservedWordES6(token.value)) {
      return "keyword";
    }

    if (
      JSX_TAG.test(token.value) &&
      (text[offset - 1] === "<" || text.substr(offset - 2, 2) == "</")
    ) {
      return "jsx_tag";
    }

    if (token.value[0] !== token.value[0].toLowerCase()) {
      return "capitalized";
    }
  }

  if (token.type === "punctuator" && BRACKET.test(token.value)) {
    return "bracket";
  }

  if (
    token.type === "invalid" &&
    (token.value === "@" || token.value === "#")
  ) {
    return "punctuator";
  }

  return token.type;
}

/**
 * Highlight `text` using the token definitions in `defs`.
 */
function highlightTokens(defs: Object, text: string) {
  return text.replace(jsTokens, function(...args) {
    const type = getTokenType(args);
    const colorize = defs[type];
    if (colorize) {
      return args[0]
        .split(NEWLINE)
        .map(str => colorize(str))
        .join("\n");
    } else {
      return args[0];
    }
  });
}

type Options = {
  forceColor?: boolean,
};

/**
 * Whether the code should be highlighted given the passed options.
 */
export function shouldHighlight(options: Options): boolean {
  return Chalk.supportsColor || options.forceColor;
}

/**
 * The Chalk instance that should be used given the passed options.
 */
export function getChalk(options: Options) {
  let chalk = Chalk;
  if (options.forceColor) {
    chalk = new Chalk.constructor({ enabled: true, level: 1 });
  }
  return chalk;
}

/**
 * Highlight `code`.
 */
export default function highlight(code: string, options: Options = {}): string {
  if (shouldHighlight(options)) {
    const chalk = getChalk(options);
    const defs = getDefs(chalk);
    return highlightTokens(defs, code);
  } else {
    return code;
  }
}
