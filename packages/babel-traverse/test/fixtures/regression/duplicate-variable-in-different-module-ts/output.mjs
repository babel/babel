declare module 'test' {
  import type { JSONSchema7 } from 'json-schema';
  import { bar } from "baz";
  export { fooBar } from "baz";
  let foo: JSONSchema7;
}
declare module 'test/submodule' {
  import type { JSONSchema7 } from 'json-schema';
  import { bar } from "baz";
  export { fooBar } from "baz";
  let foo: JSONSchema7;
}
