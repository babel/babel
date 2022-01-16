/* eslint-disable no-confusing-arrow */

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const clone = value => JSON.parse(JSON.stringify(value));
// const dedupe = array => Object.values(Object.fromEntries(array));

const toDescriptorAssignedObject = (delta, object) =>
  delta.reduce(
    (object, [key, descriptor]) => (
      !descriptor || descriptor.delete
        ? delete object[key]
        : Object.defineProperty(object, key, descriptor),
      object
    ),
    clone(object),
  );

const toAdjust = adjustments =>
  !adjustments || Object.keys(adjustments).length === 0
    ? null
    : Object.assign(
        (value, key, parent) =>
          key in adjustments ? adjustments[key](value, key, parent) : value,
        adjustments,
      );

const toAdjustedErrorMessage = adjust => message =>
  message &&
  message.replace(/\((\d+):(\d+)\)$/, function (_, line, column) {
    const loc = { line: parseInt(line, 10), column: parseInt(column, 10) };
    return `(${adjust(
      loc.line,
      "line",
      loc,
    )}:${adjust(loc.column, "column", loc)})`;
  });

export default function toFuzzedOptions(options) {
  const { startLine = 1, startColumn = 0 } = options;

  // If the test supplies its own position, then make sure we choose
  // a different position. Also, make sure we stay wihtin the "reasonable"
  // bounds in case the test is testing negative startLine or startColumn
  // for example.
  const randomLine = Math.max(2, random(startLine + 1, 1000));
  const randomColumn = Math.max(1, random(startColumn + 1, 100));

  // Now assemble our deltas...
  const fuzzedOptions = [
    [false, false],
    [1, 0],
    [1, randomColumn],
    [randomLine, 0],
    [randomLine, randomColumn],
    [randomLine, false],
    [false, randomColumn],
  ]
    .map(([line, column]) => [
      ["startLine", line !== false && { enumerable: true, value: line }],
      ["startColumn", column !== false && { enumerable: true, value: column }],
    ])
    .map(delta => toDescriptorAssignedObject(delta, options));

  // Make sure to include the original options in our set as well if the user
  // is wanting to test a specific start position.
  const totalOptions =
    startLine !== 1 || startColumn !== 0
      ? [options, ...fuzzedOptions]
      : fuzzedOptions;

  // The last step is to create our fuzzing function for traversing the resulting AST.
  // This allows us to efficiently try these different options without having to modify
  // the expected results.
  return totalOptions
    .map(options => [options, options.startLine || 1, options.startColumn || 0])
    .map(([options, fStartLine, fStartColumn]) => [
      toAdjust({
        ...(startLine !== fStartLine && {
          line: line => line - startLine + fStartLine,
        }),
        ...(startColumn !== fStartColumn && {
          column: (column, _, { line }) =>
            line !== startLine ? column : column - startColumn + fStartColumn,
        }),
      }),
      options,
    ])
    .map(([adjust, options]) => [
      toAdjust({
        ...adjust,
        ...(adjust && { threw: toAdjustedErrorMessage(adjust) }),
        ...(adjust && {
          errors: errors =>
            errors && errors.map(toAdjustedErrorMessage(adjust)),
        }),
      }),
      options,
    ]);
}
