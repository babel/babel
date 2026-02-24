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
  PipelineUnparenthesized:
    "Cannot mix binary operator with solo-await F#-style pipeline. Please wrap the pipeline in parentheses.",
} satisfies ParseErrorTemplates;
