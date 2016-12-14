export type ElementState = {
  tagExpr: Object; // tag node
  tagName: string; // raw string tag name
  args: Array<Object>; // array of call arguments
  call?: Object; // optional call property that can be set to override the call expression returned
  pre?: Function; // function called with (state: ElementState) before building attribs
  post?: Function; // function called with (state: ElementState) after building attribs
};

import * as types from 'foo'
export type Foo = types.Foo

exports
