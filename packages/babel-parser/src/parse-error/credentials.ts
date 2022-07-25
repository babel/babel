export const enum ParseErrorCode {
  SyntaxError = "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
}

export type SyntaxPlugin =
  | "flow"
  | "typescript"
  | "jsx"
  | "pipelineOperator"
  | "placeholders";

export type ToMessage<ErrorDetails> = (self: ErrorDetails) => string;

export type ParseErrorCredentials<ErrorDetails> = {
  code: ParseErrorCode;
  reasonCode: string;
  syntaxPlugin?: SyntaxPlugin;
  toMessage: ToMessage<ErrorDetails>;
};

const reflect = (keys: string[], last = keys.length - 1) => ({
  get(this: unknown): unknown {
    return keys.reduce(
      (object, key) =>
        // @ts-expect-error key should index object
        object[key],
      this,
    );
  },
  set(this: unknown, value: unknown) {
    keys.reduce(
      // @ts-expect-error key should index item
      (item, key, i) => (i === last ? (item[key] = value) : item[key]),
      this,
    );
  },
});

const instantiate = <T>(
  constructor: new () => T,
  properties: any,
  descriptors: any,
) =>
  Object.keys(descriptors)
    .map(key => [key, descriptors[key]])
    .filter(([, descriptor]) => !!descriptor)
    .map(([key, descriptor]) => [
      key,
      typeof descriptor === "function"
        ? { value: descriptor, enumerable: false }
        : typeof descriptor.reflect === "string"
        ? { ...descriptor, ...reflect(descriptor.reflect.split(".")) }
        : descriptor,
    ])
    .reduce(
      (instance, [key, descriptor]) =>
        Object.defineProperty(instance, key, {
          configurable: true,
          ...descriptor,
        }),
      Object.assign(new constructor(), properties),
    );

export { instantiate };
