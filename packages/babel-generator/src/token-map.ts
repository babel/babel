import type * as t from "@babel/types";
import type { Token } from "@babel/parser";

import { traverseFast, VISITOR_KEYS } from "@babel/types";

export class TokenMap {
  _tokens: Token[];
  _source: string;

  _nodesToTokenIndexes: Map<t.Node, number[]> = new Map();
  _nodesOccurrencesCountCache: Map<
    t.Node,
    { test: string; count: number; i: number }
  > = new Map();

  _tokensCache = new Map<t.Node, { first: number; last: number }>();

  constructor(ast: t.Node, tokens: Token[], source: string) {
    this._tokens = tokens;
    this._source = source;

    traverseFast(ast, node => {
      const indexes = this._getTokensIndexesOfNode(node);
      if (indexes.length > 0) this._nodesToTokenIndexes.set(node, indexes);
    });

    this._tokensCache = null;
  }

  has(node: t.Node): boolean {
    return this._nodesToTokenIndexes.has(node);
  }

  getIndexes(node: t.Node): readonly number[] | undefined {
    return this._nodesToTokenIndexes.get(node);
  }

  find(
    node: t.Node,
    condition: (token: Token, index: number) => boolean,
  ): Token | null {
    const indexes = this._nodesToTokenIndexes.get(node);
    if (indexes) {
      for (let k = 0; k < indexes.length; k++) {
        const index = indexes[k];
        const tok = this._tokens[index];
        if (condition(tok, index)) return tok;
      }
    }
    return null;
  }

  findLastIndex(
    node: t.Node,
    condition: (token: Token, index: number) => boolean,
  ): number {
    const indexes = this._nodesToTokenIndexes.get(node);
    if (indexes) {
      for (let k = indexes.length - 1; k >= 0; k--) {
        const index = indexes[k];
        const tok = this._tokens[index];
        if (condition(tok, index)) return index;
      }
    }
    return -1;
  }

  findMatching(
    node: t.Node,
    test: string,
    occurrenceCount: number = 0,
  ): Token | null {
    const indexes = this._nodesToTokenIndexes.get(node);
    if (indexes) {
      let i = 0;
      const count = occurrenceCount;

      // To avoid O(n^2) search when printing lists (such as arrays), we
      // cache the last index of a given token for a given occurrence count.
      // If then we are asked to find the next occurrence of the same token,
      // we start from the index of the previously found token.
      // This cache only kicks in after 2 tokens of the same type, to avoid
      // overhead in the simple case of having unique tokens per node.
      if (count > 1) {
        const cache = this._nodesOccurrencesCountCache.get(node);
        if (cache && cache.test === test && cache.count < count) {
          i = cache.i + 1;
          occurrenceCount -= cache.count + 1;
        }
      }

      for (; i < indexes.length; i++) {
        const tok = this._tokens[indexes[i]];
        if (this.matchesOriginal(tok, test)) {
          if (occurrenceCount === 0) {
            if (count > 0) {
              this._nodesOccurrencesCountCache.set(node, { test, count, i });
            }
            return tok;
          }
          occurrenceCount--;
        }
      }
    }
    return null;
  }

  matchesOriginal(token: Token, test: string) {
    if (token.end - token.start !== test.length) return false;
    if (token.value != null) return token.value === test;
    return this._source.startsWith(test, token.start);
  }

  startMatches(node: t.Node, test: string): boolean {
    const indexes = this._nodesToTokenIndexes.get(node);
    if (!indexes) return false;
    const tok = this._tokens[indexes[0]];
    if (tok.start !== node.start) return false;
    return this.matchesOriginal(tok, test);
  }

  endMatches(node: t.Node, test: string): boolean {
    const indexes = this._nodesToTokenIndexes.get(node);
    if (!indexes) return false;
    const tok = this._tokens[indexes[indexes.length - 1]];
    if (tok.end !== node.end) return false;
    return this.matchesOriginal(tok, test);
  }

  _getTokensIndexesOfNode(node: t.Node): number[] {
    if (node.start == null || node.end == null) return [];

    const { first, last } = this._findTokensOfNode(
      node,
      0,
      this._tokens.length - 1,
    );

    let low = first;

    const children = childrenIterator(node);

    if (
      (node.type === "ExportNamedDeclaration" ||
        node.type === "ExportDefaultDeclaration") &&
      node.declaration &&
      node.declaration.type === "ClassDeclaration"
    ) {
      // Exported class declarations can be not properly nested inside
      // the export declaration that contains them. For example, in
      // `@dec export class Foo {}` the `export` is covered by the
      // ClassDeclaration range. Skip the class declaration from the list
      // of children to skip, so that when looking for `export` we also
      // traverse its tokens.
      children.next();
    }

    const indexes = [];

    for (const child of children) {
      if (child == null) continue;
      if (child.start == null || child.end == null) continue;

      const childTok = this._findTokensOfNode(child, low, last);

      const high = childTok.first;
      for (let k = low; k < high; k++) indexes.push(k);

      low = childTok.last + 1;
    }

    for (let k = low; k <= last; k++) indexes.push(k);

    return indexes;
  }

  _findTokensOfNode(node: t.Node, low: number, high: number) {
    const cached = this._tokensCache.get(node);
    if (cached) return cached;

    const first = this._findFirstTokenOfNode(node.start, low, high);
    const last = this._findLastTokenOfNode(node.end, first, high);

    this._tokensCache.set(node, { first, last });
    return { first, last };
  }

  _findFirstTokenOfNode(start: number, low: number, high: number): number {
    while (low <= high) {
      const mid = (high + low) >> 1;
      if (start < this._tokens[mid].start) {
        high = mid - 1;
      } else if (start > this._tokens[mid].start) {
        low = mid + 1;
      } else {
        return mid;
      }
    }
    return low;
  }

  _findLastTokenOfNode(end: number, low: number, high: number): number {
    while (low <= high) {
      const mid = (high + low) >> 1;
      if (end < this._tokens[mid].end) {
        high = mid - 1;
      } else if (end > this._tokens[mid].end) {
        low = mid + 1;
      } else {
        return mid;
      }
    }
    return high;
  }
}

function* childrenIterator(node: t.Node) {
  // We need special handling to iterate TemplateLiteral
  // children in order, since the two lists are interleaved.
  if (node.type === "TemplateLiteral") {
    yield node.quasis[0];
    for (let i = 1; i < node.quasis.length; i++) {
      yield node.expressions[i - 1];
      yield node.quasis[i];
    }
    return;
  }

  const keys = VISITOR_KEYS[node.type];
  for (const key of keys) {
    const child = (node as any)[key];
    if (!child) continue;
    if (Array.isArray(child)) {
      yield* child;
    } else {
      yield child;
    }
  }
}
