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

const thisify = <T>(f: (self: any, ...args: any[]) => T): ((...any[]) => T) =>
  function (...args: any[]): T {
    return ((f(this, ...args): any): T);
  };

const reflect = (keys: string[], last = keys.length - 1) => ({
  get: self => keys.reduce((object, key) => object[key], self),
  set: (self, value) =>
    keys.reduce(
      (item, key, i) => (i === last ? (item[key] = value) : item[key]),
      self,
    ),
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
      typeof descriptor === "string"
        ? reflect(descriptor.split("."))
        : descriptor,
    ])
    .reduce(
      (instance, [key, descriptor]) =>
        Object.defineProperty(instance, key, {
          configurable: true,
          ...descriptor,
          ...(descriptor.get && { get: thisify<any>(descriptor.get) }),
          ...(descriptor.set && { set: thisify<void>(descriptor.set) }),
        }),
      Object.assign((new constructor(): T), properties),
    );

export { instantiate };
