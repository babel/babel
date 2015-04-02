import "foo";
import "foo-bar";
import "./directory/foo-bar";
import foo from "foo";
import * as foo2 from "foo";
import {bar} from "foo";
import {foo as bar2} from "foo";

export {test};
export var test2 = 5;

export default test;

foo;
foo2;
bar;
bar2;
