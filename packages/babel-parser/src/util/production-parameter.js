export const PARAM_ = 0b000, // Initial Parameter flags
  PARAM_YIELD = 0b001, // track [Await] production parameter
  PARAM_AWAIT = 0b010; // track [Yield] production parameter

// ProductionParameterHandler is a stack fashioned production parameter tracker
// https://tc39.es/ecma262/#sec-grammar-notation
// It only tracks [Await] and [Yield] parameter. The [In] parameter is tracked
// in `noIn` argument of `parseExpression`.
//
// Whenever [+Await]/[+Yield] appears in the right-hand sides of a production,
// we must enter a new tracking stack. For example when parsing
//
// AsyncFunctionDeclaration [Yield, Await]:
//   async [no LineTerminator here] function BindingIdentifier[?Yield, ?Await]
//     ( FormalParameters[~Yield, +Await] ) { AsyncFunctionBody }
//
// we must follow such process:
//
// 1. parse async keyword
// 2. parse function keyword
// 3. parse bindingIdentifier <= inherit current parameters: [?Await]
// 4. enter new stack with (PARAM_AWAIT)
// 5. parse formal parameters <= must have [Await] parameter [+Await]
// 6. parse function body
// 7. exit current stack

export default class ProductionParameterHandler {
  stacks: Array = [];
  enter(flags) {
    this.stacks.push(flags);
  }

  exit() {
    this.stacks.pop();
  }

  currentFlags() {
    return this.stacks[this.stacks.length - 1];
  }

  get hasAwait() {
    return (this.currentFlags() & PARAM_AWAIT) > 0;
  }

  get hasYield() {
    return (this.currentFlags() & PARAM_YIELD) > 0;
  }
}

export function functionFlags(isAsync: boolean, isGenerator: boolean) {
  return (isAsync ? PARAM_AWAIT : 0) | (isGenerator ? PARAM_YIELD : 0);
}
