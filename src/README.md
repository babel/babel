## Welcome to the Babel Codebase

Babel is broken down into three parts:

- Parsing
- [Transformation](babel/transformation/)
- [Generation](babel/generation/)

**Parsing** is the process of turning a piece of code into an [ESTree spec](https://github.com/estree/estree) compatible AST (Abstract
Syntax Tree) which is a tree-like object of nodes that _describes_ the code.
This makes it easier to transform the code over direct string manpulation.

**Transformation** is the process of taking an AST and manipulating it into
a new one. For example, Babel might take an ES2015 ArrowFunction and transform
it into a normal Function which will work in ES5 environments.

**Generation** is the process of turning an AST back into code. After Babel is
done transforming the AST, the generation takes over to return normal code.

---

Babel's parsing step is done by [Acorn](https://github.com/marijnh/acorn). However, because Babel is implementing
future standards it maintains a [fork of Acorn](acorn/) in order to do it's job. You can
see that fork in the "acorn" folder.

The transformation and generation steps are both handled inside of the Babel
codebase itself, which is in the "babel" folder here.
