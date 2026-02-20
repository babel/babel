// This file is revised from https://github.com/not-an-aardvark/eslint-rule-composer/blob/7e8ec43d3e62d9766e87b09c1958ce2863b421f4/lib/rule-composer.js

"use strict";

/**
 * Translates a multi-argument context.report() call into a single object argument call
 * @param {...*} arguments A list of arguments passed to `context.report`
 * @returns {MessageDescriptor} A normalized object containing report information
 */
function normalizeMultiArgReportCall() {
  // If there is one argument, it is considered to be a new-style call already.
  if (arguments.length === 1) {
    return arguments[0];
  }

  // If the second argument is a string, the arguments are interpreted as [node, message, data, fix].
  if (typeof arguments[1] === "string") {
    return {
      node: arguments[0],
      message: arguments[1],
      data: arguments[2],
      fix: arguments[3],
    };
  }

  // Otherwise, the arguments are interpreted as [node, loc, message, data, fix].
  return {
    node: arguments[0],
    loc: arguments[1],
    message: arguments[2],
    data: arguments[3],
    fix: arguments[4],
  };
}

/**
 * Normalizes a MessageDescriptor to always have a `loc` with `start` and `end` properties
 * @param {MessageDescriptor} descriptor A descriptor for the report from a rule.
 * @returns {{start: Location, end: (Location|null)}} An updated location that infers the `start` and `end` properties
 * from the `node` of the original descriptor, or infers the `start` from the `loc` of the original descriptor.
 */
function normalizeReportLoc(descriptor) {
  if (descriptor.loc) {
    if (descriptor.loc.start) {
      return descriptor.loc;
    }
    return { start: descriptor.loc, end: null };
  }
  return descriptor.node.loc;
}

/**
 * Interpolates data placeholders in report messages
 * @param {MessageDescriptor} descriptor The report message descriptor.
 * @param {Object} messageIds Message IDs from rule metadata
 * @returns {{message: string, data: Object}} The interpolated message and data for the descriptor
 */
function normalizeMessagePlaceholders(descriptor, messageIds) {
  const message =
    typeof descriptor.messageId === "string"
      ? messageIds[descriptor.messageId]
      : descriptor.message;
  if (!descriptor.data) {
    return {
      message,
      data: typeof descriptor.messageId === "string" ? {} : null,
    };
  }

  const normalizedData = Object.create(null);
  const interpolatedMessage = message.replace(/\{\{[^{}]+\}\}/g, fullMatch => {
    const term = fullMatch.slice(2, -2).trim();
    if (term in descriptor.data) {
      normalizedData[term] = descriptor.data[term];
      return descriptor.data[term];
    }

    return fullMatch;
  });

  return {
    message: interpolatedMessage,
    data: Object.freeze(normalizedData),
  };
}

function getRuleMeta(rule) {
  return typeof rule === "object" && rule.meta && typeof rule.meta === "object"
    ? rule.meta
    : {};
}

function getMessageIds(rule) {
  const meta = getRuleMeta(rule);
  return meta.messages && typeof rule.meta.messages === "object"
    ? meta.messages
    : {};
}

function getReportNormalizer(rule) {
  const messageIds = getMessageIds(rule);

  return function normalizeReport() {
    const descriptor = normalizeMultiArgReportCall.apply(null, arguments);
    const interpolatedMessageAndData = normalizeMessagePlaceholders(
      descriptor,
      messageIds,
    );

    return {
      node: descriptor.node,
      message: interpolatedMessageAndData.message,
      messageId:
        typeof descriptor.messageId === "string" ? descriptor.messageId : null,
      data:
        typeof descriptor.messageId === "string"
          ? interpolatedMessageAndData.data
          : null,
      loc: normalizeReportLoc(descriptor),
      fix: descriptor.fix,
    };
  };
}

function getRuleCreateFunc(rule) {
  return typeof rule === "function" ? rule : rule.create;
}

function removeMessageIfMessageIdPresent(reportDescriptor) {
  const newDescriptor = Object.assign({}, reportDescriptor);

  if (
    typeof reportDescriptor.messageId === "string" &&
    typeof reportDescriptor.message === "string"
  ) {
    delete newDescriptor.message;
  }

  return newDescriptor;
}

module.exports = Object.freeze({
  filterReports(rule, predicate) {
    return Object.freeze({
      create(context) {
        const filename = context.filename || context.getFilename();
        const sourceCode = context.sourceCode || context.getSourceCode();
        const settings = context.settings;
        const options = context.options;
        return getRuleCreateFunc(rule)(
          Object.freeze(
            Object.create(context, {
              report: {
                enumerable: true,
                value() {
                  const reportDescriptor = getReportNormalizer(rule).apply(
                    null,
                    arguments,
                  );
                  if (
                    predicate(reportDescriptor, {
                      sourceCode,
                      settings,
                      options,
                      filename,
                    })
                  ) {
                    context.report(
                      removeMessageIfMessageIdPresent(reportDescriptor),
                    );
                  }
                },
              },
            }),
          ),
        );
      },
      schema: rule.schema,
      meta: getRuleMeta(rule),
    });
  },
});
