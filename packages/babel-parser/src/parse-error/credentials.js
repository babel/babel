// @flow

export const ParseErrorCodes = Object.freeze({
  SyntaxError: "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
});

export type ParseErrorCode = $Values<typeof ParseErrorCodes>;

export type SyntaxPlugin =
  | "flow"
  | "typescript"
  | "jsx"
  | "pipelineOperator"
  | "placeholders";

export type ToMessage<ErrorDetails> = (self: ErrorDetails) => string;

export type ParseErrorCredentials<ErrorDetails> = {
  code: ParseErrorCode,
  reasonCode: string,
  syntaxPlugin?: SyntaxPlugin,

  toMessage: ToMessage<ErrorDetails>,
};

const reflect = (keys: string[], last = keys.length - 1) => ({
  get() {
    return keys.reduce((object, key) => object[key], this);
  },
  set(value) {
    keys.reduce(
      (item, key, i) => (i === last ? (item[key] = value) : item[key]),
      this,
    );
  },
});

const instantiate = <T>(
  constructor: () => any,
  properties: Object,
  descriptors: Object,
) =>
  Object.keys(descriptors)
    .map(key => [key, descriptors[key]])
    .filter(([, descriptor]) => !!descriptor)
    .map(([key, descriptor]) => [
      key,
      typeof descriptor === "function"
        ? { value: descriptor, enumerable: false }
        : typeof descriptor === "string"
        ? reflect(descriptor.split("."))
        : descriptor,
    ])
    .reduce(
      (instance, [key, descriptor]) =>
        Object.defineProperty(instance, key, {
          configurable: true,
          ...descriptor,
        }),
      Object.assign((new constructor(): T), properties),
    );

export { instantiate };
