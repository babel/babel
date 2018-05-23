/*
The purpose of this file is to test that the node_modules check in the require
hook doesn't mistakenly exclude something like "not_node_modules". To pass, this
file merely needs to be transpiled. The transpiled code won't, and doesn't need
to, execute without error. It won't execute because React will be undefined.
*/
try {
  <Some jsx="element" />;
}
catch (e) {}
