import {
  isCallExpression,
  isExpressionStatement,
  isFunction,
  isIdentifier,
  isJSXIdentifier,
  isNewExpression,
  isPlaceholder,
  isStatement,
  isStringLiteral,
  removePropertiesDeep,
  traverse,
} from "@babel/types";
import type * as t from "@babel/types";
import type { TraversalAncestors } from "@babel/types";
import { parse } from "@babel/parser";
import { codeFrameColumns } from "@babel/code-frame";
import type { TemplateOpts, ParserOpts } from "./options.ts";
import type { Formatter } from "./formatters.ts";

export type Metadata = {
  ast: t.File;
  placeholders: Array<Placeholder>;
  placeholderNames: Set<string>;
};

type PlaceholderType = "string" | "param" | "statement" | "other";
export type Placeholder = {
  name: string;
  resolve: (a: t.File) => { parent: t.Node; key: string; index?: number };
  type: PlaceholderType;
  isDuplicate: boolean;
};

const PATTERN = /^[_$A-Z0-9]+$/;

export default function parseAndBuildMetadata<T>(
  formatter: Formatter<T>,
  code: string,
  opts: TemplateOpts,
): Metadata {
  const {
    placeholderWhitelist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders,
  } = opts;

  const ast = parseWithCodeFrame(code, opts.parser, syntacticPlaceholders);

  removePropertiesDeep(ast, {
    preserveComments,
  });

  formatter.validate(ast);

  const state: MetadataState = {
    syntactic: { placeholders: [], placeholderNames: new Set() },
    legacy: { placeholders: [], placeholderNames: new Set() },
    placeholderWhitelist,
    placeholderPattern,
    syntacticPlaceholders,
  };

  traverse(ast, placeholderVisitorHandler, state);

  return {
    ast,
    ...(state.syntactic.placeholders.length ? state.syntactic : state.legacy),
  };
}

function placeholderVisitorHandler(
  node: t.Node,
  ancestors: TraversalAncestors,
  state: MetadataState,
) {
  let name: string;

  let hasSyntacticPlaceholders = state.syntactic.placeholders.length > 0;

  if (isPlaceholder(node)) {
    if (state.syntacticPlaceholders === false) {
      throw new Error(
        "%%foo%%-style placeholders can't be used when " +
          "'.syntacticPlaceholders' is false.",
      );
    }
    name = node.name.name;
    hasSyntacticPlaceholders = true;
  } else if (hasSyntacticPlaceholders || state.syntacticPlaceholders) {
    return;
  } else if (isIdentifier(node) || isJSXIdentifier(node)) {
    name = node.name;
  } else if (isStringLiteral(node)) {
    name = node.value;
  } else {
    return;
  }

  if (
    hasSyntacticPlaceholders &&
    (state.placeholderPattern != null || state.placeholderWhitelist != null)
  ) {
    // This check is also in options.js. We need it there to handle the default
    // .syntacticPlaceholders behavior.
    throw new Error(
      "'.placeholderWhitelist' and '.placeholderPattern' aren't compatible" +
        " with '.syntacticPlaceholders: true'",
    );
  }

  if (
    !hasSyntacticPlaceholders &&
    (state.placeholderPattern === false ||
      !(state.placeholderPattern || PATTERN).test(name)) &&
    !state.placeholderWhitelist?.has(name)
  ) {
    return;
  }

  // Keep our own copy of the ancestors so we can use it in .resolve().
  ancestors = ancestors.slice();

  const { node: parent, key } = ancestors[ancestors.length - 1];

  let type: PlaceholderType;
  if (
    isStringLiteral(node) ||
    isPlaceholder(node, { expectedNode: "StringLiteral" })
  ) {
    type = "string";
  } else if (
    (isNewExpression(parent) && key === "arguments") ||
    (isCallExpression(parent) && key === "arguments") ||
    (isFunction(parent) && key === "params")
  ) {
    type = "param";
  } else if (isExpressionStatement(parent) && !isPlaceholder(node)) {
    type = "statement";
    ancestors = ancestors.slice(0, -1);
  } else if (isStatement(node) && isPlaceholder(node)) {
    type = "statement";
  } else {
    type = "other";
  }

  const { placeholders, placeholderNames } = !hasSyntacticPlaceholders
    ? state.legacy
    : state.syntactic;

  placeholders.push({
    name,
    type,
    resolve: ast => resolveAncestors(ast, ancestors),
    isDuplicate: placeholderNames.has(name),
  });
  placeholderNames.add(name);
}

function resolveAncestors(ast: t.File, ancestors: TraversalAncestors) {
  let parent: t.Node = ast;
  for (let i = 0; i < ancestors.length - 1; i++) {
    const { key, index } = ancestors[i];

    if (index === undefined) {
      parent = (parent as any)[key];
    } else {
      parent = (parent as any)[key][index];
    }
  }

  const { key, index } = ancestors[ancestors.length - 1];

  return { parent, key, index };
}

type MetadataState = {
  syntactic: {
    placeholders: Array<Placeholder>;
    placeholderNames: Set<string>;
  };
  legacy: {
    placeholders: Array<Placeholder>;
    placeholderNames: Set<string>;
  };
  placeholderWhitelist?: Set<string>;
  placeholderPattern?: RegExp | false;
  syntacticPlaceholders?: boolean;
};

function parseWithCodeFrame(
  code: string,
  parserOpts: ParserOpts,
  syntacticPlaceholders?: boolean,
): t.File {
  const plugins = (parserOpts.plugins || []).slice();
  if (syntacticPlaceholders !== false) {
    plugins.push("placeholders");
  }

  parserOpts = {
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "module",
    ...parserOpts,
    plugins,
  };

  try {
    return parse(code, parserOpts);
  } catch (err) {
    const loc = err.loc;
    if (loc) {
      err.message += "\n" + codeFrameColumns(code, { start: loc });
      err.code = "BABEL_TEMPLATE_PARSE_ERROR";
    }
    throw err;
  }
}
