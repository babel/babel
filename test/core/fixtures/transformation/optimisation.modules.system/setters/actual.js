export * from "foo";
export {foo} from "foo";
export {foo, bar} from "foo";
export {foo as bar} from "bar";
export {foo as default} from "bar";
export {foo as default, bar} from "bar";

export var foo, bar;
