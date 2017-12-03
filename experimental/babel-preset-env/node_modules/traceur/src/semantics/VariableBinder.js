// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ScopeChainBuilder} from './ScopeChainBuilder.js';

// TODO: Add more entry points:
//    for..in statment
//    for statement

/**
 * Gets the identifiers bound in {@code tree}. The tree should be a block
 * statement. This means if {@code tree} is:
 *
 * { function f(x) { var y; } }
 *
 * Then only {@code "f"} is bound; {@code "x"} and {@code "y"} are bound in
 * the separate lexical scope of {@code f}. Note that only const/let bound
 * variables (such as {@code "f"} in this example) are returned. Variables
 * declared with "var" are only returned when {@code includeFunctionScope} is
 * set to true.
 *
 * If {@code tree} was instead:
 *
 * { var z = function f(x) { var y; }; }
 *
 *
 * Then only {@code "z"} is bound
 *
 * @param {Block} tree
 * @param {boolean=} includeFunctionScope
 * @return {StringSet}
 */
export function variablesInBlock(tree, includeFunctionScope = undefined) {
  let builder = new ScopeChainBuilder(null);
  builder.visitAny(tree);
  let scope = builder.getScopeForTree(tree);
  let names = scope.getLexicalBindingNames();
  if (!includeFunctionScope) {
    return names;
  }

  let variableBindingNames = scope.getVariableBindingNames();
  variableBindingNames.forEach((name) => names.add(name));
  return names;
}

/**
 * Gets the identifiers bound in the context of a function,
 * {@code tree}, other than the function name itself. For example, if
 * {@code tree} is:
 *
 * function f(x) { var y; f(); }
 *
 * Then a set containing only {@code "x"} and {@code "y"} is returned. Note
 * that we treat {@code "f"} as free in the body of {@code f}, because
 * AlphaRenamer uses this fact to determine if the function name is shadowed
 * by another name in the body of the function.
 *
 * <p>Only identifiers that are bound <em>throughout</em> the
 * specified tree are returned, for example:
 *
 * function f() {
 *   try {
 *   } catch (x) {
 *     function g(y) { }
 *   }
 * }
 *
 * Reports nothing as being bound, because {@code "x"} is only bound in the
 * scope of the catch block; {@code "g"} is let bound to the catch block, and
 * {@code "y"} is only bound in the scope of {@code g}.
 *
 * {@code "arguments"} is only reported as bound if it is
 * explicitly bound in the function. If it is not explicitly bound,
 * {@code "arguments"} is implicitly bound during function
 * invocation.
 *
 * @param {FunctionDeclaration} tree
 * @return {StringSet}
 */
export function variablesInFunction(tree) {
  let builder = new ScopeChainBuilder(null);
  builder.visitAny(tree);
  let scope = builder.getScopeForTree(tree);
  return scope.getAllBindingNames();
}
