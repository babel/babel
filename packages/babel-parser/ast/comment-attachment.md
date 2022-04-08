# Comment attachment

When Babel is parsing JavaScript files, the comments will be attached to its adjacent AST nodes. If such neighbors do not exist, Babel will fallback to the innermost containing node.

The [current implementation](https://github.com/babel/babel/pull/13521) is based on its converse problem: Instead of attaching comments directly to AST nodes, we attach nodes to a stack of applicable comment whitespaces (see below for definitions). After a comment whitespace has set up its node relationship including leading, trailing and container, we forward the comments to the AST nodes and perform adjustments such as merge innerComments after trailing comma to the last element's trailing comments.

### Comment Whitespace

A comment whitespace represents a sequence of whitespace characters and comments including `//` comment line, `/* */` comment block, `<!--` HTML Open comment and `-->` HTML close comment. For example, the following snippet

```js
a// 1
/* 2 */
 + <!-- 3
-->
2;
```

have two comment whitespaces

```jsonc
// for `// 1\n/* 2 */ `
{
  start: 1, // position of '/'
  end: 15, // position of '+'
  comments: [
    CommentLine { start: 1, end: 5},
    CommentBlock { start: 6, end: 13 }
  ],
  leadingNode: Identifier("a"),
  trailingNode: null,
  containerNode: BinaryExpression,
}
```

and

```jsonc
// for ` <!-- 3\n-->\n`
{
  start: 16, // position of ' ' after '+'
  end: 28, // position of '2'
  comments: [
    CommentLine { start: 17, end: 23},
    CommentLine { start: 24, end: 27 }
  ],
  leadingNode: null,
  trailingNode: NumericLiteral(2),
  containerNode: BinaryExpression,
}
```

Given a program source, the set of all the comment whitespaces has the following properties:

**Nonemptiness** (P1): For every `w` of comment whitespaces, `w` satisfies

```
w.start < w.end
```

**Isolation** (P2): There must not exist any pair of comment whitespaces `w1` and `w2` such that

```
w1.start ≤ w2.start ≤ w1.end
```

**Completeness** (P3): For every comment AST node `c`, there must exist a comment whitespace `w`, such that

```
w.start ≤ c.start < c.end ≤ w.end
```

We can also say `w` encompasses `c`.

**Monotonicity** (Corollary from P1 and P2): Given a non-empty list of comment whitespaces ordered by `start`, denoted by `{ w1, w2, ... w_n }`, they must satisify

```
w1.start < w1.end < w2.start < w2.end < ... < w_n.start < w_n.end
```

For any given comment whitespace `w` and an AST node `n`, we can define the following relationships:

1. `n` is the _leading node_ of `w` iff `n.end = w.start`
2. `n` is the _trailing node_ of `w` iff `n.start = w.end`
3. `n` is the _containing node_ of `w` iff for all AST nodes `N` satisfying `N.start < w.start < w.end < N.end`, the following proposition is true:

```
N.start ≤ n.start < w.start < w.end < n.end ≤ N.end
```

Note that the relationship from `w` to `n` is _not_ injective. In other words, a comment whitespace can have multiple leading nodes, trailing nodes, and/or containing nodes. To address this issue we can define the extrema of the set of related ast nodes.

1. Outermost leading/trailing node: `n` is the _outermost leading/trailing node_ of `w` iff for every other leading/trailing node `N` of `w`, `N` is a descendant of `n`
2. Innermost containing node: `n` is the _innermost containing node_ of `w` iff for every other containing node `N` of `w`, `n` is a descendant of `N`

For any given comment `c` and AST node `n`, now we can (in)formally define leading comments, trailing comments and inner comments:

**Leading Comment**: `c` is one of leading comments of `n` iff there exist a comment whitespace `w`, such that `n` is the outermost trailing node of `w` and `w` encompasses `c`

**Trailing Comment**: `c` is one of trailing comments of `n` iff there exist a comment whitespace `w`, such that `n` is the outermost leading node of `w` and `w` encompasses `c`

**Inner Comment**: `c` is one of inner comments of `n` iff

1. there exist a comment whitespace `w`, such that `n` is the innermost containing node of `w` and `w` encompasses `c`.
2. there does not exist a comment whitespace `w`, such that `n` is the outermost leading or trailing node of `w and `w`encompasses`c`.

The Isolation (P2) of a comment whitespace guarantees that if two comments `c1`, `c2` belongs to the leading/trailing comments of `n`, `c1` and `c2` must be encompassed by the same comment whitespace `w`. This property simplifies classification of leading/trailing because we can now mark a group of comments instead of checking every comments under the same comment whitespace.

Note that Babel parser marks certain inner comments after a trailing comma of a list structures to be the trailing comments of the last element in that list. (https://github.com/babel/babel/pull/10369) This behaviour can be considered as conpensation due to lack of a `TrailingCommaElement` AST structure to which a comment can be attached. Although this PR implements such behaviour, we will not be discussing it in the design section.

### Construct Comment Whitespace

We construct the comment whitespace in `Tokenizer#skipSpace` of `packages/babel-parser/src/tokenizer/index.js`, after we exit from the skip loop, we collect the `comments`, mark the location info and push to `parser.state.commentStack`. In this PR we also merge the parsing of `HTMLOpenComment` and `HTMLCloseComment` to `skipSpace`.

### Attaching Nodes to Comment Whitespace

For every finished AST node invoked from `parser#finishNode`. Before an AST node is finished, the whitespace token have been read from `tokenizer#next()`, so if this node has trailing comments, it must be the `leadingNode` of the last element in `commentStack`.

Note that the `leadingNode` will be updated by subsequent `finishNode()` calls invoked at the same position. The last `finishNode()` call is the winner, which is exactly the _outermost_ leading node that we are interested. Likewise for `trailingNode`.

Then we iterate `state.commentStack` reversely. we mark `trailingNode` when `comment.end = node.start`, mark `containingNode` when it is not defined, so here the first `finishNode()` is the winner, which is exactly the _innermost_ containing node.

After we set the containing node, we can assign comments to related node, since the nature of a recursive descending parser requires that when `containingNode` is finished, its `leadingNode` and `trailingNode` must have been parsed<sup>\*</sup>, so the related node stops being updated by `processComment`.

<sub>\* Technically this is not always true because we have `estree` plugins invokes `finishNodeAt` at a different tokenizer location. However, since most `estree` users are using `@babel/eslint-parser`, which removes the attached comment. So we are good here.</sub>

### Finalize comment whitespaces

In this step we attach the comments and do the trailing comma adjustments. Note that an extra routine `finalizeRemainingComments` is provided for `parseExpression`, which may not have opportunity to finalize comments which is added to the leading/trailing of the top level Expression node.
