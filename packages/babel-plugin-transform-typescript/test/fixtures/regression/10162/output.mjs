const foo = 2;
export default foo;
["The exported identifier \"foo\" is not declared in Babel's scope tracker\nas a JavaScript value binding, and \"@babel/plugin-transform-typescript\"\nnever encountered it as a TypeScript type declaration.\nIt will be treated as a JavaScript value.\n\nThis problem is likely caused by another plugin injecting\n\"foo\" without registering it in the scope tracker. If you are the author\n of that plugin, please use \"scope.registerDeclaration(declarationPath)\"."];
