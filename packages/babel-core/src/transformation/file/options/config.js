/* eslint max-len: "off" */

export default {
  filename: {
    type: "filename",
    default: "unknown",
  },

  filenameRelative: {
    type: "string",
  },

  inputSourceMap: {},

  env: {
    default: {},
  },

  mode: {},

  retainLines: {
    type: "boolean",
    default: false,
  },

  highlightCode: {
    type: "boolean",
    default: true,
  },

  suppressDeprecationMessages: {
    type: "boolean",
    default: false,
  },

  presets: {
    type: "list",
    default: [],
  },

  plugins: {
    type: "list",
    default: [],
  },

  ignore: {
    type: "list",
    default: [],
  },

  only: {
    type: "list",
  },

  code: {
    default: true,
    type: "boolean",
  },

  metadata: {
    default: true,
    type: "boolean",
  },

  ast: {
    default: true,
    type: "boolean",
  },

  extends: {
    type: "string",
  },

  comments: {
    type: "boolean",
    default: true,
  },

  shouldPrintComment: {},

  wrapPluginVisitorMethod: {},

  compact: {
    type: "booleanString",
    default: "auto",
  },

  minified: {
    type: "boolean",
    default: false,
  },

  sourceMap: {
    alias: "sourceMaps",
  },

  sourceMaps: {
    type: "booleanString",
    default: false,
  },

  sourceMapTarget: {
    type: "string",
  },

  sourceFileName: {
    type: "string",
  },

  sourceRoot: {
    type: "filename",
  },

  babelrc: {
    type: "boolean",
    default: true,
  },

  sourceType: {
    default: "module",
  },

  auxiliaryCommentBefore: {
    type: "string",
  },

  auxiliaryCommentAfter: {
    type: "string",
  },

  resolveModuleSource: {},

  getModuleId: {},

  moduleRoot: {
    type: "filename",
  },

  moduleIds: {
    type: "boolean",
    default: false,
  },

  moduleId: {
    type: "string",
  },

  passPerPreset: {
    type: "boolean",
    default: false,
  },

  // Deprecate top level parserOpts
  parserOpts: {
    default: false,
  },

  // Deprecate top level generatorOpts
  generatorOpts: {
    default: false,
  },
};
