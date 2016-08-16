import foo, {baz as xyz} from "foo";

foo;
xyz;

import a from "bar";
import {b} from "bar";

console.log(a, b);

import { c } from "abc";
import d from "abc";

console.log(c, d);
