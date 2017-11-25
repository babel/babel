// @flow

import * as formatters from "./formatters";
import createTemplateBuilder from "./builder";

export { default as CACHE_KEY } from "./_cache-key";

export const smart = createTemplateBuilder(formatters.smart);
export const statement = createTemplateBuilder(formatters.statement);
export const statements = createTemplateBuilder(formatters.statements);
export const expression = createTemplateBuilder(formatters.expression);
export const program = createTemplateBuilder(formatters.program);

type DefaultTemplateBuilder = typeof smart & {
  smart: typeof smart,
  statement: typeof statement,
  statements: typeof statements,
  expression: typeof expression,
  program: typeof program,
  ast: typeof smart.ast,
};

export default Object.assign(
  ((smart.bind(undefined): any): DefaultTemplateBuilder),
  {
    smart,
    statement,
    statements,
    expression,
    program,
    ast: smart.ast,
  },
);
