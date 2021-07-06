// @flow

type T = string;
declare module 'test' {
  import type { JSONSchema7 } from 'json-schema';
  declare var a: number;
  declare function foo(a: JSONSchema7): string;
  declare export function concatPath(dirA: string, dirB: T): string;
  declare export class A {}
}

declare module 'test/submodule' {
  import type { JSONSchema7 } from 'json-schema';
  declare var a: number;
  declare function foo(a: JSONSchema7): string;
  declare export function concatPath(dirA: string, dirB: string): string;
  declare export class A {}
}
