import * as formatters from "./formatters.ts";
import createTemplateBuilder from "./builder.ts";

export const smart = createTemplateBuilder(formatters.smart);
export const statement = createTemplateBuilder(formatters.statement);
export const statements = createTemplateBuilder(formatters.statements);
export const expression = createTemplateBuilder(formatters.expression);
export const program = createTemplateBuilder(formatters.program);

type DefaultTemplateBuilder = typeof smart & {
  smart: typeof smart;
  statement: typeof statement;
  statements: typeof statements;
  expression: typeof expression;
  program: typeof program;
};

export default Object.assign(smart.bind(undefined) as DefaultTemplateBuilder, {
  smart,
  statement,
  statements,
  expression,
  program,
  ast: smart.ast,
});

export type {
  PublicOpts as Options,
  PublicReplacements as Replacements,
} from "./options.ts";
