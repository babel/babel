// @flow
import * as t from "@babel/types";
import type { TraversalAncestors, TraversalHandler } from "@babel/types";
import { parse } from "babylon";
import { codeFrameColumns } from "@babel/code-frame";
import type { TemplateOpts } from "./options";
import type { Formatter } from "./formatters";

export type Metadata = {
  ast: BabelNodeFile,
  placeholders: Array<Placeholder>,
  placeholderNames: Set<string>,
};

type PlaceholderType = "string" | "param" | "statement" | "other";
export type Placeholder = {|
  name: string,
  resolve: BabelNodeFile => { parent: BabelNode, key: string, index?: number },
  type: PlaceholderType,
  isDuplicate: boolean,
|};

const PATTERN = /^[_$A-Z0-9]+$/;

export default function parseAndBuildMetadata<T>(
  formatter: Formatter<T>,
  code: string,
  opts: TemplateOpts,
): Metadata {
  const ast = parseWithCodeFrame(code, opts.parser);

  const {
    placeholderWhitelist,
    placeholderPattern = PATTERN,
    preserveComments,
  } = opts;

  t.removePropertiesDeep(ast, {
    preserveComments,
  });

  formatter.validate(ast);

  const placeholders = [];
  const placeholderNames = new Set();

  t.traverse(ast, (placeholderVisitorHandler: TraversalHandler<*>), {
    placeholders,
    placeholderNames,
    placeholderWhitelist,
    placeholderPattern,
  });

  return {
    ast,
    placeholders,
    placeholderNames,
  };
}

function placeholderVisitorHandler(
  node: BabelNode,
  ancestors: TraversalAncestors,
  state: MetadataState,
) {
  let name;
  if (t.isIdentifier(node)) {
    name = ((node: any): BabelNodeIdentifier).name;
  } else if (t.isStringLiteral(node)) {
    name = ((node: any): BabelNodeStringLiteral).value;
  } else {
    return;
  }

  if (
    (!state.placeholderPattern || !state.placeholderPattern.test(name)) &&
    (!state.placeholderWhitelist || !state.placeholderWhitelist.has(name))
  ) {
    return;
  }

  // Keep our own copy of the ancestors so we can use it in .resolve().
  ancestors = ancestors.slice();

  const { node: parent, key } = ancestors[ancestors.length - 1];

  let type: PlaceholderType;
  if (t.isStringLiteral(node)) {
    type = "string";
  } else if (
    (t.isNewExpression(parent) && key === "arguments") ||
    (t.isCallExpression(parent) && key === "arguments") ||
    (t.isFunction(parent) && key === "params")
  ) {
    type = "param";
  } else if (t.isExpressionStatement(parent)) {
    type = "statement";
    ancestors = ancestors.slice(0, -1);
  } else {
    type = "other";
  }

  state.placeholders.push({
    name,
    type,
    resolve: ast => resolveAncestors(ast, ancestors),
    isDuplicate: state.placeholderNames.has(name),
  });
  state.placeholderNames.add(name);
}

function resolveAncestors(ast: BabelNodeFile, ancestors: TraversalAncestors) {
  let parent: BabelNode = ast;
  for (let i = 0; i < ancestors.length - 1; i++) {
    const { key, index } = ancestors[i];

    if (index === undefined) {
      parent = (parent: any)[key];
    } else {
      parent = (parent: any)[key][index];
    }
  }

  const { key, index } = ancestors[ancestors.length - 1];

  return { parent, key, index };
}

type MetadataState = {
  placeholders: Array<Placeholder>,
  placeholderNames: Set<string>,
  placeholderWhitelist: Set<string> | void,
  placeholderPattern: RegExp | false,
};

function parseWithCodeFrame(code: string, parserOpts: {}): BabelNodeFile {
  parserOpts = Object.assign(
    {
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      sourceType: "module",
    },
    parserOpts,
  );

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
