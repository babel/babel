import "foo";
import "foo-bar";
import "./directory/foo-bar";
import foo from "foo";
import * as foo from "foo";
import {bar} from "foo";
import {foo as bar} from "foo";

export {test};
export var test = 5;

export default test;
