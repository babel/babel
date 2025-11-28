import type { ParseErrorTemplates } from "../parse-error.ts";
import toNodeDescription from "./to-node-description.ts";

export const UnparenthesizedPipeBodyDescriptions = new Set([
  "ArrowFunctionExpression",
  "AssignmentExpression",
  "ConditionalExpression",
  "YieldExpression",
] as const);

type GetSetMemberType<T extends Set<any>> =
  T extends Set<infer M> ? M : unknown;

export type UnparenthesizedPipeBodyTypes = GetSetMemberType<
  typeof UnparenthesizedPipeBodyDescriptions
>;

export default {
  // This error is only used by the smart-mix proposal
  PipeBodyIsTighter:
    "Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence.",
  PipeTopicRequiresHackPipes:
    'Topic references are only supported when using the `"proposal": "hack"` version of the pipeline proposal.',
  PipeTopicUnbound:
    "Topic reference is unbound; it must be inside a pipe body.",
  PipeTopicUnconfiguredToken: ({ token }: { token: string }) =>
    `Invalid topic token ${token}. In order to use ${token} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${token}" }.`,
  PipeTopicUnused:
    "Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.",
  PipeUnparenthesizedBody: ({ type }: { type: UnparenthesizedPipeBodyTypes }) =>
    `Hack-style pipe body cannot be an unparenthesized ${toNodeDescription({
      type,
    })}; please wrap it in parentheses.`,
} satisfies ParseErrorTemplates;
