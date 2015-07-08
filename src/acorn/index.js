export * from "acorn";

import "./plugins/es7-trailing-commas";
import "./plugins/flow";
import "./patch";
import "./lookahead";

import inject from "acorn-jsx/inject";
import * as acorn from "acorn";
inject(acorn);
