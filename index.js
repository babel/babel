export * from "./src/index";
import "./plugins/flow";

import inject from "acorn-jsx/inject";
import * as acorn from "./src/index";
inject(acorn);
