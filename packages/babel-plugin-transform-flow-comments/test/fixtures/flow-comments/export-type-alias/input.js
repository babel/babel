export type GraphQLFormattedError = number;
export type GraphQLFormattedError2 = {
  message: string,
  locations?: Array<{
    line: number,
    column: number
  }>
};
export interface foo { p: number }
export interface foo2<T> { p: T }
