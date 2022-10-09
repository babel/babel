for (var i = 0; i < 3; i + 1, babelHelpers.readOnlyError("i")) {
  console.log(i);
}
for (var j = 0; j < 3; +j, babelHelpers.readOnlyError("j")) {
  console.log(j);
}
